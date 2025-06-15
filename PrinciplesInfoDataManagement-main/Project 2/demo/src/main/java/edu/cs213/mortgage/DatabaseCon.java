package edu.cs213.mortgage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseCon {
    private static final String URL = "jdbc:postgresql://localhost:5432/postgres";
    private static final String USER = "postgres";
    private static final String PASSWORD = "k20183497k";

    public static Connection connect() throws SQLException {
        try {
            Class.forName("org.postgresql.Driver");
            System.out.println("Attempting database connection to: " + URL);
            return DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (ClassNotFoundException e) {
            throw new SQLException("PostgreSQL JDBC driver not found", e);
        }
    }
}
