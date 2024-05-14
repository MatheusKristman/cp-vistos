import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="w-full flex flex-col sm:flex-row">
      <div className="w-full bg-primary flex items-center justify-center py-6 lg:max-w-lg">
        <div className="relative w-24 h-20 sm:aspect-square sm:w-[50%] sm:h-auto">
          <Image
            src="/assets/images/logo.jpeg"
            alt="CP Vistos"
            fill
            className="object-contain object-center"
          />
        </div>
      </div>

      <div className="w-full flex flex-col sm:justify-between">
        <div className="w-full px-6 sm:px-16 py-12 flex flex-col lg:flex-row items-center lg:justify-around gap-12">
          <nav className="w-full lg:w-fit">
            <h4 className="text-2xl sm:text-3xl text-primary font-medium mb-6">
              Navegue
            </h4>

            <ul className="w-full flex flex-col items-center justify-center gap-4 lg:justify-start lg:items-start xl:grid xl:grid-cols-2 xl:grid-rows-2 xl:gap-x-12">
              <li className="text-lg text-primary text-center lg:text-start">
                <Link href="/servicos">Serviços</Link>
              </li>

              <li className="text-lg text-primary text-center lg:text-start">
                <Link href="/diferenciais">Diferenciais</Link>
              </li>

              <li className="text-lg text-primary text-center lg:text-start">
                <Link href="/depoimentos">Depoimentos</Link>
              </li>

              <li className="text-lg text-primary text-center lg:text-start">
                <Link href="/contato">Contato</Link>
              </li>
            </ul>
          </nav>

          <div className="w-ful lg:w-fit flex flex-col gap-6">
            <ul className="w-full lg:w-fit flex flex-col 2xl:flex-row items-center lg:items-start justify-center 2xl:justify-start gap-4 2xl:gap-24">
              <li className="text-primary text-base lg:text-lg">
                {/* TODO: adicionar mailto */}
                <a className="flex flex-col items-center gap-1">
                  <Mail size={25} />
                  teste@teste.com
                </a>
              </li>

              <li className="text-primary text-base lg:text-lg">
                {/* TODO: adicionar telefone */}
                <a className="flex flex-col items-center gap-1">
                  <FaWhatsapp size="25px" />
                  (11) 91234-5678
                </a>
              </li>

              <li className="text-primary text-base lg:text-lg">
                <a
                  href="https://www.instagram.com/cpvistos/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex flex-col items-center gap-1"
                >
                  <FaInstagram size="25px" />
                  @cpvistos
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full border-t border-secondary p-6 flex items-center justify-between">
          <span className="text-sm text-center text-primary">
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
          <span className="text-sm text-center text-primary">
            2024 © CP Vistos
          </span>
        </div>
      </div>
    </footer>
  );
}
