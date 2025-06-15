import React, { useState,  } from 'react';

function FilterManager({ onSearch,  }) {
    const [filter, setFilter] = useState({
        msamd: '',
        loan_type: '',
        loan_purpose: '',
        property_type: '',
        applicantIncomeRangeMin: '',
        applicantIncomeRangeMax: '',
        owner_occupancy: '',
        applicant_income_000s: '',
    });

    // Function to reset a specific filter


  // Pass the resetFilter function to the parent component


  const handleSubmit = (e) => {
      e.preventDefault();
      onSearch(filter);
  };

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFilter((prev) => ({
          ...prev,
          [name]: value
      }));
  };
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="filter-group">
                <label htmlFor="msamd">MSAMD: </label>
                <select id="msamd" name="msamd" value={filter.msamd} onChange={handleChange}>
                    <option value="">Select MSAMD</option>
                    <option value="10900">Allentown, Bethlehem, Easton - PA, NJ</option>
                    <option value="12100">Atlantic City, Hammonton - NJ</option>
                    <option value="15804">Camden - NJ</option>
                    <option value="35084">Newark - NJ, PA</option>
                    <option value="35614">New York, Jersey City, White Plains - NY, NJ</option>
                    <option value="35620">35620</option>
                    <option value="36140">Ocean City - NJ</option>
                    <option value="37980">37980</option>
                    <option value="45940">Trenton - NJ</option>
                    <option value="47220">Vineland, Bridgeton - NJ</option>
                    <option value="48864">Wilmington - DE, MD, NJ</option>
                </select>
            </div>
            <div className="filter-group">
                <label htmlFor="loan_type">Loan Type: </label>
                <select id="loan_type" name="loan_type" value={filter.loan_type} onChange={handleChange}>
                    <option value="">Select Loan Type</option>
                    <option value="1">Conventional</option>
                    <option value="2">FHA</option>
                    <option value="3">VA</option>
                    <option value="4">USDA</option>
                </select>
            </div>
            <div className="filter-group">
                <label htmlFor="loan_purpose">Loan Purpose: </label>
                <select id="loan_purpose" name="loan_purpose" value={filter.loan_purpose} onChange={handleChange}>
                    <option value="">Select Loan Purpose</option>
                    <option value="1">Home purchase</option>
                    <option value="2">Home improvement</option>
                    <option value="3">Refinancing</option>
                </select>
            </div>
            <div className="filter-group">
                <label htmlFor="property_type">Property Type: </label>
                <select id="property_type" name="property_type" value={filter.property_type} onChange={handleChange}>
                    <option value="">Select Property Type</option>
                    <option value="1">One-to-four family dwelling (other than manufactured housing)</option>
                    <option value="2">Manufactured housing</option>
                    <option value="3">Multifamily dwelling</option>
                </select>
            </div>
            <div className="filter-group">
                <label htmlFor="property_type">Property Type: </label>
                <select id="property_type" name="property_type" value={filter.property_type} onChange={handleChange}>
                    <option value="">Select Property Type</option>
                    <option value="1">One-to-four family dwelling (other than manufactured housing)</option>
                    <option value="2">Manufactured housing</option>
                    <option value="3">Multifamily dwelling</option>
                </select>
            </div>
            <div className="filter-group">
                <label htmlFor="property_type">Property Type: </label>
                <select id="property_type" name="property_type" value={filter.property_type} onChange={handleChange}>
                    <option value="">Select Property Type</option>
                    <option value="1">One-to-four family dwelling (other than manufactured housing)</option>
                    <option value="2">Manufactured housing</option>
                    <option value="3">Multifamily dwelling</option>
                </select>
            </div>
            <div className="filter-group">
                <label htmlFor="applicantIncomeRangeMin">Applicant Income Range: </label>
                <input
                    type="number"
                    id="applicantIncomeRangeMin"
                    name="applicantIncomeRangeMin"
                    value={filter.applicantIncomeRangeMin}
                    onChange={handleChange}
                    placeholder="Min Income"
                />
                <input
                    type="number"
                    id="applicantIncomeRangeMax"
                    name="applicantIncomeRangeMax"
                    value={filter.applicantIncomeRangeMax}
                    onChange={handleChange}
                    placeholder="Max Income"
                />
            </div>
            <div className="filter-group">
                <label htmlFor="owner_occupancy">Owner Occupancy: </label>
                <select id="owner_occupancy" name="owner_occupancy" value={filter.owner_occupancy} onChange={handleChange}>
                    <option value="">Select Owner Occupancy</option>
                    <option value="1">Owner-occupied as a principal dwelling</option>
                    <option value="2">Not owner-occupied</option>
                    <option value="3">Not applicable</option>
                </select>
            </div>
            <button type="submit">Search</button>
        </form>
    );
}

export default FilterManager;
