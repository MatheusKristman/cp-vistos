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
import { Edit, Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface BannerItemProps {
  id: string;
  imageUrl: string;
  title: string;
  desc: string;
  btnText: string;
  pending: boolean;
}

export function BannerItem({ id, imageUrl, title, desc, btnText, pending }: BannerItemProps) {
  const [deleteBannerConfirmation, setDeleteBannerConfirmation] = useState(false);

  const utils = trpc.useUtils();
  const { mutate: deleteBanner, isPending: isDeleting } = trpc.websiteRouter.deleteBanner.useMutation({
    onSuccess: (res) => {
      if (res.error) {
        toast.error(res.message);

        return;
      }

      toast.success(res.message);
      utils.websiteRouter.getBanners.invalidate();
    },
    onError: (error) => {
      console.error(error);

      toast.error("Ocorreu um erro ao deletar o banner");
    },
  });

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="relative w-full rounded-xl overflow-hidden flex justify-end sm:rounded-3xl">
        <Image
          src={imageUrl}
          alt="Banner 1"
          fill
          className="object-cover object-center absolute top-0 left-0 right-0 bottom-0"
        />

        <div className="w-full flex flex-col gap-6 relative z-10 p-12 pb-20 bg-gradient-to-b from-transparent to-[#262525] sm:bg-gradient-to-r sm:items-end md:bg-gradient-to-b">
          <div className="w-full flex flex-col gap-2 sm:w-1/2 md:w-full lg:w-1/2">
            <h5 className="text-xl font-bold text-white lg:text-3xl">{title}</h5>

            <p className="text-white font-medium text-base lg:text-xl">{desc}</p>
          </div>

          <div className="w-full sm:w-1/2 md:w-full lg:w-1/2">
            <Button variant="secondary" className="pointer-events-none">
              {btnText}
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-4 sm:flex-row">
        <Button
          variant="outline"
          size="xl"
          className="w-full flex items-center gap-2"
          disabled={pending || isDeleting}
          asChild
        >
          <Link href={`/perfil/gerenciar-banners/editar/${id}`}>
            Editar
            <Edit />
          </Link>
        </Button>

        <AlertDialog open={deleteBannerConfirmation}>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="xl"
              className="w-full flex items-enter gap-2"
              onClick={() => setDeleteBannerConfirmation(true)}
              disabled={pending || isDeleting}
            >
              Excluir
              {isDeleting ? <Loader2 className="animate-spin" /> : <Trash2 />}
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent className="rounded-3xl">
            <AlertDialogHeader>
              <AlertDialogTitle>Tem certeza que deseja excluir o banner?</AlertDialogTitle>

              <AlertDialogDescription className="text-foreground/70">
                Essa ação não pode ser desfeita
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting} onClick={() => setDeleteBannerConfirmation(false)}>
                Cancelar
              </AlertDialogCancel>

              <AlertDialogAction
                disabled={isDeleting}
                onClick={() => deleteBanner({ bannerId: id })}
                className="flex items-center gap-2"
              >
                {isDeleting ? (
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
