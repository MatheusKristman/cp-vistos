import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prisma";
import { USALastTravel } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { usaLastTravel, formId }: { usaLastTravel: USALastTravel[]; formId: string } = await req.json();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Usuário não autorizado", { status: 401 });
    }

    if (!formId) {
      return new Response("Dados inválidos", { status: 404 });
    }

    await Promise.all(
      usaLastTravel.map(async (item) => {
        await prisma.uSALastTravel.update({
          where: {
            id: item.id,
          },
          data: {
            arriveDate: item.arriveDate,
            estimatedTime: item.estimatedTime,
          },
        });
      })
    );

    await prisma.uSALastTravel.create({
      data: {
        arriveDate: null,
        estimatedTime: "",
        form: {
          connect: {
            id: formId,
          },
        },
      },
    });

    const updatedUSALastTravel = await prisma.uSALastTravel.findMany({
      where: {
        formId: formId,
      },
    });

    return Response.json({ updatedUSALastTravel }, { status: 200 });
  } catch (error) {
    console.log("ERROR_CREATE_USA_LAST_TRAVEL", error);

    return new Response("Ocorreu um erro ao gerar um novo item", { status: 500 });
  }
}
