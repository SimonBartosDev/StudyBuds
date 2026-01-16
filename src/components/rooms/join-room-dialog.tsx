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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { joinRoom } from "@/actions/enrollments";


interface JoinRoomDialogProps {
    roomId: string; // Add roomId prop
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function JoinRoomDialog({ roomId, open, onOpenChange }: JoinRoomDialogProps) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleJoin = async () => {
        setError("");
        startTransition(async () => {
            try {
                const result = await joinRoom(roomId, password);
                if (result.error) {
                    setError(result.error);
                } else {
                    onOpenChange(false);
                }
            } catch (e) {
                setError("Failed to join room");
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Enter Room Password</DialogTitle>
                    <DialogDescription>
                        This room is private. Please enter the password to join.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleJoin();
                            }}
                        />
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleJoin}
                        disabled={isPending || !password}
                        className="bg-gradient-to-r from-violet-500 to-purple-600 text-white"
                    >
                        {isPending ? "Joining..." : "Join Room"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
