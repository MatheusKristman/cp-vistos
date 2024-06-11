import { Form } from "@prisma/client";
import { User } from "next-auth";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
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
    } = await req.json();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Usuário não autorizado", { status: 404 });
    }

    if (
      !address ||
      !city ||
      !state ||
      !cep ||
      !country ||
      !postalAddressConfirmation ||
      !cel ||
      !tel ||
      !fiveYearsOtherEmailConfirmation ||
      !email ||
      !fiveYearsOtherTelConfirmation
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

    if (!formExists) {
      return new Response(
        "Processo inválido, volto no formulário anterior para prosseguir",
        { status: 401 },
      );
    }

    updatedForm = await prisma.form.update({
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
        fiveYearsOtherEmailConfirmation:
          fiveYearsOtherEmailConfirmation === "Sim",
        otherEmail,
        facebook,
        linkedin,
        instagram,
        othersSocialMedia,
      },
    });

    let userUpdated: User;

    if (!currentUser.formStep.includes(1)) {
      userUpdated = await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          formStep: {
            push: 1,
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
