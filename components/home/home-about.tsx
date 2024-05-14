import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function HomeAbout() {
  return (
    <section className="w-full flex flex-col sm:grid sm:grid-cols-2">
      <div className="w-full aspect-square sm:aspect-auto relative">
        <Image
          src="/assets/images/home-about.jpg"
          alt="Camila Prado"
          fill
          className="object-center object-cover"
        />
      </div>

      <div className="w-full px-6 sm:px-9 lg:px-20 py-24 bg-stone-50 flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl text-secondary-foreground font-medium">
            Sobre
          </h2>

          <p className="text-base lg:text-lg text-secondary-foreground font-normal">
            Lorem ipsum dolor sit amet, officia excepteur ex fugiat
            reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit
            ex esse exercitation amet. Nisi anim cupidatat excepteur officia.
            Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate
            voluptate dolor minim nulla est proident. Nostrud officia pariatur
            ut officia. Sit irure elit esse ea nulla sunt ex occaecat
            reprehenderit commodo officia dolor Lorem duis laboris cupidatat
            officia voluptate. Culpa proident adipisicing id nulla nisi laboris
            ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo
            ex non excepteur duis sunt velit enim. Voluptate laboris sint
            cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
          </p>
        </div>

        <Button variant="outline" asChild className="w-fit">
          <Link href="/sobre">Saiba mais</Link>
        </Button>
      </div>
    </section>
  );
}
