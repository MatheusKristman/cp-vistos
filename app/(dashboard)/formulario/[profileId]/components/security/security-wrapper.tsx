import { trpc } from "@/lib/trpc-client";
import { FormServerError } from "../form-server-error";
import { SecurityForm } from "./security-form";
import { Skeleton } from "@/components/ui/skeleton";

interface SecurityWrapperProps {
  profileId: string;
  isEditing: boolean;
  loading: boolean;
}

export const SecurityWrapper = ({ profileId, isEditing, loading }: SecurityWrapperProps) => {
  const { data: securityForm, isPending } = trpc.formsRouter.getSecurity.useQuery({ profileId });

  if (isPending || loading) {
    return (
      <div className="w-full flex flex-col flex-grow gap-6">
        <h2 className="w-full text-center text-2xl sm:text-3xl text-foreground font-semibold mb-6">Segurança</h2>

        <div className="w-full flex flex-col gap-12 justify-between flex-grow">
          <div className="w-full flex flex-col">
            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
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

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[40%]" />

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

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[60%]" />

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

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[80%]" />

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

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[30%]" />

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

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
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

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
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

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[50%]" />

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

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[30%]" />

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

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
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

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
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

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[60%]" />

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

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[40%]" />

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

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[80%]" />

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

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[30%]" />

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

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[90%]" />

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

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[30%]" />

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

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
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

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6"></div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[40%]" />

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

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
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

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
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

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[40%]" />

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

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[90%]" />

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

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
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

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-[30%]" />

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

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6">
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
          </div>

          <div className="w-full flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-end">
            <Skeleton className="h-12 w-full rounded-2xl sm:w-40" />

            <Skeleton className="h-12 w-full rounded-2xl sm:w-40" />
          </div>
        </div>
      </div>
    );
  }

  if (!securityForm) {
    return <FormServerError />;
  }

  return <SecurityForm securityForm={securityForm} profileId={profileId} isEditing={isEditing} />;
};
