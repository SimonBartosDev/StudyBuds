"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "@/lib/utils";
import { useTransition } from "react";

interface PostCardProps {
    post: {
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
    };
    currentUserId?: string;
    onDelete?: (postId: string) => Promise<void>;
}

export function PostCard({ post, currentUserId, onDelete }: PostCardProps) {
    const [isPending, startTransition] = useTransition();
    const isAuthor = currentUserId === post.author.id;
    const initials =
        post.author.name
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase() || "?";

    const handleDelete = () => {
        if (onDelete) {
            startTransition(async () => {
                await onDelete(post.id);
            });
        }
    };

    return (
        <Card className="border-border/50">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-violet-500/20">
                            <AvatarImage src={post.author.avatar || undefined} />
                            <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white text-sm">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium text-sm">
                                {post.author.name || "Anonymous"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(post.createdAt))}
                            </p>
                        </div>
                    </div>
                    {isAuthor && onDelete && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={handleDelete}
                            disabled={isPending}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {post.content}
                </p>

                {post.fileUrl && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border/50">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
                            <FileText className="h-5 w-5 text-violet-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                                {post.fileName || "Attachment"}
                            </p>
                            <Badge variant="secondary" className="text-xs mt-0.5">
                                {post.fileUrl.includes(".pdf") ? "PDF" : "Image"}
                            </Badge>
                        </div>
                        <a
                            href={post.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                        >
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Download className="h-4 w-4" />
                            </Button>
                        </a>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
