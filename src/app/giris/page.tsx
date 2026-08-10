import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

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

        <form className="mt-8 space-y-5" noValidate>
          <Input
            id="login-email"
            name="email"
            type="email"
            label="E-posta"
            autoComplete="email"
            inputMode="email"
            placeholder="ornek@email.com"
          />

          <Input
            id="login-password"
            name="password"
            type="password"
            label="Şifre"
            autoComplete="current-password"
            placeholder="••••••••"
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                name="remember"
                className="size-4 shrink-0 accent-primary"
              />
              <span className="text-body-small text-foreground">Beni hatırla</span>
            </label>

            <button
              type="button"
              className="text-body-small font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-small"
            >
              Şifremi unuttum
            </button>
          </div>

          <Button type="button" size="lg" className="w-full">
            Giriş Yap
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
          Henüz hesabın yok mu?{" "}
          <Link
            href="/kayit"
            className="font-semibold text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-small"
          >
            Hesap Oluştur
          </Link>
        </p>
      </section>
    </AuthShell>
  );
}
