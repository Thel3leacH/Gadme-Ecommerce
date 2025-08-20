
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"


export function SignupPopup() {
    return (
        <Dialog>
            <form>
                <div className="flex flex-row-reverse py-1.5 px-1.5" >
                    <DialogTrigger asChild>
                        <Button variant="outline" className="text-blue-950" >Sign up</Button>
                    </DialogTrigger>
                </div>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Sign up</DialogTitle>
                        <DialogDescription>
                            Sign up for better experience. Please provide your information below.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="firstname">Firstname</Label>
                            <Input id="firstname" name="firstname" placeholder="Enter your firstname here" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="lastname">Lastname</Label>
                            <Input id="lastname" name="lastname" placeholder="Enter your firstname here" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" name="username" placeholder="Enter your username here" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" placeholder="Enter your email" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" placeholder="Your password at least 8 character" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="cfpassword">Confirm Password</Label>
                            <Input id="cfpassword" name="cfpassword" placeholder="Re-type your password" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
