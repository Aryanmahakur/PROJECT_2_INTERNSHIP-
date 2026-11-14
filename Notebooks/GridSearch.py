import os
import joblib
import pandas as pd

from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline

# Paths
data_folder = r"C:\Users\ARYAN MAHAKUR\Desktop\VS CODE\PROJECT_2_INTERNSHIP\Data"
joblib_folder = os.path.join(data_folder, "joblib")

os.makedirs(joblib_folder, exist_ok=True)

# Load files
X_train = pd.read_csv(os.path.join(data_folder, "X_train.csv"))
X_test = pd.read_csv(os.path.join(data_folder, "X_test.csv"))

y_train = pd.read_csv(
    os.path.join(data_folder, "y_train.csv")
).squeeze("columns")

y_test = pd.read_csv(
    os.path.join(data_folder, "y_test.csv")
).squeeze("columns")

# Show columns that have missing values
null_columns = X_train.isnull().sum()
print("Missing values in X_train:")
print(null_columns[null_columns > 0])

# Pipeline: fill null values first, then train model
pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("model", RandomForestRegressor(
        random_state=42,
        n_jobs=-1
    ))
])

# Grid Search parameters
param_grid = {
    "model__n_estimators": [100, 200],
    "model__max_depth": [None, 20],
    "model__min_samples_split": [2, 5],
    "model__min_samples_leaf": [1, 2],
    "model__max_features": ["sqrt"]
}

# Grid Search
grid_search = GridSearchCV(
    estimator=pipeline,
    param_grid=param_grid,
    scoring="neg_mean_absolute_error",
    cv=3,
    n_jobs=-1,
    verbose=2
)

# Train
grid_search.fit(X_train, y_train)

# Best pipeline: imputer + best Random Forest model
best_model = grid_search.best_estimator_

# Predict
predictions = best_model.predict(X_test)

# Evaluate
mae = mean_absolute_error(y_test, predictions)
r2 = r2_score(y_test, predictions)

print("\nBest Parameters:")
print(grid_search.best_params_)

print("\nValidation Results:")
print("MAE:", round(mae, 2))
print("R2 Score:", round(r2, 3))

# Save complete pipeline
joblib.dump(
    best_model,
    os.path.join(joblib_folder, "best_random_forest_pipeline.joblib")
)

print("\nBest pipeline saved successfully.")