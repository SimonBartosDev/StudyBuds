import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error("Please add CLERK_WEBHOOK_SECRET to .env");
    }

    // Get the headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Missing svix headers", { status: 400 });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the webhook
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error("Webhook verification failed:", err);
        return new Response("Webhook verification failed", { status: 400 });
    }

    const eventType = evt.type;

    if (eventType === "user.created" || eventType === "user.updated") {
        const { id, email_addresses, first_name, last_name, image_url } = evt.data;

        const email = email_addresses[0]?.email_address;
        if (!email) {
            return new Response("No email found", { status: 400 });
        }

        const name = [first_name, last_name].filter(Boolean).join(" ") || null;

        await db.user.upsert({
            where: { id },
            create: {
                id,
                email,
                name,
                avatar: image_url,
            },
            update: {
                email,
                name,
                avatar: image_url,
            },
        });

        console.log(`User ${eventType === "user.created" ? "created" : "updated"}: ${id}`);
    }

    if (eventType === "user.deleted") {
        const { id } = evt.data;
        if (id) {
            await db.user.delete({ where: { id } }).catch(() => {
                // User might not exist
            });
            console.log(`User deleted: ${id}`);
        }
    }

    return new Response("Webhook processed", { status: 200 });
}
