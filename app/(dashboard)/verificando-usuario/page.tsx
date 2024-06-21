import getCurrentUser from "@/app/actions/getCurrentUser";
import { Role } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

export default async function VerifyUserPage() {
  const currentUser = await getCurrentUser();

  console.log(currentUser);

  if (!currentUser) {
    redirect("/");
  }

  if (currentUser.role === Role.ADMIN) {
    console.log("perfil admin");
    redirect("/perfil/clientes");
  }

  if (currentUser.role === Role.USER) {
    if (currentUser.primaryFormCreated) {
      redirect("/area-do-cliente");
    } else {
      redirect("/formulario");
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
      <Loader2 size={100} strokeWidth={1} className="animate-spin" />

      <span className="text-center text-2xl font-semibold text-primary">Um momento...</span>
    </div>
  );
}
