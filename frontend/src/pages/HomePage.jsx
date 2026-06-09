import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ user, setUser, lightMode, setLightMode }) => {
    const navigate = useNavigate();
    const accentColor = lightMode ? '#006400' : '#ff1493';
    const glowColor = lightMode ? 'rgba(0, 100, 0, 0.35)' : 'rgba(255, 20, 147, 0.35)';
    const pageBackground = lightMode ? '#f5f5f5' : '#121212';
    const cardBackground = lightMode ? '#ffffff' : '#181818';
    const textColor = lightMode ? '#121212' : '#ffffff';
    const navBackground = lightMode ? '#ffffff' : '#121212';

    const handleLogout = () => {
        setUser(null);
        navigate('/login');
    };

    return (
        <div
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
                    padding: '24px 32px',
                    background: navBackground,
                    borderBottom: `1px solid ${accentColor}`,
                    boxShadow: lightMode
                        ? '0 4px 30px rgba(0, 0, 0, 0.05)'
                        : '0 4px 30px rgba(0, 0, 0, 0.6)'
                }}
            >
                <h1 style={{ margin: 0, fontSize: '1.25rem', letterSpacing: '1.5px' }}>
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

            <main style={{ padding: '40px 32px' }}>
                <div style={{ maxWidth: '920px', margin: '0 auto' }}>
                    <p
                        style={{
                            margin: 0,
                            marginBottom: '8px',
                            fontSize: '1.8rem',
                            fontWeight: 700,
                            letterSpacing: '1px',
                            color: accentColor
                        }}
                    >
                        WELCOME, {user}
                    </p>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '24px',
                            marginTop: '28px'
                        }}
                    >
                        <div
                            onClick={() => navigate('/dashboard')}
                            role="button"
                            tabIndex={0}
                            style={{
                                background: cardBackground,
                                border: `1px solid ${accentColor}`,
                                borderRadius: '24px',
                                padding: '32px',
                                cursor: 'pointer',
                                boxShadow: `0 0 30px ${glowColor}`,
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                minHeight: '220px'
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') navigate('/dashboard');
                            }}
                        >
                            <h2 style={{ margin: 0, marginBottom: '16px', color: accentColor }}>
                                PREDICT PRICE
                            </h2>
                            <p style={{ margin: 0, lineHeight: 1.7, color: textColor }}>
                                Enter property details and get an AI powered price prediction.
                            </p>
                        </div>

                        <div
                            onClick={() => navigate('/map')}
                            role="button"
                            tabIndex={0}
                            style={{
                                background: cardBackground,
                                border: `1px solid ${accentColor}`,
                                borderRadius: '24px',
                                padding: '32px',
                                cursor: 'pointer',
                                boxShadow: `0 0 30px ${glowColor}`,
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                minHeight: '220px'
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') navigate('/map');
                            }}
                        >
                            <h2 style={{ margin: 0, marginBottom: '16px', color: accentColor }}>
                                EXPLORE MAP
                            </h2>
                            <p style={{ margin: 0, lineHeight: 1.7, color: textColor }}>
                                Browse Bangalore property prices by location on an interactive map.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomePage;
