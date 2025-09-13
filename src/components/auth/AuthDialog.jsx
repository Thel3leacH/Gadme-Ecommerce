import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { BsPersonFill } from "react-icons/bs";

function AuthDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button variant="outline">
          <BsPersonFill className="text-2xl " />
        </button>
      </DialogTrigger>
      <DialogContent>
        <Tabs defaultValue="login">
          <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm />
          </TabsContent>

          <TabsContent value="signup">
            <SignupForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default AuthDialog;
