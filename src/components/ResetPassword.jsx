
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"



export function ResetPassword() {
    return (
        <Dialog>
            <form>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Reset Password</DialogTitle>
                        <DialogDescription>
                            Enter your new password below.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="new-password">Password</Label>
                            <Input id="password" name="password" placeholder="Enter your new password here. Should contain at least 8 character" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="cf-new-password">Confirm Password</Label>
                            <Input id="cfpassword" name="cfpassword" placeholder="Re-type your new password" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline">Reset Password</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}


