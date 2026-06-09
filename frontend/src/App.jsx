import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import MapPage from './pages/MapPage';
import './App.css';

const App = () => {
    const [user, setUser] = useState(null);
    const [lightMode, setLightMode] = useState(false);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={
                        user
                            ? <Navigate to="/home" />
                            : <LoginPage
                                setUser={setUser}
                                lightMode={lightMode}
                                setLightMode={setLightMode}
                              />
                    }
                />
                <Route
                    path="/home"
                    element={
                        user
                            ? <HomePage
                                user={user}
                                setUser={setUser}
                                lightMode={lightMode}
                                setLightMode={setLightMode}
                              />
                            : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        user
                            ? <DashboardPage
                                user={user}
                                setUser={setUser}
                                lightMode={lightMode}
                                setLightMode={setLightMode}
                              />
                            : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/map"
                    element={
                        user
                            ? <MapPage
                                user={user}
                                setUser={setUser}
                                lightMode={lightMode}
                                setLightMode={setLightMode}
                              />
                            : <Navigate to="/login" />
                    }
                />
                <Route
                    path="*"
                    element={<Navigate to="/login" />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;