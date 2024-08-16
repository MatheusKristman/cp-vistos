import { router } from "./trpc";
import { userRouter } from "./routers/user";
import { collaboratorRouter } from "./routers/collaborator";
import { clientRouter } from "./routers/client";

export const appRouter = router({
  userRouter,
  collaboratorRouter,
  clientRouter,
});

export type AppRouter = typeof appRouter;
