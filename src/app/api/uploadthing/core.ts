// import { auth } from "@/utils/auth";
// import { createUploadthing, type FileRouter } from "uploadthing/next";

// const f = createUploadthing();

// // FileRouter for your app, can contain multiple FileRoutes
// export const ourFileRouter = {
//   imageUploader: f({ image: { maxFileSize: "4MB" } })
//     .middleware(async ({ req }) => {
//       const session = await auth();
//       const user = session?.user;
//       if (!user) throw new Error("Unauthorized");
//       return { userId: user.id };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {
//       return { uploadedBy: metadata.userId };
//     }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;

import { auth } from "@/utils/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const session = await auth();
      const user = session?.user;

      if (!user) throw new Error("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
