import pandas as pd

folder = r"C:\Users\ARYAN MAHAKUR\Desktop\VS CODE\PROJECT_2_INTERNSHIP\Data"

df1 = pd.read_csv(folder + r"\test.csv")
df2 = pd.read_csv(folder + r"\train.csv")

final_df = pd.concat([df1, df2], ignore_index=True)
final_df.to_csv(folder + r"\combined.csv", index=False)