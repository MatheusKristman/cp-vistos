import { ReactNode } from "react";

import { Header } from "@/components/global/header";
import { MobileMenu } from "@/components/global/mobile-menu";

function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <MobileMenu />
      {children}
    </>
  );
}

export default WebsiteLayout;
