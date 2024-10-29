"use client";

import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { cn } from "@/lib/utils";

const SERVICES = [
  {
    title: "Vistos Americanos",
    desc: "Assessoria completa na aquisição de vistos para não imigrantes com segurança.",
  },
  {
    title: "Autorização ESTA",
    desc: "Emissão de autorização para viagens aos EUA.",
  },
  {
    title: "Autorização E-TA",
    desc: "Emissão de autorização para quem já possui visto americano.",
  },
  {
    title: "Passaporte brasileiro",
    desc: "Auxílio na emissão de passaporte para brasileiros.",
  },
  {
    title: "Passaporte Português",
    desc: "Monitoramento de vagas para passaporte português.",
  },
];

export function Services() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="w-full mt-12 pt-44 bg-mobile-services bg-right-top bg-contain bg-no-repeat sm:bg-[length:50%] sm:bg-desktop-services lg:bg-[length:25%]">
      <div className="w-full px-6 flex flex-col gap-12 sm:px-16 lg:container lg:items-center">
        <div className="w-full flex flex-col gap-6 sm:max-w-md lg:items-center lg:max-w-2xl">
          <h2 className="text-3xl font-bold text-foreground !leading-[110%] sm:text-4xl lg:text-center lg:text-5xl">
            Estamos preparados para o que você precisa
          </h2>

          <p className="text-xl text-foreground/70 lg:text-center">
            Oferecemos consultoria especializada e suporte completo para a
            obtenção de passaportes, vistos americanos e autorizações como E-TA
            e ESTA.
          </p>
        </div>

        <Carousel setApi={setApi} opts={{ loop: true }}>
          <div className="w-full flex flex-col gap-12">
            <div className="w-full relative before:content-[''] before:h-full before:w-12 before:bg-gradient-to-r before:from-white before:to-transparent before:absolute before:top-0 before:left-0 before:z-10 after:content-[''] after:h-full after:w-12 after:bg-gradient-to-l after:from-white after:to-transparent after:absolute after:top-0 after:right-0 after:z-10 sm:before:w-16 sm:after:w-16">
              <CarouselContent className="sm:-ml-9">
                {SERVICES.map((service, index) => (
                  <CarouselItem
                    key={index}
                    className="sm:pl-9 sm:basis-1/2 lg:basis-[45%]"
                  >
                    <Card className="w-full h-full relative">
                      <CardHeader className="w-full">
                        <h5 className="text-2xl font-semibold text-foreground w-2/3">
                          {service.title}
                        </h5>

                        <div className="absolute top-4 right-0 p-4 pr-9 rounded-l-lg bg-destructive">
                          <div className="size-4 rounded-full bg-white" />
                        </div>
                      </CardHeader>

                      <CardContent className="w-full">
                        <p className="text-xl text-foreground/70">
                          {service.desc}
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>

            <div className="w-full flex flex-col items-center justify-between gap-12 sm:flex-row">
              <div className="flex items-center gap-9">
                <CarouselPrevious className="static translate-y-0 sm:size-16" />
                <CarouselNext className="static translate-y-0 sm:size-16" />
              </div>

              <div className="w-fit flex items-center justify-center gap-6">
                {Array.from({ length: count }).map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "rounded-full size-3 bg-secondary transition-all duration-500",
                      {
                        "bg-foreground w-11": index === current,
                      },
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
