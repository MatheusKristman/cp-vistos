import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <main className="w-full relative mt-[-56px] pt-20 bg-mobile-hero bg-no-repeat bg-[length:100%_100%] sm:pt-40 sm:bg-tablet-hero lg:pt-44 lg:bg-desktop-hero">
      <div className="w-full px-6 sm:px-16 lg:container">
        <div className="w-full flex flex-col gap-12 sm:max-w-xl ">
          <div className="w-full flex flex-col gap-9">
            <div className="w-full flex flex-col gap-4">
              <h1 className="text-5xl font-bold text-foreground !leading-[110%] capitalize sm:text-6xl lg:text-7xl lg:max-w-lg">
                Conquiste seu visto sem estresse
              </h1>

              <p className="text-xl font-medium text-foreground/70 lg:max-w-lg">
                Facilitamos o processo para obter ou renovar seu visto americano, com rapidez e sem complicações.
              </p>
            </div>

            <div className="w-full bg-secondary/50 rounded-[36px] flex flex-col gap-4 items-center p-3 sm:flex-row">
              <Button variant="destructive" className="w-full text-xl font-medium rounded-full">
                Entre em contato
              </Button>

              <Button variant="link" className="w-full text-xl font-medium">
                Conheça nossos serviços
              </Button>
            </div>
          </div>

          <div className="w-full p-6 bg-secondary/10 shadow-[0_4px_15px_rgba(0,0,0,0.3)] rounded-2xl flex flex-col gap-9 items-center sm:flex-row">
            <div className="w-fit flex items-center gap-4 sm:flex-col">
              <Image
                src="/assets/icons/hero-clients.svg"
                alt="Clientes"
                width={38}
                height={38}
                className="object-center object-contain"
              />

              <div className="flex flex-col sm:items-center">
                <p className="text-2xl font-semibold text-foreground sm:text-center">+ 2.000</p>
                <p className="text-xl text-foreground font-medium sm:text-center">Clientes</p>
              </div>
            </div>

            <div className="w-full h-[2px] bg-secondary rounded-full shrink-0 sm:w-[2px] sm:h-28" />

            <div className="w-fit flex items-center gap-4 sm:flex-col">
              <Image
                src="/assets/icons/hero-approved.svg"
                alt="Aprovação"
                width={38}
                height={38}
                className="object-center object-contain"
              />

              <div className="flex flex-col sm:items-center">
                <p className="text-2xl font-semibold text-foreground sm:text-center">98%</p>
                <p className="text-xl text-foreground font-medium sm:text-center">De Aprovação</p>
              </div>
            </div>

            <div className="w-full h-[2px] bg-secondary rounded-full shrink-0 sm:w-[2px] sm:h-28" />

            <div className="w-fit flex items-center gap-4 sm:flex-col">
              <Image
                src="/assets/icons/hero-experience.svg"
                alt="Experiência"
                width={38}
                height={38}
                className="object-center object-contain"
              />

              <div className="flex flex-col sm:items-center">
                <p className="text-2xl font-semibold text-foreground sm:text-center">20 Anos</p>
                <p className="text-xl text-foreground font-medium sm:text-center">De Experiência</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:absolute lg:top-44 lg:right-0 lg:w-2/5 lg:h-[700px]">
        <Image
          src="/assets/images/hero-image.webp"
          alt="Disneyland"
          fill
          className="object-center object-cover rounded-l-[60px]"
        />

        <div className="px-6 py-4 rounded-l-[30px] bg-white border border-r-0 border-secondary flex flex-col absolute z-10 -bottom-8 right-0">
          <h3 className="text-2xl font-semibold text-foreground">Disneyland</h3>

          <p className="text-base font-medium text-foreground/70">Orlando - Flórida</p>
        </div>
      </div>
    </main>
  );
}
