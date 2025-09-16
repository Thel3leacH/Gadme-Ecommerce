import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import api from "@/apigang/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const refresh = useCallback(async () => {
    try {
      const { data, status } = await api.get("api/auth/profile");

      // ✅ ยอมรับเฉพาะ { user: {...} } และไม่ error
      const u = data?.user;
      const isValidUser =
        u &&
        typeof u === "object" &&
        !Array.isArray(u) &&
        !!u._id &&
        !data?.error;

      if (status === 200 && isValidUser) {
        setUser(u);
      } else {
        setUser(null);
      }
    } catch (e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = (userData) => {
    if (!userData) return;
    setUser(userData);
    const role =
      userData?.user_role ?? userData?.role ?? userData?.user?.user_role;
    navigate(role === "Admin" ? "/admin" : "/", { replace: true });
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout"); // server เคลียร์คุกกี้
      setUser(null);
      navigate("/", { replace: true }); // กลับหน้าแรก
      return true;
    } catch (e) {
      console.error("Logout failed:", e);
      return false;
    }
  };

  if (loading)
    return <div className="text-center mt-10 text-xl">Loading...</div>;

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, login, logout, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
