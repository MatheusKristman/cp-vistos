import {
  BadgeCheck,
  FileCheck,
  FileCheck2,
  Plane,
  PlaneTakeoff,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";

const services = [
  {
    Icon: <BadgeCheck />,
    title: "Vistos Americanos",
    desc: "Assessoria na aquisição de vistos para não imigrantes.",
    href: "#",
  },
  {
    Icon: <FileCheck />,
    title: "Autorização ESTA",
    desc: "Emissão de autorização.",
    href: "#",
  },
  {
    Icon: <FileCheck2 />,
    title: "Autorização E-TA",
    desc: "Emissão de autorização para quem já possui visto americano.",
    href: "#",
  },
  {
    Icon: <Plane />,
    title: "Passaporte brasileiro",
    desc: "Auxílio na emissão de passaporte para brasileiros.",
    href: "#",
  },
  {
    Icon: <PlaneTakeoff />,
    title: "Passaporte Português",
    desc: "Monitoramento de vagas para passaporte português.",
    href: "#",
  },
];

export function HomeServices() {
  return (
    <section>
      <div className="lg:hidden">
        <Carousel
          opts={{
            align: "start",
          }}
        >
          <CarouselContent>
            {services.map(({ Icon, title, desc, href }) => (
              <CarouselItem
                key={title}
                className="sm:basis-1/3 py-9 flex flex-col gap-6 items-center justify-between border-t border-b border-l first:border-l-0 border-secondary"
              >
                <div className="flex flex-col items-center gap-4">
                  {Icon}

                  <div className="flex flex-col items-cente gap-2">
                    <h2 className="text-lg text-center text-primary font-medium">
                      {title}
                    </h2>

                    <p className="text-base text-center text-primary">{desc}</p>
                  </div>
                </div>

                <Button variant="outline" asChild>
                  <Link href={href}>Saiba mais</Link>
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="hidden lg:flex">
        {services.map(({ Icon, title, desc, href }) => (
          <div
            key={title}
            className="w-1/5 py-9 flex flex-col gap-6 items-center justify-between border-t border-b border-l first:border-l-0 border-secondary"
          >
            <div className="flex flex-col items-center gap-4">
              {Icon}

              <div className="flex flex-col items-cente gap-2">
                <h2 className="text-lg text-center text-primary font-medium">
                  {title}
                </h2>

                <p className="text-base text-center text-primary">{desc}</p>
              </div>
            </div>

            <Button variant="outline" asChild>
              <Link href={href}>Saiba mais</Link>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
