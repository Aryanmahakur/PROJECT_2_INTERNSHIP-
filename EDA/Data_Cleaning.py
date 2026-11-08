import numpy as np
import pandas as pd

# 1. Load the dataset
file_path = (
    r"C:\Users\ARYAN MAHAKUR\Downloads\archive (8)\Airline_Delay_Cause.csv"
)
print("Loading dataset...")
df = pd.read_csv(file_path)
print(f"Original shape: {df.shape}")

# 2. Drop rows where 'arr_flights' or 'arr_delay' are missing
initial_count = len(df)
df.dropna(subset=["arr_flights", "arr_delay"], inplace=True)
dropped_count = initial_count - len(df)
print(f"Dropped {dropped_count} rows with missing null values.")

# 3. Clean categorical text columns (convert 'carrier' and 'airport' to lowercase and strip spaces)
if "carrier" in df.columns:
    df["carrier"] = df["carrier"].astype(str).str.strip().str.lower()
if "airport" in df.columns:
    df["airport"] = df["airport"].astype(str).str.strip().str.lower()

print("Categorical text columns ('carrier', 'airport') cleaned to lowercase.")

# 4. Quick sanity check on numerical values
invalid_flights = len(df[df["arr_flights"] <= 0])
print(f"Sanity check - Rows with <= 0 flights: {invalid_flights}")

# 5. Overwrite the original file on disk with the fully cleaned data
df.to_csv(file_path, index=False)
print(f"\nFinal cleaned dataset successfully saved and overwritten at:\n{file_path}")
print(f"Final dataset shape: {df.shape}")