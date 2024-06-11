import getPrimaryForm from "@/app/actions/getPrimaryForm";
import { ContactAndAddressForm } from "@/components/form/contact-and-address-form";
import { PassportForm } from "@/components/form/passport-form";
import { PersonalDataForm } from "@/components/form/personal-data-form";
import { Header } from "@/components/global/header";
import { MobileMenu } from "@/components/global/mobile-menu";
import { cn } from "@/lib/utils";

export default async function FormPage({
  params,
}: {
  params: { step: string };
}) {
  const currentStep = params.step;
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

            <div className="flex items-center gap-2">
              {Array.from(Array(10).keys()).map((key) => (
                <span
                  key={key}
                  className={cn("w-4 h-4 rounded-full border border-primary", {
                    "bg-primary": key === Number(currentStep),
                  })}
                />
              ))}
            </div>
          </div>

          {currentStep === "0" && <PersonalDataForm currentForm={form} />}
          {currentStep === "1" && <ContactAndAddressForm currentForm={form} />}
          {currentStep === "2" && <PassportForm currentForm={form} />}
        </div>
      </div>
    </>
  );
}
