import { z } from "zod";
import bcrypt from "bcryptjs";
import {
  BudgetPaid,
  Category,
  ETAStatus,
  PaymentStatus,
  Role,
  ScheduleAccount,
  Shipping,
  Status,
  VisaClass,
  VisaType,
} from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { addDays, parse } from "date-fns";
import { fromZonedTime } from "date-fns-tz";

import { adminProcedure, collaboratorProcedure, router } from "../trpc";
import prisma from "@/lib/prisma";

export const userRouter = router({
  getRole: collaboratorProcedure.query(async (opts) => {
    const { collaborator } = opts.ctx;

    return { role: collaborator.role };
  }),
  createClient: collaboratorProcedure
    .input(
      z.object({
        name: z
          .string({
            required_error: "Nome é obrigatório",
            invalid_type_error: "Nome inválido",
          })
          .min(1, { message: "Nome é obrigatório" })
          .min(4, { message: "Nome precisa ter no mínimo 4 caracteres" }),
        cpf: z
          .string({
            required_error: "CPF é obrigatório",
            invalid_type_error: "CPF inválido",
          })
          .refine((val) => val.length > 0 && val.length === 14, {
            message: "CPF inválido",
          }),
        group: z
          .string({
            required_error: "Grupo é obrigatório",
            invalid_type_error: "Grupo inválido",
          })
          .optional(),
        cel: z
          .string({
            required_error: "Celular é obrigatório",
            invalid_type_error: "Celular inválido",
          })
          .optional(),
        address: z.string({
          required_error: "Endereço é obrigatório",
          invalid_type_error: "Endereço inválido",
        }),
        email: z
          .string({
            required_error: "E-mail é obrigatório",
            invalid_type_error: "E-mail inválido",
          })
          .email({ message: "E-mail inválido" })
          .trim()
          .min(1, { message: "E-mail é obrigatório" }),
        password: z
          .string({
            required_error: "Senha é obrigatório",
            invalid_type_error: "Senha inválida",
          })
          .min(1, { message: "Senha é obrigatória" })
          .min(6, { message: "Senha precisa ter no mínimo 6 caracteres" }),
        passwordConfirm: z
          .string({
            required_error: "Confirmação da senha é obrigatório",
            invalid_type_error: "Confirmação da senha inválida",
          })
          .min(1, { message: "Confirmação da senha é obrigatório" })
          .min(6, {
            message: "Confirmação da senha precisa ter no mínimo 6 caracteres",
          }),
        emailScheduleAccount: z
          .string({
            required_error: "E-mail é obrigatório",
            invalid_type_error: "E-mail inválido",
          })
          .email({ message: "E-mail inválido" })
          .trim()
          .min(1, { message: "E-mail é obrigatório" }),
        passwordScheduleAccount: z
          .string({
            required_error: "Senha é obrigatório",
            invalid_type_error: "Senha inválida",
          })
          .min(1, { message: "Senha é obrigatória" })
          .min(6, { message: "Senha precisa ter no mínimo 6 caracteres" }),
        passwordConfirmScheduleAccount: z
          .string({
            required_error: "Confirmação da senha é obrigatório",
            invalid_type_error: "Confirmação da senha inválida",
          })
          .min(1, { message: "Confirmação da senha é obrigatório" })
          .min(6, {
            message: "Confirmação da senha precisa ter no mínimo 6 caracteres",
          }),
        budget: z
          .string({
            required_error: "Valor é obrigatório",
            invalid_type_error: "Valor inválido",
          })
          .refine((val) => Number(val) >= 0, {
            message: "Valor precisa ser maior que zero",
          }),
        budgetPaid: z.enum(["", "Pago", "Pendente"], {
          message: "Status do pagamento é obrigatório",
        }),
        scheduleAccount: z.enum(["Ativado", "Inativo", ""], {
          message: "Conta de Agendamento é obrigatório",
        }),
        profiles: z
          .array(
            z
              .object({
                profileName: z
                  .string({
                    required_error: "Nome do perfil é obrigatório",
                    invalid_type_error: "Nome do perfil inválido",
                  })
                  .min(1, { message: "Nome do perfil é obrigatório" })
                  .min(6, {
                    message: "Nome do perfil precisa ter no mínimo 6 caracteres",
                  }),
                profileCpf: z
                  .string({
                    required_error: "CPF do perfil é obrigatório",
                    invalid_type_error: "CPF do perfil inválido",
                  })
                  .refine((val) => val.length > 0 && val.length === 14, {
                    message: "CPF inválido",
                  }),
                profileAddress: z.string({
                  required_error: "Endereço do perfil é obrigatório",
                  invalid_type_error: "Endereço do perfil inválido",
                }),
                birthDate: z
                  .string({ required_error: "Data de nascimento é obrigatório" })
                  .length(10, "Data inválida")
                  .optional(),
                passport: z
                  .string({
                    invalid_type_error: "Passaporte inválido",
                  })
                  .optional(),
                visaType: z
                  .enum(["Renovação", "Primeiro Visto", ""], {
                    message: "Tipo de Visto inválido",
                  })
                  .optional(),
                visaClass: z
                  .enum(
                    [
                      "B1 Babá",
                      "B1/B2 Turismo",
                      "O1 Capacidade Extraordinária",
                      "O2 Estrangeiro Acompanhante/Assistente",
                      "O3 Cônjuge ou Filho de um O1 ou O2",
                      "",
                    ],
                    { message: "Classe de visto inválida" }
                  )
                  .optional(),
                category: z.enum(["Visto Americano", "Passaporte", "E-TA", ""]).refine((val) => val.length !== 0, {
                  message: "Categoria é obrigatória",
                }),
                issuanceDate: z.string({ required_error: "Data de emissão é obrigatório" }).optional(),
                expireDate: z.string({ required_error: "Data de expiração é obrigatório" }).optional(),
                DSNumber: z
                  .string({
                    invalid_type_error: "Barcode inválido",
                  })
                  .optional(),
                responsibleCpf: z.string({ invalid_type_error: "CPF do responsável inválido" }).optional(),
                protocol: z
                  .string({
                    invalid_type_error: "Barcode inválido",
                  })
                  .optional(),
                paymentStatus: z
                  .enum(["Pendente", "Pago", ""], {
                    message: "Status de pagamento inválido",
                  })
                  .optional(),
                scheduleDate: z.string({ required_error: "Data de agendamento é obrigatório" }).optional(),
                scheduleTime: z
                  .string({
                    invalid_type_error: "Horário do agendamento inválido",
                  })
                  .optional(),
                scheduleLocation: z
                  .string({
                    invalid_type_error: "Local do agendamento inválido",
                  })
                  .optional(),
                entryDate: z.string({ required_error: "Data de entrada é obrigatório" }).optional(),
                process: z
                  .string({
                    invalid_type_error: "Processo inválido",
                  })
                  .optional(),
                ETAStatus: z
                  .enum(["Em Análise", "Aprovado", "Reprovado", ""], {
                    message: "Status inválido",
                  })
                  .optional(),
              })
              .superRefine(({ category, visaType, visaClass, scheduleTime }, ctx) => {
                if (category === "Visto Americano" && (visaType === "" || visaType === undefined)) {
                  ctx.addIssue({
                    path: ["visaType"],
                    code: "custom",
                    message: "Tipo do visto é obrigatório",
                  });
                }

                if (category === "Visto Americano" && (visaClass === "" || visaClass === undefined)) {
                  ctx.addIssue({
                    path: ["visaClass"],
                    code: "custom",
                    message: "Classe do visto é obrigatória",
                  });
                }

                if (
                  category === "Passaporte" &&
                  scheduleTime !== undefined &&
                  /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/.test(scheduleTime) === false
                ) {
                  ctx.addIssue({
                    path: ["scheduleTime"],
                    code: "custom",
                    message: "Horário do agendamento inválido",
                  });
                }
              })
          )
          .min(1, {
            message: "Precisa ter pelo menos um perfil vinculado a conta",
          }),
      })
    )
    .mutation(async (opts) => {
      let scheduleAccount;
      let budgetPaid;

      const { input } = opts;

      if (input.scheduleAccount === "Ativado") {
        scheduleAccount = ScheduleAccount.active;
      } else if (input.scheduleAccount === "Inativo") {
        scheduleAccount = ScheduleAccount.inactive;
      }

      const accountExists = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (accountExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Conta já cadastrada, utilize outro e-mail",
        });
      }

      const groupNameExists = await prisma.user.findFirst({
        where: {
          group: input.group,
        },
      });

      if (groupNameExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Nome do grupo já existe, utilize outro nome",
        });
      }

      switch (input.budgetPaid) {
        case "Pago":
          budgetPaid = BudgetPaid.paid;
          break;
        case "Pendente":
          budgetPaid = BudgetPaid.pending;
          break;
        default:
          budgetPaid = BudgetPaid.pending;
          break;
      }

      const account = await prisma.user.create({
        data: {
          name: input.name,
          email: input.email.toLowerCase(),
          password: input.password,
          emailScheduleAccount: input.emailScheduleAccount.toLowerCase(),
          passwordScheduleAccount: input.passwordScheduleAccount,
          group: input.group,
          role: Role.CLIENT,
          address: input.address,
          budget: parseFloat(input.budget),
          budgetPaid,
          cpf: input.cpf,
          cel: input.cel,
          scheduleAccount,
        },
      });

      const profilesPromises = input.profiles.map(async (profile) => {
        let visaClass;
        let visaType;
        let category;
        let paymentStatus;
        let ETAStatusValue;

        switch (profile.visaClass) {
          case "B1 Babá":
            visaClass = VisaClass.B1;
            break;
          case "B1/B2 Turismo":
            visaClass = VisaClass.B2_B1;
            break;
          case "O1 Capacidade Extraordinária":
            visaClass = VisaClass.O1;
            break;
          case "O2 Estrangeiro Acompanhante/Assistente":
            visaClass = VisaClass.O2;
            break;
          case "O3 Cônjuge ou Filho de um O1 ou O2":
            visaClass = VisaClass.O3;
            break;
          default:
            visaClass = VisaClass.B1;
            break;
        }

        switch (profile.visaType) {
          case "Primeiro Visto":
            visaType = VisaType.primeiro_visto;
            break;
          case "Renovação":
            visaType = VisaType.renovacao;
            break;
          default:
            visaType = VisaType.primeiro_visto;
            break;
        }

        switch (profile.paymentStatus) {
          case "Pendente":
            paymentStatus = PaymentStatus.pending;
            break;
          case "Pago":
            paymentStatus = PaymentStatus.paid;
            break;
          default:
            paymentStatus = PaymentStatus.pending;
            break;
        }

        switch (profile.ETAStatus) {
          case "Em Análise":
            ETAStatusValue = ETAStatus.analysis;
            break;
          case "Aprovado":
            ETAStatusValue = ETAStatus.approved;
            break;
          case "Reprovado":
            ETAStatusValue = ETAStatus.disapproved;
            break;
          default:
            ETAStatusValue = ETAStatus.analysis;
            break;
        }

        switch (profile.category) {
          case "Visto Americano":
            category = Category.american_visa;
            break;
          case "Passaporte":
            category = Category.passport;
            break;
          case "E-TA":
            category = Category.e_ta;
            break;
          default:
            category = Category.american_visa;
            break;
        }

        const profileBirthDateFormatted = profile.birthDate
          ? parse(profile.birthDate, "dd/MM/yyyy", new Date())
          : undefined;
        const profileIssuanceDateFormatted = profile.issuanceDate
          ? parse(profile.issuanceDate, "dd/MM/yyyy", new Date())
          : undefined;
        const profileExpireDateFormatted = profile.expireDate
          ? parse(profile.expireDate, "dd/MM/yyyy", new Date())
          : undefined;
        const profileScheduleDateFormatted = profile.scheduleDate
          ? parse(profile.scheduleDate, "dd/MM/yyyy", new Date())
          : undefined;
        const profileEntryDateFormatted = profile.entryDate
          ? parse(profile.entryDate, "dd/MM/yyyy", new Date())
          : undefined;

        const profileBirthDate = profileBirthDateFormatted
          ? fromZonedTime(profileBirthDateFormatted, "America/Sao_Paulo")
          : undefined;
        const profileIssuanceDate = profileIssuanceDateFormatted
          ? fromZonedTime(profileIssuanceDateFormatted, "America/Sao_Paulo")
          : undefined;
        const profileExpireDate = profileExpireDateFormatted
          ? fromZonedTime(profileExpireDateFormatted, "America/Sao_Paulo")
          : undefined;
        const profileScheduleDate = profileScheduleDateFormatted
          ? fromZonedTime(profileScheduleDateFormatted, "America/Sao_Paulo")
          : undefined;
        const profileEntryDate = profileEntryDateFormatted
          ? fromZonedTime(profileEntryDateFormatted, "America/Sao_Paulo")
          : undefined;

        const newProfile = await prisma.profile.create({
          data: {
            DSValid: addDays(new Date(), 30),
            DSNumber: profile.DSNumber ?? "",
            name: profile.profileName,
            address: profile.profileAddress,
            cpf: profile.profileCpf,
            birthDate: profileBirthDate,
            passport: profile.passport,
            issuanceDate: profileIssuanceDate,
            expireDate: profileExpireDate,
            responsibleCpf: profile.responsibleCpf,
            protocol: profile.protocol,
            paymentStatus,
            scheduleDate: profileScheduleDate,
            scheduleTime: profile.scheduleTime,
            scheduleLocation: profile.scheduleLocation,
            entryDate: profileEntryDate,
            process: profile.process,
            ETAStatus: ETAStatusValue,
            visaClass,
            visaType,
            category,
            user: {
              connect: {
                id: account.id,
              },
            },
          },
        });

        if (profile.category === "Visto Americano") {
          await prisma.form.create({
            data: {
              profile: {
                connect: {
                  id: newProfile.id,
                },
              },
            },
          });
        }

        return newProfile;
      });

      await Promise.all(profilesPromises);

      return { message: "Conta criada com sucesso" };
    }),
  addProfile: collaboratorProcedure
    .input(
      z
        .object({
          userId: z.string().min(1),
          profileName: z
            .string({
              required_error: "Nome do perfil é obrigatório",
              invalid_type_error: "Nome do perfil inválido",
            })
            .min(1, { message: "Nome do perfil é obrigatório" })
            .min(6, {
              message: "Nome do perfil precisa ter no mínimo 6 caracteres",
            }),
          profileCpf: z
            .string({
              required_error: "CPF do perfil é obrigatório",
              invalid_type_error: "CPF do perfil inválido",
            })
            .refine((val) => val.length > 0 && val.length === 14, {
              message: "CPF inválido",
            }),
          profileAddress: z.string({
            required_error: "Endereço do perfil é obrigatório",
            invalid_type_error: "Endereço do perfil inválido",
          }),
          birthDate: z
            .string({ required_error: "Data de nascimento é obrigatório" })
            .length(10, "Data inválida")
            .optional(),
          passport: z
            .string({
              invalid_type_error: "Passaporte inválido",
            })
            .optional(),
          visaType: z
            .enum(["Renovação", "Primeiro Visto", ""], {
              message: "Tipo de Visto inválido",
            })
            .optional(),
          visaClass: z
            .enum(
              [
                "B1 Babá",
                "B1/B2 Turismo",
                "O1 Capacidade Extraordinária",
                "O2 Estrangeiro Acompanhante/Assistente",
                "O3 Cônjuge ou Filho de um O1 ou O2",
                "",
              ],
              { message: "Classe de visto inválida" }
            )
            .optional(),
          category: z.enum(["Visto Americano", "Passaporte", "E-TA", ""]).refine((val) => val.length !== 0, {
            message: "Categoria é obrigatória",
          }),
          issuanceDate: z.string({ required_error: "Data de emissão é obrigatório" }).optional(),
          expireDate: z.string({ required_error: "Data de expiração é obrigatório" }).optional(),
          DSNumber: z
            .string({
              invalid_type_error: "Barcode inválido",
            })
            .optional(),
          responsibleCpf: z.string({ invalid_type_error: "CPF do responsável inválido" }).optional(),
          protocol: z
            .string({
              invalid_type_error: "Barcode inválido",
            })
            .optional(),
          paymentStatus: z
            .enum(["Pendente", "Pago", ""], {
              message: "Status de pagamento inválido",
            })
            .optional(),
          scheduleDate: z.string({ required_error: "Data de agendamento é obrigatório" }).optional(),
          scheduleTime: z
            .string({
              invalid_type_error: "Horário do agendamento inválido",
            })
            .optional(),
          scheduleLocation: z
            .string({
              invalid_type_error: "Local do agendamento inválido",
            })
            .optional(),
          entryDate: z.string({ required_error: "Data de entrada é obrigatório" }).optional(),
          process: z
            .string({
              invalid_type_error: "Processo inválido",
            })
            .optional(),
          ETAStatus: z
            .enum(["Em Análise", "Aprovado", "Reprovado", ""], {
              message: "Status inválido",
            })
            .optional(),
        })
        .superRefine(({ category, visaType, visaClass, scheduleTime }, ctx) => {
          if (category === "Visto Americano" && (visaType === "" || visaType === undefined)) {
            ctx.addIssue({
              path: ["visaType"],
              code: "custom",
              message: "Tipo do visto é obrigatório",
            });
          }

          if (category === "Visto Americano" && (visaClass === "" || visaClass === undefined)) {
            ctx.addIssue({
              path: ["visaClass"],
              code: "custom",
              message: "Classe do visto é obrigatória",
            });
          }

          if (
            category === "Passaporte" &&
            scheduleTime !== undefined &&
            /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/.test(scheduleTime) === false
          ) {
            ctx.addIssue({
              path: ["scheduleTime"],
              code: "custom",
              message: "Horário do agendamento inválido",
            });
          }
        })
    )
    .mutation(async (opts) => {
      const {
        userId,
        profileName,
        profileCpf,
        profileAddress,
        birthDate,
        passport,
        issuanceDate,
        expireDate,
        DSNumber,
        responsibleCpf,
        protocol,
        scheduleDate,
        scheduleTime,
        scheduleLocation,
        entryDate,
        process,
      } = opts.input;

      let visaClass;
      let visaType;
      let category;
      let paymentStatus;
      let ETAStatusValue;

      switch (opts.input.visaClass) {
        case "B1 Babá":
          visaClass = VisaClass.B1;
          break;
        case "B1/B2 Turismo":
          visaClass = VisaClass.B2_B1;
          break;
        case "O1 Capacidade Extraordinária":
          visaClass = VisaClass.O1;
          break;
        case "O2 Estrangeiro Acompanhante/Assistente":
          visaClass = VisaClass.O2;
          break;
        case "O3 Cônjuge ou Filho de um O1 ou O2":
          visaClass = VisaClass.O3;
          break;
        default:
          visaClass = VisaClass.B1;
          break;
      }

      switch (opts.input.visaType) {
        case "Primeiro Visto":
          visaType = VisaType.primeiro_visto;
          break;
        case "Renovação":
          visaType = VisaType.renovacao;
          break;
        default:
          visaType = VisaType.primeiro_visto;
          break;
      }

      switch (opts.input.category) {
        case "Visto Americano":
          category = Category.american_visa;
          break;
        case "Passaporte":
          category = Category.passport;
          break;
        case "E-TA":
          category = Category.e_ta;
          break;
        default:
          category = Category.american_visa;
          break;
      }

      switch (opts.input.ETAStatus) {
        case "Em Análise":
          ETAStatusValue = ETAStatus.analysis;
          break;
        case "Aprovado":
          ETAStatusValue = ETAStatus.approved;
          break;
        case "Reprovado":
          ETAStatusValue = ETAStatus.disapproved;
          break;
        default:
          ETAStatusValue = ETAStatus.analysis;
          break;
      }

      switch (opts.input.paymentStatus) {
        case "Pendente":
          paymentStatus = PaymentStatus.pending;
          break;
        case "Pago":
          paymentStatus = PaymentStatus.paid;
          break;
        default:
          paymentStatus = PaymentStatus.pending;
          break;
      }

      const profileBirthDateFormatted = birthDate ? parse(birthDate, "dd/MM/yyyy", new Date()) : undefined;
      const profileIssuanceDateFormatted = issuanceDate ? parse(issuanceDate, "dd/MM/yyyy", new Date()) : undefined;
      const profileExpireDateFormatted = expireDate ? parse(expireDate, "dd/MM/yyyy", new Date()) : undefined;
      const profileScheduleDateFormatted = scheduleDate ? parse(scheduleDate, "dd/MM/yyyy", new Date()) : undefined;
      const profileEntryDateFormatted = entryDate ? parse(entryDate, "dd/MM/yyyy", new Date()) : undefined;

      const profileBirthDate = profileBirthDateFormatted
        ? fromZonedTime(profileBirthDateFormatted, "America/Sao_Paulo")
        : undefined;
      const profileIssuanceDate = profileIssuanceDateFormatted
        ? fromZonedTime(profileIssuanceDateFormatted, "America/Sao_Paulo")
        : undefined;
      const profileExpireDate = profileExpireDateFormatted
        ? fromZonedTime(profileExpireDateFormatted, "America/Sao_Paulo")
        : undefined;
      const profileScheduleDate = profileScheduleDateFormatted
        ? fromZonedTime(profileScheduleDateFormatted, "America/Sao_Paulo")
        : undefined;
      const profileEntryDate = profileEntryDateFormatted
        ? fromZonedTime(profileEntryDateFormatted, "America/Sao_Paulo")
        : undefined;

      const profileUpdated = await prisma.profile.create({
        data: {
          DSValid: addDays(new Date(), 30),
          DSNumber: DSNumber ?? "",
          name: profileName,
          address: profileAddress,
          cpf: profileCpf,
          birthDate: profileBirthDate,
          passport,
          issuanceDate: profileIssuanceDate,
          expireDate: profileExpireDate,
          responsibleCpf,
          protocol,
          scheduleDate: profileScheduleDate,
          scheduleTime,
          scheduleLocation,
          entryDate: profileEntryDate,
          process,
          visaClass,
          visaType,
          category,
          paymentStatus,
          ETAStatus: ETAStatusValue,
          user: {
            connect: {
              id: userId,
            },
          },
        },
        include: {
          user: {
            include: {
              profiles: true,
            },
          },
          comments: true,
          form: true,
        },
      });

      if (opts.input.category === "Visto Americano") {
        await prisma.form.create({
          data: {
            profile: {
              connect: {
                id: profileUpdated!.id,
              },
            },
          },
        });
      }

      return {
        clientUpdated: profileUpdated,
        message: "Perfil criado com sucesso",
      };
    }),
  getActiveClients: collaboratorProcedure
    .input(
      z.object({
        category: z.enum(["american_visa", "passport", "e_ta"]),
      })
    )
    .query(async (opts) => {
      const { category } = opts.input;

      const profiles = await prisma.profile.findMany({
        where: {
          category,
          status: Status.active,
        },
        include: {
          user: {
            include: {
              profiles: true,
            },
          },
          form: true,
        },
      });

      if (profiles.length === 0) {
        return { clients: [] };
      }

      const clients = profiles.map((profile) => ({
        id: profile.id,
        group: profile.user.group!,
        CASVDate: profile.CASVDate,
        interviewDate: profile.interviewDate,
        meetingDate: profile.meetingDate,
        DSValid: profile.DSValid,
        name: profile.name,
        scheduleAccount: profile.user.scheduleAccount!,
        statusDS: profile.statusDS,
        tax: !!profile.taxDate,
        visaType: profile.visaType,
        visaStatus: profile.visaStatus,
        shipping: profile.shipping,
        cpf: profile.cpf,
        responsibleCpf: profile.responsibleCpf,
        protocol: profile.protocol,
        entryDate: profile.entryDate,
        scheduleDate: profile.scheduleDate,
        process: profile.process,
        passport: profile.passport,
        ETAStatus: profile.ETAStatus,
      }));

      return { clients };
    }),
  getProspectsClients: collaboratorProcedure
    .input(
      z.object({
        category: z.enum(["american_visa", "passport", "e_ta"]),
      })
    )
    .query(async (opts) => {
      const { category } = opts.input;

      const profiles = await prisma.profile.findMany({
        where: {
          category,
          status: Status.prospect,
        },
        include: {
          user: {
            include: {
              profiles: true,
            },
          },
          form: true,
        },
      });

      if (profiles.length === 0) {
        return { clients: [] };
      }

      const clients = profiles.map((profile) => ({
        id: profile.id,
        group: profile.user.group!,
        CASVDate: profile.CASVDate,
        interviewDate: profile.interviewDate,
        meetingDate: profile.meetingDate,
        DSValid: profile.DSValid,
        name: profile.name,
        scheduleAccount: profile.user.scheduleAccount!,
        statusDS: profile.statusDS,
        tax: !!profile.taxDate,
        visaType: profile.visaType,
        visaStatus: profile.visaStatus,
        shipping: profile.shipping,
        cpf: profile.cpf,
        responsibleCpf: profile.responsibleCpf,
        protocol: profile.protocol,
        entryDate: profile.entryDate,
        scheduleDate: profile.scheduleDate,
        process: profile.process,
        passport: profile.passport,
        ETAStatus: profile.ETAStatus,
      }));

      return { clients };
    }),
  getArchivedClients: collaboratorProcedure
    .input(
      z.object({
        category: z.enum(["american_visa", "passport", "e_ta"]),
      })
    )
    .query(async (opts) => {
      const { category } = opts.input;

      const profiles = await prisma.profile.findMany({
        where: {
          category,
          status: Status.archived,
        },
        include: {
          user: {
            include: {
              profiles: true,
            },
          },
          form: true,
        },
      });

      if (profiles.length === 0) {
        return { clients: [] };
      }

      const clients = profiles.map((profile) => ({
        id: profile.id,
        group: profile.user.group!,
        CASVDate: profile.CASVDate,
        interviewDate: profile.interviewDate,
        meetingDate: profile.meetingDate,
        DSValid: profile.DSValid,
        name: profile.name,
        scheduleAccount: profile.user.scheduleAccount!,
        statusDS: profile.statusDS,
        tax: !!profile.taxDate,
        visaType: profile.visaType,
        visaStatus: profile.visaStatus,
        shipping: profile.shipping,
        cpf: profile.cpf,
        responsibleCpf: profile.responsibleCpf,
        protocol: profile.protocol,
        entryDate: profile.entryDate,
        scheduleDate: profile.scheduleDate,
        process: profile.process,
        passport: profile.passport,
        ETAStatus: profile.ETAStatus,
      }));

      return { clients };
    }),
  getAnnotations: adminProcedure.input(z.object({ accountId: z.string().min(1) })).query(async (opts) => {
    const accountId = opts.input.accountId;

    const annotations = await prisma.annotations.findMany({
      where: {
        userId: accountId,
      },
    });

    return { annotations };
  }),
  getComments: collaboratorProcedure.input(z.object({ profileId: z.string().min(1) })).query(async (opts) => {
    const { profileId } = opts.input;

    const comments = await prisma.comments.findMany({
      where: {
        profileId,
      },
      include: {
        author: true,
      },
    });

    return { comments };
  }),
  getClientDetails: collaboratorProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
      })
    )
    .mutation(async (opts) => {
      const profileId = opts.input.profileId;

      const client = await prisma.profile.findUnique({
        where: {
          id: profileId,
        },
        include: {
          user: {
            include: {
              profiles: true,
            },
          },
          comments: true,
          form: true,
        },
      });

      if (!client) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Perfil não encontrado!",
        });
      }

      console.log({ clientBirthDate: client.birthDate });

      return {
        client,
      };
    }),
  updateDSValidationDate: collaboratorProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
      })
    )
    .mutation(async (opts) => {
      const profileId = opts.input.profileId;

      const updatedClient = await prisma.profile.update({
        where: {
          id: profileId,
        },
        data: {
          DSValid: fromZonedTime(new Date(), "America/Sao_Paulo"),
        },
        include: {
          user: {
            include: {
              profiles: true,
            },
          },
          comments: true,
          form: true,
        },
      });

      if (!updatedClient) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Perfil não encontrado!",
        });
      }

      return { updatedClient };
    }),
  updateStatusDS: collaboratorProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
        status: z.enum(["awaiting", "filling", "filled", "emitted"]),
      })
    )
    .mutation(async (opts) => {
      const { profileId, status } = opts.input;

      const updatedClient = await prisma.profile.update({
        where: {
          id: profileId,
        },
        data: {
          statusDS: status,
        },
        include: {
          user: {
            include: {
              profiles: true,
            },
          },
          comments: true,
          form: true,
        },
      });

      if (!updatedClient) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Perfil não encontrado!",
        });
      }

      return { updatedClient, status };
    }),
  updateVisaStatus: collaboratorProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
        status: z.enum(["awaiting", "approved", "disapproved", "in_progress", "finished"]),
      })
    )
    .mutation(async (opts) => {
      const { profileId, status } = opts.input;

      const updatedClient = await prisma.profile.update({
        where: {
          id: profileId,
        },
        data: {
          visaStatus: status,
        },
        include: {
          user: {
            include: {
              profiles: true,
            },
          },
          comments: true,
          form: true,
        },
      });

      if (!updatedClient) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Perfil não encontrado!",
        });
      }

      return { updatedClient, status };
    }),
  updatePaymentStatus: collaboratorProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
        status: z.enum(["paid", "pending"]),
      })
    )
    .mutation(async (opts) => {
      const { profileId, status } = opts.input;

      const updatedClient = await prisma.profile.update({
        where: {
          id: profileId,
        },
        data: {
          paymentStatus: status,
        },
        include: {
          user: {
            include: {
              profiles: true,
            },
          },
          comments: true,
          form: true,
        },
      });

      if (!updatedClient) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Perfil não encontrado!",
        });
      }

      return { updatedClient, status };
    }),
  updateETAStatus: collaboratorProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
        status: z.enum(["approved", "disapproved", "analysis"]),
      })
    )
    .mutation(async (opts) => {
      const { profileId, status } = opts.input;

      const updatedClient = await prisma.profile.update({
        where: {
          id: profileId,
        },
        data: {
          ETAStatus: status,
        },
        include: {
          user: {
            include: {
              profiles: true,
            },
          },
          comments: true,
          form: true,
        },
      });

      if (!updatedClient) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Perfil não encontrado!",
        });
      }

      return { updatedClient, status };
    }),
  addAnnotation: adminProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        annotation: z.array(z.string()).min(1),
      })
    )
    .mutation(async (opts) => {
      const { userId, annotation } = opts.input;

      await prisma.annotations.create({
        data: {
          annotation,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return {};
    }),
  deleteAnnotation: adminProcedure
    .input(
      z.object({
        annotationId: z.string().min(1),
      })
    )
    .mutation(async (opts) => {
      const { annotationId } = opts.input;

      await prisma.annotations.delete({
        where: {
          id: annotationId,
        },
      });

      return { message: "Anotação excluída" };
    }),
  editAnnotation: adminProcedure
    .input(
      z.object({
        annotationId: z.string().min(1),
        annotation: z.array(z.string()).min(1),
      })
    )
    .mutation(async (opts) => {
      const { annotationId, annotation } = opts.input;

      await prisma.annotations.update({
        where: {
          id: annotationId,
        },
        data: {
          annotation,
        },
      });

      return { message: "Anotação editada" };
    }),
  editAccount: collaboratorProcedure
    .input(
      z
        .object({
          profileId: z.string().min(1),
          userId: z.string().min(1),
          name: z.string().min(1).min(4),
          cpf: z.string().refine((val) => val.length > 0 && val.length === 14),
          cel: z
            .string()
            .optional()
            .refine((val) => !val || (val && val.length !== 0)),
          address: z.string(),
          email: z.string().trim().email().min(1),
          password: z.string(),
          passwordConfirm: z.string(),
          emailScheduleAccount: z.string().email().min(1),
          passwordScheduleAccount: z.string(),
          passwordConfirmScheduleAccount: z.string(),
          budget: z.string().refine((val) => Number(val) >= 0),
          budgetPaid: z.enum(["", "Pago", "Pendente"]),
          scheduleAccount: z.enum(["Ativado", "Inativo", ""]),
        })
        .superRefine(({ password, passwordConfirm, passwordScheduleAccount, passwordConfirmScheduleAccount }, ctx) => {
          if (password.length > 0 && password.length < 6) {
            ctx.addIssue({
              path: ["password"],
              code: "custom",
              message: "Senha inválida, precisa ter no mínimo 6 caracteres",
            });
          }

          if (passwordConfirm.length > 0 && passwordConfirm.length < 6) {
            ctx.addIssue({
              path: ["passwordConfirm"],
              code: "custom",
              message: "Senha inválida, precisa ter no mínimo 6 caracteres",
            });
          }

          if (passwordConfirm !== password) {
            ctx.addIssue({
              path: ["passwordConfirm"],
              code: "custom",
              message: "As senhas não coincidem, verifique e tente novamente",
            });
          }

          if (passwordScheduleAccount.length > 0 && passwordScheduleAccount.length < 6) {
            ctx.addIssue({
              path: ["passwordScheduleAccount"],
              code: "custom",
              message: "Senha inválida, precisa ter no mínimo 6 caracteres",
            });
          }

          if (passwordConfirmScheduleAccount.length > 0 && passwordConfirmScheduleAccount.length < 6) {
            ctx.addIssue({
              path: ["passwordConfirmScheduleAccount"],
              code: "custom",
              message: "Senha inválida, precisa ter no mínimo 6 caracteres",
            });
          }

          if (passwordConfirmScheduleAccount !== passwordScheduleAccount) {
            ctx.addIssue({
              path: ["passwordConfirmScheduleAccount"],
              code: "custom",
              message: "As senhas não coincidem, verifique e tente novamente",
            });
          }
        })
    )
    .mutation(async (opts) => {
      const {
        profileId,
        userId,
        name,
        cpf,
        cel,
        address,
        email,
        password,
        emailScheduleAccount,
        passwordScheduleAccount,
        budget,
      } = opts.input;
      let budgetPaid;
      let scheduleAccount;

      const userWithSameEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (userWithSameEmail && userWithSameEmail.id !== userId) {
        throw new TRPCError({ code: "CONFLICT", message: "E-mail já está sendo utilizado em outra conta" });
      }

      if (password.length > 0) {
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            name,
            cpf,
            cel,
            address,
            email,
            password,
            emailScheduleAccount,
            passwordScheduleAccount,
            budget: parseFloat(budget),
            budgetPaid,
            scheduleAccount,
          },
        });
      } else {
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            name,
            cpf,
            cel,
            address,
            email,
            budget: parseFloat(budget),
            budgetPaid,
            scheduleAccount,
          },
        });
      }

      const clientUpdated = await prisma.profile.findUnique({
        where: {
          id: profileId,
        },
        include: {
          user: {
            include: {
              profiles: true,
            },
          },
          comments: true,
          form: true,
        },
      });

      return { clientUpdated, message: "Conta editada com sucesso" };
    }),
  addComment: collaboratorProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
        comment: z.array(z.string()).min(1),
      })
    )
    .mutation(async (opts) => {
      const { profileId, comment } = opts.input;
      const { collaborator } = opts.ctx;

      await prisma.comments.create({
        data: {
          comment,
          author: {
            connect: {
              id: collaborator.id,
            },
          },
          profile: {
            connect: {
              id: profileId,
            },
          },
        },
      });

      return {};
    }),
  deleteComment: collaboratorProcedure
    .input(
      z.object({
        commentId: z.string().min(1),
      })
    )
    .mutation(async (opts) => {
      const { commentId } = opts.input;

      await prisma.comments.delete({
        where: {
          id: commentId,
        },
      });

      return { message: "Comentário excluído" };
    }),
  editComment: collaboratorProcedure
    .input(
      z.object({
        commentId: z.string().min(1),
        comment: z.array(z.string()).min(1),
      })
    )
    .mutation(async (opts) => {
      const { commentId, comment } = opts.input;

      await prisma.comments.update({
        where: {
          id: commentId,
        },
        data: {
          comment,
        },
      });

      return { message: "Comentário editado" };
    }),
  editProfile: collaboratorProcedure
    .input(
      z
        .object({
          profileId: z.string().min(1),
          profileName: z.string().min(1, { message: "Nome do perfil é obrigatório" }).min(6, {
            message: "Nome do perfil precisa ter no mínimo 6 caracteres",
          }),
          profileCpf: z.string().refine((val) => val.length > 0 && val.length === 14, {
            message: "CPF inválido",
          }),
          profileAddress: z.string(),
          birthDate: z.string().optional(),
          CASVDate: z.string().optional(),
          taxDate: z.string().optional(),
          shipping: z
            .enum(["A Verificar", "Retirada", "SEDEX", "C-Retirada", "C-SEDEX", ""], {
              message: "Opção de envio inválida",
            })
            .optional(),
          interviewDate: z.string().optional(),
          interviewTime: z.string().optional(),
          passport: z.string().optional(),
          visaType: z
            .enum(["Renovação", "Primeiro Visto", ""], {
              message: "Tipo de Visto inválido",
            })
            .optional(),
          visaClass: z
            .enum(
              [
                "B1 Babá",
                "B1/B2 Turismo",
                "O1 Capacidade Extraordinária",
                "O2 Estrangeiro Acompanhante/Assistente",
                "O3 Cônjuge ou Filho de um O1 ou O2",
                "",
              ],
              { message: "Classe de visto inválida" }
            )
            .optional(),
          category: z.enum(["Visto Americano", "Passaporte", "E-TA", ""]).refine((val) => val.length !== 0, {
            message: "Categoria é obrigatória",
          }),
          issuanceDate: z.string().optional(),
          expireDate: z.string().optional(),
          DSNumber: z.string().optional(),
          responsibleCpf: z.string().optional(),
          protocol: z.string().optional(),
          paymentStatus: z
            .enum(["Pendente", "Pago", ""], {
              message: "Status de pagamento inválido",
            })
            .optional(),
          scheduleDate: z.string().optional(),
          scheduleTime: z.string().optional(),
          scheduleLocation: z.string().optional(),
          entryDate: z.string().optional(),
          process: z.string().optional(),
          ETAStatus: z
            .enum(["Em Análise", "Aprovado", "Reprovado", ""], {
              message: "Status inválido",
            })
            .optional(),
        })
        .superRefine(({ category, visaType, visaClass, scheduleTime, interviewDate, interviewTime }, ctx) => {
          if (category === "Visto Americano" && (visaType === "" || visaType === undefined)) {
            ctx.addIssue({
              path: ["visaType"],
              code: "custom",
              message: "Tipo do visto é obrigatório",
            });
          }

          if (category === "Visto Americano" && (visaClass === "" || visaClass === undefined)) {
            ctx.addIssue({
              path: ["visaClass"],
              code: "custom",
              message: "Classe do visto é obrigatória",
            });
          }

          if (
            category === "Visto Americano" &&
            interviewDate &&
            (interviewTime === "" ||
              interviewTime === undefined ||
              /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/.test(interviewTime) === false)
          ) {
            ctx.addIssue({
              path: ["interviewTime"],
              code: "custom",
              message: "Horário da entrevista é obrigatório",
            });
          }

          if (
            category === "Passaporte" &&
            scheduleTime !== undefined &&
            /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/.test(scheduleTime) === false
          ) {
            ctx.addIssue({
              path: ["scheduleTime"],
              code: "custom",
              message: "Horário do agendamento inválido",
            });
          }
        })
    )
    .mutation(async (opts) => {
      const {
        profileId,
        profileName,
        profileCpf,
        profileAddress,
        birthDate,
        passport,
        issuanceDate,
        expireDate,
        DSNumber,
        CASVDate,
        interviewDate,
        interviewTime,
        taxDate,
        responsibleCpf,
        protocol,
        scheduleDate,
        scheduleTime,
        scheduleLocation,
        entryDate,
        process,
      } = opts.input;

      let visaClass;
      let visaType;
      let shipping;
      let category;
      let paymentStatus;
      let ETAStatusValue;

      switch (opts.input.visaClass) {
        case "B1 Babá":
          visaClass = VisaClass.B1;
          break;
        case "B1/B2 Turismo":
          visaClass = VisaClass.B2_B1;
          break;
        case "O1 Capacidade Extraordinária":
          visaClass = VisaClass.O1;
          break;
        case "O2 Estrangeiro Acompanhante/Assistente":
          visaClass = VisaClass.O2;
          break;
        case "O3 Cônjuge ou Filho de um O1 ou O2":
          visaClass = VisaClass.O3;
          break;
        default:
          visaClass = VisaClass.B1;
          break;
      }

      switch (opts.input.shipping) {
        case "A Verificar":
          shipping = Shipping.verifying;
          break;
        case "Retirada":
          shipping = Shipping.pickup;
          break;
        case "SEDEX":
          shipping = Shipping.sedex;
          break;
        case "C-Retirada":
          shipping = Shipping.c_pickup;
          break;
        case "C-SEDEX":
          shipping = Shipping.c_sedex;
          break;
        default:
          shipping = Shipping.verifying;
          break;
      }

      switch (opts.input.visaType) {
        case "Primeiro Visto":
          visaType = VisaType.primeiro_visto;
          break;
        case "Renovação":
          visaType = VisaType.renovacao;
          break;
        default:
          visaType = VisaType.primeiro_visto;
          break;
      }

      switch (opts.input.category) {
        case "Visto Americano":
          category = Category.american_visa;
          break;
        case "Passaporte":
          category = Category.passport;
          break;
        case "E-TA":
          category = Category.e_ta;
          break;
        default:
          category = Category.american_visa;
          break;
      }

      switch (opts.input.paymentStatus) {
        case "Pendente":
          paymentStatus = PaymentStatus.pending;
          break;
        case "Pago":
          paymentStatus = PaymentStatus.paid;
          break;
        default:
          paymentStatus = PaymentStatus.pending;
          break;
      }

      switch (opts.input.ETAStatus) {
        case "Em Análise":
          ETAStatusValue = ETAStatus.analysis;
          break;
        case "Aprovado":
          ETAStatusValue = ETAStatus.approved;
          break;
        case "Reprovado":
          ETAStatusValue = ETAStatus.disapproved;
          break;
        default:
          ETAStatusValue = ETAStatus.analysis;
          break;
      }

      console.log({ birthDate });

      const profileBirthDateFormatted = birthDate ? parse(birthDate, "dd/MM/yyyy", new Date()) : undefined;
      const profileIssuanceDateFormatted = issuanceDate ? parse(issuanceDate, "dd/MM/yyyy", new Date()) : undefined;
      const profileExpireDateFormatted = expireDate ? parse(expireDate, "dd/MM/yyyy", new Date()) : undefined;
      const profileCASVDateFormatted = CASVDate ? parse(CASVDate, "dd/MM/yyyy", new Date()) : undefined;
      const profileTaxDateFormatted = taxDate ? parse(taxDate, "dd/MM/yyyy", new Date()) : undefined;
      const profileInterviewDateFormatted = interviewDate ? parse(interviewDate, "dd/MM/yyyy", new Date()) : undefined;
      const profileScheduleDateFormatted = scheduleDate ? parse(scheduleDate, "dd/MM/yyyy", new Date()) : undefined;
      const profileEntryDateFormatted = entryDate ? parse(entryDate, "dd/MM/yyyy", new Date()) : undefined;

      const profileBirthDate = profileBirthDateFormatted
        ? fromZonedTime(profileBirthDateFormatted, "America/Sao_Paulo")
        : undefined;
      const profileIssuanceDate = profileIssuanceDateFormatted
        ? fromZonedTime(profileIssuanceDateFormatted, "America/Sao_Paulo")
        : undefined;
      const profileExpireDate = profileExpireDateFormatted
        ? fromZonedTime(profileExpireDateFormatted, "America/Sao_Paulo")
        : undefined;
      const profileCASVDate = profileCASVDateFormatted
        ? fromZonedTime(profileCASVDateFormatted, "America/Sao_Paulo")
        : undefined;
      const profileTaxDate = profileTaxDateFormatted
        ? fromZonedTime(profileTaxDateFormatted, "America/Sao_Paulo")
        : undefined;
      const profileInterviewDate = profileInterviewDateFormatted
        ? fromZonedTime(profileInterviewDateFormatted, "America/Sao_Paulo")
        : undefined;
      const profileScheduleDate = profileScheduleDateFormatted
        ? fromZonedTime(profileScheduleDateFormatted, "America/Sao_Paulo")
        : undefined;
      const profileEntryDate = profileEntryDateFormatted
        ? fromZonedTime(profileEntryDateFormatted, "America/Sao_Paulo")
        : undefined;

      console.log({ profileBirthDate });

      const clientUpdated = await prisma.profile.update({
        where: {
          id: profileId,
        },
        data: {
          DSNumber,
          name: profileName,
          visaClass,
          visaType,
          address: profileAddress,
          cpf: profileCpf,
          birthDate: profileBirthDate,
          passport,
          issuanceDate: profileIssuanceDate,
          expireDate: profileExpireDate,
          CASVDate: profileCASVDate,
          taxDate: profileTaxDate,
          shipping,
          interviewDate: profileInterviewDate,
          interviewTime,
          category,
          paymentStatus,
          ETAStatus: ETAStatusValue,
          responsibleCpf,
          protocol,
          scheduleDate: profileScheduleDate,
          scheduleTime,
          scheduleLocation,
          entryDate: profileEntryDate,
          process,
        },
        include: {
          user: {
            include: {
              profiles: true,
            },
          },
          comments: true,
          form: true,
        },
      });

      return { clientUpdated, message: "Perfil editado com sucesso" };
    }),
  archiveProfile: collaboratorProcedure
    .input(
      z.object({
        profileId: z.string().min(1, "ID do perfil é obrigatório"),
      })
    )
    .mutation(async (opts) => {
      const { profileId } = opts.input;

      await prisma.profile.update({
        where: {
          id: profileId,
        },
        data: {
          status: Status.archived,
        },
      });

      return { message: "Perfil movido para arquivos" };
    }),
  prospectProfile: collaboratorProcedure
    .input(
      z.object({
        profileId: z.string().min(1, "ID do perfil é obrigatório"),
      })
    )
    .mutation(async (opts) => {
      const { profileId } = opts.input;

      await prisma.profile.update({
        where: {
          id: profileId,
        },
        data: {
          status: Status.prospect,
        },
      });

      return { message: "Perfil movido para prospect" };
    }),
  activateProfile: collaboratorProcedure
    .input(
      z.object({
        profileId: z.string().min(1, "ID do perfil é obrigatório"),
      })
    )
    .mutation(async (opts) => {
      const { profileId } = opts.input;

      await prisma.profile.update({
        where: {
          id: profileId,
        },
        data: {
          status: Status.active,
        },
      });

      return { message: "Perfil movido para clientes ativos" };
    }),
  changePassword: adminProcedure
    .input(
      z
        .object({
          actualPassword: z.string().min(1, { message: "Senha Atual é obrigatória" }).min(6, {
            message: "Senha Atual precisa ter no mínimo 6 caracteres",
          }),
          newPassword: z.string().min(1, { message: "Nova Senha é obrigatória" }).min(6, {
            message: "Nova Senha precisa ter no mínimo 6 caracteres",
          }),
          confirmNewPassword: z.string().min(1, { message: "Confirmar Nova Senha é obrigatória" }).min(6, {
            message: "Confirmar Nova Senha precisa ter no mínimo 6 caracteres",
          }),
        })
        .superRefine(({ actualPassword, newPassword, confirmNewPassword }, ctx) => {
          if (newPassword === actualPassword) {
            ctx.addIssue({
              path: ["newPassword"],
              code: "custom",
              message: "A Nova Senha precisa ser diferente da senha atual",
            });
          }

          if (confirmNewPassword !== newPassword) {
            ctx.addIssue({
              path: ["confirmNewPassword"],
              code: "custom",
              message: "As senhas não coincidem",
            });
          }
        })
    )
    .mutation(async (opts) => {
      const { actualPassword, newPassword } = opts.input;
      const email = opts.ctx.admin.email;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return { error: true, message: "Usuário não encontrado" };
      }

      const isPasswordCorrect: boolean = await bcrypt.compare(actualPassword, user.password);

      if (!isPasswordCorrect) {
        return { error: true, message: "Senha inválida" };
      }

      const pwHash = await bcrypt.hash(newPassword, 12);

      await prisma.user.update({
        where: {
          email,
        },
        data: {
          password: pwHash,
        },
      });

      return { error: false, message: "Senha alterada com sucesso" };
    }),
});
