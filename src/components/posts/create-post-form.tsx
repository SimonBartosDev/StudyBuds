"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Paperclip, Send, X, FileText, Loader2 } from "lucide-react";
import { createPost } from "@/actions/posts";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/lib/uploadthing";

interface CreatePostFormProps {
    roomId: string;
    user: {
        id: string;
        name: string | null;
        avatar: string | null;
    };
}

export function CreatePostForm({ roomId, user }: CreatePostFormProps) {
    const [content, setContent] = useState("");
    const [file, setFile] = useState<{ url: string; name: string } | null>(null);
    const [isPending, startTransition] = useTransition();
    const [isUploading, setIsUploading] = useState(false);

    const initials = user.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "?";

    const handleSubmit = () => {
        if (!content.trim()) return;

        const formData = new FormData();
        formData.append("roomId", roomId);
        formData.append("content", content);
        if (file) {
            formData.append("fileUrl", file.url);
            formData.append("fileName", file.name);
        }

        startTransition(async () => {
            await createPost(formData);
            setContent("");
            setFile(null);
        });
    };

    return (
        <Card className="border-border/50 border-2 border-dashed hover:border-violet-500/30 transition-colors">
            <CardContent className="p-4">
                <div className="flex gap-3">
                    <Avatar className="h-10 w-10 border-2 border-violet-500/20 shrink-0">
                        <AvatarImage src={user.avatar || undefined} />
                        <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white text-sm">
                            {initials}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-3">
                        <Textarea
                            placeholder="Share your notes, summaries, or questions..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="min-h-[80px] resize-none border-0 p-0 focus-visible:ring-0 bg-transparent"
                        />

                        {file && (
                            <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 border border-border/50 w-fit">
                                <FileText className="h-4 w-4 text-violet-600" />
                                <span className="text-sm truncate max-w-[200px]">
                                    {file.name}
                                </span>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => setFile(null)}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-2 border-t border-border/50">
                            <div className="flex items-center gap-2">
                                {!file && (
                                    <UploadButton<OurFileRouter, "postAttachment">
                                        endpoint="postAttachment"
                                        onClientUploadComplete={(res) => {
                                            if (res?.[0]) {
                                                setFile({
                                                    url: res[0].ufsUrl,
                                                    name: res[0].name,
                                                });
                                            }
                                            setIsUploading(false);
                                        }}
                                        onUploadError={(error) => {
                                            console.error("Upload error:", error);
                                            setIsUploading(false);
                                        }}
                                        onUploadBegin={() => setIsUploading(true)}
                                        appearance={{
                                            button: {
                                                background: "transparent",
                                                border: "1px solid hsl(var(--input))",
                                                borderRadius: "0.375rem",
                                                padding: "0.5rem 0.75rem",
                                                color: "hsl(var(--muted-foreground))",
                                                fontSize: "0.875rem",
                                                cursor: "pointer",
                                            },
                                            allowedContent: {
                                                display: "none",
                                            },
                                        }}
                                        content={{
                                            button({ ready, isUploading }) {
                                                if (isUploading) {
                                                    return (
                                                        <span className="flex items-center gap-2">
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                            Uploading...
                                                        </span>
                                                    );
                                                }
                                                if (ready) {
                                                    return (
                                                        <span className="flex items-center gap-2">
                                                            <Paperclip className="h-4 w-4" />
                                                            Attach File
                                                        </span>
                                                    );
                                                }
                                                return <span>Loading...</span>;
                                            },
                                        }}
                                    />
                                )}
                            </div>

                            <Button
                                onClick={handleSubmit}
                                disabled={!content.trim() || isPending || isUploading}
                                className="gap-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Posting...
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-4 w-4" />
                                        Post
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
