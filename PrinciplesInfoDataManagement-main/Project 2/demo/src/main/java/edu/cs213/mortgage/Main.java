package edu.cs213.mortgage;

import java.util.Scanner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication

public class Main {
    public static void main(String[] args) {
        System.out.println("Starting Spring Boot application...");
        try {
            SpringApplication.run(Main.class, args);
            System.out.println("Spring Boot application started successfully");
            System.out.println("Server running at http://localhost:8080");
        } catch (Exception e) {
            System.err.println("Failed to start Spring Boot application:");
            e.printStackTrace();
        }
        /* 
        System.out.println("Welcome to the Mortgage Backed Securities System");
        MortgageApp app = new MortgageApp(); 
        app.run();  // Starts the main program loop
        */

    }
}