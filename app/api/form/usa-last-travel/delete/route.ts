import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prisma";
import { USALastTravel } from "@prisma/client";

export async function PUT(req: Request) {
  try {
    const { usaLastTravelId, usaLastTravel }: { usaLastTravelId: string; usaLastTravel: USALastTravel[] } =
      await req.json();

    if (!usaLastTravelId) {
      return new Response("Dados inválidos", { status: 401 });
    }

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
      return new Response("Formulário não localizado", { status: 404 });
    }

    await Promise.all(
      usaLastTravel.map(async (item) => {
        await prisma.USALastTravel.update({
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

    await prisma.USALastTravel.delete({
      where: {
        id: usaLastTravelId,
        formId: currentForm.id,
      },
    });

    const updatedUSALastTravel = await prisma.USALastTravel.findMany({
      where: {
        formId: currentForm.id,
      },
    });

    return Response.json({ updatedUSALastTravel }, { status: 200 });
  } catch (error) {
    console.log("ERROR_ON_USA_LAST_TRAVEL_DELETE", error);

    return new Response("Ocorreu um erro ao deletar o item", { status: 500 });
  }
}
