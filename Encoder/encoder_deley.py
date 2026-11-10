import os
import joblib
from sklearn.preprocessing import OrdinalEncoder

def encode_categories(X_train, X_test):
    model_folder = r"C:\Users\ARYAN MAHAKUR\Desktop\VS CODE\PROJECT_2_INTERNSHIP\models"
    os.makedirs(model_folder, exist_ok=True)

    columns = ["Reporting_Airline", "Origin", "Dest"]
    encoder = OrdinalEncoder(
        handle_unknown="use_encoded_value",
        unknown_value=-1
    )

    X_train = X_train.copy()
    X_test = X_test.copy()

    X_train[columns] = encoder.fit_transform(X_train[columns])
    X_test[columns] = encoder.transform(X_test[columns])

    joblib.dump(encoder, os.path.join(model_folder, "category_encoder.joblib"))

    return X_train, X_test, encoder