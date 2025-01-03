import { z } from "zod";
import bcrypt from "bcryptjs";
import { BudgetPaid, Category, Role, ScheduleAccount, VisaClass, VisaType } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { addDays } from "date-fns";

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
          .min(1, "Grupo é obrigatório"),
        cel: z
          .string({
            required_error: "Celular é obrigatório",
            invalid_type_error: "Celular inválido",
          })
          .optional()
          .refine((val) => !val || (val && (val.length === 0 || val.length === 14)), {
            message: "Celular inválido",
          }),
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
            z.object({
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
                .date({
                  required_error: "Data de nascimento é obrigatório",
                  invalid_type_error: "Data de nascimento inválida",
                })
                .optional(),
              passport: z.string({
                required_error: "Passaporte é obrigatório",
                invalid_type_error: "Passaporte inválido",
              }),
              visaType: z
                .enum(["Renovação", "Primeiro Visto", ""], {
                  message: "Tipo de visto inválido",
                })
                .refine((val) => val.length !== 0, {
                  message: "Tipo de visto é obrigatório",
                }),
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
                .refine((val) => val.length !== 0, {
                  message: "Classe de visto é obrigatória",
                }),
              category: z.enum(["Visto Americano", "Passaporte", "E-TA", ""]).refine((val) => val.length !== 0, {
                message: "Categoria é obrigatória",
              }),
              issuanceDate: z
                .date({
                  required_error: "Data de Emissão é obrigatória",
                  invalid_type_error: "Data de Emissão inválida",
                })
                .optional(),
              expireDate: z
                .date({
                  required_error: "Data de Expiração é obrigatória",
                  invalid_type_error: "Data de Expiração inválida",
                })
                .optional(),
              DSNumber: z.string({
                required_error: "Barcode é obrigatório",
                invalid_type_error: "Barcode inválido",
              }),
              CASVDate: z
                .date({
                  required_error: "Data do CASV é obrigatória",
                  invalid_type_error: "Data do CASV inválida",
                })
                .optional(),
              interviewDate: z
                .date({
                  required_error: "Data da entrevista é obrigatória",
                  invalid_type_error: "Data da entrevista inválida",
                })
                .optional(),
              interviewTime: z
                .string({
                  required_error: "Horário da entrevista é obrigatório",
                  invalid_type_error: "Horário da entrevista inválido",
                })
                .regex(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/, "Horário da entrevista inválido")
                .optional(),
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
          email: input.email,
          password: input.password,
          emailScheduleAccount: input.emailScheduleAccount,
          passwordScheduleAccount: input.passwordScheduleAccount,
          group: input.group,
          role: Role.CLIENT,
          address: input.address,
          budget: parseFloat(input.budget),
          budgetPaid,
          cpf: input.cpf,
          scheduleAccount,
        },
      });

      const profilesPromises = input.profiles.map(async (profile) => {
        let visaClass;
        let visaType;
        let category;

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

        const newProfile = await prisma.profile.create({
          data: {
            DSValid: addDays(new Date(), 30),
            DSNumber: profile.DSNumber,
            name: profile.profileName,
            address: profile.profileAddress,
            cpf: profile.profileCpf,
            birthDate: profile.birthDate,
            passport: profile.passport,
            issuanceDate: profile.issuanceDate,
            expireDate: profile.expireDate,
            CASVDate: profile.CASVDate,
            interviewDate: profile.interviewDate,
            interviewTime: profile.interviewTime,
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

        await prisma.form.create({
          data: {
            profile: {
              connect: {
                id: newProfile.id,
              },
            },
          },
        });

        return newProfile;
      });

      await Promise.all(profilesPromises);

      return { message: "Conta criada com sucesso" };
    }),
  addProfile: collaboratorProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        profileName: z.string().min(1).min(6),
        profileCpf: z.string().refine((val) => val.length > 0 && val.length === 14),
        profileAddress: z.string(),
        birthDate: z.date().optional(),
        passport: z.string(),
        visaType: z.enum(["Renovação", "Primeiro Visto", ""]).refine((val) => val.length !== 0),
        visaClass: z
          .enum([
            "B1 Babá",
            "B1/B2 Turismo",
            "O1 Capacidade Extraordinária",
            "O2 Estrangeiro Acompanhante/Assistente",
            "O3 Cônjuge ou Filho de um O1 ou O2",
            "",
          ])
          .refine((val) => val.length !== 0),
        category: z.enum(["Visto Americano", "Passaporte", "E-TA", ""]).refine((val) => val.length !== 0, {
          message: "Categoria é obrigatória",
        }),
        issuanceDate: z.date().optional(),
        expireDate: z.date().optional(),
        DSNumber: z.string(),
        CASVDate: z.date().optional(),
        interviewDate: z.date().optional(),
        interviewTime: z
          .string()
          .regex(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/, "Horário da entrevista inválido")
          .optional(),
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
        CASVDate,
        interviewDate,
        interviewTime,
      } = opts.input;
      let visaClass;
      let visaType;
      let category;

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

      const profileUpdated = await prisma.profile.create({
        data: {
          DSValid: addDays(new Date(), 30),
          DSNumber,
          name: profileName,
          address: profileAddress,
          cpf: profileCpf,
          birthDate,
          passport,
          issuanceDate,
          expireDate,
          CASVDate,
          interviewDate,
          interviewTime,
          visaClass,
          visaType,
          category,
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

      await prisma.form.create({
        data: {
          profile: {
            connect: {
              id: profileUpdated!.id,
            },
          },
        },
      });

      return {
        clientUpdated: profileUpdated,
        message: "Perfil criado com sucesso",
      };
    }),
  getClients: collaboratorProcedure
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

      return { client };
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
          DSValid: addDays(new Date(), 30),
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
        status: z.enum(["awaiting", "approved", "disapproved"]),
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
            .refine((val) => !val || (val && (val.length === 0 || val.length === 14))),
          address: z.string(),
          email: z.string().email().min(1),
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
      z.object({
        profileId: z.string().min(1),
        profileName: z.string().min(1).min(6),
        profileCpf: z.string().refine((val) => val.length > 0 && val.length === 14),
        profileAddress: z.string(),
        birthDate: z.date().optional(),
        passport: z.string(),
        visaType: z.enum(["Renovação", "Primeiro Visto", ""]).refine((val) => val.length !== 0),
        visaClass: z
          .enum([
            "B1 Babá",
            "B1/B2 Turismo",
            "O1 Capacidade Extraordinária",
            "O2 Estrangeiro Acompanhante/Assistente",
            "O3 Cônjuge ou Filho de um O1 ou O2",
            "",
          ])
          .refine((val) => val.length !== 0),
        issuanceDate: z.date().optional(),
        expireDate: z.date().optional(),
        DSNumber: z.string(),
        CASVDate: z.date().optional(),
        interviewDate: z.date().optional(),
        interviewTime: z
          .string()
          .regex(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/, "Horário da entrevista inválido")
          .optional(),
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
      } = opts.input;

      let visaClass;
      let visaType;

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
          birthDate,
          passport,
          issuanceDate,
          expireDate,
          CASVDate,
          interviewDate,
          interviewTime,
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
});
