package edu.cs213.mortgage;

import java.util.List;

public class SearchResult {
    private List<Mortgage> mortgages;
    private int totalResults;
    private boolean success;
    private String message;

    public SearchResult(List<Mortgage> mortgages) {
        this.mortgages = mortgages;
        this.totalResults = mortgages.size();
        this.success = true;
        this.message = "Search completed successfully";
    }

    // Getters and Setters
    public List<Mortgage> getMortgages() {
        return mortgages;
    }

    public void setMortgages(List<Mortgage> mortgages) {
        this.mortgages = mortgages;
        this.totalResults = mortgages.size();
    }

    public int getTotalResults() {
        return totalResults;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}