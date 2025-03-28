import { Comments, Form, Profile, User } from "@prisma/client";

declare global {
  namespace PrismaJson {
    type otherPeopleTravelingType = {
      name: string;
      relation: string;
    };

    type USALastTravelType = {
      arriveDate: Date | null;
      estimatedTime: string;
    };

    type americanLicenseType = {
      licenseNumber: string;
      state: string;
    };

    type familyLivingInTheUSAType = {
      name: string;
      relation: string;
      situation: string;
    };

    type previousJobsType = {
      companyName: string;
      companyAddress: string;
      companyCity: string;
      companyState: string;
      companyCountry: string;
      companyCep: string;
      companyTel: string;
      office: string;
      supervisorName: string;
      admissionDate: Date | null;
      resignationDate: Date | null;
      jobDescription: string;
    };

    type coursesType = {
      institutionName: string;
      address: string;
      city: string;
      state: string;
      country: string;
      cep: string;
      courseName: string;
      initialDate: Date | null;
      finishDate: Date | null;
    };
  }
}

export type PrimaryFormControl = {
  firstName: string;
  lastName: string;
  cpf: string;
  otherNamesConfirmation: "Sim" | "Não";
  sex: string;
  maritalStatus: string;
  birthDate: Date;
  birthCity: string;
  birthState: string;
  birthCountry: string;
  originCountry: string;
  otherNationalityConfirmation: "Sim" | "Não";
  otherNationalityPassport?: string | undefined;
  otherCountryResidentConfirmation: "Sim" | "Não";
  USSocialSecurityNumber: string;
  USTaxpayerIDNumber: string;
  address: string;
  city: string;
  state: string;
  cep: string;
  country: string;
  postalAddressConfirmation: "Sim" | "Não";
  otherPostalAddress: string;
  cel: string;
  tel: string;
  fiveYearsOtherTelConfirmation: "Sim" | "Não";
  otherTel: string;
  email: string;
  fiveYearsOtherEmailConfirmation: "Sim" | "Não";
  otherEmail?: string | undefined;
  facebook: string;
  linkedin: string;
  instagram: string;
  othersSocialMedia: string;
  passportNumber: string;
  passportCity: string;
  passportState: string;
  passportIssuingCountry: string;
  passportIssuingDate: Date;
  passportExpireDate?: Date | undefined;
  passportNoExpireDate: boolean;
  passportLostConfirmation: "Sim" | "Não";
  lostPassportNumber: string;
  lostPassportCountry: string;
  lostPassportDetails: string;
  travelItineraryConfirmation: "Sim" | "Não";
  USAPreviewArriveDate?: Date | undefined;
  arriveFlyNumber: string;
  arriveCity: string;
  USAPreviewReturnDate?: Date | undefined;
  returnFlyNumber: string;
  returnCity: string;
  estimatedTimeOnUSA: string;
  USACompleteAddress: string;
  USAZipCode: string;
  USACity: string;
  USAState: string;
  payerNameOrCompany: string;
  payerTel: string;
  payerAddress: string;
  payerRelation: string;
  payerEmail: string;
  otherPeopleTravelingConfirmation: "Sim" | "Não";
  groupMemberConfirmation: "Sim" | "Não";
  groupName: string;
  hasBeenOnUSAConfirmation: "Sim" | "Não";
  americanLicenseToDriveConfirmation: "Sim" | "Não";
  USAVisaConfirmation: "Sim" | "Não";
  visaIssuingDate?: Date | undefined;
  visaNumber: string;
  newVisaConfirmation: "Sim" | "Não";
  sameCountryResidenceConfirmation: "Sim" | "Não";
  sameVisaTypeConfirmation: "Sim" | "Não";
  fingerprintsProvidedConfirmation: "Sim" | "Não";
  lostVisaConfirmation: "Sim" | "Não";
  lostVisaDetails: string;
  canceledVisaConfirmation: "Sim" | "Não";
  canceledVisaDetails: string;
  deniedVisaConfirmation: "Sim" | "Não";
  deniedVisaDetails: string;
  consularPost: string;
  deniedVisaType: string;
  immigrationRequestByAnotherPersonConfirmation: "Sim" | "Não";
  immigrationRequestByAnotherPersonDetails: string;
  organizationOrUSAResidentName: string;
  organizationOrUSAResidentRelation: string;
  organizationOrUSAResidentAddress: string;
  organizationOrUSAResidentZipCode: string;
  organizationOrUSAResidentCity: string;
  organizationOrUSAResidentState: string;
  organizationOrUSAResidentTel: string;
  organizationOrUSAResidentEmail: string;
  fatherCompleteName: string;
  fatherBirthdate: Date;
  fatherLiveInTheUSAConfirmation: "Sim" | "Não";
  fatherUSASituation: string;
  motherCompleteName: string;
  motherBirthdate: Date;
  motherLiveInTheUSAConfirmation: "Sim" | "Não";
  motherUSASituation: string;
  familyLivingInTheUSAConfirmation: "Sim" | "Não";
  partnerCompleteName: string;
  partnerBirthdate?: Date | undefined;
  partnerNationality: string;
  partnerCity: string;
  partnerState: string;
  partnerCountry: string;
  unionDate?: Date | undefined;
  divorceDate?: Date | undefined;
  occupation: string;
  office: string;
  companyOrBossName: string;
  companyAddress: string;
  companyCity: string;
  companyState: string;
  companyCountry: string;
  companyCep: string;
  companyTel: string;
  admissionDate?: Date | undefined;
  monthlySalary: string;
  retireeDate?: Date | undefined;
  jobDetails: string;
  previousJobConfirmation: "Sim" | "Não";
  contagiousDiseaseConfirmation: "Sim" | "Não";
  phisicalMentalProblemConfirmation: "Sim" | "Não";
  crimeConfirmation: "Sim" | "Não";
  drugsProblemConfirmation: "Sim" | "Não";
  lawViolateConfirmation: "Sim" | "Não";
  prostitutionConfirmation: "Sim" | "Não";
  moneyLaundryConfirmation: "Sim" | "Não";
  peopleTrafficConfirmation: "Sim" | "Não";
  helpPeopleTrafficConfirmation: "Sim" | "Não";
  parentPeopleTrafficConfirmation: "Sim" | "Não";
  spyConfirmation: "Sim" | "Não";
  terrorismConfirmation: "Sim" | "Não";
  financialAssistanceConfirmation: "Sim" | "Não";
  terrorismMemberConfirmation: "Sim" | "Não";
  parentTerrorismConfirmation: "Sim" | "Não";
  genocideConfirmation: "Sim" | "Não";
  tortureConfirmation: "Sim" | "Não";
  assassinConfirmation: "Sim" | "Não";
  childSoldierConfirmation: "Sim" | "Não";
  religionLibertyConfirmation: "Sim" | "Não";
  abortConfirmation: "Sim" | "Não";
  coerciveTransplantConfirmation: "Sim" | "Não";
  visaFraudConfirmation: "Sim" | "Não";
  deportedConfirmation: "Sim" | "Não";
  childCustodyConfirmation: "Sim" | "Não";
  lawViolationConfirmation: "Sim" | "Não";
  avoidTaxConfirmation: "Sim" | "Não";
};

export type UserWithForm = User & {
  form: Form[];
};

export type ProfilesWithUserAndForm = Profile & {
  user: User & {
    profiles: Profile[];
  };
  form: Form | null;
  comments: Comments[];
};
