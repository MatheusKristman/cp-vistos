import { z } from "zod";

import { adminProcedure, publicProcedure, router } from "../trpc";
import prisma from "@/lib/prisma";
import { UTApi } from "uploadthing/server";

export const websiteRouter = router({
  getBanners: publicProcedure.query(async (opts) => {
    const banners = await prisma.banner.findMany();

    return { banners };
  }),
  getSelectedBanner: adminProcedure
    .input(
      z.object({
        bannerId: z.string().min(1, "ID do banner não encontrado"),
      })
    )
    .query(async (opts) => {
      const { bannerId } = opts.input;

      const banner = await prisma.banner.findUnique({
        where: {
          id: bannerId,
        },
      });

      if (!banner) {
        return null;
      }

      return { banner };
    }),
  createBanner: adminProcedure
    .input(
      z.object({
        title: z.string().min(1, "Este campo é obrigatório"),
        desc: z.string().min(1, "Este campo é obrigatório"),
        btnText: z.string().min(1, "Este campo é obrigatório"),
        btnLink: z.string().min(1, "Este campo é obrigatório"),
        imageUrl: z.string().url("A URL da imagem é inválida"),
        imageKey: z.string().min(1, "A chave da imagem é obrigatória"),
      })
    )
    .mutation(async (opts) => {
      const { title, desc, btnText, btnLink, imageUrl, imageKey } = opts.input;

      await prisma.banner.create({
        data: {
          title,
          desc,
          btnText,
          btnLink,
          imageUrl,
          imageKey,
        },
      });

      return { message: "Banner adicionado com sucesso" };
    }),
  editBanner: adminProcedure
    .input(
      z.object({
        bannerId: z.string().min(1, "ID do banner não encontrado"),
        title: z.string().min(1, "Este campo é obrigatório"),
        desc: z.string().min(1, "Este campo é obrigatório"),
        btnText: z.string().min(1, "Este campo é obrigatório"),
        btnLink: z.string().min(1, "Este campo é obrigatório"),
        imageUrl: z.string().url("A URL da imagem é inválida").optional(),
        imageKey: z.string().min(1, "A chave da imagem é obrigatória").optional(),
      })
    )
    .mutation(async (opts) => {
      const { bannerId, title, desc, btnText, btnLink, imageUrl, imageKey } = opts.input;

      if (imageUrl !== undefined && imageKey !== undefined) {
        const banner = await prisma.banner.findUnique({
          where: {
            id: bannerId,
          },
        });

        if (!banner) {
          return { error: true, message: "Banner não encontrado" };
        }

        const utapi = new UTApi();

        utapi.deleteFiles(banner.imageKey).catch((error) => {
          console.log(error);

          return { error: true, message: "Ocorreu um erro ao deletar a imagem do banner" };
        });

        await prisma.banner.update({
          where: {
            id: banner.id,
          },
          data: {
            title,
            desc,
            btnText,
            btnLink,
            imageUrl,
            imageKey,
          },
        });

        return { message: "Banner editado com sucesso", error: false };
      }

      await prisma.banner.update({
        where: {
          id: bannerId,
        },
        data: {
          title,
          desc,
          btnText,
          btnLink,
        },
      });

      return { message: "Banner editado com sucesso", error: false };
    }),
  deleteBanner: adminProcedure
    .input(
      z.object({
        bannerId: z.string().min(1, "ID do banner não encontrado"),
      })
    )
    .mutation(async (opts) => {
      const { bannerId } = opts.input;

      const banner = await prisma.banner.findUnique({
        where: {
          id: bannerId,
        },
      });

      if (!banner) {
        return { error: true, message: "Banner não encontrado" };
      }

      const utapi = new UTApi();

      utapi.deleteFiles(banner.imageKey).catch((error) => {
        console.log(error);

        return { error: true, message: "Ocorreu um erro ao deletar a imagem do banner" };
      });

      await prisma.banner.delete({
        where: {
          id: bannerId,
        },
      });

      return { error: false, message: "Banner deletado com sucesso!" };
    }),
});
