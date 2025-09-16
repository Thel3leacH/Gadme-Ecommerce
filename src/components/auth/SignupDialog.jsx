import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { SignupForm } from "./SignupForm";

export function SignupDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Sign up</Button>
      </DialogTrigger>

      <DialogContent>
        <SignupForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
