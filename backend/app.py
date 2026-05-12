from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_login import LoginManager
from models import db, User, PredictionHistory

import pickle
import numpy as np

app = Flask(__name__)

# Flask Config
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///realestate.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize Extensions
db.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)

CORS(app)

# Load model and scaler
model = pickle.load(open('model/house_price_model.pkl', 'rb'))
scaler = pickle.load(open('model/scaler.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    features = np.array([[
        data['bedrooms'],
        data['bathrooms'],
        data['livingArea'],
        data['condition'],
        data['schoolsNearby']
    ]])

    scaled_features = scaler.transform(features)

    prediction = model.predict(scaled_features)[0]

    return jsonify({
        'predicted_price': prediction * 9
    })

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)