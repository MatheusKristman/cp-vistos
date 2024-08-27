"use client";

import { FormView } from "@/components/dashboard/form-view";
import { Header } from "@/components/global/header";
import { MobileMenu } from "@/components/global/mobile-menu";
import { trpc } from "@/lib/trpc-client";
import { format } from "date-fns";
import { formatPhoneNumber } from "react-phone-number-input";

export default function FormResumePage({ params }: { params: { profileId: string } }) {
  const profileId = params.profileId;

  const { data } = trpc.formsRouter.getForm.useQuery({ profileId });

  return (
    <>
      <Header />
      <MobileMenu />

      <div className="w-full h-full p-6 sm:px-16 sm:py-12 lg:container lg:mx-auto">
        {!data ? (
          <div>
            <span>Loading...</span>
          </div>
        ) : (
          <FormView form={data.form} profileId={profileId} />
        )}
      </div>
    </>
  );
}
