import { TestimonialsCarousel } from "./testimonials-carousel";

export function HomeBenefits() {
  //TODO: criar versão tablet e desktop

  return (
    <section className="w-full flex flex-col sm:grid sm:grid-cols-2">
      <div className="w-full px-6 sm:px-16 py-9 sm:py-20 border-t sm:border-b border-secondary">
        <h2 className="text-2xl sm:text-3xl lg:text-5xl text-foreground font-medium mb-6">Nossos Diferenciais</h2>

        <div className="w-full flex flex-col gap-4 relative before:content-[''] before:absolute before:top-0 before:left-[17px] before:h-full before:w-[2px] before:bg-primary">
          <div className="w-full flex gap-4">
            <div className="w-fit h-fit flex items-center justify-center p-1 border-2 border-primary rounded-full">
              <div className="w-6 min-w-[24px] h-6 min-h-[24px] rounded-full bg-primary" />
            </div>

            <div className="pt-1">
              <h3 className="text-xl sm:text-2xl text-foreground font-medium mb-2">Atendimento Humanizado</h3>

              <p className="text-base sm:text-lg text-foreground">
                Em nossa empresa, o atendimento humanizado é mais do que uma prática, é uma filosofia. Estamos aqui para
                oferecer suporte, compreensão e empatia em cada contato, garantindo que você se sinta genuinamente
                valorizado e compreendido.
              </p>
            </div>
          </div>

          <div className="w-full flex gap-4">
            <div className="w-fit h-fit flex items-center justify-center p-1 border-2 border-primary rounded-full">
              <div className="w-6 min-w-[24px] h-6 min-h-[24px] rounded-full bg-primary" />
            </div>

            <div className="pt-1">
              <h3 className="text-xl sm:text-2xl text-foreground font-medium mb-2">Serviço Personalizado</h3>

              <p className="text-base sm:text-lg text-foreground">
                Entendemos que cada cliente é único, por isso, oferecemos um serviço personalizado que se adapta às suas
                necessidades específicas. Desde o primeiro contato até a conclusão do serviço, nossa equipe está
                empenhada em oferecer soluções sob medida para você.
              </p>
            </div>
          </div>

          <div className="w-full flex gap-4">
            <div className="w-fit h-fit flex items-center justify-center p-1 border-2 border-primary rounded-full">
              <div className="w-6 min-w-[24px] h-6 min-h-[24px] rounded-full bg-primary" />
            </div>

            <div className="pt-1">
              <h3 className="text-xl sm:text-2xl text-foreground font-medium mb-2">Acolhimento</h3>

              <p className="text-base sm:text-lg text-foreground">
                Quando falamos em acolhimento, incluímos tanto o digital quanto o presencial. Estamos aqui para
                recebê-lo com calor humano, seja através de uma tela ou pessoalmente, garantindo que você se sinta
                confortável e valorizado em cada contato.
              </p>
            </div>
          </div>
        </div>
      </div>

      <TestimonialsCarousel />
    </section>
  );
}
