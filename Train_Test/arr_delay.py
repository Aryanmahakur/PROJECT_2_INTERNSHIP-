from sklearn.model_selection import train_test_split

def split_data(df):
    time_columns = [
        "DepStartHour",
        "DepEndHour",
        "ArrStartHour",
        "ArrEndHour"
    ]

    df = df.dropna(subset=time_columns)

    y = df["ArrDel15"]
    X = df.drop(columns=["ArrDel15", "ArrDelay"])

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y
    )

    return X_train, X_test, y_train, y_test