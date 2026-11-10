from datetime import date

def predict_route_delay(df, model, encoder, origin, destination):
    route = df[
        (df["Origin"] == origin) &
        (df["Dest"] == destination)
    ]

    if route.empty:
        print("No flights found for this origin and destination.")
        return

    row = route.mode().iloc[[0]].copy()

    today = date.today()
    row["Month"] = today.month
    row["DayOfWeek"] = today.isoweekday()

    category_columns = ["Reporting_Airline", "Origin", "Dest"]
    row[category_columns] = encoder.transform(row[category_columns])

    row = row[model.feature_names_in_]

    prediction = model.predict(row)[0]
    probability = model.predict_proba(row)[0][1]

    print("15+ minute arrival delay:", "Yes" if prediction == 1 else "No")
    print(f"Estimated probability: {probability:.1%}")
    