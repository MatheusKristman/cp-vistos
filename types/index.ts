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

export type PersonalDataFormType = {
  firstName: string | null;
  lastName: string | null;
  cpf: string | null;
  otherNamesConfirmation: boolean | null;
  otherNames: string[];
  sex: string | null;
  maritalStatus: string | null;
  birthDate: Date | null;
  birthCity: string | null;
  birthState: string | null;
  birthCountry: string | null;
  originCountry: string | null;
  otherNationalityConfirmation: boolean | null;
  otherNationalityPassport: string | null;
  otherNationalityCountry: string | null;
  otherCountryResidentConfirmation: boolean | null;
  otherCountryResident: string | null;
  USSocialSecurityNumber: string | null;
  USTaxpayerIDNumber: string | null;
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
