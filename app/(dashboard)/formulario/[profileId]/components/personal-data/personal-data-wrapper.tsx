import { PersonalDataForm } from "../personal-data-form";
import { Skeleton } from "@/components/ui/skeleton";

import { trpc } from "@/lib/trpc-client";

interface PersonalDataWrapperProps {
  profileId: string;
  isEditing: boolean;
}

export const PersonalDataWrapper = ({ profileId, isEditing }: PersonalDataWrapperProps) => {
  const { data: personalDataForm, isPending: isPersonalDataPending } = trpc.formsRouter.getPersonalData.useQuery({
    profileId,
  });

  if (isPersonalDataPending) {
    return (
      <div className="w-full flex flex-col flex-grow gap-12">
        <h2 className="w-full text-center text-2xl sm:text-3xl text-foreground font-semibold">Dados Pessoais</h2>

        <div className="w-full flex flex-col gap-12 justify-between flex-grow">
          <div className="w-full flex flex-col">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-6 mb-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[40%]" />

                <Skeleton className="h-12 w-full rounded-xl !mt-auto" />
              </div>

              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[50%]" />

                <Skeleton className="h-12 w-full rounded-xl !mt-auto" />
              </div>

              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[10%]" />

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

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-6 mb-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[20%]" />

                <Skeleton className="h-12 w-full rounded-xl !mt-auto" />
              </div>

              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[25%]" />

                <Skeleton className="h-12 w-full rounded-xl !mt-auto" />
              </div>

              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[25%]" />

                <Skeleton className="h-12 w-full rounded-xl !mt-auto" />
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-6 mb-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[30%]" />

                <Skeleton className="h-12 w-full rounded-xl !mt-auto" />
              </div>

              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[35%]" />

                <Skeleton className="h-12 w-full rounded-xl !mt-auto" />
              </div>

              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[25%]" />

                <Skeleton className="h-12 w-full rounded-xl !mt-auto" />
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[40%]" />

                <Skeleton className="h-12 w-full rounded-xl !mt-auto" />
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-6 mb-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[45%]" />

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

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[80%]" />

                <Skeleton className="h-12 w-full rounded-xl !mt-auto" />
              </div>

              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[75%]" />

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

  if (!personalDataForm) {
    return (
      <div>
        <div>Error...</div>
      </div>
    );
  }

  return <PersonalDataForm personalDataForm={personalDataForm} profileId={profileId} isEditing={isEditing} />;
};
