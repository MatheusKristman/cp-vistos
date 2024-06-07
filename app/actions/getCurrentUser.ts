import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export default async function getCurrentUser() {
  try {
    const session = await auth();
    const userEmail = session?.user?.email;

    if (!session || !userEmail) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    console.log("[GET_CURRENT_USER_ERROR]", error);

    return null;
  }
}
