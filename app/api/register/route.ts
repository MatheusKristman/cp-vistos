import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return new Response("Dados inválidos", { status: 400 });
    }

    const pwHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: pwHash,
        role: role === "admin" ? Role.ADMIN : Role.USER,
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
