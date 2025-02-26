"use client";

import { toast } from "sonner";
import { ptBR } from "date-fns/locale";
import { StatusDS } from "@prisma/client";
import { format, getYear, isValid, parse } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Input } from "../ui/input";

interface Props {
  profileId: string;
  statusForm: "awaiting" | "filling" | "filled";
  statusDS: StatusDS;
  profileName: string;
  CASVDate: Date | null;
  interviewDate: Date | null;
  birthDate: Date | null;
  DSNumber: string;
  updatedAt: Date;
  formStep: number;
}

interface FormRedirectConfirmationProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  birthDate: Date | null;
  formLink: string;
}

function FormRedirectConfirmation({ open, setOpen, birthDate, formLink }: FormRedirectConfirmationProps) {
  const [dateString, setDateString] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [dateError, setDateError] = useState<string>("");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const router = useRouter();
  const currentYear = getYear(new Date());

  useEffect(() => {
    if (!open) {
      setDate(undefined);
    }
  }, [open]);

  useEffect(() => {
    if (date !== undefined) {
      console.log({ date });

      const dateFormatted = format(date, "dd/MM/yyyy");

      setDateString(dateFormatted);
    }
  }, [date]);

  function formatDate(e: ChangeEvent<HTMLInputElement>) {
    let valueFormatted = e.target.value.replace(/[^0-9/]/g, "");

    const parts = valueFormatted.split("/");

    if (parts.length > 3) {
      valueFormatted = parts.slice(0, 3).join("/");
    }

    return valueFormatted;
  }

  function handleDateBlur() {
    const currentDate = dateString;

    if (currentDate) {
      const [day, month, year] = currentDate.split("/");

      if (!day) {
        setDateError("Data inválida");

        return;
      }

      if (!month) {
        setDateError("Data inválida");

        return;
      }

      if (!year) {
        setDateError("Data inválida");

        return;
      }

      if (
        day.length !== 2 ||
        month.length !== 2 ||
        year.length !== 4 ||
        Number(day) === 0 ||
        Number(month) === 0 ||
        Number(year) === 0
      ) {
        setDateError("Data inválida");

        return;
      } else {
        setDateError("");
      }

      if (currentDate?.length === 10) {
        const dateFormatted = parse(currentDate, "dd/MM/yyyy", new Date());

        if (!isValid(dateFormatted)) {
          setDateError("Data inválida");

          return;
        }

        setDate(dateFormatted);
      }
    }
  }

  function submitDate() {
    if (date === undefined || dateString === "") {
      toast.error("Selecione a data de nascimento para prosseguir");

      return;
    }

    if (!birthDate) {
      toast.error("Perfil sem data de nascimento");

      return;
    }

    if (dateString !== format(new Date(birthDate), "dd/MM/yyyy")) {
      toast.error("Data de nascimento inválida");

      return;
    }

    setOpen(false);
    router.push(formLink);
  }

  if (isDesktop) {
    return (
      <AlertDialog open={open}>
        <AlertDialogTrigger asChild>
          <Button variant="secondary" size="xl" className="flex items-center gap-2" onClick={() => setOpen(true)}>
            Formulário
            <ArrowUpRight />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmação de identidade</AlertDialogTitle>

            <div className="w-full flex flex-col gap-2">
              <div className="w-full relative">
                <Input
                  className="pl-14"
                  maxLength={10}
                  placeholder="Insira a data de nascimento"
                  value={dateString}
                  onChange={(e) => {
                    let valueFormatted = formatDate(e);

                    setDateString(valueFormatted);
                  }}
                  onBlur={handleDateBlur}
                />

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="flex items-center gap-2 h-12 py-2 absolute left-2 top-1/2 -translate-y-1/2"
                    >
                      <CalendarIcon strokeWidth={1.5} className="h-5 w-5 text-muted-foreground flex-shrink-0" />

                      <div className="h-full w-[2px] bg-secondary" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0 bg-background" align="start">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      captionLayout="dropdown"
                      fromYear={1900}
                      toYear={currentYear}
                      month={date}
                      classNames={{
                        day_hidden: "invisible",
                        dropdown: "px-2 py-1.5 bg-muted text-primary text-sm focus-visible:outline-none",
                        caption_dropdowns: "flex gap-3",
                        vhidden: "hidden",
                        caption_label: "hidden",
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <span className={cn("text-sm text-destructive", { hidden: dateError === "" })}>{dateError}</span>
            </div>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>Cancelar</AlertDialogCancel>

            <AlertDialogAction onClick={submitDate}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  } else {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="secondary" size="xl" className="flex items-center gap-2" onClick={() => setOpen(true)}>
            Formulário
            <ArrowUpRight />
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Confirmação de identidade</DrawerTitle>

            <div className="w-full flex flex-col gap-2">
              <div className="w-full relative">
                <Input
                  className="pl-14"
                  maxLength={10}
                  placeholder="Insira a data de nascimento"
                  value={dateString}
                  onChange={(e) => {
                    let valueFormatted = formatDate(e);

                    setDateString(valueFormatted);
                  }}
                  onBlur={handleDateBlur}
                />

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="flex items-center gap-2 h-12 py-2 absolute left-2 top-1/2 -translate-y-1/2"
                    >
                      <CalendarIcon strokeWidth={1.5} className="h-5 w-5 text-muted-foreground flex-shrink-0" />

                      <div className="h-full w-[2px] bg-secondary" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0 bg-background" align="start">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      captionLayout="dropdown"
                      fromYear={1900}
                      toYear={currentYear}
                      month={date}
                      classNames={{
                        day_hidden: "invisible",
                        dropdown: "px-2 py-1.5 bg-muted text-primary text-sm focus-visible:outline-none",
                        caption_dropdowns: "flex gap-3",
                        vhidden: "hidden",
                        caption_label: "hidden",
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <span className={cn("text-sm text-destructive", { hidden: dateError === "" })}>{dateError}</span>
            </div>
          </DrawerHeader>

          <DrawerFooter className="pt-2">
            <Button onClick={submitDate}>Confirmar</Button>

            <DrawerClose asChild>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
}

export function ProfileFormBox({
  profileId,
  statusForm,
  statusDS,
  profileName,
  CASVDate,
  interviewDate,
  DSNumber,
  birthDate,
  updatedAt,
  formStep,
}: Props) {
  const [statusDSFormatted, setStatusDSFormatted] = useState<string>("");
  const [statusFormFormatted, setStatusFormFormatted] = useState<string>("");
  const [isFormConfirmationModalOpen, setFormConfirmationModalOpen] = useState<boolean>(false);

  const formLink = formStep > 10 ? `/resumo-formulario/${profileId}` : `/formulario/${profileId}?formStep=${formStep}`;

  useEffect(() => {
    switch (statusDS) {
      case "awaiting":
        setStatusDSFormatted("Aguardando");
        break;
      case "filling":
        setStatusDSFormatted("Preenchendo");
        break;
      case "filled":
        setStatusDSFormatted("Preenchido");
        break;
      case "emitted":
        setStatusDSFormatted("Emitido");
        break;
      default:
        setStatusDSFormatted("Status Offline");
        break;
    }
  }, [statusDS]);

  useEffect(() => {
    switch (statusForm) {
      case "awaiting":
        setStatusFormFormatted("Vazio");
        break;
      case "filling":
        setStatusFormFormatted("Incompleto");
        break;
      case "filled":
        setStatusFormFormatted("Completo");
        break;
      default:
        setStatusFormFormatted("Sem Status");
        break;
    }
  }, [statusForm]);

  return (
    <div className="w-full bg-foreground rounded-2xl p-8 flex flex-col gap-6">
      <div className="w-full flex flex-col gap-4 sm:flex-row sm:justify-between md:flex-col 2xl:flex-row">
        <div className="flex flex-col gap-1 items-center sm:items-start md:items-center 2xl:items-start">
          <h6 className="text-2xl font-semibold text-white">{profileName}</h6>

          <span
            className={cn("w-fit px-2 py-1 text-base font-semibold uppercase text-center rounded-lg", {
              "bg-destructive text-destructive-foreground": statusForm === "awaiting",
              "bg-caution text-caution-foreground": statusForm === "filling",
              "bg-confirm text-confirm-foreground": statusForm === "filled",
            })}
          >
            Formulário {statusFormFormatted}
          </span>
        </div>

        <FormRedirectConfirmation
          open={isFormConfirmationModalOpen}
          setOpen={setFormConfirmationModalOpen}
          birthDate={birthDate}
          formLink={formLink}
        />
      </div>

      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col gap-4 items-center p-9 bg-[#6A7DA6] rounded-lg sm:flex-row sm:justify-around md:flex-col md:justify-start 2xl:flex-row 2xl:justify-around">
          <div className="w-fit flex flex-col items-center gap-1">
            <span className="text-sm font-medium text-white/75">Data do CASV</span>
            <span className="text-lg font-semibold text-white">
              {CASVDate ? format(new Date(CASVDate), "dd/MM/yyyy") : "--/--/----"}
            </span>
          </div>

          <div className="w-fit flex flex-col items-center gap-1">
            <span className="text-sm font-medium text-white/75">Data da Entrevista</span>
            <span className="text-lg font-semibold text-white">
              {interviewDate ? format(new Date(interviewDate), "dd/MM/yyyy") : "--/--/----"}
            </span>
          </div>

          <div className="w-fit flex flex-col items-center gap-1">
            <span className="text-sm font-medium text-white/75">Número DS</span>
            <span className="text-lg font-semibold text-white">{DSNumber ? DSNumber : "---"}</span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2 items-center sm:flex-row sm:justify-between md:flex-col md:justify-start 2xl:flex-row 2xl:justify-between">
          <div className="flex items-center gap-2 h-5">
            <span className="text-secondary text-base font-medium">Status DS</span>
            <div className="h-full w-[1.5px] rounded-full bg-secondary" />
            <strong className="text-secondary text-base font-semibold">{statusDSFormatted}</strong>
          </div>

          <span className="text-secondary text-sm font-medium">
            Última Atualização: {format(new Date(updatedAt), "dd/MM/yyyy")}
          </span>
        </div>
      </div>
    </div>
  );
}
