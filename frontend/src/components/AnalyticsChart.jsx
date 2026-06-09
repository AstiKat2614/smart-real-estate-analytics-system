import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const AnalyticsChart = ({ history, lightMode }) => {

    const chartData = history.map((item, index) => ({
    name: `Prediction ${index + 1}`,
    price: Number(item.predicted_price)
    }));

    return (
        <div style={{
            width: '95%',
            height: 350,
            margin: '0 auto',
            marginTop: '40px',
            background: lightMode ? '#ffffff' : '#111',
            padding: '20px',
            borderRadius: '15px',
            boxShadow: `0 0 20px ${lightMode ? 'rgba(0,100,0,0.15)' : 'rgba(255,20,147,0.3)'}`
        }}>
            <h2 style={{
                color: lightMode ? '#006400' : '#ff1493',
                textAlign: 'center',
                marginBottom: '20px',
                textShadow: lightMode ? '0 0 10px #006400' : '0 0 10px #ff1493'
            }}>
                PROPERTY ANALYTICS
            </h2>

            <ResponsiveContainer width="100%" height="80%">
                <LineChart
    data={chartData}
    margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
>
                    <CartesianGrid strokeDasharray="3 3" stroke={lightMode ? '#ccc' : '#444'} />
                    <XAxis dataKey="name" stroke={lightMode ? '#121212' : '#fff'} />
                    <YAxis
    stroke={lightMode ? '#121212' : '#fff'}
    tickFormatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`}
                    />
                    <Tooltip formatter={(value) =>
    `₹${Number(value).toLocaleString('en-IN')}`
} />
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#00ffff"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AnalyticsChart;