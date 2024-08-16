import { DashboardHeader } from "@/app/(dashboard)/perfil/components/dashboard-header";
import { MobileMenu } from "@/components/global/mobile-menu";

//TODO: verificar o que precisa mudar no header para o cliente

export default function ClientAreaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-20 lg:pt-24">
      <DashboardHeader />
      <div className="h-full lg:min-h-[calc(100vh-96px)] w-full">{children}</div>
    </div>
  );
}
