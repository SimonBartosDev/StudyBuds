"use server";

import { db } from "@/lib/db";
import { ensureUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
    const userId = await ensureUser();
    if (!userId) throw new Error("Unauthorized");

    const roomId = formData.get("roomId") as string;
    const content = formData.get("content") as string;
    const fileUrl = formData.get("fileUrl") as string | null;
    const fileName = formData.get("fileName") as string | null;

    if (!roomId || !content) {
        throw new Error("Room ID and content are required");
    }

    // Check if user is enrolled in the room
    const enrollment = await db.enrollment.findUnique({
        where: {
            userId_roomId: { userId, roomId },
        },
    });

    if (!enrollment) {
        throw new Error("You must be enrolled in this room to post");
    }

    const post = await db.post.create({
        data: {
            content,
            fileUrl: fileUrl || null,
            fileName: fileName || null,
            roomId,
            authorId: userId,
        },
    });

    revalidatePath(`/rooms/${roomId}`);

    return post;
}

export async function getPosts(roomId: string) {
    const posts = await db.post.findMany({
        where: { roomId },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    avatar: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    return posts;
}

export async function deletePost(postId: string) {
    const userId = await ensureUser();
    if (!userId) throw new Error("Unauthorized");

    const post = await db.post.findUnique({
        where: { id: postId },
    });

    if (!post) throw new Error("Post not found");
    if (post.authorId !== userId) throw new Error("Not authorized");

    await db.post.delete({ where: { id: postId } });

    revalidatePath(`/rooms/${post.roomId}`);
}
