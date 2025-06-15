package edu.cs213.mortgage;

import org.springframework.web.bind.annotation.*;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/mortgages")
public class MortgageController {
    private final MortgageDAO mortgageDAO;
    private final List<Filter> filters;

    public MortgageController() {
        this.mortgageDAO = new MortgageDAO();
        this.filters = new ArrayList<>();
    }

    @PostMapping("/addFilter")
    public void addFilter(@RequestBody Filter filter) {
        filters.add(filter);
    }

    @PostMapping("/removeFilter")
    public void removeFilter(@RequestBody String filterName) {
        
        filters.removeIf(filter -> filter.getName().equals("msamd") || filter.getName().equals("loan_type") 
        ||filter.getName().equals("loan_purpose") || filter.getName().equals("property_type")
        || filter.getName().equals("applicant_income_000s") || filter.getName().equals("owner_occupancy") 
        );
        for (Filter filter : filters)
        {
            System.out.println(filter.getName());
        }
    }

    @PostMapping("/clearFilters")
    public void clearFilters() {
        filters.clear();
    }

    @PostMapping("/search")
    public SearchResult search() {
        try {
            System.out.println(filters.size());
            List<Mortgage> mortgages = mortgageDAO.getFilteredMortgages(filters);
            return new SearchResult(mortgages);
        } catch (Exception e) {
            e.printStackTrace();
            SearchResult result = new SearchResult(List.of());
            result.setSuccess(false);
            result.setMessage("Search failed: " + e.getMessage());
            return result;
        }
    }

    @PostMapping("/packageLoans")
    public Map<String, Object> packageLoans() {
        List<Mortgage> mortgages = mortgageDAO.getFilteredMortgages(filters);

        int numberOfLoans = mortgages.size();
        double totalLoanAmount = mortgages.stream().mapToDouble(Mortgage::getLoanAmount).sum();
        double expectedRate = MortgageCalculator.calculateRate(mortgages);

        Map<String, Object> response = new HashMap<>();
        response.put("numberOfLoans", numberOfLoans);
        response.put("totalLoanAmount", totalLoanAmount);
        response.put("expectedRate", expectedRate);
        try (Connection conn = DatabaseCon.connect()) {
                String updateQuery = "UPDATE application SET purchaser_type = 5 WHERE application_id = ?";
                try (PreparedStatement stmt = conn.prepareStatement(updateQuery)) {
                    for (Mortgage mortgage : mortgages) {
                        stmt.setInt(1, mortgage.getApplicationId());
                        stmt.executeUpdate();
                    }
                    System.out.println("Mortgages successfully packaged!");                }
            } catch (SQLException e) {
                System.out.println("Error packaging mortgages.");
                e.printStackTrace();
            }
        return response;
    }
}