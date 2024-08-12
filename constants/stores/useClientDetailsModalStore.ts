import { ProfilesWithUserAndForm } from "@/types";
import { create } from "zustand";

interface IUseClientDetailsModalStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  client: ProfilesWithUserAndForm | null;
  setClient: (client: ProfilesWithUserAndForm | null) => void;
  isResume: boolean;
  setToResume: () => void;
  unsetToResume: () => void;
  isAnnotation: boolean;
  setToAnnotation: () => void;
  unsetToAnnotation: () => void;
  isEditAccount: boolean;
  setToEditAccount: () => void;
  unsetToEditAccount: () => void;
  isComment: boolean;
  setToComment: () => void;
  unsetToComment: () => void;
  isEditProfile: boolean;
  setToEditProfile: () => void;
  unsetToEditProfile: () => void;
}

const useClientDetailsModalStore = create<IUseClientDetailsModalStore>(
  (set) => ({
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
    client: null,
    setClient: (client) => set({ client }),
    isResume: false,
    setToResume: () => set({ isResume: true }),
    unsetToResume: () => set({ isResume: false }),
    isAnnotation: false,
    setToAnnotation: () => set({ isAnnotation: true }),
    unsetToAnnotation: () => set({ isAnnotation: false }),
    isEditAccount: false,
    setToEditAccount: () => set({ isEditAccount: true }),
    unsetToEditAccount: () => set({ isEditAccount: false }),
    isComment: false,
    setToComment: () => set({ isComment: true }),
    unsetToComment: () => set({ isComment: false }),
    isEditProfile: false,
    setToEditProfile: () => set({ isEditProfile: true }),
    unsetToEditProfile: () => set({ isEditProfile: false }),
  }),
);

export default useClientDetailsModalStore;
