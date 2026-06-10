# Smart Real Estate Analytics System

A full-stack AI-powered real estate price prediction platform
built for the Bangalore housing market.

## Tech Stack

**Frontend:** React.js (Vite), React Router, Recharts, Leaflet.js
**Backend:** Flask, SQLAlchemy, Flask-Login
**ML Model:** Gradient Boosting Regressor (scikit-learn)
**Database:** SQLite
**Dataset:** Bengaluru House Price Data (Kaggle, 13,320 records)

## Features

- User authentication (register/login/logout)
- AI-powered property price prediction in lakhs INR
- Interactive Bangalore map with location-based price estimates
- Prediction history per user
- Property analytics chart
- Nearby area comparison table
- PDF report generation
- Light/dark mode across all screens

## Dataset

The model was trained using the Bengaluru House Price Data from Kaggle
containing 13,320 records of real Bangalore property listings.

**Features Used:**
- **BHK** — Number of bedrooms
- **Square Footage** — Total living area in sq ft
- **Bathrooms** — Number of bathrooms

**Target Variable:**
- **Price** — Property price in lakhs INR

**Data Preprocessing:**
- Handled range values in square footage (e.g. "1000-1200")
- Removed outliers (sqft < 300, price > 500 lakhs, bath > 9)
- Feature scaling using StandardScaler to normalise inputs

## ML Model

**Selected Model: Gradient Boosting Regressor**
- `n_estimators=100` — 100 boosting stages
- `random_state=42` — Ensures reproducibility

**Why Gradient Boosting:**
- Handles non-linear relationships well
- Resistant to overfitting when tuned properly
- Outperformed all other tested models on this dataset

## Model Comparison

| Model | R² Score | MAE (Lakhs) | RMSE | MAPE |
|---|---|---|---|---|
| Linear Regression | 0.4179 | 34.19 | 58.56 | 38.5% |
| Decision Tree | 0.5268 | 29.61 | 52.80 | 30.2% |
| Random Forest | 0.6195 | 27.75 | 47.34 | 28.8% |
| **Gradient Boosting** | **0.6492** | **27.63** | **45.46** | **29.4%** |
| XGBoost | 0.6330 | 27.71 | 46.50 | 28.9% |

The trained model and scaler are serialised using pickle and saved
as `house_price_model.pkl` and `scaler.pkl` respectively.

## Project Structure

```
├── backend/
│   ├── app.py           # Flask API routes
│   ├── models.py        # SQLAlchemy database models
│   ├── model/
│   │   ├── house_price_model.pkl
│   │   └── scaler.pkl
│   └── notebook/
│       └── train_model.ipynb
├── frontend/
│   └── src/
│       ├── pages/
│       │   ├── LoginPage.jsx
│       │   ├── HomePage.jsx
│       │   ├── DashboardPage.jsx
│       │   └── MapPage.jsx
│       └── components/
│           ├── PredictionForm.jsx
│           ├── PredictionResult.jsx
│           ├── AnalyticsChart.jsx
│           ├── AreaComparison.jsx
│           └── PropertyMap.jsx
```

## Setup

**Backend:**
```bash
cd backend
venv\Scripts\activate
python app.py
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Future Improvements

- Location-aware ML model using encoded Bangalore localities
- Dynamic color-coded map markers by price range
- Expanded dataset with more property features
- Mobile responsive design
- MongoDB integration for richer data storage
