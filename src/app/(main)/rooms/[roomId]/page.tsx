import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getRoom } from "@/actions/rooms";
import { getPosts } from "@/actions/posts";
import { isEnrolled, leaveRoom } from "@/actions/enrollments";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Users, FileText, LogOut, BookOpen } from "lucide-react";
import { PostsList } from "./posts-list";
import { CreatePostForm } from "@/components/posts/create-post-form";

interface RoomPageProps {
    params: Promise<{ roomId: string }>;
}

export default async function RoomPage({ params }: RoomPageProps) {
    const { roomId } = await params;
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const [room, enrolled, posts, currentUser] = await Promise.all([
        getRoom(roomId),
        isEnrolled(roomId),
        getPosts(roomId),
        db.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, avatar: true },
        }),
    ]);

    if (!room) {
        notFound();
    }

    if (!enrolled) {
        redirect("/rooms");
    }

    async function handleLeaveRoom() {
        "use server";
        await leaveRoom(roomId);
        redirect("/rooms");
    }

    return (
        <div className="px-6 lg:px-8 py-8 max-w-4xl mx-auto">
            {/* Room Header */}
            <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{room.name}</h1>
                        <p className="text-muted-foreground">{room.university}</p>
                    </div>
                    <form action={handleLeaveRoom}>
                        <Button
                            type="submit"
                            variant="outline"
                            size="sm"
                            className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                            <LogOut className="h-4 w-4" />
                            Leave Room
                        </Button>
                    </form>
                </div>

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

                <Separator />
            </div>

            {/* Create Post Form */}
            {currentUser && (
                <div className="mb-8">
                    <CreatePostForm
                        roomId={roomId}
                        user={{
                            id: currentUser.id,
                            name: currentUser.name,
                            avatar: currentUser.avatar,
                        }}
                    />
                </div>
            )}

            {/* Posts Feed */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-violet-600" />
                    Posts
                    <Badge variant="secondary" className="ml-auto">
                        {posts.length}
                    </Badge>
                </h2>

                <PostsList posts={posts} currentUserId={userId} roomId={roomId} />
            </div>
        </div>
    );
}
