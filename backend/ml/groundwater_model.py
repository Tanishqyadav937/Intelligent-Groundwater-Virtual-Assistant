import joblib
import pandas as pd


class GroundwaterPredictionModel:

    def __init__(self):
        model_path = "backend/models/groundwater_predictor.pkl"

        print("Loading groundwater model...")

        self.model_package = joblib.load(model_path)

        self.model = self.model_package["voting_ensemble"]
        self.scaler = self.model_package["scaler"]

        self.feature_names = self.model_package["feature_names"]
        self.metrics = self.model_package["metrics"]

        print("Groundwater model loaded successfully!")

    def predict(
        self,
        rainfall,
        temperature,
        extraction_rate,
        recharge_capacity,
        population,
        irrigation_area
    ):

        data = pd.DataFrame([{
            "rainfall": rainfall,
            "temperature": temperature,
            "extraction_rate": extraction_rate,
            "recharge_capacity": recharge_capacity,
            "population": population,
            "irrigation_area": irrigation_area
        }])

        # Use the same scaler from training
        scaled_data = self.scaler.transform(data)

        # Use trained Voting Ensemble
        prediction = self.model.predict(scaled_data)[0]

        return float(prediction)

    def predict_from_dict(self, data: dict):

        feature_names = [
            'rainfall',
            'temperature',
            'extraction_rate',
            'recharge_capacity',
            'population',
            'irrigation_area'
        ]

        # Build DataFrame with explicit column order and float casting
        df = pd.DataFrame(
            [[float(data[f]) for f in feature_names]],
            columns=feature_names
        )

        # Transform using DataFrame to preserve feature names (suppresses sklearn warnings)
        scaled_data = self.scaler.transform(df)

        return self.model.predict(scaled_data)[0]

    def get_info(self):

        return {
            "model_type": "Voting Ensemble",
            "features": self.feature_names,
            "metrics": self.metrics
        }
