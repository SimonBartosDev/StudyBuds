"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { createRoom } from "@/actions/rooms";

export function CreateRoomDialog() {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            await createRoom(formData);
            setOpen(false);
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700">
                    <Plus className="h-4 w-4" />
                    Create Room
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Create a New Room</DialogTitle>
                    <DialogDescription>
                        Create a room for your course to share notes and materials with
                        classmates.
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit}>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">
                                Course Name
                            </label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="e.g., CS101 - Introduction to Programming"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="university" className="text-sm font-medium">
                                University
                            </label>
                            <Input
                                id="university"
                                name="university"
                                placeholder="e.g., Aalto University"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="bg-gradient-to-r from-violet-500 to-purple-600 text-white"
                        >
                            {isPending ? "Creating..." : "Create Room"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
