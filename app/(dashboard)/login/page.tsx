import { auth, signOut } from "@/auth";
import { Header } from "@/components/global/header";
import { MobileMenu } from "@/components/global/mobile-menu";
import { LoginForm } from "@/components/login/login-form";
import { Button } from "@/components/ui/button";

export default async function LoginPage() {
  return (
    <>
      <Header />
      <MobileMenu />
      <LoginForm />
    </>
  );
}
