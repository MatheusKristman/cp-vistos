"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Element } from "react-scroll";

const imageAnimation = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

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

const itemAnimation = {
  hidden: {
    x: "var(--x-initial)",
    y: "var(--y-initial)",
    opacity: "var(--opacity-initial)",
  },
  show: {
    x: "var(--x-animate)",
    y: "var(--y-animate)",
    opacity: "var(--opacity-animate)",
    transition: {
      duration: 0.7,
      ease: "easeInOut",
    },
  },
};

export function About() {
  return (
    <section className="w-full pt-24 bg-mobile-about bg-no-repeat bg-[length:100%_100%] sm:bg-tablet-about lg:bg-desktop-about lg:pt-36">
      <Element name="about">
        <AnimatePresence>
          <div className="w-full px-6 flex flex-col gap-20 sm:items-end sm:px-16 sm:gap-6 lg:flex-row lg:container lg:gap-20">
            <motion.div
              variants={imageAnimation}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative w-full aspect-video sm:max-w-lg"
            >
              <div className="w-fit px-12 py-4 bg-secondary rounded-2xl flex flex-col gap-2 absolute z-[5] -bottom-10 -right-6 sm:right-6 sm:-bottom-12">
                <span className="text-xl font-semibold text-foreground">Camila Paschoal</span>

                <span className="text-base text-foreground/70">Fundadora e CEO</span>
              </div>

              <Image
                src="/assets/images/about.jpg"
                alt="Camila Paschoal"
                fill
                className="rounded-[30px] object-center object-cover"
              />
            </motion.div>

            <motion.div
              variants={containerAnimation}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="w-full flex flex-col gap-6"
            >
              <motion.h2
                variants={itemAnimation}
                className="about-text-animation text-3xl font-bold text-foreground !leading-[110%] sm:text-4xl sm:max-w-xs lg:text-5xl lg:max-w-md"
              >
                A história por trás da assessoria
              </motion.h2>

              <div className="w-full flex flex-col gap-2 lg:max-w-prose">
                <motion.p variants={itemAnimation} className="about-text-animation text-base text-foreground/70">
                  Meu nome é Camila Paschoal, sou a fundadora da CP Vistos e tenho mais de 18 anos de experiência.
                  Trabalhei no consulado americano no setor de vistos e essa vivência me proporcionou uma visão
                  privilegiada dos processos internos, além de uma compreensão profunda das exigências e melhores
                  práticas para a obtenção de vistos.
                </motion.p>

                <motion.p variants={itemAnimation} className="about-text-animation text-base text-foreground/70">
                  Em 2022, fundei a CP Vistos para simplificar a jornada dos solicitantes e poder compartilhar com todos
                  a minha expertise neste processo tão burocrático. Nosso compromisso é tornar o processo mais claro e
                  humanizado, garantindo que você se sinta confiante e amparado(a) em cada etapa. A união do
                  conhecimento técnico com uma abordagem empática faz da CP Vistos uma referência em suporte qualificado
                  e eficiente.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>
      </Element>
    </section>
  );
}
