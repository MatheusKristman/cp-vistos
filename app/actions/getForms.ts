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
    });

    return forms;
  } catch (error) {
    return [];
  }
}
