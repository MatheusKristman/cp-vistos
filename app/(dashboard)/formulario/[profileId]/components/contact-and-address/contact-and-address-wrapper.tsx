import { Skeleton } from "@/components/ui/skeleton";
import { ContactAndAddressForm } from "./contact-and-address-form";

import { trpc } from "@/lib/trpc-client";
import { FormServerError } from "../form-server-error";

interface ContactAndAddressWrapperProps {
  profileId: string;
  isEditing: boolean;
  loading: boolean;
}

export const ContactAndAddressWrapper = ({ profileId, isEditing, loading }: ContactAndAddressWrapperProps) => {
  const { data: contactAndAddressForm, isPending } = trpc.formsRouter.getConctactAndAddress.useQuery({ profileId });

  if (isPending || loading) {
    return (
      <div className="w-full flex flex-col flex-grow gap-6">
        <h2 className="w-full text-center text-2xl sm:text-3xl text-foreground font-semibold mb-6">
          Endereço e Contatos
        </h2>

        <Skeleton className="h-6 w-[200px]" />

        <div className="w-full flex flex-col gap-12 justify-between flex-grow">
          <div className="w-full flex flex-col">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 mb-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-[50%]" />

                <Skeleton className="h-12 w-full rounded-xl !mt-auto" />
              </div>

              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-[40%]" />

                <Skeleton className="h-12 w-full rounded-xl !mt-auto" />
              </div>

              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-[20%]" />

                <Skeleton className="h-12 w-full rounded-xl !mt-auto" />
              </div>

              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-[25%]" />

                <Skeleton className="h-12 w-full rounded-xl !mt-auto" />
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-x-4 gap-y-6 mb-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-[10%]" />

                <Skeleton className="h-12 w-full rounded-xl !mt-auto" />
              </div>

              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-[15%]" />

                <Skeleton className="h-12 w-full rounded-xl !mt-auto" />
              </div>

              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-[15%]" />

                <Skeleton className="h-12 w-full rounded-xl !mt-auto" />
              </div>

              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-[10%]" />

                <Skeleton className="h-12 w-full rounded-xl !mt-auto" />
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-10">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[70%]" />

                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2 space-y-0">
                    <Skeleton className="h-6 w-[60px]" />
                  </div>

                  <div className="flex items-center space-x-2 space-y-0">
                    <Skeleton className="h-6 w-[60px]" />
                  </div>
                </div>
              </div>
            </div>

            <Skeleton className="h-6 w-[150px]" />

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-6 mb-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-[10%]" />

                <Skeleton className="h-12 w-full rounded-xl !mt-auto" />
              </div>

              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-[7%]" />

                <Skeleton className="h-12 w-full rounded-xl !mt-auto" />
              </div>

              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-[10%]" />

                <Skeleton className="h-12 w-full rounded-xl !mt-auto" />
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[70%]" />

                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2 space-y-0">
                    <Skeleton className="h-6 w-[60px]" />
                  </div>

                  <div className="flex items-center space-x-2 space-y-0">
                    <Skeleton className="h-6 w-[60px]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-10">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[70%]" />

                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2 space-y-0">
                    <Skeleton className="h-6 w-[60px]" />
                  </div>

                  <div className="flex items-center space-x-2 space-y-0">
                    <Skeleton className="h-6 w-[60px]" />
                  </div>
                </div>
              </div>
            </div>

            <Skeleton className="h-6 w-[250px]" />

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-[20%]" />

                <Skeleton className="h-12 w-full rounded-xl !mt-auto" />
              </div>

              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-[20%]" />

                <Skeleton className="h-12 w-full rounded-xl !mt-auto" />
              </div>

              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-[20%]" />

                <Skeleton className="h-12 w-full rounded-xl !mt-auto" />
              </div>

              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-[20%]" />

                <Skeleton className="h-12 w-full rounded-xl !mt-auto" />
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-end">
            <Skeleton className="h-12 w-full rounded-2xl sm:w-40" />

            <Skeleton className="h-12 w-full rounded-2xl sm:w-40" />
          </div>
        </div>
      </div>
    );
  }

  if (!contactAndAddressForm) {
    return <FormServerError />;
  }

  return (
    <ContactAndAddressForm contactAndAddressForm={contactAndAddressForm} isEditing={isEditing} profileId={profileId} />
  );
};
