import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // REGISTER
const register = async ({ name, email, password }) => {
  setLoading(true);
  setError(null);

  try {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    const data = response.data;

    // 🔒 Guard
    if (!data || !data.token || !data.user) {
      throw new Error(data?.message || "Invalid register response");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);
    setIsAuthenticated(true);
    navigate("/dashboard");
  } catch (err) {
    // 🔥 THIS LINE MATTERS
    const message =
      err.response?.data?.error ||
      err.response?.data?.message ||
      err.message ||
      "Registration failed";

    setError(message);
    console.error("REGISTER ERROR:", message);
  } finally {
    setLoading(false);
  }
};

// LOGIN
const login = async (email, password) => {
  setLoading(true);
  setError(null);

  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const data = response.data;

    // 🔒 Guard
    if (!data || !data.token || !data.user) {
      throw new Error(data?.message || "Invalid login response");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);
    setIsAuthenticated(true);
    navigate("/dashboard");
  } catch (err) {
    const message =
      err.response?.data?.error ||
      err.response?.data?.message ||
      err.message ||
      "Login failed";

    setError(message);
    console.error("LOGIN ERROR:", message);
  } finally {
    setLoading(false);
  }
};

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};