//TODO: criar função para pegar os formulários anexados a conta e informar quantos formulários tem

import { ArrowUpRight, Loader2 } from "lucide-react";
import { format } from "date-fns";

import useClientsStore from "@/constants/stores/useClientsStore";
import { UserWithForm } from "@/types";
import axios from "axios";
import { useState } from "react";

interface Props {
  client: UserWithForm;
}

export function ClientItem({ client }: Props) {
  const [isLoading, setLoading] = useState<boolean>(false);

  const { setFormsSelected, openFormModal } = useClientsStore();

  function handleFormModal() {
    setLoading(true);

    axios
      .post("/api/adm/get-forms", { userId: client.id })
      .then((res) => {
        if (res.data.primaryFormCreated) {
          setFormsSelected(res.data.forms);
          openFormModal();
        } else {
          setFormsSelected(null);
          openFormModal();
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div
      onClick={handleFormModal}
      className="w-full flex flex-col gap-4 bg-secondary px-6 py-4 border border-secondary transition-colors lg:cursor-pointer lg:hover:border-primary"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-lg sm:text-xl text-primary font-medium">{`${client.name}`}</span>

        {isLoading ? (
          <Loader2 className="animate-spin" color="#2E3675" />
        ) : (
          <ArrowUpRight color="#2E3675" className="min-w-[24px] min-h-[24px]" />
        )}
      </div>

      <span className="text-base text-primary">Criado em {format(client.form[0].createdAt, "dd/MM/yyyy")}</span>
    </div>
  );
}
