"use client";

//TODO: criar função para buscar os clientes
//TODO: criar função para pegar todos os clientes quando entrar nessa pagina
//TODO: criar função para abrir modal com os formulários e se está completo
//TODO: criar função para caso o usuário não seja admin, redirecionar para a pagina correta

import { ChangeEvent, useEffect, useState } from "react";
import { Loader2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import axios from "axios";

import { ClientItem } from "@/components/dashboard/client-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormModal } from "@/components/dashboard/form-modal";
import { UserWithForm } from "@/types";

export default function ClientsPage() {
  const [users, setUsers] = useState<UserWithForm[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserWithForm[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const session = useSession();
  const router = useRouter();

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.replace("/");
      toast.error("Usuário não autorizado");
    }
  }, [session, router]);

  useEffect(() => {
    setLoading(true);

    axios
      .get("/api/adm/get-users")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchValue.length > 3) {
      const userFilter = users.filter((user) => `${user.email}`.includes(searchValue));
      setFilteredUsers(userFilter);
    } else {
      setFilteredUsers([]);
    }

    return () => {
      setFilteredUsers([]);
    };
  }, [searchValue]);

  useEffect(() => {
    console.log(filteredUsers);
  }, [filteredUsers]);

  return (
    <>
      <div className="w-full lg:w-[calc(100%-250px)] px-6 sm:px-16 mt-6 lg:mt-10">
        <div className="w-full flex flex-col gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium">Clientes</h1>

          <div className="w-full flex items-center gap-2">
            <Input
              placeholder="Pesquise seu cliente"
              className="placeholder:text-primary/60"
              value={searchValue}
              onChange={handleSearch}
            />

            <Button variant="link" size="icon">
              <Search />
            </Button>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 min-[375px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {isLoading ? (
            <div className="mt-12 w-full flex flex-col gap-2 items-center justify-center col-span-2 sm:col-span-3 lg:col-span-4 xl:col-span-5">
              <Loader2 className="animate-spin" size={70} />
              <span className="text-lg font-medium">Carregando...</span>
            </div>
          ) : searchValue.length > 3 && filteredUsers.length > 0 ? (
            filteredUsers.map((client) => <ClientItem key={client.id} client={client} />)
          ) : searchValue.length > 3 && filteredUsers.length === 0 ? (
            <div className="mt-12 w-full flex flex-col gap-2 items-center justify-center col-span-2 sm:col-span-3 lg:col-span-4 xl:col-span-5">
              <span className="text-center text-lg font-medium opacity-60 md:text-xl">Nenhum usuário encontrado</span>
            </div>
          ) : users.length > 0 ? (
            users.map((client) => <ClientItem key={client.id} client={client} />)
          ) : (
            <div className="mt-12 w-full flex flex-col gap-2 items-center justify-center col-span-2 sm:col-span-3 lg:col-span-4 xl:col-span-5">
              <span className="text-center text-lg font-medium opacity-60 md:text-xl">
                Nenhum usuário cadastrado no momento
              </span>
            </div>
          )}
        </div>
      </div>

      <FormModal />
    </>
  );
}
