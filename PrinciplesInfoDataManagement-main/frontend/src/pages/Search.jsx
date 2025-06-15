// Search.jsx
import React, { useState } from 'react';
import FilterManager from '../components/FilterManager';
import FilterSummary from '../components/FilterSummary';

function Search() {
    const [filters, setFilters] = useState({});
    const [resetFilterFunction, setResetFilterFunction] = useState(null);
    const [resultsCount, setResultsCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (searchFilters) => {
        setLoading(true);
        setError(null);
        console.log('Sending search request with filters:', searchFilters);

        try {
            // Add filters to backend
            for (const [key, value] of Object.entries(searchFilters)) {
                if (value) {
                    await fetch('http://localhost:8080/api/mortgages/addFilter', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        
                        body: JSON.stringify({ name: key, sqlCondition: `${key} = ${value}`, filterChoice: 100 }),
                    });
                }
            }

            // Perform search
            const response = await fetch('http://localhost:8080/api/mortgages/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Search failed');
            }

            const data = await response.json();
            setResultsCount(data.mortgages.length || 0);
            setFilters(searchFilters);
        } catch (err) {
            console.error('Search error:', err);
            setError(err.message || 'Failed to search mortgages');
            setResultsCount(0);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFilter = async (filterName) => {
        try {
            await fetch('http://localhost:8080/api/mortgages/removeFilter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filterName),
            });

            // Call the resetFilterFunction to reset the dropdown
            if (resetFilterFunction) {
                resetFilterFunction(filterName);
            }
            

            setFilters((prevFilters) => {
                const newFilters = { ...prevFilters };
                delete newFilters[filterName];
                return newFilters;
            });
        } catch (err) {
            console.error('Remove filter error:', err);
        }
    };

    return (
        <div className="search-container">
            <div className="search-header">
                <h2>Search Mortgages</h2>
                <p>Search and filter mortgage applications from our database.</p>
            </div>
            <div className="search-content">
                <FilterManager onSearch={handleSearch} setResetFilter={setResetFilterFunction} />
                {loading && <div className="loading">Loading...</div>}
                {error && <div className="error">{error}</div>}
                <FilterSummary filters={filters} onRemoveFilter={handleRemoveFilter} />
                <div className="results-count">
                    <h3>Number of Mortgages Found: {resultsCount}</h3>
                </div>
            </div>
        </div>
    );
}

export default Search;