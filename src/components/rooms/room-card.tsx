"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, ArrowRight, Lock } from "lucide-react";
import { joinRoom } from "@/actions/enrollments";
import { useTransition } from "react";
import { JoinRoomDialog } from "@/components/rooms/join-room-dialog";

interface RoomCardProps {
    room: {
        id: string;
        name: string;
        university: string;
        isPrivate: boolean;
        _count?: {
            members: number;
            posts: number;
        };
    };
    isEnrolled?: boolean;
}

export function RoomCard({ room, isEnrolled = false }: RoomCardProps) {
    const [isPending, startTransition] = useTransition();
    const [showPasswordDialog, setShowPasswordDialog] = useState(false);

    const handleJoin = () => {
        if (room.isPrivate) {
            setShowPasswordDialog(true);
            return;
        }

        startTransition(async () => {
            await joinRoom(room.id);
        });
    };

    return (
        <>
            <Card className="group relative overflow-hidden border-border/50 hover:border-violet-500/50 transition-all hover:shadow-lg hover:shadow-violet-500/5">
                {/* Gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-lg truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors flex items-center gap-2">
                                {room.name}
                                {room.isPrivate && <Lock className="h-4 w-4 text-muted-foreground" />}
                            </h3>
                            <p className="text-sm text-muted-foreground truncate">
                                {room.university}
                            </p>
                        </div>
                        {isEnrolled && (
                            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                                Joined
                            </Badge>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="pb-3">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Users className="h-4 w-4" />
                            <span>{room._count?.members ?? 0} members</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <FileText className="h-4 w-4" />
                            <span>{room._count?.posts ?? 0} posts</span>
                        </div>
                    </div>
                </CardContent>

                <CardFooter>
                    {isEnrolled ? (
                        <Link href={`/rooms/${room.id}`} className="w-full">
                            <Button className="w-full gap-2 group/btn" variant="secondary">
                                View Room
                                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </Button>
                        </Link>
                    ) : (
                        <Button
                            className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700"
                            onClick={handleJoin}
                            disabled={isPending}
                        >
                            {isPending ? "Joining..." : room.isPrivate ? "Join Private Room" : "Join Room"}
                        </Button>
                    )}
                </CardFooter>
            </Card>

            <JoinRoomDialog
                roomId={room.id}
                open={showPasswordDialog}
                onOpenChange={setShowPasswordDialog}
            />
        </>
    );
}
