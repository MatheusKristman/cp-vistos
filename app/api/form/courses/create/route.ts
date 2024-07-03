import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prisma";
import { Course } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { courses, formId }: { courses: Course[]; formId: string } = await req.json();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Usuário não autorizado", { status: 401 });
    }

    if (!formId) {
      return new Response("Dados inválidos", { status: 404 });
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

    await prisma.course.create({
      data: {
        address: "",
        city: "",
        cep: "",
        country: "",
        courseName: "",
        finishDate: null,
        initialDate: null,
        institutionName: "",
        state: "",
        form: {
          connect: {
            id: formId,
          },
        },
      },
    });

    const updatedCourses = await prisma.course.findMany({
      where: {
        formId: formId,
      },
    });

    return Response.json({ updatedCourses }, { status: 200 });
  } catch (error) {
    console.log("[ERROR_CREATE_COURSES]", error);

    return new Response("Ocorreu um erro ao gerar um novo item", { status: 500 });
  }
}
