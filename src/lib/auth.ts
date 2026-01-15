import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

/**
 * Ensures the current user exists in our database.
 * Creates the user if they don't exist (auto-sync from Clerk).
 * Returns the user ID if authenticated, null otherwise.
 */
export async function ensureUser(): Promise<string | null> {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    // Check if user already exists in our database
    const existingUser = await db.user.findUnique({
        where: { id: userId },
    });

    if (existingUser) {
        return userId;
    }

    // User doesn't exist - fetch from Clerk and create
    const clerkUser = await currentUser();

    if (!clerkUser) {
        return null;
    }

    const email = clerkUser.emailAddresses[0]?.emailAddress;
    if (!email) {
        throw new Error("User has no email address");
    }

    const name = [clerkUser.firstName, clerkUser.lastName]
        .filter(Boolean)
        .join(" ") || null;

    await db.user.create({
        data: {
            id: userId,
            email,
            name,
            avatar: clerkUser.imageUrl,
        },
    });

    console.log(`Auto-synced user: ${userId}`);
    return userId;
}
