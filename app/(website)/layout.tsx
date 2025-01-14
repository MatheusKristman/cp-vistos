import { ReactNode } from "react";

import { Header } from "@/components/global/header";

function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default WebsiteLayout;
