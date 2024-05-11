import { Button } from "@/components/ui/button";
import { HeroCarousel } from "./hero-carousel";

export function HomeHero() {
  return (
    <main className="w-full flex flex-col sm:flex-row lg:grid lg:grid-cols-2">
      <div className="w-full px-6 sm:px-9 lg:px-20 py-24 bg-secondary flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-4 max-w-xs lg:max-w-xl">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl text-secondary-foreground font-medium">
            Simplificando Sua Jornada Rumo ao Visto Americano.
          </h1>

          <p className="text-base lg:text-lg text-secondary-foreground font-normal">
            Realizamos seu sonho de ir aos EUA com rapidez e personalização.
          </p>
        </div>

        <Button size="lg" className="w-fit lg:text-lg lg:h-14">
          Fale Conosco
        </Button>
      </div>

      <HeroCarousel />
    </main>
  );
}
