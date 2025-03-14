import { format } from "date-fns";
import { Form as FormType } from "@prisma/client";

import { formatPrice, cn } from "@/lib/utils";

interface WorkEducationViewProps {
  form: FormType;
  className?: string;
}

export function WorkEducationView({ form, className }: WorkEducationViewProps) {
  return (
    <>
      <div className={cn("w-full grid grid-cols-1 sm:grid-cols-3 gap-6", className)}>
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">Ocupação atual</span>

          <span className="text-lg font-medium text-foreground">
            {form.occupation && form.occupation.length > 0 ? form.occupation : "Não Preenchido"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">Cargo/Função</span>

          <span className="text-lg font-medium text-foreground">
            {form.office && form.office.length > 0 ? form.office : "Não Preenchido"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">Nome do empregador ou empresa atual</span>

          <span className="text-lg font-medium text-foreground">
            {form.companyOrBossName && form.companyOrBossName.length > 0 ? form.companyOrBossName : "Não Preenchido"}
          </span>
        </div>
      </div>

      <div className={cn("w-full grid grid-cols-1 sm:grid-cols-3 gap-6", className)}>
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">Endereço completo da empresa</span>

          <span className="text-lg font-medium text-foreground">
            {form.companyAddress && form.companyAddress.length > 0 ? form.companyAddress : "Não Preenchido"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">Cidade da empresa</span>

          <span className="text-lg font-medium text-foreground">
            {form.companyCity && form.companyCity.length > 0 ? form.companyCity : "Não Preenchido"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">Estado da empresa</span>

          <span className="text-lg font-medium text-foreground">
            {form.companyState && form.companyState.length > 0 ? form.companyState : "Não Preenchido"}
          </span>
        </div>
      </div>

      <div className={cn("w-full grid grid-cols-1 sm:grid-cols-3 gap-6", className)}>
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">País da empresa</span>

          <span className="text-lg font-medium text-foreground">
            {form.companyCountry && form.companyCountry.length > 0 ? form.companyCountry : "Não Preenchido"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">Cep da empresa</span>

          <span className="text-lg font-medium text-foreground">
            {form.companyCep && form.companyCep.length > 0 ? form.companyCep : "Não Preenchido"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">Telefone da empresa</span>

          <span className="text-lg font-medium text-foreground">
            {form.companyTel && form.companyTel.length > 0 ? form.companyTel : "Não Preenchido"}
          </span>
        </div>
      </div>

      <div className={cn("w-full grid grid-cols-1 sm:grid-cols-3 gap-6", className)}>
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">Data de admissão</span>

          <span className="text-lg font-medium text-foreground">
            {form.admissionDate ? format(form.admissionDate, "dd/MM/yyyy") : "Não Preenchido"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">Data de aposentadoria</span>

          <span className="text-lg font-medium text-foreground">
            {form.retireeDate ? format(form.retireeDate, "dd/MM/yyyy") : "Não Preenchido"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">Renda mensal (R$)</span>

          <span className="text-lg font-medium text-foreground">
            {form.monthlySalary ? formatPrice(form.monthlySalary) : "Não Preenchido"}
          </span>
        </div>
      </div>

      <div className={cn("w-full grid grid-cols-1 sm:grid-cols-2 gap-6", className)}>
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Descreva quais são as suas funções dentro da sua empresa, se possui funcionários registrados e outras
            informações relacionadas ao seu negócio
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.jobDetails && form.jobDetails.length > 0 ? form.jobDetails : "Não Preenchido"}
          </span>
        </div>
      </div>

      <div className="w-full flex flex-col gap-9">
        {form.previousJobConfirmation && form.previousJobs && form.previousJobs.length > 0 ? (
          form.previousJobs.map((previousJobs, index) => (
            <div key={`previousJobs-${index}`} className="w-full bg-[#D3D3E2] p-5 flex flex-col gap-4">
              <div className="w-full flex flex-col sm:flex-row items-center gap-2">
                <div className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white text-lg font-medium">{index + 1}</span>
                </div>

                <span className="text-foreground text-lg text-center font-medium">Emprego Anterior</span>
              </div>

              <div className="w-full grid grid-cols-1 gap-6">
                <div className="w-full flex flex-col gap-1">
                  <span className="text-sm text-foreground/70 font-medium">Nome do empregador ou empresa anterior</span>

                  <span className="text-lg font-medium text-foreground">
                    {previousJobs.companyName ? previousJobs.companyName : "Não Preenchido"}
                  </span>
                </div>
              </div>

              <div className={cn("w-full grid grid-cols-1 sm:grid-cols-3 gap-6", className)}>
                <div className="w-full flex flex-col gap-1">
                  <span className="text-sm text-foreground/70 font-medium">Endereço completo da empresa</span>

                  <span className="text-lg font-medium text-foreground">
                    {previousJobs.companyAddress ? previousJobs.companyAddress : "Não Preenchido"}
                  </span>
                </div>

                <div className="w-full flex flex-col gap-1">
                  <span className="text-sm text-foreground/70 font-medium">Cidade da empresa</span>

                  <span className="text-lg font-medium text-foreground">
                    {previousJobs.companyCity ? previousJobs.companyCity : "Não Preenchido"}
                  </span>
                </div>
                <div className="w-full flex flex-col gap-1">
                  <span className="text-sm text-foreground/70 font-medium">Estado da empresa</span>

                  <span className="text-lg font-medium text-foreground">
                    {previousJobs.companyState ? previousJobs.companyState : "Não Preenchido"}
                  </span>
                </div>
              </div>

              <div className={cn("w-full grid grid-cols-1 sm:grid-cols-3 gap-6", className)}>
                <div className="w-full flex flex-col gap-1">
                  <span className="text-sm text-foreground/70 font-medium">País da empresa</span>

                  <span className="text-lg font-medium text-foreground">
                    {previousJobs.companyCountry ? previousJobs.companyCountry : "Não Preenchido"}
                  </span>
                </div>

                <div className="w-full flex flex-col gap-1">
                  <span className="text-sm text-foreground/70 font-medium">CEP da empresa</span>

                  <span className="text-lg font-medium text-foreground">
                    {previousJobs.companyCep ? previousJobs.companyCep : "Não Preenchido"}
                  </span>
                </div>

                <div className="w-full flex flex-col gap-1">
                  <span className="text-sm text-foreground/70 font-medium">Telefone da empresa</span>

                  <span className="text-lg font-medium text-foreground">
                    {previousJobs.companyTel ? previousJobs.companyTel : "Não Preenchido"}
                  </span>
                </div>
              </div>

              <div className={cn("w-full grid grid-cols-1 sm:grid-cols-2 gap-6", className)}>
                <div className="w-full flex flex-col gap-1">
                  <span className="text-sm text-foreground/70 font-medium">Cargo / Função</span>

                  <span className="text-lg font-medium text-foreground">
                    {previousJobs.office ? previousJobs.office : "Não Preenchido"}
                  </span>
                </div>

                <div className="w-full flex flex-col gap-1">
                  <span className="text-sm text-foreground/70 font-medium">Nome completo do supervisor</span>

                  <span className="text-lg font-medium text-foreground">
                    {previousJobs.supervisorName ? previousJobs.supervisorName : "Não Preenchido"}
                  </span>
                </div>
              </div>

              <div className={cn("w-full grid grid-cols-1 sm:grid-cols-2 gap-6", className)}>
                <div className="w-full flex flex-col gap-1">
                  <span className="text-sm text-foreground/70 font-medium">Data de admissão</span>

                  <span className="text-lg font-medium text-foreground">
                    {previousJobs.admissionDate ? format(previousJobs.admissionDate, "dd/MM/yyyy") : "Não Preenchido"}
                  </span>
                </div>

                <div className="w-full flex flex-col gap-1">
                  <span className="text-sm text-foreground/70 font-medium">Data de demissão</span>

                  <span className="text-lg font-medium text-foreground">
                    {previousJobs.resignationDate
                      ? format(previousJobs.resignationDate, "dd/MM/yyyy")
                      : "Não Preenchido"}
                  </span>
                </div>
              </div>

              <div className="w-full grid grid-cols-1 gap-6">
                <div className="w-full flex flex-col gap-1">
                  <span className="text-sm text-foreground/70 font-medium">Descrição da tarefa exercida</span>

                  <span className="text-lg font-medium text-foreground">
                    {previousJobs.jobDescription ? previousJobs.jobDescription : "Não Preenchido"}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full bg-[#D3D3E2] p-5 flex items-center justify-center">
            <span className="text-foreground text-lg text-center font-semibold">Não possui emprego anterior</span>
          </div>
        )}
      </div>

      <div className="w-full flex flex-col gap-9">
        {form.courses && form.courses.length > 0 ? (
          form.courses.map((course, index) => (
            <div key={`courses-${index}`} className="w-full bg-[#FDF0D2] p-5 flex flex-col gap-4">
              <div className="w-full flex flex-col sm:flex-row items-center gap-2">
                <div className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white text-lg font-medium">{index + 1}</span>
                </div>

                <span className="text-foreground text-lg text-center font-medium">Instituição de Ensino Anterior</span>
              </div>

              <div className="w-full grid grid-cols-1 gap-6">
                <div className="w-full flex flex-col gap-1">
                  <span className="text-sm text-foreground/70 font-medium">Nome completo da instituição</span>

                  <span className="text-lg font-medium text-foreground">
                    {course.institutionName ? course.institutionName : "Não Preenchido"}
                  </span>
                </div>
              </div>

              <div className={cn("w-full grid grid-cols-1 sm:grid-cols-3 gap-6", className)}>
                <div className="w-full flex flex-col gap-1">
                  <span className="text-sm text-foreground/70 font-medium">Endereço completo da instituição</span>

                  <span className="text-lg font-medium text-foreground">
                    {course.address ? course.address : "Não Preenchido"}
                  </span>
                </div>

                <div className="w-full flex flex-col gap-1">
                  <span className="text-sm text-foreground/70 font-medium">Cidade da instituição</span>

                  <span className="text-lg font-medium text-foreground">
                    {course.city ? course.city : "Não Preenchido"}
                  </span>
                </div>
                <div className="w-full flex flex-col gap-1">
                  <span className="text-sm text-foreground/70 font-medium">Estado da instituição</span>

                  <span className="text-lg font-medium text-foreground">
                    {course.state ? course.state : "Não Preenchido"}
                  </span>
                </div>
              </div>

              <div className={cn("w-full grid grid-cols-1 sm:grid-cols-2 gap-6", className)}>
                <div className="w-full flex flex-col gap-1">
                  <span className="text-sm text-foreground/70 font-medium">País da instituição</span>

                  <span className="text-lg font-medium text-foreground">
                    {course.country ? course.country : "Não Preenchido"}
                  </span>
                </div>

                <div className="w-full flex flex-col gap-1">
                  <span className="text-sm text-foreground/70 font-medium">CEP da instituição</span>

                  <span className="text-lg font-medium text-foreground">
                    {course.cep ? course.cep : "Não Preenchido"}
                  </span>
                </div>
              </div>

              <div className={cn("w-full grid grid-cols-1 sm:grid-cols-3 gap-6", className)}>
                <div className="w-full flex flex-col gap-1">
                  <span className="text-sm text-foreground/70 font-medium">Nome do curso</span>

                  <span className="text-lg font-medium text-foreground">
                    {course.courseName ? course.courseName : "Não Preenchido"}
                  </span>
                </div>

                <div className="w-full flex flex-col gap-1">
                  <span className="text-sm text-foreground/70 font-medium">Data de início</span>

                  <span className="text-lg font-medium text-foreground">
                    {course.initialDate ? format(course.initialDate, "dd/MM/yyyy") : "Não Preenchido"}
                  </span>
                </div>

                <div className="w-full flex flex-col gap-1">
                  <span className="text-sm text-foreground/70 font-medium">Data de término</span>

                  <span className="text-lg font-medium text-foreground">
                    {course.finishDate ? format(course.finishDate, "dd/MM/yyyy") : "Não Preenchido"}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full bg-[#FDF0D2] p-5 flex items-center justify-center">
            <span className="text-foreground text-lg text-center font-semibold">Não possui ensino anterior</span>
          </div>
        )}
      </div>
    </>
  );
}
