import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Loader2, X } from "lucide-react";

import { ModalAnimation, OverlayAnimation } from "@/constants/animations/modal";
import { Button } from "@/components/ui/button";
import useClientsStore from "@/constants/stores/useClientsStore";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";

export function FormModal() {
  const [selected, setSelected] = useState<number>(0);

  const { formsSelected, isFormModalOpen, closeFormModal, setFormsSelected } =
    useClientsStore();

  function formatPhone(value: string) {
    if (!value) return;

    return value
      .replace(/\D+/g, "")
      .replace(/(\d{2})(\d{2})(\d{4,5})(\d{4})/, "+$1 ($2) $3-$4");
  }

  function handleClose() {
    setFormsSelected(null);
    closeFormModal();
  }

  return (
    <>
      {isFormModalOpen && (
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
            className="w-full max-w-[1000px] h-full bg-white p-6 inline-block align-middle overflow-x-hidden"
          >
            <div className="w-full flex justify-end mb-6">
              <Button onClick={handleClose} variant="link" size="icon">
                <X />
              </Button>
            </div>

            <div className="w-full h-[calc(100%-64px)] flex flex-col gap-6 md:flex-row">
              {formsSelected !== null ? (
                <>
                  <div className="w-full h-fit sticky left-0 top-0 flex flex-col gap-4 md:max-w-[200px]">
                    {formsSelected.map((form, index) => (
                      <div
                        key={form.id}
                        className={cn(
                          "w-full border border-primary bg-secondary hover:bg-primary group p-4 flex items-center justify-center transition-colors lg:cursor-pointer",
                          { "bg-primary": selected === index },
                        )}
                        onClick={() => setSelected(index)}
                      >
                        <span
                          className={cn(
                            "text-base font-medium text-center text-foreground group-hover:text-white transition-colors",
                            { "text-white": selected === index },
                          )}
                        >
                          {form.firstName &&
                          form.firstName.length > 0 &&
                          form.lastName &&
                          form.lastName.length > 0 ? (
                            <>
                              Formulário {form.firstName} {form.lastName}
                            </>
                          ) : (
                            <>Formulário incompleto</>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="w-full h-full flex flex-col gap-4 overflow-y-auto">
                    <div className="bg-secondary p-6 flex flex-col gap-9 border-0">
                      <h2 className="text-xl text-foreground font-semibold hover:no-underline text-center sm:text-left">
                        Dados Pessoais
                      </h2>

                      <div className="w-full flex flex-col gap-9">
                        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Primeiro Nome
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].firstName
                                ? formsSelected[selected].firstName
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Sobrenome
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].lastName
                                ? formsSelected[selected].lastName
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              CPF
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].cpf
                                ? formsSelected[selected].cpf
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Código ou Nome de Guerra
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].warName
                                ? formsSelected[selected].warName
                                : "Não possui"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Outros Nomes (Religioso, Solteiro, etc...)
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].otherNames &&
                              formsSelected[selected].otherNames.length > 0
                                ? formsSelected[selected].otherNames.join(" | ")
                                : "Não possui"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Sexo
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].sex
                                ? formsSelected[selected].sex
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Estado Civil
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].maritalStatus
                                ? formsSelected[selected].maritalStatus
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Data de Nascimento
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].birthDate
                                ? format(
                                    formsSelected[selected].birthDate as Date,
                                    "dd/MM/yyyy",
                                  )
                                : "--/--/----"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Cidade de Nascença
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].birthCity
                                ? formsSelected[selected].birthCity
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Estado de Nascença
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].birthState
                                ? formsSelected[selected].birthState
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              País de Nascença
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].birthCountry
                                ? formsSelected[selected].birthCountry
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              País de Origem (Nacionalidade)
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].originCountry
                                ? formsSelected[selected].originCountry
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Número do passaporte em caso de outra
                              nacionalidade
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .otherNationalityPassport &&
                              formsSelected[selected].otherNationalityPassport!
                                .length > 0
                                ? formsSelected[selected]
                                    .otherNationalityPassport
                                : "Não possui"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Residente de um país diferente de sua
                              nacionalidade
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .otherCountryResidentConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              U.S. Social Security Number
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].USSocialSecurityNumber
                                ? formsSelected[selected].USSocialSecurityNumber
                                : "Não possui"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              U.S. Taxpayer ID Number
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].USTaxpayerIDNumber
                                ? formsSelected[selected].USTaxpayerIDNumber
                                : "Não possui"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-secondary p-6 flex flex-col gap-9 border-0">
                      <h2 className="text-lg text-foreground font-semibold hover:no-underline text-center sm:text-left">
                        Endereço e Contatos
                      </h2>

                      <div className="w-full flex flex-col gap-9">
                        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Endereço
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].address
                                ? formsSelected[selected].address
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Cidade
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].city
                                ? formsSelected[selected].city
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Estado
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].state
                                ? formsSelected[selected].state
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              CEP
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].cep
                                ? formsSelected[selected].cep
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              País
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].country
                                ? formsSelected[selected].country
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Endereço de Correio
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .postalAddressConfirmation === false
                                ? "É o mesmo da residencia"
                                : formsSelected[selected].otherPostalAddress &&
                                    formsSelected[selected].otherPostalAddress!
                                      .length > 0
                                  ? formsSelected[selected].otherPostalAddress
                                  : "Não preencheu o endereço"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Celular
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].cel
                                ? formatPhone(formsSelected[selected].cel!)
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Telefone
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].tel
                                ? formatPhone(formsSelected[selected].tel!)
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              E-mail
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].email
                                ? formsSelected[selected].email
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Outro Telefone
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .fiveYearsOtherTelConfirmation &&
                              formsSelected[selected].otherTel &&
                              formsSelected[selected].otherTel!.length > 0
                                ? formatPhone(formsSelected[selected].otherTel!)
                                : "Não possui"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Outro E-mail
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .fiveYearsOtherEmailConfirmation &&
                              formsSelected[selected].otherEmail &&
                              formsSelected[selected].otherEmail!.length > 0
                                ? formsSelected[selected].otherEmail
                                : "Não possui"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Facebook
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].facebook
                                ? formsSelected[selected].facebook
                                : "Não possui"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              LinkedIn
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].linkedin
                                ? formsSelected[selected].linkedin
                                : "Não possui"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Instagram
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].instagram
                                ? formsSelected[selected].instagram
                                : "Não possui"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Outras Redes
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].othersSocialMedia
                                ? formsSelected[selected].othersSocialMedia
                                : "Não possui"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-secondary p-6 flex flex-col gap-9 border-0">
                      <h2 className="text-xl text-foreground font-semibold hover:no-underline text-center sm:text-left">
                        Passaporte
                      </h2>

                      <div className="w-full flex flex-col gap-9">
                        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Número do Passaporte
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].passportNumber
                                ? formsSelected[selected].passportNumber
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Cidade de Emissão
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].passportCity
                                ? formsSelected[selected].passportCity
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Estado de Emissão
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].passportState
                                ? formsSelected[selected].passportState
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              País de Emissão
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].passportIssuingCountry
                                ? formsSelected[selected].passportIssuingCountry
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Data de Emissão
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].passportIssuingDate
                                ? format(
                                    formsSelected[selected]
                                      .passportIssuingDate!,
                                    "dd/MM/yyyy",
                                  )
                                : "--/--/----"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Data de Expiração
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].passportExpireDate
                                ? format(
                                    formsSelected[selected].passportExpireDate!,
                                    "dd/MM/yyyy",
                                  )
                                : "Sem expiração"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Já perdeu ou teve o passaporte roubado?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].passportLostConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Número do Passaporte Perdido/Roubado
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .passportLostConfirmation &&
                              formsSelected[selected].lostPassportNumber &&
                              formsSelected[selected].lostPassportNumber!
                                .length > 0
                                ? formsSelected[selected].lostPassportNumber
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              País do Passaporte Perdido/Roubado
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .passportLostConfirmation &&
                              formsSelected[selected].lostPassportCountry &&
                              formsSelected[selected].lostPassportCountry!
                                .length > 0
                                ? formsSelected[selected].lostPassportCountry
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Explique o que ocorreu
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .passportLostConfirmation &&
                              formsSelected[selected].lostPassportDetails &&
                              formsSelected[selected].lostPassportDetails!
                                .length > 0
                                ? formsSelected[selected].lostPassportDetails
                                : "---"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-secondary p-6 flex flex-col gap-9 border-0">
                      <h2 className="text-xl text-foreground font-semibold hover:no-underline text-center sm:text-left">
                        Sobre a Viagem
                      </h2>

                      <div className="w-full flex flex-col gap-9">
                        <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Possui itinerário de viagem?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .travelItineraryConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Data prevista de chegada nos EUA
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .travelItineraryConfirmation &&
                              formsSelected[selected].USAPreviewArriveDate
                                ? format(
                                    formsSelected[selected]
                                      .USAPreviewArriveDate!,
                                    "dd/MM/yyyy",
                                  )
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Número do voo de chegada
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .travelItineraryConfirmation &&
                              formsSelected[selected].arriveFlyNumber &&
                              formsSelected[selected].arriveFlyNumber!.length >
                                0
                                ? formsSelected[selected].arriveFlyNumber
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Cidade de chegada
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .travelItineraryConfirmation &&
                              formsSelected[selected].arriveCity &&
                              formsSelected[selected].arriveCity!.length > 0
                                ? formsSelected[selected].arriveCity
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Data prevista de retorno ao Brasil
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .travelItineraryConfirmation &&
                              formsSelected[selected].USAPreviewReturnDate
                                ? format(
                                    formsSelected[selected]
                                      .USAPreviewReturnDate!,
                                    "dd/MM/yyyy",
                                  )
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Número do voo de partida
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .travelItineraryConfirmation &&
                              formsSelected[selected].returnFlyNumber &&
                              formsSelected[selected].returnFlyNumber!.length >
                                0
                                ? formsSelected[selected].returnFlyNumber
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Cidade de partida
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .travelItineraryConfirmation &&
                              formsSelected[selected].returnCity &&
                              formsSelected[selected].returnCity!.length > 0
                                ? formsSelected[selected].returnCity
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Tempo estimado de permanência nos EUA
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].estimatedTimeOnUSA &&
                              formsSelected[selected].estimatedTimeOnUSA!
                                .length > 0
                                ? formsSelected[selected].estimatedTimeOnUSA
                                : "Não sabe"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Locais que irá visitar
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].visitLocations &&
                              formsSelected[selected].visitLocations.length > 0
                                ? formsSelected[selected].visitLocations.join(
                                    " | ",
                                  )
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Endereço completo onde ficará nos EUA
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].USACompleteAddress &&
                              formsSelected[selected].USACompleteAddress!
                                .length > 0
                                ? formsSelected[selected].USACompleteAddress
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              ZIP Code de onde ficará nos EUA
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].USAZipCode &&
                              formsSelected[selected].USAZipCode!.length > 0
                                ? formsSelected[selected].USAZipCode
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Cidade nos EUA
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].USACity &&
                              formsSelected[selected].USACity!.length > 0
                                ? formsSelected[selected].USACity
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Estado nos EUA
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].USAState &&
                              formsSelected[selected].USAState!.length > 0
                                ? formsSelected[selected].USAState
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Nome ou empresa que pagará a viagem
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].payerNameOrCompany &&
                              formsSelected[selected].payerNameOrCompany!
                                .length > 0
                                ? formsSelected[selected].payerNameOrCompany
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Telefone Residencial
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].payerTel &&
                              formsSelected[selected].payerTel!.length > 0
                                ? formatPhone(formsSelected[selected].payerTel!)
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Endereço Completo
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].payerAddress &&
                              formsSelected[selected].payerAddress!.length > 0
                                ? formsSelected[selected].payerAddress
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Relação com o solicitante
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].payerRelation &&
                              formsSelected[selected].payerRelation!.length > 0
                                ? formsSelected[selected].payerRelation
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              E-mail
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].payerEmail &&
                              formsSelected[selected].payerEmail!.length > 0
                                ? formsSelected[selected].payerEmail
                                : "---"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-secondary p-6 flex flex-col gap-9 border-0">
                      <h2 className="text-xl text-foreground font-semibold hover:no-underline text-center sm:text-left">
                        Companhia de Viagem
                      </h2>

                      <div className="w-full flex flex-col gap-9">
                        <div className="w-full flex flex-col gap-9">
                          {formsSelected[selected]
                            .otherPeopleTravelingConfirmation &&
                          formsSelected[selected].otherPeopleTraveling &&
                          formsSelected[selected].otherPeopleTraveling.length >
                            0 ? (
                            formsSelected[selected].otherPeopleTraveling.map(
                              (otherPeople, index) => (
                                <div
                                  key={otherPeople.id}
                                  className="w-full bg-[#D3D3E2] p-5 flex flex-col gap-4"
                                >
                                  <div className="w-full flex items-center gap-2">
                                    <div className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-primary flex items-center justify-center">
                                      <span className="text-white text-lg font-medium">
                                        {index + 1}
                                      </span>
                                    </div>

                                    <span className="text-foreground text-lg font-medium text-center sm:text-left">
                                      Pessoa Acompanhante
                                    </span>
                                  </div>

                                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        Nome completo da outra pessoa
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {otherPeople.name &&
                                        otherPeople.name.length > 0
                                          ? otherPeople.name
                                          : "---"}
                                      </span>
                                    </div>

                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        Relação com a outra pessoa
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {otherPeople.relation &&
                                        otherPeople.relation.length > 0
                                          ? otherPeople.relation
                                          : "---"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ),
                            )
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
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Esta viajando como integrante de um grupo de
                              viagem?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].groupMemberConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Nome da organização ou grupo
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .groupMemberConfirmation &&
                              formsSelected[selected].groupName &&
                              formsSelected[selected].groupName!.length > 0
                                ? formsSelected[selected].groupName
                                : "---"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-secondary p-6 flex flex-col gap-9 border-0">
                      <h2 className="text-xl text-foreground font-semibold hover:no-underline text-center sm:text-left">
                        Viagens Anteriores
                      </h2>

                      <div className="w-full flex flex-col gap-9">
                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Já foi para os EUA?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].hasBeenOnUSAConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full flex flex-col gap-9">
                          {formsSelected[selected].hasBeenOnUSAConfirmation &&
                          formsSelected[selected].USALastTravel &&
                          formsSelected[selected].USALastTravel.length > 0 ? (
                            formsSelected[selected].USALastTravel.map(
                              (lastTravel, index) => (
                                <div
                                  key={lastTravel.id}
                                  className="w-full bg-[#D3D3E2] p-5 flex flex-col gap-4"
                                >
                                  <div className="w-full flex items-center gap-2">
                                    <div className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-primary flex items-center justify-center">
                                      <span className="text-white text-lg font-medium">
                                        {index + 1}
                                      </span>
                                    </div>

                                    <span className="text-foreground text-lg font-medium">
                                      Viagem
                                    </span>
                                  </div>

                                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        Data prevista de chegada nos EUA
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {lastTravel.arriveDate
                                          ? format(
                                              lastTravel.arriveDate,
                                              "dd/MM/yyyy",
                                            )
                                          : "--/--/----"}
                                      </span>
                                    </div>

                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        Tempo estimado de permanência nos EUA
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {lastTravel.estimatedTime &&
                                        lastTravel.estimatedTime.length > 0
                                          ? lastTravel.estimatedTime
                                          : "---"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ),
                            )
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
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Já obteve uma licença americana para dirigir nos
                              EUA?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .americanLicenseToDriveConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full flex flex-col gap-9">
                          {formsSelected[selected]
                            .americanLicenseToDriveConfirmation &&
                          formsSelected[selected].americanLicense &&
                          formsSelected[selected].americanLicense.length > 0 ? (
                            formsSelected[selected].americanLicense.map(
                              (americanLicense, index) => (
                                <div
                                  key={americanLicense.id}
                                  className="w-full bg-[#FDF0D2] p-5 flex flex-col gap-4"
                                >
                                  <div className="w-full flex items-center gap-2">
                                    <div className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-primary flex items-center justify-center">
                                      <span className="text-white text-lg font-medium">
                                        {index + 1}
                                      </span>
                                    </div>

                                    <span className="text-foreground text-lg font-medium">
                                      Licença
                                    </span>
                                  </div>

                                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        Número da licença
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {americanLicense.licenseNumber &&
                                        americanLicense.licenseNumber.length > 0
                                          ? americanLicense.licenseNumber
                                          : "---"}
                                      </span>
                                    </div>

                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        Estado
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {americanLicense.state &&
                                        americanLicense.state.length > 0
                                          ? americanLicense.state
                                          : "---"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ),
                            )
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
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Já obteve visto nos EUA?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].USAVisaConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Data de Emissão do Visto
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].visaIssuingDate
                                ? format(
                                    formsSelected[selected].visaIssuingDate!,
                                    "dd/MM/yyyy",
                                  )
                                : "--/--/----"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Número do Visto
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].visaNumber &&
                              formsSelected[selected].visaNumber!.length > 0
                                ? formsSelected[selected].visaNumber
                                : "Não sei o número"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Está solicitando o novo visto do mesmo país ou
                              localização daquele concedido previamente?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].newVisaConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Este país é o mesmo onde está localizada sua
                              residencia principal?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .sameCountryResidenceConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Está solicitando o mesmo tipo de visto concedido
                              anteriormente?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].sameVisaTypeConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Forneceu digitais dos 10 dedos?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .fingerprintsProvidedConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Já teve um visto perdido ou roubado?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].lostVisaConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              O que ocorreu com o visto perdido ou roubado
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].lostVisaDetails &&
                              formsSelected[selected].lostVisaDetails!.length >
                                0
                                ? formsSelected[selected].lostVisaDetails
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Já teve um visto revogado ou cancelado?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].canceledVisaConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              O que ocorreu com o visto revogado ou cancelado
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].canceledVisaDetails &&
                              formsSelected[selected].canceledVisaDetails!
                                .length > 0
                                ? formsSelected[selected].canceledVisaDetails
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Já teve um visto negado?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].deniedVisaConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              O que ocorreu com o visto negado
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].deniedVisaDetails &&
                              formsSelected[selected].deniedVisaDetails!
                                .length > 0
                                ? formsSelected[selected].deniedVisaDetails
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Posto Consular no Brasil
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].consularPost &&
                              formsSelected[selected].consularPost!.length > 0
                                ? formsSelected[selected].consularPost
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Categoria/tipo de visto negado
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].deniedVisaType &&
                              formsSelected[selected].deniedVisaType!.length > 0
                                ? formsSelected[selected].deniedVisaType
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Alguém já solicitou alguma petição de imigração em
                              seu nome perante o Departamento de Imigração dos
                              Estados Unidos?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .immigrationRequestByAnotherPersonConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Motivo
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .immigrationRequestByAnotherPersonDetails &&
                              formsSelected[selected]
                                .immigrationRequestByAnotherPersonDetails!
                                .length > 0
                                ? formsSelected[selected]
                                    .immigrationRequestByAnotherPersonDetails
                                : "---"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-secondary p-6 flex flex-col gap-9 border-0">
                      <h2 className="text-xl text-foreground font-semibold hover:no-underline text-center sm:text-left">
                        Contato nos Estados Unidos
                      </h2>

                      <div className="w-full flex flex-col gap-9">
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Nome completo da pessoa ou organização
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .organizationOrUSAResidentName &&
                              formsSelected[selected]
                                .organizationOrUSAResidentName!.length > 0
                                ? formsSelected[selected]
                                    .organizationOrUSAResidentName
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Relação do contato com você
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .organizationOrUSAResidentRelation &&
                              formsSelected[selected]
                                .organizationOrUSAResidentRelation!.length > 0
                                ? formsSelected[selected]
                                    .organizationOrUSAResidentRelation
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Endereço completo do contato
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .organizationOrUSAResidentAddress &&
                              formsSelected[selected]
                                .organizationOrUSAResidentAddress!.length > 0
                                ? formsSelected[selected]
                                    .organizationOrUSAResidentAddress
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              ZIP Code do contato
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .organizationOrUSAResidentZipCode &&
                              formsSelected[selected]
                                .organizationOrUSAResidentZipCode!.length > 0
                                ? formsSelected[selected]
                                    .organizationOrUSAResidentZipCode
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Cidade do contato
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .organizationOrUSAResidentCity &&
                              formsSelected[selected]
                                .organizationOrUSAResidentCity!.length > 0
                                ? formsSelected[selected]
                                    .organizationOrUSAResidentCity
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Estado do contato
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .organizationOrUSAResidentState &&
                              formsSelected[selected]
                                .organizationOrUSAResidentState!.length > 0
                                ? formsSelected[selected]
                                    .organizationOrUSAResidentState
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              País do contato
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .organizationOrUSAResidentCountry &&
                              formsSelected[selected]
                                .organizationOrUSAResidentCountry!.length > 0
                                ? formsSelected[selected]
                                    .organizationOrUSAResidentCountry
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Telefone do contato
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .organizationOrUSAResidentTel &&
                              formsSelected[selected]
                                .organizationOrUSAResidentTel!.length > 0
                                ? formatPhone(
                                    formsSelected[selected]
                                      .organizationOrUSAResidentTel!,
                                  )
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              E-mail do contato
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .organizationOrUSAResidentEmail &&
                              formsSelected[selected]
                                .organizationOrUSAResidentEmail!.length > 0
                                ? formsSelected[selected]
                                    .organizationOrUSAResidentEmail
                                : "---"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-secondary p-6 flex flex-col gap-9 border-0">
                      <h2 className="text-xl text-foreground font-semibold hover:no-underline text-center sm:text-left">
                        Informações da Família
                      </h2>

                      <div className="w-full flex flex-col gap-9">
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Nome Completo do Pai
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].fatherCompleteName &&
                              formsSelected[selected].fatherCompleteName!
                                .length > 0
                                ? formsSelected[selected].fatherCompleteName
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Data de Nascimento do Pai
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].fatherBirthdate
                                ? format(
                                    formsSelected[selected].fatherBirthdate!,
                                    "dd/MM/yyyy",
                                  )
                                : "--/--/----"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Pai se encontra nos EUA?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .fatherLiveInTheUSAConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Situação do Pai
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].fatherUSASituation &&
                              formsSelected[selected].fatherUSASituation!
                                .length > 0
                                ? formsSelected[selected].fatherUSASituation
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Nome Completo do Mãe
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].motherCompleteName &&
                              formsSelected[selected].motherCompleteName!
                                .length > 0
                                ? formsSelected[selected].motherCompleteName
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Data de Nascimento do Mãe
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].motherBirthdate
                                ? format(
                                    formsSelected[selected].motherBirthdate!,
                                    "dd/MM/yyyy",
                                  )
                                : "--/--/----"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Mãe se encontra nos EUA?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .motherLiveInTheUSAConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Situação do Mãe
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].motherUSASituation &&
                              formsSelected[selected].motherUSASituation!
                                .length > 0
                                ? formsSelected[selected].motherUSASituation
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Há alguém da família nos EUA?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .familyLivingInTheUSAConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full flex flex-col gap-9">
                          {formsSelected[selected]
                            .familyLivingInTheUSAConfirmation &&
                          formsSelected[selected].familyLivingInTheUSA &&
                          formsSelected[selected].familyLivingInTheUSA.length >
                            0 ? (
                            formsSelected[selected].familyLivingInTheUSA.map(
                              (familyLivingInTheUSA, index) => (
                                <div
                                  key={familyLivingInTheUSA.id}
                                  className="w-full bg-[#D3D3E2] p-5 flex flex-col gap-4"
                                >
                                  <div className="w-full flex items-center gap-2">
                                    <div className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-primary flex items-center justify-center">
                                      <span className="text-white text-lg font-medium">
                                        {index + 1}
                                      </span>
                                    </div>

                                    <span className="text-foreground text-lg font-medium">
                                      Familiar
                                    </span>
                                  </div>

                                  <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        Nome do Parente
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {familyLivingInTheUSA.name &&
                                        familyLivingInTheUSA.name.length > 0
                                          ? familyLivingInTheUSA.name
                                          : "---"}
                                      </span>
                                    </div>

                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        Parentesco
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {familyLivingInTheUSA.relation &&
                                        familyLivingInTheUSA.relation.length > 0
                                          ? familyLivingInTheUSA.relation
                                          : "---"}
                                      </span>
                                    </div>

                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        Situação do Parente
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {familyLivingInTheUSA.situation &&
                                        familyLivingInTheUSA.situation.length >
                                          0
                                          ? familyLivingInTheUSA.situation
                                          : "---"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ),
                            )
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
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Nome Completo (Cônjuge/Parceiro/Ex-Cônjuge)
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].partnerCompleteName &&
                              formsSelected[selected].partnerCompleteName!
                                .length > 0
                                ? formsSelected[selected].partnerCompleteName
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Data de Nascimento (Cônjuge/Parceiro/Ex-Cônjuge)
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].partnerBirthdate
                                ? format(
                                    formsSelected[selected].partnerBirthdate!,
                                    "dd/MM/yyyy",
                                  )
                                : "--/--/----"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Nacionalidade (Cônjuge/Parceiro/Ex-Cônjuge)
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].partnerNationality &&
                              formsSelected[selected].partnerNationality!
                                .length > 0
                                ? formsSelected[selected].partnerNationality
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Cidade de Nascimento (Cônjuge/Parceiro/Ex-Cônjuge)
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].partnerCity &&
                              formsSelected[selected].partnerCity!.length > 0
                                ? formsSelected[selected].partnerCity
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Estado de Nascimento (Cônjuge/Parceiro/Ex-Cônjuge)
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].partnerState &&
                              formsSelected[selected].partnerState!.length > 0
                                ? formsSelected[selected].partnerState
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              País de Nascimento (Cônjuge/Parceiro/Ex-Cônjuge)
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].partnerCountry &&
                              formsSelected[selected].partnerCountry!.length > 0
                                ? formsSelected[selected].partnerCountry
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Data da União (Cônjuge/Parceiro/Ex-Cônjuge)
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].unionDate
                                ? format(
                                    formsSelected[selected].unionDate!,
                                    "dd/MM/yyyy",
                                  )
                                : "--/--/----"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Data da Separação (Cônjuge/Parceiro/Ex-Cônjuge)
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].divorceDate
                                ? format(
                                    formsSelected[selected].divorceDate!,
                                    "dd/MM/yyyy",
                                  )
                                : "--/--/----"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-secondary p-6 flex flex-col gap-9 border-0">
                      <h2 className="text-xl text-foreground font-semibold hover:no-underline text-center sm:text-left">
                        Trabalho e Educação
                      </h2>

                      <div className="w-full flex flex-col gap-9">
                        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Ocupação atual
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].occupation &&
                              formsSelected[selected].occupation!.length > 0
                                ? formsSelected[selected].occupation!
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Cargo/Função
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].office &&
                              formsSelected[selected].office!.length > 0
                                ? formsSelected[selected].office
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Nome do empregador ou empresa atual
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].companyOrBossName &&
                              formsSelected[selected].companyOrBossName!
                                .length > 0
                                ? formsSelected[selected].companyOrBossName
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Endereço completo da empresa
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].companyAddress &&
                              formsSelected[selected].companyAddress!.length > 0
                                ? formsSelected[selected].companyAddress
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Cidade da empresa
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].companyCity &&
                              formsSelected[selected].companyCity!.length > 0
                                ? formsSelected[selected].companyCity
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Estado da empresa
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].companyState &&
                              formsSelected[selected].companyState!.length > 0
                                ? formsSelected[selected].companyState
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              País da empresa
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].companyCountry &&
                              formsSelected[selected].companyCountry!.length > 0
                                ? formsSelected[selected].companyCountry
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Cep da empresa
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].companyCep &&
                              formsSelected[selected].companyCep!.length > 0
                                ? formsSelected[selected].companyCep
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Telefone da empresa
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].companyTel &&
                              formsSelected[selected].companyTel!.length > 0
                                ? formatPhone(
                                    formsSelected[selected].companyTel!,
                                  )
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Data de admissão
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].admissionDate
                                ? format(
                                    formsSelected[selected].admissionDate!,
                                    "dd/MM/yyyy",
                                  )
                                : "--/--/----"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Data de aposentadoria
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].retireeDate
                                ? format(
                                    formsSelected[selected].retireeDate!,
                                    "dd/MM/yyyy",
                                  )
                                : "--/--/----"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Renda mensal (R$)
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].monthlySalary &&
                              formsSelected[selected].monthlySalary!.length > 0
                                ? formsSelected[selected].monthlySalary
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Descreva quais são as suas funções dentro da sua
                              empresa, se possui funcionários registrados e
                              outras informações relacionadas ao seu negócio
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].jobDetails &&
                              formsSelected[selected].jobDetails!.length > 0
                                ? formsSelected[selected].jobDetails
                                : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full flex flex-col gap-9">
                          {formsSelected[selected].previousJobConfirmation &&
                          formsSelected[selected].previousJobs &&
                          formsSelected[selected].previousJobs.length > 0 ? (
                            formsSelected[selected].previousJobs.map(
                              (previousJobs, index) => (
                                <div
                                  key={previousJobs.id}
                                  className="w-full bg-[#D3D3E2] p-5 flex flex-col gap-4"
                                >
                                  <div className="w-full flex items-center gap-2">
                                    <div className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-primary flex items-center justify-center">
                                      <span className="text-white text-lg font-medium">
                                        {index + 1}
                                      </span>
                                    </div>

                                    <span className="text-foreground text-lg font-medium">
                                      Emprego Anterior
                                    </span>
                                  </div>

                                  <div className="w-full grid grid-cols-1 gap-6">
                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        Nome do empregador ou empresa anterior
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {previousJobs.companyName &&
                                        previousJobs.companyName.length > 0
                                          ? previousJobs.companyName
                                          : "---"}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        Endereço completo da empresa
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {previousJobs.companyAddress &&
                                        previousJobs.companyAddress.length > 0
                                          ? previousJobs.companyAddress
                                          : "---"}
                                      </span>
                                    </div>

                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        Cidade da empresa
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {previousJobs.companyCity &&
                                        previousJobs.companyCity.length > 0
                                          ? previousJobs.companyCity
                                          : "---"}
                                      </span>
                                    </div>
                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        Estado da empresa
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {previousJobs.companyState &&
                                        previousJobs.companyState.length > 0
                                          ? previousJobs.companyState
                                          : "---"}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        País da empresa
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {previousJobs.companyCountry &&
                                        previousJobs.companyCountry.length > 0
                                          ? previousJobs.companyCountry
                                          : "---"}
                                      </span>
                                    </div>

                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        CEP da empresa
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {previousJobs.companyCep &&
                                        previousJobs.companyCep.length > 0
                                          ? previousJobs.companyCep
                                          : "---"}
                                      </span>
                                    </div>

                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        Telefone da empresa
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {previousJobs.companyTel
                                          ? formatPhone(previousJobs.companyTel)
                                          : "---"}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        Cargo / Função
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {previousJobs.office &&
                                        previousJobs.office.length > 0
                                          ? previousJobs.office
                                          : "---"}
                                      </span>
                                    </div>

                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        Nome completo do supervisor
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {previousJobs.supervisorName &&
                                        previousJobs.supervisorName.length > 0
                                          ? previousJobs.supervisorName
                                          : "---"}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        Data de admissão
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {previousJobs.admissionDate
                                          ? format(
                                              previousJobs.admissionDate,
                                              "dd/MM/yyyy",
                                            )
                                          : "--/--/----"}
                                      </span>
                                    </div>

                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        Data de demissão
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {previousJobs.resignationDate
                                          ? format(
                                              previousJobs.resignationDate,
                                              "dd/MM/yyyy",
                                            )
                                          : "--/--/----"}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="w-full grid grid-cols-1 gap-6">
                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        Descrição da tarefa exercida
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {previousJobs.jobDescription &&
                                        previousJobs.jobDescription.length > 0
                                          ? previousJobs.jobDescription
                                          : "---"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ),
                            )
                          ) : (
                            <div className="w-full bg-[#D3D3E2] p-5 flex items-center justify-center">
                              <span className="text-foreground text-lg text-center font-semibold">
                                Não possui emprego anterior
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="w-full flex flex-col gap-9">
                          {formsSelected[selected].courses &&
                          formsSelected[selected].courses.length > 0 ? (
                            formsSelected[selected].courses.map(
                              (course, index) => (
                                <div
                                  key={course.id}
                                  className="w-full bg-[#FDF0D2] p-5 flex flex-col gap-4"
                                >
                                  <div className="w-full flex items-center gap-2">
                                    <div className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-primary flex items-center justify-center">
                                      <span className="text-white text-lg font-medium">
                                        {index + 1}
                                      </span>
                                    </div>

                                    <span className="text-foreground text-lg font-medium">
                                      Instituição de Ensino Anterior
                                    </span>
                                  </div>

                                  <div className="w-full grid grid-cols-1 gap-6">
                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        Nome completo da instituição
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {course.institutionName &&
                                        course.institutionName.length > 0
                                          ? course.institutionName
                                          : "---"}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        Endereço completo da instituição
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {course.address &&
                                        course.address.length > 0
                                          ? course.address
                                          : "---"}
                                      </span>
                                    </div>

                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        Cidade da instituição
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {course.city && course.city.length > 0
                                          ? course.city
                                          : "---"}
                                      </span>
                                    </div>
                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        Estado da instituição
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {course.state && course.state.length > 0
                                          ? course.state
                                          : "---"}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        País da instituição
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {course.country &&
                                        course.country.length > 0
                                          ? course.country
                                          : "---"}
                                      </span>
                                    </div>

                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        CEP da instituição
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {course.cep && course.cep.length > 0
                                          ? course.cep
                                          : "---"}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        Nome do curso
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {course.courseName &&
                                        course.courseName.length > 0
                                          ? course.courseName
                                          : "---"}
                                      </span>
                                    </div>

                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        Data de início
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {course.initialDate
                                          ? format(
                                              course.initialDate,
                                              "dd/MM/yyyy",
                                            )
                                          : "--/--/----"}
                                      </span>
                                    </div>

                                    <div className="w-full flex flex-col gap-1">
                                      <span className="text-base text-foreground font-medium text-center sm:text-left">
                                        Data de término
                                      </span>

                                      <span className="text-base text-foreground text-center sm:text-left">
                                        {course.finishDate
                                          ? format(
                                              course.finishDate,
                                              "dd/MM/yyyy",
                                            )
                                          : "--/--/----"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ),
                            )
                          ) : (
                            <div className="w-full bg-[#FDF0D2] p-5 flex items-center justify-center">
                              <span className="text-foreground text-lg text-center font-semibold">
                                Não possui ensino anterior
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-secondary p-6 flex flex-col gap-9 border-0">
                      <h2 className="text-xl text-foreground font-semibold hover:no-underline text-center sm:text-left">
                        Segurança
                      </h2>

                      <div className="w-full flex flex-col gap-9">
                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Possui alguma doença contagiosa (cancroide,
                              gonorreia, granuloma inguinal, hanseníase
                              infecciosa, linfogranuloma venéreo, sífilis em
                              estágio infeccioso, tuberculose ativa e outras
                              doenças, conforme determinado pelo Departamento de
                              Saúde e Serviços Humanos?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .contagiousDiseaseConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Possui algum problema físico ou mental que possa
                              interferir em sua segurança ou de outras pessoas?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .phisicalMentalProblemConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Você já foi preso ou condenado por algum delito ou
                              crime, mesmo que tenha sido objeto de perdão,
                              anistia ou outra ação semelhante?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].crimeConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Já teve problemas com drogas?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].drugsProblemConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Você já violou ou esteve envolvido em alguma
                              conspiração para violar qualquer lei relacionada
                              ao controle de substâncias?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].lawViolateConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Você está vindo para os Estados Unidos para se
                              envolver em prostituição ou vício comercializado
                              ilegalmente ou esteve envolvido em prostituição ou
                              procura de prostitutas nos últimos 10 anos?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].prostitutionConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Você já esteve envolvido ou pretende se envolver
                              em lavagem de dinheiro?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].moneyLaundryConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Você já cometeu ou conspirou para cometer um crime
                              de tráfico de pessoas nos Estados Unidos ou fora
                              dos Estados Unidos?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].peopleTrafficConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Você já ajudou, encorajou, ajudou ou conspirou
                              conscientemente com um indivíduo que cometeu ou
                              conspirou para cometer um crime grave de tráfico
                              de pessoas nos Estados Unidos ou fora?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .helpPeopleTrafficConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Você é cônjuge, filho ou filha de um indivíduo que
                              cometeu ou conspirou para cometer um crime de
                              tráfico de pessoas nos Estados Unidos ou fora e,
                              nos últimos cinco anos, beneficiou-se
                              conscientemente das atividades de tráfico?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .parentPeopleTrafficConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Você procura se envolver em espionagem, sabotagem,
                              violações de controle de exportação ou qualquer
                              outra atividade ilegal enquanto estiver nos
                              Estados Unidos?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].spyConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Você procura se envolver em atividades terroristas
                              enquanto estiver nos Estados Unidos ou já se
                              envolveu em atividades terroristas?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].terrorismConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Você já prestou ou pretende fornecer assistência
                              financeira ou outro tipo de apoio a terroristas ou
                              organizações terroristas?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .financialAssistanceConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Você é membro ou representante de uma organização
                              terrorista?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .terrorismMemberConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Você é cônjuge, filho ou filha de um indivíduo que
                              se envolveu em atividades terroristas, inclusive
                              fornecendo assistência financeira ou outro apoio a
                              terroristas ou organizações terroristas, nos
                              últimos cinco anos?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .parentTerrorismConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Você já ordenou, incitou, cometeu, ajudou ou de
                              alguma forma participou de genocídio?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].genocideConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Você já cometeu, ordenou, incitou, ajudou ou
                              participou de alguma forma em tortura?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].tortureConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Você cometeu, ordenou, incitou, ajudou ou de
                              alguma forma participou em assassinatos
                              extrajudiciais, assassinatos políticos ou outros
                              atos de violência?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].assassinConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Você já se envolveu no recrutamento ou na
                              utilização de crianças-soldados?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].childSoldierConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Você, enquanto servia como funcionário do governo,
                              foi responsável ou executou diretamente, em
                              qualquer momento, violações particularmente graves
                              da liberdade religiosa?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .religionLibertyConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Você já esteve diretamente envolvido no
                              estabelecimento ou na aplicação de controles
                              populacionais que forçaram uma mulher a se
                              submeter a um aborto contra a sua livre escolha ou
                              um homem ou uma mulher a se submeter à
                              esterilização contra a sua livre vontade?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].abortConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Você já esteve diretamente envolvido no
                              transplante coercitivo de órgãos humanos ou
                              tecidos corporais?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected]
                                .coerciveTransplantConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Você já tentou obter ou ajudar outras pessoas a
                              obter um visto, entrada nos Estados Unidos ou
                              qualquer outro benefício de imigração dos Estados
                              Unidos por meio de fraude, deturpação intencional
                              ou outros meios ilegais?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].visaFraudConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Você já foi removido ou deportado de algum país?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].deportedConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Você já recebeu a custódia de uma criança cidadã
                              dos EUA fora dos Estados Unidos de uma pessoa que
                              recebeu a custódia legal de um tribunal dos EUA?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].childCustodyConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Você votou nos Estados Unidos violando alguma lei
                              ou regulamento?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].lawViolationConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Você já renunciou à cidadania dos Estados Unidos
                              para evitar impostos?
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formsSelected[selected].avoidTaxConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full flex flex-col items-center justify-center gap-6">
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src="/assets/images/no-form.svg"
                      alt="Sem Formulário"
                      width={200}
                      height={200}
                    />
                    <span className="text-center text-lg font-medium">
                      Formulário não está completo
                    </span>
                  </div>
                  <Button onClick={handleClose}>Fechar</Button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
