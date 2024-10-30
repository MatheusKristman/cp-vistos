import Image from "next/image";
import { motion } from "framer-motion";

interface HeroCarouselItemProps {
  imageSrc: string;
  title: string;
  location: string;
}

export function HeroCarouselItem({
  imageSrc,
  title,
  location,
}: HeroCarouselItemProps) {
  return (
    <motion.div
      key={title}
      className="hidden lg:block lg:absolute lg:top-44 lg:right-0 lg:w-2/5 lg:h-[700px]"
    >
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-full h-full"
      >
        <Image
          src={imageSrc}
          alt="Disneyland"
          fill
          className="object-center object-cover rounded-l-[60px]"
        />
      </motion.div>

      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 50, opacity: 0 }}
        transition={{ delay: 0.4, duration: 1, ease: "easeInOut" }}
        className="px-6 py-4 rounded-l-[30px] bg-white border border-r-0 border-secondary flex flex-col absolute z-10 -bottom-8 right-0"
      >
        <h3 className="text-2xl font-semibold text-foreground">{title}</h3>

        <p className="text-base font-medium text-foreground/70">{location}</p>
      </motion.div>
    </motion.div>
  );
}
