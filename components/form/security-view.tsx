import { Form as FormType } from "@prisma/client";

import { cn } from "@/lib/utils";

interface SecurityViewProps {
  form: FormType;
  className?: string;
}

export function SecurityView({ form, className }: SecurityViewProps) {
  return (
    <>
      <div
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Possui alguma doença contagiosa (cancroide, gonorreia, granuloma
            inguinal, hanseníase infecciosa, linfogranuloma venéreo, sífilis em
            estágio infeccioso, tuberculose ativa e outras doenças, conforme
            determinado pelo Departamento de Saúde e Serviços Humanos?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.contagiousDiseaseConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Detalhes
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.contagiousDiseaseConfirmationDetails
              ? form.contagiousDiseaseConfirmationDetails
              : "Sem detalhes"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Possui algum problema físico ou mental que possa interferir em sua
            segurança ou de outras pessoas?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.phisicalMentalProblemConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Detalhes
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.phisicalMentalProblemConfirmationDetails
              ? form.phisicalMentalProblemConfirmationDetails
              : "Sem detalhes"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Você já foi preso ou condenado por algum delito ou crime, mesmo que
            tenha sido objeto de perdão, anistia ou outra ação semelhante?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.crimeConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Detalhes
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.crimeConfirmationDetails
              ? form.crimeConfirmationDetails
              : "Sem detalhes"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Já teve problemas com drogas?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.drugsProblemConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Detalhes
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.drugsProblemConfirmationDetails
              ? form.drugsProblemConfirmationDetails
              : "Sem detalhes"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Você já violou ou esteve envolvido em alguma conspiração para violar
            qualquer lei relacionada ao controle de substâncias?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.lawViolateConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Detalhes
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.lawViolateConfirmationDetails
              ? form.lawViolateConfirmationDetails
              : "Sem detalhes"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Você está vindo para os Estados Unidos para se envolver em
            prostituição ou vício comercializado ilegalmente ou esteve envolvido
            em prostituição ou procura de prostitutas nos últimos 10 anos?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.prostitutionConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Detalhes
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.prostitutionConfirmationDetails
              ? form.prostitutionConfirmationDetails
              : "Sem detalhes"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Você já esteve envolvido ou pretende se envolver em lavagem de
            dinheiro?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.moneyLaundryConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Detalhes
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.moneyLaundryConfirmationDetails
              ? form.moneyLaundryConfirmationDetails
              : "Sem detalhes"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Você já cometeu ou conspirou para cometer um crime de tráfico de
            pessoas nos Estados Unidos ou fora dos Estados Unidos?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.peopleTrafficConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Detalhes
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.peopleTrafficConfirmationDetails
              ? form.peopleTrafficConfirmationDetails
              : "Sem detalhes"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Você já ajudou, encorajou, ajudou ou conspirou conscientemente com
            um indivíduo que cometeu ou conspirou para cometer um crime grave de
            tráfico de pessoas nos Estados Unidos ou fora?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.helpPeopleTrafficConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Detalhes
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.helpPeopleTrafficConfirmationDetails
              ? form.helpPeopleTrafficConfirmationDetails
              : "Sem detalhes"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Você é cônjuge, filho ou filha de um indivíduo que cometeu ou
            conspirou para cometer um crime de tráfico de pessoas nos Estados
            Unidos ou fora e, nos últimos cinco anos, beneficiou-se
            conscientemente das atividades de tráfico?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.parentPeopleTrafficConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Detalhes
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.parentPeopleTrafficConfirmationDetails
              ? form.parentPeopleTrafficConfirmationDetails
              : "Sem detalhes"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Você procura se envolver em espionagem, sabotagem, violações de
            controle de exportação ou qualquer outra atividade ilegal enquanto
            estiver nos Estados Unidos?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.spyConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Detalhes
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.spyConfirmationDetails
              ? form.spyConfirmationDetails
              : "Sem detalhes"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Você procura se envolver em atividades terroristas enquanto estiver
            nos Estados Unidos ou já se envolveu em atividades terroristas?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.terrorismConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Detalhes
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.terrorismConfirmationDetails
              ? form.terrorismConfirmationDetails
              : "Sem detalhes"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Você já prestou ou pretende fornecer assistência financeira ou outro
            tipo de apoio a terroristas ou organizações terroristas?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.financialAssistanceConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Detalhes
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.financialAssistanceConfirmationDetails
              ? form.financialAssistanceConfirmationDetails
              : "Sem detalhes"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Você é membro ou representante de uma organização terrorista?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.terrorismMemberConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Detalhes
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.terrorismMemberConfirmationDetails
              ? form.terrorismMemberConfirmationDetails
              : "Sem detalhes"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Você é cônjuge, filho ou filha de um indivíduo que se envolveu em
            atividades terroristas, inclusive fornecendo assistência financeira
            ou outro apoio a terroristas ou organizações terroristas, nos
            últimos cinco anos?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.parentTerrorismConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Detalhes
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.parentTerrorismConfirmationDetails
              ? form.parentTerrorismConfirmationDetails
              : "Sem detalhes"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Você já ordenou, incitou, cometeu, ajudou ou de alguma forma
            participou de genocídio?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.genocideConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Detalhes
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.genocideConfirmationDetails
              ? form.genocideConfirmationDetails
              : "Sem detalhes"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Você já cometeu, ordenou, incitou, ajudou ou participou de alguma
            forma em tortura?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.tortureConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Detalhes
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.tortureConfirmationDetails
              ? form.tortureConfirmationDetails
              : "Sem detalhes"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Você cometeu, ordenou, incitou, ajudou ou de alguma forma participou
            em assassinatos extrajudiciais, assassinatos políticos ou outros
            atos de violência?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.assassinConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Detalhes
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.assassinConfirmationDetails
              ? form.assassinConfirmationDetails
              : "Sem detalhes"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Você já se envolveu no recrutamento ou na utilização de
            crianças-soldados?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.childSoldierConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Detalhes
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.childSoldierConfirmationDetails
              ? form.childSoldierConfirmationDetails
              : "Sem detalhes"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Você, enquanto servia como funcionário do governo, foi responsável
            ou executou diretamente, em qualquer momento, violações
            particularmente graves da liberdade religiosa?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.religionLibertyConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Detalhes
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.religionLibertyConfirmationDetails
              ? form.religionLibertyConfirmationDetails
              : "Sem detalhes"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Você já esteve diretamente envolvido no estabelecimento ou na
            aplicação de controles populacionais que forçaram uma mulher a se
            submeter a um aborto contra a sua livre escolha ou um homem ou uma
            mulher a se submeter à esterilização contra a sua livre vontade?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.abortConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Detalhes
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.abortConfirmationDetails
              ? form.abortConfirmationDetails
              : "Sem detalhes"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Você já esteve diretamente envolvido no transplante coercitivo de
            órgãos humanos ou tecidos corporais?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.coerciveTransplantConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Detalhes
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.coerciveTransplantConfirmationDetails
              ? form.coerciveTransplantConfirmationDetails
              : "Sem detalhes"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Você já tentou obter ou ajudar outras pessoas a obter um visto,
            entrada nos Estados Unidos ou qualquer outro benefício de imigração
            dos Estados Unidos por meio de fraude, deturpação intencional ou
            outros meios ilegais?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.visaFraudConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Detalhes
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.visaFraudConfirmationDetails
              ? form.visaFraudConfirmationDetails
              : "Sem detalhes"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Você já foi removido ou deportado de algum país?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.deportedConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Detalhes
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.deportedConfirmationDetails
              ? form.deportedConfirmationDetails
              : "Sem detalhes"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Você já recebeu a custódia de uma criança cidadã dos EUA fora dos
            Estados Unidos de uma pessoa que recebeu a custódia legal de um
            tribunal dos EUA?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.childCustodyConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Detalhes
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.childCustodyConfirmationDetails
              ? form.childCustodyConfirmationDetails
              : "Sem detalhes"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Você votou nos Estados Unidos violando alguma lei ou regulamento?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.lawViolationConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Detalhes
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.lawViolationConfirmationDetails
              ? form.lawViolationConfirmationDetails
              : "Sem detalhes"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Você já renunciou à cidadania dos Estados Unidos para evitar
            impostos?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.avoidTaxConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Detalhes
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.avoidTaxConfirmationDetails
              ? form.avoidTaxConfirmationDetails
              : "Sem detalhes"}
          </span>
        </div>
      </div>
    </>
  );
}
