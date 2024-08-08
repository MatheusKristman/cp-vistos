"use client";

import { motion } from "framer-motion";
import {
  Edit,
  NotepadText,
  Check,
  ChevronsUpDown,
  RotateCw,
  MessageCircleMore,
  FileText,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { format } from "date-fns";

import { ModalAnimation, OverlayAnimation } from "@/constants/animations/modal";
import { Button } from "../ui/button";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const profiles = [
  {
    value: "matheus_kristman",
    label: "Matheus Kristman Galhardo",
  },
  {
    value: "giselli_galhardo",
    label: "Giselli Kristman Galhardo",
  },
  {
    value: "liam_galhardo_kristman",
    label: "Liam Kristman Galhardo",
  },
  {
    value: "meggy_kristman_galhardo",
    label: "Meggy Kristman Galhardo",
  },
];

export function ClientDetailsModal() {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  return (
    <motion.div
      key="formsSelected[selected]-modal"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={OverlayAnimation}
      className="w-screen h-screen bg-black/80 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle"
    >
      <motion.div
        key="formsSelected[selected]-modal"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={ModalAnimation}
        className="w-full max-w-[800px] bg-white p-6 inline-block align-middle overflow-x-hidden text-left"
      >
        <div className="w-full flex flex-col-reverse gap-4 mb-12 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-foreground">
            Matheus Kristman
          </h1>

          <Button variant="link" size="icon" className="self-end">
            <Image
              src="/assets/icons/cross-blue.svg"
              alt="Fechar"
              width={24}
              height={24}
            />
          </Button>
        </div>

        <div className="w-full flex flex-col gap-9">
          <div className="w-full flex flex-col gap-6">
            <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Endereço
                </span>

                <span className="text-lg font-medium text-foreground">
                  Rua General Porfírio da Paz, 1350 - 03918-000
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  CPF
                </span>

                <span className="text-lg font-medium text-foreground">
                  123.123.123-12
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  E-mail
                </span>

                <span className="text-lg font-medium text-foreground">
                  teste@teste.com
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Senha
                </span>

                <span className="text-lg font-medium text-foreground">
                  123123
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Valor
                </span>

                <span className="text-lg font-medium text-foreground">
                  {formatPrice(100)}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Conta de Agendamento
                </span>

                <span className="text-lg font-medium text-foreground">
                  Ativado
                </span>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-6 sm:flex-row">
            <Button
              size="xl"
              className="w-full flex items-center gap-2 sm:w-fit"
            >
              <NotepadText className="w-5 h-5" strokeWidth={1.5} />
              Anotações
            </Button>

            <Button
              variant="outline"
              size="xl"
              className="w-full flex items-center gap-2 sm:w-fit"
            >
              <Edit className="w-5 h-5" strokeWidth={1.5} />
              Editar Conta
            </Button>
          </div>

          <div className="w-full flex flex-col gap-6">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between sm:w-[250px] sm:self-end"
                >
                  {value
                    ? profiles.find((profile) => profile.value === value)?.label
                    : "Selecione o perfil"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-full p-0 z-[99999]">
                <Command className="w-full">
                  <CommandInput placeholder="Pesquise o perfil..." />
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {profiles.map((profile) => (
                        <CommandItem
                          key={profile.value}
                          value={profile.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue,
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === profile.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {profile.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <div className="w-full flex flex-col gap-6">
              <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-foreground/50">
                    Barcode
                  </span>

                  <span className="text-base font-medium text-foreground">
                    12123123
                  </span>
                </div>

                <div className="w-full flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-foreground/50">
                      Data do barcode
                    </span>

                    <span className="text-base font-medium text-foreground">
                      {format(new Date(), "dd/MM/yyyy")}
                    </span>
                  </div>

                  <Button variant="outline" size="icon" className="rounded-lg">
                    <RotateCw className="w-6 h-6" strokeWidth={1.5} />
                  </Button>
                </div>
              </div>

              <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-foreground/50">
                    Data de Nascimento
                  </span>

                  <span className="text-base font-medium text-foreground">
                    {format(new Date(), "dd/MM/yyyy")}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-medium text-foreground/50">
                    Passaporte
                  </span>

                  <span className="text-base font-medium text-foreground">
                    12123123
                  </span>
                </div>
              </div>

              <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-foreground/50">
                    Classe do Visto
                  </span>

                  <span className="text-base font-medium text-foreground line-clamp-2">
                    O2 Estrangeiro Acompanhante/Assistente
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-medium text-foreground/50">
                    Tipo de Visto
                  </span>

                  <span className="text-base font-medium text-foreground">
                    Renovação
                  </span>
                </div>
              </div>

              <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-foreground/50">
                    Data CASV
                  </span>

                  <span className="text-base font-medium text-foreground line-clamp-2">
                    {format(new Date(), "dd/MM/yyyy")}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-medium text-foreground/50">
                    Data da Entrevista
                  </span>

                  <span className="text-base font-medium text-foreground">
                    {format(new Date(), "dd/MM/yyyy")}
                  </span>
                </div>
              </div>

              <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-foreground/50">
                    Status do DS
                  </span>

                  <Select>
                    <SelectTrigger
                      className={cn(true && "[&>span]:text-muted-foreground")}
                    >
                      <SelectValue placeholder="Selecione o Status do DS" />
                    </SelectTrigger>

                    <SelectContent className="z-[99999]">
                      <SelectItem value="awaiting">Aguardando</SelectItem>
                      <SelectItem value="filling">Preenchendo</SelectItem>
                      <SelectItem value="filled">Preenchido</SelectItem>
                      <SelectItem value="emitted">Emitido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-medium text-foreground/50">
                    Status do Visto
                  </span>

                  <Select>
                    <SelectTrigger
                      className={cn(true && "[&>span]:text-muted-foreground")}
                    >
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
                  >
                    <MessageCircleMore className="w-5 h-5" strokeWidth={1.5} />
                    Comentários
                  </Button>

                  <Button
                    variant="outline"
                    size="xl"
                    className="flex items-center gap-2"
                  >
                    <Edit className="w-5 h-5" strokeWidth={1.5} />
                    Editar Perfil
                  </Button>
                </div>

                <Button size="xl" className="flex items-center gap-2">
                  <FileText className="w-5 h-5" strokeWidth={1.5} />
                  Formulário
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
