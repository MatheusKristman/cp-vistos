"use client";

import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { formatPhoneNumber } from "react-phone-number-input";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModalAnimation, OverlayAnimation } from "@/constants/animations/modal";
import { useSubmitConfirmationStore } from "@/constants/stores/useSubmitConfirmationStore";
import { trpc } from "@/lib/trpc-client";
import { Loader2 } from "lucide-react";

export function SubmitConfirmationModal() {
  const { formValues, closeModal, isModalOpen, setFormValues } = useSubmitConfirmationStore();
  const router = useRouter();

  const { mutate: createAccount, isPending } = trpc.userRouter.createClient.useMutation({
    onSuccess: () => {
      handleClose();
      toast.success("Conta criada com sucesso");
      router.push("/perfil/clientes");
    },
    onError: (error) => {
      console.error(error.data);

      if (error.data && error.data.code === "CONFLICT") {
        toast.error(error.message);
      } else {
        toast.error("Ocorreu um erro ao criar a conta");
      }
    },
  });

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "unset";
    }
  }, [isModalOpen]);

  function handleClose() {
    closeModal();

    setTimeout(() => {
      setFormValues(null);
    }, 300);
  }

  function onSubmit() {
    if (formValues) {
      createAccount(formValues);
    }
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          key="submit-confirmation-modal"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={OverlayAnimation}
          className="w-screen h-screen bg-black/80 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle"
        >
          <motion.div
            key="submit-confirmation-modal"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={ModalAnimation}
            className="w-full max-w-[500px] bg-white p-6 inline-block align-middle overflow-x-hidden text-left"
          >
            <h3 className="text-2xl font-semibold mb-9">Confirme os dados</h3>

            <h4 className="text-xl font-semibold mb-6">Dados da Conta</h4>

            <div className="w-full flex flex-col gap-4 mb-9">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="w-full flex flex-col">
                  <span className="text-xs font-medium opacity-50">Nome</span>

                  <span className="text-base font-medium">{formValues ? formValues!.name : "---"}</span>
                </div>

                <div className="w-full flex flex-col">
                  <span className="text-xs font-medium opacity-50">CPF</span>

                  <span className="text-base font-medium">{formValues ? formValues!.cpf : "---"}</span>
                </div>
              </div>

              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="w-full flex flex-col">
                  <span className="text-xs font-medium opacity-50">Endereço</span>

                  <span className="text-base font-medium">{formValues ? formValues!.address : "---"}</span>
                </div>

                <div className="w-full flex flex-col">
                  <span className="text-xs font-medium opacity-50">Celular</span>

                  <span className="text-base font-medium">
                    {formValues ? formatPhoneNumber(formValues!.cel!) : "---"}
                  </span>
                </div>
              </div>

              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="w-full flex flex-col">
                  <span className="text-xs font-medium opacity-50">Valor</span>

                  <span className="text-base font-medium">{formValues ? formatPrice(formValues!.budget) : "---"}</span>
                </div>

                <div className="w-full flex flex-col">
                  <span className="text-xs font-medium opacity-50">Conta de agendamento</span>

                  <span className="text-base font-medium">{formValues ? formValues!.scheduleAccount : "---"}</span>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-semibold mb-6">Dados dos Perfis</h4>

            <div className="w-full flex flex-col gap-6 mb-9">
              {formValues ? (
                formValues!.profiles.length > 0 ? (
                  formValues!.profiles.map((profile, index) => (
                    <div key={index} className="w-full border border-muted p-4 flex flex-col gap-4">
                      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="w-full flex flex-col">
                          <span className="text-xs font-medium opacity-50">Nome</span>

                          <span className="text-base font-medium">{profile.profileName}</span>
                        </div>

                        <div className="w-full flex flex-col">
                          <span className="text-xs font-medium opacity-50">CPF</span>

                          <span className="text-base font-medium">{profile.profileCpf}</span>
                        </div>

                        <div className="w-full flex flex-col">
                          <span className="text-xs font-medium opacity-50">Data de Nascimento</span>

                          <span className="text-base font-medium">
                            {profile.birthDate ? format(profile.birthDate, "dd/MM/yyyy") : "--/--/----"}
                          </span>
                        </div>
                      </div>

                      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="w-full flex flex-col">
                          <span className="text-xs font-medium opacity-50">Endereço</span>

                          <span className="text-base font-medium">
                            {profile.profileAddress ? profile.profileAddress : "---"}
                          </span>
                        </div>

                        <div className="w-full flex flex-col">
                          <span className="text-xs font-medium opacity-50">Passaporte</span>

                          <span className="text-base font-medium">{profile.passport ? profile.passport : "---"}</span>
                        </div>
                      </div>

                      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="w-full flex flex-col">
                          <span className="text-xs font-medium opacity-50">Classe do Visto</span>

                          <span className="text-base font-medium">{profile.visaClass}</span>
                        </div>

                        <div className="w-full flex flex-col">
                          <span className="text-xs font-medium opacity-50">Tipo de Visto</span>

                          <span className="text-base font-medium">{profile.visaType}</span>
                        </div>
                      </div>

                      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="w-full flex flex-col">
                          <span className="text-xs font-medium opacity-50">Data de Emissão</span>

                          <span className="text-base font-medium">
                            {profile.issuanceDate ? format(profile.issuanceDate, "dd/MM/yyyy") : "--/--/----"}
                          </span>
                        </div>

                        <div className="w-full flex flex-col">
                          <span className="text-xs font-medium opacity-50">Data de Expiração</span>

                          <span className="text-base font-medium">
                            {profile.expireDate ? format(profile.expireDate, "dd/MM/yyyy") : "--/--/----"}
                          </span>
                        </div>
                      </div>

                      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="w-full flex flex-col">
                          <span className="text-xs font-medium opacity-50">Barcode</span>

                          <span className="text-base font-medium">{profile.DSNumber ? profile.DSNumber : "---"}</span>
                        </div>

                        <div className="w-full flex flex-col">
                          <span className="text-xs font-medium opacity-50">CASV</span>

                          <span className="text-base font-medium">
                            {profile.CASVDate ? format(profile.CASVDate, "dd/MM/yyyy") : "--/--/----"}
                          </span>
                        </div>

                        <div className="w-full flex flex-col">
                          <span className="text-xs font-medium opacity-50">Entrevista</span>

                          <span className="text-base font-medium">
                            {profile.interviewDate ? format(profile.interviewDate, "dd/MM/yyyy") : "--/--/----"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="w-full flex items-center">
                    <span className="text-base font-medium text-muted-foreground">Nenhum perfil cadastrado</span>
                  </div>
                )
              ) : (
                <div className="w-full flex items-center">
                  <span className="text-base font-medium text-muted-foreground">Nenhum perfil cadastrado</span>
                </div>
              )}
            </div>

            <div className="w-full flex flex-col justify-center sm:flex-row sm:justify-end gap-6">
              <Button
                onClick={handleClose}
                disabled={isPending}
                variant="outline"
                size="xl"
                className="order-2 sm:order-1"
              >
                Cancelar
              </Button>

              <Button
                onClick={onSubmit}
                disabled={isPending}
                variant="confirm"
                size="xl"
                className="order-1 sm:order-2 flex items-center gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Enviando
                  </>
                ) : (
                  <>Enviar</>
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
