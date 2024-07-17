import getForms from "@/app/actions/getForms";
import { auth } from "@/auth";
import { Forms } from "@/components/dashboard/forms";
import { AddFormButton } from "@/components/dashboard/add-form-button";

export default async function ClientAreaPage() {
  const session = await auth();
  const forms = await getForms();

  return (
    <div className="w-full lg:w-[calc(100%-250px)] px-6 sm:px-16 mt-6 mb-12 lg:mb-24 lg:mt-10 lg:container lg:mx-auto">
      <div className="w-full flex flex-col items-center justify-between gap-6 mb-12 sm:flex-row lg:gap-12">
        <h1 className="text-3xl lg:text-4xl font-medium">Olá {session?.user?.name?.split(" ")[0]}</h1>

        <AddFormButton />
      </div>

      <Forms forms={forms} />
    </div>
  );
}
