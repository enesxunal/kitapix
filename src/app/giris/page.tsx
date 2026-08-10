import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Giriş | Kitapix",
  description: "Kitapix hesabına giriş yap.",
};

export default function LoginPage() {
  return (
    <AuthShell>
      <section aria-labelledby="login-heading">
        <header>
          <h1 id="login-heading" className="text-h2 text-foreground">
            Tekrar hoş geldin
          </h1>
          <p className="mt-3 text-body text-muted">
            Kitaplarını keşfetmeye kaldığın yerden devam et.
          </p>
        </header>

        <LoginForm />
      </section>
    </AuthShell>
  );
}
