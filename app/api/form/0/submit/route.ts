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
    } = await req.json();
    const currentUser = await getCurrentUser();

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
      !originCountry
    ) {
      return new Response("Dados inválidos, verifique e tente novamente", {
        status: 401,
      });
    }

    let updatedForm: Form;

    const formExists = await prisma.form.findFirst({
      where: {
        userId: currentUser.id,
      },
    });

    if (formExists) {
      updatedForm = await prisma.form.update({
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
          otherCountryResidentConfirmation:
            otherCountryResidentConfirmation === "Sim",
          USSocialSecurityNumber,
          USTaxpayerIDNumber,
        },
      });
    } else {
      updatedForm = await prisma.form.create({
        data: {
          firstName,
          lastName,
          cpf,
          warNameConfirmation: warNameConfirmation === "Sim",
          warName,
          otherNamesConfirmation: otherNamesConfirmation === "Sim",
          sex,
          maritalStatus,
          birthDate,
          birthCity,
          birthState,
          birthCountry,
          originCountry,
          otherNationalityConfirmation: otherNationalityConfirmation === "Sim",
          otherNationalityPassport,
          otherCountryResidentConfirmation:
            otherCountryResidentConfirmation === "Sim",
          USSocialSecurityNumber,
          USTaxpayerIDNumber,
          user: {
            connect: {
              id: currentUser.id,
            },
          },
        },
      });
    }

    let userUpdated: User;

    if (!currentUser.formStep.includes(0)) {
      userUpdated = await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          formStep: {
            push: 0,
          },
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
