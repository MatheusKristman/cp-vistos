"use client";

import Image from "next/image";
import { useState } from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function HeroCarousel() {
  const [imageShown, setImageShown] = useState<number>(0);

  function handleBack() {
    if (imageShown === 0) {
      setImageShown(2);
      return;
    }

    setImageShown(imageShown - 1);
  }

  function handleNext() {
    if (imageShown === 2) {
      setImageShown(0);
      return;
    }

    setImageShown(imageShown + 1);
  }

  return (
    <div className="h-[432px] sm:min-h-[548px] lg:min-h-[704px] lg:h-[40vw] w-full flex items-end relative">
      <div
        className={cn(
          "h-[calc(100%-138px)] w-full absolute top-0 left-0 block transition-opacity duration-500 opacity-100",
          imageShown !== 0 && "opacity-0",
        )}
      >
        <Image
          src="/assets/images/hero-1.jpeg"
          alt="Mudar depois"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div
        className={cn(
          "h-[calc(100%-138px)] w-full absolute top-0 left-0 block transition-opacity duration-500 opacity-100",
          imageShown !== 1 && "opacity-0",
        )}
      >
        <Image
          src="/assets/images/hero-2.jpg"
          alt="Mudar depois"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div
        className={cn(
          "h-[calc(100%-138px)] w-full absolute top-0 left-0 block transition-opacity duration-500 opacity-100",
          imageShown !== 2 && "opacity-0",
        )}
      >
        <Image
          src="/assets/images/hero-3.jpg"
          alt="Mudar depois"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="w-full bg-primary p-6 flex flex-col gap-2">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span
              className={cn("w-1.5 h-1.5 rounded-full bg-white/70 relative", {
                "bg-white before:content-[''] before:block before:w-4 before:h-4 before:bg-transparent before:border before:border-white before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full":
                  imageShown === 0,
              })}
            />

            <span
              className={cn("w-1.5 h-1.5 rounded-full bg-white/70 relative", {
                "bg-white before:content-[''] before:block before:w-4 before:h-4 before:bg-transparent before:border before:border-white before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full":
                  imageShown === 1,
              })}
            />

            <span
              className={cn("w-1.5 h-1.5 rounded-full bg-white/70 relative", {
                "bg-white before:content-[''] before:block before:w-4 before:h-4 before:bg-transparent before:border before:border-white before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full":
                  imageShown === 2,
              })}
            />
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={handleBack}
              variant="secondary"
              className="w-[30px] h-[30px] p-0 rounded-full"
            >
              <ArrowLeft size={20} />
            </Button>

            <Button
              onClick={handleNext}
              variant="secondary"
              className="w-[30px] h-[30px] p-0 rounded-full"
            >
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="w-fit text-base text-primary-foreground font-medium">
            New York
          </span>

          <span className="w-fit text-base text-primary-foreground">
            Estados Unidos da América
          </span>
        </div>
      </div>
    </div>
  );
}
