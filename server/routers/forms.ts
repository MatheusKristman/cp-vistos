import { z } from "zod";

import { isUserAuthedProcedure, router } from "../trpc";
import prisma from "@/lib/prisma";
import { TRPCError } from "@trpc/server";

export const formsRouter = router({
  getForm: isUserAuthedProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
      }),
    )
    .query(async (opts) => {
      const { profileId } = opts.input;

      const form = await prisma.form.findFirst({
        where: {
          profileId,
        },
        include: {
          otherPeopleTraveling: true,
          familyLivingInTheUSA: true,
          americanLicense: true,
          USALastTravel: true,
          previousJobs: true,
          courses: true,
        },
      });

      if (!form) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Formulário não encontrado",
        });
      }

      return { form };
    }),
});
