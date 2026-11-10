import os
import joblib
import pandas as pd

from Encoder.encoder_deley import encode_categories
from Train_Test.arr_delay import split_data
from Models.Arr_Delay import train_adaboost
from Validation.Arr_Delay import validate_model
data_path = (
    r"C:\Users\ARYAN MAHAKUR\Desktop\VS CODE"
    r"\PROJECT_2_INTERNSHIP\DataSet"
    r"\subset_500k_airline_2025.csv"
)

model_folder = (
    r"C:\Users\ARYAN MAHAKUR\Desktop\VS CODE"
    r"\PROJECT_2_INTERNSHIP\Models"
)

os.makedirs(model_folder, exist_ok=True)

df = pd.read_csv(data_path)

X_train, X_test, y_train, y_test = split_data(df)
X_train, X_test, encoder = encode_categories(X_train, X_test)

model = train_adaboost(X_train, y_train)
validate_model(model, X_test, y_test)

joblib.dump(model, os.path.join(model_folder, "adaboost_arr_delay.joblib"))

print("Model and encoder saved.")