import React, { useState } from 'react';
import RateDisplay from './RateDisplay';

function LoanPackager() {
    const [loanData, setLoanData] = useState({
        numberOfLoans: 0,
        totalLoanAmount: 0,
        expectedRate: 0,
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const packageLoans = async () => {
        setLoading(true);
        setSuccessMessage('');
        try {
            const response = await fetch('http://localhost:8080/api/mortgages/packageLoans', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch loan data');
            }

            const data = await response.json();
            setLoanData({
                numberOfLoans: data.numberOfLoans,
                totalLoanAmount: data.totalLoanAmount,
                expectedRate: data.expectedRate,
            });
            setSuccessMessage('Mortgages packaged successfully!');
        } catch (error) {
            console.error('Error fetching loan data:', error);
            setError('Failed to load loan data.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="loan-packager">
            <h2>Loan Packager</h2>
            <button onClick={packageLoans}>Package Loans</button>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            {!loading && !error && <RateDisplay loanData={loanData} />}
        </div>
    );
}

export default LoanPackager;