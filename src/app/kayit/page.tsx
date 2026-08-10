import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Kayıt | Kitapix",
  description: "Kitapix’e katıl ve kitap keşfine başla.",
};

export default function RegisterPage() {
  return (
    <AuthShell>
      <section aria-labelledby="register-heading">
        <header>
          <h1 id="register-heading" className="text-h2 text-foreground">
            Kitapix’e katıl
          </h1>
          <p className="mt-3 text-body text-muted">
            Kitaplarını keşfet, listelerini oluştur ve sana özel öneriler al.
          </p>
        </header>

        <RegisterForm />
      </section>
    </AuthShell>
  );
}
