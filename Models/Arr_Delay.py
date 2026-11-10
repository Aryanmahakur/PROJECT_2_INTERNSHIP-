from sklearn.ensemble import AdaBoostClassifier

def train_adaboost(X_train, y_train):
    model = AdaBoostClassifier(
        n_estimators=100,
        learning_rate=1.0,
        random_state=42
    )

    model.fit(X_train, y_train)
    return model