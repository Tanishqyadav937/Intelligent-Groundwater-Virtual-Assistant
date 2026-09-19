-- INGRES AI - Supabase Real-Time Alerts Database Schema
-- Run this in Supabase SQL Editor to set up the database

-- Create districts table
CREATE TABLE districts (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  state VARCHAR(50),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  critical_threshold DECIMAL(6, 2) DEFAULT 30,
  warning_threshold DECIMAL(6, 2) DEFAULT 50,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create sensor_readings table
CREATE TABLE sensor_readings (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  district_id VARCHAR(50) NOT NULL,
  groundwater_level DECIMAL(6, 2),
  rainfall DECIMAL(6, 2),
  temperature DECIMAL(6, 2),
  extraction_rate DECIMAL(8, 2),
  population_affected BIGINT,
  quality_score DECIMAL(3, 2),
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (district_id) REFERENCES districts(id)
);

-- Create alerts table
CREATE TABLE alerts (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  district_id VARCHAR(50) NOT NULL,
  severity VARCHAR(20) NOT NULL,
  alert_type VARCHAR(50),
  message TEXT NOT NULL,
  metric_type VARCHAR(50),
  metric_value DECIMAL(10, 2),
  triggered_at TIMESTAMP DEFAULT NOW(),
  acknowledged_by VARCHAR(100),
  acknowledged_at TIMESTAMP,
  notification_sent BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (district_id) REFERENCES districts(id)
);

-- Create alert_rules table
CREATE TABLE alert_rules (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  district_id VARCHAR(50),
  rule_name VARCHAR(100),
  condition_metric VARCHAR(50),
  condition_operator VARCHAR(10),
  condition_value DECIMAL(10, 2),
  severity VARCHAR(20),
  enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (district_id) REFERENCES districts(id)
);

-- Enable realtime for alerts (IMPORTANT for live updates)
ALTER TABLE alerts REPLICA IDENTITY FULL;
ALTER TABLE sensor_readings REPLICA IDENTITY FULL;

-- Insert sample districts
INSERT INTO districts (id, name, state, latitude, longitude, critical_threshold, warning_threshold) VALUES
('UP001', 'Agra', 'Uttar Pradesh', 27.1767, 78.0081, 30, 50),
('UP002', 'Lucknow', 'Uttar Pradesh', 26.8467, 80.9462, 30, 50),
('MP001', 'Indore', 'Madhya Pradesh', 22.7196, 75.8577, 30, 50),
('MP002', 'Bhopal', 'Madhya Pradesh', 23.1815, 79.9864, 30, 50),
('KA001', 'Bangalore', 'Karnataka', 12.9716, 77.5946, 30, 50),
('TN001', 'Chennai', 'Tamil Nadu', 13.0827, 80.2707, 30, 50),
('GJ001', 'Ahmedabad', 'Gujarat', 23.0225, 72.5714, 30, 50),
('PB001', 'Ludhiana', 'Punjab', 30.9010, 75.8573, 30, 50),
('RJ001', 'Jaipur', 'Rajasthan', 26.9124, 75.7873, 30, 50),
('MH001', 'Mumbai', 'Maharashtra', 19.0760, 72.8777, 30, 50);

-- Create indexes for better performance
CREATE INDEX idx_sensor_readings_district ON sensor_readings(district_id);
CREATE INDEX idx_sensor_readings_created_at ON sensor_readings(created_at DESC);
CREATE INDEX idx_alerts_district ON alerts(district_id);
CREATE INDEX idx_alerts_severity ON alerts(severity);
CREATE INDEX idx_alerts_triggered_at ON alerts(triggered_at DESC);

-- Create view for alert statistics
CREATE OR REPLACE VIEW alert_statistics AS
SELECT 
  district_id,
  COUNT(*) as total_alerts,
  SUM(CASE WHEN severity = 'CRITICAL' THEN 1 ELSE 0 END) as critical_count,
  SUM(CASE WHEN severity = 'WARNING' THEN 1 ELSE 0 END) as warning_count,
  SUM(CASE WHEN severity = 'INFO' THEN 1 ELSE 0 END) as info_count,
  MAX(triggered_at) as last_alert_time
FROM alerts
GROUP BY district_id;
