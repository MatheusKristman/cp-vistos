"use client";

import { Bell, CheckCheck, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import useNotificationStore from "@/constants/stores/useNotificationStore";
import { trpc } from "@/lib/trpc-client";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function NotificationHeaderMenu() {
  const { openModal } = useNotificationStore();

  const utils = trpc.useUtils();

  const { data } = trpc.notificationRouter.getNotifications.useQuery();
  const { mutate: viewNotification, isPending } = trpc.notificationRouter.updateViewNotification.useMutation({
    onSuccess: () => {
      utils.notificationRouter.getNotifications.invalidate();
    },
    onError: (error) => {
      console.error(error);
      toast.error("ocorreu um erro ao alterar o status da notificação");
    },
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link" size="icon" className="flex aspect-square w-auto h-full border-l border-secondary">
          <Bell />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="flex flex-col gap-9 bg-white border-muted shadow-lg">
        <h4 className="text-base text-foreground font-semibold">Notificações</h4>

        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex flex-col gap-2">
            {data !== undefined ? (
              data.notifications.length > 0 ? (
                data.notifications.map((notification) => (
                  <div key={notification.id} className="relative w-full overflow-hidden group">
                    <div className="bg-primary/15 p-4 w-full flex items-end justify-between gap-4">
                      <span className="text-sm text-foreground">
                        {notification.statusForm === "filling" && (
                          <>
                            <strong className="text-sm text-foreground font-semibold">
                              {notification.profile.name}
                            </strong>{" "}
                            começou a <strong className="text-sm text-foreground font-semibold">preencher</strong> o
                            formulário
                          </>
                        )}
                        {notification.statusForm === "filled" && (
                          <>
                            <strong className="text-sm text-foreground font-semibold">{`${notification.profile.name} preencheu`}</strong>{" "}
                            o formulário
                          </>
                        )}
                        {notification.statusForm === "updated" && (
                          <>
                            <strong className="text-sm text-foreground font-semibold">{`${notification.profile.name} atualizou`}</strong>{" "}
                            o formulário
                          </>
                        )}
                      </span>

                      <span className="text-[12px] text-right text-foreground/50 font-medium">
                        {formatDistance(notification.createdAt, new Date(), {
                          locale: ptBR,
                        })}
                      </span>
                    </div>

                    <Button
                      onClick={() => viewNotification({ id: notification.id })}
                      variant="secondary"
                      className={cn(
                        "absolute top-0 -right-16 h-full transition-all hover:bg-white group-hover:right-0 group-hover:left-auto",
                        {
                          "right-0 left-auto bg-white": isPending,
                        }
                      )}
                    >
                      {isPending ? <Loader2 color="#AFBCDA" /> : <CheckCheck color="#AFBCDA" />}
                    </Button>
                  </div>
                ))
              ) : (
                <span className="text-sm text-foreground/50 text-center">Sem notificações no momento</span>
              )
            ) : (
              <div>
                <Loader2 className="animate-spin" />
              </div>
            )}
          </div>

          <Button onClick={openModal} variant="link" size="icon" className="w-fit text-foreground/60 underline">
            Ver histórico
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
