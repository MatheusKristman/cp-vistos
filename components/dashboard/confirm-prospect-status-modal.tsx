import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";
import { Bookmark, Loader2 } from "lucide-react";

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

interface ConfirmProspectStatusModalProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  profileId: string;
}

export function ConfirmProspectStatusModal({ isOpen, setOpen, profileId }: ConfirmProspectStatusModalProps) {
  const { closeModal } = useClientDetailsModalStore();

  const utils = trpc.useUtils();

  const { mutate: prospectProfile, isPending } = trpc.userRouter.prospectProfile.useMutation({
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
          <Bookmark className="w-5 h-5" strokeWidth={1.5} />
          Prospectar
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja prospectar esse perfil?</AlertDialogTitle>

          <AlertDialogDescription>O perfil será armazenado na página de prospects.</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} onClick={() => setOpen(false)}>
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction disabled={isPending} onClick={() => prospectProfile({ profileId })}>
            Prospectar
            {isPending && <Loader2 className="animate-spin size-4 ml-2" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
