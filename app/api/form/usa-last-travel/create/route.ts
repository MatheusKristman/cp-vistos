import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prisma";
import { USALastTravel } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { usaLastTravel }: { usaLastTravel: USALastTravel[] } = await req.json();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Usuário não autorizado", { status: 401 });
    }

    const currentForm = await prisma.form.findFirst({
      where: {
        userId: currentUser.id,
      },
    });

    if (!currentForm) {
      return new Response("Dados inválidos", { status: 404 });
    }

    await Promise.all(
      usaLastTravel.map(async (item) => {
        await prisma.USALastTravel.update({
          where: {
            id: item.id,
          },
          data: {
            arriveDate: null,
            estimatedTime: "",
          },
        });
      })
    );

    await prisma.USALastTravel.create({
      data: {
        arriveDate: null,
        estimatedTime: "",
        form: {
          connect: {
            id: currentForm.id,
          },
        },
      },
    });

    const updatedUSALastTravel = await prisma.USALastTravel.findMany({
      where: {
        formId: currentForm.id,
      },
    });

    return Response.json({ updatedUSALastTravel }, { status: 200 });
  } catch (error) {
    console.log("ERROR_CREATE_USA_LAST_TRAVEL", error);

    return new Response("Ocorreu um erro ao gerar um novo item", { status: 500 });
  }
}
