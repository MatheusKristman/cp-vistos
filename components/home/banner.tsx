"use client";

import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "framer-motion";

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

// TODO: adicionar os textos e link para botão
const BANNER = [
  {
    title: "Já teve um visto negado e quer tentar novamente?",
    desc: "Entre em contato para fazer uma análise gratuita do seu perfil! Temos mais % de Reversão!",
    buttonText: "Entrar em contato",
  },
  {
    title: "Renove o seu visto em até 15 dias!",
    desc: "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, acaliquet odio mattis.",
    buttonText: "Lorem ipsum",
  },
  {
    title: "Renove o seu visto em até 15 dias!",
    desc: "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, acaliquet odio mattis.",
    buttonText: "Lorem ipsum",
  },
];

const bannerAnimation = {
  hidden: {
    y: 50,
    scale: 0.5,
    opacity: 0,
  },
  show: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

export function Banner() {
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
    <section className="relative w-full px-6 mt-12 sm:mt-24 sm:px-16 lg:container">
      <AnimatePresence>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={bannerAnimation}
          className="w-full h-full"
        >
          <Carousel
            setApi={setApi}
            className="h-full rounded-[45px] overflow-hidden"
            opts={{ loop: true }}
            plugins={[Autoplay({ delay: 10000 })]}
          >
            <CarouselContent className="h-[550px] ml-0 sm:h-[450px]">
              {BANNER.map((banner, index) => (
                <CarouselItem key={index} className="h-full pl-0">
                  <div
                    className={cn(
                      "relative w-full h-full bg-cover bg-center flex sm:justify-end after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:w-full after:h-full after:bg-gradient-to-b after:from-transparent after:to-[#262525] sm:after:bg-gradient-to-r",
                      {
                        "bg-banner-1": index === 0,
                        "bg-banner-2": index === 1,
                        "bg-banner-3 bg-bottom": index === 2,
                      }
                    )}
                  >
                    <div className="w-full h-full flex flex-col justify-end gap-6 pb-20 px-12 relative z-10 sm:max-w-sm lg:max-w-2xl">
                      <div className="flex flex-col gap-2">
                        <h5 className="text-white font-bold text-2xl lg:text-4xl">{banner.title}</h5>

                        <p className="text-white font-medium text-base lg:text-xl lg:max-w-md">{banner.desc}</p>
                      </div>

                      <Button variant="secondary" className="sm:w-fit lg:text-xl">
                        {banner.buttonText}
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="w-full flex items-center justify-center gap-6 absolute bottom-6 left-1/2 -translate-x-1/2">
              {Array.from({ length: count }).map((_, index) => (
                <div
                  key={index}
                  className={cn("rounded-full size-3 bg-white/70 transition-all duration-500", {
                    "bg-white w-11": index === current,
                  })}
                />
              ))}
            </div>
          </Carousel>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
