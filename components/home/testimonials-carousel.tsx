"use client";

import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    text: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    person: "John",
    job: "Gerente",
  },
  {
    text: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    person: "Matthew",
    job: "Gerente",
  },
  {
    text: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    person: "Luke",
    job: "Gerente",
  },
  {
    text: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    person: "Mary",
    job: "Gerente",
  },
  {
    text: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    person: "Mark",
    job: "Gerente",
  },
];

export function TestimonialsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

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

  useEffect(() => {
    console.log(Array.from({ length: count }, (v, k) => k));
  }, [count]);

  return (
    <div className="w-full flex flex-col border-y border-secondary">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem
              key={`testimonial-${index}`}
              className="flex flex-col gap-10 py-24"
            >
              <div className="ml-6 h-[2px] w-36 bg-primary" />

              <p className="text-2xl text-primary font-medium px-6">
                {testimonial.text}
              </p>

              <div className="flex flex-col px-6">
                <span className="text-base text-primary font-medium">
                  {testimonial.person},
                </span>

                <span className="text-base text-primary">
                  {testimonial.job}
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="w-full px-6 py-6 flex items-center justify-between border-t border-secondary">
          <div className="flex items-center gap-4">
            {Array.from({ length: count }, (v, k) => k).map((c, i) => (
              <span
                key={`carousel-item-${c}`}
                className={cn(
                  "w-1.5 h-1.5 rounded-full bg-primary opacity-70 relative",
                  {
                    "bg-primary before:content-[''] opacity-100 before:block before:w-4 before:h-4 before:bg-transparent before:border before:border-primary before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full":
                      current === c,
                  },
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-4">
            <CarouselPrevious className="relative left-0 top-0 translate-y-0 transition bg-primary text-primary-foreground" />

            <CarouselNext className="relative left-0 top-0 translate-y-0 transition bg-primary text-primary-foreground" />
          </div>
        </div>
      </Carousel>
    </div>
  );
}
