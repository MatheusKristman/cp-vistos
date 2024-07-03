"use client";

import { Edit, Loader2, Trash } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FullForm } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  form: FullForm;
}

export function FormView({ form }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  function formatPhone(value: string) {
    if (!value) return;

    return value.replace(/\D+/g, "").replace(/(\d{2})(\d{2})(\d{4,5})(\d{4})/, "+$1 ($2) $3-$4");
  }

  function handleDelete() {
    if (!form) {
      return;
    }

    setIsLoading(true);

    axios
      .delete(`/api/form/delete/${form.id}`)
      .then((res) => {
        toast.success(res.data);
        router.refresh();
      })
      .catch((error) => {
        console.error(error);

        toast.error(error.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="w-full flex flex-col gap-9 bg-secondary py-8 px-11">
      <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
        <h2 className="text-xl text-center text-foreground w-full font-semibold sm:w-fit">
          {form.firstName ? `Formulário ${form.firstName}` : `Formulário adicional não preenchido`}
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Button variant="secondary" className="flex items-center gap-2" disabled={isLoading} asChild>
            <Link href={`/formulario/editar/${form.id}`}>
              <Edit />
              Editar
            </Link>
          </Button>

          <Button onClick={handleDelete} disabled={form.order === 0 || isLoading} className="flex items-center gap-2">
            {isLoading ? <Loader2 className="animate-spin" /> : <Trash />}
            Excluir
          </Button>
        </div>
      </div>

      <Accordion type="single" collapsible className="flex flex-col gap-6">
        <AccordionItem value="personal-data" className="bg-white p-6 flex flex-col gap-9 border-0">
          <AccordionTrigger className="text-lg text-foreground font-semibold hover:no-underline">
            Dados Pessoais
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Primeiro Nome</span>

                <span className="text-base text-foreground">{form.firstName ? form.firstName : "---"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Sobrenome</span>

                <span className="text-base text-foreground">{form.lastName ? form.lastName : "---"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">CPF</span>

                <span className="text-base text-foreground">{form.cpf ? form.cpf : "---"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Código ou Nome de Guerra</span>

                <span className="text-base text-foreground">{form.warName ? form.warName : "Não possui"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Outros Nomes (Religioso, Solteiro, etc...)
                </span>

                <span className="text-base text-foreground">
                  {form.otherNames && form.otherNames.length > 0 ? form.otherNames.join(" | ") : "Não possui"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Sexo</span>

                <span className="text-base text-foreground">{form.sex ? form.sex : "---"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Estado Civil</span>

                <span className="text-base text-foreground">{form.maritalStatus ? form.maritalStatus : "---"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Data de Nascimento</span>

                <span className="text-base text-foreground">
                  {form.birthDate ? format(form.birthDate, "dd/MM/yyyy") : "--/--/----"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Cidade de Nascença</span>

                <span className="text-base text-foreground">{form.birthCity ? form.birthCity : "---"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Estado de Nascença</span>

                <span className="text-base text-foreground">{form.birthState ? form.birthState : "---"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">País de Nascença</span>

                <span className="text-base text-foreground">{form.birthCountry ? form.birthCountry : "---"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">País de Origem (Nacionalidade)</span>

                <span className="text-base text-foreground">{form.originCountry ? form.originCountry : "---"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Número do passaporte em caso de outra nacionalidade
                </span>

                <span className="text-base text-foreground">
                  {form.otherNationalityPassport && form.otherNationalityPassport.length > 0
                    ? form.otherNationalityPassport
                    : "Não possui"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Residente de um país diferente de sua nacionalidade
                </span>

                <span className="text-base text-foreground">
                  {form.otherCountryResidentConfirmation ? "Sim" : "Não"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">U.S. Social Security Number</span>

                <span className="text-base text-foreground">
                  {form.USSocialSecurityNumber ? form.USSocialSecurityNumber : "Não possui"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">U.S. Taxpayer ID Number</span>

                <span className="text-base text-foreground">
                  {form.USTaxpayerIDNumber ? form.USTaxpayerIDNumber : "Não possui"}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="contacts-and-address" className="bg-white p-6 flex flex-col gap-9 border-0">
          <AccordionTrigger className="text-lg text-foreground font-semibold hover:no-underline">
            Endereço e Contatos
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Endereço</span>

                <span className="text-base text-foreground">{form.address ? form.address : "---"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Cidade</span>

                <span className="text-base text-foreground">{form.city ? form.city : "---"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Estado</span>

                <span className="text-base text-foreground">{form.state ? form.state : "---"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">CEP</span>

                <span className="text-base text-foreground">{form.cep ? form.cep : "---"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">País</span>

                <span className="text-base text-foreground">{form.country ? form.country : "---"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Endereço de Correio</span>

                <span className="text-base text-foreground">
                  {form.postalAddressConfirmation === false
                    ? "É o mesmo da residencia"
                    : form.otherPostalAddress && form.otherPostalAddress.length > 0
                    ? form.otherPostalAddress
                    : "Não preencheu o endereço"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Celular</span>

                <span className="text-base text-foreground">{form.cel ? formatPhone(form.cel) : "---"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Telefone</span>

                <span className="text-base text-foreground">{form.tel ? formatPhone(form.tel) : "---"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">E-mail</span>

                <span className="text-base text-foreground">{form.email ? form.email : "---"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Outro Telefone</span>

                <span className="text-base text-foreground">
                  {form.fiveYearsOtherTelConfirmation && form.otherTel && form.otherTel.length > 0
                    ? formatPhone(form.otherTel)
                    : "Não possui"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Outro E-mail</span>

                <span className="text-base text-foreground">
                  {form.fiveYearsOtherEmailConfirmation && form.otherEmail && form.otherEmail.length > 0
                    ? form.otherEmail
                    : "Não possui"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Facebook</span>

                <span className="text-base text-foreground">{form.facebook ? form.facebook : "Não possui"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">LinkedIn</span>

                <span className="text-base text-foreground">{form.linkedin ? form.linkedin : "Não possui"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Instagram</span>

                <span className="text-base text-foreground">{form.instagram ? form.instagram : "Não possui"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Outras Redes</span>

                <span className="text-base text-foreground">
                  {form.othersSocialMedia ? form.othersSocialMedia : "Não possui"}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="passport" className="bg-white p-6 flex flex-col gap-9 border-0">
          <AccordionTrigger className="text-lg text-foreground font-semibold hover:no-underline">
            Passaporte
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Número do Passaporte</span>

                <span className="text-base text-foreground">{form.passportNumber ? form.passportNumber : "---"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Cidade de Emissão</span>

                <span className="text-base text-foreground">{form.passportCity ? form.passportCity : "---"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Estado de Emissão</span>

                <span className="text-base text-foreground">{form.passportState ? form.passportState : "---"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">País de Emissão</span>

                <span className="text-base text-foreground">
                  {form.passportIssuingCountry ? form.passportIssuingCountry : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Data de Emissão</span>

                <span className="text-base text-foreground">
                  {form.passportIssuingDate ? format(form.passportIssuingDate, "dd/MM/yyyy") : "--/--/----"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Data de Expiração</span>

                <span className="text-base text-foreground">
                  {form.passportExpireDate ? format(form.passportExpireDate, "dd/MM/yyyy") : "Sem expiração"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Já perdeu ou teve o passaporte roubado?</span>

                <span className="text-base text-foreground">{form.passportLostConfirmation ? "Sim" : "Não"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Número do Passaporte Perdido/Roubado</span>

                <span className="text-base text-foreground">
                  {form.passportLostConfirmation && form.lostPassportNumber && form.lostPassportNumber.length > 0
                    ? form.lostPassportNumber
                    : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">País do Passaporte Perdido/Roubado</span>

                <span className="text-base text-foreground">
                  {form.passportLostConfirmation && form.lostPassportCountry && form.lostPassportCountry.length > 0
                    ? form.lostPassportCountry
                    : "---"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Explique o que ocorreu</span>

                <span className="text-base text-foreground">
                  {form.passportLostConfirmation && form.lostPassportDetails && form.lostPassportDetails.length > 0
                    ? form.lostPassportDetails
                    : "---"}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="about-travel" className="bg-white p-6 flex flex-col gap-9 border-0">
          <AccordionTrigger className="text-lg text-foreground font-semibold hover:no-underline">
            Sobre a Viagem
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Possui itinerário de viagem?</span>

                <span className="text-base text-foreground">{form.travelItineraryConfirmation ? "Sim" : "Não"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Data prevista de chegada nos EUA</span>

                <span className="text-base text-foreground">
                  {form.travelItineraryConfirmation && form.USAPreviewArriveDate
                    ? format(form.USAPreviewArriveDate, "dd/MM/yyyy")
                    : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Número do voo de chegada</span>

                <span className="text-base text-foreground">
                  {form.travelItineraryConfirmation && form.arriveFlyNumber && form.arriveFlyNumber.length > 0
                    ? form.arriveFlyNumber
                    : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Cidade de chegada</span>

                <span className="text-base text-foreground">
                  {form.travelItineraryConfirmation && form.arriveCity && form.arriveCity.length > 0
                    ? form.arriveCity
                    : "---"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Data prevista de retorno ao Brasil</span>

                <span className="text-base text-foreground">
                  {form.travelItineraryConfirmation && form.USAPreviewReturnDate
                    ? format(form.USAPreviewReturnDate, "dd/MM/yyyy")
                    : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Número do voo de partida</span>

                <span className="text-base text-foreground">
                  {form.travelItineraryConfirmation && form.returnFlyNumber && form.returnFlyNumber.length > 0
                    ? form.returnFlyNumber
                    : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Cidade de partida</span>

                <span className="text-base text-foreground">
                  {form.travelItineraryConfirmation && form.returnCity && form.returnCity.length > 0
                    ? form.returnCity
                    : "---"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Tempo estimado de permanência nos EUA</span>

                <span className="text-base text-foreground">
                  {form.estimatedTimeOnUSA && form.estimatedTimeOnUSA.length > 0 ? form.estimatedTimeOnUSA : "Não sabe"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Locais que irá visitar</span>

                <span className="text-base text-foreground">
                  {form.visitLocations && form.visitLocations.length > 0 ? form.visitLocations.join(" | ") : "---"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Endereço completo onde ficará nos EUA</span>

                <span className="text-base text-foreground">
                  {form.USACompleteAddress && form.USACompleteAddress.length > 0 ? form.USACompleteAddress : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">ZIP Code de onde ficará nos EUA</span>

                <span className="text-base text-foreground">
                  {form.USAZipCode && form.USAZipCode.length > 0 ? form.USAZipCode : "---"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Cidade nos EUA</span>

                <span className="text-base text-foreground">
                  {form.USACity && form.USACity.length > 0 ? form.USACity : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Estado nos EUA</span>

                <span className="text-base text-foreground">
                  {form.USAState && form.USAState.length > 0 ? form.USAState : "---"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Nome ou empresa que pagará a viagem</span>

                <span className="text-base text-foreground">
                  {form.payerNameOrCompany && form.payerNameOrCompany.length > 0 ? form.payerNameOrCompany : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Telefone Residencial</span>

                <span className="text-base text-foreground">
                  {form.payerTel && form.payerTel.length > 0 ? formatPhone(form.payerTel) : "---"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Endereço Completo</span>

                <span className="text-base text-foreground">
                  {form.payerAddress && form.payerAddress.length > 0 ? form.payerAddress : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Relação com o solicitante</span>

                <span className="text-base text-foreground">
                  {form.payerRelation && form.payerRelation.length > 0 ? form.payerRelation : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">E-mail</span>

                <span className="text-base text-foreground">
                  {form.payerEmail && form.payerEmail.length > 0 ? form.payerEmail : "---"}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="travel-company" className="bg-white p-6 flex flex-col gap-9 border-0">
          <AccordionTrigger className="text-lg text-foreground font-semibold hover:no-underline">
            Companhia de Viagem
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full flex flex-col gap-9">
              {form.otherPeopleTravelingConfirmation &&
              form.otherPeopleTraveling &&
              form.otherPeopleTraveling.length > 0 ? (
                form.otherPeopleTraveling.map((otherPeople, index) => (
                  <div key={otherPeople.id} className="w-full bg-[#D3D3E2] p-5 flex flex-col gap-4">
                    <div className="w-full flex items-center gap-2">
                      <div className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white text-lg font-medium">{index + 1}</span>
                      </div>

                      <span className="text-foreground text-lg font-medium">Pessoa Acompanhante</span>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">Nome completo da outra pessoa</span>

                        <span className="text-base text-foreground">{otherPeople.name}</span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">Relação com a outra pessoa</span>

                        <span className="text-base text-foreground">{otherPeople.relation}</span>
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
                <span className="text-base text-foreground font-medium">
                  Esta viajando como integrante de um grupo de viagem?
                </span>

                <span className="text-base text-foreground">{form.groupMemberConfirmation ? "Sim" : "Não"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Nome da organização ou grupo</span>

                <span className="text-base text-foreground">
                  {form.groupMemberConfirmation && form.groupName && form.groupName.length > 0 ? form.groupName : "---"}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="previous-travel" className="bg-white p-6 flex flex-col gap-9 border-0">
          <AccordionTrigger className="text-lg text-foreground font-semibold hover:no-underline">
            Viagens Anteriores
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Já foi para os EUA?</span>

                <span className="text-base text-foreground">{form.hasBeenOnUSAConfirmation ? "Sim" : "Não"}</span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-9">
              {form.hasBeenOnUSAConfirmation && form.USALastTravel && form.USALastTravel.length > 0 ? (
                form.USALastTravel.map((lastTravel, index) => (
                  <div key={lastTravel.id} className="w-full bg-[#D3D3E2] p-5 flex flex-col gap-4">
                    <div className="w-full flex items-center gap-2">
                      <div className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white text-lg font-medium">{index + 1}</span>
                      </div>

                      <span className="text-foreground text-lg font-medium">Viagem</span>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">Data prevista de chegada nos EUA</span>

                        <span className="text-base text-foreground">
                          {lastTravel.arriveDate ? format(lastTravel.arriveDate, "dd/MM/yyyy") : "--/--/----"}
                        </span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">
                          Tempo estimado de permanência nos EUA
                        </span>

                        <span className="text-base text-foreground">{lastTravel.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full bg-[#D3D3E2] p-5 flex items-center justify-center">
                  <span className="text-foreground text-lg text-center font-semibold">Não possui viagem anterior</span>
                </div>
              )}
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Já obteve uma licença americana para dirigir nos EUA?
                </span>

                <span className="text-base text-foreground">
                  {form.americanLicenseToDriveConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-9">
              {form.americanLicenseToDriveConfirmation && form.americanLicense && form.americanLicense.length > 0 ? (
                form.americanLicense.map((americanLicense, index) => (
                  <div key={americanLicense.id} className="w-full bg-[#FDF0D2] p-5 flex flex-col gap-4">
                    <div className="w-full flex items-center gap-2">
                      <div className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white text-lg font-medium">{index + 1}</span>
                      </div>

                      <span className="text-foreground text-lg font-medium">Licença</span>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">Número da licença</span>

                        <span className="text-base text-foreground">{americanLicense.licenseNumber}</span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">Estado</span>

                        <span className="text-base text-foreground">{americanLicense.state}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full bg-[#FDF0D2] p-5 flex items-center justify-center">
                  <span className="text-foreground text-lg text-center font-semibold">Não possui licença</span>
                </div>
              )}
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Já obteve visto nos EUA?</span>

                <span className="text-base text-foreground">{form.USAVisaConfirmation ? "Sim" : "Não"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Data de Emissão do Visto</span>

                <span className="text-base text-foreground">
                  {form.visaIssuingDate ? format(form.visaIssuingDate, "dd/MM/yyyy") : "--/--/----"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Número do Visto</span>

                <span className="text-base text-foreground">
                  {form.visaNumber && form.visaNumber.length > 0 ? form.visaNumber : "Não sei o número"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Está solicitando o novo visto do mesmo país ou localização daquele concedido previamente?
                </span>

                <span className="text-base text-foreground">{form.newVisaConfirmation ? "Sim" : "Não"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Este país é o mesmo onde está localizada sua residencia principal?
                </span>

                <span className="text-base text-foreground">
                  {form.sameCountryResidenceConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Está solicitando o mesmo tipo de visto concedido anteriormente?
                </span>

                <span className="text-base text-foreground">{form.sameVisaTypeConfirmation ? "Sim" : "Não"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Forneceu digitais dos 10 dedos?</span>

                <span className="text-base text-foreground">
                  {form.fingerprintsProvidedConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Já teve um visto perdido ou roubado?</span>

                <span className="text-base text-foreground">{form.lostVisaConfirmation ? "Sim" : "Não"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  O que ocorreu com o visto perdido ou roubado
                </span>

                <span className="text-base text-foreground">
                  {form.lostVisaDetails && form.lostVisaDetails.length > 0 ? form.lostVisaDetails : "---"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Já teve um visto revogado ou cancelado?</span>

                <span className="text-base text-foreground">{form.canceledVisaConfirmation ? "Sim" : "Não"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  O que ocorreu com o visto revogado ou cancelado
                </span>

                <span className="text-base text-foreground">
                  {form.canceledVisaDetails && form.canceledVisaDetails.length > 0 ? form.canceledVisaDetails : "---"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Já teve um visto negado?</span>

                <span className="text-base text-foreground">{form.deniedVisaConfirmation ? "Sim" : "Não"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">O que ocorreu com o visto negado</span>

                <span className="text-base text-foreground">
                  {form.deniedVisaDetails && form.deniedVisaDetails.length > 0 ? form.deniedVisaDetails : "---"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Posto Consular no Brasil</span>

                <span className="text-base text-foreground">
                  {form.consularPost && form.consularPost.length > 0 ? form.consularPost : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Categoria/tipo de visto negado</span>

                <span className="text-base text-foreground">
                  {form.deniedVisaType && form.deniedVisaType.length > 0 ? form.deniedVisaType : "---"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Alguém já solicitou alguma petição de imigração em seu nome perante o Departamento de Imigração dos
                  Estados Unidos?
                </span>

                <span className="text-base text-foreground">
                  {form.immigrationRequestByAnotherPersonConfirmation ? "Sim" : "Não"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Motivo</span>

                <span className="text-base text-foreground">
                  {form.immigrationRequestByAnotherPersonDetails &&
                  form.immigrationRequestByAnotherPersonDetails.length > 0
                    ? form.immigrationRequestByAnotherPersonDetails
                    : "---"}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="usa-contacts" className="bg-white p-6 flex flex-col gap-9 border-0">
          <AccordionTrigger className="text-lg text-foreground font-semibold hover:no-underline">
            Contato nos Estados Unidos
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Nome completo da pessoa ou organização</span>

                <span className="text-base text-foreground">
                  {form.organizationOrUSAResidentName && form.organizationOrUSAResidentName.length > 0
                    ? form.organizationOrUSAResidentName
                    : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Relação do contato com você</span>

                <span className="text-base text-foreground">
                  {form.organizationOrUSAResidentRelation && form.organizationOrUSAResidentRelation.length > 0
                    ? form.organizationOrUSAResidentRelation
                    : "---"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Endereço completo do contato</span>

                <span className="text-base text-foreground">
                  {form.organizationOrUSAResidentAddress && form.organizationOrUSAResidentAddress.length > 0
                    ? form.organizationOrUSAResidentAddress
                    : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">ZIP Code do contato</span>

                <span className="text-base text-foreground">
                  {form.organizationOrUSAResidentZipCode && form.organizationOrUSAResidentZipCode.length > 0
                    ? form.organizationOrUSAResidentZipCode
                    : "---"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Cidade do contato</span>

                <span className="text-base text-foreground">
                  {form.organizationOrUSAResidentCity && form.organizationOrUSAResidentCity.length > 0
                    ? form.organizationOrUSAResidentCity
                    : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Estado do contato</span>

                <span className="text-base text-foreground">
                  {form.organizationOrUSAResidentState && form.organizationOrUSAResidentState.length > 0
                    ? form.organizationOrUSAResidentState
                    : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">País do contato</span>

                <span className="text-base text-foreground">
                  {form.organizationOrUSAResidentCountry && form.organizationOrUSAResidentCountry.length > 0
                    ? form.organizationOrUSAResidentCountry
                    : "---"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Telefone do contato</span>

                <span className="text-base text-foreground">
                  {form.organizationOrUSAResidentTel && form.organizationOrUSAResidentTel.length > 0
                    ? formatPhone(form.organizationOrUSAResidentTel)
                    : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">E-mail do contato</span>

                <span className="text-base text-foreground">
                  {form.organizationOrUSAResidentEmail && form.organizationOrUSAResidentEmail.length > 0
                    ? form.organizationOrUSAResidentEmail
                    : "---"}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="family" className="bg-white p-6 flex flex-col gap-9 border-0">
          <AccordionTrigger className="text-lg text-foreground font-semibold hover:no-underline">
            Informações da Família
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Nome Completo do Pai</span>

                <span className="text-base text-foreground">
                  {form.fatherCompleteName && form.fatherCompleteName.length > 0 ? form.fatherCompleteName : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Data de Nascimento do Pai</span>

                <span className="text-base text-foreground">
                  {form.fatherBirthdate ? format(form.fatherBirthdate, "dd/MM/yyyy") : "--/--/----"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Pai se encontra nos EUA?</span>

                <span className="text-base text-foreground">{form.fatherLiveInTheUSAConfirmation ? "Sim" : "Não"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Situação do Pai</span>

                <span className="text-base text-foreground">
                  {form.fatherUSASituation && form.fatherUSASituation.length > 0 ? form.fatherUSASituation : "---"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Nome Completo do Mãe</span>

                <span className="text-base text-foreground">
                  {form.motherCompleteName && form.motherCompleteName.length > 0 ? form.motherCompleteName : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Data de Nascimento do Mãe</span>

                <span className="text-base text-foreground">
                  {form.motherBirthdate ? format(form.motherBirthdate, "dd/MM/yyyy") : "--/--/----"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Mãe se encontra nos EUA?</span>

                <span className="text-base text-foreground">{form.motherLiveInTheUSAConfirmation ? "Sim" : "Não"}</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Situação do Mãe</span>

                <span className="text-base text-foreground">
                  {form.motherUSASituation && form.motherUSASituation.length > 0 ? form.motherUSASituation : "---"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Há alguém da família nos EUA?</span>

                <span className="text-base text-foreground">
                  {form.familyLivingInTheUSAConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-9">
              {form.familyLivingInTheUSAConfirmation &&
              form.familyLivingInTheUSA &&
              form.familyLivingInTheUSA.length > 0 ? (
                form.familyLivingInTheUSA.map((familyLivingInTheUSA, index) => (
                  <div key={familyLivingInTheUSA.id} className="w-full bg-[#D3D3E2] p-5 flex flex-col gap-4">
                    <div className="w-full flex items-center gap-2">
                      <div className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white text-lg font-medium">{index + 1}</span>
                      </div>

                      <span className="text-foreground text-lg font-medium">Familiar</span>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">Nome do Parente</span>

                        <span className="text-base text-foreground">{familyLivingInTheUSA.name}</span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">Parentesco</span>

                        <span className="text-base text-foreground">{familyLivingInTheUSA.relation}</span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">Situação do Parente</span>

                        <span className="text-base text-foreground">{familyLivingInTheUSA.situation}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full bg-[#D3D3E2] p-5 flex items-center justify-center">
                  <span className="text-foreground text-lg text-center font-semibold">Não possui outro familiar</span>
                </div>
              )}
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Nome Completo (Cônjuge/Parceiro/Ex-Cônjuge)
                </span>

                <span className="text-base text-foreground">
                  {form.partnerCompleteName && form.partnerCompleteName.length > 0 ? form.partnerCompleteName : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Data de Nascimento (Cônjuge/Parceiro/Ex-Cônjuge)
                </span>

                <span className="text-base text-foreground">
                  {form.partnerBirthdate ? format(form.partnerBirthdate, "dd/MM/yyyy") : "--/--/----"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Nacionalidade (Cônjuge/Parceiro/Ex-Cônjuge)
                </span>

                <span className="text-base text-foreground">
                  {form.partnerNationality && form.partnerNationality.length > 0 ? form.partnerNationality : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Cidade de Nascimento (Cônjuge/Parceiro/Ex-Cônjuge)
                </span>

                <span className="text-base text-foreground">
                  {form.partnerCity && form.partnerCity.length > 0 ? form.partnerCity : "---"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Estado de Nascimento (Cônjuge/Parceiro/Ex-Cônjuge)
                </span>

                <span className="text-base text-foreground">
                  {form.partnerState && form.partnerState.length > 0 ? form.partnerState : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  País de Nascimento (Cônjuge/Parceiro/Ex-Cônjuge)
                </span>

                <span className="text-base text-foreground">
                  {form.partnerCountry && form.partnerCountry.length > 0 ? form.partnerCountry : "---"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Data da União (Cônjuge/Parceiro/Ex-Cônjuge)
                </span>

                <span className="text-base text-foreground">
                  {form.unionDate ? format(form.unionDate, "dd/MM/yyyy") : "--/--/----"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Data da Separação (Cônjuge/Parceiro/Ex-Cônjuge)
                </span>

                <span className="text-base text-foreground">
                  {form.divorceDate ? format(form.divorceDate, "dd/MM/yyyy") : "--/--/----"}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="work-education" className="bg-white p-6 flex flex-col gap-9 border-0">
          <AccordionTrigger className="text-lg text-foreground font-semibold hover:no-underline">
            Trabalho e Educação
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Ocupação atual</span>

                <span className="text-base text-foreground">
                  {form.occupation && form.occupation.length > 0 ? form.occupation : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Cargo/Função</span>

                <span className="text-base text-foreground">
                  {form.office && form.office.length > 0 ? form.office : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Nome do empregador ou empresa atual</span>

                <span className="text-base text-foreground">
                  {form.companyOrBossName && form.companyOrBossName.length > 0 ? form.companyOrBossName : "---"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Endereço completo da empresa</span>

                <span className="text-base text-foreground">
                  {form.companyAddress && form.companyAddress.length > 0 ? form.companyAddress : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Cidade da empresa</span>

                <span className="text-base text-foreground">
                  {form.companyCity && form.companyCity.length > 0 ? form.companyCity : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Estado da empresa</span>

                <span className="text-base text-foreground">
                  {form.companyState && form.companyState.length > 0 ? form.companyState : "---"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">País da empresa</span>

                <span className="text-base text-foreground">
                  {form.companyCountry && form.companyCountry.length > 0 ? form.companyCountry : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Cep da empresa</span>

                <span className="text-base text-foreground">
                  {form.companyCep && form.companyCep.length > 0 ? form.companyCep : "---"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Telefone da empresa</span>

                <span className="text-base text-foreground">
                  {form.companyTel && form.companyTel.length > 0 ? formatPhone(form.companyTel) : "---"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Data de admissão</span>

                <span className="text-base text-foreground">
                  {form.admissionDate ? format(form.admissionDate, "dd/MM/yyyy") : "--/--/----"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Data de aposentadoria</span>

                <span className="text-base text-foreground">
                  {form.retireeDate ? format(form.retireeDate, "dd/MM/yyyy") : "--/--/----"}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Renda mensal (R$)</span>

                <span className="text-base text-foreground">
                  {form.monthlySalary && form.monthlySalary.length > 0 ? form.monthlySalary : "---"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Descreva quais são as suas funções dentro da sua empresa, se possui funcionários registrados e outras
                  informações relacionadas ao seu negócio
                </span>

                <span className="text-base text-foreground">
                  {form.jobDetails && form.jobDetails.length > 0 ? form.jobDetails : "---"}
                </span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-9">
              {form.previousJobConfirmation && form.previousJobs && form.previousJobs.length > 0 ? (
                form.previousJobs.map((previousJobs, index) => (
                  <div key={previousJobs.id} className="w-full bg-[#D3D3E2] p-5 flex flex-col gap-4">
                    <div className="w-full flex items-center gap-2">
                      <div className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white text-lg font-medium">{index + 1}</span>
                      </div>

                      <span className="text-foreground text-lg font-medium">Emprego Anterior</span>
                    </div>

                    <div className="w-full grid grid-cols-1 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">
                          Nome do empregador ou empresa anterior
                        </span>

                        <span className="text-base text-foreground">{previousJobs.companyName}</span>
                      </div>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">Endereço completo da empresa</span>

                        <span className="text-base text-foreground">{previousJobs.companyAddress}</span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">Cidade da empresa</span>

                        <span className="text-base text-foreground">{previousJobs.companyCity}</span>
                      </div>
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">Estado da empresa</span>

                        <span className="text-base text-foreground">{previousJobs.companyState}</span>
                      </div>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">País da empresa</span>

                        <span className="text-base text-foreground">{previousJobs.companyCountry}</span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">CEP da empresa</span>

                        <span className="text-base text-foreground">{previousJobs.companyCep}</span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">Telefone da empresa</span>

                        <span className="text-base text-foreground">
                          {previousJobs.companyTel ? formatPhone(previousJobs.companyTel) : "---"}
                        </span>
                      </div>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">Cargo / Função</span>

                        <span className="text-base text-foreground">{previousJobs.office}</span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">Nome completo do supervisor</span>

                        <span className="text-base text-foreground">{previousJobs.supervisorName}</span>
                      </div>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">Data de admissão</span>

                        <span className="text-base text-foreground">
                          {previousJobs.admissionDate ? format(previousJobs.admissionDate, "dd/MM/yyyy") : "--/--/----"}
                        </span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">Data de demissão</span>

                        <span className="text-base text-foreground">
                          {previousJobs.resignationDate
                            ? format(previousJobs.resignationDate, "dd/MM/yyyy")
                            : "--/--/----"}
                        </span>
                      </div>
                    </div>

                    <div className="w-full grid grid-cols-1 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">Descrição da tarefa exercida</span>

                        <span className="text-base text-foreground">{previousJobs.jobDescription}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full bg-[#D3D3E2] p-5 flex items-center justify-center">
                  <span className="text-foreground text-lg text-center font-semibold">Não possui emprego anterior</span>
                </div>
              )}
            </div>

            <div className="w-full flex flex-col gap-9">
              {form.courses && form.courses.length > 0 ? (
                form.courses.map((course, index) => (
                  <div key={course.id} className="w-full bg-[#FDF0D2] p-5 flex flex-col gap-4">
                    <div className="w-full flex items-center gap-2">
                      <div className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white text-lg font-medium">{index + 1}</span>
                      </div>

                      <span className="text-foreground text-lg font-medium">Instituição de Ensino Anterior</span>
                    </div>

                    <div className="w-full grid grid-cols-1 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">Nome completo da instituição</span>

                        <span className="text-base text-foreground">{course.institutionName}</span>
                      </div>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">Endereço completo da instituição</span>

                        <span className="text-base text-foreground">{course.address}</span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">Cidade da instituição</span>

                        <span className="text-base text-foreground">{course.city}</span>
                      </div>
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">Estado da instituição</span>

                        <span className="text-base text-foreground">{course.state}</span>
                      </div>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">País da instituição</span>

                        <span className="text-base text-foreground">{course.country}</span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">CEP da instituição</span>

                        <span className="text-base text-foreground">{course.cep}</span>
                      </div>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">Nome do curso</span>

                        <span className="text-base text-foreground">{course.courseName}</span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">Data de início</span>

                        <span className="text-base text-foreground">
                          {course.initialDate ? format(course.initialDate, "dd/MM/yyyy") : "--/--/----"}
                        </span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium">Data de término</span>

                        <span className="text-base text-foreground">
                          {course.finishDate ? format(course.finishDate, "dd/MM/yyyy") : "--/--/----"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full bg-[#FDF0D2] p-5 flex items-center justify-center">
                  <span className="text-foreground text-lg text-center font-semibold">Não possui ensino anterior</span>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="security" className="bg-white p-6 flex flex-col gap-9 border-0">
          <AccordionTrigger className="text-lg text-foreground font-semibold hover:no-underline">
            Segurança
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Possui alguma doença contagiosa (cancroide, gonorreia, granuloma inguinal, hanseníase infecciosa,
                  linfogranuloma venéreo, sífilis em estágio infeccioso, tuberculose ativa e outras doenças, conforme
                  determinado pelo Departamento de Saúde e Serviços Humanos?
                </span>

                <span className="text-base text-foreground">{form.contagiousDiseaseConfirmation ? "Sim" : "Não"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Possui algum problema físico ou mental que possa interferir em sua segurança ou de outras pessoas?
                </span>

                <span className="text-base text-foreground">
                  {form.phisicalMentalProblemConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já foi preso ou condenado por algum delito ou crime, mesmo que tenha sido objeto de perdão,
                  anistia ou outra ação semelhante?
                </span>

                <span className="text-base text-foreground">{form.crimeConfirmation ? "Sim" : "Não"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Já teve problemas com drogas?</span>

                <span className="text-base text-foreground">{form.drugsProblemConfirmation ? "Sim" : "Não"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já violou ou esteve envolvido em alguma conspiração para violar qualquer lei relacionada ao
                  controle de substâncias?
                </span>

                <span className="text-base text-foreground">{form.lawViolateConfirmation ? "Sim" : "Não"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você está vindo para os Estados Unidos para se envolver em prostituição ou vício comercializado
                  ilegalmente ou esteve envolvido em prostituição ou procura de prostitutas nos últimos 10 anos?
                </span>

                <span className="text-base text-foreground">{form.prostitutionConfirmation ? "Sim" : "Não"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já esteve envolvido ou pretende se envolver em lavagem de dinheiro?
                </span>

                <span className="text-base text-foreground">{form.moneyLaundryConfirmation ? "Sim" : "Não"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já cometeu ou conspirou para cometer um crime de tráfico de pessoas nos Estados Unidos ou fora
                  dos Estados Unidos?
                </span>

                <span className="text-base text-foreground">{form.peopleTrafficConfirmation ? "Sim" : "Não"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já ajudou, encorajou, ajudou ou conspirou conscientemente com um indivíduo que cometeu ou
                  conspirou para cometer um crime grave de tráfico de pessoas nos Estados Unidos ou fora?
                </span>

                <span className="text-base text-foreground">{form.helpPeopleTrafficConfirmation ? "Sim" : "Não"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você é cônjuge, filho ou filha de um indivíduo que cometeu ou conspirou para cometer um crime de
                  tráfico de pessoas nos Estados Unidos ou fora e, nos últimos cinco anos, beneficiou-se conscientemente
                  das atividades de tráfico?
                </span>

                <span className="text-base text-foreground">
                  {form.parentPeopleTrafficConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você procura se envolver em espionagem, sabotagem, violações de controle de exportação ou qualquer
                  outra atividade ilegal enquanto estiver nos Estados Unidos?
                </span>

                <span className="text-base text-foreground">{form.spyConfirmation ? "Sim" : "Não"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você procura se envolver em atividades terroristas enquanto estiver nos Estados Unidos ou já se
                  envolveu em atividades terroristas?
                </span>

                <span className="text-base text-foreground">{form.terrorismConfirmation ? "Sim" : "Não"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já prestou ou pretende fornecer assistência financeira ou outro tipo de apoio a terroristas ou
                  organizações terroristas?
                </span>

                <span className="text-base text-foreground">
                  {form.financialAssistanceConfirmation ? "Sim" : "Não"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você é membro ou representante de uma organização terrorista?
                </span>

                <span className="text-base text-foreground">{form.terrorismMemberConfirmation ? "Sim" : "Não"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você é cônjuge, filho ou filha de um indivíduo que se envolveu em atividades terroristas, inclusive
                  fornecendo assistência financeira ou outro apoio a terroristas ou organizações terroristas, nos
                  últimos cinco anos?
                </span>

                <span className="text-base text-foreground">{form.parentTerrorismConfirmation ? "Sim" : "Não"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já ordenou, incitou, cometeu, ajudou ou de alguma forma participou de genocídio?
                </span>

                <span className="text-base text-foreground">{form.genocideConfirmation ? "Sim" : "Não"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já cometeu, ordenou, incitou, ajudou ou participou de alguma forma em tortura?
                </span>

                <span className="text-base text-foreground">{form.tortureConfirmation ? "Sim" : "Não"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você cometeu, ordenou, incitou, ajudou ou de alguma forma participou em assassinatos extrajudiciais,
                  assassinatos políticos ou outros atos de violência?
                </span>

                <span className="text-base text-foreground">{form.assassinConfirmation ? "Sim" : "Não"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já se envolveu no recrutamento ou na utilização de crianças-soldados?
                </span>

                <span className="text-base text-foreground">{form.childSoldierConfirmation ? "Sim" : "Não"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você, enquanto servia como funcionário do governo, foi responsável ou executou diretamente, em
                  qualquer momento, violações particularmente graves da liberdade religiosa?
                </span>

                <span className="text-base text-foreground">{form.religionLibertyConfirmation ? "Sim" : "Não"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já esteve diretamente envolvido no estabelecimento ou na aplicação de controles populacionais que
                  forçaram uma mulher a se submeter a um aborto contra a sua livre escolha ou um homem ou uma mulher a
                  se submeter à esterilização contra a sua livre vontade?
                </span>

                <span className="text-base text-foreground">{form.abortConfirmation ? "Sim" : "Não"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já esteve diretamente envolvido no transplante coercitivo de órgãos humanos ou tecidos corporais?
                </span>

                <span className="text-base text-foreground">{form.coerciveTransplantConfirmation ? "Sim" : "Não"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já tentou obter ou ajudar outras pessoas a obter um visto, entrada nos Estados Unidos ou qualquer
                  outro benefício de imigração dos Estados Unidos por meio de fraude, deturpação intencional ou outros
                  meios ilegais?
                </span>

                <span className="text-base text-foreground">{form.visaFraudConfirmation ? "Sim" : "Não"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já foi removido ou deportado de algum país?
                </span>

                <span className="text-base text-foreground">{form.deportedConfirmation ? "Sim" : "Não"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já recebeu a custódia de uma criança cidadã dos EUA fora dos Estados Unidos de uma pessoa que
                  recebeu a custódia legal de um tribunal dos EUA?
                </span>

                <span className="text-base text-foreground">{form.childCustodyConfirmation ? "Sim" : "Não"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você votou nos Estados Unidos violando alguma lei ou regulamento?
                </span>

                <span className="text-base text-foreground">{form.lawViolationConfirmation ? "Sim" : "Não"}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já renunciou à cidadania dos Estados Unidos para evitar impostos?
                </span>

                <span className="text-base text-foreground">{form.avoidTaxConfirmation ? "Sim" : "Não"}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
