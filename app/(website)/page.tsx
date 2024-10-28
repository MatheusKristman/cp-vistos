import { Hero } from "@/components/home/hero";
import { About } from "@/components/home/about";
import { HowItWorks } from "@/components/home/how-it-works";
import { Banner } from "@/components/home/banner";
import { Services } from "@/components/home/services";
import { Testimonial } from "@/components/home/testimonial";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <HowItWorks />
      <Banner />
      <Services />
      <Testimonial />
    </>
  );
}
