import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

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

        <form className="mt-8 space-y-5" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              id="register-first-name"
              name="firstName"
              type="text"
              label="Ad"
              autoComplete="given-name"
              placeholder="Adın"
            />
            <Input
              id="register-last-name"
              name="lastName"
              type="text"
              label="Soyad"
              autoComplete="family-name"
              placeholder="Soyadın"
            />
          </div>

          <Input
            id="register-email"
            name="email"
            type="email"
            label="E-posta"
            autoComplete="email"
            inputMode="email"
            placeholder="ornek@email.com"
          />

          <Input
            id="register-password"
            name="password"
            type="password"
            label="Şifre"
            autoComplete="new-password"
            placeholder="••••••••"
          />

          <Input
            id="register-password-confirm"
            name="passwordConfirm"
            type="password"
            label="Şifre Tekrar"
            autoComplete="new-password"
            placeholder="••••••••"
          />

          <label className="flex cursor-pointer items-start gap-2.5">
            <input
              type="checkbox"
              name="terms"
              className="mt-0.5 size-4 shrink-0 accent-primary"
            />
            <span className="text-body-small text-foreground">
              Kullanım koşullarını ve gizlilik politikasını kabul ediyorum.
            </span>
          </label>

          <Button type="button" size="lg" className="w-full">
            Hesap Oluştur
          </Button>
        </form>

        <div className="mt-8" role="separator" aria-label="veya">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-caption text-muted">veya</span>
            <div className="h-px flex-1 bg-border" />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Button type="button" variant="secondary" size="lg" className="w-full">
            Google ile Devam Et
          </Button>
          <Button type="button" variant="secondary" size="lg" className="w-full">
            Apple ile Devam Et
          </Button>
        </div>

        <p className="mt-8 text-center text-body-small text-muted">
          Zaten hesabın var mı?{" "}
          <Link
            href="/giris"
            className="font-semibold text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-small"
          >
            Giriş Yap
          </Link>
        </p>
      </section>
    </AuthShell>
  );
}
