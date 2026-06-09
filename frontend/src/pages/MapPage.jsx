import React from 'react';
import { useNavigate } from 'react-router-dom';
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
    const textColor = lightMode ? '#121212' : '#ffffff';

    const properties = [
        {
            name: 'Whitefield',
            position: [12.9698, 77.75],
            price: 8200000,
            trend: 'Rising'
        },
        {
            name: 'Indiranagar',
            position: [12.9784, 77.6408],
            price: 14500000,
            trend: 'Premium'
        },
        {
            name: 'Electronic City',
            position: [12.8456, 77.6603],
            price: 6700000,
            trend: 'Stable'
        },
        {
            name: 'Koramangala',
            position: [12.9352, 77.6245],
            price: 12000000,
            trend: 'High Demand'
        }
    ];

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

                    <div style={{ width: '100%', height: '450px', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${accentColor}`, boxShadow: `0 0 28px ${glowColor}` }}>
                        <MapContainer center={[12.9716, 77.5946]} zoom={11} style={{ height: '100%', width: '100%' }}>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                            {properties.map((p, idx) => (
                                <Marker key={idx} position={p.position}>
                                    <Popup>
                                        <div style={{ minWidth: 160 }}>
                                            <strong>{p.name}</strong>
                                            <div>Price: ₹{p.price.toLocaleString('en-IN')}</div>
                                            <div>Trend: {p.trend}</div>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>

                    <div style={{ marginTop: '22px' }}>
                        <AreaComparison lightMode={lightMode} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MapPage;
