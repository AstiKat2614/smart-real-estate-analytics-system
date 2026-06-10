import React from 'react';
import jsPDF from 'jspdf';
import './PredictionResult.css';

const PredictionResult = ({ price, isLoading, inputs, user }) => {

    const downloadPDF = () => {
        const doc = new jsPDF();
        const priceInLakhs = price.toFixed(2);
        const priceInRupees = (price * 100000).toLocaleString('en-IN');
        const date = new Date().toLocaleDateString('en-IN');

        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text('SMART REAL ESTATE ANALYSIS', 20, 20);

        doc.setFontSize(13);
        doc.setFont('helvetica', 'normal');
        doc.text('Property Prediction Report', 20, 30);

        doc.setLineWidth(0.5);
        doc.line(20, 35, 190, 35);

        doc.setFontSize(11);
        doc.text(`Date: ${date}`, 20, 45);
        doc.text(`Prepared for: ${user}`, 20, 53);

        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text('Property Details:', 20, 68);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.text(`BHK: ${inputs.bhk}`, 20, 80);
        doc.text(`Square Footage: ${inputs.sqft} sqft`, 20, 90);
        doc.text(`Bathrooms: ${inputs.bath}`, 20, 100);

        doc.line(20, 108, 190, 108);

        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text('Predicted Price:', 20, 120);
        doc.setFontSize(14);
        doc.text(`Rs.${priceInLakhs} Lakhs`, 20, 132);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text(`(Rs.${priceInRupees})`, 20, 142);

        doc.line(20, 150, 190, 150);

        doc.setFontSize(9);
        doc.setTextColor(100);
        doc.text('Note: Prediction based on Bangalore housing market data.', 20, 160);
        doc.text('This is an estimate only and should not be used as financial advice.', 20, 168);

        doc.save('Property_Report.pdf');
    };

    return (
        <div className="prediction-result">
            <h2>Predicted Price</h2>

            {isLoading ? (
                <p>Calculating...</p>
            ) : price ? (
                <>
                    <p className="price">₹{price.toFixed(2)} Lakhs</p>
                    <button
    onClick={downloadPDF}
    className="download-btn"
>
    DOWNLOAD REPORT
</button>

                </>
            ) : (
                <p>Submit the form to see the predicted price</p>
            )}
        </div>
    );
};

export default PredictionResult;