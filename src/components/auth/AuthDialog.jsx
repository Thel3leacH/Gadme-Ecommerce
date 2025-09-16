// AuthDialog.jsx
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { BsPersonFill } from "react-icons/bs";

export default function AuthDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open login dialog">
          <BsPersonFill className="text-xl" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[420px]">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            {/* ปิด dialog เมื่อ login สำเร็จ */}
            <LoginForm onSuccess={() => setOpen(false)} />
          </TabsContent>

          <TabsContent value="signup">
            {/* ถ้ามี signup สำเร็จให้ปิดด้วยเหมือนกัน */}
            <SignupForm onSuccess={() => setOpen(false)} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
