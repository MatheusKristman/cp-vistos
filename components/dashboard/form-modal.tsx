//TODO: adicionar state para a order, para que assim apresente o formulário que está selecionado

import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Loader2, X } from "lucide-react";

import { ModalAnimation, OverlayAnimation } from "@/constants/animations/modal";
import { Button } from "@/components/ui/button";
import useClientsStore from "@/constants/stores/useClientsStore";
import { cn } from "@/lib/utils";

export function FormModal() {
  const { formsSelected, isFormModalOpen, closeFormModal } = useClientsStore();

  return (
    <>
      {isFormModalOpen && (
        <motion.div
          key="form-modal"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={OverlayAnimation}
          className="w-screen h-screen bg-black/80 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle"
        >
          <motion.div
            key="form-modal"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={ModalAnimation}
            className="w-full max-w-[550px] bg-white p-6 inline-block align-middle overflow-x-hidden"
          >
            <div className="w-full flex justify-end mb-6">
              <Button onClick={closeFormModal} variant="link" size="icon">
                <X />
              </Button>
            </div>

            <div className="w-full flex flex-col gap-6">
              {formsSelected !== null ? (
                <>
                  <div className="w-full flex flex-col gap-4">
                    <div
                      className={cn(
                        "w-full border border-primary bg-secondary hover:bg-primary group p-4 flex items-center justify-center transition-colors",
                        { "bg-primary": true },
                      )}
                    >
                      <span
                        className={cn(
                          "text-base font-medium text-center text-foreground group-hover:text-white transition-colors",
                          { "text-white": true },
                        )}
                      >
                        Formulário Teste
                      </span>
                    </div>

                    <div
                      className={cn(
                        "w-full border border-primary bg-secondary hover:bg-primary group p-4 flex items-center justify-center transition-colors",
                        { "bg-primary": false },
                      )}
                    >
                      <span
                        className={cn(
                          "text-base font-medium text-center text-foreground group-hover:text-white transition-colors",
                          { "text-white": false },
                        )}
                      >
                        Formulário Teste 2
                      </span>
                    </div>

                    <div
                      className={cn(
                        "w-full border border-primary bg-secondary hover:bg-primary group p-4 flex items-center justify-center transition-colors",
                        { "bg-primary": false },
                      )}
                    >
                      <span
                        className={cn(
                          "text-base font-medium text-center text-foreground group-hover:text-white transition-colors",
                          { "text-white": false },
                        )}
                      >
                        Formulário Teste 3
                      </span>
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-4">
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
                              {formSelected.firstName
                                ? formSelected.firstName
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Sobrenome
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formSelected.lastName
                                ? formSelected.lastName
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              CPF
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formSelected.cpf ? formSelected.cpf : "---"}
                            </span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Código ou Nome de Guerra
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formSelected.warName
                                ? formSelected.warName
                                : "Não possui"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Outros Nomes (Religioso, Solteiro, etc...)
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formSelected.otherNames &&
                              formSelected.otherNames.length > 0
                                ? formSelected.otherNames.join(" | ")
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
                              {formSelected.sex ? formSelected.sex : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Estado Civil
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formSelected.maritalStatus
                                ? formSelected.maritalStatus
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Data de Nascimento
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formSelected.birthDate
                                ? format(formSelected.birthDate, "dd/MM/yyyy")
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
                              {formSelected.birthCity
                                ? formSelected.birthCity
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Estado de Nascença
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formSelected.birthState
                                ? formSelected.birthState
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              País de Nascença
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formSelected.birthCountry
                                ? formSelected.birthCountry
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
                              {formSelected.originCountry
                                ? formSelected.originCountry
                                : "---"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              Número do passaporte em caso de outra
                              nacionalidade
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formSelected.otherNationalityPassport &&
                              formSelected.otherNationalityPassport.length > 0
                                ? formSelected.otherNationalityPassport
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
                              {formSelected.otherCountryResidentConfirmation
                                ? "Sim"
                                : "Não"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              U.S. Social Security Number
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formSelected.USSocialSecurityNumber
                                ? formSelected.USSocialSecurityNumber
                                : "Não possui"}
                            </span>
                          </div>

                          <div className="w-full flex flex-col gap-1">
                            <span className="text-base text-foreground font-medium text-center sm:text-left">
                              U.S. Taxpayer ID Number
                            </span>

                            <span className="text-base text-foreground text-center sm:text-left">
                              {formSelected.USTaxpayerIDNumber
                                ? formSelected.USTaxpayerIDNumber
                                : "Não possui"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <span>Formulário não está completo</span>
              )}
            </div>

            {/* {formSelected ? (
              <>
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
                          {formSelected.firstName ? formSelected.firstName : "---"}
                        </span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium text-center sm:text-left">
                          Sobrenome
                        </span>

                        <span className="text-base text-foreground text-center sm:text-left">
                          {formSelected.lastName ? formSelected.lastName : "---"}
                        </span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium text-center sm:text-left">CPF</span>

                        <span className="text-base text-foreground text-center sm:text-left">
                          {formSelected.cpf ? formSelected.cpf : "---"}
                        </span>
                      </div>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium text-center sm:text-left">
                          Código ou Nome de Guerra
                        </span>

                        <span className="text-base text-foreground text-center sm:text-left">
                          {formSelected.warName ? formSelected.warName : "Não possui"}
                        </span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium text-center sm:text-left">
                          Outros Nomes (Religioso, Solteiro, etc...)
                        </span>

                        <span className="text-base text-foreground text-center sm:text-left">
                          {formSelected.otherNames && formSelected.otherNames.length > 0
                            ? formSelected.otherNames.join(" | ")
                            : "Não possui"}
                        </span>
                      </div>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium text-center sm:text-left">Sexo</span>

                        <span className="text-base text-foreground text-center sm:text-left">
                          {formSelected.sex ? formSelected.sex : "---"}
                        </span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium text-center sm:text-left">
                          Estado Civil
                        </span>

                        <span className="text-base text-foreground text-center sm:text-left">
                          {formSelected.maritalStatus ? formSelected.maritalStatus : "---"}
                        </span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium text-center sm:text-left">
                          Data de Nascimento
                        </span>

                        <span className="text-base text-foreground text-center sm:text-left">
                          {formSelected.birthDate ? format(formSelected.birthDate, "dd/MM/yyyy") : "--/--/----"}
                        </span>
                      </div>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium text-center sm:text-left">
                          Cidade de Nascença
                        </span>

                        <span className="text-base text-foreground text-center sm:text-left">
                          {formSelected.birthCity ? formSelected.birthCity : "---"}
                        </span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium text-center sm:text-left">
                          Estado de Nascença
                        </span>

                        <span className="text-base text-foreground text-center sm:text-left">
                          {formSelected.birthState ? formSelected.birthState : "---"}
                        </span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium text-center sm:text-left">
                          País de Nascença
                        </span>

                        <span className="text-base text-foreground text-center sm:text-left">
                          {formSelected.birthCountry ? formSelected.birthCountry : "---"}
                        </span>
                      </div>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium text-center sm:text-left">
                          País de Origem (Nacionalidade)
                        </span>

                        <span className="text-base text-foreground text-center sm:text-left">
                          {formSelected.originCountry ? formSelected.originCountry : "---"}
                        </span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium text-center sm:text-left">
                          Número do passaporte em caso de outra nacionalidade
                        </span>

                        <span className="text-base text-foreground text-center sm:text-left">
                          {formSelected.otherNationalityPassport && formSelected.otherNationalityPassport.length > 0
                            ? formSelected.otherNationalityPassport
                            : "Não possui"}
                        </span>
                      </div>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium text-center sm:text-left">
                          Residente de um país diferente de sua nacionalidade
                        </span>

                        <span className="text-base text-foreground text-center sm:text-left">
                          {formSelected.otherCountryResidentConfirmation ? "Sim" : "Não"}
                        </span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium text-center sm:text-left">
                          U.S. Social Security Number
                        </span>

                        <span className="text-base text-foreground text-center sm:text-left">
                          {formSelected.USSocialSecurityNumber ? formSelected.USSocialSecurityNumber : "Não possui"}
                        </span>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="text-base text-foreground font-medium text-center sm:text-left">
                          U.S. Taxpayer ID Number
                        </span>

                        <span className="text-base text-foreground text-center sm:text-left">
                          {formSelected.USTaxpayerIDNumber ? formSelected.USTaxpayerIDNumber : "Não possui"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <Loader2 className="animate-spin" />
              </div>
            )} */}
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
