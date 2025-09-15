import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";

export function ForgetPassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { fgtemail: "" },
  });

  const handleFgtPassword = (data) => {
    console.log("Forget Password data:", data);
    reset();
  };

  return (
    <Dialog>
      <div className="flex justify-center items-center py-1.5 px-1.5">
        <DialogTrigger asChild>
          <button className="text-blue-950 hover:underline hover:text-blue-500 ">
            Forget Password?
          </button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Forgot your password?</DialogTitle>
          <DialogDescription>
            Enter your email that associated with your account and we'll send a
            verification code to reset your password.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFgtPassword)}>
          <div className="grid gap-4 mb-3">
            <div className="grid gap-3">
              <Label htmlFor="fgtemail">Put Your Email Below</Label>
              <Input
                {...register("fgtemail", {
                  required: "Please enter your email",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // ตรวจ email ทั่วไป
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter your email"
                aria-invalid={errors.fgtemail ? "true" : "false"}
              />
              {errors.fgtemail && (
                <p role="alert" className="text-red-600">
                  {errors.fgtemail.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              variant="outline"
              className="bg-teal-500 text-gray-50 hover:bg-teal-600 hover:text-white"
            >
              Send verification code
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
