import joblib
from sklearn.preprocessing import LabelEncoder
def encode_data(X_train, X_test, y_train, y_test):

    carrier_encoder = LabelEncoder()
    airport_encoder = LabelEncoder()

    X_train['carrier'] = carrier_encoder.fit_transform(X_train['carrier'])
    X_test['carrier'] = carrier_encoder.transform(X_test['carrier'])

    X_train['airport'] = airport_encoder.fit_transform(X_train['airport'])
    X_test['airport'] = airport_encoder.transform(X_test['airport'])

    joblib.dump(carrier_encoder, 'carrier_encoder.pkl')
    joblib.dump(airport_encoder, 'airport_encoder.pkl')

    return X_train, X_test, y_train, y_test