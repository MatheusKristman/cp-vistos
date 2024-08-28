//TODO: continuar adicionando os itens do form na exibição do modal

import { motion } from "framer-motion";
import Image from "next/image";

import { FormAnimation } from "@/constants/animations/modal";
import { Button } from "@/components/ui/button";
import useClientDetailsModalStore from "@/constants/stores/useClientDetailsModalStore";
import { format } from "date-fns";
import { formatPhoneNumber } from "react-phone-number-input";

interface Props {
  handleClose: () => void;
}

export function ClientDetailsForm({ handleClose }: Props) {
  const { client } = useClientDetailsModalStore();

  if (!client || !client.form) {
    return <div>loading...</div>;
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
          // onClick={handleBack}
          variant="link"
          size="icon"
          className="row-start-1 row-end-2"
          // disabled={isPending || isDeletePending || isEditPending}
        >
          <Image
            src="/assets/icons/arrow-left-dark.svg"
            alt="Voltar"
            width={24}
            height={24}
          />
        </Button>

        <h1 className="text-2xl font-semibold text-foreground text-center sm:text-3xl row-end-3 row-start-2 col-span-2">
          Formulário
        </h1>

        <Button
          onClick={handleClose}
          variant="link"
          size="icon"
          className="row-start-1 row-end-2 justify-self-end"
          // disabled={isPending || isDeletePending || isEditPending}
        >
          <Image
            src="/assets/icons/cross-blue.svg"
            alt="Fechar"
            width={24}
            height={24}
          />
        </Button>
      </div>

      <div className="w-full flex flex-col gap-12">
        <div className="w-full flex flex-col gap-9">
          <h3 className="text-2xl font-semibold text-foreground">
            Dados Pessoais
          </h3>

          <div className="w-full flex flex-col gap-6">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Primeiro Nome
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.firstName
                    ? client.form.firstName
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Sobrenome
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.lastName
                    ? client.form.lastName
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  CPF
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.cpf ? client.form.cpf : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Código ou Nome de Guerra
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.warNameConfirmation
                    ? client.form.warName
                      ? client.form.warName
                      : "Não Preenchido"
                    : "Não Possui"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Outros Nomes (Religioso(a), Solteiro(a), etc...)
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.otherNamesConfirmation
                    ? client.form.otherNames.length > 0
                      ? client.form.otherNames.join(" | ")
                      : "Não Preenchido"
                    : "Não Possui"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Sexo
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.sex ? client.form.sex : "Não Preenchido"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Estado Civil
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.maritalStatus
                    ? client.form.maritalStatus
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Data de Nascimento
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.birthDate
                    ? format(client.form.birthDate, "dd/MM/yyyy")
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Cidade de Nascimento
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.birthCity
                    ? client.form.birthCity
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Estado de Nascimento
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.birthState
                    ? client.form.birthState
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  País de Nascimento
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.birthCountry
                    ? client.form.birthCountry
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  País de Origem (Nacionalidade)
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.originCountry
                    ? client.form.originCountry
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Número do passaporte em caso de outra nacionalidade
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.otherNationalityConfirmation
                    ? client.form.otherNationalityPassport
                      ? client.form.otherNationalityPassport
                      : "Não Preenchido"
                    : "Não Possui"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Residente de um país diferente de sua nacionalidade
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.otherCountryResidentConfirmation ? "Sim" : "Não"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  U.S. Social Security Number
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.USSocialSecurityNumber
                    ? client.form.USSocialSecurityNumber
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  U.S. Taxpayer ID Number
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.USTaxpayerIDNumber
                    ? client.form.USTaxpayerIDNumber
                    : "Não Preenchido"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-9">
          <h3 className="text-2xl font-semibold text-foreground">
            Endereço e Contatos
          </h3>

          <div className="w-full flex flex-col gap-6">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Endereço Residencial
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.address ? client.form.address : "Não Preenchido"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Número do Endereço
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.addressNumber
                    ? client.form.addressNumber
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Bairro
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.district
                    ? client.form.district
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Complemento
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.complement
                    ? client.form.complement
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  CEP
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.cep ? client.form.cep : "Não Preenchido"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Cidade
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.city ? client.form.city : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Estado
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.state ? client.form.state : "Não Preenchido"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  País
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.country ? client.form.country : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Endereço de Correio
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.postalAddressConfirmation
                    ? client.form.otherPostalAddress
                      ? client.form.otherPostalAddress
                      : "Não Preenchido"
                    : "É o mesmo endereço da residencia"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Celular
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.cel
                    ? formatPhoneNumber(client.form.cel)
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Telefone
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.tel
                    ? formatPhoneNumber(client.form.tel)
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  E-mail
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.email ? client.form.email : "Não Preenchido"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Outro Telefone
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.fiveYearsOtherTelConfirmation
                    ? client.form.otherTel
                      ? formatPhoneNumber(client.form.otherTel)
                      : "Não Preenchido"
                    : "Não Possui"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Outro E-mail
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.fiveYearsOtherEmailConfirmation
                    ? client.form.otherEmail
                      ? client.form.otherEmail
                      : "Não Preenchido"
                    : "Não Possui"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-6">
              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Facebook
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.facebook
                    ? client.form.facebook
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  LinkedIn
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.linkedin
                    ? client.form.linkedin
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Instagram
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.instagram
                    ? client.form.instagram
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Outras Redes
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.othersSocialMedia
                    ? client.form.othersSocialMedia
                    : "Não Preenchido"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-9">
          <h3 className="text-2xl font-semibold text-foreground">Passaporte</h3>

          <div className="w-full flex flex-col gap-6">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Número do Passaporte
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.passportNumber
                    ? client.form.passportNumber
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Cidade de Emissão
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.passportCity
                    ? client.form.passportCity
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Estado de Emissão
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.passportState
                    ? client.form.passportState
                    : "Não Preenchido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  País de Emissão
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.passportIssuingCountry
                    ? client.form.passportIssuingCountry
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Data de Emissão
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.passportIssuingDate
                    ? format(client.form.passportIssuingDate, "dd/MM/yyyy")
                    : "Não Preenchido"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Data de Expiração
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.passportExpireDate
                    ? format(client.form.passportExpireDate, "dd/MM/yyyy")
                    : "Sem expiração"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Já perdeu ou teve o passaporte roubado?
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.passportLostConfirmation ? "Sim" : "Não"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Número do Passaporte Perdido/Roubado
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.passportLostConfirmation
                    ? client.form.lostPassportNumber
                      ? client.form.lostPassportNumber
                      : "Não Preenchido"
                    : "Não Possui Passaporte Perdido"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  País do Passaporte Perdido/Roubado
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.passportLostConfirmation
                    ? client.form.lostPassportCountry
                      ? client.form.lostPassportCountry
                      : "Não Preenchido"
                    : "Não Possui Passaporte Perdido"}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="flex flex-col">
                <span className="text-sm text-foreground/50 font-medium">
                  Explique o que ocorreu
                </span>

                <span className="text-lg font-medium text-foreground">
                  {client.form.passportLostConfirmation
                    ? client.form.lostPassportDetails
                      ? client.form.lostPassportDetails
                      : "Não Preenchido"
                    : "Não Possui Passaporte Perdido"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
