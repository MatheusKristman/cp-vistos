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
          address,
          city,
          state,
          cep,
          country,
          postalAddressConfirmation: postalAddressConfirmation === "Sim",
          otherPostalAddress,
          cel,
          tel,
          fiveYearsOtherTelConfirmation:
            fiveYearsOtherTelConfirmation === "Sim",
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
    } else {
      updatedForm = await prisma.form.create({
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
          fiveYearsOtherTelConfirmation:
            fiveYearsOtherTelConfirmation === "Sim",
          otherTel,
          email,
          fiveYearsOtherEmailConfirmation:
            fiveYearsOtherEmailConfirmation === "Sim",
          otherEmail,
          facebook,
          linkedin,
          instagram,
          othersSocialMedia,
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
