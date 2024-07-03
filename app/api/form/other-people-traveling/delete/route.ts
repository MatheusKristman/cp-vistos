import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prisma";
import { OtherPeopleTraveling } from "@prisma/client";

export async function PUT(req: Request) {
  try {
    const {
      otherPeopleTravelingId,
      otherPeopleTraveling,
      formId,
    }: { otherPeopleTravelingId: string; otherPeopleTraveling: OtherPeopleTraveling[]; formId: string } =
      await req.json();

    if (!otherPeopleTravelingId) {
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
      otherPeopleTraveling.map(async (item) => {
        await prisma.otherPeopleTraveling.update({
          where: {
            id: item.id,
          },
          data: {
            name: item.name,
            relation: item.relation,
          },
        });
      })
    );

    await prisma.otherPeopleTraveling.delete({
      where: {
        id: otherPeopleTravelingId,
        formId: formId,
      },
    });

    const updatedOtherPeopleTraveling = await prisma.otherPeopleTraveling.findMany({
      where: {
        formId: formId,
      },
    });

    return Response.json({ updatedOtherPeopleTraveling }, { status: 200 });
  } catch (error) {
    console.error("ERROR_DELETE_OTHER_PEOPLE_TRAVELING", error);

    return new Response("Ocorreu um erro ao deletar o item", { status: 500 });
  }
}
