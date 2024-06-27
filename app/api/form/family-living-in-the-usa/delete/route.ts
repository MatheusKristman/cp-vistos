import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prisma";
import { FamilyLivingInTheUSADetails } from "@prisma/client";

export async function PUT(req: Request) {
  try {
    const {
      familyLivingInTheUSAId,
      familyLivingInTheUSA,
    }: { familyLivingInTheUSAId: string; familyLivingInTheUSA: FamilyLivingInTheUSADetails[] } = await req.json();

    if (!familyLivingInTheUSAId) {
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
      familyLivingInTheUSA.map(async (item) => {
        await prisma.familyLivingInTheUSADetails.update({
          where: {
            id: item.id,
          },
          data: {
            name: item.name,
            relation: item.relation,
            situation: item.situation,
          },
        });
      })
    );

    await prisma.familyLivingInTheUSADetails.delete({
      where: {
        id: familyLivingInTheUSAId,
        formId: currentForm.id,
      },
    });

    const updatedFamilyLivingInTheUSA = await prisma.familyLivingInTheUSADetails.findMany({
      where: {
        formId: currentForm.id,
      },
    });

    return Response.json({ updatedFamilyLivingInTheUSA }, { status: 200 });
  } catch (error) {
    console.log("[ERROR_DELETE_FAMILY_LIVING_IN_THE_USA]", error);

    return new Response("Ocorreu um erro ao deletar o item", { status: 500 });
  }
}
