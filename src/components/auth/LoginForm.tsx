"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signIn, type AuthActionState } from "@/lib/auth/actions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const initialState: AuthActionState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <>
      <form className="mt-8 space-y-5" action={formAction} noValidate>
        {state.error ? (
          <p
            role="alert"
            className="rounded-medium border border-danger/30 bg-danger/5 px-3 py-2 text-body-small text-danger"
          >
            {state.error}
          </p>
        ) : null}

        <Input
          id="login-email"
          name="email"
          type="email"
          label="E-posta"
          autoComplete="email"
          inputMode="email"
          placeholder="ornek@email.com"
          required
        />

        <Input
          id="login-password"
          name="password"
          type="password"
          label="Şifre"
          autoComplete="current-password"
          placeholder="••••••••"
          required
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

        <Button type="submit" size="lg" className="w-full" disabled={pending}>
          {pending ? "Giriş yapılıyor…" : "Giriş Yap"}
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
    </>
  );
}
