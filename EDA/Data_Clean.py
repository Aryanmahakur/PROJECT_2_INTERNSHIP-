import os
import pandas as pd


def clean_airline_data(file_path: str):
    """
    Load the dataset, remove duplicates and rows with missing targets,
    handle selected missing values, convert time blocks to hour features,
    and save the cleaned dataset back to the same file.
    """
    print(f"Loading dataset from: {file_path}")

    if not os.path.exists(file_path):
        raise FileNotFoundError(f"File not found at: {file_path}")

    df = pd.read_csv(file_path, low_memory=False)
    print(f"Initial row count: {len(df):,}")

    # 1. Drop duplicate rows
    duplicates_count = df.duplicated().sum()
    df.drop_duplicates(inplace=True)
    print(f"Dropped {duplicates_count:,} duplicate rows.")

    # 2. Drop rows where either target value is missing
    target_cols = ["ArrDel15", "ArrDelay"]
    existing_targets = [col for col in target_cols if col in df.columns]

    if existing_targets:
        before_target_drop = len(df)
        df.dropna(subset=existing_targets, inplace=True)
        dropped_targets = before_target_drop - len(df)
        print(f"Dropped {dropped_targets:,} rows with missing target values.")

    # 3. Handle missing operational values
    if "DepDelay" in df.columns:
        missing_dep = df["DepDelay"].isna().sum()
        df["DepDelay"] = df["DepDelay"].fillna(0.0)
        print(f"Filled {missing_dep:,} missing DepDelay values with 0.0.")

    if "TaxiOut" in df.columns:
        missing_taxi = df["TaxiOut"].isna().sum()
        median_taxi = df["TaxiOut"].median()
        df["TaxiOut"] = df["TaxiOut"].fillna(median_taxi)
        print(f"Filled {missing_taxi:,} missing TaxiOut values with median ({median_taxi}).")

    # 4. Replace time-block columns with start/end hour features
    for column, prefix in [
        ("DepTimeBlk", "Dep"),
        ("ArrTimeBlk", "Arr"),
    ]:
        if column in df.columns:
            hours = df[column].astype("string").str.extract(
                r"^(\d{2})00-(\d{2})59$"
            )

            df[f"{prefix}StartHour"] = hours[0].astype("Int64")
            df[f"{prefix}EndHour"] = hours[1].astype("Int64") + 1
            df.drop(columns=[column], inplace=True)

    # 5. Final verification
    print("\n--- Cleaning Summary ---")
    print(f"Final clean dataset shape: {df.shape}")

    remaining_nulls = df.isnull().sum()
    print(f"Remaining null counts:\n{remaining_nulls[remaining_nulls > 0]}")

    # 6. Save the cleaned dataset
    df.to_csv(file_path, index=False)
    print(f"\nCleaned dataset successfully saved back to: {file_path}")

    return df


if __name__ == "__main__":
    target_file_path = (
        r"C:\Users\ARYAN MAHAKUR\Desktop\VS CODE"
        r"\PROJECT_2_INTERNSHIP\DataSet"
        r"\subset_500k_airline_2025.csv"
    )
    clean_airline_data(target_file_path)