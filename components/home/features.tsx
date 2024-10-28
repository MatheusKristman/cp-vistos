import { MessageText1, TickCircle } from "iconsax-react";
import { Button } from "../ui/button";

export function Features() {
  return (
    <section className="absolute top-0 left-6 right-6">
      <div className="w-full bg-white border border-secondary rounded-[36px] p-9 flex flex-col gap-12 relative z-10">
        <div className="w-full flex flex-col gap-1">
          <p className="text-2xl text-foreground/70 font-medium capitalize">O que nos torna únicos</p>

          <h2 className="text-4xl text-foreground font-bold !leading-[110%] capitalize">Uma Experiência Que Você Só Encontra Aqui</h2>
        </div>

        <ul className="w-full flex flex-col gap-8">
          <li className="w-full flex gap-6">
            <TickCircle variant="Bold" className="text-destructive size-6 shrink-0" />

            <p className="text-xl text-foreground/70"><strong className="font-semibold">Atendimento Humanizado:</strong> Oferecemos um atendimento personalizado e empático, acompanhando você em cada etapa.</p>
          </li>

          <li className="w-full flex gap-6">
            <TickCircle variant="Bold" className="text-destructive size-6 shrink-0" />

            <p className="text-xl text-foreground/70"><strong className="font-semibold">Zero burocracia:</strong> Foque na sua viagem e deixe a burocracia conosco!</p>
          </li>

          <li className="w-full flex gap-6">
            <TickCircle variant="Bold" className="text-destructive size-6 shrink-0" />

            <p className="text-xl text-foreground/70"><strong className="font-semibold">Expertise:</strong> Com 26 anos de experiência no consulado, aumentamos suas chances de sucesso.</p>
          </li>

          <li className="w-full flex gap-6">
            <TickCircle variant="Bold" className="text-destructive size-6 shrink-0" />

            <p className="text-xl text-foreground/70"><strong className="font-semibold">Com você até o fim:</strong> Suporte completo do início ao fim, garantindo que tudo ocorra como planejado.</p>
          </li>
        </ul>
      </div>

      <div className="w-full bg-destructive p-6 rounded-[36px] flex flex-col gap-6 -mt-16 pt-[calc(64px+24px)]">
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-white !leading-[110%]">Estamos aqui para você</h3>

          <p className="text-xl font-medium text-white">Precisa de mais informações ou quer iniciar seu processo? Nossa equipe está pronta para ajudar!</p>
        </div>

        <Button variant="secondary" className="py-4 h-[60px] text-xl" asChild>
          <a href="#" target="_blank" rel="noreferrer noopener" className="!text-destructive font-semibold flex items-center gap-4">
            <MessageText1 className="size-[28px] shrink-0" />

            Vamos Conversar
          </a>
        </Button>
      </div>
    </section>
  )
}