"use client";

import { Check, ListChecks, Save, X } from "lucide-react";
import { Link as LinkScroll } from "react-scroll";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import useFormStore from "@/constants/stores/useFormStore";

export function FormNav() {
  const {
    personalDataComplete,
    contactAndAddressComplete,
    passportComplete,
    aboutTravelComplete,
    travelCompanyComplete,
    previousTravelComplete,
    USAContactComplete,
    familyComplete,
    workEducationComplete,
    securityComplete,
  } = useFormStore();

  return (
    <>
      <div className="sticky top-20 left-0 flex flex-col w-fit gap-4 z-10 lg:hidden">
        <Popover>
          <PopoverTrigger asChild>
            <Button>
              <ListChecks />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-80 h-52 p-0 overflow-y-auto">
            <ul className="flex flex-col">
              <LinkScroll activeClass="active" to="personal-data" smooth offset={-50} duration={500}>
                <li className="flex items-center justify-between p-4">
                  <span className="text-base text-primary font-medium">Dados Pessoais</span>

                  <div
                    className={cn(
                      "w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-secondary brightness-90 flex items-center justify-center",
                      {
                        "bg-green-400": personalDataComplete,
                      }
                    )}
                  >
                    {personalDataComplete && <Check color="#FFF" />}
                  </div>
                </li>
              </LinkScroll>

              <LinkScroll activeClass="active" to="contact-and-address" smooth offset={-50} duration={500}>
                <li className="flex items-center justify-between p-4">
                  <span className="text-base text-primary font-medium">Endereço e Contatos +4</span>

                  <div
                    className={cn(
                      "w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-secondary brightness-90 flex items-center justify-center",
                      {
                        "bg-green-400": contactAndAddressComplete,
                      }
                    )}
                  >
                    {contactAndAddressComplete && <Check color="#FFF" />}
                  </div>
                </li>
              </LinkScroll>

              <LinkScroll activeClass="active" to="passport" smooth offset={-50} duration={500}>
                <li className="flex items-center justify-between p-4">
                  <span className="text-base text-primary font-medium">Passaporte</span>

                  <div
                    className={cn(
                      "w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-secondary brightness-90 flex items-center justify-center",
                      {
                        "bg-green-400": passportComplete,
                      }
                    )}
                  >
                    {passportComplete && <Check color="#FFF" />}
                  </div>
                </li>
              </LinkScroll>

              <LinkScroll activeClass="active" to="about-travel" smooth offset={-50} duration={500}>
                <li className="flex items-center justify-between p-4">
                  <span className="text-base text-primary font-medium">Sobre a Viagem</span>

                  <div
                    className={cn(
                      "w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-secondary brightness-90 flex items-center justify-center",
                      {
                        "bg-green-400": aboutTravelComplete,
                      }
                    )}
                  >
                    {aboutTravelComplete && <Check color="#FFF" />}
                  </div>
                </li>
              </LinkScroll>

              <LinkScroll activeClass="active" to="travel-company" smooth offset={-50} duration={500}>
                <li className="flex items-center justify-between p-4">
                  <span className="text-base text-primary font-medium">Companhia de Viagem</span>

                  <div
                    className={cn(
                      "w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-secondary brightness-90 flex items-center justify-center",
                      {
                        "bg-green-400": travelCompanyComplete,
                      }
                    )}
                  >
                    {travelCompanyComplete && <Check color="#FFF" />}
                  </div>
                </li>
              </LinkScroll>

              <LinkScroll activeClass="active" to="previous-travel" smooth offset={-50} duration={500}>
                <li className="flex items-center justify-between p-4">
                  <span className="text-base text-primary font-medium">Viagens Anteriores</span>

                  <div
                    className={cn(
                      "w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-secondary brightness-90 flex items-center justify-center",
                      {
                        "bg-green-400": previousTravelComplete,
                      }
                    )}
                  >
                    {previousTravelComplete && <Check color="#FFF" />}
                  </div>
                </li>
              </LinkScroll>

              <LinkScroll activeClass="active" to="usa-contact" smooth offset={-50} duration={500}>
                <li className="flex items-center justify-between p-4">
                  <span className="text-base text-primary font-medium">Contatos nos Estados Unidos</span>

                  <div
                    className={cn(
                      "w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-secondary brightness-90 flex items-center justify-center",
                      {
                        "bg-green-400": USAContactComplete,
                      }
                    )}
                  >
                    {USAContactComplete && <Check color="#FFF" />}
                  </div>
                </li>
              </LinkScroll>

              <LinkScroll activeClass="active" to="family" smooth offset={-50} duration={500}>
                <li className="flex items-center justify-between p-4">
                  <span className="text-base text-primary font-medium">Informações da Família</span>

                  <div
                    className={cn(
                      "w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-secondary brightness-90 flex items-center justify-center",
                      {
                        "bg-green-400": familyComplete,
                      }
                    )}
                  >
                    {familyComplete && <Check color="#FFF" />}
                  </div>
                </li>
              </LinkScroll>

              <LinkScroll activeClass="active" to="work-education" smooth offset={-50} duration={500}>
                <li className="flex items-center justify-between p-4">
                  <span className="text-base text-primary font-medium">Trabalho e Educação</span>

                  <div
                    className={cn(
                      "w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-secondary brightness-90 flex items-center justify-center",
                      {
                        "bg-green-400": workEducationComplete,
                      }
                    )}
                  >
                    {workEducationComplete && <Check color="#FFF" />}
                  </div>
                </li>
              </LinkScroll>

              <LinkScroll activeClass="active" to="security" smooth offset={-50} duration={500}>
                <li className="flex items-center justify-between p-4">
                  <span className="text-base text-primary font-medium">Segurança</span>

                  <div
                    className={cn(
                      "w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-secondary brightness-90 flex items-center justify-center",
                      {
                        "bg-green-400": securityComplete,
                      }
                    )}
                  >
                    {securityComplete && <Check color="#FFF" />}
                  </div>
                </li>
              </LinkScroll>
            </ul>
          </PopoverContent>
        </Popover>

        <Button>
          <Save />
        </Button>
      </div>

      <div className="w-80 h-fit hidden lg:block sticky top-0 right-0 order-1">
        <ul className="flex flex-col">
          <LinkScroll activeClass="active" to="personal-data" smooth offset={-50} duration={500}>
            <li className="flex items-center gap-2 justify-between p-4 hover:bg-primary group bg-secondary transition-all cursor-pointer">
              <span className="text-base text-primary font-medium group-hover:text-white">Dados Pessoais</span>

              <div
                className={cn(
                  "w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-secondary brightness-90 flex items-center justify-center",
                  {
                    "bg-green-400": personalDataComplete,
                  }
                )}
              >
                {personalDataComplete && <Check color="#FFF" />}
              </div>
            </li>
          </LinkScroll>

          <LinkScroll activeClass="active" to="contact-and-address" smooth offset={-50} duration={500}>
            <li className="flex items-center gap-2 justify-between p-4 hover:bg-primary group bg-secondary transition-all cursor-pointer">
              <span className="text-base text-primary font-medium group-hover:text-white">Endereço e Contatos +4</span>

              <div
                className={cn(
                  "w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-secondary brightness-90 flex items-center justify-center",
                  {
                    "bg-green-400": contactAndAddressComplete,
                  }
                )}
              >
                {contactAndAddressComplete && <Check color="#FFF" />}
              </div>
            </li>
          </LinkScroll>

          <LinkScroll activeClass="active" to="passport" smooth offset={-50} duration={500}>
            <li className="flex items-center gap-2 justify-between p-4 hover:bg-primary group bg-secondary transition-all cursor-pointer">
              <span className="text-base text-primary font-medium group-hover:text-white">Passaporte</span>

              <div
                className={cn(
                  "w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-secondary brightness-90 flex items-center justify-center",
                  {
                    "bg-green-400": passportComplete,
                  }
                )}
              >
                {passportComplete && <Check color="#FFF" />}
              </div>
            </li>
          </LinkScroll>

          <LinkScroll activeClass="active" to="about-travel" smooth offset={-50} duration={500}>
            <li className="flex items-center gap-2 justify-between p-4 hover:bg-primary group bg-secondary transition-all cursor-pointer">
              <span className="text-base text-primary font-medium group-hover:text-white">Sobre a Viagem</span>

              <div
                className={cn(
                  "w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-secondary brightness-90 flex items-center justify-center",
                  {
                    "bg-green-400": aboutTravelComplete,
                  }
                )}
              >
                {aboutTravelComplete && <Check color="#FFF" />}
              </div>
            </li>
          </LinkScroll>

          <LinkScroll activeClass="active" to="travel-company" smooth offset={-50} duration={500}>
            <li className="flex items-center gap-2 justify-between p-4 hover:bg-primary group bg-secondary transition-all cursor-pointer">
              <span className="text-base text-primary font-medium group-hover:text-white">Companhia de Viagem</span>

              <div
                className={cn(
                  "w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-secondary brightness-90 flex items-center justify-center",
                  {
                    "bg-green-400": travelCompanyComplete,
                  }
                )}
              >
                {travelCompanyComplete && <Check color="#FFF" />}
              </div>
            </li>
          </LinkScroll>

          <LinkScroll activeClass="active" to="previous-travel" smooth offset={-50} duration={500}>
            <li className="flex items-center gap-2 justify-between p-4 hover:bg-primary group bg-secondary transition-all cursor-pointer">
              <span className="text-base text-primary font-medium group-hover:text-white">Viagens Anteriores</span>

              <div
                className={cn(
                  "w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-secondary brightness-90 flex items-center justify-center",
                  {
                    "bg-green-400": previousTravelComplete,
                  }
                )}
              >
                {previousTravelComplete && <Check color="#FFF" />}
              </div>
            </li>
          </LinkScroll>

          <LinkScroll activeClass="active" to="usa-contact" smooth offset={-50} duration={500}>
            <li className="flex items-center gap-2 justify-between p-4 hover:bg-primary group bg-secondary transition-all cursor-pointer">
              <span className="text-base text-primary font-medium group-hover:text-white">
                Contatos nos Estados Unidos
              </span>

              <div
                className={cn(
                  "w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-secondary brightness-90 flex items-center justify-center",
                  {
                    "bg-green-400": USAContactComplete,
                  }
                )}
              >
                {USAContactComplete && <Check color="#FFF" />}
              </div>
            </li>
          </LinkScroll>

          <LinkScroll activeClass="active" to="family" smooth offset={-50} duration={500}>
            <li className="flex items-center gap-2 justify-between p-4 hover:bg-primary group bg-secondary transition-all cursor-pointer">
              <span className="text-base text-primary font-medium group-hover:text-white">Informações da Família</span>

              <div
                className={cn(
                  "w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-secondary brightness-90 flex items-center justify-center",
                  {
                    "bg-green-400": familyComplete,
                  }
                )}
              >
                {familyComplete && <Check color="#FFF" />}
              </div>
            </li>
          </LinkScroll>

          <LinkScroll activeClass="active" to="work-education" smooth offset={-50} duration={500}>
            <li className="flex items-center gap-2 justify-between p-4 hover:bg-primary group bg-secondary transition-all cursor-pointer">
              <span className="text-base text-primary font-medium group-hover:text-white">Trabalho e Educação</span>

              <div
                className={cn(
                  "w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-secondary brightness-90 flex items-center justify-center",
                  {
                    "bg-green-400": workEducationComplete,
                  }
                )}
              >
                {workEducationComplete && <Check color="#FFF" />}
              </div>
            </li>
          </LinkScroll>

          <LinkScroll activeClass="active" to="security" smooth offset={-50} duration={500}>
            <li className="flex items-center gap-2 justify-between p-4 hover:bg-primary group bg-secondary transition-all cursor-pointer">
              <span className="text-base text-primary font-medium group-hover:text-white">Segurança</span>

              <div
                className={cn(
                  "w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-secondary brightness-90 flex items-center justify-center",
                  {
                    "bg-green-400": securityComplete,
                  }
                )}
              >
                {securityComplete && <Check color="#FFF" />}
              </div>
            </li>
          </LinkScroll>
        </ul>

        <Button size="lg" className="w-full flex items-center gap-2 text-base">
          <Save />
          Salvar
        </Button>
      </div>
    </>
  );
}
