import sqlite3
from datetime import datetime, timedelta
from utils import get_realistic_point, get_status, get_score

def init_db():
    conn = sqlite3.connect('sensor_data.db')
    cursor = conn.cursor()
    
    # Create table
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
    
    # Clear existing data
    cursor.execute('DELETE FROM sensor_data')
    
    # Seed data for the past 24 hours (one point per hour)
    now = datetime.now()
    
    for i in range(24, -1, -1):
        dt = now - timedelta(hours=i)
        dt = dt.replace(minute=0, second=0, microsecond=0)
        
        ph, tds, suhu, oksigen = get_realistic_point(dt, add_noise=False)
        score = get_score(ph, tds, suhu, oksigen)
        short_status, _, _, _, _ = get_status(ph, tds, suhu, oksigen)
        
        cursor.execute('''
        INSERT INTO sensor_data (timestamp, ph, tds, suhu, oksigen, score, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (dt.strftime('%Y-%m-%d %H:%M:%S'), ph, tds, suhu, oksigen, score, short_status))
        
    conn.commit()
    conn.close()
    print("Database initialized and seeded with 24 hours of data.")

if __name__ == '__main__':
    init_db()
