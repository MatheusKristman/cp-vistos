import { ReactNode } from "react";

import { Header } from "@/components/global/header";
import { FloatingCTA } from "@/components/home/floating-cta";

function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <FloatingCTA />
      {children}
    </>
  );
}

export default WebsiteLayout;
