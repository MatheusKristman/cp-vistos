import { HomeHero } from "@/components/home/home-hero";
import { HomeServices } from "@/components/home/home-services";
import { HomeAbout } from "@/components/home/home-about";
import { HomeBenefits } from "@/components/home/home-benefits";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeServices />
      <HomeAbout />
      <HomeBenefits />
    </>
  );
}
