import {
  AmericanLicense,
  Course,
  FamilyLivingInTheUSADetails,
  OtherPeopleTraveling,
  PreviousJobs,
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
  americanLicense: AmericanLicense[];
  setAmericanLicense: (value: AmericanLicense[]) => void;
  americanLicenseIndex: number;
  setAmericanLicenseIndex: (index: number) => void;
  americanLicenseError: string;
  setAmericanLicenseError: (error: string) => void;
  noVisaNumber: CheckedState;
  setNoVisaNumber: (value: CheckedState) => void;
  familyLivingInTheUSA: FamilyLivingInTheUSADetails[];
  setFamilyLivingInTheUSA: (value: FamilyLivingInTheUSADetails[]) => void;
  familyLivingInTheUSAIndex: number;
  setFamilyLivingInTheUSAIndex: (index: number) => void;
  familyLivingInTheUSAError: string;
  setFamilyLivingInTheUSAError: (error: string) => void;
  previousJobs: PreviousJobs[];
  setPreviousJobs: (value: PreviousJobs[]) => void;
  previousJobsIndex: number;
  setPreviousJobsIndex: (index: number) => void;
  previousJobsError: string;
  setPreviousJobsError: (error: string) => void;
  courses: Course[];
  setCourses: (value: Course[]) => void;
  coursesIndex: number;
  setCoursesIndex: (index: number) => void;
  coursesError: string;
  setCoursesError: (error: string) => void;
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
      name: "",
      relation: "",
      id: "",
      formId: "",
    },
  ],
  setOtherPeopleTraveling: (value) => set({ otherPeopleTraveling: value }),
  otherPeopleTravelingIndex: 1,
  setOtherPeopleTravelingIndex: (index) => set({ otherPeopleTravelingIndex: index }),
  otherPeopleTravelingError: "",
  setOtherPeopleTravelingError: (error) => set({ otherPeopleTravelingError: error }),
  USALastTravel: [
    {
      arriveDate: new Date(),
      estimatedTime: "",
      formId: "",
      id: "",
    },
  ],
  setUSALastTravel: (value) => set({ USALastTravel: value }),
  USALastTravelIndex: 1,
  setUSALastTravelIndex: (index) => set({ USALastTravelIndex: index }),
  USALastTravelError: "",
  setUSALastTravelError: (error) => set({ USALastTravelError: error }),
  americanLicense: [
    {
      id: "",
      formId: "",
      licenseNumber: "",
      state: "",
    },
  ],
  setAmericanLicense: (value) => set({ americanLicense: value }),
  americanLicenseIndex: 1,
  setAmericanLicenseIndex: (index) => set({ americanLicenseIndex: index }),
  americanLicenseError: "",
  setAmericanLicenseError: (error) => set({ americanLicenseError: error }),
  noVisaNumber: false,
  setNoVisaNumber: (value) => set({ noVisaNumber: value }),
  familyLivingInTheUSA: [
    {
      id: "",
      formId: "",
      name: "",
      relation: "",
      situation: "",
    },
  ],
  setFamilyLivingInTheUSA: (value) => set({ familyLivingInTheUSA: value }),
  familyLivingInTheUSAIndex: 1,
  setFamilyLivingInTheUSAIndex: (index) => set({ familyLivingInTheUSAIndex: index }),
  familyLivingInTheUSAError: "",
  setFamilyLivingInTheUSAError: (error) => set({ familyLivingInTheUSAError: error }),
  previousJobs: [
    {
      id: "",
      formId: "",
      admissionDate: new Date(),
      companyAddress: "",
      companyCep: "",
      companyCity: "",
      companyCountry: "",
      companyName: "",
      companyState: "",
      companyTel: "",
      jobDescription: "",
      office: "",
      resignationDate: new Date(),
      supervisorName: "",
    },
  ],
  setPreviousJobs: (value) => set({ previousJobs: value }),
  previousJobsIndex: 1,
  setPreviousJobsIndex: (index) => set({ previousJobsIndex: index }),
  previousJobsError: "",
  setPreviousJobsError: (error) => set({ previousJobsError: error }),
  courses: [
    {
      id: "",
      formId: "",
      address: "",
      cep: "",
      city: "",
      country: "",
      courseName: "",
      finishDate: new Date(),
      initialDate: new Date(),
      institutionName: "",
      state: "",
    },
  ],
  setCourses: (value) => set({ courses: value }),
  coursesIndex: 1,
  setCoursesIndex: (index) => set({ coursesIndex: index }),
  coursesError: "",
  setCoursesError: (error) => set({ coursesError: error }),
  personalDataComplete: false,
  setPersonalDataComplete: (value) => set({ personalDataComplete: value }),
  personalDataError: false,
  setPersonalDataError: (value) => set({ personalDataError: value }),
  contactAndAddressComplete: false,
  setContactAndAddressComplete: (value) => set({ contactAndAddressComplete: value }),
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
}));

export default useFormStore;
