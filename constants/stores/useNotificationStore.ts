import { create } from "zustand";

interface IUseNotificationStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useNotificationStore = create<IUseNotificationStore>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export default useNotificationStore;
