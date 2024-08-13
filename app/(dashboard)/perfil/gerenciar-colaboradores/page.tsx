import { Button } from "@/components/ui/button";
import { CollaboratorBox } from "./components/collaborator-box";

export default function CollaboratorManagementPage() {
  return (
    <div className="w-full lg:w-[calc(100%-250px)] px-6 sm:px-16 lg:ml-[250px] lg:px-40">
      <div className="w-full flex flex-col gap-4 items-center my-6 sm:flex-row sm:items-end sm:justify-between lg:my-12">
        <h1 className="text-2xl lg:text-3xl xl:text-4xl font-semibold">Colaboradores</h1>

        <Button size="xl" className="w-full sm:w-fit">
          Adicionar Colaborador
        </Button>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
        <CollaboratorBox />
        <CollaboratorBox />
        <CollaboratorBox />
      </div>
    </div>
  );
}
