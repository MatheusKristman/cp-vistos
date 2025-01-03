"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Check,
  Edit,
  Loader2,
  MessageCircleOff,
  Send,
  Trash,
  X,
} from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { useEffect, useRef, useState } from "react";
import { format, formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

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
import { useSession } from "next-auth/react";

interface Props {
  handleClose: () => void;
}

export function ClientDetailsComments({ handleClose }: Props) {
  const [commentState, setCommentState] = useState<string>("");
  const [deleteId, setDeleteId] = useState<string>("");
  const [editId, setEditId] = useState<string>("");
  const [editCommentState, setEditCommentState] = useState<string>("");

  const { unsetToComment, setToResume, client, isModalOpen } =
    useClientDetailsModalStore();
  const util = trpc.useUtils();
  const commentEndRef = useRef<HTMLDivElement | null>(null);
  const session = useSession();

  console.log(session);

  function scrollToBottom() {
    setTimeout(() => {
      commentEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 350);
  }

  useEffect(() => {
    if (client) {
      scrollToBottom();
    }
  }, [client]);

  if ((!client || !session.data) && isModalOpen) {
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
            Comentários
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

          <div className="w-full border border-muted/50 rounded-xl overflow-hidden transition duration-300 flex items-center justify-between group focus-within:border-primary hover:border-border disabled:hover:border-muted disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted">
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

  const { data } = trpc.userRouter.getComments.useQuery({
    profileId: client?.id ?? "",
  });
  const { mutate: addComment, isPending } =
    trpc.userRouter.addComment.useMutation({
      onSuccess: () => {
        util.userRouter.getComments.invalidate();
        setCommentState("");
        scrollToBottom();
      },
      onError: (error) => {
        console.error(error);
        toast.error("Ocorreu um erro ao salvar o comentário");
      },
    });
  const { mutate: deleteComment, isPending: isDeletePending } =
    trpc.userRouter.deleteComment.useMutation({
      onSuccess: (data) => {
        util.userRouter.getComments.invalidate();
        toast.success(data.message);
        setDeleteId("");
      },
      onError: (error) => {
        console.error(error);
        toast.error("Ocorreu um erro ao excluir o comentário");
      },
    });
  const { mutate: editComment, isPending: isEditPending } =
    trpc.userRouter.editComment.useMutation({
      onSuccess: (data) => {
        util.userRouter.getComments.invalidate();
        toast.success(data.message);
        setEditId("");
      },
      onError: (error) => {
        console.error(error);
        toast.error("Ocorreu um erro ao editar a anotação");
      },
    });

  function handleBack() {
    unsetToComment();
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
        >
          <Image
            src="/assets/icons/arrow-left-dark.svg"
            alt="Voltar"
            width={24}
            height={24}
          />
        </Button>

        <h1 className="text-2xl font-semibold text-foreground text-center sm:text-3xl row-end-3 row-start-2 col-span-2">
          Comentários
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
        <div className="w-full flex flex-col gap-4 max-h-[500px] overflow-y-auto">
          {data?.comments !== undefined && data.comments.length > 0 ? (
            data.comments.map((comment) => (
              <div
                key={comment.id}
                className="w-full flex flex-col gap-6 border-l border-muted px-4 py-3"
              >
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold text-foreground">
                      {comment.author.name.split(" ")[0]}
                    </span>

                    <span className="text-sm font-medium text-foreground/50">
                      {format(comment.createdAt, "dd/MM/yyyy - HH:mm")}
                    </span>
                  </div>

                  {session.data?.user?.email === comment.author.email ? (
                    deleteId === comment.id ? (
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
                                  deleteComment({ commentId: deleteId })
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
                    ) : editId === comment.id ? (
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
                                  setEditCommentState("");
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
                                  editComment({
                                    commentId: editId,
                                    comment: editCommentState
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
                          disabled={
                            isPending || isDeletePending || isEditPending
                          }
                          onClick={() => {
                            setEditId(comment.id);
                            setEditCommentState(comment.comment.join("\n"));
                          }}
                        >
                          <Edit size={20} strokeWidth={1.5} />
                        </Button>

                        <Button
                          variant="link"
                          size="icon"
                          className="w-7 h-7 text-border hover:text-foreground"
                          onClick={() => setDeleteId(comment.id)}
                          disabled={
                            isPending || isDeletePending || isEditPending
                          }
                        >
                          <Trash size={20} strokeWidth={1.5} />
                        </Button>
                      </div>
                    )
                  ) : null}
                </div>

                <div className="w-full flex flex-col gap-4">
                  {editId === comment.id ? (
                    <div className="w-full border border-muted transition duration-300 flex items-center justify-between group focus-within:border-primary hover:border-border disabled:hover:border-muted disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted">
                      <TextareaAutosize
                        className="border-none w-full resize-none px-3 py-2 h-12 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Envie sua anotação"
                        maxRows={15}
                        value={editCommentState}
                        onChange={(event) =>
                          setEditCommentState(event.target.value)
                        }
                        disabled={isPending || isDeletePending || isEditPending}
                      />
                    </div>
                  ) : (
                    comment.comment.map((item, idx) => (
                      <p key={idx} className="text-foreground text-base">
                        {item}
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
                Nenhum comentário no momento
              </span>
            </div>
          )}
          <div ref={commentEndRef} />
        </div>

        <div className="w-full border border-muted/70 rounded-xl overflow-hidden transition duration-300 flex items-center justify-between group focus-within:border-primary hover:border-border disabled:hover:border-muted disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted">
          <TextareaAutosize
            className="border-none w-full resize-none px-4 py-3 h-12 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Envie seu comentário"
            maxRows={5}
            value={commentState}
            onChange={(event) => setCommentState(event.target.value)}
            disabled={
              isPending || isDeletePending || isEditPending || editId.length > 0
            }
          />

          <Button
            onClick={() =>
              addComment({
                profileId: client?.id ?? "",
                comment: commentState.split("\n").filter((text) => text !== ""),
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
