"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ArrowRight, Verify } from "iconsax-react";
import { AnimatePresence, motion } from "framer-motion";

import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { CardContent, CardHeader, Card } from "../ui/card";

import { cn } from "@/lib/utils";

const REVIEWS = [
  {
    profileImage: "/assets/images/about-placeholder.jpg",
    name: "John Doe",
    date: new Date(),
    grades: 5,
    desc: "Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  },
  {
    profileImage: "/assets/images/about-placeholder.jpg",
    name: "John Doe",
    date: new Date(),
    grades: 5,
    desc: "Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  },
  {
    profileImage: "/assets/images/about-placeholder.jpg",
    name: "John Doe",
    date: new Date(),
    grades: 5,
    desc: "Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  },
  {
    profileImage: "/assets/images/about-placeholder.jpg",
    name: "John Doe",
    date: new Date(),
    grades: 5,
    desc: "Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  },
];

const containerAnimation = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const textAnimation = {
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
      duration: 0.7,
      ease: "easeInOut",
    },
  },
};

const carouselAnimation = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeInOut",
    },
  },
};

const googleContainerAnimation = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const googleItemAnimation = {
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
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export function Testimonial() {
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
    <section className="w-full mt-24">
      <AnimatePresence>
        <div className="w-full px-6 flex flex-col gap-12 sm:px-16 lg:container">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={containerAnimation}
            className="w-full flex flex-col items-center gap-6"
          >
            <motion.h2
              variants={textAnimation}
              className="text-3xl font-bold text-foreground text-center !leading-[110%] max-w-prose capitalize sm:text-4xl lg:text-5xl"
            >
              O que nossos clientes dizem
            </motion.h2>

            <motion.p variants={textAnimation} className="text-xl text-foreground/70 text-center max-w-prose">
              Conheça as experiências de quem confiou em nossos serviços e realizou seus planos com sucesso.
            </motion.p>
          </motion.div>

          <div className="w-full flex flex-col items-center gap-9 lg:flex-row-reverse lg:justify-between lg:gap-24">
            <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={carouselAnimation}
                className="w-full flex flex-col gap-9"
              >
                <div className="w-full relative">
                  <CarouselPrevious className="left-0 top-1/2 -translate-y-1/2 z-10 h-[calc(100%+1px)] bg-transparent bg-gradient-to-r from-white from-60% to-transparent hover:bg-gradient-to-r hover:from-white hover:from-60% hover:to-transparent hover:bg-transparent rounded-none text-secondary" />

                  <CarouselContent className="sm:-ml-9">
                    {REVIEWS.map((review, index) => (
                      <CarouselItem key={index} className="sm:pl-9 basis-4/6 sm:basis-1/2">
                        <Card className="w-full h-full relative">
                          <CardHeader className="w-full flex flex-row items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Image
                                src={review.profileImage}
                                alt="Perfil"
                                width={26}
                                height={26}
                                className="min-h-[26px] min-w-[26px] rounded-full object-cover object-center shrink-0"
                              />

                              <div className="flex flex-col gap-1">
                                <span className="text-base font-semibold text-destructive">{review.name}</span>

                                <span className="text-[10px] font-medium text-foreground/70">
                                  {format(review.date, "dd/MM/yyyy")}
                                </span>
                              </div>
                            </div>

                            <Image
                              src="/assets/icons/Google.svg"
                              alt="Google"
                              width={24}
                              height={24}
                              className="object-contain object-center"
                            />
                          </CardHeader>

                          <CardContent className="w-full flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-[2px]">
                                {Array.from({ length: review.grades }).map((_, index) => (
                                  <Image
                                    src="/assets/icons/star.svg"
                                    alt="Nota"
                                    width={18}
                                    height={18}
                                    key={index}
                                    className="object-contain object-center"
                                  />
                                ))}
                              </div>

                              <Verify variant="Bold" className="text-[#4C84F3] size-5" />
                            </div>

                            <p className="text-base text-foreground/70">{review.desc}</p>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <CarouselNext className="right-0 top-1/2 -translate-y-1/2 z-10 h-[calc(100%+1px)] bg-transparent bg-gradient-to-l from-white from-60% to-transparent hover:bg-gradient-to-l hover:from-white hover:from-60% hover:to-transparent hover:bg-transparent rounded-none text-secondary" />
                </div>

                <div className="w-full flex flex-col items-center gap-9 lg:flex-row-reverse lg:justify-between">
                  <div className="w-fit flex items-center justify-center gap-6">
                    {Array.from({ length: count }).map((_, index) => (
                      <div
                        key={index}
                        className={cn("rounded-full size-3 bg-secondary transition-all duration-500", {
                          "bg-foreground w-11": index === current,
                        })}
                      />
                    ))}
                  </div>

                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-primary text-xl underline flex items-center gap-2"
                  >
                    <span>Acompanhe Nossos Depoimentos no Instagram</span>
                    <ArrowRight size={24} className="shrink-0 -rotate-45" />
                  </a>
                </div>
              </motion.div>
            </Carousel>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={googleContainerAnimation}
              className="flex flex-col items-center gap-2"
            >
              <motion.span
                variants={googleItemAnimation}
                className="text-4xl font-semibold text-foreground text-center"
              >
                Excelente
              </motion.span>

              <motion.div variants={googleItemAnimation} className="flex items-center gap-[2px]">
                <Image
                  src="/assets/icons/star.svg"
                  alt="Nota"
                  width={30}
                  height={30}
                  className="object-contain object-center"
                />
                <Image
                  src="/assets/icons/star.svg"
                  alt="Nota"
                  width={30}
                  height={30}
                  className="object-contain object-center"
                />
                <Image
                  src="/assets/icons/star.svg"
                  alt="Nota"
                  width={30}
                  height={30}
                  className="object-contain object-center"
                />
                <Image
                  src="/assets/icons/star.svg"
                  alt="Nota"
                  width={30}
                  height={30}
                  className="object-contain object-center"
                />
                <Image
                  src="/assets/icons/star.svg"
                  alt="Nota"
                  width={30}
                  height={30}
                  className="object-contain object-center"
                />
              </motion.div>

              <motion.span variants={googleItemAnimation} className="text-base text-foreground text-center">
                Com Base Em <strong className="font-semibold">44 avaliações</strong>
              </motion.span>

              <motion.div variants={googleItemAnimation}>
                <Image
                  src="/assets/images/google_logo.svg"
                  alt="Google"
                  width={150}
                  height={47}
                  className="object-contain object-center"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatePresence>
    </section>
  );
}
