import os
import pandas as pd

# File paths
input_path = r"C:\Users\ARYAN MAHAKUR\Downloads\Airline_DataSet\master_2025_airline_details.csv"
output_dir = r"C:\Users\ARYAN MAHAKUR\Desktop\VS CODE\PROJECT_2_INTERNSHIP\DataSet"
output_path = os.path.join(output_dir, "subset_500k_airline_2025.csv")

# Exact required features list
required_features = [
    'Month',
    'DayOfWeek',
    'Reporting_Airline',
    'Flight_Number_Reporting_Airline',
    'Tail_Number',
    'Origin',
    'Dest',
    'Distance',
    'CRSDepTime',
    'CRSArrTime',
    'DepTimeBlk',
    'ArrTimeBlk',
    'DepDelay',
    'TaxiOut',
    'ArrDelay',
    'ArrDel15'
]

print("Loading required columns from master dataset...")
df = pd.read_csv(input_path, usecols=required_features, low_memory=False)

# Calculate exact rows per month for 500,000 total target
target_total = 500000
samples_per_month = target_total // 12  # Exactly 41,666 rows per month

print(f"Sampling {samples_per_month:,} rows per month from all 12 months...")

monthly_samples = []
for m in range(1, 13):
    # Filter rows for the specific month
    month_df = df[df['Month'] == m]
    
    # Randomly sample the target amount for this month
    sampled_month = month_df.sample(n=samples_per_month, random_state=42)
    monthly_samples.append(sampled_month)

# Combine all monthly samples together
df_subset = pd.concat(monthly_samples, ignore_index=True)

# Shuffle the final dataset so the months are completely mixed up
df_subset = df_subset.sample(frac=1, random_state=42).reset_index(drop=True)

print(f"\nFinal balanced dataset shape: {df_subset.shape}")
print("Row count breakdown per month:")
print(df_subset['Month'].value_counts().sort_index())

# Save the balanced subset to your project folder
print(f"\nSaving balanced subset to: {output_path}")
df_subset.to_csv(output_path, index=False)

print("Done! Perfectly balanced 500k dataset created.")