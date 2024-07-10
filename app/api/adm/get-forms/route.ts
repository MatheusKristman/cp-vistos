import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();
    const currentUser = await getCurrentUser();

    if (!userId) {
      return new Response("Dados inválidos", { status: 401 });
    }

    if (!currentUser || currentUser.role !== "ADMIN") {
      return new Response("Usuário não autorizado", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return new Response("Usuário não localizado", { status: 404 });
    }

    if (user.primaryFormCreated === false) {
      return Response.json({ primaryFormCreated: false }, { status: 200 });
    }

    const forms = await prisma.form.findMany({
      where: {
        userId,
      },
      include: {
        otherPeopleTraveling: true,
        USALastTravel: true,
        americanLicense: true,
        familyLivingInTheUSA: true,
        previousJobs: true,
        courses: true,
      },
    });

    return Response.json({ primaryFormCreated: true, forms }, { status: 200 });
  } catch (error) {
    console.log("[ERROR_ON_GET_FORMS]", error);

    return new Response("Erro ao resgatar os formulário", { status: 500 });
  }
}
