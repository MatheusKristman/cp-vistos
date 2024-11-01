import { DashboardHeader } from "@/app/(dashboard)/perfil/components/dashboard-header";

export default function ClientAreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-20 sm:pt-36">
      <DashboardHeader />
      <div className="h-full lg:min-h-[calc(100vh-96px)] w-full">
        {children}
      </div>
    </div>
  );
}
