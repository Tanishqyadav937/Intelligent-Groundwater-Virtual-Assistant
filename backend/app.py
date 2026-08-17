from flask import Flask, request, jsonify
from flask_cors import CORS

from ml.groundwater_model import GroundwaterPredictionModel


app = Flask(__name__)

# Allow requests from Next.js frontend
CORS(app)

# Load model once when server starts
model = GroundwaterPredictionModel()


@app.route("/", methods=["GET"])
def home():

    return jsonify({
        "success": True,
        "message": "INGRES AI Groundwater Prediction API is running"
    })


@app.route("/health", methods=["GET"])
def health():

    return jsonify({
        "status": "OK"
    })


@app.route("/api/model-info", methods=["GET"])
def model_info():

    return jsonify({
        "success": True,
        "data": model.get_info()
    })


@app.route("/api/predict", methods=["POST"])
def predict():

    try:

        print("Received Payload:", request.json)

        result = model.predict_from_dict(request.json)

        return jsonify({
            "prediction": float(result),
            "status": "success"
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
