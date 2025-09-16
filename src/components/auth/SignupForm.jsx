import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:3000";

export function SignupForm({ onSuccess }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      cfpassword: "",
    },
  });

  const handleSignup = async (data) => {
    // 👇 ปรับคีย์ให้ตรงกับ backend ของคุณ
    const payload = {
      user_name: data.firstname.trim(), // ถ้า backend ใช้ user_firstname -> เปลี่ยนตรงนี้
      user_lastname: data.lastname.trim(),
      user_username: data.username.trim(),
      user_email: data.email.trim(),
      user_password: data.password,
    };

    const tId = toast.loading("กำลังลงทะเบียน...");

    try {
      await axios.post(`${API_URL}/auth/signup`, payload, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      toast.success("ลงทะเบียนสำเร็จแล้ว 🎉", { id: tId });
      reset();
      onSuccess && onSuccess(); // ✅ ปิด popup
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Signup failed";
      toast.error(`สมัครไม่สำเร็จ: ${msg}`, { id: tId });
      console.error(err);
    }
  };

  return (
    <div className="font-poppins">
      <form onSubmit={handleSubmit(handleSignup)}>
        <DialogHeader>
          <DialogTitle>Sign up</DialogTitle>
          <DialogDescription>
            Sign up for better experience. Please provide your information
            below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 my-4">
          <div>
            <Label htmlFor="firstname" className="mb-1">
              Firstname
            </Label>
            <Input
              {...register("firstname", {
                required: "Firstname is required",
                minLength: {
                  value: 3,
                  message: "Firstname must be at least 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Firstname cannot exceed 20 characters",
                },
              })}
              placeholder="Enter your firstname here"
              autoComplete="given-name"
              aria-invalid={errors.firstname ? "true" : "false"}
            />
            {errors.firstname && (
              <p role="alert" className="text-red-600">
                {errors.firstname.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="lastname" className="mb-1">
              Lastname
            </Label>
            <Input
              {...register("lastname", {
                required: "Lastname is required",
                minLength: {
                  value: 3,
                  message: "Lastname must be at least 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Lastname cannot exceed 20 characters",
                },
              })}
              placeholder="Enter your lastname here"
              autoComplete="family-name"
              aria-invalid={errors.lastname ? "true" : "false"}
            />
            {errors.lastname && (
              <p role="alert" className="text-red-600">
                {errors.lastname.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="username" className="mb-1">
              Username
            </Label>
            <Input
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Username cannot exceed 20 characters",
                },
              })}
              placeholder="Enter your username here"
              autoComplete="username"
              aria-invalid={errors.username ? "true" : "false"}
            />
            {errors.username && (
              <p role="alert" className="text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="mb-1">
              Email
            </Label>
            <Input
              type="email"
              {...register("email", {
                required: "Email Address is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter your email"
              autoComplete="email"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p role="alert" className="text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="password" className="mb-1">
              Password
            </Label>
            <Input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password cannot exceed 20 characters",
                },
              })}
              placeholder="Your password at least 8 characters"
              autoComplete="new-password"
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <p role="alert" className="text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="cfpassword" className="mb-1">
              Confirm Password
            </Label>
            <Input
              type="password"
              {...register("cfpassword", {
                required: "Confirm your password please",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password cannot exceed 20 characters",
                },
                validate: (value) =>
                  value === watch("password") || "Password do not match",
              })}
              placeholder="Re-type your password"
              autoComplete="new-password"
              aria-invalid={errors.cfpassword ? "true" : "false"}
            />
            {errors.cfpassword && (
              <p role="alert" className="text-red-600">
                {errors.cfpassword.message}
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isSubmitting}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="bg-teal-500 hover:bg-teal-600"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </form>
    </div>
  );
}
