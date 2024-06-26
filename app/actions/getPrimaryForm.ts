import prisma from "@/lib/prisma";
import getCurrentUser from "./getCurrentUser";
import { Form, OtherPeopleTraveling } from "@prisma/client";
import { FullForm } from "@/types";

export default async function getPrimaryForm() {
  try {
    const currentUser = await getCurrentUser();

    let newForm: FullForm | null = null;
    let otherPeopleTraveling: OtherPeopleTraveling | null = null;

    if (!currentUser) {
      return null;
    }

    let form = await prisma.form.findFirst({
      where: {
        userId: currentUser.id,
        order: 0,
      },
      include: {
        otherPeopleTraveling: true,
      },
    });

    if (!form) {
      newForm = await prisma.form.create({
        data: {
          firstName: null,
          lastName: null,
          cpf: null,
          warNameConfirmation: false,
          warName: null,
          otherNamesConfirmation: false,
          otherNames: [""],
          sex: null,
          maritalStatus: null,
          birthDate: null,
          birthCity: null,
          birthState: null,
          birthCountry: null,
          originCountry: null,
          otherNationalityConfirmation: null,
          otherNationalityPassport: null,
          otherCountryResidentConfirmation: false,
          USSocialSecurityNumber: null,
          USTaxpayerIDNumber: null,
          user: {
            connect: {
              id: currentUser.id,
            },
          },
        },
      });

      newForm = await prisma.form.update({
        where: {
          id: newForm.id,
        },
        data: {
          address: null,
          city: null,
          state: null,
          cep: null,
          country: null,
          postalAddressConfirmation: false,
          otherPostalAddress: null,
          cel: null,
          tel: null,
          fiveYearsOtherTelConfirmation: false,
          otherTel: null,
          email: null,
          fiveYearsOtherEmailConfirmation: false,
          otherEmail: null,
          facebook: null,
          linkedin: null,
          instagram: null,
          othersSocialMedia: null,
        },
      });

      newForm = await prisma.form.update({
        where: {
          id: newForm.id,
        },
        data: {
          passportNumber: null,
          passportCity: null,
          passportState: null,
          passportIssuingCountry: null,
          passportIssuingDate: null,
          passportExpireDate: null,
          passportLostConfirmation: false,
          lostPassportNumber: null,
          lostPassportCountry: null,
          lostPassportDetails: null,
        },
      });

      newForm = await prisma.form.update({
        where: {
          id: newForm.id,
        },
        data: {
          travelItineraryConfirmation: false,
          USAPreviewArriveDate: null,
          arriveFlyNumber: null,
          arriveCity: null,
          USAPreviewReturnDate: null,
          returnFlyNumber: null,
          returnCity: null,
          estimatedTimeOnUSA: null,
          visitLocations: [""],
          USACompleteAddress: null,
          USAZipCode: null,
          USACity: null,
          USAState: null,
          payerNameOrCompany: null,
          payerTel: null,
          payerAddress: null,
          payerRelation: null,
          payerEmail: null,
        },
      });

      newForm = await prisma.form.update({
        where: {
          id: newForm.id,
        },
        data: {
          otherPeopleTravelingConfirmation: false,
          otherPeopleTraveling: undefined,
          groupMemberConfirmation: false,
          groupName: null,
        },
      });

      newForm = await prisma.form.update({
        where: {
          id: newForm.id,
        },
        data: {
          hasBeenOnUSAConfirmation: false,
          USALastTravel: undefined,
          americanLicenseToDriveConfirmation: false,
          americanLicense: undefined,
          USAVisaConfirmation: false,
          visaIssuingDate: null,
          visaNumber: null,
          newVisaConfirmation: null,
          sameCountryResidenceConfirmation: false,
          sameVisaTypeConfirmation: false,
          fingerprintsProvidedConfirmation: false,
          lostVisaConfirmation: false,
          lostVisaDetails: null,
          canceledVisaConfirmation: false,
          canceledVisaDetails: null,
          deniedVisaConfirmation: false,
          deniedVisaDetails: null,
          consularPost: null,
          deniedVisaType: null,
          immigrationRequestByAnotherPersonConfirmation: false,
          immigrationRequestByAnotherPersonDetails: null,
        },
      });

      newForm = await prisma.form.update({
        where: {
          id: newForm.id,
        },
        data: {
          organizationOrUSAResidentName: null,
          organizationOrUSAResidentRelation: null,
          organizationOrUSAResidentAddress: null,
          organizationOrUSAResidentZipCode: null,
          organizationOrUSAResidentCity: null,
          organizationOrUSAResidentState: null,
          organizationOrUSAResidentCountry: null,
          organizationOrUSAResidentTel: null,
          organizationOrUSAResidentEmail: null,
        },
      });

      newForm = await prisma.form.update({
        where: {
          id: newForm.id,
        },
        data: {
          fatherCompleteName: null,
          fatherBirthdate: null,
          fatherLiveInTheUSAConfirmation: false,
          fatherUSASituation: null,
          motherCompleteName: null,
          motherBirthdate: null,
          motherLiveInTheUSAConfirmation: false,
          motherUSASituation: null,
          familyLivingInTheUSAConfirmation: false,
          familyLivingInTheUSA: undefined,
          partnerCompleteName: null,
          partnerBirthdate: null,
          partnerNationality: null,
          partnerCity: null,
          partnerState: null,
          partnerCountry: null,
          unionDate: null,
          divorceDate: null,
        },
      });

      newForm = await prisma.form.update({
        where: {
          id: newForm.id,
        },
        data: {
          occupation: null,
          office: null,
          companyOrBossName: null,
          companyAddress: null,
          companyCity: null,
          companyState: null,
          companyCountry: null,
          companyCep: null,
          companyTel: null,
          admissionDate: null,
          monthlySalary: null,
          retireeDate: null,
          jobDetails: null,
          previousJobConfirmation: false,
          previousJobs: undefined,
          courses: undefined,
        },
      });

      newForm = await prisma.form.update({
        where: {
          id: newForm.id,
        },
        data: {
          contagiousDiseaseConfirmation: false,
          phisicalMentalProblemConfirmation: false,
          crimeConfirmation: false,
          drugsProblemConfirmation: false,
          lawViolateConfirmation: false,
          prostitutionConfirmation: false,
          moneyLaundryConfirmation: false,
          peopleTrafficConfirmation: false,
          helpPeopleTrafficConfirmation: false,
          parentPeopleTrafficConfirmation: false,
          spyConfirmation: false,
          terrorismConfirmation: false,
          financialAssistanceConfirmation: false,
          terrorismMemberConfirmation: false,
          parentTerrorismConfirmation: false,
          genocideConfirmation: false,
          tortureConfirmation: false,
          assassinConfirmation: false,
          childSoldierConfirmation: false,
          religionLibertyConfirmation: false,
          abortConfirmation: false,
          coerciveTransplantConfirmation: false,
          visaFraudConfirmation: false,
          deportedConfirmation: false,
          childCustodyConfirmation: false,
          lawViolationConfirmation: false,
          avoidTaxConfirmation: false,
        },
        include: {
          otherPeopleTraveling: true,
        },
      });
    }

    //TODO: criar novas instancias dos objetos ao ser novo no formulário ou ao já ter criado um formulário e eles estiverem vazios
    if (newForm) {
      if (newForm?.otherPeopleTraveling === undefined) {
        otherPeopleTraveling = await prisma.otherPeopleTraveling.create({
          data: {
            name: "",
            relation: "",
            form: {
              connect: {
                id: newForm.id,
              },
            },
          },
        });
      }
    }

    return form;
  } catch (error) {
    return null;
  }
}
