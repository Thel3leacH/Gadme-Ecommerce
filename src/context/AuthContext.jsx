import { createContext, useContext, useEffect, useState } from "react";
import api from "../apigang/api.js";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/auth/profile");
        setUser(response.data.user); //เก็บค่า user ใน state
      } catch (err) {
        console.error("Not authenticated:", err);
        setUser(null); //Clear user ใน state ถ้าไม่ผ่าน authen
      } finally {
        setLoading(false); // โหลดหน้า Loading
      }
    };

    fetchProfile();
  }, []);

  const login = (userData) => {
    setUser(userData); //Save user info ไว้
    if (userData.user_role === "Admin") {
      Navigate("admin"); //ถ้าใช่ Admin หลัง Login เสร็จแล้วไปที่หน้า (รอเลือกหน้าที่ต้องการแสดง)
    } else {
      Navigate(""); //ถ้าไม่ใช่ Admin หลัง Login เสร็จแล้วไปที่หน้า (รอเลือกหน้าที่ต้องการแสดง)
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      Navigate("/"); //หลัง Logout เสร็จแล้วไปที่หน้า (รอเลือกหน้าที่ต้องการแสดง)
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading...</div>; // Show หน้า Loading
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
