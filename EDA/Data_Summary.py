import numpy as np
import pandas as pd

# Load CSV file
df = pd.read_csv(r"C:\Users\ARYAN MAHAKUR\Downloads\archive (8)\Airline_Delay_Cause.csv")

def DataSummary(df):

    # ==========================================================
    # 1. DATASET OVERVIEW
    # ==========================================================
    print("\n" + "=" * 70)
    print("                  DATASET OVERVIEW")
    print("=" * 70)

    print("\nDataset Shape:")
    print(df.shape)

    print("\nTotal Number of Records:")
    print(df.shape[0])

    print("\nTotal Number of Features:")
    print(df.shape[1])

    print("\nTotal Dataset Elements:")
    print(df.size)

    # ==========================================================
    # 2. DATASET INFORMATION
    # ==========================================================
    print("\n" + "=" * 70)
    print("                  DATASET INFORMATION")
    print("=" * 70)

    print("\nDataset Type:")
    print(type(df))

    print("\nIndex Type:")
    print(type(df.index))

    print("\nDataset Information:")
    df.info(memory_usage="deep")

    print("\nMemory Usage (MB):")
    print(f"{df.memory_usage(deep=True).sum() / (1024**2):.2f} MB")

    # ==========================================================
    # 3. COLUMN INFORMATION
    # ==========================================================
    print("\n" + "=" * 70)
    print("                  COLUMN INFORMATION")
    print("=" * 70)

    print("\nColumn Names:")
    print(df.columns.tolist())

    print("\nColumn Data Types:")
    print(df.dtypes)

    print("\nData Type Distribution:")
    print(df.dtypes.value_counts())

    # ==========================================================
    # 4. MISSING VALUE ANALYSIS
    # ==========================================================
    print("\n" + "=" * 70)
    print("                  MISSING VALUE ANALYSIS")
    print("=" * 70)

    print("\nMissing Values Per Column:")
    print(df.isnull().sum())

    print("\nMissing Value Percentage:")
    print((df.isnull().mean() * 100).round(2))

    print("\nTotal Missing Values:")
    print(df.isnull().sum().sum())

    print("\nTotal Complete Records:")
    print(df.notnull().all(axis=1).sum())

    # ==========================================================
    # 5. DUPLICATE ANALYSIS
    # ==========================================================
    print("\n" + "=" * 70)
    print("                  DUPLICATE ANALYSIS")
    print("=" * 70)

    duplicate_count = df.duplicated().sum()

    print("\nTotal Duplicate Records:")
    print(duplicate_count)

    print("\nTotal Unique Records:")
    print(len(df) - duplicate_count)

    print("\nDuplicate Percentage:")
    print(f"{(duplicate_count / len(df)) * 100:.2f}%")

    # ==========================================================
    # 6. DESCRIPTIVE STATISTICS
    # ==========================================================
    print("\n" + "=" * 70)
    print("                  DESCRIPTIVE STATISTICS")
    print("=" * 70)

    print("\nNumerical Feature Statistics:")
    print(df.describe(include=[np.number]).T)

    print("\nCategorical Feature Statistics:")
    categorical = df.select_dtypes(include=["object", "category"])

    if not categorical.empty:
        print(categorical.describe().T)
    else:
        print("No categorical columns available.")

    # ==========================================================
    # 7. UNIQUE VALUE ANALYSIS
    # ==========================================================
    print("\n" + "=" * 70)
    print("                  UNIQUE VALUE ANALYSIS")
    print("=" * 70)

    print("\nUnique Values Per Column:")
    for col in df.columns:
        print(f"{col}: {df[col].nunique(dropna=True)}")

    # ==========================================================
    # 8. CONSTANT FEATURE ANALYSIS
    # ==========================================================
    print("\n" + "=" * 70)
    print("                  CONSTANT FEATURE ANALYSIS")
    print("=" * 70)

    constant_columns = [
        col for col in df.columns
        if df[col].nunique(dropna=False) <= 1
    ]

    print("\nConstant Columns:")
    print(constant_columns if constant_columns else "None")

    # ==========================================================
    # 9. FINAL DATASET SUMMARY
    # ==========================================================
    print("\n" + "=" * 70)
    print("                  FINAL DATASET SUMMARY")
    print("=" * 70)

    print(f"\nTotal Records        : {df.shape[0]:,}")
    print(f"Total Features       : {df.shape[1]:,}")
    print(f"Missing Values       : {df.isnull().sum().sum():,}")
    print(f"Duplicate Records    : {duplicate_count:,}")
    print(f"Numerical Features   : {df.select_dtypes(include=np.number).shape[1]}")
    print(f"Categorical Features : {df.select_dtypes(include=['object', 'category']).shape[1]}")
    print(f"Boolean Features     : {df.select_dtypes(include='bool').shape[1]}")

    print("\n" + "=" * 70)
    print("                  EDA COMPLETED")
    print("=" * 70)


# ==============================================================
# EXECUTE DATASET SUMMARY
# ==============================================================
DataSummary(df)