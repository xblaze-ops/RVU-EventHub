import { createContext, useContext, useState } from "react";
import API from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("rvuUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email, password) => {
    const response = await API.post("/login", {
      email,
      password,
    });

    const loggedInUser = response.data.user;

    localStorage.setItem(
      "rvuUser",
      JSON.stringify(loggedInUser)
    );

    setUser(loggedInUser);

    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("rvuUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}