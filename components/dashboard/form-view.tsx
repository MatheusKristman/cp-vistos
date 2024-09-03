"use client";

import Link from "next/link";
import { format } from "date-fns";
import { Edit, MoveRight } from "lucide-react";
import { Form as FormType } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { formatPrice } from "@/lib/utils";

interface Props {
  form: FormType;
  profileId: string;
}

export function FormView({ form, profileId }: Props) {
  function formatPhone(value: string) {
    if (!value) return;

    return value
      .replace(/\D+/g, "")
      .replace(/(\d{2})(\d{2})(\d{4,5})(\d{4})/, "+$1 ($2) $3-$4");
  }

  return (
    <div className="w-full flex flex-col gap-9 bg-secondary py-6 px-8 sm:py-8 sm:px-11">
      <div className="w-full flex flex-col items-center justify-between gap-4 sm:flex-row">
        <h2 className="text-2xl text-center text-foreground w-full font-semibold sm:text-left sm:w-fit sm:text-3xl">
          Resumo do formulário
        </h2>

        <Button
          size="xl"
          className="w-full flex items-center gap-2 sm:w-fit"
          asChild
        >
          <Link href="/area-do-cliente">
            Voltar para painel{" "}
            <MoveRight className="size-5" strokeWidth={1.5} />
          </Link>
        </Button>
      </div>

      <Accordion type="single" collapsible className="flex flex-col gap-6">
        <AccordionItem
          value="personal-data"
          className="bg-white p-6 sm:p-6 flex flex-col gap-9 border-0"
        >
          <AccordionTrigger className="text-lg text-left text-foreground font-semibold hover:no-underline">
            Dados Pessoais
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Primeiro Nome
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.firstName ? form.firstName : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Sobrenome
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.lastName ? form.lastName : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  CPF
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.cpf ? form.cpf : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Código ou Nome de Guerra
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.warName ? form.warName : "Não possui"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Outros Nomes (Religioso, Solteiro, etc...)
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.otherNames && form.otherNames.length > 0
                    ? form.otherNames.join(" | ")
                    : "Não possui"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Sexo
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.sex ? form.sex : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Estado Civil
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.maritalStatus ? form.maritalStatus : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Data de Nascimento
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.birthDate
                    ? format(form.birthDate, "dd/MM/yyyy")
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Cidade de Nascimento
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.birthCity ? form.birthCity : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Estado de Nascimento
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.birthState ? form.birthState : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  País de Nascimento
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.birthCountry ? form.birthCountry : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  País de Origem (Nacionalidade)
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.originCountry ? form.originCountry : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Número do passaporte em caso de outra nacionalidade
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.otherNationalityPassport &&
                  form.otherNationalityPassport.length > 0
                    ? form.otherNationalityPassport
                    : "Não possui"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Residente de um país diferente de sua nacionalidade
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.otherCountryResidentConfirmation ? "Sim" : "Não"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  U.S. Social Security Number
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.USSocialSecurityNumber
                    ? form.USSocialSecurityNumber
                    : "Não possui"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  U.S. Taxpayer ID Number
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.USTaxpayerIDNumber
                    ? form.USTaxpayerIDNumber
                    : "Não possui"}
                </span>
              </div>
            </div>

            <Button
              size="xl"
              className="w-full sm:w-fit flex items-center gap-2"
              asChild
            >
              <Link href={`/formulario/${profileId}?formStep=0&isEditing=true`}>
                Editar <Edit className="size-5" strokeWidth={1.5} />
              </Link>
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="contacts-and-address"
          className="bg-white p-6 flex flex-col gap-9 border-0"
        >
          <AccordionTrigger className="text-lg text-left text-foreground font-semibold hover:no-underline">
            Endereço e Contatos
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Endereço Residencial
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.address ? form.address : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Número do Endereço
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.addressNumber ? form.addressNumber : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Bairro
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.district ? form.district : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Complemento
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.complement ? form.complement : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  CEP
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.cep ? form.cep : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Cidade
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.city ? form.city : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Estado
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.state ? form.state : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  País
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.country ? form.country : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Endereço de Correio
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.postalAddressConfirmation === false
                    ? "É o mesmo da residencia"
                    : form.otherPostalAddress &&
                        form.otherPostalAddress.length > 0
                      ? form.otherPostalAddress
                      : "Não preencheu o endereço"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Celular
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.cel ? formatPhone(form.cel) : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Telefone
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.tel ? formatPhone(form.tel) : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  E-mail
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.email ? form.email : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Outro Telefone
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.fiveYearsOtherTelConfirmation &&
                  form.otherTel &&
                  form.otherTel.length > 0
                    ? formatPhone(form.otherTel)
                    : "Não possui"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Outro E-mail
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.fiveYearsOtherEmailConfirmation &&
                  form.otherEmail &&
                  form.otherEmail.length > 0
                    ? form.otherEmail
                    : "Não possui"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Facebook
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.facebook ? form.facebook : "Não possui"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  LinkedIn
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.linkedin ? form.linkedin : "Não possui"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Instagram
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.instagram ? form.instagram : "Não possui"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Outras Redes
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.othersSocialMedia
                    ? form.othersSocialMedia
                    : "Não possui"}
                </span>
              </div>
            </div>

            <Button
              size="xl"
              className="w-full sm:w-fit flex items-center gap-2"
              asChild
            >
              <Link href={`/formulario/${profileId}?formStep=1&isEditing=true`}>
                Editar <Edit className="size-5" strokeWidth={1.5} />
              </Link>
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="passport"
          className="bg-white p-6 flex flex-col gap-9 border-0"
        >
          <AccordionTrigger className="text-lg text-left text-foreground font-semibold hover:no-underline">
            Passaporte
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Número do Passaporte
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.passportNumber ? form.passportNumber : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Cidade de Emissão
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.passportCity ? form.passportCity : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Estado de Emissão
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.passportState ? form.passportState : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  País de Emissão
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.passportIssuingCountry
                    ? form.passportIssuingCountry
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Data de Emissão
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.passportIssuingDate
                    ? format(form.passportIssuingDate, "dd/MM/yyyy")
                    : "Não preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Data de Expiração
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.passportExpireDate
                    ? format(form.passportExpireDate, "dd/MM/yyyy")
                    : "Sem expiração"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Já perdeu ou teve o passaporte roubado?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.passportLostConfirmation ? "Sim" : "Não"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Número do Passaporte Perdido/Roubado
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.passportLostConfirmation
                    ? form.lostPassportNumber
                      ? form.lostPassportNumber
                      : "Não Preenchido"
                    : "Não Possui Passaporte Perdido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  País do Passaporte Perdido/Roubado
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.passportLostConfirmation
                    ? form.lostPassportCountry
                      ? form.lostPassportCountry
                      : "Não Preenchido"
                    : "Não Possui Passaporte Perdido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Explique o que ocorreu
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.passportLostConfirmation
                    ? form.lostPassportDetails
                      ? form.lostPassportDetails
                      : "Não Preenchido"
                    : "Não Possui Passaporte Perdido"}
                </span>
              </div>
            </div>

            <Button
              size="xl"
              className="w-full sm:w-fit flex items-center gap-2"
              asChild
            >
              <Link href={`/formulario/${profileId}?formStep=2&isEditing=true`}>
                Editar <Edit className="size-5" strokeWidth={1.5} />
              </Link>
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="about-travel"
          className="bg-white p-6 flex flex-col gap-9 border-0"
        >
          <AccordionTrigger className="text-lg text-left text-foreground font-semibold hover:no-underline">
            Sobre a Viagem
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Possui itinerário de viagem?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.travelItineraryConfirmation ? "Sim" : "Não"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Data prevista de chegada nos EUA
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.travelItineraryConfirmation && form.USAPreviewArriveDate
                    ? format(form.USAPreviewArriveDate, "dd/MM/yyyy")
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Número do voo de chegada
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.travelItineraryConfirmation &&
                  form.arriveFlyNumber &&
                  form.arriveFlyNumber.length > 0
                    ? form.arriveFlyNumber
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Cidade de chegada
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.travelItineraryConfirmation &&
                  form.arriveCity &&
                  form.arriveCity.length > 0
                    ? form.arriveCity
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Data prevista de retorno ao Brasil
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.travelItineraryConfirmation && form.USAPreviewReturnDate
                    ? format(form.USAPreviewReturnDate, "dd/MM/yyyy")
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Número do voo de partida
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.travelItineraryConfirmation &&
                  form.returnFlyNumber &&
                  form.returnFlyNumber.length > 0
                    ? form.returnFlyNumber
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Cidade de partida
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.travelItineraryConfirmation &&
                  form.returnCity &&
                  form.returnCity.length > 0
                    ? form.returnCity
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Tempo estimado de permanência nos EUA
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.estimatedTimeOnUSA && form.estimatedTimeOnUSA.length > 0
                    ? form.estimatedTimeOnUSA
                    : "Não sabe"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Locais que irá visitar
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.visitLocations && form.visitLocations.length > 0
                    ? form.visitLocations.join(" | ")
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Endereço completo onde ficará nos EUA
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.USACompleteAddress && form.USACompleteAddress.length > 0
                    ? form.USACompleteAddress
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  ZIP Code de onde ficará nos EUA
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.USAZipCode && form.USAZipCode.length > 0
                    ? form.USAZipCode
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Cidade nos EUA
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.USACity && form.USACity.length > 0
                    ? form.USACity
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Estado nos EUA
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.USAState && form.USAState.length > 0
                    ? form.USAState
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Nome ou empresa que pagará a viagem
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.payerNameOrCompany && form.payerNameOrCompany.length > 0
                    ? form.payerNameOrCompany
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Telefone Residencial
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.payerTel && form.payerTel.length > 0
                    ? formatPhone(form.payerTel)
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Endereço Completo
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.payerAddress && form.payerAddress.length > 0
                    ? form.payerAddress
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Relação com o solicitante
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.payerRelation && form.payerRelation.length > 0
                    ? form.payerRelation
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  E-mail
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.payerEmail && form.payerEmail.length > 0
                    ? form.payerEmail
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <Button
              size="xl"
              className="w-full sm:w-fit flex items-center gap-2"
              asChild
            >
              <Link href={`/formulario/${profileId}?formStep=3&isEditing=true`}>
                Editar <Edit className="size-5" strokeWidth={1.5} />
              </Link>
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="travel-company"
          className="bg-white p-6 flex flex-col gap-9 border-0"
        >
          <AccordionTrigger className="text-lg text-left text-foreground font-semibold hover:no-underline">
            Companhia de Viagem
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full flex flex-col gap-9">
              {form.otherPeopleTravelingConfirmation &&
              form.otherPeopleTraveling &&
              form.otherPeopleTraveling.length > 0 ? (
                form.otherPeopleTraveling.map((otherPeople, index) => (
                  <div
                    key={`otherPeopleTraveling-${index}`}
                    className="w-full bg-[#D3D3E2] p-5 flex flex-col gap-4"
                  >
                    <div className="w-full flex flex-col sm:flex-row items-center gap-2">
                      <div className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white text-lg font-medium">
                          {index + 1}
                        </span>
                      </div>

                      <span className="text-foreground text-lg text-center font-medium">
                        Pessoa Acompanhante
                      </span>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          Nome completo da outra pessoa
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {otherPeople.name}
                        </span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          Relação com a outra pessoa
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {otherPeople.relation}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full bg-[#D3D3E2] p-5 flex items-center justify-center">
                  <span className="text-foreground text-lg text-center font-semibold">
                    Não possui pessoa acompanhante
                  </span>
                </div>
              )}
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Esta viajando como integrante de um grupo de viagem?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.groupMemberConfirmation ? "Sim" : "Não"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Nome da organização ou grupo
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.groupMemberConfirmation &&
                  form.groupName &&
                  form.groupName.length > 0
                    ? form.groupName
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <Button
              size="xl"
              className="w-full sm:w-fit flex items-center gap-2"
              asChild
            >
              <Link href={`/formulario/${profileId}?formStep=4&isEditing=true`}>
                Editar <Edit className="size-5" strokeWidth={1.5} />
              </Link>
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="previous-travel"
          className="bg-white p-6 flex flex-col gap-9 border-0"
        >
          <AccordionTrigger className="text-lg text-left text-foreground font-semibold hover:no-underline">
            Viagens Anteriores
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Já foi para os EUA?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.hasBeenOnUSAConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-9">
              {form.hasBeenOnUSAConfirmation &&
              form.USALastTravel &&
              form.USALastTravel.length > 0 ? (
                form.USALastTravel.map((lastTravel, index) => (
                  <div
                    key={`USALastTravel-${index}`}
                    className="w-full bg-[#D3D3E2] p-5 flex flex-col gap-4"
                  >
                    <div className="w-full flex flex-col sm:flex-row items-center gap-2">
                      <div className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white text-lg font-medium">
                          {index + 1}
                        </span>
                      </div>

                      <span className="text-foreground text-lg text-center font-medium">
                        Viagem
                      </span>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          Data prevista de chegada nos EUA
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {lastTravel.arriveDate
                            ? format(lastTravel.arriveDate, "dd/MM/yyyy")
                            : "Não Preenchido"}
                        </span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          Tempo estimado de permanência nos EUA
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {lastTravel.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full bg-[#D3D3E2] p-5 flex items-center justify-center">
                  <span className="text-foreground text-lg text-center font-semibold">
                    Não possui viagem anterior
                  </span>
                </div>
              )}
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Já obteve uma licença americana para dirigir nos EUA?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.americanLicenseToDriveConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-9">
              {form.americanLicenseToDriveConfirmation &&
              form.americanLicense &&
              form.americanLicense.length > 0 ? (
                form.americanLicense.map((americanLicense, index) => (
                  <div
                    key={`americanLicense-${index}`}
                    className="w-full bg-[#FDF0D2] p-5 flex flex-col gap-4"
                  >
                    <div className="w-full flex flex-col sm:flex-row items-center gap-2">
                      <div className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white text-lg font-medium">
                          {index + 1}
                        </span>
                      </div>

                      <span className="text-foreground text-lg text-center font-medium">
                        Licença
                      </span>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          Número da licença
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {americanLicense.licenseNumber}
                        </span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          Estado
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {americanLicense.state}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full bg-[#FDF0D2] p-5 flex items-center justify-center">
                  <span className="text-foreground text-lg text-center font-semibold">
                    Não possui licença
                  </span>
                </div>
              )}
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Já obteve visto nos EUA?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.USAVisaConfirmation ? "Sim" : "Não"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Data de Emissão do Visto
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.visaIssuingDate
                    ? format(form.visaIssuingDate, "dd/MM/yyyy")
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Número do Visto
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.visaNumber && form.visaNumber.length > 0
                    ? form.visaNumber
                    : "Não sei o número"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Está solicitando o novo visto do mesmo país ou localização
                  daquele concedido previamente?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.newVisaConfirmation ? "Sim" : "Não"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Este país é o mesmo onde está localizada sua residencia
                  principal?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.sameCountryResidenceConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Está solicitando o mesmo tipo de visto concedido
                  anteriormente?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.sameVisaTypeConfirmation ? "Sim" : "Não"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Forneceu digitais dos 10 dedos?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.fingerprintsProvidedConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Já teve um visto perdido ou roubado?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.lostVisaConfirmation ? "Sim" : "Não"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  O que ocorreu com o visto perdido ou roubado
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.lostVisaDetails && form.lostVisaDetails.length > 0
                    ? form.lostVisaDetails
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Já teve um visto revogado ou cancelado?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.canceledVisaConfirmation ? "Sim" : "Não"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  O que ocorreu com o visto revogado ou cancelado
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.canceledVisaDetails &&
                  form.canceledVisaDetails.length > 0
                    ? form.canceledVisaDetails
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Já teve um visto negado?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.deniedVisaConfirmation ? "Sim" : "Não"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  O que ocorreu com o visto negado
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.deniedVisaDetails && form.deniedVisaDetails.length > 0
                    ? form.deniedVisaDetails
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Posto Consular no Brasil
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.consularPost && form.consularPost.length > 0
                    ? form.consularPost
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Categoria/tipo de visto negado
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.deniedVisaType && form.deniedVisaType.length > 0
                    ? form.deniedVisaType
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Alguém já solicitou alguma petição de imigração em seu nome
                  perante o Departamento de Imigração dos Estados Unidos?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.immigrationRequestByAnotherPersonConfirmation
                    ? "Sim"
                    : "Não"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Motivo
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.immigrationRequestByAnotherPersonDetails &&
                  form.immigrationRequestByAnotherPersonDetails.length > 0
                    ? form.immigrationRequestByAnotherPersonDetails
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <Button
              size="xl"
              className="w-full sm:w-fit flex items-center gap-2"
              asChild
            >
              <Link href={`/formulario/${profileId}?formStep=5&isEditing=true`}>
                Editar <Edit className="size-5" strokeWidth={1.5} />
              </Link>
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="usa-contacts"
          className="bg-white p-6 flex flex-col gap-9 border-0"
        >
          <AccordionTrigger className="text-lg text-left text-foreground font-semibold hover:no-underline">
            Contato nos Estados Unidos
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Nome completo da pessoa ou organização
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.organizationOrUSAResidentName &&
                  form.organizationOrUSAResidentName.length > 0
                    ? form.organizationOrUSAResidentName
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Relação do contato com você
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.organizationOrUSAResidentRelation &&
                  form.organizationOrUSAResidentRelation.length > 0
                    ? form.organizationOrUSAResidentRelation
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Endereço completo do contato
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.organizationOrUSAResidentAddress &&
                  form.organizationOrUSAResidentAddress.length > 0
                    ? form.organizationOrUSAResidentAddress
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  ZIP Code do contato
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.organizationOrUSAResidentZipCode &&
                  form.organizationOrUSAResidentZipCode.length > 0
                    ? form.organizationOrUSAResidentZipCode
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Cidade do contato
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.organizationOrUSAResidentCity &&
                  form.organizationOrUSAResidentCity.length > 0
                    ? form.organizationOrUSAResidentCity
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Estado do contato
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.organizationOrUSAResidentState &&
                  form.organizationOrUSAResidentState.length > 0
                    ? form.organizationOrUSAResidentState
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  País do contato
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.organizationOrUSAResidentCountry &&
                  form.organizationOrUSAResidentCountry.length > 0
                    ? form.organizationOrUSAResidentCountry
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Telefone do contato
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.organizationOrUSAResidentTel &&
                  form.organizationOrUSAResidentTel.length > 0
                    ? formatPhone(form.organizationOrUSAResidentTel)
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  E-mail do contato
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.organizationOrUSAResidentEmail &&
                  form.organizationOrUSAResidentEmail.length > 0
                    ? form.organizationOrUSAResidentEmail
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <Button
              size="xl"
              className="w-full sm:w-fit flex items-center gap-2"
              asChild
            >
              <Link href={`/formulario/${profileId}?formStep=6&isEditing=true`}>
                Editar <Edit className="size-5" strokeWidth={1.5} />
              </Link>
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="family"
          className="bg-white p-6 flex flex-col gap-9 border-0"
        >
          <AccordionTrigger className="text-lg text-left text-foreground font-semibold hover:no-underline">
            Informações da Família
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Nome Completo do Pai
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.fatherCompleteName && form.fatherCompleteName.length > 0
                    ? form.fatherCompleteName
                    : "Não preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Data de Nascimento do Pai
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.fatherBirthdate
                    ? format(form.fatherBirthdate, "dd/MM/yyyy")
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Pai se encontra nos EUA?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.fatherLiveInTheUSAConfirmation ? "Sim" : "Não"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Situação do Pai
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.fatherUSASituation && form.fatherUSASituation.length > 0
                    ? form.fatherUSASituation
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Nome Completo do Mãe
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.motherCompleteName && form.motherCompleteName.length > 0
                    ? form.motherCompleteName
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Data de Nascimento do Mãe
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.motherBirthdate
                    ? format(form.motherBirthdate, "dd/MM/yyyy")
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Mãe se encontra nos EUA?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.motherLiveInTheUSAConfirmation ? "Sim" : "Não"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Situação do Mãe
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.motherUSASituation && form.motherUSASituation.length > 0
                    ? form.motherUSASituation
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Há alguém da família nos EUA?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.familyLivingInTheUSAConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-9">
              {form.familyLivingInTheUSAConfirmation &&
              form.familyLivingInTheUSA &&
              form.familyLivingInTheUSA.length > 0 ? (
                form.familyLivingInTheUSA.map((familyLivingInTheUSA, index) => (
                  <div
                    key={`familyLivingInTheUSA-${index}`}
                    className="w-full bg-[#D3D3E2] p-5 flex flex-col gap-4"
                  >
                    <div className="w-full flex flex-col sm:flex-row items-center gap-2">
                      <div className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white text-lg font-medium">
                          {index + 1}
                        </span>
                      </div>

                      <span className="text-foreground text-lg text-center font-medium">
                        Familiar
                      </span>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          Nome do Parente
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {familyLivingInTheUSA.name}
                        </span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          Parentesco
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {familyLivingInTheUSA.relation}
                        </span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          Situação do Parente
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {familyLivingInTheUSA.situation}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full bg-[#D3D3E2] p-5 flex items-center justify-center">
                  <span className="text-foreground text-lg text-center font-semibold">
                    Não possui outro familiar
                  </span>
                </div>
              )}
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Nome Completo (Cônjuge/Parceiro/Ex-Cônjuge)
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.partnerCompleteName &&
                  form.partnerCompleteName.length > 0
                    ? form.partnerCompleteName
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Data de Nascimento (Cônjuge/Parceiro/Ex-Cônjuge)
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.partnerBirthdate
                    ? format(form.partnerBirthdate, "dd/MM/yyyy")
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Nacionalidade (Cônjuge/Parceiro/Ex-Cônjuge)
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.partnerNationality && form.partnerNationality.length > 0
                    ? form.partnerNationality
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Cidade de Nascimento (Cônjuge/Parceiro/Ex-Cônjuge)
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.partnerCity && form.partnerCity.length > 0
                    ? form.partnerCity
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Estado de Nascimento (Cônjuge/Parceiro/Ex-Cônjuge)
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.partnerState && form.partnerState.length > 0
                    ? form.partnerState
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  País de Nascimento (Cônjuge/Parceiro/Ex-Cônjuge)
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.partnerCountry && form.partnerCountry.length > 0
                    ? form.partnerCountry
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Data da União (Cônjuge/Parceiro/Ex-Cônjuge)
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.unionDate
                    ? format(form.unionDate, "dd/MM/yyyy")
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Data da Separação (Cônjuge/Parceiro/Ex-Cônjuge)
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.divorceDate
                    ? format(form.divorceDate, "dd/MM/yyyy")
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <Button
              size="xl"
              className="w-full sm:w-fit flex items-center gap-2"
              asChild
            >
              <Link href={`/formulario/${profileId}?formStep=7&isEditing=true`}>
                Editar <Edit className="size-5" strokeWidth={1.5} />
              </Link>
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="work-education"
          className="bg-white p-6 flex flex-col gap-9 border-0"
        >
          <AccordionTrigger className="text-lg text-left text-foreground font-semibold hover:no-underline">
            Trabalho e Educação
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Ocupação atual
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.occupation && form.occupation.length > 0
                    ? form.occupation
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Cargo/Função
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.office && form.office.length > 0
                    ? form.office
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Nome do empregador ou empresa atual
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.companyOrBossName && form.companyOrBossName.length > 0
                    ? form.companyOrBossName
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Endereço completo da empresa
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.companyAddress && form.companyAddress.length > 0
                    ? form.companyAddress
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Cidade da empresa
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.companyCity && form.companyCity.length > 0
                    ? form.companyCity
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Estado da empresa
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.companyState && form.companyState.length > 0
                    ? form.companyState
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  País da empresa
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.companyCountry && form.companyCountry.length > 0
                    ? form.companyCountry
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Cep da empresa
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.companyCep && form.companyCep.length > 0
                    ? form.companyCep
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Telefone da empresa
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.companyTel && form.companyTel.length > 0
                    ? formatPhone(form.companyTel)
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Data de admissão
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.admissionDate
                    ? format(form.admissionDate, "dd/MM/yyyy")
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Data de aposentadoria
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.retireeDate
                    ? format(form.retireeDate, "dd/MM/yyyy")
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Renda mensal (R$)
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.monthlySalary
                    ? formatPrice(form.monthlySalary)
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Descreva quais são as suas funções dentro da sua empresa, se
                  possui funcionários registrados e outras informações
                  relacionadas ao seu negócio
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.jobDetails && form.jobDetails.length > 0
                    ? form.jobDetails
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-9">
              {form.previousJobConfirmation &&
              form.previousJobs &&
              form.previousJobs.length > 0 ? (
                form.previousJobs.map((previousJobs, index) => (
                  <div
                    key={`previousJobs-${index}`}
                    className="w-full bg-[#D3D3E2] p-5 flex flex-col gap-4"
                  >
                    <div className="w-full flex flex-col sm:flex-row items-center gap-2">
                      <div className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white text-lg font-medium">
                          {index + 1}
                        </span>
                      </div>

                      <span className="text-foreground text-lg text-center font-medium">
                        Emprego Anterior
                      </span>
                    </div>

                    <div className="w-full grid grid-cols-1 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          Nome do empregador ou empresa anterior
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {previousJobs.companyName}
                        </span>
                      </div>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          Endereço completo da empresa
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {previousJobs.companyAddress}
                        </span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          Cidade da empresa
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {previousJobs.companyCity}
                        </span>
                      </div>
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          Estado da empresa
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {previousJobs.companyState}
                        </span>
                      </div>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          País da empresa
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {previousJobs.companyCountry}
                        </span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          CEP da empresa
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {previousJobs.companyCep}
                        </span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          Telefone da empresa
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {previousJobs.companyTel
                            ? formatPhone(previousJobs.companyTel)
                            : "Não Preenchido"}
                        </span>
                      </div>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          Cargo / Função
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {previousJobs.office}
                        </span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          Nome completo do supervisor
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {previousJobs.supervisorName}
                        </span>
                      </div>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          Data de admissão
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {previousJobs.admissionDate
                            ? format(previousJobs.admissionDate, "dd/MM/yyyy")
                            : "Não Preenchido"}
                        </span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          Data de demissão
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {previousJobs.resignationDate
                            ? format(previousJobs.resignationDate, "dd/MM/yyyy")
                            : "Não Preenchido"}
                        </span>
                      </div>
                    </div>

                    <div className="w-full grid grid-cols-1 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          Descrição da tarefa exercida
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {previousJobs.jobDescription}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full bg-[#D3D3E2] p-5 flex items-center justify-center">
                  <span className="text-foreground text-lg text-center font-semibold">
                    Não possui emprego anterior
                  </span>
                </div>
              )}
            </div>

            <div className="w-full flex flex-col gap-9">
              {form.courses && form.courses.length > 0 ? (
                form.courses.map((course, index) => (
                  <div
                    key={`courses-${index}`}
                    className="w-full bg-[#FDF0D2] p-5 flex flex-col gap-4"
                  >
                    <div className="w-full flex flex-col sm:flex-row items-center gap-2">
                      <div className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white text-lg font-medium">
                          {index + 1}
                        </span>
                      </div>

                      <span className="text-foreground text-lg text-center font-medium">
                        Instituição de Ensino Anterior
                      </span>
                    </div>

                    <div className="w-full grid grid-cols-1 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          Nome completo da instituição
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {course.institutionName}
                        </span>
                      </div>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          Endereço completo da instituição
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {course.address}
                        </span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          Cidade da instituição
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {course.city}
                        </span>
                      </div>
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          Estado da instituição
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {course.state}
                        </span>
                      </div>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          País da instituição
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {course.country}
                        </span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          CEP da instituição
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {course.cep}
                        </span>
                      </div>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          Nome do curso
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {course.courseName}
                        </span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          Data de início
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {course.initialDate
                            ? format(course.initialDate, "dd/MM/yyyy")
                            : "Não Preenchido"}
                        </span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-sm text-foreground/70 font-medium">
                          Data de término
                        </span>

                        <span className="text-lg font-medium text-foreground">
                          {course.finishDate
                            ? format(course.finishDate, "dd/MM/yyyy")
                            : "Não Preenchido"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full bg-[#FDF0D2] p-5 flex items-center justify-center">
                  <span className="text-foreground text-lg text-center font-semibold">
                    Não possui ensino anterior
                  </span>
                </div>
              )}
            </div>

            <Button
              size="xl"
              className="w-full sm:w-fit flex items-center gap-2"
              asChild
            >
              <Link href={`/formulario/${profileId}?formStep=8&isEditing=true`}>
                Editar <Edit className="size-5" strokeWidth={1.5} />
              </Link>
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="additional-information"
          className="bg-white p-6 flex flex-col gap-9 border-0"
        >
          <AccordionTrigger className="text-lg text-left text-foreground font-semibold hover:no-underline">
            Informação Adicional
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Você participa de algum clã ou tribo?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.tribeParticipateConfirmation ? "Sim" : "Não"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Quais idiomas você fala?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.languages.length > 0
                    ? form.languages.join(" | ")
                    : "Não possui"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Viajou nos últimos 5 anos para outro país?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.fiveYearsOtherCountryTravelsConfirmation
                    ? "Sim"
                    : "Não"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Países que viajou
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.fiveYearsOtherCountryTravels.length > 0
                    ? form.fiveYearsOtherCountryTravels.join(" | ")
                    : "Não possui"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Contribui ou faz parte de alguma instituição de caridade ou
                  organização social?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.socialOrganizationConfirmation ? "Sim" : "Não"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Organizações que você faz parte
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.socialOrganization.length > 0
                    ? form.socialOrganization.join(" | ")
                    : "Não possui"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Você tem treinamento com arma de fogo?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.weaponTrainingConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            {form.weaponTrainingConfirmation && form.weaponTrainingDetails && (
              <div className="w-full grid grid-cols-1 gap-6">
                <div className="w-full flex flex-col gap-1">
                  <span className="text-sm text-foreground/60 font-medium">
                    Mais detalhes sobre o treinamento
                  </span>

                  <span className="text-lg font-medium text-foreground">
                    {form.weaponTrainingDetails
                      ? form.weaponTrainingDetails
                      : "Não possui"}
                  </span>
                </div>
              </div>
            )}

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Já prestou serviço militar?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.militaryServiceConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            {form.militaryServiceConfirmation && (
              <>
                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="w-full flex flex-col gap-1">
                    <span className="text-sm text-foreground/60 font-medium">
                      País que serviu
                    </span>

                    <span className="text-lg font-medium text-foreground">
                      {form.militaryServiceCountry
                        ? form.militaryServiceCountry
                        : "Não Preenchido"}
                    </span>
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <span className="text-sm text-foreground/60 font-medium">
                      Local que serviu
                    </span>

                    <span className="text-lg font-medium text-foreground">
                      {form.militaryServiceLocal
                        ? form.militaryServiceLocal
                        : "Não Preenchido"}
                    </span>
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <span className="text-sm text-foreground/60 font-medium">
                      Patente
                    </span>

                    <span className="text-lg font-medium text-foreground">
                      {form.militaryServicePatent
                        ? form.militaryServicePatent
                        : "Não Preenchido"}
                    </span>
                  </div>
                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="w-full flex flex-col gap-1">
                    <span className="text-sm text-foreground/60 font-medium">
                      Especialidade
                    </span>

                    <span className="text-lg font-medium text-foreground">
                      {form.militaryServiceSpecialty
                        ? form.militaryServiceSpecialty
                        : "Não Preenchido"}
                    </span>
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <span className="text-sm text-foreground/60 font-medium">
                      Data de início
                    </span>

                    <span className="text-lg font-medium text-foreground">
                      {form.militaryServiceStartDate
                        ? format(form.militaryServiceStartDate, "dd/MM/yyyy")
                        : "Não Preenchido"}
                    </span>
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <span className="text-sm text-foreground/60 font-medium">
                      Data de Término
                    </span>

                    <span className="text-lg font-medium text-foreground">
                      {form.militaryServiceEndDate
                        ? format(form.militaryServiceEndDate, "dd/MM/yyyy")
                        : "Não Preenchido"}
                    </span>
                  </div>
                </div>
              </>
            )}

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Você já serviu, foi membro ou esteve envolvido em uma unidade
                  paramilitar, unidade de vigilantes, grupo rebelde, grupo
                  guerrilheiro ou organização insurgente?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.insurgencyOrganizationConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Mais detalhes sobre sua participação
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.insurgencyOrganizationDetails
                    ? form.insurgencyOrganizationDetails
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <Button
              size="xl"
              className="w-full sm:w-fit flex items-center gap-2"
              asChild
            >
              <Link href={`/formulario/${profileId}?formStep=9&isEditing=true`}>
                Editar <Edit className="size-5" strokeWidth={1.5} />
              </Link>
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="security"
          className="bg-white p-6 flex flex-col gap-9 border-0"
        >
          <AccordionTrigger className="text-lg text-left text-foreground font-semibold hover:no-underline">
            Segurança
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Possui alguma doença contagiosa (cancroide, gonorreia,
                  granuloma inguinal, hanseníase infecciosa, linfogranuloma
                  venéreo, sífilis em estágio infeccioso, tuberculose ativa e
                  outras doenças, conforme determinado pelo Departamento de
                  Saúde e Serviços Humanos?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.contagiousDiseaseConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Possui algum problema físico ou mental que possa interferir em
                  sua segurança ou de outras pessoas?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.phisicalMentalProblemConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Você já foi preso ou condenado por algum delito ou crime,
                  mesmo que tenha sido objeto de perdão, anistia ou outra ação
                  semelhante?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.crimeConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Já teve problemas com drogas?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.drugsProblemConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Você já violou ou esteve envolvido em alguma conspiração para
                  violar qualquer lei relacionada ao controle de substâncias?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.lawViolateConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Você está vindo para os Estados Unidos para se envolver em
                  prostituição ou vício comercializado ilegalmente ou esteve
                  envolvido em prostituição ou procura de prostitutas nos
                  últimos 10 anos?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.prostitutionConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Você já esteve envolvido ou pretende se envolver em lavagem de
                  dinheiro?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.moneyLaundryConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Você já cometeu ou conspirou para cometer um crime de tráfico
                  de pessoas nos Estados Unidos ou fora dos Estados Unidos?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.peopleTrafficConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Você já ajudou, encorajou, ajudou ou conspirou conscientemente
                  com um indivíduo que cometeu ou conspirou para cometer um
                  crime grave de tráfico de pessoas nos Estados Unidos ou fora?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.helpPeopleTrafficConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Você é cônjuge, filho ou filha de um indivíduo que cometeu ou
                  conspirou para cometer um crime de tráfico de pessoas nos
                  Estados Unidos ou fora e, nos últimos cinco anos,
                  beneficiou-se conscientemente das atividades de tráfico?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.parentPeopleTrafficConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Você procura se envolver em espionagem, sabotagem, violações
                  de controle de exportação ou qualquer outra atividade ilegal
                  enquanto estiver nos Estados Unidos?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.spyConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Você procura se envolver em atividades terroristas enquanto
                  estiver nos Estados Unidos ou já se envolveu em atividades
                  terroristas?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.terrorismConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Você já prestou ou pretende fornecer assistência financeira ou
                  outro tipo de apoio a terroristas ou organizações terroristas?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.financialAssistanceConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Você é membro ou representante de uma organização terrorista?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.terrorismMemberConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Você é cônjuge, filho ou filha de um indivíduo que se envolveu
                  em atividades terroristas, inclusive fornecendo assistência
                  financeira ou outro apoio a terroristas ou organizações
                  terroristas, nos últimos cinco anos?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.parentTerrorismConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Você já ordenou, incitou, cometeu, ajudou ou de alguma forma
                  participou de genocídio?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.genocideConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Você já cometeu, ordenou, incitou, ajudou ou participou de
                  alguma forma em tortura?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.tortureConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Você cometeu, ordenou, incitou, ajudou ou de alguma forma
                  participou em assassinatos extrajudiciais, assassinatos
                  políticos ou outros atos de violência?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.assassinConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Você já se envolveu no recrutamento ou na utilização de
                  crianças-soldados?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.childSoldierConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Você, enquanto servia como funcionário do governo, foi
                  responsável ou executou diretamente, em qualquer momento,
                  violações particularmente graves da liberdade religiosa?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.religionLibertyConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Você já esteve diretamente envolvido no estabelecimento ou na
                  aplicação de controles populacionais que forçaram uma mulher a
                  se submeter a um aborto contra a sua livre escolha ou um homem
                  ou uma mulher a se submeter à esterilização contra a sua livre
                  vontade?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.abortConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Você já esteve diretamente envolvido no transplante coercitivo
                  de órgãos humanos ou tecidos corporais?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.coerciveTransplantConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Você já tentou obter ou ajudar outras pessoas a obter um
                  visto, entrada nos Estados Unidos ou qualquer outro benefício
                  de imigração dos Estados Unidos por meio de fraude, deturpação
                  intencional ou outros meios ilegais?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.visaFraudConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Você já foi removido ou deportado de algum país?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.deportedConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Você já recebeu a custódia de uma criança cidadã dos EUA fora
                  dos Estados Unidos de uma pessoa que recebeu a custódia legal
                  de um tribunal dos EUA?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.childCustodyConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Você votou nos Estados Unidos violando alguma lei ou
                  regulamento?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.lawViolationConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm text-foreground/60 font-medium">
                  Você já renunciou à cidadania dos Estados Unidos para evitar
                  impostos?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {form.avoidTaxConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <Button
              size="xl"
              className="w-full sm:w-fit flex items-center gap-2"
              asChild
            >
              <Link
                href={`/formulario/${profileId}?formStep=10&isEditing=true`}
              >
                Editar <Edit className="size-5" strokeWidth={1.5} />
              </Link>
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
