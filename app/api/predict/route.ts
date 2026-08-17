import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const flaskUrl =
      process.env.FLASK_API_URL || "http://127.0.0.1:5000/api/predict";

    const response = await fetch(flaskUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error:
            data?.error ||
            `Flask backend returned status ${response.status}`,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error proxying request to Flask backend:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Flask prediction backend service is offline or unreachable at " +
          (process.env.FLASK_API_URL || "http://127.0.0.1:5000/api/predict"),
      },
      { status: 500 }
    );
  }
}
