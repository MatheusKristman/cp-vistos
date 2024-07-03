import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prisma";
import { FamilyLivingInTheUSADetails } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { familyLivingInTheUSA, formId }: { familyLivingInTheUSA: FamilyLivingInTheUSADetails[]; formId: string } =
      await req.json();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Usuário não autorizado", { status: 401 });
    }

    if (!formId) {
      return new Response("Dados inválidos", { status: 404 });
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

    await prisma.familyLivingInTheUSADetails.create({
      data: {
        name: "",
        relation: "",
        situation: "",
        form: {
          connect: {
            id: formId,
          },
        },
      },
    });

    const updatedFamilyLivingInTheUSA = await prisma.familyLivingInTheUSADetails.findMany({
      where: {
        formId: formId,
      },
    });

    return Response.json({ updatedFamilyLivingInTheUSA }, { status: 200 });
  } catch (error) {
    console.log("[ERROR_CREATE_FAMILY_LIVING_IN_THE_USA]", error);

    return new Response("Ocorreu um erro ao gerar um item", { status: 500 });
  }
}
