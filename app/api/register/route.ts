import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new Response("Dados inválidos", { status: 400 });
    }

    const pwHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: pwHash,
      },
    });

    if (!user) {
      return new Response("Ocorreu um erro ao realizar o cadastro", {
        status: 401,
      });
    }

    return Response.json(user, { status: 200 });
  } catch (error) {
    console.log("[ERROR_ON_REGISTER]", error);

    return new Response("Ocorreu um erro ao realizar o cadastro", {
      status: 500,
    });
  }
}
