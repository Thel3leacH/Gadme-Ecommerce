import axios from "axios";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ForgetPassword } from "./ForgetPassword";
import { useAuth } from "@/context/AuthContext"; // <<--- เพิ่ม

const API_URL = "http://localhost:3000";

export function LoginForm({ onSuccess }) {
  const { setUser, refresh, login } = useAuth(); // <<--- ใช้จาก AuthContext

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { loginemail: "", loginpassword: "" },
  });

  const handleLogin = async (data) => {
    const payload = {
      user_email: data.loginemail.trim(),
      user_password: data.loginpassword,
    };

    try {
      const res = await toast.promise(
        axios.post(`${API_URL}/auth/cookie/login`, payload, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }),
        {
          loading: "กำลังเข้าสู่ระบบ...",
          success: "เข้าสู่ระบบสำเร็จ 🎉",
          error: (err) =>
            err?.response?.data?.message || "เข้าสู่ระบบไม่สำเร็จ",
        }
      );

      // 1) ถ้าหลังบ้านส่ง user มากับ response ก็ใช้เลย
      if (res?.data?.user) {
        login(res.data.user);
      } else {
        // 2) ถ้าไม่ส่ง user มา ให้เรียก /auth/me จากคุกกี้
        await refresh(); // ภายใน refresh จะเซ็ต user ให้เอง (ดูส่วน B)
      }

      reset();
      onSuccess?.(res.data); // ปิด dialog ที่ parent
    } catch (err) {
      console.error("Login failed:", err?.response?.data || err.message);
      setError("root", {
        type: "server",
        message:
          err?.response?.data?.message || "Invalid credentials or server error",
      });
      setUser(null); // กันพลาด: ล้าง user ถ้า login fail
    }
  };

  return (
    <div className="font-poppins">
      <form onSubmit={handleSubmit(handleLogin)}>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Sign in for better experience. Please provide your e-mail and
            password.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 my-4">
          {/* Email */}
          <div>
            <Label htmlFor="loginemail" className="mb-1">
              Email
            </Label>
            <Input
              id="loginemail"
              autoComplete="email"
              {...register("loginemail", {
                required: "Please enter your email",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter your email"
              aria-invalid={errors.loginemail ? "true" : "false"}
            />
            {errors.loginemail && (
              <p role="alert" className="text-red-600 text-sm mt-1">
                {errors.loginemail.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="loginpassword" className="mb-1">
              Password
            </Label>
            <Input
              id="loginpassword"
              type="password"
              autoComplete="current-password"
              {...register("loginpassword", {
                required: "Please enter your password",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password cannot exceed 20 characters",
                },
              })}
              placeholder="Enter your password"
              aria-invalid={errors.loginpassword ? "true" : "false"}
            />
            {errors.loginpassword && (
              <p role="alert" className="text-red-600 text-sm mt-1">
                {errors.loginpassword.message}
              </p>
            )}
          </div>

          {/* Server error */}
          {errors.root && (
            <p role="alert" className="text-red-600 text-sm -mt-2">
              {errors.root.message}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button
            className="w-full bg-teal-500 hover:bg-teal-700"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </Button>
        </DialogFooter>
      </form>

      <ForgetPassword />
    </div>
  );
}
