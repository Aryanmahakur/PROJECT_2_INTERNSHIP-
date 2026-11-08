import numpy as np
import pandas as pd

# 1. Define the file path of your original dataset
file_path = (
    r"C:\Users\ARYAN MAHAKUR\Downloads\archive (8)\Airline_Delay_Cause.csv"
)

# 2. Load the dataset
df = pd.read_csv(file_path)

# 3. List of columns to drop
cols_to_drop = [
    "arr_del15",
    "carrier_delay",
    "weather_delay",
    "nas_delay",
    "security_delay",
    "late_aircraft_delay",
    "carrier_ct",
    "weather_ct",
    "nas_ct",
    "security_ct",
    "late_aircraft_ct",
    "arr_cancelled",
    "arr_diverted",
    "carrier_name",
    "airport_name",
]

# 4. Drop the columns in place
df.drop(columns=cols_to_drop, inplace=True, errors="ignore")

# 5. Overwrite the exact same original file with the cleaned data
df.to_csv(file_path, index=False)

print(f"Original dataset successfully updated and overwritten at: {file_path}")