"use client";

import { PostCard } from "@/components/posts/post-card";
import { FileText } from "lucide-react";
import { deletePost } from "@/actions/posts";

interface Post {
    id: string;
    content: string;
    fileUrl: string | null;
    fileName: string | null;
    createdAt: Date;
    author: {
        id: string;
        name: string | null;
        avatar: string | null;
    };
}

interface PostsListProps {
    posts: Post[];
    currentUserId: string;
    roomId: string;
}

export function PostsList({ posts, currentUserId, roomId }: PostsListProps) {
    const handleDeletePost = async (postId: string) => {
        await deletePost(postId);
    };

    if (posts.length === 0) {
        return (
            <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed border-border/50">
                <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="font-medium mb-2">No posts yet</h3>
                <p className="text-sm text-muted-foreground">
                    Be the first to share notes or study materials!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <PostCard
                    key={post.id}
                    post={post}
                    currentUserId={currentUserId}
                    onDelete={handleDeletePost}
                />
            ))}
        </div>
    );
}
