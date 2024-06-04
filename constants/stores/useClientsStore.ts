import { User } from "@prisma/client";
import { create } from "zustand";

interface IUseClientsStore {
  clients: User[];
  setClients: (clients: User[]) => void;
}

const useClientsStore = create<IUseClientsStore>((set) => ({
  clients: [],
  setClients: (clients) => set({ clients }),
}));

export default useClientsStore;