import { Hero } from "@/components/home/hero";
import { About } from "@/components/home/about";
import { HowItWorks } from "@/components/home/how-it-works";
import { Banner } from "@/components/home/banner";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <HowItWorks />
      <Banner />
    </>
  );
}
