import { ProfilesWithUserAndForm } from "@/types";
import { create } from "zustand";

interface IUseClientDetailsModalStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  client: ProfilesWithUserAndForm | null;
  setClient: (client: ProfilesWithUserAndForm | null) => void;
}

const useClientDetailsModalStore = create<IUseClientDetailsModalStore>(
  (set) => ({
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
    client: null,
    setClient: (client) => set({ client }),
  }),
);

export default useClientDetailsModalStore;
