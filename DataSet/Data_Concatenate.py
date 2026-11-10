import os
import pandas as pd

# Define the directory and all 12 monthly file names in order
base_dir = r"C:\Users\ARYAN MAHAKUR\Downloads\Airline_DataSet"
months = range(1, 13)

file_paths = [
    os.path.join(base_dir, f"On_Time_Reporting_Carrier_On_Time_Performance_(1987_present)_2025_{m}.csv")
    for m in months
]

print("Starting concatenation of all 2025 monthly airline datasets (keeping ALL features)...")

df_list = []

for path in file_paths:
    if not os.path.exists(path):
        print(f"Warning: File not found -> {path}")
        continue
    
    print(f"Reading all columns from: {os.path.basename(path)}")
    # Read the entire file without restricting columns
    df = pd.read_csv(path, low_memory=False)
    df_list.append(df)

# Concatenate all monthly DataFrames into a single master DataFrame
print("Concatenating all datasets...")
master_df = pd.concat(df_list, ignore_index=True, sort=False)

# Define output master file path
output_path = os.path.join(base_dir, "master_2025_airline_details.csv")

print(f"Saving full master dataset to: {output_path}")
master_df.to_csv(output_path, index=False)

print(f"Done! Master dataset successfully created with {master_df.shape[0]:,} rows and {master_df.shape[1]} columns.")