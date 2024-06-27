import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prisma";
import { Course } from "@prisma/client";

export async function PUT(req: Request) {
  try {
    const { coursesId, courses }: { coursesId: string; courses: Course[] } = await req.json();

    if (!coursesId) {
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
      courses.map(async (item) => {
        await prisma.course.update({
          where: {
            id: item.id,
          },
          data: {
            address: item.address,
            city: item.city,
            cep: item.cep,
            country: item.country,
            courseName: item.courseName,
            finishDate: item.finishDate,
            initialDate: item.initialDate,
            institutionName: item.institutionName,
            state: item.state,
          },
        });
      })
    );

    await prisma.course.delete({
      where: {
        id: coursesId,
        formId: currentForm.id,
      },
    });

    const updatedCourses = await prisma.course.findMany({
      where: {
        formId: currentForm.id,
      },
    });

    return Response.json({ updatedCourses }, { status: 200 });
  } catch (error) {
    console.log("[ERROR_DELETE_COURSES]", error);

    return new Response("Ocorreu um erro ao deletar o item", { status: 500 });
  }
}
