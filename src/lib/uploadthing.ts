import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

export const ourFileRouter = {
    // File uploader for posts - accepts PDFs and images
    postAttachment: f({
        pdf: { maxFileSize: "8MB", maxFileCount: 1 },
        image: { maxFileSize: "4MB", maxFileCount: 1 },
    })
        .middleware(async () => {
            const { userId } = await auth();
            if (!userId) throw new Error("Unauthorized");
            return { userId };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.userId);
            console.log("File URL:", file.ufsUrl);
            return { uploadedBy: metadata.userId, url: file.ufsUrl };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
