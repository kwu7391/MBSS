import React from 'react';

function FilterSummary({ filters, onRemoveFilter }) {
    console.log('FilterSummary received filters:', filters);

    const hasActiveFilters = filters && 
        Object.entries(filters).some(([_, value]) => Array.isArray(value) ? value.length > 0 : value !== '' && value !== null);

    if (!hasActiveFilters) {
        return (
            <div className="filter-summary empty">
                <p>No active filters</p>
            </div>
        );
    }

    const formatValue = (key, value) => {
        if (!value) return 'Not specified';
        if (key === 'loanAmount') return `$${value}`;
        return value;
    };

    return (
        <div className="filter-summary">
            <h3>Active Filters</h3>
            <div className="filter-list">
                {Object.entries(filters).flatMap(([key, values]) => 
                    Array.isArray(values) ? values.filter(value => value !== '' && value !== null).map((value, index) => (
                        <div key={`${key}-${index}`} className="filter-item">
                            <span className="filter-label">
                                {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <span className="filter-value">{formatValue(key, value)}</span>
                            <button type="button" onClick={() => onRemoveFilter(key, value)}>
                                Remove
                            </button>
                        </div>
                    )) : (
                        values !== '' && values !== null && (
                            <div key={key} className="filter-item">
                                <span className="filter-label">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                                </span>
                                <span className="filter-value">{formatValue(key, values)}</span>
                                <button type="button" onClick={() => onRemoveFilter(key, values)}>
                                    Remove
                                </button>
                            </div>
                        )
                    )
                )}
            </div>
        </div>
    );
}

export default FilterSummary;