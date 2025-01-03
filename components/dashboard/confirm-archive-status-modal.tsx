import { toast } from "sonner";
import { Archive, Loader2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

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
import { Button } from "@/components/ui/button";

import { trpc } from "@/lib/trpc-client";

import useClientDetailsModalStore from "@/constants/stores/useClientDetailsModalStore";

interface ConfirmArchiveStatusModalProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  profileId: string;
}

export function ConfirmArchiveStatusModal({ isOpen, setOpen, profileId }: ConfirmArchiveStatusModalProps) {
  const { closeModal } = useClientDetailsModalStore();

  const utils = trpc.useUtils();

  const { mutate: archiveProfile, isPending } = trpc.userRouter.archiveProfile.useMutation({
    onSuccess: ({ message }) => {
      toast.success(message);

      utils.userRouter.getActiveClients.invalidate();
      utils.userRouter.getProspectsClients.invalidate();
      utils.userRouter.getArchivedClients.invalidate();

      setOpen(false);
      closeModal();
    },
  });

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="xl"
          className="flex items-center gap-2"
          disabled={isPending}
          onClick={() => setOpen(true)}
        >
          <Archive className="w-5 h-5" strokeWidth={1.5} />
          Arquivar
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja arquivar esse perfil?</AlertDialogTitle>

          <AlertDialogDescription>O perfil será armazenado na página de arquivados.</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} onClick={() => setOpen(false)}>
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction disabled={isPending} onClick={() => archiveProfile({ profileId })}>
            Arquivar
            {isPending && <Loader2 className="animate-spin size-4 ml-2" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
