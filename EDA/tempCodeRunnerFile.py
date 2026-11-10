
import os
import pandas as pd
import numpy as np

# ==========================================
# 1. CONFIGURATION
# ==========================================

pd.set_option("display.max_columns", None)
pd.set_option("display.max_rows", 150)
pd.set_option("display.width", 1500)
pd.set_option("display.float_format", "{:,.3f}".format)

file_path = (
    r"C:\Users\ARYAN MAHAKUR\Desktop\VS CODE"
    r"\PROJECT_2_INTERNSHIP\DataSet"
    r"\subset_500k_airline_2025.csv"
)

# ==========================================
# 2. LOAD DATASET
# ==========================================

print("\nLoading Dataset...")

df = pd.read_csv(file_path, low_memory=False)

rows, columns = df.shape

print("\n" + "=" * 90)
print("                 DATASET OVERVIEW")
print("=" * 90)

print(f"Dataset Shape          : {rows:,} Rows × {columns} Columns")
print(f"Total Records          : {rows:,}")
print(f"Total Features          : {columns}")
print(f"Duplicate Rows         : {df.duplicated().sum():,}")
print(f"Total Memory Usage     : {df.memory_usage(deep=True).sum() / (1024**2):,.2f} MB")
print(f"Dataset File Size      : {os.path.getsize(file_path) / (1024**2):,.2f} MB")

# ==========================================
# 3. COLUMN DATA TYPES
# ==========================================

print("\n" + "=" * 90)
print("                 COLUMN DATA TYPES")
print("=" * 90)

dtype_summary = pd.DataFrame({
    "Data Type": df.dtypes.astype(str),
    "Non-Null Count": df.notnull().sum(),
    "Null Count": df.isnull().sum(),
    "Null Percentage (%)": df.isnull().mean() * 100,
    "Unique Values": df.nunique(dropna=True)
})

print(dtype_summary.sort_values(
    by="Null Percentage (%)", ascending=False
).to_string())

print("\nData Type Distribution:")
print(df.dtypes.value_counts())

# ==========================================
# 4. MISSING VALUE ANALYSIS
# ==========================================

print("\n" + "=" * 90)
print("                 MISSING VALUE ANALYSIS")
print("=" * 90)

missing_summary = pd.DataFrame({
    "Missing Count": df.isnull().sum(),
    "Missing Percentage (%)": df.isnull().mean() * 100,
    "Available Count": df.notnull().sum()
})

missing_summary = missing_summary[
    missing_summary["Missing Count"] > 0
].sort_values(by="Missing Percentage (%)", ascending=False)

if missing_summary.empty:
    print("No missing values found.")
else:
    print(missing_summary.to_string())

print(f"\nTotal Missing Cells: {df.isnull().sum().sum():,}")
print(f"Columns With Missing Values: {df.isnull().any().sum()}")
print(f"Columns Without Missing Values: {df.notnull().all().sum()}")

# ==========================================
# 5. DUPLICATE ANALYSIS
# ==========================================

print("\n" + "=" * 90)
print("                 DUPLICATE ANALYSIS")
print("=" * 90)

duplicate_count = df.duplicated().sum()

print(f"Duplicate Records: {duplicate_count:,}")
print(f"Unique Records: {len(df.drop_duplicates()):,}")
print(f"Duplicate Percentage: {duplicate_count / len(df) * 100:.2f}%")

# ==========================================
# 6. NUMERICAL FEATURE ANALYSIS
# ==========================================

print("\n" + "=" * 90)
print("                 NUMERICAL FEATURE ANALYSIS")
print("=" * 90)

numerical_df = df.select_dtypes(include=np.number)

if not numerical_df.empty:

    print("\nStatistical Summary:")
    print(numerical_df.describe().T.to_string())

    numerical_summary = pd.DataFrame({
        "Mean": numerical_df.mean(),
        "Median": numerical_df.median(),
        "Standard Deviation": numerical_df.std(),
        "Minimum": numerical_df.min(),
        "Maximum": numerical_df.max(),
        "Skewness": numerical_df.skew(),
        "Unique Values": numerical_df.nunique()
    })

    print("\nDetailed Numerical Statistics:")
    print(numerical_summary.to_string())

# ==========================================
# 7. CATEGORICAL FEATURE ANALYSIS
# ==========================================

print("\n" + "=" * 90)
print("                 CATEGORICAL FEATURE ANALYSIS")
print("=" * 90)

categorical_df = df.select_dtypes(
    include=["object", "category", "bool"]
)

