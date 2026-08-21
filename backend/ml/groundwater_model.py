
import os
import joblib
import pandas as pd


class GroundwaterPredictionModel:

    def __init__(self):

        # Get the backend directory
        BASE_DIR = os.path.dirname(
            os.path.dirname(os.path.abspath(__file__))
        )

        # Load trained model package
        model_path = os.path.join(
            BASE_DIR,
            "models",
            "groundwater_predictor.pkl"
        )

        print("Loading groundwater model...")

        self.model_package = joblib.load(model_path)

        # Load trained Voting Ensemble
        self.model = self.model_package["voting_ensemble"]

        # Load scaler used during training
        self.scaler = self.model_package["scaler"]

        # Load feature names and metrics
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
            "rainfall",
            "temperature",
            "extraction_rate",
            "recharge_capacity",
            "population",
            "irrigation_area"
        ]

        # Build DataFrame with explicit column order
        df = pd.DataFrame(
            [[float(data[f]) for f in feature_names]],
            columns=feature_names
        )

        # Transform using the scaler from training
        scaled_data = self.scaler.transform(df)

        # Make prediction
        prediction = self.model.predict(scaled_data)[0]

        return float(prediction)

    def get_info(self):

        return {
            "model_type": "Voting Ensemble",
            "features": self.feature_names,
            "metrics": self.metrics
        }
