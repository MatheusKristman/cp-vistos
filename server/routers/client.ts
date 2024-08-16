import { TRPCError } from "@trpc/server";
import { isUserAuthedProcedure, router } from "../trpc";
import prisma from "@/lib/prisma";

export const clientRouter = router({
  getProfiles: isUserAuthedProcedure.query(async (opts) => {
    const { user } = opts.ctx.user;
    const email = user?.email;

    if (!email) {
      throw new TRPCError({ code: "NOT_IMPLEMENTED", message: "Usuário não encontrado" });
    }

    const account = await prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        profiles: true,
      },
    });

    if (!account) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Conta não encontrada" });
    }

    return { profiles: account.profiles };
  }),
});
