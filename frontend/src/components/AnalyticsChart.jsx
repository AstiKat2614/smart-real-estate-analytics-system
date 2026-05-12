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

const data = [
    { area: '1 BHK', price: 2500000 },
    { area: '2 BHK', price: 4500000 },
    { area: '3 BHK', price: 7000000 },
    { area: '4 BHK', price: 12000000 },
    { area: 'Luxury', price: 25000000 },
];

const AnalyticsChart = () => {
    return (
        <div style={{
            width: '95%',
            height: 350,
            margin: '0 auto',
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
                PROPERTY ANALYTICS
            </h2>

            <ResponsiveContainer width="100%" height="80%">
                <LineChart
    data={data}
    margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="area" stroke="#fff" />
                    <YAxis
    stroke="#fff"
    tickFormatter={(value) => `${value / 1000000}M`}
                    />
                    <Tooltip formatter={(value) => `${value / 1000000}M`} />
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