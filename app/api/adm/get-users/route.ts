import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "ADMIN") {
      return new Response("Usuário não autorizado", { status: 401 });
    }

    const users = await prisma.user.findMany({
      where: {
        role: Role.USER,
      },
      include: {
        form: true,
      },
    });

    return Response.json({ users }, { status: 200 });
  } catch (error) {
    console.log("[ERROR_ON_GET_USERS]", error);

    return new Response("Ocorreu um erro ao resgatar os usuários", {
      status: 500,
    });
  }
}
