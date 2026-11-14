import os
import joblib
import numpy as np
import pandas as pd
from datetime import datetime

# -------------------- PATHS --------------------
data_folder = r"C:\Users\ARYAN MAHAKUR\Desktop\VS CODE\PROJECT_2_INTERNSHIP\Data"

model_path = os.path.join(
    data_folder,
    "joblib",
    "best_random_forest_pipeline.joblib"
)

x_train_path = os.path.join(data_folder, "X_train.csv")

# -------------------- LOAD MODEL AND FEATURES --------------------
model = joblib.load(model_path)
X_train = pd.read_csv(x_train_path)

# Use average numeric values for fields not entered by the user
default_values = X_train.mean(numeric_only=True)

user_data = pd.DataFrame([default_values])
user_data = user_data.reindex(columns=X_train.columns)

# -------------------- USER INPUT --------------------
def read_coordinates(prompt):
    coordinate_text = input(prompt).strip()
    latitude, longitude = map(float, coordinate_text.split(","))
    return latitude, longitude

restaurant_latitude, restaurant_longitude = read_coordinates(
    "Restaurant coordinates (latitude, longitude): "
)

customer_latitude, customer_longitude = read_coordinates(
    "Customer coordinates (latitude, longitude): "
)

order_time_text = input("Order placed time (HH:MM, example 11:30): ")
pickup_time_text = input("Pickup time (HH:MM, example 11:45): ")

order_time = datetime.strptime(order_time_text, "%H:%M")
pickup_time = datetime.strptime(pickup_time_text, "%H:%M")

# -------------------- PICKUP WAITING TIME --------------------
order_minutes = order_time.hour * 60 + order_time.minute
pickup_minutes = pickup_time.hour * 60 + pickup_time.minute

order_to_pickup_minutes = (pickup_minutes - order_minutes) % 1440

# -------------------- DISTANCE FROM COORDINATES --------------------
def haversine_distance(lat1, lon1, lat2, lon2):
    earth_radius_km = 6371

    lat1 = np.radians(lat1)
    lon1 = np.radians(lon1)
    lat2 = np.radians(lat2)
    lon2 = np.radians(lon2)

    latitude_difference = lat2 - lat1
    longitude_difference = lon2 - lon1

    a = (
        np.sin(latitude_difference / 2) ** 2
        + np.cos(lat1)
        * np.cos(lat2)
        * np.sin(longitude_difference / 2) ** 2
    )

    return 2 * earth_radius_km * np.arcsin(np.sqrt(a))

distance_km = haversine_distance(
    restaurant_latitude,
    restaurant_longitude,
    customer_latitude,
    customer_longitude
)

# -------------------- ADD USER VALUES --------------------
user_data["Restaurant_latitude"] = restaurant_latitude
user_data["Restaurant_longitude"] = restaurant_longitude
user_data["Delivery_location_latitude"] = customer_latitude
user_data["Delivery_location_longitude"] = customer_longitude
user_data["Distance_KM"] = distance_km

user_data["Order_to_Pickup_Minutes"] = order_to_pickup_minutes
user_data["Order_Hour"] = order_time.hour
user_data["Pickup_Hour"] = pickup_time.hour

# Use current date
current_date = datetime.now()

user_data["Order_Day"] = current_date.day
user_data["Order_Month"] = current_date.month
user_data["Order_DayOfWeek"] = current_date.weekday()

# -------------------- DEFAULT CATEGORIES --------------------
one_hot_prefixes = [
    "Weatherconditions_",
    "Type_of_order_",
    "Type_of_vehicle_",
    "Festival_"
]

for prefix in one_hot_prefixes:
    category_columns = [
        column for column in X_train.columns
        if column.startswith(prefix)
    ]

    if category_columns:
        most_common_column = X_train[category_columns].mean().idxmax()

        user_data[category_columns] = 0
        user_data[most_common_column] = 1

# Set default city as Urban
city_columns = [
    column for column in X_train.columns
    if column.startswith("City_")
]

if city_columns:
    user_data[city_columns] = 0

    urban_column = next(
        (
            column for column in city_columns
            if column.strip() == "City_Urban"
        ),
        None
    )

    if urban_column is not None:
        user_data[urban_column] = 1

# Ensure columns match model training data exactly
user_data = user_data.reindex(columns=X_train.columns)

# -------------------- PREDICT --------------------
predicted_delivery_time = model.predict(user_data)[0]

# -------------------- RESULT --------------------
print("\nPrediction Result")
print("Distance:", round(distance_km, 2), "KM")
print("Pickup waiting time:", order_to_pickup_minutes, "minutes")
print("Predicted delivery time:", round(predicted_delivery_time, 2), "minutes")