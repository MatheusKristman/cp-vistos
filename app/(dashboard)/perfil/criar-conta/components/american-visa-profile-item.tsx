import { type profileFormSchemaType } from "../page";

interface AmericanVisaProfileItemProps {
  profile: profileFormSchemaType;
}

export function AmericanVisaProfileItem({ profile }: AmericanVisaProfileItemProps) {
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
          <span className="text-xs font-medium opacity-50">Data de Nascimento</span>

          <span className="text-base font-medium">{profile.birthDate ? profile.birthDate : "--/--/----"}</span>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="w-full flex flex-col">
          <span className="text-xs font-medium opacity-50">Endereço</span>

          <span className="text-base font-medium">{profile.profileAddress ? profile.profileAddress : "---"}</span>
        </div>

        <div className="w-full flex flex-col">
          <span className="text-xs font-medium opacity-50">Passaporte</span>

          <span className="text-base font-medium">{profile.passport ? profile.passport : "---"}</span>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="w-full flex flex-col">
          <span className="text-xs font-medium opacity-50">Categoria</span>

          <span className="text-base font-medium">{profile.category}</span>
        </div>

        <div className="w-full flex flex-col">
          <span className="text-xs font-medium opacity-50">Classe do Visto</span>

          <span className="text-base font-medium">{profile.visaClass}</span>
        </div>

        <div className="w-full flex flex-col">
          <span className="text-xs font-medium opacity-50">Tipo de Visto</span>

          <span className="text-base font-medium">{profile.visaType}</span>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="w-full flex flex-col">
          <span className="text-xs font-medium opacity-50">Data de Emissão</span>

          <span className="text-base font-medium">{profile.issuanceDate ? profile.issuanceDate : "--/--/----"}</span>
        </div>

        <div className="w-full flex flex-col">
          <span className="text-xs font-medium opacity-50">Data de Expiração</span>

          <span className="text-base font-medium">{profile.expireDate ? profile.expireDate : "--/--/----"}</span>
        </div>

        <div className="w-full flex flex-col">
          <span className="text-xs font-medium opacity-50">Barcode</span>

          <span className="text-base font-medium">{profile.DSNumber ? profile.DSNumber : "---"}</span>
        </div>
      </div>
    </div>
  );
}
