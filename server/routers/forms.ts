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
});
