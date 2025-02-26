"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { format } from "date-fns";
import TextareaAutosize from "react-textarea-autosize";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ptBR } from "date-fns/locale";
import {
  Check,
  Edit,
  Loader2,
  MessageCircleOff,
  Send,
  Trash,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { FormAnimation } from "@/constants/animations/modal";
import useClientDetailsModalStore from "@/constants/stores/useClientDetailsModalStore";
import { trpc } from "@/lib/trpc-client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  handleClose: () => void;
}

export function ClientDetailsAnnotations({ handleClose }: Props) {
  const [annotationState, setAnnotationState] = useState<string>("");
  const [deleteId, setDeleteId] = useState<string>("");
  const [editId, setEditId] = useState<string>("");
  const [editAnnotationState, setEditAnnotationState] = useState<string>("");

  const { unsetToAnnotation, setToResume, client, isModalOpen } =
    useClientDetailsModalStore();
  const util = trpc.useUtils();
  const annotationEndRef = useRef<HTMLDivElement | null>(null);

  function scrollToBottom() {
    setTimeout(() => {
      annotationEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 350);
  }

  useEffect(() => {
    if (client) {
      scrollToBottom();
    }
  }, [client]);

  if (!client && isModalOpen) {
    return (
      <div>
        <div className="w-full grid grid-cols-2 grid-rows-2 gap-4 mb-9 sm:flex sm:flex-row sm:items-center sm:justify-between">
          <Button
            onClick={handleBack}
            variant="link"
            size="icon"
            className="row-start-1 row-end-2"
          >
            <Image
              src="/assets/icons/arrow-left-dark.svg"
              alt="Voltar"
              width={24}
              height={24}
            />
          </Button>

          <h1 className="text-2xl font-semibold text-foreground text-center sm:text-3xl row-end-3 row-start-2 col-span-2">
            Anotações
          </h1>

          <Button
            onClick={handleClose}
            variant="link"
            size="icon"
            className="row-start-1 row-end-2 justify-self-end"
          >
            <Image
              src="/assets/icons/cross-blue.svg"
              alt="Fechar"
              width={24}
              height={24}
            />
          </Button>
        </div>

        <div className="w-full flex flex-col gap-9">
          <div className="w-full flex flex-col gap-4">
            <Skeleton className="w-full h-20 rounded-none" />
            <Skeleton className="w-full h-40 rounded-none" />
          </div>

          <div className="w-full border border-muted/70 rounded-xl overflow-hidden transition duration-300 flex items-center justify-between group focus-within:border-primary hover:border-border disabled:hover:border-muted disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted">
            <TextareaAutosize
              className="border-none w-full resize-none px-3 py-2 h-12 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Envie sua anotação"
              disabled
            />

            <Button
              disabled
              variant="link"
              size="icon"
              className="self-end mx-1"
            >
              <Send />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const { data } = trpc.userRouter.getAnnotations.useQuery({
    accountId: client?.userId ?? "",
  });
  const { mutate: addAnnotation, isPending } =
    trpc.userRouter.addAnnotation.useMutation({
      onSuccess: () => {
        util.userRouter.getAnnotations.invalidate();
        setAnnotationState("");
        scrollToBottom();
      },
      onError: (error) => {
        console.error(error);
        toast.error("Ocorreu um erro ao salvar a anotação");
      },
    });
  const { mutate: deleteAnnotation, isPending: isDeletePending } =
    trpc.userRouter.deleteAnnotation.useMutation({
      onSuccess: (data) => {
        util.userRouter.getAnnotations.invalidate();
        toast.success(data.message);
        setDeleteId("");
      },
      onError: (error) => {
        console.error(error);
        toast.error("Ocorreu um erro ao excluir a anotação");
      },
    });
  const { mutate: editAnnotation, isPending: isEditPending } =
    trpc.userRouter.editAnnotation.useMutation({
      onSuccess: (data) => {
        util.userRouter.getAnnotations.invalidate();
        toast.success(data.message);
        setEditId("");
      },
      onError: (error) => {
        console.error(error);
        toast.error("Ocorreu um erro ao editar a anotação");
      },
    });

  function handleBack() {
    unsetToAnnotation();
    setToResume();
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={FormAnimation}
    >
      <div className="w-full grid grid-cols-2 grid-rows-2 gap-4 mb-9 sm:flex sm:flex-row sm:items-center sm:justify-between">
        <Button
          onClick={handleBack}
          variant="link"
          size="icon"
          className="row-start-1 row-end-2"
          disabled={isPending || isDeletePending || isEditPending}
        >
          <Image
            src="/assets/icons/arrow-left-dark.svg"
            alt="Voltar"
            width={24}
            height={24}
          />
        </Button>

        <h1 className="text-2xl font-semibold text-foreground text-center sm:text-3xl row-end-3 row-start-2 col-span-2">
          Anotações
        </h1>

        <Button
          onClick={handleClose}
          variant="link"
          size="icon"
          className="row-start-1 row-end-2 justify-self-end"
          disabled={isPending || isDeletePending || isEditPending}
        >
          <Image
            src="/assets/icons/cross-blue.svg"
            alt="Fechar"
            width={24}
            height={24}
          />
        </Button>
      </div>

      <div className="w-full flex flex-col gap-9">
        <div className="w-full flex flex-col gap-4 max-h-[500px] overflow-y-auto">
          {data?.annotations !== undefined && data.annotations.length > 0 ? (
            data.annotations.map((annotation, index) => (
              <div
                key={annotation.id}
                className="w-full flex flex-col gap-6 border-l border-muted px-4 py-3"
              >
                <div className="w-full flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground/50">
                    {format(annotation.createdAt, "dd/MM/yyyy - HH:mm")}
                  </span>

                  {deleteId === annotation.id ? (
                    <TooltipProvider>
                      <div className="flex items-center gap-4">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="link"
                              size="icon"
                              className="w-7 h-7 text-destructive/70 hover:text-destructive"
                              onClick={() => setDeleteId("")}
                              disabled={
                                isPending || isDeletePending || isEditPending
                              }
                            >
                              <X size={20} strokeWidth={1.5} />
                            </Button>
                          </TooltipTrigger>

                          <TooltipContent>
                            <p>Cancelar</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="link"
                              size="icon"
                              className="w-7 h-7 text-confirm/70 hover:text-confirm"
                              onClick={() =>
                                deleteAnnotation({ annotationId: deleteId })
                              }
                              disabled={
                                isPending || isDeletePending || isEditPending
                              }
                            >
                              {isDeletePending ? (
                                <Loader2
                                  size={20}
                                  strokeWidth={1.5}
                                  className="animate-spin"
                                />
                              ) : (
                                <Check size={20} strokeWidth={1.5} />
                              )}
                            </Button>
                          </TooltipTrigger>

                          <TooltipContent>
                            <p>Deletar anotação</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TooltipProvider>
                  ) : editId === annotation.id ? (
                    <TooltipProvider>
                      <div className="flex items-center gap-4">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="link"
                              size="icon"
                              className="w-7 h-7 text-destructive/70 hover:text-destructive"
                              onClick={() => {
                                setEditId("");
                                setEditAnnotationState("");
                              }}
                              disabled={
                                isPending || isDeletePending || isEditPending
                              }
                            >
                              <X size={20} strokeWidth={1.5} />
                            </Button>
                          </TooltipTrigger>

                          <TooltipContent>
                            <p>Cancelar</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="link"
                              size="icon"
                              className="w-7 h-7 text-confirm/70 hover:text-confirm"
                              onClick={() =>
                                editAnnotation({
                                  annotationId: editId,
                                  annotation: editAnnotationState
                                    .split("\n")
                                    .filter((text) => text !== ""),
                                })
                              }
                              disabled={
                                isPending || isDeletePending || isEditPending
                              }
                            >
                              {isDeletePending ? (
                                <Loader2
                                  size={20}
                                  strokeWidth={1.5}
                                  className="animate-spin"
                                />
                              ) : (
                                <Check size={20} strokeWidth={1.5} />
                              )}
                            </Button>
                          </TooltipTrigger>

                          <TooltipContent>
                            <p>Salvar</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TooltipProvider>
                  ) : (
                    <div className="flex items-center gap-4">
                      <Button
                        variant="link"
                        size="icon"
                        className="w-7 h-7 text-border hover:text-foreground"
                        disabled={isPending || isDeletePending || isEditPending}
                        onClick={() => {
                          setEditId(annotation.id);
                          setEditAnnotationState(
                            annotation.annotation.join("\n"),
                          );
                        }}
                      >
                        <Edit size={20} strokeWidth={1.5} />
                      </Button>

                      <Button
                        variant="link"
                        size="icon"
                        className="w-7 h-7 text-border hover:text-foreground"
                        onClick={() => setDeleteId(annotation.id)}
                        disabled={isPending || isDeletePending || isEditPending}
                      >
                        <Trash size={20} strokeWidth={1.5} />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="w-full flex flex-col gap-4">
                  {editId === annotation.id ? (
                    <div className="w-full border border-muted transition duration-300 flex items-center justify-between group focus-within:border-primary hover:border-border disabled:hover:border-muted disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted">
                      <TextareaAutosize
                        className="border-none w-full resize-none px-3 py-2 h-12 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Envie sua anotação"
                        maxRows={15}
                        value={editAnnotationState}
                        onChange={(event) =>
                          setEditAnnotationState(event.target.value)
                        }
                        disabled={isPending || isDeletePending || isEditPending}
                      />
                    </div>
                  ) : (
                    annotation.annotation.map((an, idx) => (
                      <p key={idx} className="text-foreground text-base">
                        {an}
                      </p>
                    ))
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="w-full flex flex-col items-center justify-center gap-4">
              <MessageCircleOff
                size={50}
                strokeWidth={1.5}
                className="opacity-35"
              />

              <span className="text-lg font-medium text-foreground text-center opacity-50">
                Nenhuma anotação no momento
              </span>
            </div>
          )}
          <div ref={annotationEndRef} />
        </div>

        <div className="w-full border border-muted/70 rounded-xl overflow-hidden transition duration-300 flex items-center justify-between group focus-within:border-primary hover:border-border disabled:hover:border-muted disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted">
          <TextareaAutosize
            className="border-none w-full resize-none px-4 py-3 h-12 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Envie sua anotação"
            maxRows={5}
            value={annotationState}
            onChange={(event) => setAnnotationState(event.target.value)}
            disabled={
              isPending || isDeletePending || isEditPending || editId.length > 0
            }
          />

          <Button
            onClick={() =>
              addAnnotation({
                userId: client?.userId ?? "",
                annotation: annotationState
                  .split("\n")
                  .filter((text) => text !== ""),
              })
            }
            disabled={
              isPending || isDeletePending || isEditPending || editId.length > 0
            }
            variant="link"
            size="icon"
            className="self-end mx-1"
          >
            {isPending ? <Loader2 className="animate-spin" /> : <Send />}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
