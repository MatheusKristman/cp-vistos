"use client";

import { Loader2, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { Input } from "@/components/ui/input";
import { ProfileFormBox } from "@/components/dashboard/profile-form-box";
import { trpc } from "@/lib/trpc-client";
import { Skeleton } from "@/components/ui/skeleton";

export default function ClientAreaPage() {
  const session = useSession();

  const { data } = trpc.clientRouter.getProfiles.useQuery();

  if (session.status === "loading") {
    return (
      <div className="w-screen h-[calc(100vh-96px)] flex flex-col gap-4 items-center justify-center">
        <Loader2 size={100} strokeWidth={1} className="animate-spin" />

        <span className="text-center text-2xl font-semibold text-primary">Um momento...</span>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-[calc(100%-250px)] px-6 sm:px-16 mt-6 mb-12 lg:mb-24 lg:mt-10 lg:container lg:mx-auto">
      <div className="w-full flex flex-col items-center justify-between gap-6 mb-12 sm:flex-row lg:gap-12">
        <h1 className="text-3xl lg:text-4xl font-medium">Olá {session.data?.user?.name?.split(" ")[0]}</h1>

        <div className="h-12 flex items-center gap-2 border border-muted transition duration-300 bg-background px-3 py-2 text-sm group focus-within:border-primary hover:border-border w-full sm:max-w-xs">
          <Search className="w-5 h-5 text-border flex-shrink-0" strokeWidth={1.5} />

          <div className="w-[2px] flex-shrink-0 h-full bg-muted rounded-full" />

          <Input
            placeholder="Pesquise seu formulário"
            className="flex h-full w-full transition border-0 duration-300 bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0  disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-x-6 gap-y-9 md:grid md:grid-cols-2">
        {data !== undefined ? (
          data.profiles.map((profile) => (
            <ProfileFormBox
              key={profile.id}
              statusForm="awaiting"
              statusDS={profile.statusDS}
              profileName={profile.name}
              CASVDate={profile.CASVDate}
              interviewDate={profile.interviewDate}
              DSNumber={profile.DSNumber}
              updatedAt={profile.updatedAt}
            />
          ))
        ) : (
          // TODO: adicionar skeleton
          <>
            <Skeleton className="w-full h-80" />
            <Skeleton className="w-full h-80" />
            <Skeleton className="w-full h-80" />
          </>
        )}
      </div>
    </div>
  );
}
