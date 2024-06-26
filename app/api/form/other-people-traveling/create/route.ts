import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prisma";
import { OtherPeopleTraveling } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { otherPeopleTraveling }: { otherPeopleTraveling: OtherPeopleTraveling[] } = await req.json();
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

    await prisma.otherPeopleTraveling.create({
      data: {
        name: "",
        relation: "",
        form: {
          connect: {
            id: currentForm.id,
          },
        },
      },
    });

    const updatedOtherPeopleTraveling = await prisma.otherPeopleTraveling.findMany({
      where: {
        formId: currentForm.id,
      },
    });

    return Response.json({ updatedOtherPeopleTraveling }, { status: 200 });
  } catch (error) {
    console.log("[ERROR_CREATE_OTHER_PEOPLE_TRAVELING]", error);

    return new Response("Ocorreu um erro ao gerar um novo item", { status: 500 });
  }
}
