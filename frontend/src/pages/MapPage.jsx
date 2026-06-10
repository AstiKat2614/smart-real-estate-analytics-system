import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import AreaComparison from '../components/AreaComparison';

// Fix default marker icons for Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const MapPage = ({ user, setUser, lightMode, setLightMode }) => {
    const navigate = useNavigate();
    const accentColor = lightMode ? '#006400' : '#ff1493';
    const glowColor = lightMode ? 'rgba(0,100,0,0.28)' : 'rgba(255,20,147,0.28)';
    const pageBackground = lightMode ? '#f5f5f5' : '#121212';
    const navBackground = lightMode ? '#ffffff' : '#121212';
    const cardBackground = lightMode ? '#ffffff' : '#181818';
    const textColor = lightMode ? '#121212' : '#ffffff';
    const inputBackground = lightMode ? '#f9f9f9' : '#1a1a1a';
    const inputBorder = lightMode ? '#e0e0e0' : '#333333';

    const [inputs, setInputs] = useState({ bhk: 2, sqft: 1200, bath: 2 });
    const [predictions, setPredictions] = useState({});
    const [loading, setLoading] = useState(false);

    const properties = [
        {
            name: 'Whitefield',
            position: [12.9698, 77.75],
            price: 8200000,
            trend: 'Rising',
            multiplier: 1.05
        },
        {
            name: 'Indiranagar',
            position: [12.9784, 77.6408],
            price: 14500000,
            trend: 'Premium',
            multiplier: 1.35
        },
        {
            name: 'Electronic City',
            position: [12.8456, 77.6603],
            price: 6700000,
            trend: 'Stable',
            multiplier: 0.90
        },
        {
            name: 'Koramangala',
            position: [12.9352, 77.6245],
            price: 12000000,
            trend: 'High Demand',
            multiplier: 1.25
        }
    ];

    const handlePredict = async () => {
        setLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:5000/predict/area',
                inputs,
                { withCredentials: true }
            );
            const basePrice = response.data.predicted_price;
            const newPredictions = {};
            properties.forEach(p => {
                newPredictions[p.name] = parseFloat((basePrice * p.multiplier).toFixed(2));
            });
            setPredictions(newPredictions);
        } catch (err) {
            console.error('Error fetching predictions:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setInputs(prev => ({
            ...prev,
            [field]: parseFloat(value) || 0
        }));
    };

    const handleLogout = () => {
        setUser(null);
        navigate('/login');
    };

    return (
        <div style={{ minHeight: '100vh', background: pageBackground, color: textColor, fontFamily: 'Montserrat, sans-serif' }}>
            <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 28px', background: navBackground, borderBottom: `1px solid ${accentColor}` }}>
                <h1 style={{ margin: 0, fontSize: '1.25rem', letterSpacing: '1.5px' }}>SMART REAL ESTATE ANALYSIS</h1>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        onClick={() => setLightMode(!lightMode)}
                        style={{ border: `1px solid ${accentColor}`, background: accentColor, color: '#ffffff', padding: '8px 14px', borderRadius: '999px', cursor: 'pointer', fontWeight: 700, boxShadow: `0 0 12px ${glowColor}` }}
                    >
                        {lightMode ? 'DARK MODE' : 'LIGHT MODE'}
                    </button>
                    <button
                        onClick={handleLogout}
                        style={{ border: `1px solid ${accentColor}`, background: 'transparent', color: accentColor, padding: '8px 14px', borderRadius: '999px', cursor: 'pointer', fontWeight: 700 }}
                    >
                        LOGOUT
                    </button>
                </div>
            </nav>

            <main style={{ padding: '28px' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <h2 style={{ color: accentColor, marginBottom: '12px' }}>EXPLORE BANGALORE</h2>

                    <div style={{ padding: '20px', borderRadius: '12px', background: cardBackground, border: `1px solid ${accentColor}`, boxShadow: `0 0 20px ${glowColor}`, marginBottom: '20px' }}>
                        <h3 style={{ margin: '0 0 16px 0', color: accentColor, fontSize: '1rem' }}>PROPERTY DETAILS</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: accentColor }}>BHK</label>
                                <input
                                    type="number"
                                    value={inputs.bhk}
                                    onChange={(e) => handleInputChange('bhk', e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        borderRadius: '6px',
                                        border: `1px solid ${inputBorder}`,
                                        background: inputBackground,
                                        color: textColor,
                                        fontFamily: 'inherit'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: accentColor }}>SQFT</label>
                                <input
                                    type="number"
                                    value={inputs.sqft}
                                    onChange={(e) => handleInputChange('sqft', e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        borderRadius: '6px',
                                        border: `1px solid ${inputBorder}`,
                                        background: inputBackground,
                                        color: textColor,
                                        fontFamily: 'inherit'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: accentColor }}>BATH</label>
                                <input
                                    type="number"
                                    value={inputs.bath}
                                    onChange={(e) => handleInputChange('bath', e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        borderRadius: '6px',
                                        border: `1px solid ${inputBorder}`,
                                        background: inputBackground,
                                        color: textColor,
                                        fontFamily: 'inherit'
                                    }}
                                />
                            </div>
                        </div>
                        <button
                            onClick={handlePredict}
                            disabled={loading}
                            style={{
                                border: `1px solid ${accentColor}`,
                                background: accentColor,
                                color: '#ffffff',
                                padding: '10px 20px',
                                borderRadius: '6px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                fontWeight: 700,
                                opacity: loading ? 0.6 : 1,
                                boxShadow: `0 0 12px ${glowColor}`
                            }}
                        >
                            {loading ? 'LOADING...' : 'FIND PRICES'}
                        </button>
                    </div>

                    <div style={{ width: '100%', height: '450px', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${accentColor}`, boxShadow: `0 0 28px ${glowColor}` }}>
                        <MapContainer center={[12.9716, 77.5946]} zoom={11} style={{ height: '100%', width: '100%' }}>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                            {properties.map((p, idx) => (
                                <Marker key={idx} position={p.position}>
                                    <Popup>
                                        <div style={{ minWidth: 160, color: '#000' }}>
                                            <strong>{p.name}</strong>
                                            <div>
                                                {predictions[p.name]
                                                    ? `Predicted Price: Rs.${predictions[p.name].toFixed(2)} Lakhs`
                                                    : 'Enter details and click Find Prices'}
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>

                    <div style={{ marginTop: '22px' }}>
                        <AreaComparison lightMode={lightMode} predictions={predictions} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MapPage;
