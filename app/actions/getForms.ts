import prisma from "@/lib/prisma";
import getCurrentUser from "./getCurrentUser";

export default async function getForms() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const forms = await prisma.form.findMany({
      where: {
        userId: currentUser.id,
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

    return forms;
  } catch (error) {
    return [];
  }
}
