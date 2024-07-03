import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prisma";
import { AmericanLicense } from "@prisma/client";

export async function PUT(req: Request) {
  try {
    const {
      americanLicenseId,
      americanLicense,
      formId,
    }: { americanLicenseId: string; americanLicense: AmericanLicense[]; formId: string } = await req.json();

    if (!americanLicenseId) {
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

    await prisma.americanLicense.delete({
      where: {
        id: americanLicenseId,
        formId: formId,
      },
    });

    const updatedAmericanLicense = await prisma.americanLicense.findMany({
      where: {
        formId: formId,
      },
    });

    return Response.json({ updatedAmericanLicense }, { status: 200 });
  } catch (error) {
    console.log("ERROR_ON_AMERICA_LICENSE_DELETE", error);

    return new Response("Ocorreu um erro ao deletar o item", { status: 500 });
  }
}
