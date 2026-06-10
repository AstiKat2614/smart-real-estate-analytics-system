import React, { useState, useEffect } from 'react';
import './PredictionForm.css';

const PredictionForm = ({ onPredict, isLoading, lightMode }) => {
    const [inputs, setInputs] = useState({
        bhk: 2,
        sqft: 1200,
        bath: 2,
    });

    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    useEffect(() => {
        if (isLoading) {
            setIsButtonEnabled(false);
            setTimeout(() => {
                setIsButtonEnabled(true);
            }, 3000);
        } else {
            setIsButtonEnabled(true);
        }
    }, [isLoading]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: parseFloat(value)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onPredict(inputs);
    };

    return (
        <form
            className="prediction-form"
            onSubmit={handleSubmit}
            style={{ background: lightMode ? '#ffffff' : '', color: lightMode ? '#121212' : '' }}
        >
            <div className="form-group">
                <label htmlFor="bhk">BHK (Bedrooms):</label>
                <input
                    type="number"
                    id="bhk"
                    name="bhk"
                    value={inputs.bhk}
                    onChange={handleChange}
                    min="1"
                    max="9"
                    required
                    style={{ background: lightMode ? '#f0f0f0' : '', color: lightMode ? '#121212' : '#ffffff', borderColor: lightMode ? '#006400' : '' }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="sqft">Square Footage (sq ft):</label>
                <input
                    type="number"
                    id="sqft"
                    name="sqft"
                    value={inputs.sqft}
                    onChange={handleChange}
                    min="300"
                    max="10000"
                    required
                    style={{ background: lightMode ? '#f0f0f0' : '', color: lightMode ? '#121212' : '#ffffff', borderColor: lightMode ? '#006400' : '' }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="bath">Bathrooms:</label>
                <input
                    type="number"
                    id="bath"
                    name="bath"
                    value={inputs.bath}
                    onChange={handleChange}
                    min="1"
                    max="9"
                    required
                    style={{ background: lightMode ? '#f0f0f0' : '', color: lightMode ? '#121212' : '#ffffff', borderColor: lightMode ? '#006400' : '' }}
                />
            </div>
            <button type="submit" className='submit-button' disabled={isLoading || !isButtonEnabled}>
                {isLoading ? 'Predicting...' : 'Predict Price'}
            </button>
        </form>
    );
};

export default PredictionForm;