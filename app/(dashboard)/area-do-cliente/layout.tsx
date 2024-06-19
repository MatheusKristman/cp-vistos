import { FormMenu } from "@/components/dashboard/form-menu";
import { FormMobileMenu } from "@/components/dashboard/form-mobile-menu";
import { Header } from "@/components/global/header";
import { MobileMenu } from "@/components/global/mobile-menu";

export default function ClientAreaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <MobileMenu />
      <div className="h-full lg:min-h-[calc(100vh-96px)] w-full">{children}</div>
    </>
  );
}
