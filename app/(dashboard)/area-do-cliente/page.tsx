import getForms from "@/app/actions/getForms";
import { Forms } from "@/components/dashboard/forms";
import { LogoutButton } from "@/components/dashboard/logout-button";

export default async function ClientAreaPage() {
  const forms = await getForms();

  return (
    <div className="w-full lg:w-[calc(100%-250px)] px-6 sm:px-16 mt-6 mb-12 lg:mb-24 lg:mt-10 lg:container lg:mx-auto">
      <div className="w-full flex items-center justify-between gap-12 mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium">Área do Cliente</h1>

        <LogoutButton />
      </div>

      <Forms forms={forms} />
    </div>
  );
}
