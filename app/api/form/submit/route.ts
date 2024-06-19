import { Form } from "@prisma/client";
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
      USALastTravel,
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
      USALastTravel,
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
          otherPeopleTraveling,
          groupMemberConfirmation: groupMemberConfirmation === "Sim",
          groupName,
        },
      });

      await prisma.form.update({
        where: {
          id: formExists.id,
        },
        data: {
          hasBeenOnUSAConfirmation: hasBeenOnUSAConfirmation === "Sim",
          USALastTravel,
          americanLicenseToDriveConfirmation: americanLicenseToDriveConfirmation === "Sim",
          americanLicense,
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
          familyLivingInTheUSA,
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
          previousJobs,
          courses,
        },
      });

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
          otherPeopleTraveling,
          groupMemberConfirmation: groupMemberConfirmation === "Sim",
          groupName,
        },
      });

      await prisma.form.update({
        where: {
          id: newForm.id,
        },
        data: {
          hasBeenOnUSAConfirmation: hasBeenOnUSAConfirmation === "Sim",
          USALastTravel,
          americanLicenseToDriveConfirmation: americanLicenseToDriveConfirmation === "Sim",
          americanLicense,
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
          familyLivingInTheUSA,
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
          previousJobs,
          courses,
        },
      });

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
