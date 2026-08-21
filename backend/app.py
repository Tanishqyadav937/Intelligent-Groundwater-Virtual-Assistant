import os
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

app = Flask(__name__)
CORS(app)

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

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
