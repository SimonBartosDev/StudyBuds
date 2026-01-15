"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Room {
    id: string;
    name: string;
    university: string;
    _count?: {
        members: number;
        posts: number;
    };
}

interface SidebarProps {
    rooms: Room[];
}

export function Sidebar({ rooms }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside className="hidden lg:flex w-64 flex-col border-r border-border/40 bg-muted/30">
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Your Rooms
                    </h2>
                    <Link href="/rooms">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
                <Separator className="mb-4" />
            </div>

            <ScrollArea className="flex-1 px-4">
                {rooms.length === 0 ? (
                    <div className="text-center py-8">
                        <BookOpen className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground">No rooms yet</p>
                        <Link href="/rooms">
                            <Button variant="link" size="sm" className="mt-2">
                                Browse rooms
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-1">
                        {rooms.map((room) => {
                            const isActive = pathname === `/rooms/${room.id}`;
                            return (
                                <Link key={room.id} href={`/rooms/${room.id}`}>
                                    <div
                                        className={`group flex flex-col gap-1 rounded-lg px-3 py-2.5 transition-colors ${isActive
                                                ? "bg-violet-500/10 text-violet-600 dark:text-violet-400"
                                                : "hover:bg-muted"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-sm truncate">
                                                {room.name}
                                            </span>
                                            {room._count && (
                                                <Badge
                                                    variant="secondary"
                                                    className="text-xs h-5 px-1.5"
                                                >
                                                    {room._count.posts}
                                                </Badge>
                                            )}
                                        </div>
                                        <span className="text-xs text-muted-foreground truncate">
                                            {room.university}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </ScrollArea>
        </aside>
    );
}
