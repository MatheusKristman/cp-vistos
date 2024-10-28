import Image from "next/image";
import Link from "next/link";
import { Features } from "../home/features";

export function Footer() {
  return <footer className="w-full bg-primary relative pt-[520px] sm:pt-[500px]">
    <Features />

    <div className="w-full px-6 pt-12 pb-9 flex items-end justify-between gap-12 sm:px-16 lg:container">
      <div className="flex flex-col gap-6 sm:gap-9">
        <Link href="/" className="relative h-[56px] w-[102px] sm:h-[70px] sm:w-[128px]">
          <Image src="/assets/images/cp-vistos-logo.png" alt="CP Vistos" fill className="object-contain object-center" />
        </Link>

        <ul className="flex items-center gap-6">
          <li>
            <a href="#" target="_blank" rel="noreferrer noopener">
              <Image src="/assets/icons/Instagram.svg" alt="Instagram" width={24} height={24} className="object-contain object-center" />
            </a>
          </li>

          <li>
            <a href="#" target="_blank" rel="noreferrer noopener">
              <Image src="/assets/icons/Whatsapp.svg" alt="Whatsapp" width={24} height={24} className="object-contain object-center" />
            </a>
          </li>

          <li>
            <a href="#" target="_blank" rel="noreferrer noopener">
              <Image src="/assets/icons/Gmail.svg" alt="Gmail" width={24} height={24} className="object-contain object-center" />
            </a>
          </li>
        </ul>
      </div>

      <nav className="flex flex-col items-end gap-6 sm:flex-row">
        <Link href='/politica-de-privacidade' className="text-base font-medium text-white text-end lg:text-xl">Política de Privacidade</Link>

        <Link href='/termos-de-uso' className="text-base font-medium text-white text-end lg:text-xl">Termos de Uso</Link>
      </nav>
    </div>
  </footer>;
}
