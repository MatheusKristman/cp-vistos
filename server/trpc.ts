import { initTRPC, TRPCError } from "@trpc/server";
import { Role } from "@prisma/client";
import superjson from "superjson";

import { Context } from "./context";
import prisma from "@/lib/prisma";

const trpc = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = trpc.router;
export const publicProcedure = trpc.procedure;
export const adminProcedure = trpc.procedure.use(async function isAdmin(opts) {
  const { ctx } = opts;

  if (!ctx.user || !ctx.user.user?.email) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const email = ctx.user.user?.email;

  if (!email) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const admin = await prisma.user.findFirst({
    where: {
      email,
      role: Role.ADMIN,
    },
  });

  if (!admin) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      admin,
    },
  });
});
export const collaboratorProcedure = trpc.procedure.use(async function isCollaborator(opts) {
  const { ctx } = opts;

  if (!ctx.user || !ctx.user.user?.email) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const email = ctx.user.user?.email;

  if (!email) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const collaborator = await prisma.user.findFirst({
    where: {
      email,
      OR: [
        {
          role: Role.ADMIN,
        },
        {
          role: Role.COLLABORATOR,
        },
      ],
    },
  });

  if (!collaborator) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      collaborator,
    },
  });
});
export const isUserAuthedProcedure = trpc.procedure.use(async function isAuthed(opts) {
  const { ctx } = opts;

  if (!ctx.user || !ctx.user.user?.email) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      user: ctx.user,
    },
  });
});
