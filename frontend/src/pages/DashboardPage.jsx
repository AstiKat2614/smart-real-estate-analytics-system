import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PredictionForm from '../components/PredictionForm';
import PredictionResult from '../components/PredictionResult';
import AnalyticsChart from '../components/AnalyticsChart';

const DashboardPage = ({ user, setUser, lightMode, setLightMode }) => {
    const navigate = useNavigate();
    const [price, setPrice] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const accentColor = lightMode ? '#006400' : '#ff1493';
    const glowColor = lightMode ? 'rgba(0, 100, 0, 0.28)' : 'rgba(255, 20, 147, 0.28)';
    const pageBackground = lightMode ? '#f5f5f5' : '#121212';
    const cardBackground = lightMode ? '#ffffff' : '#181818';
    const textColor = lightMode ? '#121212' : '#ffffff';
    const navBackground = lightMode ? '#ffffff' : '#121212';

    const fetchHistory = async () => {
        try {
            const response = await axios.get('http://localhost:5000/history', {
                withCredentials: true
            });
            setHistory(response.data);
            setError(null);
        } catch (err) {
            setError('Unable to load prediction history.');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handlePredict = async (inputs) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                'http://localhost:5000/predict',
                inputs,
                { withCredentials: true }
            );
            setPrice(response.data.predicted_price);
            await fetchHistory();
        } catch (err) {
            setError('Prediction failed. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        setUser(null);
        navigate('/login');
    };

    return (
        <div
            className={lightMode ? 'light-mode' : ''}
            style={{
                minHeight: '100vh',
                background: pageBackground,
                color: textColor,
                fontFamily: 'Montserrat, sans-serif'
            }}
        >
            <nav
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '22px 32px',
                    background: navBackground,
                    borderBottom: `1px solid ${accentColor}`,
                    boxShadow: lightMode
                        ? '0 4px 30px rgba(0, 0, 0, 0.06)'
                        : '0 4px 30px rgba(0, 0, 0, 0.55)'
                }}
            >
                <h1 style={{ margin: 0, fontSize: '1.2rem', letterSpacing: '1.5px' }}>
                    SMART REAL ESTATE ANALYSIS
                </h1>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        onClick={() => setLightMode(!lightMode)}
                        style={{
                            border: `1px solid ${accentColor}`,
                            background: accentColor,
                            color: '#ffffff',
                            padding: '10px 18px',
                            borderRadius: '999px',
                            cursor: 'pointer',
                            fontWeight: 700,
                            boxShadow: `0 0 16px ${glowColor}`
                        }}
                    >
                        {lightMode ? 'DARK MODE' : 'LIGHT MODE'}
                    </button>
                    <button
                        onClick={handleLogout}
                        style={{
                            border: `1px solid ${accentColor}`,
                            background: 'transparent',
                            color: accentColor,
                            padding: '10px 18px',
                            borderRadius: '999px',
                            cursor: 'pointer',
                            fontWeight: 700
                        }}
                    >
                        LOGOUT
                    </button>
                </div>
            </nav>

            <main style={{ padding: '36px 32px' }}>
                <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
                    <div
                        style={{
                            marginBottom: '32px',
                            padding: '28px',
                            borderRadius: '24px',
                            background: cardBackground,
                            border: `1px solid ${accentColor}`,
                            boxShadow: `0 0 30px ${glowColor}`
                        }}
                    >
                        <p
                            style={{
                                margin: 0,
                                fontSize: '1.8rem',
                                fontWeight: 700,
                                color: accentColor
                            }}
                        >
                            WELCOME, {user}
                        </p>
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            gap: '28px'
                        }}
                    >
                        <div
                            style={{
                                padding: '28px',
                                borderRadius: '24px',
                                background: cardBackground,
                                border: `1px solid ${accentColor}`,
                                boxShadow: `0 0 28px ${glowColor}`
                            }}
                        >
                            <PredictionForm onPredict={handlePredict} isLoading={loading} lightMode={lightMode} />
                        </div>

                        <div
                            style={{
                                padding: '28px',
                                borderRadius: '24px',
                                background: cardBackground,
                                border: `1px solid ${accentColor}`,
                                boxShadow: `0 0 28px ${glowColor}`
                            }}
                        >
                            <PredictionResult price={price} isLoading={loading} lightMode={lightMode} />
                        </div>

                        <section
                            style={{
                                padding: '28px',
                                borderRadius: '24px',
                                background: cardBackground,
                                border: `1px solid ${accentColor}`,
                                boxShadow: `0 0 28px ${glowColor}`
                            }}
                        >
                            <h2 style={{ marginTop: 0, color: accentColor }}>
                                PREDICTION HISTORY
                            </h2>
                            {error && (
                                <p style={{ color: '#ff4d4d' }}>{error}</p>
                            )}
                            {history.length === 0 ? (
                                <p style={{ margin: 0 }}>
                                    No predictions yet. Submit the form to generate a prediction.
                                </p>
                            ) : (
                                <ul style={{ paddingLeft: '20px', margin: '0' }}>
                                    {history.map((item, index) => (
                                        <li key={index} style={{ marginBottom: '10px' }}>
                                            ₹{Number(item.predicted_price).toLocaleString('en-IN')}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>

                        <AnalyticsChart history={history} lightMode={lightMode} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
