import os
import joblib
import pandas as pd

class GroundwaterPredictionModel:
    def __init__(self):
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        model_path = os.path.join(base_dir, "models", "groundwater_predictor.pkl")
        
        print(f"Loading model from: {model_path}")
        
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found at {model_path}")
        
        self.model_package = joblib.load(model_path)
        self.model = self.model_package.get("voting_ensemble")
        self.scaler = self.model_package.get("scaler")
        self.feature_names = self.model_package.get("feature_names", [
            "rainfall", "temperature", "extraction_rate", 
            "recharge_capacity", "population", "irrigation_area"
        ])
        self.metrics = self.model_package.get("metrics", {})
        
        print("✓ Groundwater model loaded successfully!")
    
    def predict(self, rainfall, temperature, extraction_rate, recharge_capacity, population, irrigation_area):
        data = pd.DataFrame([{
            "rainfall": float(rainfall),
            "temperature": float(temperature),
            "extraction_rate": float(extraction_rate),
            "recharge_capacity": float(recharge_capacity),
            "population": float(population),
            "irrigation_area": float(irrigation_area)
        }])
        
        scaled_data = self.scaler.transform(data)
        prediction = self.model.predict(scaled_data)[0]
        return float(prediction)
    
    def predict_from_dict(self, data_dict):
        try:
            return self.predict(
                rainfall=data_dict.get("rainfall"),
                temperature=data_dict.get("temperature"),
                extraction_rate=data_dict.get("extraction_rate"),
                recharge_capacity=data_dict.get("recharge_capacity"),
                population=data_dict.get("population"),
                irrigation_area=data_dict.get("irrigation_area")
            )
        except Exception as e:
            raise ValueError(f"Prediction failed: {str(e)}")
    
    def get_info(self):
        return {
            "model_type": "Voting Ensemble",
            "features": self.feature_names,
            "metrics": self.metrics
        }
