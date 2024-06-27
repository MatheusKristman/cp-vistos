import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prisma";
import { PreviousJobs } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { previousJobs }: { previousJobs: PreviousJobs[] } = await req.json();
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

    await prisma.previousJobs.create({
      data: {
        admissionDate: null,
        companyAddress: "",
        companyCep: "",
        companyCity: "",
        companyCountry: "",
        companyName: "",
        companyState: "",
        companyTel: "",
        jobDescription: "",
        office: "",
        resignationDate: null,
        supervisorName: "",
        form: {
          connect: {
            id: currentForm.id,
          },
        },
      },
    });

    const updatedPreviousJobs = await prisma.previousJobs.findMany({
      where: {
        formId: currentForm.id,
      },
    });

    return Response.json({ updatedPreviousJobs }, { status: 200 });
  } catch (error) {
    console.log("[ERROR_CREATE_PREVIOUS_JOBS]", error);

    return new Response("Ocorreu um erro ao gerar um novo item", { status: 500 });
  }
}
