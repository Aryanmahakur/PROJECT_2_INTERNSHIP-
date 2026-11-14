import pandas as pd
from io import StringIO

# Load the data
file_path = r"C:\Users\ARYAN MAHAKUR\Desktop\VS CODE\PROJECT_2_INTERNSHIP\Data\train.csv"
output_path = r"C:\Users\ARYAN MAHAKUR\Desktop\VS CODE\PROJECT_2_INTERNSHIP\Data\eda_report.txt"

df = pd.read_csv(file_path)

# Capture df.info() as text
info_buffer = StringIO()
df.info(buf=info_buffer)
info_text = info_buffer.getvalue()

with open(output_path, "w", encoding="utf-8") as report:

    report.write("=" * 80 + "\n")
    report.write("EXPLORATORY DATA ANALYSIS REPORT\n")
    report.write("File: combined.csv\n")
    report.write("=" * 80 + "\n\n")

    # Dataset dimensions
    report.write("1. DATASET SIZE\n")
    report.write("-" * 80 + "\n")
    report.write(f"Rows: {df.shape[0]:,}\n")
    report.write(f"Columns: {df.shape[1]}\n")
    report.write(f"Shape: {df.shape}\n\n")

    # Columns
    report.write("2. COLUMN NAMES\n")
    report.write("-" * 80 + "\n")
    for number, column in enumerate(df.columns, start=1):
        report.write(f"{number}. {column}\n")
    report.write("\n")

    # Data types and non-null counts
    report.write("3. DATASET INFORMATION\n")
    report.write("-" * 80 + "\n")
    report.write(info_text + "\n")

    # First rows
    report.write("4. FIRST 5 ROWS\n")
    report.write("-" * 80 + "\n")
    report.write(df.head().to_string(index=False))
    report.write("\n\n")

    # Last rows
    report.write("5. LAST 5 ROWS\n")
    report.write("-" * 80 + "\n")
    report.write(df.tail().to_string(index=False))
    report.write("\n\n")

    # Missing values
    report.write("6. MISSING VALUES\n")
    report.write("-" * 80 + "\n")
    report.write(df.isnull().sum().to_string())
    report.write(f"\n\nTotal null values: {df.isnull().sum().sum():,}\n\n")

    # Duplicate rows
    report.write("7. DUPLICATE ROWS\n")
    report.write("-" * 80 + "\n")
    report.write(f"Total duplicate rows: {df.duplicated().sum():,}\n\n")

    # Unique values
    report.write("8. UNIQUE VALUES PER COLUMN\n")
    report.write("-" * 80 + "\n")
    report.write(df.nunique().to_string())
    report.write("\n\n")

    # Statistics
    report.write("9. STATISTICAL SUMMARY\n")
    report.write("-" * 80 + "\n")
    report.write(df.describe(include="all").T.to_string())
    report.write("\n\n")

    # Frequent values
    report.write("10. TOP 10 VALUES IN EACH COLUMN\n")
    report.write("-" * 80 + "\n")

    for column in df.columns:
        report.write(f"\nCOLUMN: {column}\n")
        report.write("-" * 40 + "\n")
        report.write(df[column].value_counts(dropna=False).head(10).to_string())
        report.write("\n")

print(f"Report created successfully:\n{output_path}")