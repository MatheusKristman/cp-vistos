import getPrimaryForm from "@/app/actions/getPrimaryForm";
import { PrimaryForm } from "@/components/form/primary-form";
import { Header } from "@/components/global/header";
import { MobileMenu } from "@/components/global/mobile-menu";

export default async function FormPage() {
  const form = await getPrimaryForm();

  return (
    <>
      <Header />
      <MobileMenu />

      <div className="h-full lg:min-h-[calc(100vh-96px)] w-full flex">
        <div className="w-full px-6 mt-6 sm:px-16 sm:mt-10 lg:container lg:mx-auto">
          <div className="w-full flex flex-col items-center gap-4 mb-12 sm:mb-24">
            <h1 className="text-2xl sm:text-3xl text-center font-semibold text-primary">
              Complete seu cadastro
            </h1>
          </div>

          <PrimaryForm />
        </div>
      </div>
    </>
  );
}
