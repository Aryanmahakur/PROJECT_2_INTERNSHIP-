import pandas as pd
from sklearn.model_selection import train_test_split

def split_data(file_path):
    df = pd.read_csv(file_path)

    # Separate features and target
    X = df.drop(columns=["ArrDelay"])
    y = df["ArrDelay"]

    # Split into 80% training and 20% testing data
    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.20,
        random_state=42
    )

    return X_train, X_test, y_train, y_test


