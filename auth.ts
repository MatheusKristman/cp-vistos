import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";

import prisma from "./lib/prisma";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "credentials",

      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user) {
          throw new Error("Dados inválidos, verifique e tente novamente");
        }

        if (user.role === "ADMIN" || user.role === "COLLABORATOR") {
          const isAdminPasswordCorrect: boolean = await bcrypt.compare(
            credentials.password as string,
            user.password,
          );

          if (!isAdminPasswordCorrect) {
            throw new Error("Dados inválidos, verifique e tente novamente");
          }
        } else {
          const isPasswordCorrect =
            (credentials.password as string) === user.password;

          if (!isPasswordCorrect) {
            throw new Error("Dados inválidos, verifique e tente novamente");
          }
        }

        // return user object with the their profile data
        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
  },
});
