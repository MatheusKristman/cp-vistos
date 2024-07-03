import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prisma";
import { USALastTravel } from "@prisma/client";

export async function PUT(req: Request) {
  try {
    const {
      usaLastTravelId,
      usaLastTravel,
      formId,
    }: { usaLastTravelId: string; usaLastTravel: USALastTravel[]; formId: string } = await req.json();

    if (!usaLastTravelId) {
      return new Response("Dados inválidos", { status: 401 });
    }

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Usuário não autorizado", { status: 401 });
    }

    if (!formId) {
      return new Response("Formulário não localizado", { status: 404 });
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

    await prisma.uSALastTravel.delete({
      where: {
        id: usaLastTravelId,
        formId: formId,
      },
    });

    const updatedUSALastTravel = await prisma.uSALastTravel.findMany({
      where: {
        formId: formId,
      },
    });

    return Response.json({ updatedUSALastTravel }, { status: 200 });
  } catch (error) {
    console.log("ERROR_ON_USA_LAST_TRAVEL_DELETE", error);

    return new Response("Ocorreu um erro ao deletar o item", { status: 500 });
  }
}
