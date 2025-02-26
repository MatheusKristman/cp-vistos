import { Hero } from "@/components/home/hero";
import { About } from "@/components/home/about";
import { HowItWorks } from "@/components/home/how-it-works";
import { Banner } from "@/components/home/banner";
import { Services } from "@/components/home/services";
import { Testimonial } from "@/components/home/testimonial";
import { Features } from "@/components/home/features";
import { Footer } from "@/components/global/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <HowItWorks />
      <Banner />
      <Services />
      <div className="w-full bg-mobile-testimonial bg-no-repeat bg-[length:100%_80%] bg-bottom sm:bg-tablet-testimonial lg:bg-desktop-testimonial">
        <Testimonial />
        <Features />
      </div>
      <Footer />
    </>
  );
}
