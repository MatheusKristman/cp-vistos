import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { ChevronLeft, Edit, X } from "lucide-react";

import { FormAnimation, ModalAnimation, OverlayAnimation } from "@/constants/animations/modal";
import { Button } from "@/components/ui/button";
import useClientsStore from "@/constants/stores/useClientsStore";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { EditClientForm } from "./edit-client-form";
import { FormDisplay } from "./form-display";

export function FormModal() {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { isFormModalOpen, closeFormModal, setFormsSelected } = useClientsStore();

  function handleToEdit() {
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setIsEditing(false);
  }

  function handleClose() {
    closeFormModal();

    setTimeout(() => {
      setFormsSelected(null);
    }, 300);
  }

  return (
    <AnimatePresence>
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
            className={cn(
              "w-full max-w-[1000px] max-h-[916px] h-full bg-white p-6 inline-block align-middle overflow-x-hidden",
              {
                "h-fit": isEditing,
              }
            )}
          >
            <AnimatePresence initial={false} mode="wait">
              {isEditing ? (
                <motion.div
                  key="edit-form"
                  className="w-full h-full"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={FormAnimation}
                >
                  <div className="w-full flex justify-between mb-6">
                    <Button onClick={handleCancelEdit} variant="link" size="icon">
                      <ChevronLeft />
                    </Button>

                    <Button onClick={handleClose} variant="link" size="icon">
                      <X />
                    </Button>
                  </div>

                  <EditClientForm />
                </motion.div>
              ) : (
                <motion.div
                  key="form-modal-display"
                  className="w-full h-full"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={FormAnimation}
                >
                  <div className="w-full flex justify-between mb-6">
                    <Button onClick={handleToEdit} variant="outline" className="flex items-center gap-2">
                      Editar <Edit />
                    </Button>

                    <Button onClick={handleClose} variant="link" size="icon">
                      <X />
                    </Button>
                  </div>

                  <FormDisplay handleClose={handleClose} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
