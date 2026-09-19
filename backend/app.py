import os
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

app = Flask(__name__)
CORS(app)

# Import Supabase alert components (optional - only if Supabase is configured)
try:
    from alert_engine import AlertEngine
    from sensor_simulator import run_simulator, get_simulator
    from supabase_client import get_supabase
    
    alert_engine = AlertEngine()
    supabase = get_supabase()
    
    # Setup automatic sensor simulator (runs every 30 seconds)
    try:
        from flask_apscheduler import APScheduler
        scheduler = APScheduler()
        scheduler.add_job(func=run_simulator, trigger="interval", seconds=30, id='sensor_simulator')
        scheduler.init_app(app)
        scheduler.start()
        print("✓ Sensor simulator started (runs every 30 seconds)")
    except ImportError:
        print("INFO: flask-apscheduler not installed. Automatic simulation disabled.")
        print("      Install with: pip install flask-apscheduler")
        scheduler = None
    
    SUPABASE_ENABLED = True
    print("✓ Supabase real-time alerts enabled")
except Exception as e:
    SUPABASE_ENABLED = False
    alert_engine = None
    supabase = None
    scheduler = None
    print(f"INFO: Supabase not configured: {e}")
    print("      Real-time alerts disabled. Set SUPABASE_URL and SUPABASE_ANON_KEY to enable.")

try:
    from ml.groundwater_model import GroundwaterPredictionModel
    print("Loading groundwater model...")
    model = GroundwaterPredictionModel()
    print("✓ Model loaded successfully!")
except Exception as e:
    print(f"ERROR loading model: {e}")
    model = None

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "INGRES AI Groundwater Backend Active"})

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy"})

@app.route("/api/model-info", methods=["GET"])
def model_info():
    if not model:
        return jsonify({"error": "Model not loaded"}), 500
    try:
        info = model.get_info()
        return jsonify(info)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/predict", methods=["POST"])
def predict():
    if not model:
        return jsonify({"status": "error", "message": "Model not loaded"}), 500
    
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "No JSON data provided"}), 400
        
        prediction = model.predict_from_dict(data)
        return jsonify({
            "status": "success",
            "prediction": float(prediction),
            "unit": "meters"
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

# ==================== SUPABASE REAL-TIME ALERTS ENDPOINTS ====================

@app.route('/api/sensor-data', methods=['POST'])
def record_sensor_data():
    """Record sensor reading and check for alerts"""
    if not SUPABASE_ENABLED:
        return jsonify({"error": "Supabase not configured"}), 503
    
    try:
        data = request.json
        district_id = data.get('district_id')
        
        if not district_id:
            return jsonify({"error": "district_id is required"}), 400
        
        # Record sensor data
        sensor = alert_engine.record_sensor_data(district_id, data)
        
        # Check alerts
        alerts = alert_engine.check_and_trigger_alerts(district_id, data)
        
        return jsonify({
            'status': 'recorded',
            'sensor_id': sensor['id'] if sensor else None,
            'alerts_triggered': len(alerts),
            'alerts': alerts
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/alerts', methods=['GET'])
def get_alerts():
    """Get alerts with filters"""
    if not SUPABASE_ENABLED:
        return jsonify({"error": "Supabase not configured"}), 503
    
    try:
        limit = request.args.get('limit', 50, type=int)
        offset = request.args.get('offset', 0, type=int)
        severity = request.args.get('severity')
        district_id = request.args.get('district_id')
        
        query = supabase.table('alerts').select('*').order('triggered_at', desc=True)
        
        if severity:
            query = query.eq('severity', severity)
        if district_id:
            query = query.eq('district_id', district_id)
        
        response = query.range(offset, offset + limit - 1).execute()
        
        return jsonify(response.data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/alerts/<int:alert_id>/acknowledge', methods=['POST'])
def acknowledge_alert(alert_id):
    """Mark alert as acknowledged"""
    if not SUPABASE_ENABLED:
        return jsonify({"error": "Supabase not configured"}), 503
    
    try:
        data = request.json or {}
        user_id = data.get('user_id', 'anonymous')
        
        response = supabase.table('alerts').update({
            'acknowledged_by': user_id,
            'acknowledged_at': datetime.now().isoformat()
        }).eq('id', alert_id).execute()
        
        return jsonify({
            'status': 'acknowledged',
            'updated': response.data
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/alert-stats', methods=['GET'])
def get_alert_stats():
    """Get alert statistics"""
    if not SUPABASE_ENABLED:
        return jsonify({"error": "Supabase not configured"}), 503
    
    try:
        hours = request.args.get('hours', 24, type=int)
        since = datetime.now() - timedelta(hours=hours)
        
        response = supabase.table('alerts').select('*').gte(
            'triggered_at', since.isoformat()
        ).execute()
        
        alerts = response.data
        
        stats = {
            'total_alerts': len(alerts),
            'critical_count': len([a for a in alerts if a['severity'] == 'CRITICAL']),
            'warning_count': len([a for a in alerts if a['severity'] == 'WARNING']),
            'info_count': len([a for a in alerts if a['severity'] == 'INFO']),
            'acknowledged_count': len([a for a in alerts if a.get('acknowledged_at')]),
            'by_district': {},
            'by_type': {}
        }
        
        for alert in alerts:
            district = alert['district_id']
            stats['by_district'][district] = stats['by_district'].get(district, 0) + 1
            
            alert_type = alert.get('alert_type', 'unknown')
            stats['by_type'][alert_type] = stats['by_type'].get(alert_type, 0) + 1
        
        return jsonify(stats), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/simulate-sensors', methods=['POST'])
def start_simulation():
    """Manually trigger sensor data generation"""
    if not SUPABASE_ENABLED:
        return jsonify({"error": "Supabase not configured"}), 503
    
    try:
        run_simulator()
        return jsonify({'status': 'Simulation cycle completed'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/sensor-readings', methods=['GET'])
def get_sensor_readings():
    """Get recent sensor readings"""
    if not SUPABASE_ENABLED:
        return jsonify({"error": "Supabase not configured"}), 503
    
    try:
        limit = request.args.get('limit', 50, type=int)
        district_id = request.args.get('district_id')
        
        query = supabase.table('sensor_readings').select('*').order('created_at', desc=True)
        
        if district_id:
            query = query.eq('district_id', district_id)
        
        response = query.limit(limit).execute()
        
        return jsonify(response.data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/districts', methods=['GET'])
def get_districts():
    """Get all districts"""
    if not SUPABASE_ENABLED:
        return jsonify({"error": "Supabase not configured"}), 503
    
    try:
        response = supabase.table('districts').select('*').execute()
        return jsonify(response.data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port, debug=True)
