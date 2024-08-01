import { formValue } from "@/app/(dashboard)/perfil/criar-conta/page";
import { create } from "zustand";

interface IUseSubmitConfirmationStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  formValues: formValue | null;
  setFormValues: (values: formValue | null) => void;
}

export const useSubmitConfirmationStore = create<IUseSubmitConfirmationStore>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  isSubmitting: false,
  setIsSubmitting: (value) => set({ isSubmitting: value }),
  formValues: null,
  setFormValues: (values) => set({ formValues: values }),
}));
