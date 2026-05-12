from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from datetime import datetime

db = SQLAlchemy()

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

class PredictionHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    bedrooms = db.Column(db.Integer)
    bathrooms = db.Column(db.Integer)
    living_area = db.Column(db.Float)
    condition = db.Column(db.Integer)
    schools_nearby = db.Column(db.Integer)

    predicted_price = db.Column(db.Float)

    timestamp = db.Column(db.DateTime, default=datetime.utcnow)