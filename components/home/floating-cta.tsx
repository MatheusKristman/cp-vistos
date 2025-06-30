"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { FloatingAnimation } from "@/constants/animations/floating-cta";

export const FloatingCTA = () => {
  return (
    <motion.a
      initial="initial"
      animate="animate"
      variants={FloatingAnimation}
      href="https://wa.link/2i5gt9"
      target="_blank"
      rel="noreferrer noopener"
      className="fixed bottom-20 left-4 bg-white p-4 rounded-full flex items-center gap-4 shadow-lg z-[99999] w-[68px] h-[68px] group transition-width overflow-hidden hover:lg:w-[230px]"
    >
      <Image
        src="/assets/icons/whatsapp-cta.svg"
        alt="Whatsapp"
        className="object-contain object-center"
        width={36}
        height={36}
      />

      <span className="text-xl font-medium mr-2 opacity-0 whitespace-nowrap group-hover:lg:opacity-100 group-hover:lg:transition-opacity group-hover:lg:duration-300">
        Fale Conosco
      </span>
    </motion.a>
  );
};
