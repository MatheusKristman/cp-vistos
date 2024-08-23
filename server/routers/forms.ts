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
          profile: true,
        },
      });

      if (!form) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Erro ao procurar o formulário",
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
          message: "Erro ao procurar o formulário",
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
  savePersonalData: isUserAuthedProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
        redirectStep: z.number().optional(),
        firstName: z.string().nullable(),
        lastName: z.string().nullable(),
        cpf: z.string().nullable(),
        otherNamesConfirmation: z.enum(["Sim", "Não"]).nullable(),
        otherNames: z.array(z.string().min(1)).optional(),
        sex: z.string().min(1).nullable(),
        maritalStatus: z.string().min(1).nullable(),
        birthDate: z.date().nullable(),
        birthCity: z.string().nullable(),
        birthState: z.string().nullable(),
        birthCountry: z.string().nullable(),
        originCountry: z.string().nullable(),
        otherNationalityConfirmation: z.enum(["Sim", "Não"]).nullable(),
        otherNationalityPassport: z.string().optional().nullable(),
        otherCountryResidentConfirmation: z.enum(["Sim", "Não"]).nullable(),
        USSocialSecurityNumber: z.string().nullable(),
        USTaxpayerIDNumber: z.string().nullable(),
      }),
    )
    .mutation(async (opts) => {
      const {
        profileId,
        redirectStep,
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

      const profile = await prisma.profile.findUnique({
        where: {
          id: profileId,
        },
        include: {
          form: true,
        },
      });

      if (!profile) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Perfil não encontrado",
        });
      }

      if (!profile.form) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Erro ao procurar o formulário",
        });
      }

      await prisma.form.update({
        where: {
          id: profile.form.id,
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

      return { message: "Informações salvas", redirectStep };
    }),
  submitContactAndAddress: isUserAuthedProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
        step: z.number(),
        address: z.string().min(1),
        city: z.string().min(1),
        state: z.string().min(1),
        cep: z.string().min(1).min(9),
        country: z.string().min(1),
        postalAddressConfirmation: z.enum(["Sim", "Não"]),
        otherPostalAddress: z.string(),
        cel: z.string().min(1).min(14),
        tel: z.string().min(1).min(13),
        fiveYearsOtherTelConfirmation: z.enum(["Sim", "Não"]),
        otherTel: z.string(),
        email: z.string().min(1).email(),
        fiveYearsOtherEmailConfirmation: z.enum(["Sim", "Não"]),
        otherEmail: z.union([z.literal(""), z.string().email()]),
        facebook: z.string(),
        linkedin: z.string(),
        instagram: z.string(),
        othersSocialMedia: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const {
        profileId,
        step,
        address,
        city,
        state,
        cep,
        country,
        postalAddressConfirmation,
        otherPostalAddress,
        cel,
        tel,
        fiveYearsOtherTelConfirmation,
        otherTel,
        email,
        fiveYearsOtherEmailConfirmation,
        otherEmail,
        facebook,
        linkedin,
        instagram,
        othersSocialMedia,
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
          code: "NOT_FOUND",
          message: "Erro ao procurar o formulário",
        });
      }

      await prisma.form.update({
        where: {
          id: profileUpdated.form.id,
        },
        data: {
          address,
          city,
          state,
          cep,
          country,
          postalAddressConfirmation: postalAddressConfirmation === "Sim",
          otherPostalAddress,
          cel,
          tel,
          fiveYearsOtherTelConfirmation:
            fiveYearsOtherTelConfirmation === "Sim",
          otherTel,
          email,
          fiveYearsOtherEmailConfirmation:
            fiveYearsOtherEmailConfirmation === "Sim",
          otherEmail,
          facebook,
          linkedin,
          instagram,
          othersSocialMedia,
        },
      });

      return { message: "Informações salvas" };
    }),
  saveContactAndAddress: isUserAuthedProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
        redirectStep: z.number().optional(),
        address: z.string().nullable(),
        city: z.string().nullable(),
        state: z.string().nullable(),
        cep: z.string().nullable(),
        country: z.string().nullable(),
        postalAddressConfirmation: z.enum(["Sim", "Não"]).nullable(),
        otherPostalAddress: z.string().nullable(),
        cel: z.string().nullable(),
        tel: z.string().nullable(),
        fiveYearsOtherTelConfirmation: z.enum(["Sim", "Não"]).nullable(),
        otherTel: z.string().nullable(),
        email: z.string().nullable(),
        fiveYearsOtherEmailConfirmation: z.enum(["Sim", "Não"]).nullable(),
        otherEmail: z.string().nullable(),
        facebook: z.string().nullable(),
        linkedin: z.string().nullable(),
        instagram: z.string().nullable(),
        othersSocialMedia: z.string().nullable(),
      }),
    )
    .mutation(async (opts) => {
      const {
        profileId,
        redirectStep,
        address,
        city,
        state,
        cep,
        country,
        postalAddressConfirmation,
        otherPostalAddress,
        cel,
        tel,
        fiveYearsOtherTelConfirmation,
        otherTel,
        email,
        fiveYearsOtherEmailConfirmation,
        otherEmail,
        facebook,
        linkedin,
        instagram,
        othersSocialMedia,
      } = opts.input;

      const profile = await prisma.profile.findUnique({
        where: {
          id: profileId,
        },
        include: {
          form: true,
        },
      });

      if (!profile) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Perfil não encontrado",
        });
      }

      if (!profile.form) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Erro ao procurar o formulário",
        });
      }

      await prisma.form.update({
        where: {
          id: profile.form.id,
        },
        data: {
          address,
          city,
          state,
          cep,
          country,
          postalAddressConfirmation: postalAddressConfirmation === "Sim",
          otherPostalAddress,
          cel,
          tel,
          fiveYearsOtherTelConfirmation:
            fiveYearsOtherTelConfirmation === "Sim",
          otherTel,
          email,
          fiveYearsOtherEmailConfirmation:
            fiveYearsOtherEmailConfirmation === "Sim",
          otherEmail,
          facebook,
          linkedin,
          instagram,
          othersSocialMedia,
        },
      });

      return { message: "Informações salvas", redirectStep };
    }),
  submitPassport: isUserAuthedProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
        step: z.number(),
        passportNumber: z.string().min(1, { message: "Campo obrigatório" }),
        passportCity: z.string().min(1, { message: "Campo obrigatório" }),
        passportState: z.string().min(1, { message: "Campo obrigatório" }),
        passportIssuingCountry: z
          .string()
          .min(1, { message: "Campo obrigatório" }),
        passportIssuingDate: z.date({ message: "Selecione uma data" }),
        passportExpireDate: z
          .date({ message: "Selecione uma data" })
          .optional(),
        passportLostConfirmation: z.enum(["Sim", "Não"]),
        lostPassportNumber: z.string(),
        lostPassportCountry: z.string(),
        lostPassportDetails: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const {
        profileId,
        step,
        passportNumber,
        passportCity,
        passportState,
        passportIssuingCountry,
        passportIssuingDate,
        passportExpireDate,
        passportLostConfirmation,
        lostPassportNumber,
        lostPassportCountry,
        lostPassportDetails,
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
          code: "NOT_FOUND",
          message: "Erro ao procurar o formulário",
        });
      }

      await prisma.form.update({
        where: {
          id: profileUpdated.form.id,
        },
        data: {
          passportNumber,
          passportCity,
          passportState,
          passportIssuingCountry,
          passportIssuingDate,
          passportExpireDate,
          passportLostConfirmation: passportLostConfirmation === "Sim",
          lostPassportNumber,
          lostPassportCountry,
          lostPassportDetails,
        },
      });

      return { message: "Informações salvas" };
    }),
  savePassport: isUserAuthedProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
        redirectStep: z.number().optional(),
        passportNumber: z.string().nullable(),
        passportCity: z.string().nullable(),
        passportState: z.string().nullable(),
        passportIssuingCountry: z.string().nullable(),
        passportIssuingDate: z.date().optional().nullable(),
        passportExpireDate: z.date().optional().nullable(),
        passportLostConfirmation: z.enum(["Sim", "Não"]).nullable(),
        lostPassportNumber: z.string().nullable(),
        lostPassportCountry: z.string().nullable(),
        lostPassportDetails: z.string().nullable(),
      }),
    )
    .mutation(async (opts) => {
      const {
        profileId,
        redirectStep,
        passportNumber,
        passportCity,
        passportState,
        passportIssuingCountry,
        passportIssuingDate,
        passportExpireDate,
        passportLostConfirmation,
        lostPassportNumber,
        lostPassportCountry,
        lostPassportDetails,
      } = opts.input;

      const profile = await prisma.profile.findUnique({
        where: {
          id: profileId,
        },
        include: {
          form: true,
        },
      });

      if (!profile) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Perfil não encontrado",
        });
      }

      if (!profile.form) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Erro ao procurar o formulário",
        });
      }

      await prisma.form.update({
        where: {
          id: profile.form.id,
        },
        data: {
          passportNumber,
          passportCity,
          passportState,
          passportIssuingCountry,
          passportIssuingDate,
          passportExpireDate,
          passportLostConfirmation: passportLostConfirmation === "Sim",
          lostPassportNumber,
          lostPassportCountry,
          lostPassportDetails,
        },
      });

      return { message: "Informações salvas", redirectStep };
    }),
  submitAboutTravel: isUserAuthedProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
        step: z.number(),
        travelItineraryConfirmation: z.enum(["Sim", "Não"]),
        USAPreviewArriveDate: z
          .date({ message: "Campo obrigatório" })
          .optional(),
        arriveFlyNumber: z.string(),
        arriveCity: z.string(),
        USAPreviewReturnDate: z
          .date({ message: "Campo obrigatório" })
          .optional(),
        returnFlyNumber: z.string(),
        returnCity: z.string(),
        estimatedTimeOnUSA: z.string().min(1, { message: "Campo obrigatório" }),
        visitLocations: z
          .array(z.string().min(1, { message: "Valor não pode ser vazio" }))
          .optional(),
        USACompleteAddress: z.string(),
        USAZipCode: z.string(),
        USACity: z.string(),
        USAState: z.string(),
        payerNameOrCompany: z.string().min(1, { message: "Campo obrigatório" }),
        payerTel: z.string().min(1, { message: "Campo obrigatório" }),
        payerAddress: z.string().min(1, { message: "Campo obrigatório" }),
        payerRelation: z.string().min(1, { message: "Campo obrigatório" }),
        payerEmail: z
          .string()
          .email({ message: "E-mail inválido" })
          .min(1, { message: "Campo obrigatório" }),
      }),
    )
    .mutation(async (opts) => {
      const {
        profileId,
        step,
        travelItineraryConfirmation,
        USAPreviewArriveDate,
        arriveFlyNumber,
        arriveCity,
        USAPreviewReturnDate,
        returnFlyNumber,
        returnCity,
        estimatedTimeOnUSA,
        visitLocations,
        USACompleteAddress,
        USAZipCode,
        USACity,
        USAState,
        payerNameOrCompany,
        payerTel,
        payerAddress,
        payerRelation,
        payerEmail,
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
          code: "NOT_FOUND",
          message: "Erro ao procurar o formulário",
        });
      }

      await prisma.form.update({
        where: {
          id: profileUpdated.form.id,
        },
        data: {
          travelItineraryConfirmation: travelItineraryConfirmation === "Sim",
          USAPreviewArriveDate,
          arriveFlyNumber,
          arriveCity,
          USAPreviewReturnDate,
          returnFlyNumber,
          returnCity,
          estimatedTimeOnUSA,
          visitLocations,
          USACompleteAddress,
          USAZipCode,
          USACity,
          USAState,
          payerNameOrCompany,
          payerTel,
          payerAddress,
          payerRelation,
          payerEmail,
        },
      });

      return { message: "Informações salvas" };
    }),
  saveAboutTravel: isUserAuthedProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
        redirectStep: z.number().optional(),
        travelItineraryConfirmation: z.enum(["Sim", "Não"]).nullable(),
        USAPreviewArriveDate: z.date().optional().nullable(),
        arriveFlyNumber: z.string().nullable(),
        arriveCity: z.string().nullable(),
        USAPreviewReturnDate: z.date().optional().nullable(),
        returnFlyNumber: z.string().nullable(),
        returnCity: z.string().nullable(),
        estimatedTimeOnUSA: z.string().nullable(),
        visitLocations: z.array(z.string().min(1)).optional(),
        USACompleteAddress: z.string().nullable(),
        USAZipCode: z.string().nullable(),
        USACity: z.string().nullable(),
        USAState: z.string().nullable(),
        payerNameOrCompany: z.string().nullable(),
        payerTel: z.string().nullable(),
        payerAddress: z.string().nullable(),
        payerRelation: z.string().nullable(),
        payerEmail: z.string().nullable(),
      }),
    )
    .mutation(async (opts) => {
      const {
        profileId,
        redirectStep,
        travelItineraryConfirmation,
        USAPreviewArriveDate,
        arriveFlyNumber,
        arriveCity,
        USAPreviewReturnDate,
        returnFlyNumber,
        returnCity,
        estimatedTimeOnUSA,
        visitLocations,
        USACompleteAddress,
        USAZipCode,
        USACity,
        USAState,
        payerNameOrCompany,
        payerTel,
        payerAddress,
        payerRelation,
        payerEmail,
      } = opts.input;

      const profile = await prisma.profile.findUnique({
        where: {
          id: profileId,
        },
        include: {
          form: true,
        },
      });

      if (!profile) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Perfil não encontrado",
        });
      }

      if (!profile.form) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Erro ao procurar o formulário",
        });
      }

      await prisma.form.update({
        where: {
          id: profile.form.id,
        },
        data: {
          travelItineraryConfirmation: travelItineraryConfirmation === "Sim",
          USAPreviewArriveDate,
          arriveFlyNumber,
          arriveCity,
          USAPreviewReturnDate,
          returnFlyNumber,
          returnCity,
          estimatedTimeOnUSA,
          visitLocations,
          USACompleteAddress,
          USAZipCode,
          USACity,
          USAState,
          payerNameOrCompany,
          payerTel,
          payerAddress,
          payerRelation,
          payerEmail,
        },
      });

      return { message: "Informações salvas", redirectStep };
    }),
  submitTravelCompany: isUserAuthedProcedure
    .input(
      z
        .object({
          profileId: z.string().min(1),
          step: z.number(),
          otherPeopleTravelingConfirmation: z.enum(["Sim", "Não"]),
          otherPeopleTraveling: z.array(
            z.object({
              name: z.string(),
              relation: z.string(),
            }),
          ),
          groupMemberConfirmation: z.enum(["Sim", "Não"]),
          groupName: z.string(),
        })
        .superRefine(
          (
            {
              otherPeopleTravelingConfirmation,
              otherPeopleTraveling,
              groupMemberConfirmation,
              groupName,
            },
            ctx,
          ) => {
            if (groupMemberConfirmation === "Sim" && groupName.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["groupName"],
              });
            }

            if (
              otherPeopleTravelingConfirmation === "Sim" &&
              otherPeopleTraveling.length === 1 &&
              otherPeopleTraveling.filter((item) => item.name === "").length ===
                1
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: [
                  `otherPeopleTraveling.${otherPeopleTraveling.length - 1}.name`,
                ],
              });
            }

            if (
              otherPeopleTravelingConfirmation === "Sim" &&
              otherPeopleTraveling.length === 1 &&
              otherPeopleTraveling.filter((item) => item.relation === "")
                .length === 1
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: [
                  `otherPeopleTraveling.${otherPeopleTraveling.length - 1}.relation`,
                ],
              });
            }
          },
        ),
    )
    .mutation(async (opts) => {
      const {
        profileId,
        step,
        otherPeopleTravelingConfirmation,
        otherPeopleTraveling,
        groupMemberConfirmation,
        groupName,
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
          code: "NOT_FOUND",
          message: "Erro ao procurar o formulário",
        });
      }

      await prisma.form.update({
        where: {
          id: profileUpdated.form.id,
        },
        data: {
          otherPeopleTravelingConfirmation:
            otherPeopleTravelingConfirmation === "Sim",
          otherPeopleTraveling,
          groupMemberConfirmation: groupMemberConfirmation === "Sim",
          groupName,
        },
      });

      return { message: "Informações salvas" };
    }),
  saveTravelCompany: isUserAuthedProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
        redirectStep: z.number().optional(),
        otherPeopleTravelingConfirmation: z.enum(["Sim", "Não"]).nullable(),
        otherPeopleTraveling: z.array(
          z.object({
            name: z.string(),
            relation: z.string(),
          }),
        ),
        groupMemberConfirmation: z.enum(["Sim", "Não"]).nullable(),
        groupName: z.string().nullable(),
      }),
    )
    .mutation(async (opts) => {
      const {
        profileId,
        redirectStep,
        otherPeopleTravelingConfirmation,
        otherPeopleTraveling,
        groupMemberConfirmation,
        groupName,
      } = opts.input;

      const profile = await prisma.profile.findUnique({
        where: {
          id: profileId,
        },
        include: {
          form: true,
        },
      });

      if (!profile) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Perfil não encontrado",
        });
      }

      if (!profile.form) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Erro ao procurar o formulário",
        });
      }

      await prisma.form.update({
        where: {
          id: profile.form.id,
        },
        data: {
          otherPeopleTravelingConfirmation:
            otherPeopleTravelingConfirmation === "Sim",
          otherPeopleTraveling,
          groupMemberConfirmation: groupMemberConfirmation === "Sim",
          groupName,
        },
      });

      return { message: "Informações salvas", redirectStep };
    }),
  submitPreviousTravel: isUserAuthedProcedure
    .input(
      z
        .object({
          profileId: z.string().min(1),
          step: z.number(),
          hasBeenOnUSAConfirmation: z.enum(["Sim", "Não"]),
          USALastTravel: z.array(
            z.object({
              arriveDate: z.date(),
              estimatedTime: z.string(),
            }),
          ),
          americanLicenseToDriveConfirmation: z.enum(["Sim", "Não"]),
          americanLicense: z.array(
            z.object({
              licenseNumber: z.string(),
              state: z.string(),
            }),
          ),
          USAVisaConfirmation: z.enum(["Sim", "Não"]),
          visaIssuingDate: z.date().optional(),
          visaNumber: z.string(),
          newVisaConfirmation: z.enum(["Sim", "Não"]),
          sameCountryResidenceConfirmation: z.enum(["Sim", "Não"]),
          sameVisaTypeConfirmation: z.enum(["Sim", "Não"]),
          fingerprintsProvidedConfirmation: z.enum(["Sim", "Não"]),
          lostVisaConfirmation: z.enum(["Sim", "Não"]),
          lostVisaDetails: z.string(),
          canceledVisaConfirmation: z.enum(["Sim", "Não"]),
          canceledVisaDetails: z.string(),
          deniedVisaConfirmation: z.enum(["Sim", "Não"]),
          deniedVisaDetails: z.string(),
          consularPost: z.string(),
          deniedVisaType: z.string(),
          immigrationRequestByAnotherPersonConfirmation: z.enum(["Sim", "Não"]),
          immigrationRequestByAnotherPersonDetails: z.string(),
        })
        .superRefine(
          (
            {
              hasBeenOnUSAConfirmation,
              USALastTravel,
              americanLicenseToDriveConfirmation,
              americanLicense,
              USAVisaConfirmation,
              visaIssuingDate,
              visaNumber,
              lostVisaConfirmation,
              lostVisaDetails,
              canceledVisaConfirmation,
              canceledVisaDetails,
              deniedVisaConfirmation,
              deniedVisaDetails,
              immigrationRequestByAnotherPersonConfirmation,
              immigrationRequestByAnotherPersonDetails,
            },
            ctx,
          ) => {
            if (
              hasBeenOnUSAConfirmation === "Sim" &&
              USALastTravel.length === 1 &&
              USALastTravel.filter((item) => item.arriveDate === undefined)
                .length === 1
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: [`USALastTravel.${USALastTravel.length - 1}.arriveDate`],
              });
            }

            if (
              hasBeenOnUSAConfirmation === "Sim" &&
              USALastTravel.length === 1 &&
              USALastTravel.filter((item) => item.estimatedTime === "")
                .length === 1
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: [
                  `USALastTravel.${USALastTravel.length - 1}.estimatedTime`,
                ],
              });
            }

            if (
              americanLicenseToDriveConfirmation === "Sim" &&
              americanLicense.length === 1 &&
              americanLicense.filter((item) => item.licenseNumber === "")
                .length === 1
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: [
                  `americanLicense.${americanLicense.length - 1}.licenseNumber`,
                ],
              });
            }

            if (
              americanLicenseToDriveConfirmation === "Sim" &&
              americanLicense.length === 1 &&
              americanLicense.filter((item) => item.state === "").length === 1
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: [`americanLicense.${americanLicense.length - 1}.state`],
              });
            }

            if (
              USAVisaConfirmation === "Sim" &&
              visaIssuingDate === undefined
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["visaIssuingDate"],
              });
            }

            if (USAVisaConfirmation === "Sim" && visaNumber.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["visaNumber"],
              });
            }

            if (
              lostVisaConfirmation === "Sim" &&
              lostVisaDetails.length === 0
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["lostVisaDetails"],
              });
            }

            if (
              canceledVisaConfirmation === "Sim" &&
              canceledVisaDetails.length === 0
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["canceledVisaDetails"],
              });
            }

            if (
              deniedVisaConfirmation === "Sim" &&
              deniedVisaDetails.length === 0
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["deniedVisaDetails"],
              });
            }

            if (
              immigrationRequestByAnotherPersonConfirmation === "Sim" &&
              immigrationRequestByAnotherPersonDetails.length === 0
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["immigrationRequestByAnotherPersonDetails"],
              });
            }
          },
        ),
    )
    .mutation(async (opts) => {
      const {
        profileId,
        step,
        hasBeenOnUSAConfirmation,
        USALastTravel,
        americanLicenseToDriveConfirmation,
        americanLicense,
        USAVisaConfirmation,
        visaIssuingDate,
        visaNumber,
        newVisaConfirmation,
        sameCountryResidenceConfirmation,
        sameVisaTypeConfirmation,
        fingerprintsProvidedConfirmation,
        lostVisaConfirmation,
        lostVisaDetails,
        canceledVisaConfirmation,
        canceledVisaDetails,
        deniedVisaConfirmation,
        deniedVisaDetails,
        consularPost,
        deniedVisaType,
        immigrationRequestByAnotherPersonConfirmation,
        immigrationRequestByAnotherPersonDetails,
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
          code: "NOT_FOUND",
          message: "Erro ao procurar o formulário",
        });
      }

      await prisma.form.update({
        where: {
          id: profileUpdated.form.id,
        },
        data: {
          hasBeenOnUSAConfirmation: hasBeenOnUSAConfirmation === "Sim",
          USALastTravel,
          americanLicenseToDriveConfirmation:
            americanLicenseToDriveConfirmation === "Sim",
          americanLicense,
          USAVisaConfirmation: USAVisaConfirmation === "Sim",
          visaIssuingDate,
          visaNumber,
          newVisaConfirmation: newVisaConfirmation === "Sim",
          sameCountryResidenceConfirmation:
            sameCountryResidenceConfirmation === "Sim",
          sameVisaTypeConfirmation: sameVisaTypeConfirmation === "Sim",
          fingerprintsProvidedConfirmation:
            fingerprintsProvidedConfirmation === "Sim",
          lostVisaConfirmation: lostVisaConfirmation === "Sim",
          lostVisaDetails,
          canceledVisaConfirmation: canceledVisaConfirmation === "Sim",
          canceledVisaDetails,
          deniedVisaConfirmation: deniedVisaConfirmation === "Sim",
          deniedVisaDetails,
          consularPost,
          deniedVisaType,
          immigrationRequestByAnotherPersonConfirmation:
            immigrationRequestByAnotherPersonConfirmation === "Sim",
          immigrationRequestByAnotherPersonDetails,
        },
      });

      return { message: "Informações salvas" };
    }),
  savePreviousTravel: isUserAuthedProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
        redirectStep: z.number().optional(),
        hasBeenOnUSAConfirmation: z.enum(["Sim", "Não"]),
        USALastTravel: z.array(
          z.object({
            arriveDate: z.coerce.date(),
            estimatedTime: z.string(),
          }),
        ),
        americanLicenseToDriveConfirmation: z.enum(["Sim", "Não"]),
        americanLicense: z.array(
          z.object({
            licenseNumber: z.string(),
            state: z.string(),
          }),
        ),
        USAVisaConfirmation: z.enum(["Sim", "Não"]),
        visaIssuingDate: z.date().optional(),
        visaNumber: z.string(),
        newVisaConfirmation: z.enum(["Sim", "Não"]),
        sameCountryResidenceConfirmation: z.enum(["Sim", "Não"]),
        sameVisaTypeConfirmation: z.enum(["Sim", "Não"]),
        fingerprintsProvidedConfirmation: z.enum(["Sim", "Não"]),
        lostVisaConfirmation: z.enum(["Sim", "Não"]),
        lostVisaDetails: z.string(),
        canceledVisaConfirmation: z.enum(["Sim", "Não"]),
        canceledVisaDetails: z.string(),
        deniedVisaConfirmation: z.enum(["Sim", "Não"]),
        deniedVisaDetails: z.string(),
        consularPost: z.string(),
        deniedVisaType: z.string(),
        immigrationRequestByAnotherPersonConfirmation: z.enum(["Sim", "Não"]),
        immigrationRequestByAnotherPersonDetails: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const {
        profileId,
        redirectStep,
        hasBeenOnUSAConfirmation,
        USALastTravel,
        americanLicenseToDriveConfirmation,
        americanLicense,
        USAVisaConfirmation,
        visaIssuingDate,
        visaNumber,
        newVisaConfirmation,
        sameCountryResidenceConfirmation,
        sameVisaTypeConfirmation,
        fingerprintsProvidedConfirmation,
        lostVisaConfirmation,
        lostVisaDetails,
        canceledVisaConfirmation,
        canceledVisaDetails,
        deniedVisaConfirmation,
        deniedVisaDetails,
        consularPost,
        deniedVisaType,
        immigrationRequestByAnotherPersonConfirmation,
        immigrationRequestByAnotherPersonDetails,
      } = opts.input;

      const profile = await prisma.profile.findUnique({
        where: {
          id: profileId,
        },
        include: {
          form: true,
        },
      });

      if (!profile) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Perfil não encontrado",
        });
      }

      if (!profile.form) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Erro ao procurar o formulário",
        });
      }

      await prisma.form.update({
        where: {
          id: profile.form.id,
        },
        data: {
          hasBeenOnUSAConfirmation: hasBeenOnUSAConfirmation === "Sim",
          USALastTravel,
          americanLicenseToDriveConfirmation:
            americanLicenseToDriveConfirmation === "Sim",
          americanLicense,
          USAVisaConfirmation: USAVisaConfirmation === "Sim",
          visaIssuingDate,
          visaNumber,
          newVisaConfirmation: newVisaConfirmation === "Sim",
          sameCountryResidenceConfirmation:
            sameCountryResidenceConfirmation === "Sim",
          sameVisaTypeConfirmation: sameVisaTypeConfirmation === "Sim",
          fingerprintsProvidedConfirmation:
            fingerprintsProvidedConfirmation === "Sim",
          lostVisaConfirmation: lostVisaConfirmation === "Sim",
          lostVisaDetails,
          canceledVisaConfirmation: canceledVisaConfirmation === "Sim",
          canceledVisaDetails,
          deniedVisaConfirmation: deniedVisaConfirmation === "Sim",
          deniedVisaDetails,
          consularPost,
          deniedVisaType,
          immigrationRequestByAnotherPersonConfirmation:
            immigrationRequestByAnotherPersonConfirmation === "Sim",
          immigrationRequestByAnotherPersonDetails,
        },
      });

      return { message: "Informações salvas", redirectStep };
    }),
  submitUsaContact: isUserAuthedProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
        step: z.number(),
        organizationOrUSAResidentName: z.string(),
        organizationOrUSAResidentRelation: z.string(),
        organizationOrUSAResidentAddress: z.string(),
        organizationOrUSAResidentZipCode: z.string(),
        organizationOrUSAResidentCity: z.string(),
        organizationOrUSAResidentState: z.string(),
        organizationOrUSAResidentCountry: z.string(),
        organizationOrUSAResidentTel: z.string(),
        organizationOrUSAResidentEmail: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const {
        profileId,
        step,
        organizationOrUSAResidentName,
        organizationOrUSAResidentRelation,
        organizationOrUSAResidentAddress,
        organizationOrUSAResidentZipCode,
        organizationOrUSAResidentCity,
        organizationOrUSAResidentState,
        organizationOrUSAResidentCountry,
        organizationOrUSAResidentTel,
        organizationOrUSAResidentEmail,
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
          code: "NOT_FOUND",
          message: "Erro ao procurar o formulário",
        });
      }

      await prisma.form.update({
        where: {
          id: profileUpdated.form.id,
        },
        data: {
          organizationOrUSAResidentName,
          organizationOrUSAResidentRelation,
          organizationOrUSAResidentAddress,
          organizationOrUSAResidentZipCode,
          organizationOrUSAResidentCity,
          organizationOrUSAResidentState,
          organizationOrUSAResidentCountry,
          organizationOrUSAResidentTel,
          organizationOrUSAResidentEmail,
        },
      });

      return { message: "Informações salvas" };
    }),
  saveUsaContact: isUserAuthedProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
        redirectStep: z.number().optional(),
        organizationOrUSAResidentName: z.string(),
        organizationOrUSAResidentRelation: z.string(),
        organizationOrUSAResidentAddress: z.string(),
        organizationOrUSAResidentZipCode: z.string(),
        organizationOrUSAResidentCity: z.string(),
        organizationOrUSAResidentState: z.string(),
        organizationOrUSAResidentCountry: z.string(),
        organizationOrUSAResidentTel: z.string(),
        organizationOrUSAResidentEmail: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const {
        profileId,
        redirectStep,
        organizationOrUSAResidentName,
        organizationOrUSAResidentRelation,
        organizationOrUSAResidentAddress,
        organizationOrUSAResidentZipCode,
        organizationOrUSAResidentCity,
        organizationOrUSAResidentState,
        organizationOrUSAResidentCountry,
        organizationOrUSAResidentTel,
        organizationOrUSAResidentEmail,
      } = opts.input;

      const profile = await prisma.profile.findUnique({
        where: {
          id: profileId,
        },
        include: {
          form: true,
        },
      });

      if (!profile) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Perfil não encontrado",
        });
      }

      if (!profile.form) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Erro ao procurar o formulário",
        });
      }

      await prisma.form.update({
        where: {
          id: profile.form.id,
        },
        data: {
          organizationOrUSAResidentName,
          organizationOrUSAResidentRelation,
          organizationOrUSAResidentAddress,
          organizationOrUSAResidentZipCode,
          organizationOrUSAResidentCity,
          organizationOrUSAResidentState,
          organizationOrUSAResidentCountry,
          organizationOrUSAResidentTel,
          organizationOrUSAResidentEmail,
        },
      });

      return { message: "Informações salvas", redirectStep };
    }),
  submitFamily: isUserAuthedProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
        step: z.number(),
        fatherCompleteName: z.string().min(1),
        fatherBirthdate: z.date(),
        fatherLiveInTheUSAConfirmation: z.enum(["Sim", "Não"]),
        fatherUSASituation: z.string(),
        motherCompleteName: z.string().min(1),
        motherBirthdate: z.date(),
        motherLiveInTheUSAConfirmation: z.enum(["Sim", "Não"]),
        motherUSASituation: z.string(),
        familyLivingInTheUSAConfirmation: z.enum(["Sim", "Não"]),
        familyLivingInTheUSA: z.array(
          z.object({
            name: z.string(),
            relation: z.string(),
            situation: z.string(),
          }),
        ),
        partnerCompleteName: z.string(),
        partnerBirthdate: z.date().optional(),
        partnerNationality: z.string(),
        partnerCity: z.string(),
        partnerState: z.string(),
        partnerCountry: z.string(),
        unionDate: z.date().optional(),
        divorceDate: z.date().optional(),
      }),
    )
    .mutation(async (opts) => {
      const {
        profileId,
        step,
        fatherCompleteName,
        fatherBirthdate,
        fatherLiveInTheUSAConfirmation,
        fatherUSASituation,
        motherCompleteName,
        motherBirthdate,
        motherLiveInTheUSAConfirmation,
        motherUSASituation,
        familyLivingInTheUSAConfirmation,
        familyLivingInTheUSA,
        partnerCompleteName,
        partnerBirthdate,
        partnerNationality,
        partnerCity,
        partnerState,
        partnerCountry,
        unionDate,
        divorceDate,
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
          code: "NOT_FOUND",
          message: "Erro ao procurar o formulário",
        });
      }

      await prisma.form.update({
        where: {
          id: profileUpdated.form.id,
        },
        data: {
          fatherCompleteName,
          fatherBirthdate,
          fatherLiveInTheUSAConfirmation:
            fatherLiveInTheUSAConfirmation === "Sim",
          fatherUSASituation,
          motherCompleteName,
          motherBirthdate,
          motherLiveInTheUSAConfirmation:
            motherLiveInTheUSAConfirmation === "Sim",
          motherUSASituation,
          familyLivingInTheUSAConfirmation:
            familyLivingInTheUSAConfirmation === "Sim",
          familyLivingInTheUSA,
          partnerCompleteName,
          partnerBirthdate,
          partnerNationality,
          partnerCity,
          partnerState,
          partnerCountry,
          unionDate,
          divorceDate,
        },
      });

      return { message: "Informações salvas" };
    }),
  saveFamily: isUserAuthedProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
        redirectStep: z.number().optional(),
        fatherCompleteName: z.string(),
        fatherBirthdate: z.coerce.date(),
        fatherLiveInTheUSAConfirmation: z.enum(["Sim", "Não"]),
        fatherUSASituation: z.string(),
        motherCompleteName: z.string(),
        motherBirthdate: z.coerce.date(),
        motherLiveInTheUSAConfirmation: z.enum(["Sim", "Não"]),
        motherUSASituation: z.string(),
        familyLivingInTheUSAConfirmation: z.enum(["Sim", "Não"]),
        familyLivingInTheUSA: z.array(
          z.object({
            name: z.string(),
            relation: z.string(),
            situation: z.string(),
          }),
        ),
        partnerCompleteName: z.string(),
        partnerBirthdate: z.coerce.date().optional().nullable(),
        partnerNationality: z.string(),
        partnerCity: z.string(),
        partnerState: z.string(),
        partnerCountry: z.string(),
        unionDate: z.coerce.date().optional().nullable(),
        divorceDate: z.coerce.date().optional().nullable(),
      }),
    )
    .mutation(async (opts) => {
      const {
        profileId,
        redirectStep,
        fatherCompleteName,
        fatherBirthdate,
        fatherLiveInTheUSAConfirmation,
        fatherUSASituation,
        motherCompleteName,
        motherBirthdate,
        motherLiveInTheUSAConfirmation,
        motherUSASituation,
        familyLivingInTheUSAConfirmation,
        familyLivingInTheUSA,
        partnerCompleteName,
        partnerBirthdate,
        partnerNationality,
        partnerCity,
        partnerState,
        partnerCountry,
        unionDate,
        divorceDate,
      } = opts.input;

      const profile = await prisma.profile.findUnique({
        where: {
          id: profileId,
        },
        include: {
          form: true,
        },
      });

      if (!profile) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Perfil não encontrado",
        });
      }

      if (!profile.form) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Erro ao procurar o formulário",
        });
      }

      await prisma.form.update({
        where: {
          id: profile.form.id,
        },
        data: {
          fatherCompleteName,
          fatherBirthdate,
          fatherLiveInTheUSAConfirmation:
            fatherLiveInTheUSAConfirmation === "Sim",
          fatherUSASituation,
          motherCompleteName,
          motherBirthdate,
          motherLiveInTheUSAConfirmation:
            motherLiveInTheUSAConfirmation === "Sim",
          motherUSASituation,
          familyLivingInTheUSAConfirmation:
            familyLivingInTheUSAConfirmation === "Sim",
          familyLivingInTheUSA,
          partnerCompleteName,
          partnerBirthdate,
          partnerNationality,
          partnerCity,
          partnerState,
          partnerCountry,
          unionDate,
          divorceDate,
        },
      });

      return { message: "Informações salvas", redirectStep };
    }),
  submitWorkEducation: isUserAuthedProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
        step: z.number(),
        occupation: z.string(),
        office: z.string(),
        companyOrBossName: z.string(),
        companyAddress: z.string(),
        companyCity: z.string(),
        companyState: z.string(),
        companyCountry: z.string(),
        companyCep: z.string(),
        companyTel: z.string(),
        admissionDate: z.coerce.date().optional(),
        monthlySalary: z.string(),
        retireeDate: z.coerce.date().optional(),
        jobDetails: z.string(),
        previousJobConfirmation: z.enum(["Sim", "Não"]),
        previousJobs: z.array(
          z.object({
            companyName: z.string(),
            companyAddress: z.string(),
            companyCity: z.string(),
            companyState: z.string(),
            companyCountry: z.string(),
            companyCep: z.string(),
            companyTel: z.string(),
            office: z.string(),
            supervisorName: z.string(),
            admissionDate: z.coerce.date(),
            resignationDate: z.coerce.date(),
            jobDescription: z.string(),
          }),
        ),
        courses: z.array(
          z.object({
            institutionName: z.string(),
            address: z.string(),
            city: z.string(),
            state: z.string(),
            country: z.string(),
            cep: z.string(),
            courseName: z.string(),
            initialDate: z.coerce.date(),
            finishDate: z.coerce.date(),
          }),
        ),
      }),
    )
    .mutation(async (opts) => {
      const {
        profileId,
        step,
        occupation,
        office,
        companyOrBossName,
        companyAddress,
        companyCity,
        companyState,
        companyCountry,
        companyCep,
        companyTel,
        admissionDate,
        monthlySalary,
        retireeDate,
        jobDetails,
        previousJobConfirmation,
        previousJobs,
        courses,
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
          code: "NOT_FOUND",
          message: "Erro ao procurar o formulário",
        });
      }

      await prisma.form.update({
        where: {
          id: profileUpdated.form.id,
        },
        data: {
          occupation,
          office,
          companyOrBossName,
          companyAddress,
          companyCity,
          companyState,
          companyCountry,
          companyCep,
          companyTel,
          admissionDate,
          monthlySalary,
          retireeDate,
          jobDetails,
          previousJobConfirmation: previousJobConfirmation === "Sim",
          previousJobs,
          courses,
        },
      });

      return { message: "Informações salvas" };
    }),
});
