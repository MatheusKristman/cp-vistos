"use client";

import { FormView } from "@/components/dashboard/form-view";
import { Header } from "@/components/global/header";
import { MobileMenu } from "@/components/global/mobile-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc-client";

export default function FormResumePage({
  params,
}: {
  params: { profileId: string };
}) {
  const profileId = params.profileId;

  const { data } = trpc.formsRouter.getForm.useQuery({ profileId });

  return (
    <>
      <Header />
      <MobileMenu />

      <div className="w-full h-full p-6 sm:px-16 sm:py-12 lg:container lg:mx-auto">
        {!data ? (
          <div className="w-full flex flex-col gap-9 bg-secondary py-8 px-11">
            <div className="w-full flex flex-col items-center justify-between gap-4 sm:flex-row">
              <h2 className="text-2xl text-center text-foreground w-full font-semibold sm:text-left sm:w-fit sm:text-3xl">
                Resumo do formulário
              </h2>

              <Skeleton className="w-full h-12 bg-border rounded-none sm:w-60" />
            </div>

            <div className="w-full flex flex-col gap-9">
              <Skeleton className="w-full h-[108px] bg-border rounded-none" />
              <Skeleton className="w-full h-[108px] bg-border rounded-none" />
              <Skeleton className="w-full h-[108px] bg-border rounded-none" />
              <Skeleton className="w-full h-[108px] bg-border rounded-none" />
              <Skeleton className="w-full h-[108px] bg-border rounded-none" />
              <Skeleton className="w-full h-[108px] bg-border rounded-none" />
              <Skeleton className="w-full h-[108px] bg-border rounded-none" />
              <Skeleton className="w-full h-[108px] bg-border rounded-none" />
              <Skeleton className="w-full h-[108px] bg-border rounded-none" />
              <Skeleton className="w-full h-[108px] bg-border rounded-none" />
              <Skeleton className="w-full h-[108px] bg-border rounded-none" />
            </div>
          </div>
        ) : (
          <FormView form={data.form} profileId={profileId} />
        )}
      </div>
    </>
  );
}
