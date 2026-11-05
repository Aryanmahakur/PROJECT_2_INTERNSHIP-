import pandas as pd

def load_DataSet():

    df = pd.read_csv(
        r"C:\Users\ARYAN MAHAKUR\Desktop\VS CODE\PROJECT_2_INTERNSHIP\DataSet\Viral_Genomes.csv"
    )

    return df