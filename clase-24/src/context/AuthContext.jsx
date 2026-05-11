import { useEffect } from "react";
import { createContext, useState } from "react";
import { getProfile } from "../services/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const data = await getProfile();
        // console.log(data);
        setUser(data);

        // const { email, _id } = data;

        // setUser({
        //   _id,
        //   email,
        // });
      } catch {
        localStorage.removeItem("token");
        setUser(null);
        // console.log(error);
      }
    }

    loadProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
