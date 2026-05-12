import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = ({ setUser }) => {
    const [isLogin, setIsLogin] = useState(true);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const endpoint = isLogin ? 'login' : 'register';

            const payload = isLogin
                ? {
                    email: formData.email,
                    password: formData.password
                }
                : formData;

            const response = await axios.post(
                `http://localhost:5000/${endpoint}`,
                payload,
            );

            alert(response.data.message);

            if (isLogin) {
                setUser(response.data.username);
            }

        } catch (error) {
            alert(
                error.response?.data?.message ||
                'Authentication failed'
            );
        }
    };

    return (
        <div className="auth-container">
            <h2>
                {isLogin ? 'LOGIN' : 'REGISTER'}
            </h2>

            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        required
                    />
                )}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    {isLogin ? 'LOGIN' : 'REGISTER'}
                </button>
            </form>

            <p
                onClick={() => setIsLogin(!isLogin)}
                style={{
                    cursor: 'pointer',
                    marginTop: '10px'
                }}
            >
                {isLogin
                    ? 'Create new account'
                    : 'Already have an account? Login'}
            </p>
        </div>
    );
};

export default AuthForm;