"use client";

import { Edit, Loader2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc-client";
import useCollaboratorStore from "@/constants/stores/useCollaboratorStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  name: string;
  collaboratorId: string;
}

export function CollaboratorBox({ name, collaboratorId }: Props) {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] =
    useState<boolean>(false);

  const { setCollaborator } = useCollaboratorStore();
  const router = useRouter();
  const util = trpc.useUtils();

  const { mutate: getCollaborator, isPending } =
    trpc.collaboratorRouter.getCollaborator.useMutation({
      onSuccess: (data) => {
        setCollaborator(data.collaborator);
        router.push(`/perfil/gerenciar-colaboradores/editar/${collaboratorId}`);
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          "Ocorreu um erro ao redirecionar para a edição do colaborador, tente novamente mais tarde",
        );
      },
    });
  const { mutate: deleteCollaborator, isPending: isDeletePending } =
    trpc.collaboratorRouter.deleteCollaborator.useMutation({
      onSuccess: (data) => {
        toast.success(data.message);
        util.collaboratorRouter.getCollaborators.invalidate();
        setIsDeleteConfirmOpen(false);
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          "Ocorreu um erro ao excluir o colaborador, tente novamente mais tarde",
        );
      },
    });

  return (
    <div className="w-full bg-card p-8 flex items-center justify-between gap-6">
      <span className="text-xl font-semibold text-white line-clamp-1">
        {name}
      </span>

      <div className="flex items-center gap-4">
        <Button
          disabled={isPending || isDeletePending}
          onClick={() => getCollaborator({ id: collaboratorId })}
          variant="link"
          size="icon"
          className="text-white/70 hover:text-white"
        >
          <Edit />
        </Button>

        <AlertDialog open={isDeleteConfirmOpen}>
          <AlertDialogTrigger asChild>
            <Button
              disabled={isPending || isDeletePending}
              variant="link"
              size="icon"
              className="text-white/70 hover:text-white"
              onClick={() => setIsDeleteConfirmOpen(true)}
            >
              <Trash />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Tem certeza que deseja excluir?
              </AlertDialogTitle>

              <AlertDialogDescription className="text-foreground/70">
                Essa ação não pode ser desfeita
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeletePending}>
                Cancelar
              </AlertDialogCancel>

              <AlertDialogAction
                disabled={isDeletePending}
                onClick={() => deleteCollaborator({ id: collaboratorId })}
                className="flex items-center gap-2"
              >
                {isDeletePending ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Excluindo
                  </>
                ) : (
                  <>Confirmar</>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
