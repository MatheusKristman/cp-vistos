import { FormView } from "@/components/dashboard/form-view";
import { LogoutButton } from "@/components/dashboard/logout-button";

export default async function ClientAreaPage() {
  return (
    <div className="w-full lg:w-[calc(100%-250px)] px-6 sm:px-16 mt-6 lg:mt-10 lg:container lg:mx-auto">
      <div className="w-full flex items-center justify-between gap-12 mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium">Área do Cliente</h1>

        <LogoutButton />
      </div>

      <FormView />
    </div>
  );
}
