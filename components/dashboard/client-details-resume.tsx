"use client";

import { Edit, NotepadText, RotateCw, MessageCircleMore, FileText } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { Button } from "../ui/button";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { StatusDS, VisaStatus } from "@prisma/client";
import { trpc } from "@/lib/trpc-client";
import useClientDetailsModalStore from "@/constants/stores/useClientDetailsModalStore";
import { useEffect, useState } from "react";
import { FormAnimation } from "@/constants/animations/modal";

interface Props {
  handleClose: () => void;
}

export function ClientDetailsResume({ handleClose }: Props) {
  const { client, setClient, role, unsetToResume, setToAnnotation, setToEditAccount, setToComment, setToEditProfile } =
    useClientDetailsModalStore();

  const [statusDS, setStatusDS] = useState("");
  const [visaStatus, setVisaStatus] = useState("");

  useEffect(() => {
    if (client) {
      setStatusDS(client.statusDS);
      setVisaStatus(client.visaStatus);
    }
  }, [client, statusDS, visaStatus]);

  const { mutate: updateDSValidationDate, isPending: isDSValidPending } =
    trpc.userRouter.updateDSValidationDate.useMutation({
      onSuccess: (data) => {
        setClient(data.updatedClient);
        toast.success("Data do Barcode atualizada");
      },
      onError: (error) => {
        console.error(error);

        if (error.data && error.data.code === "NOT_FOUND") {
          toast.error(error.message);
        } else {
          toast.error("Ocorreu um erro ao atualizar a data do Barcode");
        }
      },
    });
  const { mutate: updateStatusDS, isPending: isStatusDSUpdating } = trpc.userRouter.updateStatusDS.useMutation({
    onSuccess: (data) => {
      setClient(data.updatedClient);
      setStatusDS(data.status);
    },
    onError: (error) => {
      console.error(error);

      if (error.data && error.data.code === "NOT_FOUND") {
        toast.error(error.message);
      } else {
        toast.error("Ocorreu um erro ao atualizar o status do DS");
      }
    },
  });
  const { mutate: updateVisaStatus, isPending: isVisaStatusUpdating } = trpc.userRouter.updateVisaStatus.useMutation({
    onSuccess: (data) => {
      setClient(data.updatedClient);
      setVisaStatus(data.status);
    },
    onError: (error) => {
      console.error(error);

      if (error.data && error.data.code === "NOT_FOUND") {
        toast.error(error.message);
      } else {
        toast.error("Ocorreu um erro ao atualizar o status do visto");
      }
    },
  });

  function handleAnnotation() {
    unsetToResume();
    setToAnnotation();
  }

  function handleEditAccount() {
    unsetToResume();
    setToEditAccount();
  }

  function handleComment() {
    unsetToResume();
    setToComment();
  }

  function handleEditProfile() {
    unsetToResume();
    setToEditProfile();
  }

  if (!client) {
    return <div>loading...</div>;
  }

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={FormAnimation} className="w-full">
      <div className="w-full flex flex-col-reverse gap-4 mb-9 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">Conta: {client.user.name}</h1>

        <Button
          onClick={handleClose}
          variant="link"
          size="icon"
          className="self-end"
          disabled={isDSValidPending || isStatusDSUpdating || isVisaStatusUpdating}
        >
          <Image src="/assets/icons/cross-blue.svg" alt="Fechar" width={24} height={24} />
        </Button>
      </div>

      <div className="w-full flex flex-col gap-9">
        <div className="w-full flex flex-col gap-6">
          <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex flex-col">
              <span className="text-sm text-foreground/50 font-medium">E-mail</span>

              <span className="text-lg font-medium text-foreground">{client.user.email}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-foreground/50 font-medium">CPF</span>

              <span className="text-lg font-medium text-foreground">{client.user.cpf}</span>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 gap-6">
            <div className="flex flex-col">
              <span className="text-sm text-foreground/50 font-medium">Endereço</span>

              <span className="text-lg font-medium text-foreground">{client.user.address}</span>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div
              className={cn("flex flex-col", {
                hidden: role !== "ADMIN",
              })}
            >
              <span className="text-sm text-foreground/50 font-medium">Valor</span>

              <span className="text-lg font-medium text-foreground">
                {client.user.budget ? formatPrice(client.user.budget) : "Não informado"}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-foreground/50 font-medium">Conta de Agendamento</span>

              <span className="text-lg font-medium text-foreground">
                {client.user.scheduleAccount === "active"
                  ? "Ativo"
                  : client.user.scheduleAccount === "inactive"
                  ? "Inativo"
                  : "Não informado"}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-6 sm:flex-row">
          <Button
            size="xl"
            className={cn("w-full flex items-center gap-2 sm:w-fit", {
              hidden: role !== "ADMIN",
            })}
            disabled={isDSValidPending || isStatusDSUpdating || isVisaStatusUpdating}
            onClick={handleAnnotation}
          >
            <NotepadText className="w-5 h-5" strokeWidth={1.5} />
            Anotações
          </Button>

          <Button
            variant="outline"
            size="xl"
            className="w-full flex items-center gap-2 sm:w-fit"
            disabled={isDSValidPending || isStatusDSUpdating || isVisaStatusUpdating}
            onClick={handleEditAccount}
          >
            <Edit className="w-5 h-5" strokeWidth={1.5} />
            Editar Conta
          </Button>
        </div>

        <div className="w-full h-px bg-[#E6EBEE]" />

        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Perfil: {client.name}</h2>

            <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col">
                <span className="text-xs font-medium text-foreground/50">Barcode</span>

                <span className="text-base font-medium text-foreground">{client.DSNumber}</span>
              </div>

              <div className="w-full flex items-center justify-between gap-2">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-foreground/50">Data do barcode</span>

                  <span className="text-base font-medium text-foreground">
                    {client.DSValid ? format(client.DSValid, "dd/MM/yyyy") : "Expirado"}
                  </span>
                </div>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-lg"
                        disabled={isDSValidPending || isStatusDSUpdating || isVisaStatusUpdating}
                        onClick={() => updateDSValidationDate({ profileId: client.id })}
                      >
                        <RotateCw
                          className={cn("w-6 h-6", {
                            "animate-spin": isDSValidPending,
                          })}
                          strokeWidth={1.5}
                        />
                      </Button>
                    </TooltipTrigger>

                    <TooltipContent>
                      <p className="font-medium">Revalidar Barcode</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col">
                <span className="text-xs font-medium text-foreground/50">Data de Nascimento</span>

                <span className="text-base font-medium text-foreground">
                  {client.birthDate ? format(client.birthDate, "dd/MM/yyyy") : "--/--/----"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-medium text-foreground/50">Passaporte</span>

                <span className="text-base font-medium text-foreground">
                  {client.passport ? client.passport : "---"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col">
                <span className="text-xs font-medium text-foreground/50">Classe do Visto</span>

                <span className="text-base font-medium text-foreground line-clamp-2">
                  {client.visaClass === "B1"
                    ? "B1 Babá"
                    : client.visaClass === "B2_B1"
                    ? "B1/B2 Turismo"
                    : client.visaClass === "O1"
                    ? "O1 Capacidade Extraordinária"
                    : client.visaClass === "O2"
                    ? "O2 Estrangeiro Acompanhante/Assistente"
                    : client.visaClass === "O3"
                    ? "O3 Cônjuge ou Filho de um O1 ou O2"
                    : "Não informado"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-medium text-foreground/50">Tipo de Visto</span>

                <span className="text-base font-medium text-foreground">
                  {client.visaType === "renovacao"
                    ? "Renovação"
                    : client.visaType === "primeiro_visto"
                    ? "Primeiro Visto"
                    : "Não informado"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col">
                <span className="text-xs font-medium text-foreground/50">Data CASV</span>

                <span className="text-base font-medium text-foreground line-clamp-2">
                  {client.CASVDate ? format(client.CASVDate, "dd/MM/yyyy") : "--/--/----"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-medium text-foreground/50">Data da Entrevista</span>

                <span className="text-base font-medium text-foreground">
                  {client.interviewDate ? format(client.interviewDate, "dd/MM/yyyy") : "--/--/----"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-foreground/50 flex items-center gap-2">
                  Status do DS
                  {isStatusDSUpdating && <RotateCw className="h-3 w-3 animate-spin" strokeWidth={1.5} />}
                </span>

                <Select
                  defaultValue={client.statusDS}
                  value={statusDS}
                  onValueChange={(value) => {
                    updateStatusDS({
                      profileId: client.id,
                      status: value as StatusDS,
                    });
                  }}
                  disabled={isDSValidPending || isStatusDSUpdating || isVisaStatusUpdating}
                >
                  <SelectTrigger className={cn(!client.statusDS && "[&>span]:text-muted-foreground")}>
                    <SelectValue placeholder="Selecione o status do DS" />
                  </SelectTrigger>

                  <SelectContent className="z-[99999]">
                    <SelectItem value="awaiting">Aguardando</SelectItem>
                    <SelectItem value="filling">Preenchendo</SelectItem>
                    <SelectItem value="filled">Preenchido</SelectItem>
                    <SelectItem value="emitted">Emitido</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-foreground/50 flex items-center gap-2">
                  Status do Visto
                  {isVisaStatusUpdating && <RotateCw className="h-3 w-3 animate-spin" strokeWidth={1.5} />}
                </span>

                <Select
                  defaultValue={client.visaStatus}
                  value={visaStatus}
                  onValueChange={(value) => {
                    updateVisaStatus({
                      profileId: client.id,
                      status: value as VisaStatus,
                    });
                  }}
                  disabled={isDSValidPending || isStatusDSUpdating || isVisaStatusUpdating}
                >
                  <SelectTrigger className={cn(!client.visaStatus && "[&>span]:text-muted-foreground")}>
                    <SelectValue placeholder="Selecione o status do visto" />
                  </SelectTrigger>

                  <SelectContent className="z-[99999]">
                    <SelectItem value="awaiting">Aguardando</SelectItem>
                    <SelectItem value="approved">Aprovado</SelectItem>
                    <SelectItem value="disapproved">Reprovado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="w-full flex flex-col-reverse gap-6 sm:flex-col">
              <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Button
                  variant="outline"
                  size="xl"
                  className="flex items-center gap-2"
                  disabled={isDSValidPending || isStatusDSUpdating || isVisaStatusUpdating}
                  onClick={handleComment}
                >
                  <MessageCircleMore className="w-5 h-5" strokeWidth={1.5} />
                  Comentários
                </Button>

                <Button
                  variant="outline"
                  size="xl"
                  className="flex items-center gap-2"
                  disabled={isDSValidPending || isStatusDSUpdating || isVisaStatusUpdating}
                  onClick={handleEditProfile}
                >
                  <Edit className="w-5 h-5" strokeWidth={1.5} />
                  Editar Perfil
                </Button>
              </div>

              <Button
                disabled={isDSValidPending || isStatusDSUpdating || isVisaStatusUpdating}
                size="xl"
                className="flex items-center gap-2"
              >
                <FileText className="w-5 h-5" strokeWidth={1.5} />
                Formulário
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
