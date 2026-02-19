import { useState, useCallback, useEffect } from "react";
import { authApi } from "../../api/axios";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await authApi.login({ email, password });
      if (response.success && response.data) {
        const userData = response.data.user;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setLoading(false);
        return true;
      }
      setLoading(false);
      return false;
    } catch (err) {
      setLoading(false);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.clear();
  }, []);

  return { user, isAuthenticated: !!user, loading, login, logout };
};
