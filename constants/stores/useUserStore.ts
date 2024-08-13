import { Role } from "@prisma/client";
import { create } from "zustand";

interface IUseUserStore {
  role: Role | null;
  setRole: (role: Role) => void;
}

const useUserStore = create<IUseUserStore>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
}));

export default useUserStore;
