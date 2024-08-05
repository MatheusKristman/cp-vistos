"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Filter, ListFilter, Loader2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import axios from "axios";

import { ClientItem } from "@/components/dashboard/client-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormModal } from "@/components/dashboard/form-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserWithForm } from "@/types";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        if (error.response.status === 401) {
          router.replace("/");
          toast.error("Usuário não autorizado");
        } else {
          console.error(error);
          toast.error(error.response.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchValue.length > 3) {
      const userFilter = users.filter(
        (user) =>
          user.email
            .toLowerCase()
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
            .includes(
              searchValue
                .toLowerCase()
                .normalize("NFD")
                .replace(/\p{Diacritic}/gu, ""),
            ) ||
          user.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
            .includes(
              searchValue
                .toLowerCase()
                .normalize("NFD")
                .replace(/\p{Diacritic}/gu, ""),
            ),
      );
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
      <div className="w-full px-6 sm:px-16 lg:ml-[250px] lg:px-40">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 mt-6 lg:mt-12">
          Clientes
        </h1>

        <div className="w-full flex items-center justify-between gap-2">
          <div className="h-12 flex items-center gap-2 border border-muted transition duration-300 bg-background px-3 py-2 text-sm group focus-within:border-primary hover:border-border w-full sm:max-w-xs">
            <Search
              className="w-5 h-5 text-border flex-shrink-0"
              strokeWidth={1.5}
            />

            <div className="w-[2px] flex-shrink-0 h-full bg-muted rounded-full" />

            <Input
              placeholder="Pesquise seus clientes"
              className="flex h-full w-full transition border-0 duration-300 bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0  disabled:cursor-not-allowed disabled:opacity-50"
              value={searchValue}
              onChange={handleSearch}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" size="icon" className="flex-shrink-0">
                <ListFilter />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-[600px] bg-white p-8 rounded-none"
            >
              <h4 className="text-2xl font-semibold text-foreground mb-9">
                Filtro
              </h4>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 w-full">
                  <Label
                    className="text-base font-medium text-foreground"
                    htmlFor="orderClients"
                  >
                    Ordem dos clientes
                  </Label>

                  <Select name="orderClients">
                    <SelectTrigger className="text-left">
                      <SelectValue placeholder="Selecione a ordem dos clientes" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="asc">Crescente</SelectItem>
                      <SelectItem value="desc">Decrescente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <Label
                    className="text-base font-medium text-foreground"
                    htmlFor="validDSDate"
                  >
                    Data de Validação do DS
                  </Label>

                  <Select name="validDSDate">
                    <SelectTrigger className="text-left">
                      <SelectValue placeholder="Selecione a data de validação do DS" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="asc">Crescente</SelectItem>
                      <SelectItem value="desc">Decrescente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <Label
                    className="text-base font-medium text-foreground"
                    htmlFor="CASVDate"
                  >
                    Data do CASV
                  </Label>

                  <Select name="CASVDate">
                    <SelectTrigger className="text-left">
                      <SelectValue placeholder="Selecione a data do CASV" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="asc">Crescente</SelectItem>
                      <SelectItem value="desc">Decrescente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <Label
                    className="text-base font-medium text-foreground"
                    htmlFor="interviewDate"
                  >
                    Data da Entrevista
                  </Label>

                  <Select name="interviewDate">
                    <SelectTrigger className="text-left">
                      <SelectValue placeholder="Selecione a data de entrevista" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="asc">Crescente</SelectItem>
                      <SelectItem value="desc">Decrescente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <Label
                    className="text-base font-medium text-foreground"
                    htmlFor="meetingDate"
                  >
                    Data da Reunião
                  </Label>

                  <Select name="meetingDate">
                    <SelectTrigger className="text-left">
                      <SelectValue placeholder="Selecione a data da reunião" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="asc">Crescente</SelectItem>
                      <SelectItem value="desc">Decrescente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <Label
                    className="text-base font-medium text-foreground"
                    htmlFor="statusDS"
                  >
                    Status do DS
                  </Label>

                  <Select name="statusDS">
                    <SelectTrigger className="text-left">
                      <SelectValue placeholder="Selecione o status da DS" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="awaiting">Aguardando</SelectItem>
                      <SelectItem value="filling">Preenchendo</SelectItem>
                      <SelectItem value="filled">Preenchido</SelectItem>
                      <SelectItem value="emitted">Emitido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="w-full grid grid-cols-1 min-[375px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {isLoading ? (
            <div className="mt-12 w-full flex flex-col gap-2 items-center justify-center col-span-2 sm:col-span-3 lg:col-span-4 xl:col-span-5">
              <Loader2 className="animate-spin" size={70} />
              <span className="text-lg font-medium">Carregando...</span>
            </div>
          ) : searchValue.length > 3 && filteredUsers.length > 0 ? (
            filteredUsers.map((client) => (
              <ClientItem key={client.id} client={client} />
            ))
          ) : searchValue.length > 3 && filteredUsers.length === 0 ? (
            <div className="mt-12 w-full flex flex-col gap-2 items-center justify-center col-span-2 sm:col-span-3 lg:col-span-4 xl:col-span-5">
              <span className="text-center text-lg font-medium opacity-60 md:text-xl">
                Nenhum usuário encontrado
              </span>
            </div>
          ) : users.length > 0 ? (
            users.map((client) => (
              <ClientItem key={client.id} client={client} />
            ))
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
