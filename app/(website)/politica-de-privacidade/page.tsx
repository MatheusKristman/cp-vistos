export default function PrivacyPolicyPage() {
  return (
    <section className="w-full pt-[calc(80px+100px)] bg-privacy-policy-mobile bg-no-repeat bg-[length:100%_100%] pb-36 sm:pt-[calc(112px+100px)] sm:bg-privacy-policy-tablet lg:bg-privacy-policy-desktop">
      <div className="w-full px-6 flex flex-col gap-6 mb-12 sm:px-16 lg:container lg:mx-auto">
        <h2 className="text-3xl font-bold lg:text-5xl">Política Privacidade</h2>

        <div className="w-full flex flex-col gap-4">
          <p className="text-base text-foreground/70 sm:text-xl">
            A sua privacidade é importante para nós. É política da CP Vistos
            respeitar a sua privacidade em relação a qualquer informação sua que
            possamos coletar no site CP Vistos e em outros sites que possuímos e
            operamos.
          </p>

          <p className="text-base text-foreground/70 sm:text-xl">
            Solicitamos informações pessoais apenas quando realmente precisamos
            delas para fornecer um serviço. Fazemos isso por meios justos e
            legais, com o seu conhecimento e consentimento, informando também
            por que estamos coletando e como essas informações serão utilizadas.
          </p>

          <p className="text-base text-foreground/70 sm:text-xl">
            Retemos as informações coletadas apenas pelo tempo necessário para
            fornecer o serviço solicitado. Quando armazenamos dados, protegemos
            utilizando meios comercialmente aceitáveis para evitar perdas,
            roubos, acessos, divulgações, cópias, usos ou modificações não
            autorizadas.
          </p>

          <p className="text-base text-foreground/70 sm:text-xl">
            Não compartilhamos informações de identificação pessoal publicamente
            ou com terceiros, exceto quando exigido por lei.
          </p>

          <p className="text-base text-foreground/70 sm:text-xl">
            Nosso site pode conter links para sites externos que não são
            operados por nós. Esteja ciente de que não temos controle sobre o
            conteúdo e as práticas desses sites e, portanto, não podemos nos
            responsabilizar por suas respectivas políticas de privacidade.
          </p>

          <p className="text-base text-foreground/70 sm:text-xl">
            Você é livre para recusar a nossa solicitação de informações
            pessoais, compreendendo que, nesse caso, talvez não possamos
            fornecer alguns dos serviços desejados.
          </p>

          <p className="text-base text-foreground/70 sm:text-xl">
            O uso contínuo do nosso site será considerado como aceitação de
            nossas práticas em relação à privacidade e ao tratamento de
            informações pessoais. Se você tiver alguma dúvida sobre como lidamos
            com dados e informações pessoais, entre em contato conosco.
          </p>
        </div>
      </div>

      <div className="w-full px-6 flex flex-col gap-6 mb-12 sm:px-16 lg:container lg:mx-auto">
        <h3 className="text-2xl font-semibold lg:text-3xl">
          Compromisso do Usuário
        </h3>

        <div className="w-full flex flex-col gap-4">
          <p className="text-base text-foreground/70 sm:text-xl">
            O usuário se compromete a fazer uso adequado dos conteúdos e das
            informações que a CP Vistos oferece no site, com caráter
            exemplificativo, mas não limitativo:
          </p>

          <ul className="w-full flex flex-col gap-4">
            <li className="text-base text-foreground/70 sm:text-xl">
              A) Não se envolver em atividades ilegais ou contrárias à boa fé e
              à ordem pública;
            </li>

            <li className="text-base text-foreground/70 sm:text-xl">
              B) Não difundir propaganda ou conteúdo de natureza racista,
              xenofóbica, apostas ou jogos de azar, qualquer tipo de pornografia
              ilegal, apologia ao terrorismo ou conteúdos que violem os direitos
              humanos;
            </li>

            <li className="text-base text-foreground/70 sm:text-xl">
              C) Não causar danos aos sistemas físicos (hardware) e lógicos
              (software) da CP Vistos, de seus fornecedores ou terceiros, nem
              introduzir ou disseminar vírus ou quaisquer outros sistemas que
              possam causar os danos anteriormente mencionados.
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full px-6 flex flex-col gap-6 sm:px-16 lg:container lg:mx-auto">
        <h3 className="text-2xl font-semibold lg:text-3xl">Mais informações</h3>

        <div className="w-full flex flex-col gap-4">
          <p className="text-base text-foreground/70 sm:text-xl">
            Esperamos que tudo esteja esclarecido e, como mencionado
            anteriormente, caso haja algo sobre o qual você não tenha certeza se
            precisa ou não, geralmente é mais seguro manter os cookies ativados,
            especialmente ao interagir com um dos recursos que você utiliza em
            nosso site.
          </p>

          <p className="text-base text-foreground/70 sm:text-xl">
            Esta política é efetiva a partir de 14 de janeiro de 2025.
          </p>
        </div>
      </div>
    </section>
  );
}
