import { useEffect } from "react";
import { createContext, useState } from "react";
import { getProfile } from "../src/services/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    async function verifyUser() {
      const token = localStorage.getItem("token");

      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const data = await getProfile();
        setUser(data);
        console.log(data);
      } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
        console.log(error);
      } finally {
        setAuthLoading(false);
      }
    }
    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, authLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
