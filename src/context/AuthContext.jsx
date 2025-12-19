import { createContext, useContext, useEffect, useState } from "react";
import { getMe, logoutAdmin } from "@/services/admin.api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then(res => setAdmin(res.data.admin))
      .catch(() => setAdmin(null))
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await logoutAdmin();
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, setAdmin, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
