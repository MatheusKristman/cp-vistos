import { Header } from "@/components/global/header";
import { MobileMenu } from "@/components/global/mobile-menu";
import { DashboardMobileMenu } from "@/components/dashboard/dashboard-mobile-menu";
import { DashboardMenu } from "@/components/dashboard/dashboard-menu";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <MobileMenu />
      <DashboardMobileMenu />
      <div className="h-full lg:min-h-[calc(100vh-96px)] w-full flex">
        <DashboardMenu />
        {children}
      </div>
    </>
  );
}
