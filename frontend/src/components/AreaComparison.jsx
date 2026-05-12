import React from 'react';

const areaData = [
    {
        area: 'Whitefield',
        price: '₹82 Lakhs',
        trend: 'Rising'
    },
    {
        area: 'Indiranagar',
        price: '₹1.5 Crore',
        trend: 'Premium'
    },
    {
        area: 'Electronic City',
        price: '₹64 Lakhs',
        trend: 'Stable'
    },
    {
        area: 'Koramangala',
        price: '₹1.2 Crore',
        trend: 'High Demand'
    }
];

const AreaComparison = () => {
    return (
        <div style={{
            marginTop: '40px',
            background: '#111',
            padding: '20px',
            borderRadius: '15px',
            boxShadow: '0 0 20px rgba(255,20,147,0.3)'
        }}>
            <h2 style={{
                color: '#ff1493',
                textAlign: 'center',
                marginBottom: '20px',
                textShadow: '0 0 10px #ff1493'
            }}>
                NEARBY AREA COMPARISON
            </h2>

            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                color: 'white',
                textAlign: 'center'
            }}>
                <thead>
                    <tr>
                        <th style={{ padding: '12px', color: '#00ffff' }}>Area</th>
                        <th style={{ padding: '12px', color: '#00ffff' }}>Average Price</th>
                        <th style={{ padding: '12px', color: '#00ffff' }}>Market Trend</th>
                    </tr>
                </thead>

                <tbody>
                    {areaData.map((item, index) => (
                        <tr key={index}>
                            <td style={{ padding: '12px' }}>{item.area}</td>
                            <td style={{ padding: '12px' }}>{item.price}</td>
                            <td style={{ padding: '12px' }}>{item.trend}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AreaComparison;