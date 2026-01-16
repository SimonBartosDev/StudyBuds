"use server";

import { db } from "@/lib/db";
import { ensureUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

import { compare } from "bcryptjs";

export async function joinRoom(roomId: string, password?: string) {
    const userId = await ensureUser();
    if (!userId) throw new Error("Unauthorized");

    // Check if already enrolled
    const existing = await db.enrollment.findUnique({
        where: {
            userId_roomId: { userId, roomId },
        },
    });

    if (existing) {
        return { alreadyEnrolled: true };
    }

    // Check if room is private and verify password
    const room = await db.room.findUnique({
        where: { id: roomId },
    });

    if (!room) {
        throw new Error("Room not found");
    }

    if (room.isPrivate) {
        if (!password) {
            return { error: "Password required" };
        }

        const isMatch = room.password ? await compare(password, room.password) : false;
        if (!isMatch) {
            return { error: "Invalid password" };
        }
    }

    await db.enrollment.create({
        data: {
            userId,
            roomId,
        },
    });

    revalidatePath("/rooms");
    revalidatePath("/dashboard");
    revalidatePath(`/rooms/${roomId}`);

    return { success: true };
}

export async function leaveRoom(roomId: string) {
    const userId = await ensureUser();
    if (!userId) throw new Error("Unauthorized");

    await db.enrollment.delete({
        where: {
            userId_roomId: { userId, roomId },
        },
    });

    revalidatePath("/rooms");
    revalidatePath("/dashboard");
    revalidatePath(`/rooms/${roomId}`);

    return { success: true };
}

export async function isEnrolled(roomId: string) {
    const userId = await ensureUser();
    if (!userId) return false;

    const enrollment = await db.enrollment.findUnique({
        where: {
            userId_roomId: { userId, roomId },
        },
    });

    return !!enrollment;
}

export async function getEnrollmentCount(roomId: string) {
    const count = await db.enrollment.count({
        where: { roomId },
    });

    return count;
}
