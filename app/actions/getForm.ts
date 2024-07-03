import prisma from "@/lib/prisma";
import getCurrentUser from "./getCurrentUser";

export default async function getForm(formId: string) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    if (!formId) {
      return null;
    }

    const selectedAdditionalForm = await prisma.form.findFirst({
      where: {
        id: formId,
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

    return selectedAdditionalForm;
  } catch (error) {
    return null;
  }
}
