import React from 'react';

function MortgageResultsTable({ results }) {
    if (!results || !results.length) {
        return <p className="no-results">No matching mortgages found.</p>;
    }

    return (
        <table className="mortgage-results-table">
            <thead>
                <tr>
                    <th>Application ID</th>
                    <th>Respondent ID</th>
                    <th>Loan Type</th>
                    <th>Loan Amount</th>
                    <th>Action Taken</th>
                    <th>MSAMD</th>
                    <th>County</th>
                    <th>Property Type</th>
                </tr>
            </thead>
            <tbody>
                {results.map((mortgage) => (
                    <tr key={mortgage.applicationId}>
                        <td>{mortgage.applicationId}</td>
                        <td>{mortgage.respondentId}</td>
                        <td>{mortgage.loan_type}</td>
                        <td>${mortgage.loanAmount}</td>
                        <td>{mortgage.actionTaken}</td>
                        <td>{mortgage.msamd}</td>
                        <td>{mortgage.county}</td>
                        <td>{mortgage.propertyType}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default MortgageResultsTable;