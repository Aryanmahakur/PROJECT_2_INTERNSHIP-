import pandas as pd

# Load existing files
test_path = r"C:\Users\ARYAN MAHAKUR\Desktop\VS CODE\PROJECT_2_INTERNSHIP\Data\test.csv"
train_path = r"C:\Users\ARYAN MAHAKUR\Desktop\VS CODE\PROJECT_2_INTERNSHIP\Data\train.csv"

df1 = pd.read_csv(test_path)
df2 = pd.read_csv(train_path)

# Remove identifier columns
columns_to_remove = ["ID", "Delivery_person_ID"]

df1 = df1.drop(columns=columns_to_remove)
df2 = df2.drop(columns=columns_to_remove)

# Overwrite the same CSV files
df1.to_csv(test_path, index=False)
df2.to_csv(train_path, index=False)

print("ID columns removed successfully.")
print("Test data shape:", df1.shape)
print("Train data shape:", df2.shape)