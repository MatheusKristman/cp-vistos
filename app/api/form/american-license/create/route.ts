import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prisma";
import { AmericanLicense } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { americanLicense }: { americanLicense: AmericanLicense[] } = await req.json();
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
      americanLicense.map(async (item) => {
        await prisma.americanLicense.update({
          where: {
            id: item.id,
          },
          data: {
            licenseNumber: item.licenseNumber,
            state: item.state,
          },
        });
      })
    );

    await prisma.americanLicense.create({
      data: {
        licenseNumber: "",
        state: "",
        form: {
          connect: {
            id: currentForm.id,
          },
        },
      },
    });

    const updatedAmericanLicense = await prisma.americanLicense.findMany({
      where: {
        formId: currentForm.id,
      },
    });

    return Response.json({ updatedAmericanLicense }, { status: 200 });
  } catch (error) {
    console.log("ERROR_CREATE_AMERICAN_LICENSE", error);

    return new Response("Ocorreu um erro ao gerar um novo item", { status: 500 });
  }
}
