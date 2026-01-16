"use server";

import { db } from "@/lib/db";
import { ensureUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export type RoomWithCount = {
    id: string;
    name: string;
    university: string;
    createdAt: Date;
    isPrivate: boolean;
    _count: {
        members: number;
        posts: number;
    };
};

import { hash } from "bcryptjs";

export async function createRoom(formData: FormData) {
    const userId = await ensureUser();
    if (!userId) throw new Error("Unauthorized");

    const name = formData.get("name") as string;
    const university = formData.get("university") as string;
    const isPrivate = formData.get("isPrivate") === "on";
    const password = formData.get("password") as string;

    if (!name || !university) {
        throw new Error("Name and university are required");
    }

    if (isPrivate && !password) {
        throw new Error("Password is required for private rooms");
    }

    let hashedPassword = null;
    if (isPrivate && password) {
        hashedPassword = await hash(password, 10);
    }

    const room = await db.room.create({
        data: {
            name,
            university,
            isPrivate,
            password: hashedPassword,
        },
    });

    // Auto-enroll creator
    await db.enrollment.create({
        data: {
            userId,
            roomId: room.id,
        },
    });

    revalidatePath("/rooms");
    revalidatePath("/dashboard");

    return room;
}

export async function getRooms(search?: string): Promise<RoomWithCount[]> {
    const rooms = await db.room.findMany({
        where: search
            ? {
                OR: [
                    { name: { contains: search, mode: "insensitive" } },
                    { university: { contains: search, mode: "insensitive" } },
                ],
            }
            : undefined,
        include: {
            _count: {
                select: {
                    members: true,
                    posts: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    return rooms.map(({ password, ...room }) => room as RoomWithCount);
}

export async function getRoom(roomId: string): Promise<RoomWithCount | null> {
    const room = await db.room.findUnique({
        where: { id: roomId },
        include: {
            _count: {
                select: {
                    members: true,
                    posts: true,
                },
            },
        },
    });

    if (!room) return null;
    const { password, ...roomWithoutPassword } = room;
    return roomWithoutPassword as RoomWithCount;
}

export async function getUserRooms(): Promise<RoomWithCount[]> {
    const userId = await ensureUser();
    if (!userId) return [];

    const enrollments = await db.enrollment.findMany({
        where: { userId },
        include: {
            room: {
                include: {
                    _count: {
                        select: {
                            members: true,
                            posts: true,
                        },
                    },
                },
            },
        },
        orderBy: { joinedAt: "desc" },
    });

    return enrollments.map((enrollment) => {
        const { password, ...roomWithoutPassword } = enrollment.room;
        return roomWithoutPassword as RoomWithCount;
    });
}

