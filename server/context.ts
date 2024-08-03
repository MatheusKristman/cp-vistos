import { auth } from "@/auth";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import * as trpcNext from "@trpc/server/adapters/next";

export async function createContext({ req, resHeaders }: FetchCreateContextFnOptions) {
  const user = await auth();

  return { req, resHeaders, user };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
