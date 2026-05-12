import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PredictionForm from './components/PredictionForm';
import PredictionResult from './components/PredictionResult';
import AnalyticsChart from './components/AnalyticsChart';
import AreaComparison from './components/AreaComparison';
import './App.css';

const App = () => {
    const [price, setPrice] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lightMode, setLightMode] = useState(false);
    useEffect(() => {
    const savedHistory = localStorage.getItem('predictionHistory');

    if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
    }
}, []);

    const handlePredict = async (inputs) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:5000/predict', inputs);
            const predicted = response.data.predicted_price;

setPrice(predicted);

setHistory((prevHistory) => [
    predicted,
    ...prevHistory.slice(0, 4)
]);

localStorage.setItem(
    'predictionHistory',
    JSON.stringify([
        predicted,
        ...history.slice(0, 4)
    ])
);
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
                    ₹{item.toLocaleString()}
                </li>
            ))}
        </ul>
    )}
</div>

<AnalyticsChart />
<AreaComparison />
            </main>
            <footer className="app-footer">
                <p>&copy; 2024 House Price Prediction. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default App;