"use client"
import { createLead, State } from "@/action/action"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
export function CreateLead() {
  const initialState: State = {
    message: "",
    errorMessage: "",
  }

  const [state, formAction, isPending] = useActionState(
    createLead,
    initialState,
  )

  useEffect(() => {
    if (state.errorMessage) {
      toast.error(state.errorMessage)
    } else if (state.message) {
      toast.success(state.message)
    }
  }, [state])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="my-5 block ml-auto">
          Create Lead
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={formAction} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Create lead</DialogTitle>
            <DialogDescription>
              Enter the email and description of the lead and click submit to
              save
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="e.g JohnDoe@gmail.com"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                name="description"
                placeholder="e.g Restaurant in Las vegas, Roofing in Texas "
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
