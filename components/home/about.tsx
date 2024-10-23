import Image from "next/image";

export function About() {
  return (
    <section className="w-full pt-24 bg-mobile-about bg-no-repeat bg-[length:100%_100%] sm:bg-tablet-about lg:bg-desktop-about lg:pt-36">
      <div className="w-full px-6 flex flex-col gap-20 sm:items-end sm:px-16 sm:gap-6 lg:flex-row lg:container lg:gap-20">
        <div className="relative w-full aspect-video sm:max-w-lg">
          <div className="w-fit px-12 py-4 bg-secondary rounded-2xl flex flex-col gap-2 absolute z-10 -bottom-10 -right-6 sm:right-6 sm:-bottom-12">
            <span className="text-xl font-semibold text-foreground">Camila Paschoal</span>

            <span className="text-base text-foreground/70">Fundadora e CEO</span>
          </div>

          <Image
            src="/assets/images/about-placeholder.jpg"
            alt="Camila Paschoal"
            fill
            className="rounded-[30px] object-center object-cover"
          />
        </div>

        <div className="w-full flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-foreground !leading-[110%] sm:text-4xl sm:max-w-xs lg:text-5xl lg:max-w-md">
            A história por trás da agência
          </h2>

          <div className="w-full flex flex-col gap-2 lg:max-w-prose">
            <p className="text-base text-foreground/70">
              Meu nome é Camila Paschoal, sou fundadora e CEO da agência, e possuo mais de 25 anos de experiência no
              consulado americano, o que me proporcionou um conhecimento amplo e profundo sobre o processo de obtenção
              de vistos.
            </p>

            <p className="text-base text-foreground/70">
              Essa vivência me motivou a criar uma agência que simplifica essa jornada, oferecendo um serviço eficiente
              e personalizado. Nosso compromisso é tornar o processo mais claro e humanizado, garantindo que você se
              sinta confiante e amparado(a) em cada etapa, enquanto se concentra na realização dos seus sonhos e planos
              nos Estados Unidos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
