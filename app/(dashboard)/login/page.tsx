import { auth } from "@/auth";
import { Header } from "@/components/global/header";
import { MobileMenu } from "@/components/global/mobile-menu";
import { LoginForm } from "@/components/login/login-form";

export default async function LoginPage() {
  const session = await auth();

  console.log(session);

  return (
    <>
      <Header />
      <MobileMenu />
      <LoginForm />
    </>
  );
}
