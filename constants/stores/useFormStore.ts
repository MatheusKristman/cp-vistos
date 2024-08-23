import { create } from "zustand";

interface IUseFormStore {
  isSubmitting: boolean;
  setSubmitting: (value: boolean) => void;
  isSaving: boolean;
  setSaving: (value: boolean) => void;
  personalDataComplete: boolean;
  setPersonalDataComplete: (value: boolean) => void;
  personalDataError: boolean;
  setPersonalDataError: (value: boolean) => void;
  contactAndAddressComplete: boolean;
  setContactAndAddressComplete: (value: boolean) => void;
  contactAndAddressError: boolean;
  setContactAndAddressError: (value: boolean) => void;
  passportComplete: boolean;
  setPassportComplete: (value: boolean) => void;
  passportError: boolean;
  setPassportError: (value: boolean) => void;
  aboutTravelComplete: boolean;
  setAboutTravelComplete: (value: boolean) => void;
  aboutTravelError: boolean;
  setAboutTravelError: (value: boolean) => void;
  travelCompanyComplete: boolean;
  setTravelCompanyComplete: (value: boolean) => void;
  travelCompanyError: boolean;
  setTravelCompanyError: (value: boolean) => void;
  previousTravelComplete: boolean;
  setPreviousTravelComplete: (value: boolean) => void;
  previousTravelError: boolean;
  setPreviousTravelError: (value: boolean) => void;
  USAContactComplete: boolean;
  setUSAContactComplete: (value: boolean) => void;
  USAContactError: boolean;
  setUSAContactError: (value: boolean) => void;
  familyComplete: boolean;
  setFamilyComplete: (value: boolean) => void;
  familyError: boolean;
  setFamilyError: (value: boolean) => void;
  workEducationComplete: boolean;
  setWorkEducationComplete: (value: boolean) => void;
  workEducationError: boolean;
  setWorkEducationError: (value: boolean) => void;
  securityComplete: boolean;
  setSecurityComplete: (value: boolean) => void;
  securityError: boolean;
  setSecurityError: (value: boolean) => void;
  redirectStep: number | null;
  setRedirectStep: (step: number | null) => void;
}

const useFormStore = create<IUseFormStore>((set) => ({
  isSubmitting: false,
  setSubmitting: (value) => set({ isSubmitting: value }),
  isSaving: false,
  setSaving: (value) => set({ isSaving: value }),
  personalDataComplete: false,
  setPersonalDataComplete: (value) => set({ personalDataComplete: value }),
  personalDataError: false,
  setPersonalDataError: (value) => set({ personalDataError: value }),
  contactAndAddressComplete: false,
  setContactAndAddressComplete: (value) =>
    set({ contactAndAddressComplete: value }),
  contactAndAddressError: false,
  setContactAndAddressError: (value) => set({ contactAndAddressError: value }),
  passportComplete: false,
  setPassportComplete: (value) => set({ passportComplete: value }),
  passportError: false,
  setPassportError: (value) => set({ passportError: value }),
  aboutTravelComplete: false,
  setAboutTravelComplete: (value) => set({ aboutTravelComplete: value }),
  aboutTravelError: false,
  setAboutTravelError: (value) => set({ aboutTravelError: value }),
  travelCompanyComplete: false,
  setTravelCompanyComplete: (value) => set({ travelCompanyComplete: value }),
  travelCompanyError: false,
  setTravelCompanyError: (value) => set({ travelCompanyError: value }),
  previousTravelComplete: false,
  setPreviousTravelComplete: (value) => set({ previousTravelComplete: value }),
  previousTravelError: false,
  setPreviousTravelError: (value) => set({ previousTravelError: value }),
  USAContactComplete: false,
  setUSAContactComplete: (value) => set({ USAContactComplete: value }),
  USAContactError: false,
  setUSAContactError: (value) => set({ USAContactError: value }),
  familyComplete: false,
  setFamilyComplete: (value) => set({ familyComplete: value }),
  familyError: false,
  setFamilyError: (value) => set({ familyError: value }),
  workEducationComplete: false,
  setWorkEducationComplete: (value) => set({ workEducationComplete: value }),
  workEducationError: false,
  setWorkEducationError: (value) => set({ workEducationError: value }),
  securityComplete: false,
  setSecurityComplete: (value) => set({ securityComplete: value }),
  securityError: false,
  setSecurityError: (value) => set({ securityError: value }),
  redirectStep: null,
  setRedirectStep: (step) => set({ redirectStep: step }),
}));

export default useFormStore;
