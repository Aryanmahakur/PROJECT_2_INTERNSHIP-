import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# -------------------- SETTINGS --------------------
file_path = r"C:\Users\ARYAN MAHAKUR\Desktop\VS CODE\PROJECT_2_INTERNSHIP\Data\combined.csv"
plots_folder = r"C:\Users\ARYAN MAHAKUR\Desktop\VS CODE\PROJECT_2_INTERNSHIP\Data\plots"

# Create plots folder if it does not exist
os.makedirs(plots_folder, exist_ok=True)

# Load dataset exactly as stored
df = pd.read_csv(file_path)

# Plot style
sns.set_theme(style="whitegrid")
plt.rcParams["figure.dpi"] = 120


# -------------------- 1. NULL VALUES --------------------
null_counts = df.isnull().sum().sort_values(ascending=False)
null_counts = null_counts[null_counts > 0]

plt.figure(figsize=(12, 6))
sns.barplot(x=null_counts.values, y=null_counts.index, hue=null_counts.index,
            palette="Reds_r", legend=False)
plt.title("Missing Values in Each Column")
plt.xlabel("Number of Missing Values")
plt.ylabel("Columns")
plt.tight_layout()
plt.savefig(os.path.join(plots_folder, "01_missing_values.png"))
plt.close()


# -------------------- 2. MISSING VALUE HEATMAP --------------------
# A sample is used because the full data has many rows.
missing_sample = df.sample(min(300, len(df)), random_state=42)

plt.figure(figsize=(14, 7))
sns.heatmap(missing_sample.isnull(), cbar=False, yticklabels=False, cmap="Reds")
plt.title("Missing Value Pattern (Sample of 300 Rows)")
plt.xlabel("Columns")
plt.tight_layout()
plt.savefig(os.path.join(plots_folder, "02_missing_values_heatmap.png"))
plt.close()


# -------------------- 3. OUTLIER BOXPLOTS --------------------
numeric_columns = df.select_dtypes(include=["int64", "float64"]).columns

for column in numeric_columns:
    plt.figure(figsize=(9, 5))
    sns.boxplot(x=df[column], color="skyblue")
    plt.title(f"Outlier Detection: {column}")
    plt.xlabel(column)
    plt.tight_layout()
    safe_name = column.replace(" ", "_").replace("/", "_")
    plt.savefig(os.path.join(plots_folder, f"outlier_{safe_name}.png"))
    plt.close()


# -------------------- 4. DELIVERY TIME OUTLIERS --------------------
# This creates a temporary numeric series for charts only.
# It does not change df or combined.csv.
delivery_time = pd.to_numeric(
    df["Time_taken(min)"].astype(str).str.extract(r"(\d+)")[0],
    errors="coerce"
)

plt.figure(figsize=(9, 5))
sns.boxplot(x=delivery_time, color="orange")
plt.title("Outlier Detection: Delivery Time")
plt.xlabel("Time Taken (minutes)")
plt.tight_layout()
plt.savefig(os.path.join(plots_folder, "03_outlier_delivery_time.png"))
plt.close()


# -------------------- 5. DELIVERY TIME DISTRIBUTION --------------------
plt.figure(figsize=(10, 5))
sns.histplot(delivery_time.dropna(), bins=30, kde=True, color="teal")
plt.title("Distribution of Delivery Time")
plt.xlabel("Time Taken (minutes)")
plt.ylabel("Number of Orders")
plt.tight_layout()
plt.savefig(os.path.join(plots_folder, "04_delivery_time_distribution.png"))
plt.close()


# -------------------- 6. CITY DISTRIBUTION --------------------
plt.figure(figsize=(10, 5))
city_order = df["City"].value_counts().index

sns.countplot(
    data=df,
    y="City",
    order=city_order,
    hue="City",
    palette="viridis",
    legend=False
)
plt.title("Number of Orders by City")
plt.xlabel("Number of Orders")
plt.ylabel("City")
plt.tight_layout()
plt.savefig(os.path.join(plots_folder, "05_orders_by_city.png"))
plt.close()


# -------------------- 7. ORDER TYPE DISTRIBUTION --------------------
plt.figure(figsize=(9, 5))
order_type_order = df["Type_of_order"].value_counts().index

sns.countplot(
    data=df,
    x="Type_of_order",
    order=order_type_order,
    hue="Type_of_order",
    palette="Set2",
    legend=False
)
plt.title("Orders by Type of Order")
plt.xlabel("Type of Order")
plt.ylabel("Number of Orders")
plt.xticks(rotation=30)
plt.tight_layout()
plt.savefig(os.path.join(plots_folder, "06_orders_by_type.png"))
plt.close()


# -------------------- 8. TRAFFIC DENSITY --------------------
plt.figure(figsize=(9, 5))
traffic_order = df["Road_traffic_density"].value_counts().index

sns.countplot(
    data=df,
    x="Road_traffic_density",
    order=traffic_order,
    hue="Road_traffic_density",
    palette="magma",
    legend=False
)
plt.title("Orders by Road Traffic Density")
plt.xlabel("Road Traffic Density")
plt.ylabel("Number of Orders")
plt.xticks(rotation=30)
plt.tight_layout()
plt.savefig(os.path.join(plots_folder, "07_traffic_density.png"))
plt.close()


# -------------------- 9. WEATHER CONDITIONS --------------------
plt.figure(figsize=(10, 5))
weather_order = df["Weatherconditions"].value_counts().index

sns.countplot(
    data=df,
    y="Weatherconditions",
    order=weather_order,
    hue="Weatherconditions",
    palette="coolwarm",
    legend=False
)
plt.title("Orders by Weather Condition")
plt.xlabel("Number of Orders")
plt.ylabel("Weather Condition")
plt.tight_layout()
plt.savefig(os.path.join(plots_folder, "08_weather_conditions.png"))
plt.close()


# -------------------- 10. CORRELATION HEATMAP --------------------
# Uses numeric columns only, plus temporary delivery_time for analysis.
correlation_data = df[numeric_columns].copy()
correlation_data["Delivery_Time_Minutes"] = delivery_time

plt.figure(figsize=(12, 8))
sns.heatmap(
    correlation_data.corr(),
    annot=True,
    cmap="coolwarm",
    fmt=".2f",
    linewidths=0.5
)
plt.title("Correlation Heatmap")
plt.tight_layout()
plt.savefig(os.path.join(plots_folder, "09_correlation_heatmap.png"))
plt.close()


print(f"All plots saved successfully in:\n{plots_folder}")