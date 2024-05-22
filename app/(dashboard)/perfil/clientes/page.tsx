//TODO: criar função para buscar os clientes
//TODO: criar função para pegar todos os clientes quando entrar nessa pagina
//TODO: criar função para abrir modal com os formulários e se está completo

import { Search } from "lucide-react";

import { ClientItem } from "@/components/dashboard/client-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clients } from "@/constants/dashboard-clients-test";

export default function ClientsPage() {
  return (
    <div className="w-full lg:w-[calc(100%-250px)] px-6 sm:px-16 mt-6 lg:mt-10">
      <div className="w-full flex flex-col gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium">
          Clientes
        </h1>

        <div className="w-full flex items-center gap-2">
          <Input
            placeholder="Pesquise seu cliente"
            className="placeholder:text-primary/60"
          />

          <Button variant="link" size="icon">
            <Search />
          </Button>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 min-[375px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {clients.map((client) => (
          <ClientItem
            key={client.name}
            name={client.name}
            createdAt={client.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
