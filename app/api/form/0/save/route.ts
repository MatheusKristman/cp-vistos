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
          user: {
            connect: {
              id: currentUser.id,
            },
          },
        },
      });
    }

    return new Response("Progresso salvo com sucesso", { status: 200 });
  } catch (error) {
    console.log("[ERROR_ON_SAVE_FORM_0]", error);

    return new Response("Ocorreu um erro ao enviar o formulário", {
      status: 500,
    });
  }
}
