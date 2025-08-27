
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"



export function ForgetPassword() {
    return (
        <Dialog>
            <form>
                <div className="flex flex-row-reverse py-1.5 px-1.5" >
                    <DialogTrigger asChild>
                        <button className="text-blue-950 hover:underline hover:text-blue-500 ">Forget Password?</button>
                    </DialogTrigger>
                </div>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Forgot your password?</DialogTitle>
                        <DialogDescription>
                            Enter your email that associated with your account and we'll send a verification code to reset your password.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="email">Put Your Email Below</Label>
                            <Input id="email" name="email" placeholder="Enter your email" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline">Send verification code</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}


