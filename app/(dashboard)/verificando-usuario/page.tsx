import getCurrentUser from "@/app/actions/getCurrentUser";
import { Role } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

// TODO: ajustar para novo formato

export default async function VerifyUserPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  if (currentUser.role === Role.ADMIN) {
    redirect("/perfil/clientes");
  }

  if (currentUser.role === Role.CLIENT) {
    redirect("/area-do-cliente");
  }

  return (
    <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
      <Loader2 size={100} strokeWidth={1} className="animate-spin" />

      <span className="text-center text-2xl font-semibold text-primary">
        Um momento...
      </span>
    </div>
  );
}
