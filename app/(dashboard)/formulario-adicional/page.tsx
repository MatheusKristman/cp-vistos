export const dynamic = "force-dynamic";

import { AdditionalForm } from "@/components/form/additional-form";
import { FormNav } from "@/components/form/form-nav";
import { Header } from "@/components/global/header";
import { MobileMenu } from "@/components/global/mobile-menu";

export default async function additionalFormPage() {
  return (
    <>
      <Header />
      <MobileMenu />

      <div className="relative h-full lg:min-h-[calc(100vh-96px)] w-full lg:flex">
        <FormNav />

        <div className="w-full px-6 mt-6 sm:px-16 sm:mt-10 lg:container lg:mx-auto">
          <div className="w-full flex flex-col items-center gap-4 mb-12 sm:mb-24">
            <h1 className="text-2xl sm:text-3xl text-center font-semibold text-foreground">
              Preencha os dados do novo formulário
            </h1>
          </div>

          <AdditionalForm currentForm={primaryForm} />
        </div>
      </div>
    </>
  );
}
