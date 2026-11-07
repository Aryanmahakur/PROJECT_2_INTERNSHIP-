import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Load data
df = pd.read_csv(r"C:\Users\ARYAN MAHAKUR\Downloads\archive (8)\Airline_Delay_Cause.csv")

# =========================================================
# 1. BASIC SUMMARY
# =========================================================
print("="*60)
print("DATASET SUMMARY")
print("="*60)
print(f"Shape              : {df.shape}")
print(f"Total Records      : {df.shape[0]:,}")
print(f"Total Features     : {df.shape[1]}")
print(f"Duplicate Rows     : {df.duplicated().sum()}")
print(f"Total Missing Values: {df.isnull().sum().sum():,}")

# =========================================================
# 2. FEATURES WITH MOST NULL VALUES
# =========================================================
print("\n" + "="*60)
print("FEATURES WITH MOST NULL VALUES")
print("="*60)

null_df = pd.DataFrame({
    "Missing Count": df.isnull().sum(),
    "Missing %": (df.isnull().mean() * 100).round(2)
}).sort_values("Missing Count", ascending=False)

print(null_df[null_df["Missing Count"] > 0])

# =========================================================
# 3. TARGET VARIABLE
# =========================================================
print("\n" + "="*60)
print("TARGET VARIABLE (y)")
print("="*60)
print("y = arr_delay  (Total Delay Time in minutes)")

y = df["arr_delay"]

# =========================================================
# 4. MOST IMPORTANT FEATURES (Correlation with arr_delay)
# =========================================================
print("\n" + "="*60)
print("MOST IMPORTANT FEATURES (Correlation with arr_delay)")
print("="*60)

# Only numerical columns
num_cols = df.select_dtypes(include=np.number).columns.tolist()
corr = df[num_cols].corr()["arr_delay"].drop("arr_delay").sort_values(ascending=False)

print(corr)

# =========================================================
# 5. PLOTS
# =========================================================

plt.style.use("seaborn-v0_8-whitegrid")
sns.set_palette("viridis")

# ----- Plot 1: Missing Values -----
plt.figure(figsize=(10, 5))
null_df[null_df["Missing Count"] > 0]["Missing %"].plot(kind="bar", color="salmon")
plt.title("Features with Missing Values (%)", fontsize=14)
plt.ylabel("Missing Percentage")
plt.xticks(rotation=45, ha="right")
plt.tight_layout()
plt.show()

# ----- Plot 2: Distribution of Target (arr_delay) -----
plt.figure(figsize=(10, 5))
sns.histplot(df["arr_delay"].dropna(), bins=50, kde=True, color="steelblue")
plt.title("Distribution of Total Delay Time (arr_delay)", fontsize=14)
plt.xlabel("Total Delay Minutes")
plt.ylabel("Frequency")
plt.tight_layout()
plt.show()

# ----- Plot 3: Correlation of Numerical Features with Target -----
plt.figure(figsize=(10, 6))
corr.plot(kind="barh", color="teal")
plt.title("Correlation of Features with arr_delay (Target)", fontsize=14)
plt.xlabel("Correlation Coefficient")
plt.tight_layout()
plt.show()

# ----- Plot 4: Top 8 Most Correlated Features (Heatmap style) -----
top_features = corr.head(8).index.tolist() + ["arr_delay"]
plt.figure(figsize=(10, 8))
sns.heatmap(df[top_features].corr(), annot=True, cmap="coolwarm", fmt=".2f", linewidths=0.5)
plt.title("Correlation Heatmap - Top Features vs arr_delay", fontsize=14)
plt.tight_layout()
plt.show()

# ----- Plot 5: Average Delay by Month -----
plt.figure(figsize=(10, 5))
monthly_delay = df.groupby("month")["arr_delay"].mean()
sns.barplot(x=monthly_delay.index, y=monthly_delay.values, palette="magma")
plt.title("Average Total Delay by Month", fontsize=14)
plt.xlabel("Month")
plt.ylabel("Average Delay Minutes")
plt.tight_layout()
plt.show()

print("\nAll plots generated successfully!")