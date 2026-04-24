import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
const API = import.meta.env.VITE_API_URL;

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const register = async (name, email, password) => {
    const { data } = await axios.post(`${API}/auth/register`, {
      name,
      email,
      password,
    });

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    setUser(data.user);
    setToken(data.token);
    alert("Register successful");
  };

  const login = async (email, password) => {
    const { data } = await axios.post(`${API}/auth/login`, {
      email,
      password,
    });

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    setUser(data.user);
    setToken(data.token);
    alert("Login successful");
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};