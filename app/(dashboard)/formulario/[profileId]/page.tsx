"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import getPrimaryForm from "@/app/actions/getPrimaryForm";
import { FormNav } from "@/components/form/form-nav";
import { PrimaryForm } from "@/components/form/primary-form";
import { Header } from "@/components/global/header";
import { MobileMenu } from "@/components/global/mobile-menu";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { trpc } from "@/lib/trpc-client";
import { PersonalDataForm } from "@/components/form/personal-data-form";
import { ContactAndAddressForm } from "@/components/form/contact-and-address-form";
import { PassportForm } from "@/components/form/passport-form";

export default function FormPage({
  params,
}: {
  params: { profileId: string };
}) {
  const profileId = params.profileId;
  const searchParams = useSearchParams();
  const formStep = searchParams.get("formStep");

  if (!profileId) {
    return <div>Loading...</div>;
  }

  const { data } = trpc.formsRouter.getForm.useQuery({ profileId });

  if (data === undefined) {
    return <div>Loading...</div>;
  }

  console.log(data.form);

  return (
    <>
      <Header />
      <MobileMenu />

      <div className="relative h-full lg:min-h-[calc(100vh-96px)] w-full lg:flex">
        {/* <FormNav /> */}

        <div className="w-full px-6 my-6 sm:px-16 sm:my-12 lg:container lg:mx-auto">
          <div className="w-full flex flex-col items-center gap-4 mb-12 sm:mb-24">
            <h1 className="text-2xl sm:text-3xl text-center font-semibold text-foreground">
              Complete seu cadastro
            </h1>

            <div className="flex items-center gap-4">
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={`/formulario/${profileId}?formStep=0`}
                      className={cn(
                        "size-4 flex-shrink-0 rounded-full border border-primary",
                        {
                          "bg-primary": formStep === "0",
                        },
                      )}
                    />
                  </TooltipTrigger>

                  <TooltipContent side="bottom">
                    <p>Dados Pessoais</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={`/formulario/${profileId}?formStep=1`}
                      className={cn(
                        "size-4 flex-shrink-0 rounded-full border border-primary",
                        {
                          "bg-primary": formStep === "1",
                        },
                      )}
                    />
                  </TooltipTrigger>

                  <TooltipContent side="bottom">
                    <p>Endereço e Contatos</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={`/formulario/${profileId}?formStep=2`}
                      className={cn(
                        "size-4 flex-shrink-0 rounded-full border border-primary",
                        {
                          "bg-primary": formStep === "2",
                        },
                      )}
                    />
                  </TooltipTrigger>

                  <TooltipContent side="bottom">
                    <p>Passaporte</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={`/formulario/${profileId}?formStep=3`}
                      className={cn(
                        "size-4 flex-shrink-0 rounded-full border border-primary",
                        {
                          "bg-primary": formStep === "3",
                        },
                      )}
                    />
                  </TooltipTrigger>

                  <TooltipContent side="bottom">
                    <p>Sobre a Viagem</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={`/formulario/${profileId}?formStep=4`}
                      className={cn(
                        "size-4 flex-shrink-0 rounded-full border border-primary",
                        {
                          "bg-primary": formStep === "4",
                        },
                      )}
                    />
                  </TooltipTrigger>

                  <TooltipContent side="bottom">
                    <p>Companhia de Viagem</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={`/formulario/${profileId}?formStep=5`}
                      className={cn(
                        "size-4 flex-shrink-0 rounded-full border border-primary",
                        {
                          "bg-primary": formStep === "5",
                        },
                      )}
                    />
                  </TooltipTrigger>

                  <TooltipContent side="bottom">
                    <p>Viagens Anteriores</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={`/formulario/${profileId}?formStep=6`}
                      className={cn(
                        "size-4 flex-shrink-0 rounded-full border border-primary",
                        {
                          "bg-primary": formStep === "6",
                        },
                      )}
                    />
                  </TooltipTrigger>

                  <TooltipContent side="bottom">
                    <p>Contato nos Estados Unidos</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={`/formulario/${profileId}?formStep=7`}
                      className={cn(
                        "size-4 flex-shrink-0 rounded-full border border-primary",
                        {
                          "bg-primary": formStep === "7",
                        },
                      )}
                    />
                  </TooltipTrigger>

                  <TooltipContent side="bottom">
                    <p>Informações da Família</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={`/formulario/${profileId}?formStep=8`}
                      className={cn(
                        "size-4 flex-shrink-0 rounded-full border border-primary",
                        {
                          "bg-primary": formStep === "8",
                        },
                      )}
                    />
                  </TooltipTrigger>

                  <TooltipContent side="bottom">
                    <p>Trabalho e Educação</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={`/formulario/${profileId}?formStep=9`}
                      className={cn(
                        "size-4 flex-shrink-0 rounded-full border border-primary",
                        {
                          "bg-primary": formStep === "9",
                        },
                      )}
                    />
                  </TooltipTrigger>

                  <TooltipContent side="bottom">
                    <p>Informações Adicionais</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={`/formulario/${profileId}?formStep=10`}
                      className={cn(
                        "size-4 flex-shrink-0 rounded-full border border-primary",
                        {
                          "bg-primary": formStep === "10",
                        },
                      )}
                    />
                  </TooltipTrigger>

                  <TooltipContent side="bottom">
                    <p>Segurança</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {formStep === "0" && <PersonalDataForm currentForm={data.form} />}
          {formStep === "1" && (
            <ContactAndAddressForm currentForm={data.form} />
          )}
          {formStep === "2" && <PassportForm currentForm={data.form} />}
          {/* <PrimaryForm currentForm={primaryForm} /> */}
        </div>
      </div>
    </>
  );
}
