import pandas as pd

# 1. Load your cleaned dataset
file_path = (
    r"C:\Users\ARYAN MAHAKUR\Downloads\archive (8)\Airline_Delay_Cause.csv"
)
df = pd.read_csv(file_path)

# 3. is_peak_season (Peak months: June, July, August, December)
df["is_peak_season"] = df["month"].isin([6, 7, 8, 12]).astype(int)

# 6. delay_per_flight (Average delay minutes per flight for each row)
df["delay_per_flight"] = df["arr_delay"] / df["arr_flights"]

# 7. carrier_mean_delay (Historical average delay per flight for each airline)
carrier_avg_map = df.groupby("carrier")["delay_per_flight"].mean().to_dict()
df["carrier_mean_delay"] = df["carrier"].map(carrier_avg_map)

# 8. airport_mean_delay (Historical average delay per flight for each airport)
airport_avg_map = df.groupby("airport")["delay_per_flight"].mean().to_dict()
df["airport_mean_delay"] = df["airport"].map(airport_avg_map)

# 9. carrier_total_flights (Total cumulative flight volume for each airline)
df["carrier_total_flights"] = df.groupby("carrier")["arr_flights"].transform(
    "sum"
)

# 10. airport_total_flights (Total cumulative flight volume for each airport)
df["airport_total_flights"] = df.groupby("airport")["arr_flights"].transform(
    "sum"
)

# 11. carrier_freq (Percentage share of records belonging to each airline)
total_rows = len(df)
df["carrier_freq"] = (
    df.groupby("carrier")["arr_flights"].transform("count") / total_rows
)

# 12. airport_freq (Percentage share of records belonging to each airport)
df["airport_freq"] = (
    df.groupby("airport")["arr_flights"].transform("count") / total_rows
)

# Save the updated dataset
output_path = (
    r"C:\Users\ARYAN MAHAKUR\Downloads\archive (8)\Airline_Delay_Featured.csv"
)
df.to_csv(output_path, index=False)
print(f"Features created and saved successfully to: {output_path}")