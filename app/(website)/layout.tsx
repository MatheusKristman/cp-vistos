import { ReactNode } from "react";

import { Header } from "@/components/global/header";
import { MobileMenu } from "@/components/global/mobile-menu";
import { Footer } from "@/components/global/footer";

function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default WebsiteLayout;
