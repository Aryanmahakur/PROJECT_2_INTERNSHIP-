import os
import pandas as pd
from sklearn.model_selection import train_test_split

# -------------------- PATH --------------------
data_folder = r"C:\Users\ARYAN MAHAKUR\Desktop\VS CODE\PROJECT_2_INTERNSHIP\Data"
train_path = os.path.join(data_folder, "train.csv")

# -------------------- LOAD TRAIN DATA --------------------
df = pd.read_csv(train_path)

# -------------------- CREATE TARGET --------------------
# Uses Delivery_Time_Minutes if already created.
# Otherwise converts "(min) 24" into 24 from Time_taken(min).
if "Delivery_Time_Minutes" not in df.columns:
    df["Delivery_Time_Minutes"] = pd.to_numeric(
        df["Time_taken(min)"].astype(str).str.extract(r"(\d+)")[0],
        errors="coerce"
    )

# -------------------- DATE FEATURES --------------------
if "Order_Date" in df.columns:
    order_date = pd.to_datetime(
        df["Order_Date"],
        format="%d-%m-%Y",
        errors="coerce"
    )

    df["Order_Day"] = order_date.dt.day
    df["Order_Month"] = order_date.dt.month
    df["Order_DayOfWeek"] = order_date.dt.dayofweek

# -------------------- TIME FEATURES --------------------
if "Time_Orderd" in df.columns:
    order_time = pd.to_datetime(
        df["Time_Orderd"],
        format="%H:%M:%S",
        errors="coerce"
    )

    df["Order_Hour"] = order_time.dt.hour

if "Time_Order_picked" in df.columns:
    pickup_time = pd.to_datetime(
        df["Time_Order_picked"],
        format="%H:%M:%S",
        errors="coerce"
    )

    df["Pickup_Hour"] = pickup_time.dt.hour

# -------------------- REMOVE ONLY RAW DATE/TIME COLUMNS --------------------
columns_to_drop = [
    "Time_taken(min)",
    "Order_Date",
    "Time_Orderd",
    "Time_Order_picked"
]

columns_to_drop = [
    column for column in columns_to_drop
    if column in df.columns
]

df.drop(columns=columns_to_drop, inplace=True)

# Keep only rows with known target delivery time
df.dropna(subset=["Delivery_Time_Minutes"], inplace=True)

# -------------------- SEPARATE FEATURES AND TARGET --------------------
X = df.drop(columns=["Delivery_Time_Minutes"])
y = df[["Delivery_Time_Minutes"]]

# -------------------- TRAIN / VALIDATION SPLIT --------------------
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42
)

# -------------------- SAVE FILES --------------------
X_train.to_csv(os.path.join(data_folder, "X_train.csv"), index=False)
X_test.to_csv(os.path.join(data_folder, "X_test.csv"), index=False)
y_train.to_csv(os.path.join(data_folder, "y_train.csv"), index=False)
y_test.to_csv(os.path.join(data_folder, "y_test.csv"), index=False)

print("Files saved successfully.")
print("X_train:", X_train.shape)
print("X_test:", X_test.shape)
print("y_train:", y_train.shape)
print("y_test:", y_test.shape)