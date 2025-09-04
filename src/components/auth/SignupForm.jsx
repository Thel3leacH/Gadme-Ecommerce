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

export function SignupForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
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

  const handleSignup = (data) => {
    console.log("Signup Data:", data);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSignup)}>
        <DialogHeader>
          <DialogTitle>Sign up</DialogTitle>
          <DialogDescription>
            Sign up for better experience. Please provide your information
            below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 my-4">
          {/* First name input field */}
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
              aria-invalid={errors.firstname ? "true" : "false"}
            />
            {errors.firstname && (
              <p role="alert" className="text-red-600">
                {errors.firstname.message}
              </p>
            )}
          </div>

          {/* Last name input field */}
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
              aria-invalid={errors.lastname ? "true" : "false"}
            />
            {errors.lastname && (
              <p role="alert" className="text-red-600">
                {errors.lastname.message}
              </p>
            )}
          </div>

          {/* Username input field */}
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
              aria-invalid={errors.username ? "true" : "false"}
            />
            {errors.username && (
              <p role="alert" className="text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email input field */}
          <div>
            <Label htmlFor="email" className="mb-1">
              Email
            </Label>
            <Input
              {...register("email", {
                required: "Email Address is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // regex ตรวจ email ทั่วไป
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter your email"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p role="alert" className="text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password input field */}
          <div>
            <Label htmlFor="password" className="mb-1">
              Password
            </Label>
            <Input
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
              type="password"
              placeholder="Your password at least 8 characters"
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <p role="alert" className="text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password input field */}
          <div>
            <Label htmlFor="cfpassword" className="mb-1">
              Confirm Password
            </Label>
            <Input
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
              type="password"
              placeholder="Re-type your password"
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
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button className="bg-teal-500 hover:bg-teal-600" type="submit">
            Submit
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}
