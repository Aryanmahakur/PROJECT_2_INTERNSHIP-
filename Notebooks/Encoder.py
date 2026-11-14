import os
import joblib
import pandas as pd
from sklearn.preprocessing import OneHotEncoder

data_folder = r"C:\Users\ARYAN MAHAKUR\Desktop\VS CODE\PROJECT_2_INTERNSHIP\Data"

test_path = os.path.join(data_folder, "test.csv")
train_path = os.path.join(data_folder, "train.csv")
joblib_folder = os.path.join(data_folder, "joblib")

os.makedirs(joblib_folder, exist_ok=True)

df1 = pd.read_csv(test_path)
df2 = pd.read_csv(train_path)

one_hot_columns = [
    "Weatherconditions",
    "Type_of_order",
    "Type_of_vehicle",
    "City",
    "Festival"
]

# Fill missing categories
df1[one_hot_columns] = df1[one_hot_columns].fillna("Missing")
df2[one_hot_columns] = df2[one_hot_columns].fillna("Missing")

# Create and fit one-hot encoder
encoder_one_hot = OneHotEncoder(
    handle_unknown="ignore",
    sparse_output=False
)

train_encoded = encoder_one_hot.fit_transform(df2[one_hot_columns])
test_encoded = encoder_one_hot.transform(df1[one_hot_columns])

encoded_columns = encoder_one_hot.get_feature_names_out(one_hot_columns)

# Add new 0/1 columns
df2[encoded_columns] = train_encoded
df1[encoded_columns] = test_encoded

# Remove original category columns
df2.drop(columns=one_hot_columns, inplace=True)
df1.drop(columns=one_hot_columns, inplace=True)

# Traffic ordinal encoding
traffic_mapping = {
    "Low": 0,
    "Medium": 1,
    "High": 2,
    "Jam": 3
}

df2["Road_traffic_density"] = (
    df2["Road_traffic_density"].astype(str).str.strip().map(traffic_mapping)
)

df1["Road_traffic_density"] = (
    df1["Road_traffic_density"].astype(str).str.strip().map(traffic_mapping)
)

# Save changes into existing files
df2.to_csv(train_path, index=False)
df1.to_csv(test_path, index=False)

# Save the one-hot encoder
joblib.dump(
    encoder_one_hot,
    os.path.join(joblib_folder, "one_hot_encoder.joblib")
)

print("Encoded data saved in existing train.csv and test.csv.")
print("Encoder saved in the joblib folder.")