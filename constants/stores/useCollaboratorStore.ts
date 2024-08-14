import { User } from "@prisma/client";
import { create } from "zustand";

interface IUseCollaboratorStore {
  collaborator: User | null;
  setCollaborator: (colab: User | null) => void;
}

const useCollaboratorStore = create<IUseCollaboratorStore>((set) => ({
  collaborator: null,
  setCollaborator: (colab) => set({ collaborator: colab }),
}));

export default useCollaboratorStore;
