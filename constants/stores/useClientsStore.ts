import { FullForm } from "@/types";
import { User } from "@prisma/client";
import { create } from "zustand";

interface IUseClientsStore {
  clients: User[];
  setClients: (clients: User[]) => void;
  formsSelected: FullForm[] | null;
  setFormsSelected: (form: FullForm[] | null) => void;
  isFormModalOpen: boolean;
  openFormModal: () => void;
  closeFormModal: () => void;
}

const useClientsStore = create<IUseClientsStore>((set) => ({
  clients: [],
  setClients: (clients) => set({ clients }),
  formsSelected: null,
  setFormsSelected: (form) => set({ formsSelected: form }),
  isFormModalOpen: false,
  openFormModal: () => set({ isFormModalOpen: true }),
  closeFormModal: () => set({ isFormModalOpen: false }),
}));

export default useClientsStore;
