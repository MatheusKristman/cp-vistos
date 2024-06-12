import {
  AmericanLicense,
  Form,
  OtherPeopleTraveling,
  USALastTravel,
} from "@prisma/client";
import { CheckedState } from "@radix-ui/react-checkbox";
import { create } from "zustand";

interface IUseFormStore {
  isSubmitting: boolean;
  setSubmitting: (value: boolean) => void;
  isSaving: boolean;
  setSaving: (value: boolean) => void;
  otherNamesIndex: number;
  setOtherNamesIndex: (index: number) => void;
  otherNames: string[];
  setOtherNames: (value: string[]) => void;
  otherNamesError: string;
  setOtherNamesError: (error: string) => void;
  visitLocations: string[];
  setVisitLocations: (value: string[]) => void;
  visitLocationsIndex: number;
  setVisitLocationsIndex: (index: number) => void;
  visitLocationsError: string;
  setVisitLocationsError: (error: string) => void;
  myselfValue: CheckedState;
  setMyselfValue: (value: CheckedState) => void;
  otherPeopleTraveling: OtherPeopleTraveling[];
  setOtherPeopleTraveling: (value: OtherPeopleTraveling[]) => void;
  otherPeopleTravelingIndex: number;
  setOtherPeopleTravelingIndex: (index: number) => void;
  otherPeopleTravelingError: string;
  setOtherPeopleTravelingError: (error: string) => void;
  USALastTravel: USALastTravel[];
  setUSALastTravel: (value: USALastTravel[]) => void;
  USALastTravelIndex: number;
  setUSALastTravelIndex: (index: number) => void;
  USALastTravelError: string;
  setUSALastTravelError: (error: string) => void;
  americanLicense: AmericanLicense;
  setAmericanLicense: (value: AmericanLicense) => void;
  americanLicenseIndex: number;
  setAmericanLicenseIndex: (index: number) => void;
  americanLicenseError: string;
  setAmericanLicenseError: (error: string) => void;
}

const useFormStore = create<IUseFormStore>((set) => ({
  isSubmitting: false,
  setSubmitting: (value) => set({ isSubmitting: value }),
  isSaving: false,
  setSaving: (value) => set({ isSaving: value }),
  otherNamesIndex: 1,
  setOtherNamesIndex: (index) => set({ otherNamesIndex: index }),
  otherNames: [],
  setOtherNames: (value) => set({ otherNames: value }),
  otherNamesError: "",
  setOtherNamesError: (error) => set({ otherNamesError: error }),
  visitLocations: [],
  setVisitLocations: (value) => set({ visitLocations: value }),
  visitLocationsIndex: 1,
  setVisitLocationsIndex: (index) => set({ visitLocationsIndex: index }),
  visitLocationsError: "",
  setVisitLocationsError: (error) => set({ visitLocationsError: error }),
  myselfValue: false,
  setMyselfValue: (value) => set({ myselfValue: value }),
  otherPeopleTraveling: [
    {
      id: "",
      name: "",
      relation: "",
      formId: "",
    },
  ],
  setOtherPeopleTraveling: (value) => set({ otherPeopleTraveling: value }),
  otherPeopleTravelingIndex: 1,
  setOtherPeopleTravelingIndex: (index) =>
    set({ otherPeopleTravelingIndex: index }),
  otherPeopleTravelingError: "",
  setOtherPeopleTravelingError: (error) =>
    set({ otherPeopleTravelingError: error }),
  USALastTravel: [
    {
      id: "",
      arriveDate: null,
      estimatedTime: "",
      formId: "",
    },
  ],
  setUSALastTravel: (value) => set({ USALastTravel: value }),
  USALastTravelIndex: 1,
  setUSALastTravelIndex: (index) => set({ USALastTravelIndex: index }),
  USALastTravelError: "",
  setUSALastTravelError: (error) => set({ USALastTravelError: error }),
  americanLicense: {
    id: "",
    formId: "",
    licenseNumber: "",
    state: "",
  },
  setAmericanLicense: (value) => set({ americanLicense: value }),
  americanLicenseIndex: 1,
  setAmericanLicenseIndex: (index) => set({ americanLicenseIndex: index }),
  americanLicenseError: "",
  setAmericanLicenseError: (error) => set({ americanLicenseError: error }),
}));

export default useFormStore;
