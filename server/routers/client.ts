import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { isUserAuthedProcedure, router } from "../trpc";
import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";
import { format, formatDate } from "date-fns";

export const clientRouter = router({
  getProfiles: isUserAuthedProcedure.query(async (opts) => {
    const { user } = opts.ctx.user;
    const email = user?.email;

    if (!email) {
      throw new TRPCError({
        code: "NOT_IMPLEMENTED",
        message: "Usuário não encontrado",
      });
    }

    const account = await prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        profiles: {
          where: {
            category: Category.american_visa,
          },
        },
      },
    });

    if (!account) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Conta não encontrada",
      });
    }

    return { profiles: account.profiles };
  }),
  getProfileBirthDate: isUserAuthedProcedure
    .input(
      z.object({
        profileId: z.string().min(1, "ID obrigatório"),
      })
    )
    .query(async (opts) => {
      const { profileId } = opts.input;

      const currentProfile = await prisma.profile.findUnique({
        where: {
          id: profileId,
        },
      });

      if (!currentProfile) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Perfil não encontrado",
        });
      }

      if (!currentProfile.birthDate) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Perfil não possui data de nascimento",
        });
      }

      const birthDate = format(currentProfile.birthDate, "dd/MM/yyyy");

      return birthDate;
    }),
});
