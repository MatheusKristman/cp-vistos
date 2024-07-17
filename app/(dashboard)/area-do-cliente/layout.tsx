import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { MobileMenu } from "@/components/global/mobile-menu";

export default function ClientAreaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardHeader />
      <div className="h-full lg:min-h-[calc(100vh-96px)] w-full">{children}</div>
    </>
  );
}
