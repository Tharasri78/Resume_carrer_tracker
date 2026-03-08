import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { registerUser, loginUser } from "../api/auth.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {

    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {

      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);

      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

    }

  }, []);

  const register = async ({ name, email, password }) => {

  setLoading(true);
  setError(null);

  try {

    const data = await registerUser({
      name,
      email,
      password
    });

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

    setUser(data.user);
    setIsAuthenticated(true);

    navigate("/dashboard");

  } catch (err) {

    setError(
      err.response?.data?.message ||
      err.response?.data?.error ||
      "Registration failed"
    );

  } finally {
    setLoading(false);
  }
};
const login = async (email, password) => {

  setLoading(true);
  setError(null);

  try {

    const data = await loginUser({
      email,
      password
    });

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

    setUser(data.user);
    setIsAuthenticated(true);

    navigate("/dashboard");

  } catch (err) {

    setError(
      err.response?.data?.message ||
      err.response?.data?.error ||
      "Login failed"
    );

  } finally {
    setLoading(false);
  }
};

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    delete api.defaults.headers.common["Authorization"];

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
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => useContext(AuthContext);