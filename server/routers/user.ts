import { z } from "zod";
import bcrypt from "bcryptjs";

import {
  adminProcedure,
  collaboratorProcedure,
  publicProcedure,
  router,
} from "../trpc";
import prisma from "@/lib/prisma";
import {
  BudgetPaid,
  Role,
  ScheduleAccount,
  VisaClass,
  VisaType,
} from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const userRouter = router({
  createClient: adminProcedure
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
        cel: z
          .string({
            required_error: "Celular é obrigatório",
            invalid_type_error: "Celular inválido",
          })
          .optional()
          .refine(
            (val) => !val || (val && (val.length === 0 || val.length === 14)),
            {
              message: "Celular inválido",
            },
          ),
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
                  { message: "Classe de visto inválida" },
                )
                .refine((val) => val.length !== 0, {
                  message: "Classe de visto é obrigatória",
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
            }),
          )
          .min(1, {
            message: "Precisa ter pelo menos um perfil vinculado a conta",
          }),
      }),
    )
    .mutation(async (opts) => {
      let scheduleAccount;
      let budgetPaid;

      const { input } = opts;

      const pwHash = await bcrypt.hash(input.password, 12);

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
          password: pwHash,
          role: Role.CLIENT,
          address: input.address,
          budget: parseFloat(input.budget),
          budgetPaid,
          cpf: input.cpf,
          scheduleAccount,
        },
      });

      const profilesPromises = input.profiles.map((profile) => {
        let visaClass;
        let visaType;

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

        return prisma.profile.create({
          data: {
            DSNumber: parseInt(profile.DSNumber),
            name: profile.profileName,
            visaClass,
            visaType,
            address: profile.profileAddress,
            cpf: profile.profileCpf,
            birthDate: profile.birthDate,
            passport: profile.passport,
            issuanceDate: profile.issuanceDate,
            expireDate: profile.expireDate,
            CASVDate: profile.CASVDate,
            interviewDate: profile.interviewDate,
            user: {
              connect: {
                id: account.id,
              },
            },
          },
        });
      });

      await Promise.all(profilesPromises);

      return { message: "Conta criada com sucesso" };
    }),
  getClients: collaboratorProcedure.query(async () => {
    const profiles = await prisma.profile.findMany({
      include: {
        user: true,
        form: true,
      },
    });

    if (profiles.length === 0) {
      return { clients: [] };
    }

    const clients = profiles.map((profile) => ({
      id: profile.id,
      CASVDate: profile.CASVDate,
      interviewDate: profile.interviewDate,
      meetingDate: profile.meetingDate,
      name: profile.name,
      scheduleAccount: profile.user.scheduleAccount!,
      statusDS: profile.statusDS,
      tax: !!profile.taxDate,
      visaType: profile.visaType,
    }));

    return { clients };
  }),
  getClientDetails: collaboratorProcedure
    .input(
      z.object({
        profileId: z.string().min(1),
      }),
    )
    .mutation(async (opts) => {
      const profileId = opts.input.profileId;

      const client = await prisma.profile.findUnique({
        where: {
          id: profileId,
        },
        include: {
          user: true,
          comments: true,
          form: {
            include: {
              otherPeopleTraveling: true,
              familyLivingInTheUSA: true,
              americanLicense: true,
              USALastTravel: true,
              previousJobs: true,
              courses: true,
            },
          },
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
      }),
    )
    .mutation(async (opts) => {
      const profileId = opts.input.profileId;

      const updatedClient = await prisma.profile.update({
        where: {
          id: profileId,
        },
        data: {
          DSValid: new Date(),
        },
        include: {
          user: true,
          comments: true,
          form: {
            include: {
              otherPeopleTraveling: true,
              familyLivingInTheUSA: true,
              americanLicense: true,
              USALastTravel: true,
              previousJobs: true,
              courses: true,
            },
          },
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
      }),
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
          user: true,
          comments: true,
          form: {
            include: {
              otherPeopleTraveling: true,
              familyLivingInTheUSA: true,
              americanLicense: true,
              USALastTravel: true,
              previousJobs: true,
              courses: true,
            },
          },
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
      }),
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
          user: true,
          comments: true,
          form: {
            include: {
              otherPeopleTraveling: true,
              familyLivingInTheUSA: true,
              americanLicense: true,
              USALastTravel: true,
              previousJobs: true,
              courses: true,
            },
          },
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
});
