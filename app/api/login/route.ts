import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response("Dados inválidos, verifique e tente novamente", {
        status: 401,
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return new Response("Usuário não esta cadastrado", { status: 404 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return new Response("Dados inválidos, verifique e tente novamente", {
        status: 401,
      });
    }

    return Response.json(user, { status: 200 });
  } catch (error) {
    console.log("[ERROR_ON_LOGIN]", error);

    return new Response("Ocorreu um erro ao realizar a autenticação", {
      status: 500,
    });
  }
}
