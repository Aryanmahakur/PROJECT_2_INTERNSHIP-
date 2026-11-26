from datetime import datetime
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
from pydantic import BaseModel

app = FastAPI()

# Enable CORS so the browser frontend can talk to the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Resolve path relative to this file (Map/app.py -> project root -> Data/joblib/...)
BASE_DIR = Path(__file__).resolve().parent.parent
model_path = BASE_DIR / "Data" / "joblib" / "best_random_forest_pipeline.joblib"

try:
    model = joblib.load(model_path)
    print(f">>> Random Forest model loaded successfully from {model_path}")
except Exception as e:
    model = None
    print(f">>> Error loading model from {model_path}: {e}")


class PredictionRequest(BaseModel):
    restaurant_lat: float
    restaurant_lng: float
    customer_lat: float
    customer_lng: float
    distance_km: float


@app.get("/")
def read_root():
    return {"status": "Delivery ML Backend is online!"}


@app.post("/predict")
def predict_delivery_time(req: PredictionRequest):
    if model is None:
        raise HTTPException(
            status_code=500, detail="Model is not loaded on the server."
        )

    try:
        order_time = datetime.now()
        order_minutes = order_time.hour * 60 + order_time.minute
        pickup_minutes = (order_minutes + 15) % 1440

        features = {
            "Restaurant_latitude": req.restaurant_lat,
            "Restaurant_longitude": req.restaurant_lng,
            "Delivery_location_latitude": req.customer_lat,
            "Delivery_location_longitude": req.customer_lng,
            "Distance_KM": req.distance_km,
            "Order_to_Pickup_Minutes": 15,
            "Order_Hour": order_time.hour,
            "Pickup_Hour": pickup_minutes // 60,
            "Order_Day": order_time.day,
            "Order_Month": order_time.month,
            "Order_DayOfWeek": order_time.weekday(),
            "Delivery_person_Age": 30,
            "Delivery_person_Ratings": 4.5,
            "multiple_deliveries": 0,
        }

        input_data = pd.DataFrame([features])

        if hasattr(model, "feature_names_in_"):
            expected_features = model.feature_names_in_
            for col in expected_features:
                if col not in input_data.columns:
                    input_data[col] = 0
            input_data = input_data[expected_features]

        # Model prediction representing time (e.g., food prep / processing time)
        predicted_prep_minutes = float(model.predict(input_data)[0])

        return {
            "distance_km": round(req.distance_km, 2),
            "prep_time_minutes": round(predicted_prep_minutes, 2),
        }

    except Exception as e:
        print(f"\n>>> MODEL PREDICTION ERROR: {str(e)}\n")
        raise HTTPException(status_code=400, detail=str(e))