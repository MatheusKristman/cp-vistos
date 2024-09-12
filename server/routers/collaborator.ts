import { z } from "zod";
import bcrypt from "bcryptjs";

import { adminProcedure, router } from "../trpc";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

export const collaboratorRouter = router({
  getCollaborators: adminProcedure.query(async (opts) => {
    const collaborators = await prisma.user.findMany({
      where: {
        role: Role.COLLABORATOR,
      },
    });

    return { collaborators };
  }),
  getCollaborator: adminProcedure
    .input(
      z.object({
        id: z.string().min(1),
      })
    )
    .mutation(async (opts) => {
      const { id } = opts.input;

      const collaborator = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      return { collaborator };
    }),
  registerCollaborator: adminProcedure
    .input(
      z
        .object({
          name: z.string().min(1).min(6),
          email: z.string().min(1).email(),
          password: z.string().min(1).min(6),
          passwordConfirm: z.string().min(1).min(6),
        })
        .superRefine(({ password, passwordConfirm }, ctx) => {
          if (passwordConfirm !== password) {
            ctx.addIssue({
              path: ["passwordConfirm"],
              code: "custom",
            });
          }
        })
    )
    .mutation(async (opts) => {
      const { name, email, password } = opts.input;

      const pwHash = await bcrypt.hash(password, 12);

      await prisma.user.create({
        data: {
          name,
          email,
          password: pwHash,
          role: Role.COLLABORATOR,
        },
      });

      return { message: "Colaborador cadastrado com sucesso" };
    }),
  editCollaborator: adminProcedure
    .input(
      z
        .object({
          collaboratorId: z.string().min(1),
          name: z.string().min(1).min(6),
          email: z.string().min(1).email(),
          password: z.string(),
          passwordConfirm: z.string(),
        })
        .superRefine(({ password, passwordConfirm }, ctx) => {
          if (password.length > 0 && password.length < 6) {
            ctx.addIssue({
              path: ["password"],
              code: "custom",
            });
          }

          if (passwordConfirm.length > 0 && passwordConfirm.length < 6) {
            ctx.addIssue({
              path: ["passwordConfirm"],
              code: "custom",
            });
          }

          if (passwordConfirm !== password) {
            ctx.addIssue({
              path: ["passwordConfirm"],
              code: "custom",
            });
          }
        })
    )
    .mutation(async (opts) => {
      const { collaboratorId, name, email, password } = opts.input;

      if (password.length > 0) {
        const pwHash = await bcrypt.hash(password, 12);

        await prisma.user.update({
          where: {
            id: collaboratorId,
          },
          data: {
            name,
            email,
            password: pwHash,
          },
        });
      } else {
        await prisma.user.update({
          where: {
            id: collaboratorId,
          },
          data: {
            name,
            email,
          },
        });
      }

      return { message: "Colaborador editado com sucesso" };
    }),
  deleteCollaborator: adminProcedure
    .input(
      z.object({
        id: z.string().min(1),
      })
    )
    .mutation(async (opts) => {
      const { id } = opts.input;

      await prisma.user.delete({
        where: {
          id,
        },
      });

      return { message: "Colaborador excluido" };
    }),
});
