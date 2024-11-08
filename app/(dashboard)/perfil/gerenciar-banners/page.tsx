"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Edit, FileX, Loader2, Trash2 } from "lucide-react";
import { trpc } from "@/lib/trpc-client";

export default function ManageBannersPage() {
  const { data, isPending } = trpc.websiteRouter.getBanners.useQuery();

  console.log(data);

  return (
    <div className="w-full lg:w-[calc(100%-250px)] px-6 sm:px-16 lg:ml-[250px] lg:px-40">
      <div className="w-full flex flex-col gap-4 items-center my-6 sm:flex-row sm:items-end sm:justify-between lg:my-12">
        <h1 className="text-2xl lg:text-3xl xl:text-4xl font-semibold">Banners</h1>

        <Button size="xl" className="w-full sm:w-fit" asChild>
          <Link href="/perfil/gerenciar-banners/adicionar">Adicionar Banner</Link>
        </Button>
      </div>

      <div className="w-full flex flex-col gap-6 my-12">
        {isPending ? (
          <div className="w-full flex flex-col gap-2 items-center justify-center">
            <Loader2 className="animate-spin size-12" />
            <span className="text-lg font-medium">Carregando banners...</span>
          </div>
        ) : data !== undefined && data.banners.length > 0 ? (
          data.banners.map((banner) => (
            <div key={banner.id} className="w-full flex flex-col items-center gap-6">
              <div className="relative w-full rounded-xl overflow-hidden flex justify-end sm:rounded-3xl">
                <Image
                  src={banner.imageUrl}
                  alt="Banner 1"
                  fill
                  className="object-cover object-center absolute top-0 left-0 right-0 bottom-0"
                />

                <div className="w-full flex flex-col gap-6 relative z-10 p-12 pb-20 bg-gradient-to-b from-transparent to-[#262525] sm:bg-gradient-to-r sm:items-end md:bg-gradient-to-b">
                  <div className="w-full flex flex-col gap-2 sm:w-1/2 md:w-full lg:w-1/2">
                    <h5 className="text-xl font-bold text-white lg:text-3xl">{banner.title}</h5>

                    <p className="text-white font-medium text-base lg:text-xl">{banner.desc}</p>
                  </div>

                  <div className="w-full sm:w-1/2 md:w-full lg:w-1/2">
                    <Button variant="secondary" className="pointer-events-none">
                      {banner.btnText}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col items-center gap-4 sm:flex-row">
                <Button variant="outline" size="xl" className="w-full flex items-center gap-2">
                  Editar
                  <Edit />
                </Button>

                <Button variant="destructive" size="xl" className="w-full flex items-enter gap-2">
                  Excluir
                  <Trash2 />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full flex flex-col gap-2 items-center justify-center">
            <FileX className="size-12 text-muted" />

            <span className="text-lg font-medium text-muted">Nenhum banner cadastrado</span>
          </div>
        )}
      </div>
    </div>
  );
}
