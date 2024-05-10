import { create } from "zustand";

interface IUseHeader {
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

const useHeader = create<IUseHeader>((set) => ({
  isMenuOpen: false,
  openMenu: () => set({ isMenuOpen: true }),
  closeMenu: () => set({ isMenuOpen: false }),
}));

export default useHeader;
