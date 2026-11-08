import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns

# 1. Load dataset
file_path = (
    r"C:\Users\ARYAN MAHAKUR\Downloads\archive (8)\Airline_Delay_Cause.csv"
)
df = pd.read_csv(file_path)

# Ensure data leakage columns are dropped if still present in the file
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
df.drop(columns=cols_to_drop, inplace=True, errors="ignore")

# Drop rows where target or flights are missing
df_clean = df.dropna(subset=["arr_delay", "arr_flights"]).copy()

# Set plot style
plt.style.use("seaborn-v0_8-whitegrid")
palette = "viridis"

# =========================================================
# PLOT 1: Average Arrival Delay by Month
# =========================================================
plt.figure(figsize=(10, 5))
monthly_delay = df_clean.groupby("month")["arr_delay"].mean().reset_index()
sns.barplot(
    data=monthly_delay, x="month", y="arr_delay", palette="crest", hue="month"
)
plt.title(
    "Average Arrival Delay (Minutes) by Month", fontsize=14, fontweight="bold"
)
plt.xlabel("Month", fontsize=12)
plt.ylabel("Mean Arrival Delay (min)", fontsize=12)
plt.tight_layout()
plt.show()

# =========================================================
# PLOT 2: Distribution of Arrival Flights (arr_flights)
# =========================================================
plt.figure(figsize=(10, 5))
sns.histplot(
    df_clean["arr_flights"], bins=50, kde=True, color="steelblue"
)
plt.title(
    "Distribution of Arrival Flights per Record", fontsize=14, fontweight="bold"
)
plt.xlabel("Arrival Flights", fontsize=12)
plt.ylabel("Frequency", fontsize=12)
plt.tight_layout()
plt.show()

# =========================================================
# PLOT 3: Top 10 Carriers with Highest Total Delays
# =========================================================
plt.figure(figsize=(12, 6))
top_carriers = (
    df_clean.groupby("carrier")["arr_delay"]
    .sum()
    .sort_values(ascending=False)
    .head(10)
    .reset_index()
)
sns.barplot(
    data=top_carriers,
    x="carrier",
    y="arr_delay",
    palette="magma",
    hue="carrier",
)
plt.title(
    "Top 10 Carriers by Cumulative Arrival Delay",
    fontsize=14,
    fontweight="bold",
)
plt.xlabel("Carrier Code", fontsize=12)
plt.ylabel("Total Delay Minutes", fontsize=12)
plt.tight_layout()
plt.show()

# =========================================================
# PLOT 4: Top 10 Airports with Highest Total Delays
# =========================================================
plt.figure(figsize=(12, 6))
top_airports = (
    df_clean.groupby("airport")["arr_delay"]
    .sum()
    .sort_values(ascending=False)
    .head(10)
    .reset_index()
)
sns.barplot(
    data=top_airports,
    x="airport",
    y="arr_delay",
    palette="rocket",
    hue="airport",
)
plt.title(
    "Top 10 Airports by Cumulative Arrival Delay", fontsize=14, fontweight="bold"
)
plt.xlabel("Airport Code", fontsize=12)
plt.ylabel("Total Delay Minutes", fontsize=12)
plt.tight_layout()
plt.show()

# =========================================================
# PLOT 5: Correlation Heatmap (Clean Numerical Features)
# =========================================================
plt.figure(figsize=(8, 6))
num_cols = ["year", "month", "arr_flights", "arr_delay"]
corr_matrix = df_clean[num_cols].corr()

sns.heatmap(
    corr_matrix, annot=True, cmap="coolwarm", fmt=".2f", linewidths=0.8
)
plt.title(
    "Correlation Heatmap (Cleaned Numerical Features)",
    fontsize=14,
    fontweight="bold",
)
plt.tight_layout()
plt.show()

print("All cleaned EDA plots generated successfully!")