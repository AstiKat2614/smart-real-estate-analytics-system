import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ setUser, lightMode, setLightMode }) => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const accentColor = lightMode ? '#006400' : '#ff1493';
    const accentText = lightMode ? '#00ffff' : '#00ffff';
    const cardBackground = lightMode ? '#ffffff' : '#181818';
    const pageBackground = lightMode ? '#f5f5f5' : '#121212';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const toggleMode = () => {
        setLightMode(!lightMode);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const endpoint = isLogin ? 'login' : 'register';
        const payload = isLogin
            ? { email: formData.email, password: formData.password }
            : formData;

        try {
            const response = await axios.post(
                `http://localhost:5000/${endpoint}`,
                payload,
                { withCredentials: true }
            );

            if (isLogin) {
                setUser(response.data.username);
                navigate('/home');
            } else {
                setMessage(response.data.message || 'Registered successfully. Please login.');
                setIsLogin(true);
            }
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                'Unable to complete authentication. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    const themeStyles = {
        page: {
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: pageBackground,
            color: '#ffffff',
            fontFamily: 'Montserrat, sans-serif',
            padding: '24px'
        },
        card: {
            width: '100%',
            maxWidth: '420px',
            borderRadius: '8px',
            padding: '36px 32px',
            background: cardBackground,
            boxShadow: `0 20px 60px rgba(0, 0, 0, 0.45)`,
            border: `1px solid ${accentColor}`
        },
        headerRow: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
        },
        title: {
            margin: 0,
            fontSize: '2rem',
            letterSpacing: '1px',
            color: accentColor
        },
        toggleButton: {
            border: 'none',
            borderRadius: '6px',
            padding: '10px 18px',
            cursor: 'pointer',
            background: accentColor,
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '0.9rem'
        },
        switchRow: {
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '28px'
        },
        switchButton: {
            flex: 1,
            padding: '12px 0',
            borderRadius: '6px',
            border: `1px solid ${accentColor}`,
            background: 'transparent',
            color: lightMode ? '#121212' : '#ffffff',
            cursor: 'pointer',
            fontWeight: 700,
            transition: 'all 0.2s ease'
        },
        activeSwitch: {
            background: accentColor,
            color: lightMode ? '#ffffff' : '#121212'
        },
        input: {
            width: 'calc(100% - 32px)',
            padding: '14px 16px',
            marginBottom: '16px',
            borderRadius: '6px',
            border: `1px solid ${accentColor}`,
            background: lightMode ? '#f0f0f0' : '#0f0f0f',
            color: lightMode ? '#121212' : '#ffffff',
            outline: 'none',
            fontSize: '0.95rem'
        },
        button: {
            width: '100%',
            padding: '14px',
            borderRadius: '6px',
            border: 'none',
            background: accentColor,
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            marginTop: '8px'
        },
        message: {
            margin: '18px 0 0',
            padding: '14px 16px',
            borderRadius: '14px',
            background: '#111111',
            border: `1px solid ${accentText}`,
            color: accentText,
            textAlign: 'center'
        },
        description: {
            margin: '0 0 16px',
            fontSize: '0.95rem',
            color: '#d1d1d1',
            lineHeight: '1.5'
        }
    };

    return (
        <div style={themeStyles.page}>
            <div style={themeStyles.card}>
                <div style={themeStyles.headerRow}>
                    <div>
                        <h1 style={themeStyles.title}>SMART REAL ESTATE ANALYSIS</h1>
                        <p style={themeStyles.description}>
                            {isLogin ? 'Login to view your predictions and analytics.' : 'Register a new account and start predicting market value.'}
                        </p>
                    </div>
                    <button style={themeStyles.toggleButton} onClick={toggleMode}>
                        {lightMode ? 'DARK MODE' : 'LIGHT MODE'}
                    </button>
                </div>

                <div style={themeStyles.switchRow}>
                    <button
                        type="button"
                        style={{
                            ...themeStyles.switchButton,
                            ...(isLogin ? themeStyles.activeSwitch : {})
                        }}
                        onClick={() => setIsLogin(true)}
                    >
                        LOGIN
                    </button>
                    <button
                        type="button"
                        style={{
                            ...themeStyles.switchButton,
                            ...(!isLogin ? themeStyles.activeSwitch : {})
                        }}
                        onClick={() => setIsLogin(false)}
                    >
                        REGISTER
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input
                            style={themeStyles.input}
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Username"
                            required
                        />
                    )}
                    <input
                        style={themeStyles.input}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                    <input
                        style={themeStyles.input}
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                    <button style={themeStyles.button} type="submit" disabled={loading}>
                        {loading ? 'Please wait...' : isLogin ? 'LOGIN' : 'REGISTER'}
                    </button>
                </form>

                {message && <div style={themeStyles.message}>{message}</div>}
            </div>
        </div>
    );
};

export default LoginPage;
