import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request, { params }: { params: { formId: string } }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Usuário não autorizado", { status: 401 });
    }

    const formId = params.formId;

    if (!formId) {
      return new Response("Dados inválidos", { status: 401 });
    }

    await prisma.form.delete({
      where: {
        id: formId,
      },
    });

    return new Response("Formulário deletado com sucesso", { status: 200 });
  } catch (error) {
    console.log("[ERROR_ON_FORM_DELETE]", error);

    return new Response("Ocorreu um erro ao deletar o formulário", {
      status: 500,
    });
  }
}
