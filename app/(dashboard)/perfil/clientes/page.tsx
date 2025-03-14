"use client";

import { redirect, usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";

import { E_TA } from "./components/e-ta";
import { Passport } from "./components/passport";
import { AmericanVisa } from "./components/american-visa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientDetailsModal } from "@/components/dashboard/client-details-modal";

function ClientsComponent() {
  const [category, setCategory] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const session = useSession();

  useEffect(() => {
    let queryCategory = searchParams.get("category");

    if (
      !queryCategory ||
      (queryCategory !== "american_visa" && queryCategory !== "passport" && queryCategory !== "e_ta")
    ) {
      queryCategory = "american_visa";

      router.push(pathname + `?category=${queryCategory}`);
    }

    setCategory(queryCategory);
  }, [searchParams, router]);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      toast.error("Usuário não autorizado");
      redirect("/");
    }
  }, [session]);

  function handleCategory(value: string) {
    setCategory(value);

    router.push(pathname + `?category=${value}`);
  }

  return (
    <>
      <div className="w-full lg:w-[calc(100%-250px)] px-6 sm:px-16 lg:ml-[250px] lg:px-40">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 mt-6 lg:mt-12">Clientes Ativos</h1>

        <Tabs value={category} onValueChange={handleCategory}>
          <TabsList className="w-full flex-col h-fit sm:flex-row rounded-xl">
            <TabsTrigger value="american_visa" className="w-full h-10 rounded-lg sm:text-base sm:font-semibold">
              Visto Americano
            </TabsTrigger>
            <TabsTrigger value="passport" className="w-full h-10 rounded-lg sm:text-base sm:font-semibold">
              Passaporte
            </TabsTrigger>
            <TabsTrigger value="e_ta" className="w-full h-10 rounded-lg sm:text-base sm:font-semibold">
              E-TA
            </TabsTrigger>
          </TabsList>

          <TabsContent value="american_visa">
            <AmericanVisa />
          </TabsContent>

          <TabsContent value="passport">
            <Passport />
          </TabsContent>

          <TabsContent value="e_ta">
            <E_TA />
          </TabsContent>
        </Tabs>
      </div>

      <ClientDetailsModal />
    </>
  );
}

export default function ClientsPage() {
  return (
    <Suspense>
      <ClientsComponent />
    </Suspense>
  );
}
