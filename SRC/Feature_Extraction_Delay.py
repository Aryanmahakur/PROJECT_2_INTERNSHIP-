import pandas as pd
import numpy as np

# Input and output CSV files
input_path = r"C:\Users\ARYAN MAHAKUR\Downloads\Airline_DataSet\master_2025_airline_details.csv"
output_path = r"C:\Users\ARYAN MAHAKUR\Desktop\VS CODE\PROJECT_2_INTERNSHIP\DataSet\air_delay_dataset.csv"

# Columns to keep, including ArrDelay as the target for now
columns_to_keep = [
    "Quarter",
    "Month",
    "DayofMonth",
    "DayOfWeek",
    "Reporting_Airline",
    "Flight_Number_Reporting_Airline",
    "Origin",
    "Dest",
    "CRSDepTime",
    "CRSArrTime",
    "CRSElapsedTime",
    "Distance",
    "DistanceGroup",
    "ArrDelay",
]

# Read the source CSV
df = pd.read_csv(input_path)

# Keep only the required columns
df = df[columns_to_keep]

# Check that all 12 months are present
months = list(range(1, 13))
available_months = sorted(df["Month"].dropna().unique())

if available_months != months:
    raise ValueError(f"Expected months 1–12, but found: {available_months}")

# Allocate 500,000 rows as evenly as possible across the months
total_rows = 500_000
rows_per_month = total_rows // 12  # 41,666
extra_rows = total_rows % 12       # 8

rng = np.random.default_rng(seed=42)
months_with_extra_row = set(rng.choice(months, size=extra_rows, replace=False))

# Sample the allocated number of rows from each month
monthly_samples = []

for month in months:
    sample_size = rows_per_month + (1 if month in months_with_extra_row else 0)
    month_data = df[df["Month"] == month]

    if len(month_data) < sample_size:
        raise ValueError(
            f"Month {month} has only {len(month_data):,} rows; "
            f"{sample_size:,} are needed."
        )

    monthly_samples.append(
        month_data.sample(n=sample_size, random_state=42)
    )

# Combine and shuffle the monthly samples
air_delay_dataset = (
    pd.concat(monthly_samples)
    .sample(frac=1, random_state=42)
    .reset_index(drop=True)
)

# Save with column headers
air_delay_dataset.to_csv(output_path, index=False)

# Show final row counts by month
print(f"Saved {len(air_delay_dataset):,} rows to:")
print(output_path)
print("\nRows per month:")
print(air_delay_dataset["Month"].value_counts().sort_index())