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

export function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { loginemail: "", loginpassword: "" },
  });

  const handleLogin = (data) => {
    console.log("Login Data:", data);
    reset();
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
          {/* Email input field */}
          <div>
            <Label htmlFor="loginemail" className="mb-1">
              Email
            </Label>
            <Input
              {...register("loginemail", {
                required: "Please enter your email",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // ตรวจ email ทั่วไป
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter your email"
              aria-invalid={errors.loginemail ? "true" : "false"}
            />
            {errors.loginemail && (
              <p role="alert" className="text-red-600">
                {errors.loginemail.message}
              </p>
            )}
          </div>

          {/* Password input field */}
          <div>
            <Label htmlFor="loginpassword" className="mb-1">
              Password
            </Label>
            <Input
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
              type="password"
              placeholder="Enter your password"
              aria-invalid={errors.loginpassword ? "true" : "false"}
            />
            {errors.loginpassword && (
              <p role="alert" className="text-red-600">
                {errors.loginpassword.message}
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            className="w-full bg-teal-500 hover:bg-teal-700"
            type="submit"
          >
            Log in
          </Button>
        </DialogFooter>
      </form>
      <ForgetPassword />
    </div>
  );
}
