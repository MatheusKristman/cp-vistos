import { Header } from "@/components/global/header";
import { MobileMenu } from "@/components/global/mobile-menu";
import { LoginForm } from "@/components/login/login-form";

export default async function LoginPage() {
  return (
    <>
      <Header />
      <MobileMenu />
      <LoginForm />
    </>
  );
}
