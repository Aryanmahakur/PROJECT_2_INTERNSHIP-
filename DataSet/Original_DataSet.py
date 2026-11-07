import pandas as pd

def load_DataSet():

    df = pd.read_csv(
        r"C:\Users\ARYAN MAHAKUR\Downloads\archive (8)\Airline_Delay_Cause.csv"
    )

    return df