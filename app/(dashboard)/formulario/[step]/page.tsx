import { PersonalDataForm } from "@/components/form/personal-data-form";
import { Header } from "@/components/global/header";
import { MobileMenu } from "@/components/global/mobile-menu";
import { cn } from "@/lib/utils";

export default function FormPage({ params }: { params: { step: string } }) {
  const currentStep = params.step;

  return (
    <>
      <Header />
      <MobileMenu />

      <div className="h-full lg:min-h-[calc(100vh-96px)] w-full flex">
        <div className="w-full px-6 mt-6">
          <div className="w-full flex flex-col items-center gap-4 mb-12">
            <h1 className="text-2xl text-center font-semibold text-primary">Complete seu cadastro</h1>

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

          {currentStep === "0" && <PersonalDataForm />}
        </div>
      </div>
    </>
  );
}
