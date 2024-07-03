import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prisma";
import { FullForm } from "@/types";
import {
  AmericanLicense,
  Course,
  FamilyLivingInTheUSADetails,
  OtherPeopleTraveling,
  PreviousJobs,
  USALastTravel,
} from "@prisma/client";

export async function POST(req: Request) {
  let newForm: FullForm | null = null;
  let newOtherPeopleTraveling: OtherPeopleTraveling | null = null;
  let newUSALastTravel: USALastTravel | null = null;
  let newAmericanLicense: AmericanLicense | null = null;
  let newFamilyLivingInTheUSA: FamilyLivingInTheUSADetails | null = null;
  let newPreviousJobs: PreviousJobs | null = null;
  let newCourses: Course | null = null;

  async function handleOtherPeopleTraveling(form: FullForm) {
    return await prisma.otherPeopleTraveling.create({
      data: {
        name: "",
        relation: "",
        form: {
          connect: {
            id: form.id,
          },
        },
      },
    });
  }

  async function handleUSALastTravel(form: FullForm) {
    return await prisma.uSALastTravel.create({
      data: {
        arriveDate: null,
        estimatedTime: "",
        form: {
          connect: {
            id: form.id,
          },
        },
      },
    });
  }

  async function handleAmericanLicense(form: FullForm) {
    return await prisma.americanLicense.create({
      data: {
        licenseNumber: "",
        state: "",
        form: {
          connect: {
            id: form.id,
          },
        },
      },
    });
  }

  async function handleFamilyLivingInTheUSA(form: FullForm) {
    return await prisma.familyLivingInTheUSADetails.create({
      data: {
        name: "",
        relation: "",
        situation: "",
        form: {
          connect: {
            id: form.id,
          },
        },
      },
    });
  }

  async function handlePreviousJobs(form: FullForm) {
    return await prisma.previousJobs.create({
      data: {
        admissionDate: null,
        companyAddress: "",
        companyCep: "",
        companyCity: "",
        companyCountry: "",
        companyName: "",
        companyState: "",
        companyTel: "",
        jobDescription: "",
        resignationDate: null,
        supervisorName: "",
        office: "",
        form: {
          connect: {
            id: form.id,
          },
        },
      },
    });
  }

  async function handleCourses(form: FullForm) {
    return await prisma.course.create({
      data: {
        address: "",
        cep: "",
        city: "",
        country: "",
        courseName: "",
        finishDate: null,
        initialDate: null,
        institutionName: "",
        state: "",
        form: {
          connect: {
            id: form.id,
          },
        },
      },
    });
  }

  try {
    const { isSameAddress, isSameTravelDate }: { isSameAddress: boolean; isSameTravelDate: boolean } = await req.json();
    let newForm: FullForm | null;

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Usuário não autorizado", { status: 401 });
    }

    const actualForms = await prisma.form.findMany({
      where: {
        userId: currentUser.id,
      },
      orderBy: {
        order: "desc",
      },
    });

    if (actualForms.length === 0) {
      return new Response("Nenhum formulário foi encontrado", { status: 404 });
    }

    const actualOrder = actualForms[0].order + 1;

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
        order: actualOrder,
        user: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        otherPeopleTraveling: true,
        USALastTravel: true,
        americanLicense: true,
        familyLivingInTheUSA: true,
        previousJobs: true,
        courses: true,
      },
    });

    newForm = await prisma.form.update({
      where: {
        id: newForm!.id,
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
      include: {
        otherPeopleTraveling: true,
        USALastTravel: true,
        americanLicense: true,
        familyLivingInTheUSA: true,
        previousJobs: true,
        courses: true,
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
      include: {
        otherPeopleTraveling: true,
        USALastTravel: true,
        americanLicense: true,
        familyLivingInTheUSA: true,
        previousJobs: true,
        courses: true,
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
      include: {
        otherPeopleTraveling: true,
        USALastTravel: true,
        americanLicense: true,
        familyLivingInTheUSA: true,
        previousJobs: true,
        courses: true,
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
      include: {
        otherPeopleTraveling: true,
        USALastTravel: true,
        americanLicense: true,
        familyLivingInTheUSA: true,
        previousJobs: true,
        courses: true,
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
      include: {
        otherPeopleTraveling: true,
        USALastTravel: true,
        americanLicense: true,
        familyLivingInTheUSA: true,
        previousJobs: true,
        courses: true,
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
      include: {
        otherPeopleTraveling: true,
        USALastTravel: true,
        americanLicense: true,
        familyLivingInTheUSA: true,
        previousJobs: true,
        courses: true,
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
      include: {
        otherPeopleTraveling: true,
        USALastTravel: true,
        americanLicense: true,
        familyLivingInTheUSA: true,
        previousJobs: true,
        courses: true,
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
      include: {
        otherPeopleTraveling: true,
        USALastTravel: true,
        americanLicense: true,
        familyLivingInTheUSA: true,
        previousJobs: true,
        courses: true,
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
        USALastTravel: true,
        americanLicense: true,
        familyLivingInTheUSA: true,
        previousJobs: true,
        courses: true,
      },
    });

    if (isSameAddress || isSameTravelDate) {
      const primaryForm = await prisma.form.findFirst({
        where: {
          userId: currentUser.id,
          order: 0,
        },
      });

      if (!primaryForm) {
        return new Response("Formulário principal não localizado", {
          status: 404,
        });
      }

      if (isSameAddress) {
        newForm = await prisma.form.update({
          where: {
            id: newForm.id,
          },
          data: {
            address: primaryForm.address,
            city: primaryForm.city,
            state: primaryForm.state,
            cep: primaryForm.cep,
            country: primaryForm.country,
            postalAddressConfirmation: primaryForm.postalAddressConfirmation,
            otherPostalAddress: primaryForm.otherPostalAddress,
          },
          include: {
            otherPeopleTraveling: true,
            USALastTravel: true,
            americanLicense: true,
            familyLivingInTheUSA: true,
            previousJobs: true,
            courses: true,
          },
        });
      }

      if (isSameTravelDate) {
        newForm = await prisma.form.update({
          where: {
            id: newForm.id,
          },
          data: {
            travelItineraryConfirmation: primaryForm.travelItineraryConfirmation,
            USAPreviewArriveDate: primaryForm.USAPreviewArriveDate,
            arriveFlyNumber: primaryForm.arriveFlyNumber,
            arriveCity: primaryForm.arriveCity,
            USAPreviewReturnDate: primaryForm.USAPreviewReturnDate,
            returnFlyNumber: primaryForm.returnFlyNumber,
            returnCity: primaryForm.returnCity,
            estimatedTimeOnUSA: primaryForm.estimatedTimeOnUSA,
            visitLocations: primaryForm.visitLocations,
            USACompleteAddress: primaryForm.USACompleteAddress,
            USAZipCode: primaryForm.USAZipCode,
            USACity: primaryForm.USACity,
            USAState: primaryForm.USAState,
            payerNameOrCompany: primaryForm.payerNameOrCompany,
            payerTel: primaryForm.payerTel,
            payerAddress: primaryForm.payerAddress,
            payerRelation: primaryForm.payerRelation,
            payerEmail: primaryForm.payerEmail,
          },
          include: {
            otherPeopleTraveling: true,
            USALastTravel: true,
            americanLicense: true,
            familyLivingInTheUSA: true,
            previousJobs: true,
            courses: true,
          },
        });
      }
    }

    if (newForm?.otherPeopleTraveling.length === 0) {
      newOtherPeopleTraveling = await handleOtherPeopleTraveling(newForm);
    }

    if (newForm?.USALastTravel.length === 0) {
      newUSALastTravel = await handleUSALastTravel(newForm);
    }

    if (newForm?.americanLicense.length === 0) {
      newAmericanLicense = await handleAmericanLicense(newForm);
    }

    if (newForm?.familyLivingInTheUSA.length === 0) {
      newFamilyLivingInTheUSA = await handleFamilyLivingInTheUSA(newForm);
    }

    if (newForm?.previousJobs.length === 0) {
      newPreviousJobs = await handlePreviousJobs(newForm);
    }

    if (newForm?.courses.length === 0) {
      newCourses = await handleCourses(newForm);
    }

    return Response.json(
      {
        formId: newForm.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[ERROR_ON_ADDITIONAL_FORM_CREATE]", error);

    return new Response("Ocorreu um erro ao gerar um novo formulário", {
      status: 500,
    });
  }
}
