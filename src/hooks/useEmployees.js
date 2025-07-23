import { useState, useEffect } from "react";
import { employeeService } from "@/services/api/employeeService";

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEmployees = async () => {
    setLoading(true);
    setError("");
    
try {
      const data = await employeeService.getAll();
      setEmployees(data || []);
    } catch (err) {
      console.error("Error loading employees:", err);
      
      // Handle specific SDK-related errors
      if (err.message?.includes('ApperSDK')) {
        setError("Service is temporarily unavailable. Please refresh the page and try again.");
      } else if (err.message?.includes('Network Error')) {
        setError("Network connection failed. Please check your internet connection.");
      } else {
        setError(err.message || "Failed to load employees. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return {
    employees,
    loading,
    error,
    refetch: loadEmployees
  };
};