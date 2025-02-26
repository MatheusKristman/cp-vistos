import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const currentUser = await auth();

      if (!currentUser || !currentUser.user || !currentUser.user.email) {
        throw new UploadThingError("Não autorizado");
      }

      const user = await prisma.user.findUnique({
        where: {
          email: currentUser.user.email,
        },
      });

      if (!user) {
        throw new UploadThingError("Usuário não encontrado");
      }

      if (user.role !== Role.ADMIN) {
        throw new UploadThingError("Não autorizado");
      }

      return {};
    })
    .onUploadComplete(async () => {
      return {};
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
