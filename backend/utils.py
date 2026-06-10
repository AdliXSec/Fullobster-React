import random
import math

def get_status(ph, tds, suhu, oksigen):
    issues = []
    if ph < 6.5 or ph > 8.5:
        issues.append("pH")
    if tds > 300:
        issues.append("TDS")
    if suhu < 25.0 or suhu > 30.0:
        issues.append("Suhu")
    if oksigen < 6.0:
        issues.append("Oksigen")
        
    if len(issues) == 0:
        return "Ideal", "Kondisi Ideal", "Lingkungan optimal untuk pertumbuhan.", "check_circle", "text-green-500"
    elif len(issues) >= 3:
        return "Bahaya", "Kondisi Bahaya", f"Banyak parameter kritis ({', '.join(issues)}). Segera lakukan tindakan!", "warning", "text-red-500"
    else:
        return "Perlu Perhatian", "Perlu Perhatian", f"Parameter {', '.join(issues)} di luar batas optimal.", "info", "text-yellow-500"

def get_score(ph, tds, suhu, oksigen):
    score = 100
    if ph < 6.5 or ph > 8.5:
        score -= 15
    if tds > 300:
        score -= 15
    if suhu < 25.0 or suhu > 30.0:
        score -= 15
    if oksigen < 6.0:
        score -= 15
    
    return max(0, min(100, score))

def get_trend_info(diff, is_inverse_good=False):
    if diff > 0:
        color = "text-red-500" if is_inverse_good else "text-green-500"
        diff_str = f"+{diff}" if isinstance(diff, int) else f"+{diff:.1f}"
        return "trending_up", f"{diff_str} vs 1 jam lalu", color
    elif diff < 0:
        color = "text-green-500" if is_inverse_good else "text-red-500"
        diff_str = f"{diff}" if isinstance(diff, int) else f"{diff:.1f}"
        return "trending_down", f"{diff_str} vs 1 jam lalu", color
    else:
        return "trending_flat", "Stabil", "text-gray-500"

def get_realistic_point(dt, add_noise=False):
    """
    Generate realistic water quality data based on time using sine waves
    to simulate daily cycles (temperature) and multi-day drifts.
    """
    t = dt.timestamp() / 3600.0  # Time in hours
    hour_of_day = dt.hour + dt.minute / 60.0 + dt.second / 3600.0
    
    # 1. Suhu (Temperature)
    suhu = 27.5 + math.sin((hour_of_day - 8) / 24.0 * 2 * math.pi) * 3.0
    suhu += math.cos(t / 48.0) * 1.5 
    
    # 2. Oksigen (Dissolved Oxygen)
    oksigen = 9.0 - (suhu - 24.0) * 0.35 
    oksigen += math.sin(t / 12.0) * 0.4 
    
    # 3. pH 
    ph = 7.4 + math.sin(t / 36.0) * 1.2 + math.cos(t / 18.0) * 0.4
    
    # 4. TDS
    tds = 240 + math.sin(t / 72.0) * 80 + math.cos(t / 24.0) * 30

    if add_noise:
        suhu += random.uniform(-0.1, 0.1)
        oksigen += random.uniform(-0.05, 0.05)
        ph += random.uniform(-0.02, 0.02)
        tds += random.randint(-2, 2)
        
    return round(ph, 1), int(tds), round(suhu, 1), round(oksigen, 1)
