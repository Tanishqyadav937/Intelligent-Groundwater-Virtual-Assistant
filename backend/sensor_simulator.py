"""
Sensor Simulator - Generates realistic mock sensor data for testing
"""
import random
import math
from datetime import datetime
from typing import List, Dict
from alert_engine import AlertEngine

class SensorSimulator:
    def __init__(self):
        self.engine = AlertEngine()
        
        # List of district IDs to simulate
        self.districts = [
            'UP001', 'UP002', 'MP001', 'MP002', 'KA001',
            'TN001', 'GJ001', 'PB001', 'RJ001', 'MH001'
        ]
        
        # Base groundwater levels for each district (meters below ground level)
        self.base_levels = {d: random.uniform(40, 70) for d in self.districts}
        
        # Day counter for simulating trends over time
        self.day_counter = 0
        
        # District-specific patterns
        self.district_patterns = {
            'UP001': {'decline_rate': -0.3, 'volatility': 3},  # Agra - high stress
            'UP002': {'decline_rate': -0.2, 'volatility': 2},  # Lucknow
            'MP001': {'decline_rate': -0.25, 'volatility': 2.5},  # Indore
            'MP002': {'decline_rate': -0.15, 'volatility': 2},  # Bhopal
            'KA001': {'decline_rate': -0.35, 'volatility': 3},  # Bangalore - critical
            'TN001': {'decline_rate': -0.4, 'volatility': 3.5},  # Chennai - very critical
            'GJ001': {'decline_rate': -0.2, 'volatility': 2},  # Ahmedabad
            'PB001': {'decline_rate': -0.5, 'volatility': 4},  # Ludhiana - extreme stress
            'RJ001': {'decline_rate': -0.3, 'volatility': 3},  # Jaipur
            'MH001': {'decline_rate': -0.1, 'volatility': 1.5},  # Mumbai - coastal
        }

    def generate_sensor_data(self) -> List[Dict]:
        """
        Generate mock sensor data for all districts
        
        Returns:
            List of triggered alerts
        """
        self.day_counter += 1
        alerts = []
        
        for district_id in self.districts:
            pattern = self.district_patterns.get(district_id, {'decline_rate': -0.2, 'volatility': 2})
            
            # Simulate groundwater decline over time
            trend = pattern['decline_rate'] * (self.day_counter % 100)
            
            # Seasonal variation (monsoon effect in June-September)
            day_of_year = self.day_counter % 365
            monsoon_effect = 0
            if 150 < day_of_year < 270:  # June to September
                monsoon_effect = 8 * math.sin((day_of_year - 150) * math.pi / 120)
            
            # Random daily variation
            noise = random.uniform(-pattern['volatility'], pattern['volatility'])
            
            # Calculate final groundwater level (ensure it stays positive)
            groundwater_level = max(5, self.base_levels[district_id] + trend + monsoon_effect + noise)
            
            # Generate correlated metrics
            metrics = {
                'groundwater_level': round(groundwater_level, 2),
                'rainfall': round(max(0, random.uniform(0, 600) + (monsoon_effect * 50)), 2),
                'temperature': round(random.uniform(20, 42), 1),
                'extraction_rate': round(random.uniform(100, 1500), 2),
                'population_affected': random.randint(10000, 500000),
                'quality_score': round(random.uniform(0.7, 1.0), 2)
            }
            
            # Record sensor data
            sensor_reading = self.engine.record_sensor_data(district_id, metrics)
            
            if sensor_reading:
                # Check for alerts
                district_alerts = self.engine.check_and_trigger_alerts(district_id, metrics)
                alerts.extend(district_alerts)
        
        print(f"Simulation cycle {self.day_counter}: Generated data for {len(self.districts)} districts, triggered {len(alerts)} alerts")
        return alerts

    def generate_single_district_data(self, district_id: str) -> Dict:
        """
        Generate sensor data for a specific district
        
        Args:
            district_id: District to generate data for
            
        Returns:
            Dictionary of generated metrics
        """
        if district_id not in self.districts:
            raise ValueError(f"Unknown district: {district_id}")
        
        pattern = self.district_patterns.get(district_id, {'decline_rate': -0.2, 'volatility': 2})
        
        metrics = {
            'groundwater_level': round(random.uniform(20, 80), 2),
            'rainfall': round(random.uniform(0, 600), 2),
            'temperature': round(random.uniform(20, 42), 1),
            'extraction_rate': round(random.uniform(100, 1500), 2),
            'population_affected': random.randint(10000, 500000),
            'quality_score': round(random.uniform(0.7, 1.0), 2)
        }
        
        return metrics

# Global simulator instance
simulator = SensorSimulator()

def run_simulator():
    """
    Run one cycle of the simulator
    This function is called by the scheduler every 30 seconds
    """
    try:
        simulator.generate_sensor_data()
    except Exception as e:
        print(f"ERROR in simulator: {e}")

def get_simulator() -> SensorSimulator:
    """Get the global simulator instance"""
    return simulator
