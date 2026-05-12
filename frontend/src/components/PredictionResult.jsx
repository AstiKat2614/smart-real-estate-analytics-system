import React from 'react';
import jsPDF from 'jspdf';
import './PredictionResult.css';

const PredictionResult = ({ price, isLoading }) => {

    let category = "";
    let insight = "";
    let recommendation = "";
    
    const downloadPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("AI Real Estate Prediction Report", 20, 20);

    doc.setFontSize(16);
    doc.text(`Predicted Price: Rs.${price?.toLocaleString()}`, 20, 50);

    doc.text(`Property Category: ${category}`, 20, 70);

    doc.text("AI Insights:", 20, 90);
    doc.text(insight, 20, 100);

    doc.text("Investment Recommendation:", 20, 130);
    doc.text(recommendation, 20, 140);

    doc.save("Property_Report.pdf");
};

    if (price) {

        if (price < 5000000) {
            category = "Budget Property";
        } else if (price < 10000000) {
            category = "Mid-Range Property";
        } else if (price < 20000000) {
            category = "Premium Property";
        } else {
            category = "Luxury Property";
        }

        if (price > 15000000) {
            insight = "High-value property with strong appreciation potential.";
        } else {
            insight = "Suitable for stable long-term residential investment.";
        }

        if (price < 10000000) {
            recommendation = "Good investment opportunity for mid-range buyers.";
        } else {
            recommendation = "Recommended for premium real estate investors.";
        }
    }

    return (
        <div className="prediction-result">
            <h2>Predicted Price</h2>

            {isLoading ? (
                <p>Calculating...</p>
            ) : price ? (
                <>
                    <p className="price">₹{price.toLocaleString()}</p>
                    <button
    onClick={downloadPDF}
    className="download-btn"
>
    DOWNLOAD REPORT
</button>

                    <div className="ai-section">

                        <h3>PROPERTY CATEGORY</h3>
                        <p>{category}</p>

                        <h3>AI INSIGHTS</h3>
                        <p>{insight}</p>

                        <h3>INVESTMENT RECOMMENDATION</h3>
                        <p>{recommendation}</p>

                    </div>
                </>
            ) : (
                <p>Submit the form to see the predicted price</p>
            )}
        </div>
    );
};

export default PredictionResult;