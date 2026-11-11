import pandas as pd

def add_flight_features(file_path):
    df = pd.read_csv(file_path)

    # Scheduled departure and arrival hours and minutes
    df["CRSDepHour"] = df["CRSDepTime"] // 100
    df["CRSDepMinute"] = df["CRSDepTime"] % 100
    df["CRSArrHour"] = df["CRSArrTime"] // 100
    df["CRSArrMinute"] = df["CRSArrTime"] % 100

    # Calendar features (DayOfWeek: 1 = Monday, 7 = Sunday)
    df["IsWeekend"] = df["DayOfWeek"].isin([6, 7]).astype(int)
   

    # Season based on month
    season_map = {
        12: "Winter", 1: "Winter", 2: "Winter",
        3: "Spring", 4: "Spring", 5: "Spring",
        6: "Summer", 7: "Summer", 8: "Summer",
        9: "Fall", 10: "Fall", 11: "Fall",
    }
    df["Season"] = df["Month"].map(season_map)

    # Origin-destination route
    df["Route"] = df["Origin"].astype(str) + "_" + df["Dest"].astype(str)

    # Scheduled flight duration category
    df["FlightDurationGroup"] = pd.cut(
        df["CRSElapsedTime"],
        bins=[0, 90, 180, 300, float("inf")],
        labels=["Short", "Medium", "Long", "Very Long"],
    )

    # Distance category
    df["DistanceCategory"] = pd.cut(
        df["Distance"],
        bins=[0, 300, 700, 1500, float("inf")],
        labels=["Short", "Medium", "Long", "Very Long"],
    )

    # Save the updated data back to the same CSV
    df.to_csv(file_path, index=False)

    print("New features added and dataset saved.")
    print("Dataset shape:", df.shape)
    print("Added columns: CRSDepHour, CRSDepMinute, CRSArrHour, CRSArrMinute,")
    print("IsWeekend, IsMonday, IsFriday, Season, Route,")
    print("FlightDurationGroup, DistanceCategory")

# Run the function
file_path = r"C:\Users\ARYAN MAHAKUR\Desktop\VS CODE\PROJECT_2_INTERNSHIP\DataSet\air_delay_dataset.csv"
add_flight_features(file_path)