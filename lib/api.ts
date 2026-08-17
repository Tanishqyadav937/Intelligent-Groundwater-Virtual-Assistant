const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface GroundwaterPredictionInput {
  rainfall: number;
  temperature: number;
  extraction_rate: number;
  recharge_capacity: number;
  population: number;
  irrigation_area: number;
}

export interface PredictionResponse {
  success: boolean;
  data?: {
    prediction: number;
    unit: string;
    model_type: string;
  };
  error?: string;
}

export async function predictGroundwater(
  data: GroundwaterPredictionInput
): Promise<PredictionResponse> {

  const response = await fetch(`${API_URL}/api/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rainfall: Number(data.rainfall),
      temperature: Number(data.temperature),
      extraction_rate: Number(data.extraction_rate),
      recharge_capacity: Number(data.recharge_capacity),
      population: Number(data.population),
      irrigation_area: Number(data.irrigation_area),
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Prediction failed");
  }

  return result;
}

export async function getModelInfo() {
  const response = await fetch(`${API_URL}/api/model-info`);

  if (!response.ok) {
    throw new Error("Failed to fetch model information");
  }

  return response.json();
}

export async function healthCheck() {
  const response = await fetch(`${API_URL}/health`);

  if (!response.ok) {
    throw new Error("Backend is not available");
  }

  return response.json();
}
