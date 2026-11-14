import pandas as pd
import numpy as np

# File paths
test_path = r"C:\Users\ARYAN MAHAKUR\Desktop\VS CODE\PROJECT_2_INTERNSHIP\Data\test.csv"
train_path = r"C:\Users\ARYAN MAHAKUR\Desktop\VS CODE\PROJECT_2_INTERNSHIP\Data\train.csv"

# Load data
df1 = pd.read_csv(test_path)
df2 = pd.read_csv(train_path)

# Distance between restaurant and delivery location
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


# Time difference between order and pickup
def order_to_pickup_time(order_time, pickup_time):
    order_time = pd.to_datetime(order_time, format="%H:%M:%S", errors="coerce")
    pickup_time = pd.to_datetime(pickup_time, format="%H:%M:%S", errors="coerce")

    # % 1440 also handles an order before midnight and pickup after midnight
    return ((pickup_time - order_time).dt.total_seconds() / 60) % 1440


# Add features to both datasets
for df in [df1, df2]:

    df["Distance_KM"] = haversine_distance(
        df["Restaurant_latitude"],
        df["Restaurant_longitude"],
        df["Delivery_location_latitude"],
        df["Delivery_location_longitude"]
    )

    df["Order_to_Pickup_Minutes"] = order_to_pickup_time(
        df["Time_Orderd"],
        df["Time_Order_picked"]
    )

# Save changes in the same files
df1.to_csv(test_path, index=False)
df2.to_csv(train_path, index=False)

print("Distance_KM and Order_to_Pickup_Minutes added successfully.")

print("\nTrain data new columns:")
print(df2[["Distance_KM", "Order_to_Pickup_Minutes"]].head())