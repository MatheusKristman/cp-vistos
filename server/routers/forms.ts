import { z } from "zod";

import { isUserAuthedProcedure, router } from "../trpc";
import prisma from "@/lib/prisma";
import { TRPCError } from "@trpc/server";
import { NotificationStatusForm, StatusForm } from "@prisma/client";
import isEmail from "validator/lib/isEmail";

export const formsRouter = router({
  getProfile: isUserAuthedProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
      })
    )
    .query(async (opts) => {
      const { profileId } = opts.input;

      const profile = await prisma.profile.findUnique({
        where: {
          id: profileId,
        },
      });

      if (!profile) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Erro ao procurar o perfil",
        });
      }

      return { profile };
    }),
  getForm: isUserAuthedProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
      })
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
          isEditing: z.boolean(),
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
          otherNationalityCountry: z.string().optional(),
          otherCountryResidentConfirmation: z.enum(["Sim", "Não"]),
          otherCountryResident: z.string().optional(),
          USSocialSecurityNumber: z.string(),
          USTaxpayerIDNumber: z.string(),
        })
        .superRefine(
          (
            {
              otherCountryResidentConfirmation,
              otherCountryResident,
              otherNationalityConfirmation,
              otherNationalityPassport,
              otherNationalityCountry,
              otherNamesConfirmation,
              otherNames,
            },
            ctx
          ) => {
            if (
              otherNationalityConfirmation === "Sim" &&
              (otherNationalityPassport === undefined || otherNationalityPassport?.length === 0)
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["otherNationalityPassport"],
              });
            }

            if (
              otherNationalityConfirmation === "Sim" &&
              (otherNationalityCountry === undefined || otherNationalityCountry?.length === 0)
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["otherNationalityCountry"],
              });
            }

            if (otherNamesConfirmation === "Sim" && otherNames && otherNames.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["otherNames"],
              });
            }

            if (
              otherCountryResidentConfirmation === "Sim" &&
              (otherCountryResident === undefined || otherCountryResident?.length === 0)
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["otherCountryResident"],
              });
            }
          }
        )
    )
    .mutation(async (opts) => {
      const {
        profileId,
        step,
        isEditing,
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
        otherNationalityCountry,
        otherCountryResidentConfirmation,
        otherCountryResident,
        USSocialSecurityNumber,
        USTaxpayerIDNumber,
      } = opts.input;
      let profileUpdated;

      if (isEditing) {
        profileUpdated = await prisma.profile.findUnique({
          where: {
            id: profileId,
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

        await prisma.notification.create({
          data: {
            statusForm: NotificationStatusForm.updated,
            profile: {
              connect: {
                id: profileUpdated.id,
              },
            },
          },
        });
      } else {
        profileUpdated = await prisma.profile.update({
          where: {
            id: profileId,
          },
          data: {
            formStep: step,
            statusForm: StatusForm.filling,
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

        await prisma.notification.create({
          data: {
            statusForm: NotificationStatusForm.filling,
            profile: {
              connect: {
                id: profileUpdated.id,
              },
            },
          },
        });
      }

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
          otherNationalityCountry,
          otherCountryResidentConfirmation: otherCountryResidentConfirmation === "Sim",
          otherCountryResident,
          USSocialSecurityNumber,
          USTaxpayerIDNumber,
        },
      });

      return { message: "Informações salvas", isEditing };
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
        sex: z.string().optional(),
        maritalStatus: z.string().optional(),
        birthDate: z.date().nullable(),
        birthCity: z.string().nullable(),
        birthState: z.string().nullable(),
        birthCountry: z.string().nullable(),
        originCountry: z.string().nullable(),
        otherNationalityConfirmation: z.enum(["Sim", "Não"]).nullable(),
        otherNationalityPassport: z.string().optional().nullable(),
        otherNationalityCountry: z.string().optional().nullable(),
        otherCountryResidentConfirmation: z.enum(["Sim", "Não"]).nullable(),
        otherCountryResident: z.string().optional().nullable(),
        USSocialSecurityNumber: z.string().nullable(),
        USTaxpayerIDNumber: z.string().nullable(),
      })
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
        otherNationalityCountry,
        otherCountryResidentConfirmation,
        otherCountryResident,
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
          otherNationalityCountry,
          otherCountryResidentConfirmation: otherCountryResidentConfirmation === "Sim",
          otherCountryResident,
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
        isEditing: z.boolean(),
        address: z.string().min(1),
        addressNumber: z.string().min(1),
        complement: z.string(),
        district: z.string().min(1),
        city: z.string().min(1),
        state: z.string().min(1),
        cep: z.string().min(1).min(9),
        country: z.string().min(1),
        postalAddressConfirmation: z.enum(["Sim", "Não"]),
        otherPostalAddress: z.string(),
        cel: z.string().min(1).min(14),
        tel: z.string(),
        fiveYearsOtherTelConfirmation: z.enum(["Sim", "Não"]),
        otherTel: z.string(),
        email: z.string().min(1).email(),
        fiveYearsOtherEmailConfirmation: z.enum(["Sim", "Não"]),
        otherEmail: z.union([z.literal(""), z.string().email()]),
        facebook: z.string(),
        linkedin: z.string(),
        instagram: z.string(),
        othersSocialMedia: z.string(),
      })
    )
    .mutation(async (opts) => {
      const {
        profileId,
        step,
        isEditing,
        address,
        addressNumber,
        complement,
        district,
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
      let profileUpdated;

      if (isEditing) {
        profileUpdated = await prisma.profile.findUnique({
          where: {
            id: profileId,
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

        await prisma.notification.create({
          data: {
            statusForm: NotificationStatusForm.updated,
            profile: {
              connect: {
                id: profileUpdated.id,
              },
            },
          },
        });
      } else {
        profileUpdated = await prisma.profile.update({
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
      }

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
          addressNumber,
          complement,
          district,
          city,
          state,
          cep,
          country,
          postalAddressConfirmation: postalAddressConfirmation === "Sim",
          otherPostalAddress,
          cel,
          tel,
          fiveYearsOtherTelConfirmation: fiveYearsOtherTelConfirmation === "Sim",
          otherTel,
          email,
          fiveYearsOtherEmailConfirmation: fiveYearsOtherEmailConfirmation === "Sim",
          otherEmail,
          facebook,
          linkedin,
          instagram,
          othersSocialMedia,
        },
      });

      return { message: "Informações salvas", isEditing };
    }),
  saveContactAndAddress: isUserAuthedProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
        redirectStep: z.number().optional(),
        address: z.string().nullable(),
        addressNumber: z.string().nullable(),
        complement: z.string().nullable(),
        district: z.string().nullable(),
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
      })
    )
    .mutation(async (opts) => {
      const {
        profileId,
        redirectStep,
        address,
        addressNumber,
        complement,
        district,
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
          addressNumber,
          complement,
          district,
          city,
          state,
          cep,
          country,
          postalAddressConfirmation: postalAddressConfirmation === "Sim",
          otherPostalAddress,
          cel,
          tel,
          fiveYearsOtherTelConfirmation: fiveYearsOtherTelConfirmation === "Sim",
          otherTel,
          email,
          fiveYearsOtherEmailConfirmation: fiveYearsOtherEmailConfirmation === "Sim",
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
        isEditing: z.boolean(),
        passportNumber: z.string().min(1, { message: "Campo obrigatório" }),
        passportCity: z.string().min(1, { message: "Campo obrigatório" }),
        passportState: z.string().min(1, { message: "Campo obrigatório" }),
        passportIssuingCountry: z.string().min(1, { message: "Campo obrigatório" }),
        passportIssuingDate: z.date({ message: "Selecione uma data" }),
        passportExpireDate: z.date({ message: "Selecione uma data" }).optional(),
        passportLostConfirmation: z.enum(["Sim", "Não"]),
        lostPassportNumber: z.string(),
        lostPassportCountry: z.string(),
        lostPassportDetails: z.string(),
      })
    )
    .mutation(async (opts) => {
      const {
        profileId,
        step,
        isEditing,
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
      let profileUpdated;

      if (isEditing) {
        profileUpdated = await prisma.profile.findUnique({
          where: {
            id: profileId,
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

        await prisma.notification.create({
          data: {
            statusForm: NotificationStatusForm.updated,
            profile: {
              connect: {
                id: profileUpdated.id,
              },
            },
          },
        });
      } else {
        profileUpdated = await prisma.profile.update({
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
      }

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

      return { message: "Informações salvas", isEditing };
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
      })
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
      z
        .object({
          profileId: z.string().min(1),
          step: z.number(),
          isEditing: z.boolean(),
          travelItineraryConfirmation: z.enum(["Sim", "Não"]),
          USAPreviewArriveDate: z.date({ message: "Campo obrigatório" }).optional(),
          arriveFlyNumber: z.string(),
          arriveCity: z.string(),
          USAPreviewReturnDate: z.date({ message: "Campo obrigatório" }).optional(),
          returnFlyNumber: z.string(),
          returnCity: z.string(),
          estimatedTimeNumber: z.coerce.number().gt(1, "Campo precisa ter valor maior que zero"),
          estimatedTimeType: z.string().min(1, { message: "Campo obrigatório" }),
          visitLocations: z.string().min(1),
          hasAddressInUSA: z.enum(["Sim", "Não"]),
          USACompleteAddress: z.string(),
          USAZipCode: z.string(),
          USACity: z.string(),
          USAState: z.string(),
          payer: z.string(),
          payerNameOrCompany: z.string(),
          payerTel: z.string(),
          payerAddress: z.string(),
          payerRelation: z.string(),
          payerEmail: z.string(),
        })
        .superRefine(
          (
            {
              hasAddressInUSA,
              USACompleteAddress,
              USAZipCode,
              USACity,
              USAState,
              payer,
              payerNameOrCompany,
              payerTel,
              payerAddress,
              payerRelation,
              payerEmail,
            },
            ctx
          ) => {
            if (hasAddressInUSA === "Sim" && USACompleteAddress.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["USACompleteAddress"],
              });
            }

            if (hasAddressInUSA === "Sim" && USAZipCode.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["USAZipCode"],
              });
            }

            if (hasAddressInUSA === "Sim" && USACity.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["USACity"],
              });
            }

            if (hasAddressInUSA === "Sim" && USAState.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["USAState"],
              });
            }

            if ((payer === "Outra pessoa" || payer === "Empresa") && payerNameOrCompany.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["payerNameOrCompany"],
              });
            }

            if ((payer === "Outra pessoa" || payer === "Empresa") && payerTel.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["payerTel"],
              });
            }

            if ((payer === "Outra pessoa" || payer === "Empresa") && payerAddress.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["payerAddress"],
              });
            }

            if (payer === "Outra pessoa" && payerRelation.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["payerRelation"],
              });
            }

            if ((payer === "Outra pessoa" || payer === "Empresa") && !isEmail(payerEmail)) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "E-mail inválido",
                path: ["payerEmail"],
              });
            }

            if ((payer === "Outra pessoa" || payer === "Empresa") && payerEmail.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["payerEmail"],
              });
            }
          }
        )
    )
    .mutation(async (opts) => {
      const {
        profileId,
        step,
        isEditing,
        travelItineraryConfirmation,
        USAPreviewArriveDate,
        arriveFlyNumber,
        arriveCity,
        USAPreviewReturnDate,
        returnFlyNumber,
        returnCity,
        estimatedTimeNumber,
        estimatedTimeType,
        visitLocations,
        hasAddressInUSA,
        USACompleteAddress,
        USAZipCode,
        USACity,
        USAState,
        payer,
        payerNameOrCompany,
        payerTel,
        payerAddress,
        payerRelation,
        payerEmail,
      } = opts.input;
      let profileUpdated;

      if (isEditing) {
        profileUpdated = await prisma.profile.findUnique({
          where: {
            id: profileId,
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

        await prisma.notification.create({
          data: {
            statusForm: NotificationStatusForm.updated,
            profile: {
              connect: {
                id: profileUpdated.id,
              },
            },
          },
        });
      } else {
        profileUpdated = await prisma.profile.update({
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
      }

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
          estimatedTimeOnUSA: estimatedTimeNumber + " " + estimatedTimeType,
          visitLocations,
          hasAddressInUSA: hasAddressInUSA === "Sim",
          USACompleteAddress,
          USAZipCode,
          USACity,
          USAState,
          payer,
          payerNameOrCompany,
          payerTel,
          payerAddress,
          payerRelation,
          payerEmail,
        },
      });

      return { message: "Informações salvas", isEditing };
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
        estimatedTimeNumber: z.coerce.number().positive("Não é permitido número negativo").nullable(),
        estimatedTimeType: z.string().nullable(),
        visitLocations: z.string().nullable(),
        hasAddressInUSA: z.enum(["Sim", "Não"]).nullable(),
        USACompleteAddress: z.string().nullable(),
        USAZipCode: z.string().nullable(),
        USACity: z.string().nullable(),
        USAState: z.string().nullable(),
        payer: z.string().nullable(),
        payerNameOrCompany: z.string().nullable(),
        payerTel: z.string().nullable(),
        payerAddress: z.string().nullable(),
        payerRelation: z.string().nullable(),
        payerEmail: z.string().nullable(),
      })
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
        estimatedTimeNumber,
        estimatedTimeType,
        visitLocations,
        hasAddressInUSA,
        USACompleteAddress,
        USAZipCode,
        USACity,
        USAState,
        payer,
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
          estimatedTimeOnUSA: estimatedTimeNumber + " " + estimatedTimeType,
          visitLocations,
          hasAddressInUSA: hasAddressInUSA === "Sim",
          USACompleteAddress,
          USAZipCode,
          USACity,
          USAState,
          payer,
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
          isEditing: z.boolean(),
          otherPeopleTravelingConfirmation: z.enum(["Sim", "Não"]),
          otherPeopleTraveling: z.array(
            z.object({
              name: z.string(),
              relation: z.string(),
            })
          ),
          groupMemberConfirmation: z.enum(["Sim", "Não"]),
          groupName: z.string(),
        })
        .superRefine(
          ({ otherPeopleTravelingConfirmation, otherPeopleTraveling, groupMemberConfirmation, groupName }, ctx) => {
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
              otherPeopleTraveling.filter((item) => item.name === "").length === 1
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: [`otherPeopleTraveling.${otherPeopleTraveling.length - 1}.name`],
              });
            }

            if (
              otherPeopleTravelingConfirmation === "Sim" &&
              otherPeopleTraveling.length === 1 &&
              otherPeopleTraveling.filter((item) => item.relation === "").length === 1
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: [`otherPeopleTraveling.${otherPeopleTraveling.length - 1}.relation`],
              });
            }
          }
        )
    )
    .mutation(async (opts) => {
      const {
        profileId,
        step,
        isEditing,
        otherPeopleTravelingConfirmation,
        otherPeopleTraveling,
        groupMemberConfirmation,
        groupName,
      } = opts.input;
      let profileUpdated;

      if (isEditing) {
        profileUpdated = await prisma.profile.findUnique({
          where: {
            id: profileId,
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

        await prisma.notification.create({
          data: {
            statusForm: NotificationStatusForm.updated,
            profile: {
              connect: {
                id: profileUpdated.id,
              },
            },
          },
        });
      } else {
        profileUpdated = await prisma.profile.update({
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
      }

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
          otherPeopleTravelingConfirmation: otherPeopleTravelingConfirmation === "Sim",
          otherPeopleTraveling,
          groupMemberConfirmation: groupMemberConfirmation === "Sim",
          groupName,
        },
      });

      return { message: "Informações salvas", isEditing };
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
          })
        ),
        groupMemberConfirmation: z.enum(["Sim", "Não"]).nullable(),
        groupName: z.string().nullable(),
      })
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
          otherPeopleTravelingConfirmation: otherPeopleTravelingConfirmation === "Sim",
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
          isEditing: z.boolean(),
          hasBeenOnUSAConfirmation: z.enum(["Sim", "Não"]),
          USALastTravel: z.array(
            z.object({
              arriveDate: z.coerce.date(),
              estimatedTime: z.string(),
            })
          ),
          americanLicenseToDriveConfirmation: z.enum(["Sim", "Não"]),
          americanLicense: z.object({
            licenseNumber: z.string(),
            state: z.string(),
          }),
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
            ctx
          ) => {
            if (
              hasBeenOnUSAConfirmation === "Sim" &&
              USALastTravel.length === 1 &&
              USALastTravel.filter((item) => item.arriveDate === undefined).length === 1
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
              USALastTravel.filter((item) => item.estimatedTime === "").length === 1
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: [`USALastTravel.${USALastTravel.length - 1}.estimatedTime`],
              });
            }

            if (americanLicenseToDriveConfirmation === "Sim" && americanLicense.licenseNumber === "") {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["americanLicense.licenseNumber"],
              });
            }

            if (americanLicenseToDriveConfirmation === "Sim" && americanLicense.state === "") {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["americanLicense.state"],
              });
            }

            if (USAVisaConfirmation === "Sim" && visaIssuingDate === undefined) {
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

            if (lostVisaConfirmation === "Sim" && lostVisaDetails.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["lostVisaDetails"],
              });
            }

            if (canceledVisaConfirmation === "Sim" && canceledVisaDetails.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["canceledVisaDetails"],
              });
            }

            if (deniedVisaConfirmation === "Sim" && deniedVisaDetails.length === 0) {
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
          }
        )
    )
    .mutation(async (opts) => {
      const {
        profileId,
        step,
        isEditing,
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
      let profileUpdated;

      if (isEditing) {
        profileUpdated = await prisma.profile.findUnique({
          where: {
            id: profileId,
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

        await prisma.notification.create({
          data: {
            statusForm: NotificationStatusForm.updated,
            profile: {
              connect: {
                id: profileUpdated.id,
              },
            },
          },
        });
      } else {
        profileUpdated = await prisma.profile.update({
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
      }

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
          americanLicenseToDriveConfirmation: americanLicenseToDriveConfirmation === "Sim",
          americanLicense,
          USAVisaConfirmation: USAVisaConfirmation === "Sim",
          visaIssuingDate,
          visaNumber,
          newVisaConfirmation: newVisaConfirmation === "Sim",
          sameCountryResidenceConfirmation: sameCountryResidenceConfirmation === "Sim",
          sameVisaTypeConfirmation: sameVisaTypeConfirmation === "Sim",
          fingerprintsProvidedConfirmation: fingerprintsProvidedConfirmation === "Sim",
          lostVisaConfirmation: lostVisaConfirmation === "Sim",
          lostVisaDetails,
          canceledVisaConfirmation: canceledVisaConfirmation === "Sim",
          canceledVisaDetails,
          deniedVisaConfirmation: deniedVisaConfirmation === "Sim",
          deniedVisaDetails,
          consularPost,
          deniedVisaType,
          immigrationRequestByAnotherPersonConfirmation: immigrationRequestByAnotherPersonConfirmation === "Sim",
          immigrationRequestByAnotherPersonDetails,
        },
      });

      return { message: "Informações salvas", isEditing };
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
          })
        ),
        americanLicenseToDriveConfirmation: z.enum(["Sim", "Não"]),
        americanLicense: z.object({
          licenseNumber: z.string(),
          state: z.string(),
        }),
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
          americanLicenseToDriveConfirmation: americanLicenseToDriveConfirmation === "Sim",
          americanLicense,
          USAVisaConfirmation: USAVisaConfirmation === "Sim",
          visaIssuingDate,
          visaNumber,
          newVisaConfirmation: newVisaConfirmation === "Sim",
          sameCountryResidenceConfirmation: sameCountryResidenceConfirmation === "Sim",
          sameVisaTypeConfirmation: sameVisaTypeConfirmation === "Sim",
          fingerprintsProvidedConfirmation: fingerprintsProvidedConfirmation === "Sim",
          lostVisaConfirmation: lostVisaConfirmation === "Sim",
          lostVisaDetails,
          canceledVisaConfirmation: canceledVisaConfirmation === "Sim",
          canceledVisaDetails,
          deniedVisaConfirmation: deniedVisaConfirmation === "Sim",
          deniedVisaDetails,
          consularPost,
          deniedVisaType,
          immigrationRequestByAnotherPersonConfirmation: immigrationRequestByAnotherPersonConfirmation === "Sim",
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
        isEditing: z.boolean(),
        hasUSAOrganizationOrResident: z.enum(["Sim", "Não"]),
        organizationOrUSAResidentName: z.string(),
        organizationOrUSAResidentRelation: z.string(),
        organizationOrUSAResidentAddress: z.string(),
        organizationOrUSAResidentZipCode: z.string(),
        organizationOrUSAResidentCity: z.string(),
        organizationOrUSAResidentState: z.string(),
        organizationOrUSAResidentCountry: z.string(),
        organizationOrUSAResidentTel: z.string(),
        organizationOrUSAResidentEmail: z.string(),
      })
    )
    .mutation(async (opts) => {
      const {
        profileId,
        step,
        isEditing,
        hasUSAOrganizationOrResident,
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
      let profileUpdated;

      if (isEditing) {
        profileUpdated = await prisma.profile.findUnique({
          where: {
            id: profileId,
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

        await prisma.notification.create({
          data: {
            statusForm: NotificationStatusForm.updated,
            profile: {
              connect: {
                id: profileUpdated.id,
              },
            },
          },
        });
      } else {
        profileUpdated = await prisma.profile.update({
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
      }

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
          hasUSAOrganizationOrResident: hasUSAOrganizationOrResident === "Sim",
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

      return { message: "Informações salvas", isEditing };
    }),
  saveUsaContact: isUserAuthedProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
        redirectStep: z.number().optional(),
        hasUSAOrganizationOrResident: z.enum(["Sim", "Não"]),
        organizationOrUSAResidentName: z.string(),
        organizationOrUSAResidentRelation: z.string(),
        organizationOrUSAResidentAddress: z.string(),
        organizationOrUSAResidentZipCode: z.string(),
        organizationOrUSAResidentCity: z.string(),
        organizationOrUSAResidentState: z.string(),
        organizationOrUSAResidentCountry: z.string(),
        organizationOrUSAResidentTel: z.string(),
        organizationOrUSAResidentEmail: z.string(),
      })
    )
    .mutation(async (opts) => {
      const {
        profileId,
        redirectStep,
        hasUSAOrganizationOrResident,
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
          hasUSAOrganizationOrResident: hasUSAOrganizationOrResident === "Sim",
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
        isEditing: z.boolean(),
        fatherCompleteName: z.string(),
        fatherBirthdate: z.date().optional(),
        fatherLiveInTheUSAConfirmation: z.enum(["Sim", "Não"]),
        fatherUSASituation: z.string(),
        motherCompleteName: z.string().min(1),
        motherBirthdate: z.date().optional(),
        motherLiveInTheUSAConfirmation: z.enum(["Sim", "Não"]),
        motherUSASituation: z.string(),
        familyLivingInTheUSAConfirmation: z.enum(["Sim", "Não"]),
        familyLivingInTheUSA: z.array(
          z.object({
            name: z.string(),
            relation: z.string(),
            situation: z.string(),
          })
        ),
        partnerCompleteName: z.string(),
        partnerBirthdate: z.date().optional(),
        partnerNationality: z.string(),
        partnerCity: z.string(),
        partnerState: z.string(),
        partnerCountry: z.string(),
        unionDate: z.date().optional(),
        divorceDate: z.date().optional(),
      })
    )
    .mutation(async (opts) => {
      const {
        profileId,
        step,
        isEditing,
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
      let profileUpdated;

      if (isEditing) {
        profileUpdated = await prisma.profile.findUnique({
          where: {
            id: profileId,
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

        await prisma.notification.create({
          data: {
            statusForm: NotificationStatusForm.updated,
            profile: {
              connect: {
                id: profileUpdated.id,
              },
            },
          },
        });
      } else {
        profileUpdated = await prisma.profile.update({
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
      }

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
          fatherLiveInTheUSAConfirmation: fatherLiveInTheUSAConfirmation === "Sim",
          fatherUSASituation,
          motherCompleteName,
          motherBirthdate,
          motherLiveInTheUSAConfirmation: motherLiveInTheUSAConfirmation === "Sim",
          motherUSASituation,
          familyLivingInTheUSAConfirmation: familyLivingInTheUSAConfirmation === "Sim",
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

      return { message: "Informações salvas", isEditing };
    }),
  saveFamily: isUserAuthedProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
        redirectStep: z.number().optional(),
        fatherCompleteName: z.string(),
        fatherBirthdate: z.coerce.date().optional().nullable(),
        fatherLiveInTheUSAConfirmation: z.enum(["Sim", "Não"]),
        fatherUSASituation: z.string(),
        motherCompleteName: z.string(),
        motherBirthdate: z.coerce.date().optional().nullable(),
        motherLiveInTheUSAConfirmation: z.enum(["Sim", "Não"]),
        motherUSASituation: z.string(),
        familyLivingInTheUSAConfirmation: z.enum(["Sim", "Não"]),
        familyLivingInTheUSA: z.array(
          z.object({
            name: z.string(),
            relation: z.string(),
            situation: z.string(),
          })
        ),
        partnerCompleteName: z.string(),
        partnerBirthdate: z.coerce.date().optional().nullable(),
        partnerNationality: z.string(),
        partnerCity: z.string(),
        partnerState: z.string(),
        partnerCountry: z.string(),
        unionDate: z.coerce.date().optional().nullable(),
        divorceDate: z.coerce.date().optional().nullable(),
      })
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
          fatherLiveInTheUSAConfirmation: fatherLiveInTheUSAConfirmation === "Sim",
          fatherUSASituation,
          motherCompleteName,
          motherBirthdate,
          motherLiveInTheUSAConfirmation: motherLiveInTheUSAConfirmation === "Sim",
          motherUSASituation,
          familyLivingInTheUSAConfirmation: familyLivingInTheUSAConfirmation === "Sim",
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
        isEditing: z.boolean(),
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
          })
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
          })
        ),
      })
    )
    .mutation(async (opts) => {
      const {
        profileId,
        step,
        isEditing,
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
      let profileUpdated;

      if (isEditing) {
        profileUpdated = await prisma.profile.findUnique({
          where: {
            id: profileId,
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

        await prisma.notification.create({
          data: {
            statusForm: NotificationStatusForm.updated,
            profile: {
              connect: {
                id: profileUpdated.id,
              },
            },
          },
        });
      } else {
        profileUpdated = await prisma.profile.update({
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
      }

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

      return { message: "Informações salvas", isEditing };
    }),
  saveWorkEducation: isUserAuthedProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
        redirectStep: z.number().optional(),
        occupation: z.string().nullable(),
        office: z.string().nullable(),
        companyOrBossName: z.string().nullable(),
        companyAddress: z.string().nullable(),
        companyCity: z.string().nullable(),
        companyState: z.string().nullable(),
        companyCountry: z.string().nullable(),
        companyCep: z.string().nullable(),
        companyTel: z.string().nullable(),
        admissionDate: z.coerce.date().optional().nullable(),
        monthlySalary: z.string().nullable(),
        retireeDate: z.coerce.date().optional().nullable(),
        jobDetails: z.string().nullable(),
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
          })
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
          })
        ),
      })
    )
    .mutation(async (opts) => {
      const {
        profileId,
        redirectStep,
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

      return { message: "Informações salvas", redirectStep };
    }),
  submitAdditionalInformation: isUserAuthedProcedure
    .input(
      z
        .object({
          profileId: z.string().min(1),
          step: z.number(),
          isEditing: z.boolean(),
          languages: z.array(z.string().min(1, { message: "Idioma precisa ser preenchido" })),
          fiveYearsOtherCountryTravelsConfirmation: z.enum(["Sim", "Não"]),
          fiveYearsOtherCountryTravels: z.array(z.string().min(1, { message: "Países precisam ser preenchidos" })),
          socialOrganizationConfirmation: z.enum(["Sim", "Não"]),
          socialOrganization: z.array(z.string().min(1, { message: "Os campos precisam ser preenchidos" })),
          weaponTrainingConfirmation: z.enum(["Sim", "Não"]),
          weaponTrainingDetails: z.string(),
          militaryServiceConfirmation: z.enum(["Sim", "Não"]),
          militaryServiceCountry: z.string(),
          militaryServiceLocal: z.string(),
          militaryServicePatent: z.string(),
          militaryServiceSpecialty: z.string(),
          militaryServiceStartDate: z.date().optional(),
          militaryServiceEndDate: z.date().optional(),
          insurgencyOrganizationConfirmation: z.enum(["Sim", "Não"]),
          insurgencyOrganizationDetails: z.string(),
        })
        .superRefine(
          (
            {
              fiveYearsOtherCountryTravelsConfirmation,
              fiveYearsOtherCountryTravels,
              socialOrganizationConfirmation,
              socialOrganization,
              weaponTrainingConfirmation,
              weaponTrainingDetails,
              militaryServiceConfirmation,
              militaryServicePatent,
              militaryServiceLocal,
              militaryServiceCountry,
              militaryServiceEndDate,
              militaryServiceSpecialty,
              militaryServiceStartDate,
              insurgencyOrganizationConfirmation,
              insurgencyOrganizationDetails,
            },
            ctx
          ) => {
            if (fiveYearsOtherCountryTravelsConfirmation === "Sim" && fiveYearsOtherCountryTravels.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["fiveYearsOtherCountryTravels"],
              });
            }

            if (socialOrganizationConfirmation === "Sim" && socialOrganization.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["socialOrganization"],
              });
            }

            if (weaponTrainingConfirmation === "Sim" && weaponTrainingDetails.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["weaponTrainingDetails"],
              });
            }

            if (militaryServiceConfirmation === "Sim" && militaryServiceSpecialty.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["militaryServiceSpecialty"],
              });
            }

            if (militaryServiceConfirmation === "Sim" && militaryServiceCountry.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["militaryServiceCountry"],
              });
            }

            if (militaryServiceConfirmation === "Sim" && militaryServiceLocal.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["militaryServiceLocal"],
              });
            }

            if (militaryServiceConfirmation === "Sim" && militaryServicePatent.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["militaryServicePatent"],
              });
            }

            if (militaryServiceConfirmation === "Sim" && militaryServiceStartDate === undefined) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["militaryServiceStartDate"],
              });
            }

            if (militaryServiceConfirmation === "Sim" && militaryServiceEndDate === undefined) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["militaryServiceEndDate"],
              });
            }

            if (insurgencyOrganizationConfirmation === "Sim" && insurgencyOrganizationDetails.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Campo vazio, preencha para prosseguir",
                path: ["insurgencyOrganizationDetails"],
              });
            }
          }
        )
    )
    .mutation(async (opts) => {
      const {
        profileId,
        step,
        isEditing,
        languages,
        fiveYearsOtherCountryTravelsConfirmation,
        fiveYearsOtherCountryTravels,
        socialOrganizationConfirmation,
        socialOrganization,
        weaponTrainingConfirmation,
        weaponTrainingDetails,
        militaryServiceConfirmation,
        militaryServiceCountry,
        militaryServiceLocal,
        militaryServicePatent,
        militaryServiceSpecialty,
        militaryServiceStartDate,
        militaryServiceEndDate,
        insurgencyOrganizationConfirmation,
        insurgencyOrganizationDetails,
      } = opts.input;
      let profileUpdated;

      if (isEditing) {
        profileUpdated = await prisma.profile.findUnique({
          where: {
            id: profileId,
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

        await prisma.notification.create({
          data: {
            statusForm: NotificationStatusForm.updated,
            profile: {
              connect: {
                id: profileUpdated.id,
              },
            },
          },
        });
      } else {
        profileUpdated = await prisma.profile.update({
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
      }

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
          languages,
          fiveYearsOtherCountryTravelsConfirmation: fiveYearsOtherCountryTravelsConfirmation === "Sim",
          fiveYearsOtherCountryTravels,
          socialOrganizationConfirmation: socialOrganizationConfirmation === "Sim",
          socialOrganization,
          weaponTrainingConfirmation: weaponTrainingConfirmation === "Sim",
          weaponTrainingDetails,
          militaryServiceConfirmation: militaryServiceConfirmation === "Sim",
          militaryServiceCountry,
          militaryServiceLocal,
          militaryServicePatent,
          militaryServiceSpecialty,
          militaryServiceStartDate,
          militaryServiceEndDate,
          insurgencyOrganizationConfirmation: insurgencyOrganizationConfirmation === "Sim",
          insurgencyOrganizationDetails,
        },
      });

      return { message: "Informações salvas", isEditing };
    }),
  saveAdditionalInformation: isUserAuthedProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
        redirectStep: z.number().optional(),
        languages: z.array(z.string().min(1, { message: "Idioma precisa ser preenchido" })),
        fiveYearsOtherCountryTravelsConfirmation: z.enum(["Sim", "Não"]),
        fiveYearsOtherCountryTravels: z.array(z.string().min(1, { message: "Países precisam ser preenchidos" })),
        socialOrganizationConfirmation: z.enum(["Sim", "Não"]),
        socialOrganization: z.array(z.string().min(1, { message: "Os campos precisam ser preenchidos" })),
        weaponTrainingConfirmation: z.enum(["Sim", "Não"]),
        weaponTrainingDetails: z.string().nullable(),
        militaryServiceConfirmation: z.enum(["Sim", "Não"]),
        militaryServiceCountry: z.string().nullable(),
        militaryServiceLocal: z.string().nullable(),
        militaryServicePatent: z.string().nullable(),
        militaryServiceSpecialty: z.string().nullable(),
        militaryServiceStartDate: z.date().optional().nullable(),
        militaryServiceEndDate: z.date().optional().nullable(),
        insurgencyOrganizationConfirmation: z.enum(["Sim", "Não"]),
        insurgencyOrganizationDetails: z.string().nullable(),
      })
    )
    .mutation(async (opts) => {
      const {
        profileId,
        redirectStep,
        languages,
        fiveYearsOtherCountryTravelsConfirmation,
        fiveYearsOtherCountryTravels,
        socialOrganizationConfirmation,
        socialOrganization,
        weaponTrainingConfirmation,
        weaponTrainingDetails,
        militaryServiceConfirmation,
        militaryServiceCountry,
        militaryServiceLocal,
        militaryServicePatent,
        militaryServiceSpecialty,
        militaryServiceStartDate,
        militaryServiceEndDate,
        insurgencyOrganizationConfirmation,
        insurgencyOrganizationDetails,
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
          languages,
          fiveYearsOtherCountryTravelsConfirmation: fiveYearsOtherCountryTravelsConfirmation === "Sim",
          fiveYearsOtherCountryTravels,
          socialOrganizationConfirmation: socialOrganizationConfirmation === "Sim",
          socialOrganization,
          weaponTrainingConfirmation: weaponTrainingConfirmation === "Sim",
          weaponTrainingDetails,
          militaryServiceConfirmation: militaryServiceConfirmation === "Sim",
          militaryServiceCountry,
          militaryServiceLocal,
          militaryServicePatent,
          militaryServiceSpecialty,
          militaryServiceStartDate,
          militaryServiceEndDate,
          insurgencyOrganizationConfirmation: insurgencyOrganizationConfirmation === "Sim",
          insurgencyOrganizationDetails,
        },
      });

      return { message: "Informações salvas", redirectStep };
    }),
  submitSecurity: isUserAuthedProcedure
    .input(
      z
        .object({
          profileId: z.string().min(1),
          step: z.number(),
          isEditing: z.boolean(),
          contagiousDiseaseConfirmation: z.enum(["", "Sim", "Não"]),
          contagiousDiseaseConfirmationDetails: z.string(),
          phisicalMentalProblemConfirmation: z.enum(["", "Sim", "Não"]),
          phisicalMentalProblemConfirmationDetails: z.string(),
          crimeConfirmation: z.enum(["", "Sim", "Não"]),
          crimeConfirmationDetails: z.string(),
          drugsProblemConfirmation: z.enum(["", "Sim", "Não"]),
          drugsProblemConfirmationDetails: z.string(),
          lawViolateConfirmation: z.enum(["", "Sim", "Não"]),
          lawViolateConfirmationDetails: z.string(),
          prostitutionConfirmation: z.enum(["", "Sim", "Não"]),
          prostitutionConfirmationDetails: z.string(),
          moneyLaundryConfirmation: z.enum(["", "Sim", "Não"]),
          moneyLaundryConfirmationDetails: z.string(),
          peopleTrafficConfirmation: z.enum(["", "Sim", "Não"]),
          peopleTrafficConfirmationDetails: z.string(),
          helpPeopleTrafficConfirmation: z.enum(["", "Sim", "Não"]),
          helpPeopleTrafficConfirmationDetails: z.string(),
          parentPeopleTrafficConfirmation: z.enum(["", "Sim", "Não"]),
          parentPeopleTrafficConfirmationDetails: z.string(),
          spyConfirmation: z.enum(["", "Sim", "Não"]),
          spyConfirmationDetails: z.string(),
          terrorismConfirmation: z.enum(["", "Sim", "Não"]),
          terrorismConfirmationDetails: z.string(),
          financialAssistanceConfirmation: z.enum(["", "Sim", "Não"]),
          financialAssistanceConfirmationDetails: z.string(),
          terrorismMemberConfirmation: z.enum(["", "Sim", "Não"]),
          terrorismMemberConfirmationDetails: z.string(),
          parentTerrorismConfirmation: z.enum(["", "Sim", "Não"]),
          parentTerrorismConfirmationDetails: z.string(),
          genocideConfirmation: z.enum(["", "Sim", "Não"]),
          genocideConfirmationDetails: z.string(),
          tortureConfirmation: z.enum(["", "Sim", "Não"]),
          tortureConfirmationDetails: z.string(),
          assassinConfirmation: z.enum(["", "Sim", "Não"]),
          assassinConfirmationDetails: z.string(),
          childSoldierConfirmation: z.enum(["", "Sim", "Não"]),
          childSoldierConfirmationDetails: z.string(),
          religionLibertyConfirmation: z.enum(["", "Sim", "Não"]),
          religionLibertyConfirmationDetails: z.string(),
          abortConfirmation: z.enum(["", "Sim", "Não"]),
          abortConfirmationDetails: z.string(),
          coerciveTransplantConfirmation: z.enum(["", "Sim", "Não"]),
          coerciveTransplantConfirmationDetails: z.string(),
          visaFraudConfirmation: z.enum(["", "Sim", "Não"]),
          visaFraudConfirmationDetails: z.string(),
          deportedConfirmation: z.enum(["", "Sim", "Não"]),
          deportedConfirmationDetails: z.string(),
          childCustodyConfirmation: z.enum(["", "Sim", "Não"]),
          childCustodyConfirmationDetails: z.string(),
          lawViolationConfirmation: z.enum(["", "Sim", "Não"]),
          lawViolationConfirmationDetails: z.string(),
          avoidTaxConfirmation: z.enum(["", "Sim", "Não"]),
          avoidTaxConfirmationDetails: z.string(),
        })
        .superRefine(
          (
            {
              contagiousDiseaseConfirmation,
              contagiousDiseaseConfirmationDetails,
              phisicalMentalProblemConfirmation,
              phisicalMentalProblemConfirmationDetails,
              crimeConfirmation,
              crimeConfirmationDetails,
              drugsProblemConfirmation,
              drugsProblemConfirmationDetails,
              lawViolateConfirmation,
              lawViolateConfirmationDetails,
              prostitutionConfirmation,
              prostitutionConfirmationDetails,
              moneyLaundryConfirmation,
              moneyLaundryConfirmationDetails,
              peopleTrafficConfirmation,
              peopleTrafficConfirmationDetails,
              helpPeopleTrafficConfirmation,
              helpPeopleTrafficConfirmationDetails,
              parentPeopleTrafficConfirmation,
              parentPeopleTrafficConfirmationDetails,
              spyConfirmation,
              spyConfirmationDetails,
              terrorismConfirmation,
              terrorismConfirmationDetails,
              financialAssistanceConfirmation,
              financialAssistanceConfirmationDetails,
              terrorismMemberConfirmation,
              terrorismMemberConfirmationDetails,
              parentTerrorismConfirmation,
              parentTerrorismConfirmationDetails,
              genocideConfirmation,
              genocideConfirmationDetails,
              tortureConfirmation,
              tortureConfirmationDetails,
              assassinConfirmation,
              assassinConfirmationDetails,
              childSoldierConfirmation,
              childSoldierConfirmationDetails,
              religionLibertyConfirmation,
              religionLibertyConfirmationDetails,
              abortConfirmation,
              abortConfirmationDetails,
              coerciveTransplantConfirmation,
              coerciveTransplantConfirmationDetails,
              visaFraudConfirmation,
              visaFraudConfirmationDetails,
              deportedConfirmation,
              deportedConfirmationDetails,
              childCustodyConfirmation,
              childCustodyConfirmationDetails,
              lawViolationConfirmation,
              lawViolationConfirmationDetails,
              avoidTaxConfirmation,
              avoidTaxConfirmationDetails,
            },
            ctx
          ) => {
            if (contagiousDiseaseConfirmation === "Sim" && contagiousDiseaseConfirmationDetails.length === 0) {
              ctx.addIssue({
                code: "custom",
                message: "Campo obrigatório caso a opção seja sim",
                path: ["contagiousDiseaseConfirmationDetails"],
              });
            }

            if (phisicalMentalProblemConfirmation === "Sim" && phisicalMentalProblemConfirmationDetails.length === 0) {
              ctx.addIssue({
                code: "custom",
                message: "Campo obrigatório caso a opção seja sim",
                path: ["phisicalMentalProblemConfirmationDetails"],
              });
            }

            if (crimeConfirmation === "Sim" && crimeConfirmationDetails.length === 0) {
              ctx.addIssue({
                code: "custom",
                message: "Campo obrigatório caso a opção seja sim",
                path: ["crimeConfirmationDetails"],
              });
            }

            if (drugsProblemConfirmation === "Sim" && drugsProblemConfirmationDetails.length === 0) {
              ctx.addIssue({
                code: "custom",
                message: "Campo obrigatório caso a opção seja sim",
                path: ["drugsProblemConfirmationDetails"],
              });
            }

            if (lawViolateConfirmation === "Sim" && lawViolateConfirmationDetails.length === 0) {
              ctx.addIssue({
                code: "custom",
                message: "Campo obrigatório caso a opção seja sim",
                path: ["lawViolateConfirmationDetails"],
              });
            }

            if (prostitutionConfirmation === "Sim" && prostitutionConfirmationDetails.length === 0) {
              ctx.addIssue({
                code: "custom",
                message: "Campo obrigatório caso a opção seja sim",
                path: ["prostitutionConfirmationDetails"],
              });
            }

            if (moneyLaundryConfirmation === "Sim" && moneyLaundryConfirmationDetails.length === 0) {
              ctx.addIssue({
                code: "custom",
                message: "Campo obrigatório caso a opção seja sim",
                path: ["moneyLaundryConfirmationDetails"],
              });
            }

            if (peopleTrafficConfirmation === "Sim" && peopleTrafficConfirmationDetails.length === 0) {
              ctx.addIssue({
                code: "custom",
                message: "Campo obrigatório caso a opção seja sim",
                path: ["peopleTrafficConfirmationDetails"],
              });
            }

            if (helpPeopleTrafficConfirmation === "Sim" && helpPeopleTrafficConfirmationDetails.length === 0) {
              ctx.addIssue({
                code: "custom",
                message: "Campo obrigatório caso a opção seja sim",
                path: ["helpPeopleTrafficConfirmationDetails"],
              });
            }

            if (parentPeopleTrafficConfirmation === "Sim" && parentPeopleTrafficConfirmationDetails.length === 0) {
              ctx.addIssue({
                code: "custom",
                message: "Campo obrigatório caso a opção seja sim",
                path: ["parentPeopleTrafficConfirmationDetails"],
              });
            }

            if (spyConfirmation === "Sim" && spyConfirmationDetails.length === 0) {
              ctx.addIssue({
                code: "custom",
                message: "Campo obrigatório caso a opção seja sim",
                path: ["spyConfirmationDetails"],
              });
            }

            if (terrorismConfirmation === "Sim" && terrorismConfirmationDetails.length === 0) {
              ctx.addIssue({
                code: "custom",
                message: "Campo obrigatório caso a opção seja sim",
                path: ["terrorismConfirmationDetails"],
              });
            }

            if (financialAssistanceConfirmation === "Sim" && financialAssistanceConfirmationDetails.length === 0) {
              ctx.addIssue({
                code: "custom",
                message: "Campo obrigatório caso a opção seja sim",
                path: ["financialAssistanceConfirmationDetails"],
              });
            }

            if (terrorismMemberConfirmation === "Sim" && terrorismMemberConfirmationDetails.length === 0) {
              ctx.addIssue({
                code: "custom",
                message: "Campo obrigatório caso a opção seja sim",
                path: ["terrorismMemberConfirmationDetails"],
              });
            }

            if (parentTerrorismConfirmation === "Sim" && parentTerrorismConfirmationDetails.length === 0) {
              ctx.addIssue({
                code: "custom",
                message: "Campo obrigatório caso a opção seja sim",
                path: ["parentTerrorismConfirmationDetails"],
              });
            }

            if (genocideConfirmation === "Sim" && genocideConfirmationDetails.length === 0) {
              ctx.addIssue({
                code: "custom",
                message: "Campo obrigatório caso a opção seja sim",
                path: ["genocideConfirmationDetails"],
              });
            }

            if (tortureConfirmation === "Sim" && tortureConfirmationDetails.length === 0) {
              ctx.addIssue({
                code: "custom",
                message: "Campo obrigatório caso a opção seja sim",
                path: ["tortureConfirmationDetails"],
              });
            }

            if (assassinConfirmation === "Sim" && assassinConfirmationDetails.length === 0) {
              ctx.addIssue({
                code: "custom",
                message: "Campo obrigatório caso a opção seja sim",
                path: ["assassinConfirmationDetails"],
              });
            }

            if (childSoldierConfirmation === "Sim" && childSoldierConfirmationDetails.length === 0) {
              ctx.addIssue({
                code: "custom",
                message: "Campo obrigatório caso a opção seja sim",
                path: ["childSoldierConfirmationDetails"],
              });
            }

            if (religionLibertyConfirmation === "Sim" && religionLibertyConfirmationDetails.length === 0) {
              ctx.addIssue({
                code: "custom",
                message: "Campo obrigatório caso a opção seja sim",
                path: ["religionLibertyConfirmationDetails"],
              });
            }

            if (abortConfirmation === "Sim" && abortConfirmationDetails.length === 0) {
              ctx.addIssue({
                code: "custom",
                message: "Campo obrigatório caso a opção seja sim",
                path: ["abortConfirmationDetails"],
              });
            }

            if (coerciveTransplantConfirmation === "Sim" && coerciveTransplantConfirmationDetails.length === 0) {
              ctx.addIssue({
                code: "custom",
                message: "Campo obrigatório caso a opção seja sim",
                path: ["coerciveTransplantConfirmationDetails"],
              });
            }

            if (visaFraudConfirmation === "Sim" && visaFraudConfirmationDetails.length === 0) {
              ctx.addIssue({
                code: "custom",
                message: "Campo obrigatório caso a opção seja sim",
                path: ["visaFraudConfirmationDetails"],
              });
            }

            if (deportedConfirmation === "Sim" && deportedConfirmationDetails.length === 0) {
              ctx.addIssue({
                code: "custom",
                message: "Campo obrigatório caso a opção seja sim",
                path: ["deportedConfirmationDetails"],
              });
            }

            if (childCustodyConfirmation === "Sim" && childCustodyConfirmationDetails.length === 0) {
              ctx.addIssue({
                code: "custom",
                message: "Campo obrigatório caso a opção seja sim",
                path: ["childCustodyConfirmationDetails"],
              });
            }

            if (lawViolationConfirmation === "Sim" && lawViolationConfirmationDetails.length === 0) {
              ctx.addIssue({
                code: "custom",
                message: "Campo obrigatório caso a opção seja sim",
                path: ["lawViolationConfirmationDetails"],
              });
            }

            if (avoidTaxConfirmation === "Sim" && avoidTaxConfirmationDetails.length === 0) {
              ctx.addIssue({
                code: "custom",
                message: "Campo obrigatório caso a opção seja sim",
                path: ["avoidTaxConfirmationDetails"],
              });
            }
          }
        )
    )
    .mutation(async (opts) => {
      const {
        profileId,
        step,
        isEditing,
        contagiousDiseaseConfirmation,
        contagiousDiseaseConfirmationDetails,
        phisicalMentalProblemConfirmation,
        phisicalMentalProblemConfirmationDetails,
        crimeConfirmation,
        crimeConfirmationDetails,
        drugsProblemConfirmation,
        drugsProblemConfirmationDetails,
        lawViolateConfirmation,
        lawViolateConfirmationDetails,
        prostitutionConfirmation,
        prostitutionConfirmationDetails,
        moneyLaundryConfirmation,
        moneyLaundryConfirmationDetails,
        peopleTrafficConfirmation,
        peopleTrafficConfirmationDetails,
        helpPeopleTrafficConfirmation,
        helpPeopleTrafficConfirmationDetails,
        parentPeopleTrafficConfirmation,
        parentPeopleTrafficConfirmationDetails,
        spyConfirmation,
        spyConfirmationDetails,
        terrorismConfirmation,
        terrorismConfirmationDetails,
        financialAssistanceConfirmation,
        financialAssistanceConfirmationDetails,
        terrorismMemberConfirmation,
        terrorismMemberConfirmationDetails,
        parentTerrorismConfirmation,
        parentTerrorismConfirmationDetails,
        genocideConfirmation,
        genocideConfirmationDetails,
        tortureConfirmation,
        tortureConfirmationDetails,
        assassinConfirmation,
        assassinConfirmationDetails,
        childSoldierConfirmation,
        childSoldierConfirmationDetails,
        religionLibertyConfirmation,
        religionLibertyConfirmationDetails,
        abortConfirmation,
        abortConfirmationDetails,
        coerciveTransplantConfirmation,
        coerciveTransplantConfirmationDetails,
        visaFraudConfirmation,
        visaFraudConfirmationDetails,
        deportedConfirmation,
        deportedConfirmationDetails,
        childCustodyConfirmation,
        childCustodyConfirmationDetails,
        lawViolationConfirmation,
        lawViolationConfirmationDetails,
        avoidTaxConfirmation,
        avoidTaxConfirmationDetails,
      } = opts.input;
      let profileUpdated;

      if (
        !contagiousDiseaseConfirmation ||
        !phisicalMentalProblemConfirmation ||
        !crimeConfirmation ||
        !drugsProblemConfirmation ||
        !lawViolateConfirmation ||
        !prostitutionConfirmation ||
        !moneyLaundryConfirmation ||
        !peopleTrafficConfirmation ||
        !helpPeopleTrafficConfirmation ||
        !parentPeopleTrafficConfirmation ||
        !spyConfirmation ||
        !terrorismConfirmation ||
        !financialAssistanceConfirmation ||
        !terrorismMemberConfirmation ||
        !parentTerrorismConfirmation ||
        !genocideConfirmation ||
        !tortureConfirmation ||
        !assassinConfirmation ||
        !childSoldierConfirmation ||
        !religionLibertyConfirmation ||
        !abortConfirmation ||
        !coerciveTransplantConfirmation ||
        !visaFraudConfirmation ||
        !deportedConfirmation ||
        !childCustodyConfirmation ||
        !lawViolationConfirmation ||
        !avoidTaxConfirmation
      ) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Preencha todas as opções da etapa",
        });
      }

      if (isEditing) {
        profileUpdated = await prisma.profile.findUnique({
          where: {
            id: profileId,
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

        await prisma.notification.create({
          data: {
            statusForm: NotificationStatusForm.updated,
            profile: {
              connect: {
                id: profileUpdated.id,
              },
            },
          },
        });
      } else {
        profileUpdated = await prisma.profile.update({
          where: {
            id: profileId,
          },
          data: {
            formStep: step,
            statusForm: StatusForm.filled,
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

        await prisma.notification.create({
          data: {
            statusForm: NotificationStatusForm.filled,
            profile: {
              connect: {
                id: profileUpdated.id,
              },
            },
          },
        });
      }

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
          contagiousDiseaseConfirmation: contagiousDiseaseConfirmation === "Sim",
          contagiousDiseaseConfirmationDetails,
          phisicalMentalProblemConfirmation: phisicalMentalProblemConfirmation === "Sim",
          phisicalMentalProblemConfirmationDetails,
          crimeConfirmation: crimeConfirmation === "Sim",
          crimeConfirmationDetails,
          drugsProblemConfirmation: drugsProblemConfirmation === "Sim",
          drugsProblemConfirmationDetails,
          lawViolateConfirmation: lawViolateConfirmation === "Sim",
          lawViolateConfirmationDetails,
          prostitutionConfirmation: prostitutionConfirmation === "Sim",
          prostitutionConfirmationDetails,
          moneyLaundryConfirmation: moneyLaundryConfirmation === "Sim",
          moneyLaundryConfirmationDetails,
          peopleTrafficConfirmation: peopleTrafficConfirmation === "Sim",
          peopleTrafficConfirmationDetails,
          helpPeopleTrafficConfirmation: helpPeopleTrafficConfirmation === "Sim",
          helpPeopleTrafficConfirmationDetails,
          parentPeopleTrafficConfirmation: parentPeopleTrafficConfirmation === "Sim",
          parentPeopleTrafficConfirmationDetails,
          spyConfirmation: spyConfirmation === "Sim",
          spyConfirmationDetails,
          terrorismConfirmation: terrorismConfirmation === "Sim",
          terrorismConfirmationDetails,
          financialAssistanceConfirmation: financialAssistanceConfirmation === "Sim",
        },
      });

      await prisma.form.update({
        where: {
          id: profileUpdated.form.id,
        },
        data: {
          financialAssistanceConfirmationDetails,
          terrorismMemberConfirmation: terrorismMemberConfirmation === "Sim",
          terrorismMemberConfirmationDetails,
          parentTerrorismConfirmation: parentTerrorismConfirmation === "Sim",
          parentTerrorismConfirmationDetails,
          genocideConfirmation: genocideConfirmation === "Sim",
          genocideConfirmationDetails,
          tortureConfirmation: tortureConfirmation === "Sim",
          tortureConfirmationDetails,
          assassinConfirmation: assassinConfirmation === "Sim",
          assassinConfirmationDetails,
          childSoldierConfirmation: childSoldierConfirmation === "Sim",
          childSoldierConfirmationDetails,
          religionLibertyConfirmation: religionLibertyConfirmation === "Sim",
          religionLibertyConfirmationDetails,
          abortConfirmation: abortConfirmation === "Sim",
          abortConfirmationDetails,
          coerciveTransplantConfirmation: coerciveTransplantConfirmation === "Sim",
          coerciveTransplantConfirmationDetails,
          visaFraudConfirmation: visaFraudConfirmation === "Sim",
          visaFraudConfirmationDetails,
          deportedConfirmation: deportedConfirmation === "Sim",
          deportedConfirmationDetails,
          childCustodyConfirmation: childCustodyConfirmation === "Sim",
          childCustodyConfirmationDetails,
          lawViolationConfirmation: lawViolationConfirmation === "Sim",
          lawViolationConfirmationDetails,
          avoidTaxConfirmation: avoidTaxConfirmation === "Sim",
          avoidTaxConfirmationDetails,
        },
      });

      return { message: "Informações salvas", isEditing };
    }),
  saveSecurity: isUserAuthedProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
        redirectStep: z.number().optional(),
        contagiousDiseaseConfirmation: z.enum(["", "Sim", "Não"]),
        contagiousDiseaseConfirmationDetails: z.string().nullable(),
        phisicalMentalProblemConfirmation: z.enum(["", "Sim", "Não"]),
        phisicalMentalProblemConfirmationDetails: z.string().nullable(),
        crimeConfirmation: z.enum(["", "Sim", "Não"]),
        crimeConfirmationDetails: z.string().nullable(),
        drugsProblemConfirmation: z.enum(["", "Sim", "Não"]),
        drugsProblemConfirmationDetails: z.string().nullable(),
        lawViolateConfirmation: z.enum(["", "Sim", "Não"]),
        lawViolateConfirmationDetails: z.string().nullable(),
        prostitutionConfirmation: z.enum(["", "Sim", "Não"]),
        prostitutionConfirmationDetails: z.string().nullable(),
        moneyLaundryConfirmation: z.enum(["", "Sim", "Não"]),
        moneyLaundryConfirmationDetails: z.string().nullable(),
        peopleTrafficConfirmation: z.enum(["", "Sim", "Não"]),
        peopleTrafficConfirmationDetails: z.string().nullable(),
        helpPeopleTrafficConfirmation: z.enum(["", "Sim", "Não"]),
        helpPeopleTrafficConfirmationDetails: z.string().nullable(),
        parentPeopleTrafficConfirmation: z.enum(["", "Sim", "Não"]),
        parentPeopleTrafficConfirmationDetails: z.string().nullable(),
        spyConfirmation: z.enum(["", "Sim", "Não"]),
        spyConfirmationDetails: z.string().nullable(),
        terrorismConfirmation: z.enum(["", "Sim", "Não"]),
        terrorismConfirmationDetails: z.string().nullable(),
        financialAssistanceConfirmation: z.enum(["", "Sim", "Não"]),
        financialAssistanceConfirmationDetails: z.string().nullable(),
        terrorismMemberConfirmation: z.enum(["", "Sim", "Não"]),
        terrorismMemberConfirmationDetails: z.string().nullable(),
        parentTerrorismConfirmation: z.enum(["", "Sim", "Não"]),
        parentTerrorismConfirmationDetails: z.string().nullable(),
        genocideConfirmation: z.enum(["", "Sim", "Não"]),
        genocideConfirmationDetails: z.string().nullable(),
        tortureConfirmation: z.enum(["", "Sim", "Não"]),
        tortureConfirmationDetails: z.string().nullable(),
        assassinConfirmation: z.enum(["", "Sim", "Não"]),
        assassinConfirmationDetails: z.string().nullable(),
        childSoldierConfirmation: z.enum(["", "Sim", "Não"]),
        childSoldierConfirmationDetails: z.string().nullable(),
        religionLibertyConfirmation: z.enum(["", "Sim", "Não"]),
        religionLibertyConfirmationDetails: z.string().nullable(),
        abortConfirmation: z.enum(["", "Sim", "Não"]),
        abortConfirmationDetails: z.string().nullable(),
        coerciveTransplantConfirmation: z.enum(["", "Sim", "Não"]),
        coerciveTransplantConfirmationDetails: z.string().nullable(),
        visaFraudConfirmation: z.enum(["", "Sim", "Não"]),
        visaFraudConfirmationDetails: z.string().nullable(),
        deportedConfirmation: z.enum(["", "Sim", "Não"]),
        deportedConfirmationDetails: z.string().nullable(),
        childCustodyConfirmation: z.enum(["", "Sim", "Não"]),
        childCustodyConfirmationDetails: z.string().nullable(),
        lawViolationConfirmation: z.enum(["", "Sim", "Não"]),
        lawViolationConfirmationDetails: z.string().nullable(),
        avoidTaxConfirmation: z.enum(["", "Sim", "Não"]),
        avoidTaxConfirmationDetails: z.string().nullable(),
      })
    )
    .mutation(async (opts) => {
      const {
        profileId,
        redirectStep,
        contagiousDiseaseConfirmation,
        contagiousDiseaseConfirmationDetails,
        phisicalMentalProblemConfirmation,
        phisicalMentalProblemConfirmationDetails,
        crimeConfirmation,
        crimeConfirmationDetails,
        drugsProblemConfirmation,
        drugsProblemConfirmationDetails,
        lawViolateConfirmation,
        lawViolateConfirmationDetails,
        prostitutionConfirmation,
        prostitutionConfirmationDetails,
        moneyLaundryConfirmation,
        moneyLaundryConfirmationDetails,
        peopleTrafficConfirmation,
        peopleTrafficConfirmationDetails,
        helpPeopleTrafficConfirmation,
        helpPeopleTrafficConfirmationDetails,
        parentPeopleTrafficConfirmation,
        parentPeopleTrafficConfirmationDetails,
        spyConfirmation,
        spyConfirmationDetails,
        terrorismConfirmation,
        terrorismConfirmationDetails,
        financialAssistanceConfirmation,
        financialAssistanceConfirmationDetails,
        terrorismMemberConfirmation,
        terrorismMemberConfirmationDetails,
        parentTerrorismConfirmation,
        parentTerrorismConfirmationDetails,
        genocideConfirmation,
        genocideConfirmationDetails,
        tortureConfirmation,
        tortureConfirmationDetails,
        assassinConfirmation,
        assassinConfirmationDetails,
        childSoldierConfirmation,
        childSoldierConfirmationDetails,
        religionLibertyConfirmation,
        religionLibertyConfirmationDetails,
        abortConfirmation,
        abortConfirmationDetails,
        coerciveTransplantConfirmation,
        coerciveTransplantConfirmationDetails,
        visaFraudConfirmation,
        visaFraudConfirmationDetails,
        deportedConfirmation,
        deportedConfirmationDetails,
        childCustodyConfirmation,
        childCustodyConfirmationDetails,
        lawViolationConfirmation,
        lawViolationConfirmationDetails,
        avoidTaxConfirmation,
        avoidTaxConfirmationDetails,
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
          contagiousDiseaseConfirmation: contagiousDiseaseConfirmation === "Sim",
          contagiousDiseaseConfirmationDetails,
          phisicalMentalProblemConfirmation: phisicalMentalProblemConfirmation === "Sim",
          phisicalMentalProblemConfirmationDetails,
          crimeConfirmation: crimeConfirmation === "Sim",
          crimeConfirmationDetails,
          drugsProblemConfirmation: drugsProblemConfirmation === "Sim",
          drugsProblemConfirmationDetails,
          lawViolateConfirmation: lawViolateConfirmation === "Sim",
          lawViolateConfirmationDetails,
          prostitutionConfirmation: prostitutionConfirmation === "Sim",
          prostitutionConfirmationDetails,
          moneyLaundryConfirmation: moneyLaundryConfirmation === "Sim",
          moneyLaundryConfirmationDetails,
          peopleTrafficConfirmation: peopleTrafficConfirmation === "Sim",
          peopleTrafficConfirmationDetails,
          helpPeopleTrafficConfirmation: helpPeopleTrafficConfirmation === "Sim",
          helpPeopleTrafficConfirmationDetails,
          parentPeopleTrafficConfirmation: parentPeopleTrafficConfirmation === "Sim",
          parentPeopleTrafficConfirmationDetails,
          spyConfirmation: spyConfirmation === "Sim",
          spyConfirmationDetails,
          terrorismConfirmation: terrorismConfirmation === "Sim",
          terrorismConfirmationDetails,
          financialAssistanceConfirmation: financialAssistanceConfirmation === "Sim",
        },
      });

      await prisma.form.update({
        where: {
          id: profile.form.id,
        },
        data: {
          financialAssistanceConfirmationDetails,
          terrorismMemberConfirmation: terrorismMemberConfirmation === "Sim",
          terrorismMemberConfirmationDetails,
          parentTerrorismConfirmation: parentTerrorismConfirmation === "Sim",
          parentTerrorismConfirmationDetails,
          genocideConfirmation: genocideConfirmation === "Sim",
          genocideConfirmationDetails,
          tortureConfirmation: tortureConfirmation === "Sim",
          tortureConfirmationDetails,
          assassinConfirmation: assassinConfirmation === "Sim",
          assassinConfirmationDetails,
          childSoldierConfirmation: childSoldierConfirmation === "Sim",
          childSoldierConfirmationDetails,
          religionLibertyConfirmation: religionLibertyConfirmation === "Sim",
          religionLibertyConfirmationDetails,
          abortConfirmation: abortConfirmation === "Sim",
          abortConfirmationDetails,
          coerciveTransplantConfirmation: coerciveTransplantConfirmation === "Sim",
          coerciveTransplantConfirmationDetails,
          visaFraudConfirmation: visaFraudConfirmation === "Sim",
          visaFraudConfirmationDetails,
          deportedConfirmation: deportedConfirmation === "Sim",
          deportedConfirmationDetails,
          childCustodyConfirmation: childCustodyConfirmation === "Sim",
          childCustodyConfirmationDetails,
          lawViolationConfirmation: lawViolationConfirmation === "Sim",
          lawViolationConfirmationDetails,
          avoidTaxConfirmation: avoidTaxConfirmation === "Sim",
          avoidTaxConfirmationDetails,
        },
      });

      return { message: "Informações salvas", redirectStep };
    }),
});
