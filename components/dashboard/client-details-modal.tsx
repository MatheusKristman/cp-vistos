"use client";

import { motion, AnimatePresence } from "framer-motion";

import { ModalAnimation, OverlayAnimation } from "@/constants/animations/modal";
import useClientDetailsModalStore from "@/constants/stores/useClientDetailsModalStore";
import { ClientDetailsResume } from "./client-details-resume";
import { ClientDetailsAnnotations } from "./client-details-annotations";
import { ClientDetailsEditAccount } from "./client-details-edit-account";
import { ClientDetailsComments } from "./client-details-comments";
import { ClientDetailsEditProfile } from "./client-details-edit-profile";
import { ClientDetailsForm } from "./client-details-form";
import { ClientDetailsNewProfile } from "./client-details-new-profile";

export function ClientDetailsModal() {
  const {
    closeModal,
    isModalOpen,
    client,
    setClient,
    isResume,
    isAnnotation,
    isEditAccount,
    isComment,
    isEditProfile,
    isForm,
    isNewProfile,
    unsetToAnnotation,
    unsetToEditAccount,
    unsetToResume,
    unsetToComment,
    unsetToEditProfile,
    unsetToForm,
    unsetToNewProfile,
  } = useClientDetailsModalStore();

  if (!client) {
    return <div>Loading...</div>;
  }

  function handleClose() {
    closeModal();

    setTimeout(() => {
      setClient(null);
      unsetToResume();
      unsetToAnnotation();
      unsetToEditAccount();
      unsetToComment();
      unsetToEditProfile();
      unsetToForm();
      unsetToNewProfile();
    }, 300);
  }

  return (
    <AnimatePresence>
      {isModalOpen && client && (
        <motion.div
          key="client-details-modal"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={OverlayAnimation}
          className="w-screen h-screen bg-black/80 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle"
        >
          <motion.div
            key="client-details-modal"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={ModalAnimation}
            className="w-full max-w-[800px] bg-white p-6 inline-block align-middle overflow-x-hidden text-left"
          >
            <AnimatePresence initial={false} mode="wait">
              {isResume && <ClientDetailsResume key="client-resume" handleClose={handleClose} />}
              {isAnnotation && <ClientDetailsAnnotations key="client-annotation" handleClose={handleClose} />}
              {isEditAccount && <ClientDetailsEditAccount key="client-edit-account" handleClose={handleClose} />}
              {isNewProfile && <ClientDetailsNewProfile key="client-new-profile" handleClose={handleClose} />}
              {isComment && <ClientDetailsComments key="client-comments" handleClose={handleClose} />}
              {isEditProfile && <ClientDetailsEditProfile key="client-edit-profile" handleClose={handleClose} />}
              {isForm && <ClientDetailsForm key="client-form" handleClose={handleClose} />}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
