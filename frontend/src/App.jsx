import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PredictionForm from './components/PredictionForm';
import PredictionResult from './components/PredictionResult';
import AnalyticsChart from './components/AnalyticsChart';
import AreaComparison from './components/AreaComparison';
import AuthForm from './components/AuthForm';
import PropertyMap from './components/PropertyMap';
import './App.css';

const App = () => {
    const [price, setPrice] = useState(null);
    const [history, setHistory] = useState([]);

    const prices = history.map(item => Number(item.predicted_price));

    const averagePrice =
        prices.length > 0
            ? prices.reduce((a, b) => a + b, 0) / prices.length
            : 0;

    const maxPrice =
        prices.length > 0 ? Math.max(...prices) : 0;

    const minPrice =
        prices.length > 0 ? Math.min(...prices) : 0;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lightMode, setLightMode] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
    fetchHistory();
    }, []);

    const fetchHistory = async () => {
    try {
        const response = await axios.get(
            'http://localhost:5000/history',
        );

        setHistory(response.data);

    } catch (error) {
        console.error('Error fetching history:', error);
    }
};

    const handlePredict = async (inputs) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:5000/predict', inputs);
            const predicted = response.data.predicted_price;

setPrice(predicted);

fetchHistory();

        } catch (error) {
            console.error("Error fetching prediction:", error);
            setError("An error occurred while fetching the prediction. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`app ${lightMode ? 'light-mode' : ''}`}>
            <header className="app-header">
                <h1>Smart Real Estate Analysis</h1>
                <p>Analyze property trends and predict real estate market value</p>
            </header>
            <main className="app-main">
                {!user ? (
    <AuthForm setUser={setUser} />
) : (
    <div style={{ marginBottom: '20px' }}>
        <h2>WELCOME, {user}</h2>

        <button
            onClick={() => setUser(null)}
        >
            LOGOUT
        </button>
    </div>
)}
                <PredictionForm onPredict={handlePredict} isLoading={loading} />
                <div
    style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '20px 0'
    }}
>
    <button
        onClick={() => setLightMode(!lightMode)}
        style={{
            padding: '12px 24px',
            background: lightMode ? '#006400' : '#ff1493',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: lightMode
    ? '0 0 10px #006400'
    : '0 0 10px #ff1493',
        }}
    >
        {lightMode ? 'SWITCH TO DARK MODE' : 'SWITCH TO LIGHT MODE'}
    </button>
</div>
                {error && <div className="error-message">{error}</div>}
                <PredictionResult price={price} isLoading={loading} />

<div className="prediction-history">
    <h2>RECENT PREDICTIONS</h2>

    {history.length === 0 ? (
        <p>No prediction history yet.</p>
    ) : (
        <ul>
            {history.map((item, index) => (
    <li key={index}>
        ₹{Number(item.predicted_price).toLocaleString('en-IN')}
    </li>
))}
        </ul>
    )}
</div>

<AnalyticsChart history={history} />
<div className="analytics-summary">
    <div className="analytics-card">
        <h3>Total Predictions</h3>
        <p>{history.length}</p>
    </div>

    <div className="analytics-card">
        <h3>Average Price</h3>
        <p>₹{averagePrice.toLocaleString('en-IN')}</p>
    </div>

    <div className="analytics-card">
        <h3>Highest Price</h3>
        <p>₹{maxPrice.toLocaleString('en-IN')}</p>
    </div>

    <div className="analytics-card">
        <h3>Lowest Price</h3>
        <p>₹{minPrice.toLocaleString('en-IN')}</p>
    </div>
</div>
<AreaComparison />
<PropertyMap />
            </main>
            <footer className="app-footer">
                <p>&copy; 2024 House Price Prediction. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default App;