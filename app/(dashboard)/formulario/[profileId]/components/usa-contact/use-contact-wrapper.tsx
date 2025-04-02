import { USAContactForm } from "./usa-contact-form";
import { FormServerError } from "../form-server-error";

import { trpc } from "@/lib/trpc-client";
import { Skeleton } from "@/components/ui/skeleton";

interface USAContactWrapperProps {
  profileId: string;
  isEditing: boolean;
  loading: boolean;
}

export const USAContactWrapper = ({ profileId, isEditing, loading }: USAContactWrapperProps) => {
  const { data: usaContactForm, isPending } = trpc.formsRouter.getUSAContact.useQuery({ profileId });

  if (isPending || loading) {
    return (
      <div className="w-full flex flex-col flex-grow gap-6">
        <h2 className="w-full text-center text-2xl sm:text-3xl text-foreground font-semibold mb-6">
          Contato nos Estados Unidos
        </h2>

        <div className="w-full flex flex-col gap-12 justify-between flex-grow">
          <div className="w-full flex flex-col">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-[20%]" />

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

          <div className="w-full flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-end">
            <Skeleton className="h-12 w-full rounded-2xl sm:w-40" />

            <Skeleton className="h-12 w-full rounded-2xl sm:w-40" />
          </div>
        </div>
      </div>
    );
  }

  if (!usaContactForm) {
    return <FormServerError />;
  }

  return <USAContactForm usaContactForm={usaContactForm} profileId={profileId} isEditing={isEditing} />;
};
