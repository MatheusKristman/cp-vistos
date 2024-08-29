import { router } from "./trpc";
import { userRouter } from "./routers/user";
import { collaboratorRouter } from "./routers/collaborator";
import { clientRouter } from "./routers/client";
import { formsRouter } from "./routers/forms";
import { notificationRouter } from "./routers/notification";

export const appRouter = router({
  userRouter,
  collaboratorRouter,
  clientRouter,
  formsRouter,
  notificationRouter,
});

export type AppRouter = typeof appRouter;
