import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";
import { Archive, Bookmark, Loader2 } from "lucide-react";

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

interface ConfirmActiveStatusModalProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  profileId: string;
  btnLabel: string;
  type: "prospect" | "archived";
  title: string;
  description: string;
}

export function ConfirmActiveStatusModal({
  isOpen,
  setOpen,
  profileId,
  btnLabel,
  type,
  title,
  description,
}: ConfirmActiveStatusModalProps) {
  const { closeModal } = useClientDetailsModalStore();

  const utils = trpc.useUtils();

  const { mutate: activateProfile, isPending } = trpc.userRouter.activateProfile.useMutation({
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
          {(type === "prospect" && <Bookmark className="w-5 h-5" strokeWidth={1.5} />) ||
            (type === "archived" && <Archive className="w-5 h-5" strokeWidth={1.5} />)}
          {btnLabel}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>

          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} onClick={() => setOpen(false)}>
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction disabled={isPending} onClick={() => activateProfile({ profileId })}>
            {btnLabel}
            {isPending && <Loader2 className="animate-spin size-4 ml-2" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
