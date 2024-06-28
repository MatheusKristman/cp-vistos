import {
  AmericanLicense,
  Course,
  FamilyLivingInTheUSADetails,
  OtherPeopleTraveling,
  PreviousJobs,
  USALastTravel,
} from "@prisma/client";
import { User } from "next-auth";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      firstName,
      lastName,
      cpf,
      warNameConfirmation,
      warName,
      otherNamesConfirmation,
      otherNames,
      sex,
      maritalStatus,
      birthDate,
      birthCity,
      birthState,
      birthCountry,
      originCountry,
      otherNationalityConfirmation,
      otherNationalityPassport,
      otherCountryResidentConfirmation,
      USSocialSecurityNumber,
      USTaxpayerIDNumber,
      address,
      city,
      state,
      cep,
      country,
      postalAddressConfirmation,
      otherPostalAddress,
      cel,
      tel,
      fiveYearsOtherTelConfirmation,
      otherTel,
      email,
      fiveYearsOtherEmailConfirmation,
      otherEmail,
      facebook,
      linkedin,
      instagram,
      othersSocialMedia,
      passportNumber,
      passportCity,
      passportState,
      passportIssuingCountry,
      passportIssuingDate,
      passportExpireDate,
      passportNoExpireDate,
      passportLostConfirmation,
      lostPassportNumber,
      lostPassportCountry,
      lostPassportDetails,
      travelItineraryConfirmation,
      USAPreviewArriveDate,
      arriveFlyNumber,
      arriveCity,
      USAPreviewReturnDate,
      returnFlyNumber,
      returnCity,
      estimatedTimeOnUSA,
      visitLocations,
      USACompleteAddress,
      USAZipCode,
      USACity,
      USAState,
      payerNameOrCompany,
      myselfValue,
      payerTel,
      payerAddress,
      payerRelation,
      payerEmail,
      otherPeopleTravelingConfirmation,
      otherPeopleTraveling,
      groupMemberConfirmation,
      groupName,
      hasBeenOnUSAConfirmation,
      USALastTravel: usaLastTravel,
      americanLicenseToDriveConfirmation,
      americanLicense,
      USAVisaConfirmation,
      visaIssuingDate,
      visaNumber,
      noVisaNumber,
      newVisaConfirmation,
      sameCountryResidenceConfirmation,
      sameVisaTypeConfirmation,
      fingerprintsProvidedConfirmation,
      lostVisaConfirmation,
      lostVisaDetails,
      canceledVisaConfirmation,
      canceledVisaDetails,
      deniedVisaConfirmation,
      deniedVisaDetails,
      consularPost,
      deniedVisaType,
      immigrationRequestByAnotherPersonConfirmation,
      immigrationRequestByAnotherPersonDetails,
      organizationOrUSAResidentName,
      organizationOrUSAResidentRelation,
      organizationOrUSAResidentAddress,
      organizationOrUSAResidentZipCode,
      organizationOrUSAResidentCity,
      organizationOrUSAResidentState,
      organizationOrUSAResidentCountry,
      organizationOrUSAResidentTel,
      organizationOrUSAResidentEmail,
      fatherCompleteName,
      fatherBirthdate,
      fatherLiveInTheUSAConfirmation,
      fatherUSASituation,
      motherCompleteName,
      motherBirthdate,
      motherLiveInTheUSAConfirmation,
      motherUSASituation,
      familyLivingInTheUSAConfirmation,
      familyLivingInTheUSA,
      partnerCompleteName,
      partnerBirthdate,
      partnerNationality,
      partnerCity,
      partnerState,
      partnerCountry,
      unionDate,
      divorceDate,
      occupation,
      office,
      companyOrBossName,
      companyAddress,
      companyCity,
      companyState,
      companyCountry,
      companyCep,
      companyTel,
      admissionDate,
      monthlySalary,
      retireeDate,
      jobDetails,
      previousJobConfirmation,
      previousJobs,
      courses,
      contagiousDiseaseConfirmation,
      phisicalMentalProblemConfirmation,
      crimeConfirmation,
      drugsProblemConfirmation,
      lawViolateConfirmation,
      prostitutionConfirmation,
      moneyLaundryConfirmation,
      peopleTrafficConfirmation,
      helpPeopleTrafficConfirmation,
      parentPeopleTrafficConfirmation,
      spyConfirmation,
      terrorismConfirmation,
      financialAssistanceConfirmation,
      terrorismMemberConfirmation,
      parentTerrorismConfirmation,
      genocideConfirmation,
      tortureConfirmation,
      assassinConfirmation,
      childSoldierConfirmation,
      religionLibertyConfirmation,
      abortConfirmation,
      coerciveTransplantConfirmation,
      visaFraudConfirmation,
      deportedConfirmation,
      childCustodyConfirmation,
      lawViolationConfirmation,
      avoidTaxConfirmation,
    } = await req.json();
    const currentUser = await getCurrentUser();

    console.log({
      firstName,
      lastName,
      cpf,
      warNameConfirmation,
      warName,
      otherNamesConfirmation,
      otherNames,
      sex,
      maritalStatus,
      birthDate,
      birthCity,
      birthState,
      birthCountry,
      originCountry,
      otherNationalityConfirmation,
      otherNationalityPassport,
      otherCountryResidentConfirmation,
      USSocialSecurityNumber,
      USTaxpayerIDNumber,
      address,
      city,
      state,
      cep,
      country,
      postalAddressConfirmation,
      otherPostalAddress,
      cel,
      tel,
      fiveYearsOtherTelConfirmation,
      otherTel,
      email,
      fiveYearsOtherEmailConfirmation,
      otherEmail,
      facebook,
      linkedin,
      instagram,
      othersSocialMedia,
      passportNumber,
      passportCity,
      passportState,
      passportIssuingCountry,
      passportIssuingDate,
      passportExpireDate,
      passportNoExpireDate,
      passportLostConfirmation,
      lostPassportNumber,
      lostPassportCountry,
      lostPassportDetails,
      travelItineraryConfirmation,
      USAPreviewArriveDate,
      arriveFlyNumber,
      arriveCity,
      USAPreviewReturnDate,
      returnFlyNumber,
      returnCity,
      estimatedTimeOnUSA,
      visitLocations,
      USACompleteAddress,
      USAZipCode,
      USACity,
      USAState,
      payerNameOrCompany,
      myselfValue,
      payerTel,
      payerAddress,
      payerRelation,
      payerEmail,
      otherPeopleTravelingConfirmation,
      otherPeopleTraveling,
      groupMemberConfirmation,
      groupName,
      hasBeenOnUSAConfirmation,
      usaLastTravel,
      americanLicenseToDriveConfirmation,
      americanLicense,
      USAVisaConfirmation,
      visaIssuingDate,
      visaNumber,
      noVisaNumber,
      newVisaConfirmation,
      sameCountryResidenceConfirmation,
      sameVisaTypeConfirmation,
      fingerprintsProvidedConfirmation,
      lostVisaConfirmation,
      lostVisaDetails,
      canceledVisaConfirmation,
      canceledVisaDetails,
      deniedVisaConfirmation,
      deniedVisaDetails,
      consularPost,
      deniedVisaType,
      immigrationRequestByAnotherPersonConfirmation,
      immigrationRequestByAnotherPersonDetails,
      organizationOrUSAResidentName,
      organizationOrUSAResidentRelation,
      organizationOrUSAResidentAddress,
      organizationOrUSAResidentZipCode,
      organizationOrUSAResidentCity,
      organizationOrUSAResidentState,
      organizationOrUSAResidentCountry,
      organizationOrUSAResidentTel,
      organizationOrUSAResidentEmail,
      fatherCompleteName,
      fatherBirthdate,
      fatherLiveInTheUSAConfirmation,
      fatherUSASituation,
      motherCompleteName,
      motherBirthdate,
      motherLiveInTheUSAConfirmation,
      motherUSASituation,
      familyLivingInTheUSAConfirmation,
      familyLivingInTheUSA,
      partnerCompleteName,
      partnerBirthdate,
      partnerNationality,
      partnerCity,
      partnerState,
      partnerCountry,
      unionDate,
      divorceDate,
      occupation,
      office,
      companyOrBossName,
      companyAddress,
      companyCity,
      companyState,
      companyCountry,
      companyCep,
      companyTel,
      admissionDate,
      monthlySalary,
      retireeDate,
      jobDetails,
      previousJobConfirmation,
      previousJobs,
      courses,
      contagiousDiseaseConfirmation,
      phisicalMentalProblemConfirmation,
      crimeConfirmation,
      drugsProblemConfirmation,
      lawViolateConfirmation,
      prostitutionConfirmation,
      moneyLaundryConfirmation,
      peopleTrafficConfirmation,
      helpPeopleTrafficConfirmation,
      parentPeopleTrafficConfirmation,
      spyConfirmation,
      terrorismConfirmation,
      financialAssistanceConfirmation,
      terrorismMemberConfirmation,
      parentTerrorismConfirmation,
      genocideConfirmation,
      tortureConfirmation,
      assassinConfirmation,
      childSoldierConfirmation,
      religionLibertyConfirmation,
      abortConfirmation,
      coerciveTransplantConfirmation,
      visaFraudConfirmation,
      deportedConfirmation,
      childCustodyConfirmation,
      lawViolationConfirmation,
      avoidTaxConfirmation,
    });

    if (!currentUser) {
      return new Response("Usuário não autorizado", { status: 404 });
    }

    if (
      !firstName ||
      !lastName ||
      !cpf ||
      !sex ||
      !maritalStatus ||
      !birthDate ||
      !birthCity ||
      !birthState ||
      !birthCountry ||
      !originCountry ||
      !address ||
      !city ||
      !state ||
      !cep ||
      !country ||
      !postalAddressConfirmation ||
      !cel ||
      !tel ||
      !email ||
      !passportNumber ||
      !passportCity ||
      !passportState ||
      !passportIssuingCountry ||
      !passportIssuingDate ||
      !passportLostConfirmation ||
      !travelItineraryConfirmation ||
      !payerNameOrCompany ||
      !payerTel ||
      !payerAddress ||
      !payerRelation ||
      !payerEmail ||
      !otherPeopleTravelingConfirmation ||
      !groupMemberConfirmation ||
      !hasBeenOnUSAConfirmation ||
      !americanLicenseToDriveConfirmation ||
      !USAVisaConfirmation ||
      !newVisaConfirmation ||
      !sameCountryResidenceConfirmation ||
      !sameVisaTypeConfirmation ||
      !fingerprintsProvidedConfirmation ||
      !lostVisaConfirmation ||
      !canceledVisaConfirmation ||
      !deniedVisaConfirmation ||
      !immigrationRequestByAnotherPersonConfirmation ||
      !fatherCompleteName ||
      !fatherBirthdate ||
      !fatherLiveInTheUSAConfirmation ||
      !motherCompleteName ||
      !motherBirthdate ||
      !motherLiveInTheUSAConfirmation ||
      !familyLivingInTheUSAConfirmation ||
      !occupation ||
      !previousJobConfirmation ||
      !contagiousDiseaseConfirmation ||
      !phisicalMentalProblemConfirmation ||
      !crimeConfirmation ||
      !drugsProblemConfirmation ||
      !lawViolateConfirmation ||
      !prostitutionConfirmation ||
      !moneyLaundryConfirmation ||
      !peopleTrafficConfirmation ||
      !helpPeopleTrafficConfirmation ||
      !parentPeopleTrafficConfirmation ||
      !spyConfirmation ||
      !terrorismConfirmation ||
      !financialAssistanceConfirmation ||
      !terrorismMemberConfirmation ||
      !parentTerrorismConfirmation ||
      !genocideConfirmation ||
      !tortureConfirmation ||
      !assassinConfirmation ||
      !childSoldierConfirmation ||
      !religionLibertyConfirmation ||
      !abortConfirmation ||
      !coerciveTransplantConfirmation ||
      !visaFraudConfirmation ||
      !deportedConfirmation ||
      !childCustodyConfirmation ||
      !lawViolationConfirmation ||
      !avoidTaxConfirmation
    ) {
      return new Response("Dados inválidos, verifique e tente novamente", {
        status: 401,
      });
    }

    const formExists = await prisma.form.findFirst({
      where: {
        userId: currentUser.id,
      },
    });

    if (formExists) {
      await prisma.form.update({
        where: {
          id: formExists.id,
        },
        data: {
          firstName,
          lastName,
          cpf,
          warNameConfirmation: warNameConfirmation === "Sim",
          warName,
          otherNamesConfirmation: otherNamesConfirmation === "Sim",
          otherNames,
          sex,
          maritalStatus,
          birthDate,
          birthCity,
          birthState,
          birthCountry,
          originCountry,
          otherNationalityConfirmation: otherNationalityConfirmation === "Sim",
          otherNationalityPassport,
          otherCountryResidentConfirmation: otherCountryResidentConfirmation === "Sim",
          USSocialSecurityNumber,
          USTaxpayerIDNumber,
        },
      });

      await prisma.form.update({
        where: {
          id: formExists.id,
        },
        data: {
          address,
          city,
          state,
          cep,
          country,
          postalAddressConfirmation: postalAddressConfirmation === "Sim",
          otherPostalAddress,
          cel,
          tel,
          fiveYearsOtherTelConfirmation: fiveYearsOtherTelConfirmation === "Sim",
          otherTel,
          email,
          fiveYearsOtherEmailConfirmation: fiveYearsOtherEmailConfirmation === "Sim",
          otherEmail,
          facebook,
          linkedin,
          instagram,
          othersSocialMedia,
        },
      });

      await prisma.form.update({
        where: {
          id: formExists.id,
        },
        data: {
          passportNumber,
          passportCity,
          passportState,
          passportIssuingCountry,
          passportIssuingDate,
          passportExpireDate: passportNoExpireDate ? null : passportExpireDate,
          passportLostConfirmation: passportLostConfirmation === "Sim",
          lostPassportNumber,
          lostPassportCountry,
          lostPassportDetails,
        },
      });

      await prisma.form.update({
        where: {
          id: formExists.id,
        },
        data: {
          travelItineraryConfirmation: travelItineraryConfirmation === "Sim",
          USAPreviewArriveDate,
          arriveFlyNumber,
          arriveCity,
          USAPreviewReturnDate,
          returnFlyNumber,
          returnCity,
          estimatedTimeOnUSA,
          visitLocations,
          USACompleteAddress,
          USAZipCode,
          USACity,
          USAState,
          payerNameOrCompany: myselfValue ? "Eu mesmo" : payerNameOrCompany,
          payerTel,
          payerAddress,
          payerRelation,
          payerEmail,
        },
      });

      await prisma.form.update({
        where: {
          id: formExists.id,
        },
        data: {
          otherPeopleTravelingConfirmation: otherPeopleTravelingConfirmation === "Sim",
          groupMemberConfirmation: groupMemberConfirmation === "Sim",
          groupName,
        },
      });

      await Promise.all(
        otherPeopleTraveling.map(async (item: OtherPeopleTraveling) => {
          await prisma.otherPeopleTraveling.update({
            where: {
              id: item.id,
            },
            data: {
              name: item.name,
              relation: item.relation,
            },
          });
        })
      );

      await prisma.form.update({
        where: {
          id: formExists.id,
        },
        data: {
          hasBeenOnUSAConfirmation: hasBeenOnUSAConfirmation === "Sim",
          americanLicenseToDriveConfirmation: americanLicenseToDriveConfirmation === "Sim",
          USAVisaConfirmation: USAVisaConfirmation === "Sim",
          visaIssuingDate,
          visaNumber: noVisaNumber ? "Não tem" : visaNumber,
          newVisaConfirmation: newVisaConfirmation === "Sim",
          sameCountryResidenceConfirmation: sameCountryResidenceConfirmation === "Sim",
          sameVisaTypeConfirmation: sameVisaTypeConfirmation === "Sim",
          fingerprintsProvidedConfirmation: fingerprintsProvidedConfirmation === "Sim",
          lostVisaConfirmation: lostVisaConfirmation === "Sim",
          lostVisaDetails,
          canceledVisaConfirmation: canceledVisaConfirmation === "Sim",
          canceledVisaDetails,
          deniedVisaConfirmation: deniedVisaConfirmation === "Sim",
          deniedVisaDetails,
          consularPost,
          deniedVisaType,
          immigrationRequestByAnotherPersonConfirmation: immigrationRequestByAnotherPersonConfirmation === "Sim",
          immigrationRequestByAnotherPersonDetails,
        },
      });

      await Promise.all(
        usaLastTravel.map(async (item: USALastTravel) => {
          await prisma.USALastTravel.update({
            where: {
              id: item.id,
            },
            data: {
              arriveDate: item.arriveDate,
              estimatedTime: item.estimatedTime,
            },
          });
        })
      );

      await Promise.all(
        americanLicense.map(async (item: AmericanLicense) => {
          await prisma.americanLicense.update({
            where: {
              id: item.id,
            },
            data: {
              licenseNumber: item.licenseNumber,
              state: item.state,
            },
          });
        })
      );

      await prisma.form.update({
        where: {
          id: formExists.id,
        },
        data: {
          organizationOrUSAResidentName,
          organizationOrUSAResidentRelation,
          organizationOrUSAResidentAddress,
          organizationOrUSAResidentZipCode,
          organizationOrUSAResidentCity,
          organizationOrUSAResidentState,
          organizationOrUSAResidentCountry,
          organizationOrUSAResidentTel,
          organizationOrUSAResidentEmail,
        },
      });

      await prisma.form.update({
        where: {
          id: formExists.id,
        },
        data: {
          fatherCompleteName,
          fatherBirthdate,
          fatherLiveInTheUSAConfirmation: fatherLiveInTheUSAConfirmation === "Sim",
          fatherUSASituation,
          motherCompleteName,
          motherBirthdate,
          motherLiveInTheUSAConfirmation: motherLiveInTheUSAConfirmation === "Sim",
          motherUSASituation,
          familyLivingInTheUSAConfirmation: familyLivingInTheUSAConfirmation === "Sim",
          partnerCompleteName,
          partnerBirthdate,
          partnerNationality,
          partnerCity,
          partnerState,
          partnerCountry,
          unionDate,
          divorceDate,
        },
      });

      await Promise.all(
        familyLivingInTheUSA.map(async (item: FamilyLivingInTheUSADetails) => {
          await prisma.familyLivingInTheUSADetails.update({
            where: {
              id: item.id,
            },
            data: {
              name: item.name,
              relation: item.relation,
              situation: item.situation,
            },
          });
        })
      );

      await prisma.form.update({
        where: {
          id: formExists.id,
        },
        data: {
          occupation,
          office,
          companyOrBossName,
          companyAddress,
          companyCity,
          companyState,
          companyCountry,
          companyCep,
          companyTel,
          admissionDate,
          monthlySalary,
          retireeDate,
          jobDetails,
          previousJobConfirmation: previousJobConfirmation === "Sim",
        },
      });

      await Promise.all(
        previousJobs.map(async (item: PreviousJobs) => {
          await prisma.previousJobs.update({
            where: {
              id: item.id,
            },
            data: {
              admissionDate: item.admissionDate,
              companyAddress: item.companyAddress,
              companyCep: item.companyCep,
              companyCity: item.companyCity,
              companyCountry: item.companyCountry,
              companyName: item.companyName,
              companyState: item.companyState,
              companyTel: item.companyTel,
              jobDescription: item.jobDescription,
              office: item.office,
              resignationDate: item.resignationDate,
              supervisorName: item.supervisorName,
            },
          });
        })
      );

      await Promise.all(
        courses.map(async (item: Course) => {
          await prisma.course.update({
            where: {
              id: item.id,
            },
            data: {
              address: item.address,
              city: item.city,
              cep: item.cep,
              country: item.country,
              courseName: item.courseName,
              finishDate: item.finishDate,
              initialDate: item.initialDate,
              institutionName: item.institutionName,
              state: item.state,
            },
          });
        })
      );

      await prisma.form.update({
        where: {
          id: formExists.id,
        },
        data: {
          contagiousDiseaseConfirmation: contagiousDiseaseConfirmation === "Sim",
          phisicalMentalProblemConfirmation: phisicalMentalProblemConfirmation === "Sim",
          crimeConfirmation: crimeConfirmation === "Sim",
          drugsProblemConfirmation: drugsProblemConfirmation === "Sim",
          lawViolateConfirmation: lawViolateConfirmation === "Sim",
          prostitutionConfirmation: prostitutionConfirmation === "Sim",
          moneyLaundryConfirmation: moneyLaundryConfirmation === "Sim",
          peopleTrafficConfirmation: peopleTrafficConfirmation === "Sim",
          helpPeopleTrafficConfirmation: helpPeopleTrafficConfirmation === "Sim",
          parentPeopleTrafficConfirmation: parentPeopleTrafficConfirmation === "Sim",
          spyConfirmation: spyConfirmation === "Sim",
          terrorismConfirmation: terrorismConfirmation === "Sim",
          financialAssistanceConfirmation: financialAssistanceConfirmation === "Sim",
          terrorismMemberConfirmation: terrorismMemberConfirmation === "Sim",
          parentTerrorismConfirmation: parentTerrorismConfirmation === "Sim",
          genocideConfirmation: genocideConfirmation === "Sim",
          tortureConfirmation: tortureConfirmation === "Sim",
          assassinConfirmation: assassinConfirmation === "Sim",
          childSoldierConfirmation: childSoldierConfirmation === "Sim",
          religionLibertyConfirmation: religionLibertyConfirmation === "Sim",
          abortConfirmation: abortConfirmation === "Sim",
          coerciveTransplantConfirmation: coerciveTransplantConfirmation === "Sim",
          visaFraudConfirmation: visaFraudConfirmation === "Sim",
          deportedConfirmation: deportedConfirmation === "Sim",
          childCustodyConfirmation: childCustodyConfirmation === "Sim",
          lawViolationConfirmation: lawViolationConfirmation === "Sim",
          avoidTaxConfirmation: avoidTaxConfirmation === "Sim",
        },
      });
    } else {
      const newForm = await prisma.form.create({
        data: {
          firstName,
          lastName,
          cpf,
          warNameConfirmation: warNameConfirmation === "Sim",
          warName,
          otherNamesConfirmation: otherNamesConfirmation === "Sim",
          otherNames,
          sex,
          maritalStatus,
          birthDate,
          birthCity,
          birthState,
          birthCountry,
          originCountry,
          otherNationalityConfirmation: otherNationalityConfirmation === "Sim",
          otherNationalityPassport,
          otherCountryResidentConfirmation: otherCountryResidentConfirmation === "Sim",
          USSocialSecurityNumber,
          USTaxpayerIDNumber,
          user: {
            connect: {
              id: currentUser.id,
            },
          },
        },
      });

      await prisma.form.update({
        where: {
          id: newForm.id,
        },
        data: {
          address,
          city,
          state,
          cep,
          country,
          postalAddressConfirmation: postalAddressConfirmation === "Sim",
          otherPostalAddress,
          cel,
          tel,
          fiveYearsOtherTelConfirmation: fiveYearsOtherTelConfirmation === "Sim",
          otherTel,
          email,
          fiveYearsOtherEmailConfirmation: fiveYearsOtherEmailConfirmation === "Sim",
          otherEmail,
          facebook,
          linkedin,
          instagram,
          othersSocialMedia,
        },
      });

      await prisma.form.update({
        where: {
          id: newForm.id,
        },
        data: {
          passportNumber,
          passportCity,
          passportState,
          passportIssuingCountry,
          passportIssuingDate,
          passportExpireDate: passportNoExpireDate ? null : passportExpireDate,
          passportLostConfirmation: passportLostConfirmation === "Sim",
          lostPassportNumber,
          lostPassportCountry,
          lostPassportDetails,
        },
      });

      await prisma.form.update({
        where: {
          id: newForm.id,
        },
        data: {
          travelItineraryConfirmation: travelItineraryConfirmation === "Sim",
          USAPreviewArriveDate,
          arriveFlyNumber,
          arriveCity,
          USAPreviewReturnDate,
          returnFlyNumber,
          returnCity,
          estimatedTimeOnUSA,
          visitLocations,
          USACompleteAddress,
          USAZipCode,
          USACity,
          USAState,
          payerNameOrCompany: myselfValue ? "Eu mesmo" : payerNameOrCompany,
          payerTel,
          payerAddress,
          payerRelation,
          payerEmail,
        },
      });

      await prisma.form.update({
        where: {
          id: newForm.id,
        },
        data: {
          otherPeopleTravelingConfirmation: otherPeopleTravelingConfirmation === "Sim",
          groupMemberConfirmation: groupMemberConfirmation === "Sim",
          groupName,
        },
      });

      await Promise.all(
        otherPeopleTraveling.map(async (item: OtherPeopleTraveling) => {
          await prisma.otherPeopleTraveling.update({
            where: {
              id: item.id,
            },
            data: {
              name: item.name,
              relation: item.relation,
            },
          });
        })
      );

      await prisma.form.update({
        where: {
          id: newForm.id,
        },
        data: {
          hasBeenOnUSAConfirmation: hasBeenOnUSAConfirmation === "Sim",
          americanLicenseToDriveConfirmation: americanLicenseToDriveConfirmation === "Sim",
          USAVisaConfirmation: USAVisaConfirmation === "Sim",
          visaIssuingDate,
          visaNumber: noVisaNumber ? "Não tem" : visaNumber,
          newVisaConfirmation: newVisaConfirmation === "Sim",
          sameCountryResidenceConfirmation: sameCountryResidenceConfirmation === "Sim",
          sameVisaTypeConfirmation: sameVisaTypeConfirmation === "Sim",
          fingerprintsProvidedConfirmation: fingerprintsProvidedConfirmation === "Sim",
          lostVisaConfirmation: lostVisaConfirmation === "Sim",
          lostVisaDetails,
          canceledVisaConfirmation: canceledVisaConfirmation === "Sim",
          canceledVisaDetails,
          deniedVisaConfirmation: deniedVisaConfirmation === "Sim",
          deniedVisaDetails,
          consularPost,
          deniedVisaType,
          immigrationRequestByAnotherPersonConfirmation: immigrationRequestByAnotherPersonConfirmation === "Sim",
          immigrationRequestByAnotherPersonDetails,
        },
      });

      await Promise.all(
        usaLastTravel.map(async (item: USALastTravel) => {
          await prisma.USALastTravel.update({
            where: {
              id: item.id,
            },
            data: {
              arriveDate: item.arriveDate,
              estimatedTime: item.estimatedTime,
            },
          });
        })
      );

      await Promise.all(
        americanLicense.map(async (item: AmericanLicense) => {
          await prisma.americanLicense.update({
            where: {
              id: item.id,
            },
            data: {
              licenseNumber: item.licenseNumber,
              state: item.state,
            },
          });
        })
      );

      await prisma.form.update({
        where: {
          id: newForm.id,
        },
        data: {
          organizationOrUSAResidentName,
          organizationOrUSAResidentRelation,
          organizationOrUSAResidentAddress,
          organizationOrUSAResidentZipCode,
          organizationOrUSAResidentCity,
          organizationOrUSAResidentState,
          organizationOrUSAResidentCountry,
          organizationOrUSAResidentTel,
          organizationOrUSAResidentEmail,
        },
      });

      await prisma.form.update({
        where: {
          id: newForm.id,
        },
        data: {
          fatherCompleteName,
          fatherBirthdate,
          fatherLiveInTheUSAConfirmation: fatherLiveInTheUSAConfirmation === "Sim",
          fatherUSASituation,
          motherCompleteName,
          motherBirthdate,
          motherLiveInTheUSAConfirmation: motherLiveInTheUSAConfirmation === "Sim",
          motherUSASituation,
          familyLivingInTheUSAConfirmation: familyLivingInTheUSAConfirmation === "Sim",
          partnerCompleteName,
          partnerBirthdate,
          partnerNationality,
          partnerCity,
          partnerState,
          partnerCountry,
          unionDate,
          divorceDate,
        },
      });

      await Promise.all(
        familyLivingInTheUSA.map(async (item: FamilyLivingInTheUSADetails) => {
          await prisma.familyLivingInTheUSADetails.update({
            where: {
              id: item.id,
            },
            data: {
              name: item.name,
              relation: item.relation,
              situation: item.situation,
            },
          });
        })
      );

      await prisma.form.update({
        where: {
          id: newForm.id,
        },
        data: {
          occupation,
          office,
          companyOrBossName,
          companyAddress,
          companyCity,
          companyState,
          companyCountry,
          companyCep,
          companyTel,
          admissionDate,
          monthlySalary,
          retireeDate,
          jobDetails,
          previousJobConfirmation: previousJobConfirmation === "Sim",
        },
      });

      await Promise.all(
        previousJobs.map(async (item: PreviousJobs) => {
          await prisma.previousJobs.update({
            where: {
              id: item.id,
            },
            data: {
              admissionDate: item.admissionDate,
              companyAddress: item.companyAddress,
              companyCep: item.companyCep,
              companyCity: item.companyCity,
              companyCountry: item.companyCountry,
              companyName: item.companyName,
              companyState: item.companyState,
              companyTel: item.companyTel,
              jobDescription: item.jobDescription,
              office: item.office,
              resignationDate: item.resignationDate,
              supervisorName: item.supervisorName,
            },
          });
        })
      );

      await Promise.all(
        courses.map(async (item: Course) => {
          await prisma.course.update({
            where: {
              id: item.id,
            },
            data: {
              address: item.address,
              city: item.city,
              cep: item.cep,
              country: item.country,
              courseName: item.courseName,
              finishDate: item.finishDate,
              initialDate: item.initialDate,
              institutionName: item.institutionName,
              state: item.state,
            },
          });
        })
      );

      await prisma.form.update({
        where: {
          id: newForm.id,
        },
        data: {
          contagiousDiseaseConfirmation: contagiousDiseaseConfirmation === "Sim",
          phisicalMentalProblemConfirmation: phisicalMentalProblemConfirmation === "Sim",
          crimeConfirmation: crimeConfirmation === "Sim",
          drugsProblemConfirmation: drugsProblemConfirmation === "Sim",
          lawViolateConfirmation: lawViolateConfirmation === "Sim",
          prostitutionConfirmation: prostitutionConfirmation === "Sim",
          moneyLaundryConfirmation: moneyLaundryConfirmation === "Sim",
          peopleTrafficConfirmation: peopleTrafficConfirmation === "Sim",
          helpPeopleTrafficConfirmation: helpPeopleTrafficConfirmation === "Sim",
          parentPeopleTrafficConfirmation: parentPeopleTrafficConfirmation === "Sim",
          spyConfirmation: spyConfirmation === "Sim",
          terrorismConfirmation: terrorismConfirmation === "Sim",
          financialAssistanceConfirmation: financialAssistanceConfirmation === "Sim",
          terrorismMemberConfirmation: terrorismMemberConfirmation === "Sim",
          parentTerrorismConfirmation: parentTerrorismConfirmation === "Sim",
          genocideConfirmation: genocideConfirmation === "Sim",
          tortureConfirmation: tortureConfirmation === "Sim",
          assassinConfirmation: assassinConfirmation === "Sim",
          childSoldierConfirmation: childSoldierConfirmation === "Sim",
          religionLibertyConfirmation: religionLibertyConfirmation === "Sim",
          abortConfirmation: abortConfirmation === "Sim",
          coerciveTransplantConfirmation: coerciveTransplantConfirmation === "Sim",
          visaFraudConfirmation: visaFraudConfirmation === "Sim",
          deportedConfirmation: deportedConfirmation === "Sim",
          childCustodyConfirmation: childCustodyConfirmation === "Sim",
          lawViolationConfirmation: lawViolationConfirmation === "Sim",
          avoidTaxConfirmation: avoidTaxConfirmation === "Sim",
        },
      });
    }

    let userUpdated: User;

    if (!currentUser.primaryFormCreated) {
      userUpdated = await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          primaryFormCreated: true,
        },
      });
    } else {
      userUpdated = currentUser;
    }

    return new Response("Formulário enviado", { status: 200 });
  } catch (error) {
    console.log("[ERROR_ON_SUBMIT_FORM_0]", error);

    return new Response("Ocorreu um erro ao enviar o formulário", {
      status: 500,
    });
  }
}
