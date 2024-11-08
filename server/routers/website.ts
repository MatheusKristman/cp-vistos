import { z } from "zod";

import { adminProcedure, publicProcedure, router } from "../trpc";
import prisma from "@/lib/prisma";

export const websiteRouter = router({
  getBanners: publicProcedure.query(async (opts) => {
    const banners = await prisma.banner.findMany();

    return { banners };
  }),
  createBanner: adminProcedure
    .input(
      z.object({
        title: z.string().min(1, "Este campo é obrigatório"),
        desc: z.string().min(1, "Este campo é obrigatório"),
        btnText: z.string().min(1, "Este campo é obrigatório"),
        btnLink: z.string().min(1, "Este campo é obrigatório"),
        imageUrl: z.string().url("A URL da imagem é inválida"),
      })
    )
    .mutation(async (opts) => {
      const { title, desc, btnText, btnLink, imageUrl } = opts.input;

      await prisma.banner.create({
        data: {
          title,
          desc,
          btnText,
          btnLink,
          imageUrl,
        },
      });

      return { message: "Banner adicionado com sucesso" };
    }),
});
