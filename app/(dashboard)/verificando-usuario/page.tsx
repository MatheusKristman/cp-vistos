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
    const formStep: number[] = currentUser.formStep;

    if (!formStep.includes(0)) {
      console.log("formulario-0");
      redirect("/formulario/0");
    }

    if (!formStep.includes(1)) {
      console.log("formulario-1");
      redirect("/formulario/1");
    }

    if (!formStep.includes(2)) {
      console.log("formulario-2");
      redirect("/formulario/2");
    }

    if (!formStep.includes(3)) {
      console.log("formulario-3");
      redirect("/formulario/3");
    }

    if (!formStep.includes(4)) {
      console.log("formulario-4");
      redirect("/formulario/4");
    }

    if (!formStep.includes(5)) {
      console.log("formulario-5");
      redirect("/formulario/5");
    }

    if (!formStep.includes(6)) {
      console.log("formulario-6");
      redirect("/formulario/6");
    }

    if (!formStep.includes(7)) {
      console.log("formulario-7");
      redirect("/formulario/7");
    }

    if (!formStep.includes(8)) {
      console.log("formulario-8");
      redirect("/formulario/8");
    }

    if (!formStep.includes(9)) {
      console.log("formulario-9");
      redirect("/formulario/9");
    }

    console.log("perfil usuário");
    redirect("/perfil/resumo-formulário");
  }

  return (
    <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
      <Loader2 size={100} strokeWidth={1} className="animate-spin" />

      <span className="text-center text-2xl font-semibold text-primary">Um momento...</span>
    </div>
  );
}
