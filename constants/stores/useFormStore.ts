import { Form } from "@prisma/client";
import { create } from "zustand";

interface IUseFormStore {
  form: Form | null;
  setForm: (newForm: Form) => void;
  resetForm: () => void;
}

const useFormStore = create<IUseFormStore>((set) => ({
  form: null,
  setForm: (newForm) => set({ form: newForm }),
  resetForm: () => set({ form: null }),
}));

export default useFormStore;
