import React from 'react';

function RateDisplay({ loanData }) {
    const { numberOfLoans, totalLoanAmount, expectedRate } = loanData;

    return (
        <div className="rate-display">
            <h3>Loan Package Details</h3>
            <p>Number of Matching Loans: {numberOfLoans}</p>
            <p>Total Loan Amount: ${totalLoanAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p>Expected Rate: {expectedRate.toFixed(2)}%</p>
        </div>
    );
}

export default RateDisplay;