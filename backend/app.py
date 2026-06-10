import sqlite3
import threading
import time
from datetime import datetime, timedelta
from flask import Flask, jsonify
from flask_cors import CORS

from utils import get_realistic_point, get_status, get_score, get_trend_info

app = Flask(__name__)
CORS(app)

DB_PATH = 'sensor_data.db'

def insert_sensor_data_loop():
    """Background worker that generates and inserts new sensor data every 5 seconds."""
    while True:
        try:
            now = datetime.now()
            ph, tds, suhu, oksigen = get_realistic_point(now, add_noise=True)
            score = get_score(ph, tds, suhu, oksigen)
            short_status, _, _, _, _ = get_status(ph, tds, suhu, oksigen)
            
            conn = sqlite3.connect(DB_PATH)
            cursor = conn.cursor()
            cursor.execute('''
            CREATE TABLE IF NOT EXISTS sensor_data (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp DATETIME NOT NULL,
                ph REAL NOT NULL,
                tds INTEGER NOT NULL,
                suhu REAL NOT NULL,
                oksigen REAL NOT NULL,
                score INTEGER NOT NULL,
                status TEXT NOT NULL
            )
            ''')
            
            cursor.execute('''
            INSERT INTO sensor_data (timestamp, ph, tds, suhu, oksigen, score, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (now.strftime('%Y-%m-%d %H:%M:%S'), ph, tds, suhu, oksigen, score, short_status))
            conn.commit()
            conn.close()
        except Exception as e:
            print("Background worker error:", e)
            
        time.sleep(5)

# Start background thread
worker_thread = threading.Thread(target=insert_sensor_data_loop, daemon=True)
worker_thread.start()

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/dashboard', methods=['GET'])
def get_dashboard_data():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Get latest data (T-0)
    cursor.execute('SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 1')
    latest = cursor.fetchone()
    
    if not latest:
        conn.close()
        return jsonify({"error": "No data available in database. Please run init_db.py."}), 404
        
    c_ph = latest['ph']
    c_tds = latest['tds']
    c_suhu = latest['suhu']
    c_oksigen = latest['oksigen']
    
    short_status, class_status, class_desc, class_icon, class_color = get_status(c_ph, c_tds, c_suhu, c_oksigen)
    
    # Get data from exactly 1 hour ago
    now_str = latest['timestamp']
    dt_now = datetime.strptime(now_str, '%Y-%m-%d %H:%M:%S')
    dt_1h_ago = dt_now - timedelta(hours=1)
    
    cursor.execute('SELECT * FROM sensor_data WHERE timestamp <= ? ORDER BY timestamp DESC LIMIT 1', 
                   (dt_1h_ago.strftime('%Y-%m-%d %H:%M:%S'),))
    prev = cursor.fetchone()
    
    if prev:
        ph_diff = round(c_ph - prev['ph'], 1)
        tds_diff = c_tds - prev['tds']
        suhu_diff = round(c_suhu - prev['suhu'], 1)
        oksigen_diff = round(c_oksigen - prev['oksigen'], 1)
    else:
        ph_diff = tds_diff = suhu_diff = oksigen_diff = 0
        
    ph_icon, ph_text, ph_color = get_trend_info(ph_diff, is_inverse_good=False) 
    tds_icon, tds_text, tds_color = get_trend_info(tds_diff, is_inverse_good=True)
    suhu_icon, suhu_text, suhu_color = get_trend_info(suhu_diff, is_inverse_good=True)
    ox_icon, ox_text, ox_color = get_trend_info(oksigen_diff, is_inverse_good=False)

    # Get recent history data (last 5 records)
    cursor.execute('SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 5')
    recent_rows = cursor.fetchall()
    history = []
    for row in recent_rows:
        row_dt = datetime.strptime(row['timestamp'], '%Y-%m-%d %H:%M:%S')
        history.append({
            "timestamp": row_dt.strftime("%d %b %Y, %H:%M:%S"), 
            "ph": row['ph'],
            "tds": row['tds'],
            "suhu": row['suhu'],
            "oksigen": row['oksigen'],
            "status": row['status']
        })
    # Trend Data (24h in 2-hour intervals = 12 points)
    trend_data = []
    for i in range(12, -1, -1):
        target_dt = dt_now - timedelta(hours=i*2)
        cursor.execute('SELECT * FROM sensor_data WHERE timestamp <= ? ORDER BY timestamp DESC LIMIT 1', 
                       (target_dt.strftime('%Y-%m-%d %H:%M:%S'),))
        row = cursor.fetchone()
        if row:
            row_dt = datetime.strptime(row['timestamp'], '%Y-%m-%d %H:%M:%S')
            trend_data.append({
                "time": row_dt.strftime("%H:%M"),
                "score": row['score']
            })
            
    conn.close()

    data = {
        "metrics": [
            {
                "id": "ph",
                "icon": "water_drop",
                "title": "pH Air",
                "subtitle": "Target 6.5 - 8.5",
                "value": f"{c_ph:.1f}",
                "trendIcon": ph_icon,
                "trendText": ph_text,
                "trendColor": ph_color
            },
            {
                "id": "tds",
                "icon": "scatter_plot",
                "title": "TDS (mg/L)",
                "subtitle": "",
                "value": str(c_tds),
                "trendIcon": tds_icon,
                "trendText": tds_text,
                "trendColor": tds_color
            },
            {
                "id": "suhu",
                "icon": "thermostat",
                "title": "Suhu (°C)",
                "subtitle": "",
                "value": f"{c_suhu:.1f}",
                "trendIcon": suhu_icon,
                "trendText": suhu_text,
                "trendColor": suhu_color
            },
            {
                "id": "oksigen",
                "icon": "air",
                "title": "Oksigen Terlarut",
                "subtitle": "mg/L",
                "value": f"{c_oksigen:.1f}",
                "trendIcon": ox_icon,
                "trendText": ox_text,
                "trendColor": ox_color
            }
        ],
        "classification": {
            "title": "Hasil Klasifikasi",
            "icon": class_icon,
            "status": class_status,
            "description": class_desc,
            "color": class_color
        },
        "history": history,
        "trend": trend_data
    }
    return jsonify(data)

@app.route('/api/history', methods=['GET'])
def get_history_data():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 500')
    rows = cursor.fetchall()
    
    if len(rows) > 0:
        avg_ph = sum(row['ph'] for row in rows) / len(rows)
        avg_tds = sum(row['tds'] for row in rows) / len(rows)
        avg_suhu = sum(row['suhu'] for row in rows) / len(rows)
        avg_oksigen = sum(row['oksigen'] for row in rows) / len(rows)
    else:
        avg_ph = avg_tds = avg_suhu = avg_oksigen = 0
        
    history_list = []
    for r in rows:
        dt = datetime.strptime(r['timestamp'], '%Y-%m-%d %H:%M:%S')
        history_list.append({
            "timestamp": dt.strftime("%d %b %Y, %H:%M"),
            "ph": r['ph'],
            "tds": r['tds'],
            "suhu": r['suhu'],
            "oksigen": r['oksigen'],
            "status": r['status']
        })
    conn.close()
    
    return jsonify({
        "summary": {
            "avg_ph": round(avg_ph, 1),
            "avg_tds": int(avg_tds),
            "avg_suhu": round(avg_suhu, 1),
            "avg_oksigen": round(avg_oksigen, 1)
        },
        "records": history_list
    })

@app.route('/api/report', methods=['GET'])
def get_report_data():
    import math
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 500')
    rows = cursor.fetchall()
    
    if len(rows) == 0:
        return jsonify({"error": "No data"}), 404
        
    status_counts = {"Ideal": 0, "Perlu Perhatian": 0, "Bahaya": 0}
    for r in rows:
        if r['status'] == 'Ideal' or r['status'] == 'Kondisi Ideal':
            status_counts["Ideal"] += 1
        elif r['status'] == 'Perlu Perhatian':
            status_counts["Perlu Perhatian"] += 1
        else:
            status_counts["Bahaya"] += 1
            
    total = len(rows)
    distributionData = [
        {"name": "Kondisi Ideal", "value": round((status_counts["Ideal"] / total) * 100)},
        {"name": "Perlu Perhatian", "value": round((status_counts["Perlu Perhatian"] / total) * 100)},
        {"name": "Bahaya", "value": round((status_counts["Bahaya"] / total) * 100)}
    ]
    distributionData = [d for d in distributionData if d['value'] > 0]
    
    avg_score = sum(r['score'] for r in rows) / total
    sr_value = min(100, max(0, avg_score * 0.95)) 
    compliance = round((status_counts["Ideal"] / total) * 100)
    most_frequent_status = max(status_counts, key=status_counts.get)
    
    trendData = []
    days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
    dt_now = datetime.now()
    today_idx = dt_now.weekday()
    
    # 7-day rolling window ending today
    for i in range(6, -1, -1):
        day_idx = (today_idx - i) % 7
        name = "Hari Ini" if i == 0 else days[day_idx]
        
        target_date_start = (dt_now - timedelta(days=i)).strftime('%Y-%m-%d 00:00:00')
        target_date_end = (dt_now - timedelta(days=i)).strftime('%Y-%m-%d 23:59:59')
        
        cursor.execute('''
            SELECT AVG(score) as avg_score 
            FROM sensor_data 
            WHERE timestamp >= ? AND timestamp <= ?
        ''', (target_date_start, target_date_end))
        
        row = cursor.fetchone()
        score = round(row['avg_score']) if row and row['avg_score'] is not None else None
        
        trendData.append({"name": name, "score": score})
    
    conn.close()
    return jsonify({
        "summary": {
            "sr": round(sr_value),
            "classification": most_frequent_status,
            "compliance": compliance
        },
        "distributionData": distributionData,
        "trendData": trendData
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
