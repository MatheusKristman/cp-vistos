import { router } from "./trpc";
import { userRouter } from "./routers/user";
import { collaboratorRouter } from "./routers/collaborator";

export const appRouter = router({
  userRouter,
  collaboratorRouter,
});

export type AppRouter = typeof appRouter;
