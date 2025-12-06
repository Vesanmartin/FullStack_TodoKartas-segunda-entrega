// src/context/AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// URL base de tu backend Node + Mongo
const API_URL = "http://localhost:3001/api"; 

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);


  // REGISTRO 
  // recibe { name, email, password } desde Register.jsx
  const register = async ({ nombre, email, password }) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // el backend espera { nombre, email, password }
      body: JSON.stringify({ nombre, email, password }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.msg || "Error al registrar usuario");
    }

    const data = await res.json().catch(() => ({}));
    return data;
  };

  // LOGIN
  const login = async ({ email, password }) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.msg || "Error al iniciar sesión");
    }

    const data = await res.json();

    setUser(data.usuario || null);
    setToken(data.token || null);

    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// exportar useAuth como *named export*
export function useAuth() {
  return useContext(AuthContext);
}


export default AuthProvider;
