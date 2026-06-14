import { createContext, useState } from "react";
import API from "../services/api/axios";

// ==========================================
// AUTH CONTEXT (Global User Data)
// Context is a way to share data (like the logged-in user's info)
// across the entire app without passing it down manually to every single component.
// ==========================================

export const AuthContext = createContext();

function AuthProvider({ children }) {
  // 1. STATE: Keep track of the user object (name, email)
  // We check localStorage first so if they refresh the page, they stay logged in!
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 2. LOGIN FUNCTION: Called when the user successfully signs in
  const login = (userData) => {
    // Update the app's live memory (React state)
    setUser(userData);

    // Save it to the browser's hard drive (localStorage) so they stay logged in after closing the tab
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 3. LOGOUT FUNCTION: Called when they click the logout button
  const logout = async () => {
    try {
      // Hit the backend to clear the HttpOnly cookie
      // Assume API is imported from axios.js, we need to import it at the top
      await API.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    }

    // Clear the app's live memory
    setUser(null);

    // Erase the data from the browser's hard drive
    localStorage.removeItem("user");
  };

  return (
    // We wrap our entire app in this Provider, and "value" is what we share with every page
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;