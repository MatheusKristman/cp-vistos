//TODO: criar função para submit
//TODO: mandar para o proximo formulário
//TODO: validar se o hasBeenOnUSAConfirmation e o USALastTravel estão preenchidos
//TODO: validar se o americanLicenseToDriveConfirmation e o americanLicense estão preenchidos

"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Control, useForm } from "react-hook-form";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Plus,
  Save,
  Trash,
} from "lucide-react";
import { format, getYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  AmericanLicense,
  Form as FormType,
  OtherPeopleTraveling,
  USALastTravel,
} from "@prisma/client";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { CheckedState } from "@radix-ui/react-checkbox";
import { PrimaryFormControl } from "@/types";

interface Props {
  formControl: Control<PrimaryFormControl>;
}

// hasBeenOnUSAConfirmation                      Boolean?
// USALastTravel                                 USALastTravel[]
// americanLicenseToDriveConfirmation            Boolean?
// americanLicense                               AmericanLicense[]
// USAVisaConfirmation                           Boolean?
// visaIssuingDate                               DateTime?
// visaNumber                                    String?
// newVisaConfirmation                           Boolean?
// sameCountryResidenceConfirmation              Boolean?
// sameVisaTypeConfirmation                      Boolean?
// fingerprintsProvidedConfirmation              Boolean?
// lostVisaConfirmation                          Boolean?
// lostVisaDetails                               String?
// canceledVisaConfirmation                      Boolean?
// canceledVisaDetails                           String?
// deniedVisaConfirmation                        Boolean?
// deniedVisaDetails                             String?
// consularPost                                  String?
// deniedVisaType                                String?
// immigrationRequestByAnotherPersonConfirmation Boolean?
// immigrationRequestByAnotherPersonDetails      String?

export function PreviousTravelForm({ formControl }: Props) {
  return (
    <div>
      <div>PreviousTravelForm</div>
    </div>
  );
}
