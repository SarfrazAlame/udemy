import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handlerAuth = () => {
  const { userId } = auth()
  if (!userId) throw new Error("Unauthorized ")
  return { userId }

} // Fake auth function

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handlerAuth())
    .onUploadComplete(() => { }),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handlerAuth())
    .onUploadComplete(() => { }),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512B" } })
    .middleware(() => handlerAuth())
    .onUploadComplete(() => { })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;