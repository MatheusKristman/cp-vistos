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
          profile: true,
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
  submitPersonalData: isUserAuthedProcedure
    .input(
      z
        .object({
          profileId: z.string().min(1),
          step: z.number(),
          firstName: z.string().min(1),
          lastName: z.string().min(1),
          cpf: z.string().min(1).min(14),
          otherNamesConfirmation: z.enum(["Sim", "Não"]),
          otherNames: z.array(z.string().min(1)).optional(),
          sex: z.string().min(1),
          maritalStatus: z.string().min(1),
          birthDate: z.date(),
          birthCity: z.string().min(1),
          birthState: z.string().min(1),
          birthCountry: z.string().min(1),
          originCountry: z.string().min(1),
          otherNationalityConfirmation: z.enum(["Sim", "Não"]),
          otherNationalityPassport: z.string().optional(),
          otherCountryResidentConfirmation: z.enum(["Sim", "Não"]),
          USSocialSecurityNumber: z.string(),
          USTaxpayerIDNumber: z.string(),
        })
        .superRefine(
          (
            {
              otherNationalityConfirmation,
              otherNationalityPassport,
              otherNamesConfirmation,
              otherNames,
            },
            ctx,
          ) => {
            if (
              otherNationalityConfirmation === "Sim" &&
              (otherNationalityPassport === undefined ||
                otherNationalityPassport?.length === 0)
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["otherNationalityPassport"],
              });
            }

            if (
              otherNamesConfirmation === "Sim" &&
              otherNames &&
              otherNames.length === 0
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["otherNames"],
              });
            }
          },
        ),
    )
    .mutation(async (opts) => {
      const {
        profileId,
        step,
        firstName,
        lastName,
        cpf,
        otherNamesConfirmation,
        otherNames,
        sex,
        maritalStatus,
        birthDate,
        birthCity,
        birthState,
        birthCountry,
        originCountry,
        otherNationalityConfirmation,
        otherNationalityPassport,
        otherCountryResidentConfirmation,
        USSocialSecurityNumber,
        USTaxpayerIDNumber,
      } = opts.input;

      const profileUpdated = await prisma.profile.update({
        where: {
          id: profileId,
        },
        data: {
          formStep: step,
        },
        include: {
          form: true,
        },
      });

      if (!profileUpdated) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Perfil não encontrado",
        });
      }

      if (!profileUpdated.form) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Formulário não encontrado",
        });
      }

      await prisma.form.update({
        where: {
          id: profileUpdated.form.id,
        },
        data: {
          firstName,
          lastName,
          cpf,
          otherNamesConfirmation: otherNamesConfirmation === "Sim",
          otherNames,
          sex,
          maritalStatus,
          birthDate,
          birthCity,
          birthState,
          birthCountry,
          originCountry,
          otherNationalityConfirmation: otherNationalityConfirmation === "Sim",
          otherNationalityPassport,
          otherCountryResidentConfirmation:
            otherCountryResidentConfirmation === "Sim",
          USSocialSecurityNumber,
          USTaxpayerIDNumber,
        },
      });

      return { message: "Informações salvas" };
    }),
});
