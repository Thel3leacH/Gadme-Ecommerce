
import { ForgetPassword } from "./ForgetPassword"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"



export function LoginForm() {
    return (
        <Dialog>
            <form>
                <div className="flex flex-row-reverse py-1.5 px-1.5" >
                    <DialogTrigger asChild>
                        <Button variant="outline" className="text-blue-950">Sign in</Button>
                    </DialogTrigger>
                </div>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Sign in</DialogTitle>
                        <DialogDescription>
                            Sign in for better experience. Please provide your e-mail and password.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" placeholder="Enter your email" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" placeholder="Enter your password" />
                            <ForgetPassword />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Log in</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
