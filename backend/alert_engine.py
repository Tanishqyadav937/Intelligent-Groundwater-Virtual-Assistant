"""
Alert Engine - Monitors sensor data and triggers alerts based on thresholds
"""
from datetime import datetime
from typing import Dict, List, Optional
from supabase_client import get_supabase

class AlertEngine:
    def __init__(self):
        self.supabase = get_supabase()
        
        # Define alert rules (can be loaded from database in production)
        self.rules = {
            'groundwater_level': [
                {'severity': 'CRITICAL', 'threshold': 30, 'operator': '<', 
                 'message_template': 'Critical groundwater depletion detected: {value}m below ground level'},
                {'severity': 'WARNING', 'threshold': 50, 'operator': '<',
                 'message_template': 'Warning: Groundwater level declining: {value}m below ground level'},
            ],
            'extraction_rate': [
                {'severity': 'WARNING', 'threshold': 1000, 'operator': '>',
                 'message_template': 'High extraction rate detected: {value} units'},
            ],
            'rainfall': [
                {'severity': 'INFO', 'threshold': 500, 'operator': '>',
                 'message_template': 'Heavy rainfall recorded: {value}mm'},
            ],
            'temperature': [
                {'severity': 'WARNING', 'threshold': 40, 'operator': '>',
                 'message_template': 'High temperature alert: {value}°C'},
            ]
        }

    def check_and_trigger_alerts(self, district_id: str, metrics: Dict) -> List[Dict]:
        """
        Check metrics against rules and create alerts if needed
        
        Args:
            district_id: District identifier
            metrics: Dictionary of metric_name: value pairs
            
        Returns:
            List of created alerts
        """
        alerts_created = []
        
        for metric_type, value in metrics.items():
            if metric_type not in self.rules:
                continue
                
            for rule in self.rules[metric_type]:
                triggered = False
                
                # Check if rule condition is met
                if rule['operator'] == '<' and value < rule['threshold']:
                    triggered = True
                elif rule['operator'] == '>' and value > rule['threshold']:
                    triggered = True
                elif rule['operator'] == '==' and value == rule['threshold']:
                    triggered = True
                
                if triggered:
                    message = rule['message_template'].format(value=value)
                    alert = self.create_alert(
                        district_id=district_id,
                        severity=rule['severity'],
                        alert_type='threshold_breach',
                        message=message,
                        metric_type=metric_type,
                        metric_value=value
                    )
                    if alert:
                        alerts_created.append(alert)
        
        return alerts_created

    def create_alert(self, district_id: str, severity: str, alert_type: str, 
                     message: str, metric_type: str = None, metric_value: float = None) -> Optional[Dict]:
        """
        Create an alert in the database
        
        Args:
            district_id: District identifier
            severity: CRITICAL, WARNING, or INFO
            alert_type: Type of alert (e.g., threshold_breach)
            message: Alert message
            metric_type: Name of the metric that triggered the alert
            metric_value: Value of the metric
            
        Returns:
            Created alert data or None if failed
        """
        try:
            response = self.supabase.table('alerts').insert({
                'district_id': district_id,
                'severity': severity,
                'alert_type': alert_type,
                'message': message,
                'metric_type': metric_type,
                'metric_value': metric_value,
                'triggered_at': datetime.now().isoformat(),
                'notification_sent': False
            }).execute()
            
            print(f"✓ Alert created: {severity} for {district_id}")
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"ERROR creating alert: {e}")
            return None

    def record_sensor_data(self, district_id: str, metrics: Dict) -> Optional[Dict]:
        """
        Record sensor reading in the database
        
        Args:
            district_id: District identifier
            metrics: Dictionary of sensor measurements
            
        Returns:
            Created sensor reading data or None if failed
        """
        try:
            response = self.supabase.table('sensor_readings').insert({
                'district_id': district_id,
                'groundwater_level': metrics.get('groundwater_level'),
                'rainfall': metrics.get('rainfall'),
                'temperature': metrics.get('temperature'),
                'extraction_rate': metrics.get('extraction_rate'),
                'population_affected': metrics.get('population_affected'),
                'quality_score': metrics.get('quality_score', 1.0),
                'created_at': datetime.now().isoformat()
            }).execute()
            
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"ERROR recording sensor data: {e}")
            return None

    def get_recent_alerts(self, district_id: str = None, limit: int = 50) -> List[Dict]:
        """
        Fetch recent alerts from the database
        
        Args:
            district_id: Optional district filter
            limit: Maximum number of alerts to return
            
        Returns:
            List of alert dictionaries
        """
        try:
            query = self.supabase.table('alerts').select('*').order('triggered_at', desc=True)
            
            if district_id:
                query = query.eq('district_id', district_id)
            
            response = query.limit(limit).execute()
            return response.data if response.data else []
        except Exception as e:
            print(f"ERROR fetching alerts: {e}")
            return []

    def acknowledge_alert(self, alert_id: int, user_id: str) -> bool:
        """
        Mark an alert as acknowledged
        
        Args:
            alert_id: Alert ID to acknowledge
            user_id: User acknowledging the alert
            
        Returns:
            True if successful, False otherwise
        """
        try:
            response = self.supabase.table('alerts').update({
                'acknowledged_by': user_id,
                'acknowledged_at': datetime.now().isoformat()
            }).eq('id', alert_id).execute()
            
            return bool(response.data)
        except Exception as e:
            print(f"ERROR acknowledging alert: {e}")
            return False
