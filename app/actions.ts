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

    const isAdminPasswordCorrect = await bcrypt.compare(
      password,
      user.password,
    );
    const isPasswordCorrect = password === user.password;

    if (
      (user.role === "ADMIN" || user.role === "COLLABORATOR") &&
      !isAdminPasswordCorrect
    ) {
      return new Response("Dados inválidos, verifique e tente novamente", {
        status: 401,
      });
    }

    if (user.role === "CLIENT" && !isPasswordCorrect) {
      return new Response("Dados inválidos, verifique e tente novamente", {
        status: 401,
      });
    }

    return user;
  } catch (error) {
    console.log("[ERROR_ON_LOGIN_ACTION]", error);

    return null;
  }
}
