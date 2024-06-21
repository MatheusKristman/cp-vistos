import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FormView() {
  return (
    <Accordion type="single" collapsible className="bg-secondary p-4">
      <AccordionItem value="dados-pessoais">
        <AccordionTrigger className="text-2xl font-semibold hover:no-underline">Dados Pessoais</AccordionTrigger>

        <AccordionContent className="w-full grid grid-cols-2 gap-6">
          <div className="w-full flex flex-col gap-6">
            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">Primeiro Nome (Conforme passaporte)</span>

              <span className="text-base text-primary">Nome</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">CPF</span>

              <span className="text-base text-primary">462.835.518-58</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">
                Outros nomes (Solteiro(a)/Nome Profissional/Religioso/etc...)
              </span>

              <ul className="flex flex-col gap-1 !list-disc">
                <li className="text-base text-primary ml-10">Nome 1</li>
                <li className="text-base text-primary ml-10">Nome 2</li>
              </ul>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">Estado Civil</span>

              <span className="text-base text-primary">Casado(a)</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">Cidade que nasceu</span>

              <span className="text-base text-primary">São Paulo</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">País que nasceu</span>

              <span className="text-base text-primary">Brasil</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">Possui outra nacionalidade?</span>

              <span className="text-base text-primary">Sim</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">
                É residente de um país diferente da sua nacionalidade?
              </span>

              <span className="text-base text-primary">Sim</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">
                U.S. Taxpayer ID Number (aplicável somente para quem já trabalhou nos EUA)
              </span>

              <span className="text-base text-primary">1231223123</span>
            </div>
          </div>

          <div className="w-full flex flex-col gap-6">
            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">Sobrenome (Conforme passaporte)</span>

              <span className="text-base text-primary">Teste</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">Código ou nome de guerra</span>

              <span className="text-base text-primary">Nome de guerra</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">Sexo</span>

              <span className="text-base text-primary">Masculino</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">Data de nascimento</span>

              <span className="text-base text-primary">31/01/1998</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">Estado que nasceu</span>

              <span className="text-base text-primary">São Paulo</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">País de origem (nacionalidade)</span>

              <span className="text-base text-primary">Brasil</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">
                Se respondeu sim anteriormente, digite o número do passaporte dessa nacionalidade
              </span>

              <span className="text-base text-primary">123123123</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">
                U.S. Social Security Number (aplicável somente para quem já trabalhou nos EUA)
              </span>

              <span className="text-base text-primary">123123123</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="endereco-e-contatos">
        <AccordionTrigger className="text-2xl font-semibold hover:no-underline">Endereço e Contatos</AccordionTrigger>

        <AccordionContent className="w-full grid grid-cols-2 gap-6">
          <div className="w-full flex flex-col gap-6">
            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">Endereço</span>

              <span className="text-base text-primary">Rua teste</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">Estado</span>

              <span className="text-base text-primary">São Paulo</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">País</span>

              <span className="text-base text-primary">Brasil</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">Informe seu outro endereço</span>

              <span className="text-base text-primary">Rua Teste 2</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">Telefone Fixo</span>

              <span className="text-base text-primary">+55 (11) 91004-1998</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">
                Nos últimos 5 anos você usou outros números de telefone?
              </span>

              <span className="text-base text-primary">Sim</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">E-mail</span>

              <span className="text-base text-primary">teste@teste.com</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">Outro e-mail</span>

              <span className="text-base text-primary">teste2@teste.com</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">Linkedin</span>

              <span className="text-base text-primary">teste</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">Outras redes</span>

              <span className="text-base text-primary">teste</span>
            </div>
          </div>

          <div className="w-full flex flex-col gap-6">
            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">Cidade</span>

              <span className="text-base text-primary">São Paulo</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">CEP</span>

              <span className="text-base text-primary">03918-000</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">
                Seu endereço de correio é diferente do endereço de sua residência?
              </span>

              <span className="text-base text-primary">Sim</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">Celular</span>

              <span className="text-base text-primary">+55 (11) 91004-1998</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">Outro telefone</span>

              <span className="text-base text-primary">+55 (11) 91004-1998</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">Nos últimos 5 anos você teve outros e-mails?</span>

              <span className="text-base text-primary">Sim</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">Facebook</span>

              <span className="text-base text-primary">teste</span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-lg text-primary font-semibold">Instagram</span>

              <span className="text-base text-primary">teste</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
