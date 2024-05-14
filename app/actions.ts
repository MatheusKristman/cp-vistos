"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function getUserFromLogin(email: string, password: string) {
  try {
    if (!email || !password) {
      return null;
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return null;
    }

    return user;
  } catch (error) {
    console.log("[ERROR_ON_LOGIN_ACTION]", error);

    return null;
  }
}
