import { format } from "date-fns";

import { type profileFormSchemaType } from "../page";

interface PassportProfileItemProps {
  profile: profileFormSchemaType;
}

export function PassportProfileItem({ profile }: PassportProfileItemProps) {
  return (
    <div className="w-full border border-muted rounded-xl p-4 flex flex-col gap-4">
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="w-full flex flex-col">
          <span className="text-xs font-medium opacity-50">Nome</span>

          <span className="text-base font-medium">{profile.profileName}</span>
        </div>

        <div className="w-full flex flex-col">
          <span className="text-xs font-medium opacity-50">CPF</span>

          <span className="text-base font-medium">{profile.profileCpf}</span>
        </div>

        <div className="w-full flex flex-col">
          <span className="text-xs font-medium opacity-50">
            Data de Nascimento
          </span>

          <span className="text-base font-medium">
            {profile.birthDate
              ? format(profile.birthDate, "dd/MM/yyyy")
              : "--/--/----"}
          </span>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="w-full flex flex-col">
          <span className="text-xs font-medium opacity-50">Endereço</span>

          <span className="text-base font-medium">
            {profile.profileAddress ? profile.profileAddress : "---"}
          </span>
        </div>

        <div className="w-full flex flex-col">
          <span className="text-xs font-medium opacity-50">
            CPF do responsável
          </span>

          <span className="text-base font-medium">
            {profile.responsibleCpf ? profile.responsibleCpf : "---"}
          </span>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="w-full flex flex-col">
          <span className="text-xs font-medium opacity-50">Categoria</span>

          <span className="text-base font-medium">{profile.category}</span>
        </div>

        <div className="w-full flex flex-col">
          <span className="text-xs font-medium opacity-50">Protocolo</span>

          <span className="text-base font-medium">
            {profile.protocol ? profile.protocol : "---"}
          </span>
        </div>

        <div className="w-full flex flex-col">
          <span className="text-xs font-medium opacity-50">
            Status do pagamento
          </span>

          <span className="text-base font-medium">
            {profile.paymentStatus ? profile.paymentStatus : "---"}
          </span>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="w-full flex flex-col">
          <span className="text-xs font-medium opacity-50">
            Data do agendamento
          </span>

          <span className="text-base font-medium">
            {profile.scheduleDate
              ? format(profile.scheduleDate, "dd/MM/yyyy")
              : "--/--/----"}
          </span>
        </div>

        <div className="w-full flex flex-col">
          <span className="text-xs font-medium opacity-50">
            Horário do agendamento
          </span>

          <span className="text-base font-medium">
            {profile.scheduleTime ? profile.scheduleTime : "---"}
          </span>
        </div>

        <div className="w-full flex flex-col">
          <span className="text-xs font-medium opacity-50">
            Local do agendamento
          </span>

          <span className="text-base font-medium">
            {profile.scheduleLocation ? profile.scheduleLocation : "---"}
          </span>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="w-full flex flex-col">
          <span className="text-xs font-medium opacity-50">
            Data de Entrada
          </span>

          <span className="text-base font-medium">
            {profile.entryDate
              ? format(profile.entryDate, "dd/MM/yyyy")
              : "--/--/----"}
          </span>
        </div>
      </div>
    </div>
  );
}
