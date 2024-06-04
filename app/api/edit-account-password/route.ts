import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function PUT(req: Request) {
  try {
    const { email, newPassword, confirmNewPassword } = await req.json();

    if (!email || !newPassword || !confirmNewPassword) {
      return new Response("Dados inválidos", { status: 400 });
    }

    if (newPassword !== confirmNewPassword) {
      return new Response("Senhas não coincidem, verifique e tente novamente", { status: 401 });
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userExists) {
      return new Response("Usuário não encontrado", { status: 404 });
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: {
        email: userExists.email,
      },
      data: {
        password: passwordHash,
      },
    });

    const users = await prisma.user.findMany({
      where: {
        NOT: {
          role: Role.ADMIN,
        }
      }
    });

    return Response.json({ users, email, password: newPassword }, { status: 200 });
  } catch (error) {
    console.log("[ERROR_EDIT_ACCOUNT_PASSWORD]", error);

    return new Response("Ocorreu um erro ao editar a senha do usuário", { status: 500 });
  }
}