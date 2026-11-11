from catboost import CatBoostRegressor

def model_training(X_train, y_train, X_test):
    categorical_columns = X_train.select_dtypes(
        include=["object", "category"]
    ).columns.tolist()

    model = CatBoostRegressor(
        iterations=500,
        learning_rate=0.05,
        depth=8,
        loss_function="RMSE",
        random_seed=42,
        verbose=100
    )

    model.fit(
        X_train,
        y_train,
        cat_features=categorical_columns
    )

    y_pred = model.predict(X_test)

    return model, X_train, y_train, y_pred