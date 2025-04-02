import { trpc } from "@/lib/trpc-client";
import { FormServerError } from "../form-server-error";
import { WorkEducationForm } from "./work-education-form";
import { Skeleton } from "@/components/ui/skeleton";

interface WorkEducationWrapperProps {
  profileId: string;
  isEditing: boolean;
  loading: boolean;
}

export const WorkEducationWrapper = ({ profileId, isEditing, loading }: WorkEducationWrapperProps) => {
  const { data: workEducationForm, isPending } = trpc.formsRouter.getWorkEducation.useQuery({ profileId });

  if (isPending || loading) {
    return (
      <div className="w-full flex flex-col flex-grow gap-6">
        <h2 className="w-full text-center text-2xl sm:text-3xl text-foreground font-semibold mb-6">
          Trabalho e Educação
        </h2>

        <div className="w-full flex flex-col gap-12 justify-between flex-grow">
          <div className="w-full flex flex-col">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-6 mb-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-[65%]" />

                <Skeleton className="h-12 w-full rounded-xl !mt-auto" />
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

            <Skeleton className="h-6 w-[80%] mb-6" />

            <Skeleton className="h-[400px] w-full rounded-xl" />
          </div>

          <div className="w-full flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-end">
            <Skeleton className="h-12 w-full rounded-2xl sm:w-40" />

            <Skeleton className="h-12 w-full rounded-2xl sm:w-40" />
          </div>
        </div>
      </div>
    );
  }

  if (!workEducationForm) {
    return <FormServerError />;
  }

  return <WorkEducationForm workEducationForm={workEducationForm} profileId={profileId} isEditing={isEditing} />;
};
