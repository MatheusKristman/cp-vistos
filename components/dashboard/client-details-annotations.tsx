"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FormAnimation } from "@/constants/animations/modal";
import useClientDetailsModalStore from "@/constants/stores/useClientDetailsModalStore";
import { MessageCircleOff, Send } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Props {
  handleClose: () => void;
}

export function ClientDetailsAnnotations({ handleClose }: Props) {
  const { unsetToAnnotation, setToResume } = useClientDetailsModalStore();

  function handleBack() {
    unsetToAnnotation();
    setToResume();
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={FormAnimation}
    >
      <div className="w-full grid grid-cols-2 grid-rows-2 gap-4 mb-9 sm:flex sm:flex-row sm:items-center sm:justify-between">
        <Button
          onClick={handleBack}
          variant="link"
          size="icon"
          className="row-start-1 row-end-2"
        >
          <Image
            src="/assets/icons/arrow-left-dark.svg"
            alt="Voltar"
            width={24}
            height={24}
          />
        </Button>

        <h1 className="text-2xl font-semibold text-foreground text-center sm:text-3xl row-end-3 row-start-2 col-span-2">
          Anotações
        </h1>

        <Button
          onClick={handleClose}
          variant="link"
          size="icon"
          className="row-start-1 row-end-2 justify-self-end"
        >
          <Image
            src="/assets/icons/cross-blue.svg"
            alt="Fechar"
            width={24}
            height={24}
          />
        </Button>
      </div>

      <div className="w-full flex flex-col gap-9">
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <MessageCircleOff
            size={50}
            strokeWidth={1.5}
            className="opacity-35"
          />

          <span className="text-lg font-medium text-foreground text-center opacity-50">
            Nenhuma anotação no momento
          </span>
        </div>

        <div className="w-full border border-muted transition duration-300 flex items-center justify-between group focus-within:border-primary hover:border-border disabled:hover:border-muted disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted">
          <Input className="border-none" placeholder="Envie sua anotação" />

          <Button variant="link" size="icon">
            <Send />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
