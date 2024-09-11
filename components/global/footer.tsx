import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="w-full flex flex-col sm:flex-row">
      <div className="w-full bg-primary flex items-center justify-center py-6 lg:max-w-lg">
        <div className="relative w-40 aspect-square sm:w-[75%] sm:h-auto lg:w-[60%]">
          <Image
            src="/assets/images/cp-vistos-logo.png"
            alt="CP Vistos"
            fill
            className="object-contain object-center"
          />
        </div>
      </div>

      <div className="w-full flex flex-col sm:justify-between">
        <div className="w-full h-full flex flex-col lg:flex-row items-center">
          <nav className="w-full lg:w-1/2 2xl:w-2/5 py-12 lg:px-12">
            <h4 className="text-2xl sm:text-3xl text-center lg:text-left text-foreground font-semibold mb-6">
              Navegue
            </h4>

            <ul className="w-full flex flex-col items-center justify-center gap-4 lg:justify-start lg:items-start xl:grid xl:grid-cols-2 xl:grid-rows-2 xl:gap-x-12">
              <li className="text-lg text-foreground text-center font-medium lg:text-start">
                <Link href="/servicos">Serviços</Link>
              </li>

              <li className="text-lg text-foreground text-center font-medium lg:text-start">
                <Link href="/diferenciais">Diferenciais</Link>
              </li>

              <li className="text-lg text-foreground text-center font-medium lg:text-start">
                <Link href="/depoimentos">Depoimentos</Link>
              </li>

              <li className="text-lg text-foreground text-center font-medium lg:text-start">
                <Link href="/contato">Contato</Link>
              </li>
            </ul>
          </nav>

          <ul className="w-full lg:w-1/2 2xl:w-3/5 2xl:h-full bg-secondary/50 py-12 px-12 flex flex-col 2xl:flex-row items-center justify-center 2xl:justify-start gap-10">
            <li className="w-full text-foreground font-medium text-lg">
              {/* TODO: adicionar mailto */}
              <a href="#" className="flex flex-col items-center gap-1 group">
                <Mail className="size-10 transition-opacity opacity-50 group-hover:opacity-100" />
                <span className="opacity-0 -translate-y-1/2 transition-all group-hover:opacity-100 group-hover:translate-y-0">
                  teste@teste.com
                </span>
              </a>
            </li>

            <li className="w-full text-foreground font-medium text-lg">
              {/* TODO: adicionar telefone */}
              <a href="#" className="flex flex-col items-center gap-1 group">
                <FaWhatsapp className="size-10 transition-opacity opacity-50 group-hover:opacity-100" />
                <span className="opacity-0 -translate-y-1/2 transition-all group-hover:opacity-100 group-hover:translate-y-0">
                  (11) 91234-5678
                </span>
              </a>
            </li>

            <li className="w-full text-foreground font-medium text-lg">
              <a
                href="https://www.instagram.com/cpvistos/"
                target="_blank"
                rel="noreferrer noopener"
                className="flex flex-col items-center gap-1 group"
              >
                <FaInstagram className="size-10 transition-opacity opacity-50 group-hover:opacity-100" />
                <span className="opacity-0 -translate-y-1/2 transition-all group-hover:opacity-100 group-hover:translate-y-0">
                  @cpvistos
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div className="w-full border-t border-secondary p-6 flex flex-col lg:flex-row gap-2 items-center justify-between">
          <span className="text-sm text-center text-foreground">
            Desenvolvido por{" "}
            <a
              href="https://www.mkdevsolutions.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="underline"
            >
              MKDev Solutions
            </a>
          </span>

          <span className="text-sm text-center text-foreground">
            2024 © CP Vistos
          </span>
        </div>
      </div>
    </footer>
  );
}
