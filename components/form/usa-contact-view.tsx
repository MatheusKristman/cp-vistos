import { Form as FormType } from "@prisma/client";

import { cn } from "@/lib/utils";

interface USAContactViewProps {
  form: FormType;
  className?: string;
}

export function USAContactView({ form, className }: USAContactViewProps) {
  return (
    <>
      <div className={cn("w-full grid grid-cols-1 sm:grid-cols-2 gap-6", className)}>
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">Nome completo da pessoa ou organização</span>

          <span className="text-lg font-medium text-foreground">
            {form.organizationOrUSAResidentName && form.organizationOrUSAResidentName.length > 0
              ? form.organizationOrUSAResidentName
              : "Não Preenchido"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">Relação do contato com você</span>

          <span className="text-lg font-medium text-foreground">
            {form.organizationOrUSAResidentRelation && form.organizationOrUSAResidentRelation.length > 0
              ? form.organizationOrUSAResidentRelation
              : "Não Preenchido"}
          </span>
        </div>
      </div>

      <div className={cn("w-full grid grid-cols-1 sm:grid-cols-2 gap-6", className)}>
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">Endereço completo do contato</span>

          <span className="text-lg font-medium text-foreground">
            {form.organizationOrUSAResidentAddress && form.organizationOrUSAResidentAddress.length > 0
              ? form.organizationOrUSAResidentAddress
              : "Não Preenchido"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">ZIP Code do contato</span>

          <span className="text-lg font-medium text-foreground">
            {form.organizationOrUSAResidentZipCode && form.organizationOrUSAResidentZipCode.length > 0
              ? form.organizationOrUSAResidentZipCode
              : "Não Preenchido"}
          </span>
        </div>
      </div>

      <div className={cn("w-full grid grid-cols-1 sm:grid-cols-3 gap-6", className)}>
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">Cidade do contato</span>

          <span className="text-lg font-medium text-foreground">
            {form.organizationOrUSAResidentCity && form.organizationOrUSAResidentCity.length > 0
              ? form.organizationOrUSAResidentCity
              : "Não Preenchido"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">Estado do contato</span>

          <span className="text-lg font-medium text-foreground">
            {form.organizationOrUSAResidentState && form.organizationOrUSAResidentState.length > 0
              ? form.organizationOrUSAResidentState
              : "Não Preenchido"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">País do contato</span>

          <span className="text-lg font-medium text-foreground">
            {form.organizationOrUSAResidentCountry && form.organizationOrUSAResidentCountry.length > 0
              ? form.organizationOrUSAResidentCountry
              : "Não Preenchido"}
          </span>
        </div>
      </div>

      <div className={cn("w-full grid grid-cols-1 sm:grid-cols-2 gap-6", className)}>
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">Telefone do contato</span>

          <span className="text-lg font-medium text-foreground">
            {form.organizationOrUSAResidentTel && form.organizationOrUSAResidentTel.length > 0
              ? form.organizationOrUSAResidentTel
              : "Não Preenchido"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">E-mail do contato</span>

          <span className="text-lg font-medium text-foreground">
            {form.organizationOrUSAResidentEmail && form.organizationOrUSAResidentEmail.length > 0
              ? form.organizationOrUSAResidentEmail
              : "Não Preenchido"}
          </span>
        </div>
      </div>
    </>
  );
}
