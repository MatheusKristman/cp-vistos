import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prisma";
import { PreviousJobs } from "@prisma/client";

export async function PUT(req: Request) {
  try {
    const { previousJobsId, previousJobs }: { previousJobsId: string; previousJobs: PreviousJobs[] } = await req.json();

    if (!previousJobsId) {
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
      previousJobs.map(async (item) => {
        await prisma.previousJobs.update({
          where: {
            id: item.id,
          },
          data: {
            admissionDate: item.admissionDate,
            companyAddress: item.companyAddress,
            companyCep: item.companyCep,
            companyCity: item.companyCity,
            companyCountry: item.companyCountry,
            companyName: item.companyName,
            companyState: item.companyState,
            companyTel: item.companyTel,
            jobDescription: item.jobDescription,
            office: item.office,
            resignationDate: item.resignationDate,
            supervisorName: item.supervisorName,
          },
        });
      })
    );

    await prisma.previousJobs.delete({
      where: {
        id: previousJobsId,
        formId: currentForm.id,
      },
    });

    const updatedPreviousJobs = await prisma.previousJobs.findMany({
      where: {
        formId: currentForm.id,
      },
    });

    return Response.json({ updatedPreviousJobs }, { status: 200 });
  } catch (error) {
    console.log("[ERROR_DELETE_PREVIOUS_JOBS]", error);

    return new Response("Ocorreu um erro ao deletar o item", { status: 500 });
  }
}