if not categorical_df.empty:

    categorical_summary = pd.DataFrame({
        "Unique Values": categorical_df.nunique(),
        "Most Frequent Value": categorical_df.mode().iloc[0],
        "Most Frequent Count": categorical_df.apply(
            lambda x: x.value_counts().iloc[0]
            if not x.value_counts().empty else 0
        ),
        "Missing Values": categorical_df.isnull().sum()
    })

    print(categorical_summary.to_string())

    print("\nTop 10 Categories Per Feature:")

    for column in categorical_df.columns:

        print(f"\n--- {column} ---")

        print(
            categorical_df[column]
            .value_counts(dropna=False)
            .head(10)
            .to_string()
        )

# ==========================================
# 8. HIGH CARDINALITY ANALYSIS
# ==========================================

print("\n" + "=" * 90)
print("                 HIGH CARDINALITY FEATURES")
print("=" * 90)

cardinality = pd.DataFrame({
    "Unique Values": df.nunique(),
    "Unique Percentage (%)": (
        df.nunique() / len(df) * 100
    ).round(2)
})

cardinality = cardinality.sort_values(
    by="Unique Percentage (%)",
    ascending=False
)

print(cardinality.to_string())

# ==========================================
# 9. CONSTANT AND LOW-VARIANCE FEATURES
# ==========================================

print("\n" + "=" * 90)
print("                 CONSTANT FEATURES")
print("=" * 90)

constant_columns = [
    col for col in df.columns
    if df[col].nunique(dropna=False) <= 1
]

print("Constant Columns:", constant_columns)

print("\nLow-Cardinality Features (2 or fewer unique values):")

low_cardinality = [
    col for col in df.columns
    if df[col].nunique(dropna=True) <= 2
]

print(low_cardinality)

# ==========================================
# 10. OUTLIER ANALYSIS (IQR METHOD)
# ==========================================

print("\n" + "=" * 90)
print("                 OUTLIER ANALYSIS")
print("=" * 90)

outlier_summary = []

for col in numerical_df.columns:

    series = numerical_df[col].dropna()

    if series.nunique() <= 2:
        continue

    q1 = series.quantile(0.25)
    q3 = series.quantile(0.75)

    iqr = q3 - q1

    lower_bound = q1 - 1.5 * iqr
    upper_bound = q3 + 1.5 * iqr

    outliers = (
        (series < lower_bound) |
        (series > upper_bound)
    ).sum()

    outlier_summary.append({
        "Feature": col,
        "Outlier Count": outliers,
        "Outlier Percentage (%)": outliers / len(series) * 100,
        "Lower Bound": lower_bound,
        "Upper Bound": upper_bound
    })

outlier_df = pd.DataFrame(outlier_summary)

if not outlier_df.empty:
    print(
        outlier_df.sort_values(
            by="Outlier Percentage (%)",
            ascending=False
        ).to_string(index=False)
    )

# ==========================================
# 11. CORRELATION ANALYSIS
# ==========================================

print("\n" + "=" * 90)
print("                 NUMERICAL CORRELATION")
print("=" * 90)

if numerical_df.shape[1] >= 2:

    correlation = numerical_df.corr(method="pearson")

    print(correlation.to_string())

    print("\nHighly Correlated Feature Pairs (|r| >= 0.80):")

    upper_triangle = correlation.where(
        np.triu(
            np.ones(correlation.shape),
            k=1
        ).astype(bool)
    )

    high_corr = (
        upper_triangle
        .stack()
        .reset_index()
    )

    high_corr.columns = [
        "Feature 1", "Feature 2", "Correlation"
    ]

    high_corr = high_corr[
        high_corr["Correlation"].abs() >= 0.80
    ]

    print(high_corr.to_string(index=False))

# ==========================================
# 12. FINAL DATASET SUMMARY
# ==========================================

print("\n" + "=" * 90)
print("                 FINAL DATASET SUMMARY")
print("=" * 90)

print(f"""
Total Rows                 : {df.shape[0]:,}
Total Columns              : {df.shape[1]:,}
Numerical Features         : {len(numerical_df.columns)}
Categorical Features       : {len(categorical_df.columns)}
Missing Values             : {df.isnull().sum().sum():,}
Duplicate Rows             : {df.duplicated().sum():,}
Constant Features          : {len(constant_columns)}
Columns With Missing Data  : {df.isnull().any().sum()}
Total Memory               : {df.memory_usage(deep=True).sum() / (1024**2):.2f} MB
""")

print("=" * 90)
print("             DATASET ANALYSIS COMPLETED")
print("=" * 90)
