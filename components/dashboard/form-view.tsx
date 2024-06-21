import { Edit, Trash } from "lucide-react";
import { format } from "date-fns";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export function FormView() {
  return (
    <div className="w-full flex flex-col gap-9 bg-secondary py-8 px-11">
      <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
        <h2 className="text-xl text-center text-foreground w-full font-semibold sm:w-fit">
          Formulário Matheus
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Button variant="secondary" className="flex items-center gap-2">
            <Edit />
            Editar
          </Button>

          <Button className="flex items-center gap-2">
            <Trash />
            Excluir
          </Button>
        </div>
      </div>

      <Accordion type="single" collapsible className="flex flex-col gap-6">
        <AccordionItem value="personal-data" className="bg-white p-6 flex flex-col gap-9 border-0">
          <AccordionTrigger className="text-lg text-foreground font-semibold hover:no-underline">
            Dados Pessoais
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Primeiro Nome</span>

                <span className="text-base text-foreground">Matheus</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Sobrenome</span>

                <span className="text-base text-foreground">Kristman</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">CPF</span>

                <span className="text-base text-foreground">462.835.518-58</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Código ou Nome de Guerra
                </span>

                <span className="text-base text-foreground">Outro Nome</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Outros Nomes (Religioso, Solteiro, etc...)
                </span>

                <span className="text-base text-foreground">Nome 1 | Nome 2</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Sexo</span>

                <span className="text-base text-foreground">Masculino</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Estado Civil</span>

                <span className="text-base text-foreground">Masculino</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Data de Nascimento</span>

                <span className="text-base text-foreground">
                  {format(new Date(), "dd/MM/yyyy")}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Cidade de Nascença</span>

                <span className="text-base text-foreground">São Paulo</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Estado de Nascença</span>

                <span className="text-base text-foreground">São Paulo</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">País de Nascença</span>

                <span className="text-base text-foreground">Brasil</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  País de Origem (Nacionalidade)
                </span>

                <span className="text-base text-foreground">Brasil</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Número do passaporte em caso de outra nacionalidade
                </span>

                <span className="text-base text-foreground">Não possui</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Residente de um país diferente de sua nacionalidade
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  U.S. Social Security Number
                </span>

                <span className="text-base text-foreground">123123123</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  U.S. Taxpayer ID Number
                </span>

                <span className="text-base text-foreground">123123123</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="contacts-and-address"
          className="bg-white p-6 flex flex-col gap-9 border-0"
        >
          <AccordionTrigger className="text-lg text-foreground font-semibold hover:no-underline">
            Endereço e Contatos
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Endereço</span>

                <span className="text-base text-foreground">Rua General Porfírio da Paz, 1350</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Cidade</span>

                <span className="text-base text-foreground">São Paulo</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Estado</span>

                <span className="text-base text-foreground">São Paulo</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">CEP</span>

                <span className="text-base text-foreground">03918-000</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">País</span>

                <span className="text-base text-foreground">Brasil</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Endereço de Correio</span>

                <span className="text-base text-foreground">É o mesmo da residencia</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Celular</span>

                <span className="text-base text-foreground">+55 (11) 91004-1998</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Telefone</span>

                <span className="text-base text-foreground">+55 (11) 2143-8987</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">E-mail</span>

                <span className="text-base text-foreground">teste@teste.com</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Outro Telefone</span>

                <span className="text-base text-foreground">Não possui</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Outro E-mail</span>

                <span className="text-base text-foreground">teste2@teste.com</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Facebook</span>

                <span className="text-base text-foreground">teste</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">LinkedIn</span>

                <span className="text-base text-foreground">teste</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Instagram</span>

                <span className="text-base text-foreground">teste</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Outras Redes</span>

                <span className="text-base text-foreground">Não possui</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="passport" className="bg-white p-6 flex flex-col gap-9 border-0">
          <AccordionTrigger className="text-lg text-foreground font-semibold hover:no-underline">
            Passaporte
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Número do Passaporte</span>

                <span className="text-base text-foreground">123123</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Cidade de Emissão</span>

                <span className="text-base text-foreground">São Paulo</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Estado de Emissão</span>

                <span className="text-base text-foreground">São Paulo</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">País de Emissão</span>

                <span className="text-base text-foreground">Brasil</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Data de Emissão</span>

                <span className="text-base text-foreground">
                  {format(new Date(), "dd/MM/yyyy")}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Data de Expiração</span>

                <span className="text-base text-foreground">Sem expiração</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Já perdeu ou teve o passaporte roubado?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Número do Passaporte Perdido/Roubado
                </span>

                <span className="text-base text-foreground">123123123</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  País do Passaporte Perdido/Roubado
                </span>

                <span className="text-base text-foreground">França</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Explique o que ocorreu
                </span>

                <span className="text-base text-foreground">
                  Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                  dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                  sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget
                  condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora
                  torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
                  enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac
                  rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis
                  convallis diam sit amet lacinia. Aliquam in elementum tellus.
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="about-travel" className="bg-white p-6 flex flex-col gap-9 border-0">
          <AccordionTrigger className="text-lg text-foreground font-semibold hover:no-underline">
            Sobre a Viagem
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Possui itinerário de viagem?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Data prevista de chegada nos EUA
                </span>

                <span className="text-base text-foreground">
                  {format(new Date(), "dd/MM/yyyy")}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Número do voo de chegada
                </span>

                <span className="text-base text-foreground">123123123</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Cidade de chegada</span>

                <span className="text-base text-foreground">New York</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Data prevista de retorno ao Brasil
                </span>

                <span className="text-base text-foreground">
                  {format(new Date(), "dd/MM/yyyy")}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Número do voo de partida
                </span>

                <span className="text-base text-foreground">123123123</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Cidade de partida</span>

                <span className="text-base text-foreground">São Paulo</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Tempo estimado de permanência nos EUA
                </span>

                <span className="text-base text-foreground">Teste</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Locais que irá visitar
                </span>

                <span className="text-base text-foreground">Local 1 | Local 2 | Local 3</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Endereço completo onde ficará nos EUA
                </span>

                <span className="text-base text-foreground">Rua teste</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  ZIP Code de onde ficará nos EUA
                </span>

                <span className="text-base text-foreground">12345</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Cidade nos EUA</span>

                <span className="text-base text-foreground">Cidade teste</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Estado nos EUA</span>

                <span className="text-base text-foreground">Estado teste</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Nome ou empresa que pagará a viagem
                </span>

                <span className="text-base text-foreground">Eu mesmo</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Telefone Residencial</span>

                <span className="text-base text-foreground">+55 (11) 1234-1234</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Endereço Completo</span>

                <span className="text-base text-foreground">Rua teste</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Relação com o solicitante
                </span>

                <span className="text-base text-foreground">---</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">E-mail</span>

                <span className="text-base text-foreground">teste@teste.com</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="travel-company" className="bg-white p-6 flex flex-col gap-9 border-0">
          <AccordionTrigger className="text-lg text-foreground font-semibold hover:no-underline">
            Companhia de Viagem
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            {/* TODO: adicionar dinamicamente  */}
            <div className="w-full flex flex-col gap-9">
              <div className="w-full bg-[#D3D3E2] p-5 flex flex-col gap-4">
                <div className="w-full flex items-center gap-2">
                  <div className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-lg font-medium">1</span>
                  </div>

                  <span className="text-foreground text-lg font-medium">Pessoa Acompanhante</span>
                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">
                      Nome completo da outra pessoa
                    </span>

                    <span className="text-base text-foreground">Nome Teste</span>
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">
                      Relação com a outra pessoa
                    </span>

                    <span className="text-base text-foreground">Teste</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Esta viajando como integrante de um grupo de viagem?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Nome da organização ou grupo
                </span>

                <span className="text-base text-foreground">Nome teste</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="previous-travel"
          className="bg-white p-6 flex flex-col gap-9 border-0"
        >
          <AccordionTrigger className="text-lg text-foreground font-semibold hover:no-underline">
            Viagens Anteriores
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Já foi para os EUA?</span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-9">
              <div className="w-full bg-[#D3D3E2] p-5 flex flex-col gap-4">
                <div className="w-full flex items-center gap-2">
                  <div className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-lg font-medium">1</span>
                  </div>

                  <span className="text-foreground text-lg font-medium">Viagem</span>
                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">
                      Data prevista de chegada nos EUA
                    </span>

                    <span className="text-base text-foreground">
                      {format(new Date(), "dd/MM/yyyy")}
                    </span>
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">
                      Tempo estimado de permanência nos EUA
                    </span>

                    <span className="text-base text-foreground">2 anos</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Já obteve uma licença americana para dirigir nos EUA?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-9">
              <div className="w-full bg-[#FDF0D2] p-5 flex flex-col gap-4">
                <div className="w-full flex items-center gap-2">
                  <div className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-lg font-medium">1</span>
                  </div>

                  <span className="text-foreground text-lg font-medium">Licença</span>
                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">Número da licença</span>

                    <span className="text-base text-foreground">123123123</span>
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">Estado</span>

                    <span className="text-base text-foreground">Teste</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Já obteve visto nos EUA?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Data de Emissão do Visto
                </span>

                <span className="text-base text-foreground">
                  {format(new Date(), "dd/MM/yyyy")}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Número do Visto</span>

                <span className="text-base text-foreground">Não sei o número</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Está solicitando o novo visto do mesmo país ou localização daquele concedido
                  previamente?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Este país é o mesmo onde está localizada sua residencia principal?
                </span>

                <span className="text-base text-foreground">Não</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Está solicitando o mesmo tipo de visto concedido anteriormente?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Forneceu digitais dos 10 dedos?
                </span>

                <span className="text-base text-foreground">Não</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Já teve um visto perdido ou roubado?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  O que ocorreu com o visto perdido ou roubado
                </span>

                <span className="text-base text-foreground">
                  Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                  dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                  sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget
                  condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora
                  torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
                  enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac
                  rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis
                  convallis diam sit amet lacinia. Aliquam in elementum tellus.
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Já teve um visto revogado ou cancelado?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  O que ocorreu com o visto revogado ou cancelado
                </span>

                <span className="text-base text-foreground">
                  Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                  dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                  sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget
                  condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora
                  torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
                  enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac
                  rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis
                  convallis diam sit amet lacinia. Aliquam in elementum tellus.
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Já teve um visto negado?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  O que ocorreu com o visto negado
                </span>

                <span className="text-base text-foreground">
                  Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                  dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                  sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget
                  condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora
                  torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
                  enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac
                  rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis
                  convallis diam sit amet lacinia. Aliquam in elementum tellus.
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Posto Consular no Brasil
                </span>

                <span className="text-base text-foreground">posto teste</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Categoria/tipo de visto negado
                </span>

                <span className="text-base text-foreground">Teste</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Alguém já solicitou alguma petição de imigração em seu nome perante o Departamento
                  de Imigração dos Estados Unidos?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Motivo</span>

                <span className="text-base text-foreground">
                  Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                  dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                  sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget
                  condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora
                  torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
                  enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac
                  rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis
                  convallis diam sit amet lacinia. Aliquam in elementum tellus.
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="usa-contacts" className="bg-white p-6 flex flex-col gap-9 border-0">
          <AccordionTrigger className="text-lg text-foreground font-semibold hover:no-underline">
            Contato nos Estados Unidos
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Nome completo da pessoa ou organização
                </span>

                <span className="text-base text-foreground">Nome Teste</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Relação do contato com você
                </span>

                <span className="text-base text-foreground">Teste</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Endereço completo do contato
                </span>

                <span className="text-base text-foreground">Rua teste</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">ZIP Code do contato</span>

                <span className="text-base text-foreground">12345</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Cidade do contato</span>

                <span className="text-base text-foreground">Cidade teste</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Estado do contato</span>

                <span className="text-base text-foreground">Estado teste</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">País do contato</span>

                <span className="text-base text-foreground">País teste</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Telefone do contato</span>

                <span className="text-base text-foreground">+55 (11) 91234-1234</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">E-mail do contato</span>

                <span className="text-base text-foreground">teste3@teste.com</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="family" className="bg-white p-6 flex flex-col gap-9 border-0">
          <AccordionTrigger className="text-lg text-foreground font-semibold hover:no-underline">
            Informações da Família
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Nome Completo do Pai</span>

                <span className="text-base text-foreground">Nome Teste</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Data de Nascimento do Pai
                </span>

                <span className="text-base text-foreground">
                  {format(new Date(), "dd/MM/yyyy")}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Pai se encontra nos EUA?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Situação do Pai</span>

                <span className="text-base text-foreground">teste</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Nome Completo do Mãe</span>

                <span className="text-base text-foreground">Nome Teste</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Data de Nascimento do Mãe
                </span>

                <span className="text-base text-foreground">
                  {format(new Date(), "dd/MM/yyyy")}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Mãe se encontra nos EUA?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Situação do Mãe</span>

                <span className="text-base text-foreground">teste</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Há alguém da família nos EUA?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-9">
              <div className="w-full bg-[#D3D3E2] p-5 flex flex-col gap-4">
                <div className="w-full flex items-center gap-2">
                  <div className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-lg font-medium">1</span>
                  </div>

                  <span className="text-foreground text-lg font-medium">Familiar</span>
                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">Nome do Parente</span>

                    <span className="text-base text-foreground">Nome Teste</span>
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">Parentesco</span>

                    <span className="text-base text-foreground">Teste</span>
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">
                      Situação do Parente
                    </span>

                    <span className="text-base text-foreground">Teste</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Nome Completo (Cônjuge/Parceiro/Ex-Cônjuge)
                </span>

                <span className="text-base text-foreground">Nome teste</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Data de Nascimento (Cônjuge/Parceiro/Ex-Cônjuge)
                </span>

                <span className="text-base text-foreground">
                  {format(new Date(), "dd/MM/yyyy")}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Nacionalidade (Cônjuge/Parceiro/Ex-Cônjuge)
                </span>

                <span className="text-base text-foreground">Brasil</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Cidade de Nascimento (Cônjuge/Parceiro/Ex-Cônjuge)
                </span>

                <span className="text-base text-foreground">São Paulo</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Estado de Nascimento (Cônjuge/Parceiro/Ex-Cônjuge)
                </span>

                <span className="text-base text-foreground">São Paulo</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  País de Nascimento (Cônjuge/Parceiro/Ex-Cônjuge)
                </span>

                <span className="text-base text-foreground">Brasil</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Data da União (Cônjuge/Parceiro/Ex-Cônjuge)
                </span>

                <span className="text-base text-foreground">
                  {format(new Date(), "dd/MM/yyyy")}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Data da Separação (Cônjuge/Parceiro/Ex-Cônjuge)
                </span>

                <span className="text-base text-foreground">
                  {format(new Date(), "dd/MM/yyyy")}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="work-education" className="bg-white p-6 flex flex-col gap-9 border-0">
          <AccordionTrigger className="text-lg text-foreground font-semibold hover:no-underline">
            Trabalho e Educação
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Ocupação atual</span>

                <span className="text-base text-foreground">Outros</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Cargo/Função</span>

                <span className="text-base text-foreground">teste</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Nome do empregador ou empresa atual
                </span>

                <span className="text-base text-foreground">teste</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Endereço completo da empresa
                </span>

                <span className="text-base text-foreground">Rua teste</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Cidade da empresa</span>

                <span className="text-base text-foreground">cidade teste</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Estado da empresa</span>

                <span className="text-base text-foreground">estado teste</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">País da empresa</span>

                <span className="text-base text-foreground">país teste</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Cep da empresa</span>

                <span className="text-base text-foreground">cep teste</span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Telefone da empresa</span>

                <span className="text-base text-foreground">+55 (11) 91234-1234</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Data de admissão</span>

                <span className="text-base text-foreground">
                  {format(new Date(), "dd/MM/yyyy")}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">Renda mensal (R$)</span>

                <span className="text-base text-foreground">R$ 3000,00</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Descreva quais são as suas funções dentro da sua empresa, se possui funcionários
                  registrados e outras informações relacionadas ao seu negócio
                </span>

                <span className="text-base text-foreground">
                  Rorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                  dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                  sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget
                  condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora
                  torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
                  enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac
                  rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis
                  convallis diam sit amet lacinia. Aliquam in elementum tellus.
                </span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-9">
              <div className="w-full bg-[#D3D3E2] p-5 flex flex-col gap-4">
                <div className="w-full flex items-center gap-2">
                  <div className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-lg font-medium">1</span>
                  </div>

                  <span className="text-foreground text-lg font-medium">Emprego Anterior</span>
                </div>

                <div className="w-full grid grid-cols-1 gap-6">
                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">
                      Nome do empregador ou empresa anterior
                    </span>

                    <span className="text-base text-foreground">teste</span>
                  </div>
                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">
                      Endereço completo da empresa
                    </span>

                    <span className="text-base text-foreground">Rua teste</span>
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">Cidade da empresa</span>

                    <span className="text-base text-foreground">cidade teste</span>
                  </div>
                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">Estado da empresa</span>

                    <span className="text-base text-foreground">estado teste</span>
                  </div>
                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">País da empresa</span>

                    <span className="text-base text-foreground">país teste</span>
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">CEP da empresa</span>

                    <span className="text-base text-foreground">03918-000</span>
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">
                      Telefone da empresa
                    </span>

                    <span className="text-base text-foreground">+55 (11) 1234-1235</span>
                  </div>
                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">Cargo / Função</span>

                    <span className="text-base text-foreground">teste</span>
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">
                      Nome completo do supervisor
                    </span>

                    <span className="text-base text-foreground">Nome teste</span>
                  </div>
                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">Data de admissão</span>

                    <span className="text-base text-foreground">
                      {format(new Date(), "dd/MM/yyyy")}
                    </span>
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">Data de demissão</span>

                    <span className="text-base text-foreground">
                      {format(new Date(), "dd/MM/yyyy")}
                    </span>
                  </div>
                </div>

                <div className="w-full grid grid-cols-1 gap-6">
                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">
                      Descrição da tarefa exercida
                    </span>

                    <span className="text-base text-foreground">
                      Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                      molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
                      accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
                      Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti
                      sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                      Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec
                      ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel
                      bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in
                      elementum tellus.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-9">
              <div className="w-full bg-[#FDF0D2] p-5 flex flex-col gap-4">
                <div className="w-full flex items-center gap-2">
                  <div className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-lg font-medium">1</span>
                  </div>

                  <span className="text-foreground text-lg font-medium">
                    Instituição de Ensino Anterior
                  </span>
                </div>

                <div className="w-full grid grid-cols-1 gap-6">
                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">
                      Nome completo da instituição
                    </span>

                    <span className="text-base text-foreground">teste</span>
                  </div>
                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">
                      Endereço completo da instituição
                    </span>

                    <span className="text-base text-foreground">Rua teste</span>
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">
                      Cidade da instituição
                    </span>

                    <span className="text-base text-foreground">cidade teste</span>
                  </div>
                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">
                      Estado da instituição
                    </span>

                    <span className="text-base text-foreground">estado teste</span>
                  </div>
                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">
                      País da instituição
                    </span>

                    <span className="text-base text-foreground">país teste</span>
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">
                      CEP da instituição
                    </span>

                    <span className="text-base text-foreground">03918-000</span>
                  </div>
                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">Nome do curso</span>

                    <span className="text-base text-foreground">Nome teste</span>
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">Data de início</span>

                    <span className="text-base text-foreground">
                      {format(new Date(), "dd/MM/yyyy")}
                    </span>
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">Data de término</span>

                    <span className="text-base text-foreground">
                      {format(new Date(), "dd/MM/yyyy")}
                    </span>
                  </div>
                </div>

                <div className="w-full grid grid-cols-1 gap-6">
                  <div className="w-full flex flex-col gap-1">
                    <span className="text-base text-foreground font-medium">
                      Descrição da tarefa exercida
                    </span>

                    <span className="text-base text-foreground">
                      Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                      molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
                      accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
                      Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti
                      sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                      Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec
                      ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel
                      bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in
                      elementum tellus.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="security" className="bg-white p-6 flex flex-col gap-9 border-0">
          <AccordionTrigger className="text-lg text-foreground font-semibold hover:no-underline">
            Segurança
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col gap-9">
            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Possui alguma doença contagiosa (cancroide, gonorreia, granuloma inguinal,
                  hanseníase infecciosa, linfogranuloma venéreo, sífilis em estágio infeccioso,
                  tuberculose ativa e outras doenças, conforme determinado pelo Departamento de
                  Saúde e Serviços Humanos?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Possui algum problema físico ou mental que possa interferir em sua segurança ou de
                  outras pessoas?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já foi preso ou condenado por algum delito ou crime, mesmo que tenha sido
                  objeto de perdão, anistia ou outra ação semelhante?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Já teve problemas com drogas?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já violou ou esteve envolvido em alguma conspiração para violar qualquer lei
                  relacionada ao controle de substâncias?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você está vindo para os Estados Unidos para se envolver em prostituição ou vício
                  comercializado ilegalmente ou esteve envolvido em prostituição ou procura de
                  prostitutas nos últimos 10 anos?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já esteve envolvido ou pretende se envolver em lavagem de dinheiro?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já cometeu ou conspirou para cometer um crime de tráfico de pessoas nos
                  Estados Unidos ou fora dos Estados Unidos?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já ajudou, encorajou, ajudou ou conspirou conscientemente com um indivíduo
                  que cometeu ou conspirou para cometer um crime grave de tráfico de pessoas nos
                  Estados Unidos ou fora?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você é cônjuge, filho ou filha de um indivíduo que cometeu ou conspirou para
                  cometer um crime de tráfico de pessoas nos Estados Unidos ou fora e, nos últimos
                  cinco anos, beneficiou-se conscientemente das atividades de tráfico?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você procura se envolver em espionagem, sabotagem, violações de controle de
                  exportação ou qualquer outra atividade ilegal enquanto estiver nos Estados Unidos?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você procura se envolver em atividades terroristas enquanto estiver nos Estados
                  Unidos ou já se envolveu em atividades terroristas?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já prestou ou pretende fornecer assistência financeira ou outro tipo de apoio
                  a terroristas ou organizações terroristas?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você é membro ou representante de uma organização terrorista?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você é cônjuge, filho ou filha de um indivíduo que se envolveu em atividades
                  terroristas, inclusive fornecendo assistência financeira ou outro apoio a
                  terroristas ou organizações terroristas, nos últimos cinco anos?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já ordenou, incitou, cometeu, ajudou ou de alguma forma participou de
                  genocídio?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já cometeu, ordenou, incitou, ajudou ou participou de alguma forma em
                  tortura?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você cometeu, ordenou, incitou, ajudou ou de alguma forma participou em
                  assassinatos extrajudiciais, assassinatos políticos ou outros atos de violência?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já se envolveu no recrutamento ou na utilização de crianças-soldados?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você, enquanto servia como funcionário do governo, foi responsável ou executou
                  diretamente, em qualquer momento, violações particularmente graves da liberdade
                  religiosa?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já esteve diretamente envolvido no estabelecimento ou na aplicação de
                  controles populacionais que forçaram uma mulher a se submeter a um aborto contra a
                  sua livre escolha ou um homem ou uma mulher a se submeter à esterilização contra a
                  sua livre vontade?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já esteve diretamente envolvido no transplante coercitivo de órgãos humanos
                  ou tecidos corporais?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já tentou obter ou ajudar outras pessoas a obter um visto, entrada nos
                  Estados Unidos ou qualquer outro benefício de imigração dos Estados Unidos por
                  meio de fraude, deturpação intencional ou outros meios ilegais?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já foi removido ou deportado de algum país?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já recebeu a custódia de uma criança cidadã dos EUA fora dos Estados Unidos
                  de uma pessoa que recebeu a custódia legal de um tribunal dos EUA?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você votou nos Estados Unidos violando alguma lei ou regulamento?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1">
                <span className="text-base text-foreground font-medium">
                  Você já renunciou à cidadania dos Estados Unidos para evitar impostos?
                </span>

                <span className="text-base text-foreground">Sim</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
