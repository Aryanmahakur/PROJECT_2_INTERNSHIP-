import pandas as pd

file_path = r"C:\Users\ARYAN MAHAKUR\Desktop\VS CODE\PROJECT_2_INTERNSHIP\DataSet\air_delay_dataset.csv"

df = pd.read_csv(file_path)

print("Rows before removing missing ArrDelay:", f"{len(df):,}")
print("Columns:", df.shape[1])
print("Missing ArrDelay values:", f"{df['ArrDelay'].isna().sum():,}")

# Remove rows where the target is missing


print("\nRows after removing missing ArrDelay:", f"{len(df):,}")
print("Columns:", df.shape[1])

print("\nMissing values by column:")
print(df.isna().sum().to_string())

print("\nExact duplicate rows:", f"{df.duplicated().sum():,}")

print("\nData types:")
print(df.dtypes.to_string())



print("\nCleaned dataset saved.")