from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_login import LoginManager
from models import db, User, PredictionHistory
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required, current_user

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

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

CORS(app)

# Load model and scaler
model = pickle.load(open('model/house_price_model.pkl', 'rb'))
scaler = pickle.load(open('model/scaler.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    features = np.arrayexit()([[
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

@app.route('/register', methods=['POST'])
def register():
    data = request.json

    username = data['username']
    email = data['email']
    password = data['password']

    existing_user = User.query.filter(
        (User.username == username) |
        (User.email == email)
    ).first()

    if existing_user:
        return jsonify({
            'message': 'User already exists'
        }), 400

    hashed_password = generate_password_hash(password)

    new_user = User(
        username=username,
        email=email,
        password=hashed_password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        'message': 'User registered successfully'
    })

@app.route('/login', methods=['POST'])
def login():
    data = request.json

    email = data['email']
    password = data['password']

    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        login_user(user)

        return jsonify({
            'message': 'Login successful',
            'username': user.username
        })

    return jsonify({
        'message': 'Invalid credentials'
    }), 401

@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()

    return jsonify({
        'message': 'Logged out successfully'
    })

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)