import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, name, password, confirmPassword } = await req.json();

    if (!email || !name || !password || !confirmPassword) {
      return new Response("Dados inválidos", { status: 400 });
    }

    if (password !== confirmPassword) {
      return new Response("Senhas não coincidem, verifique e tente novamente", { status: 401 });
    }

    const pwHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: pwHash,
        role: Role.ADMIN,
      },
    });

    if (!user) {
      return new Response("Ocorreu um erro ao realizar o cadastro", {
        status: 401,
      });
    }

    const users = await prisma.user.findMany({
      where: {
        NOT: {
          role: {
            equals: Role.ADMIN,
          },
        },
      },
    });

    return Response.json({ users, email, password }, { status: 200 });
  } catch (error) {
    console.log("[ERROR_ON_REGISTER]", error);

    return new Response("Ocorreu um erro ao realizar o cadastro", {
      status: 500,
    });
  }
}
