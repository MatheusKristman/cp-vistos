import prisma from "@/lib/prisma";
import getCurrentUser from "./getCurrentUser";

export default async function getPrimaryForm() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const form = await prisma.form.findFirst({
      where: {
        userId: currentUser.id,
        order: 0,
      },
    });

    return form;
  } catch (error) {
    return null;
  }
}
