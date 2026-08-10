"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUp, type AuthActionState } from "@/lib/auth/actions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const initialState: AuthActionState = {};

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(signUp, initialState);

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

        {state.message ? (
          <p
            role="status"
            className="rounded-medium border border-border bg-accent-soft/60 px-3 py-2 text-body-small text-foreground"
          >
            {state.message}
          </p>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            id="register-first-name"
            name="first_name"
            type="text"
            label="Ad"
            autoComplete="given-name"
            placeholder="Adın"
            required
          />
          <Input
            id="register-last-name"
            name="last_name"
            type="text"
            label="Soyad"
            autoComplete="family-name"
            placeholder="Soyadın"
            required
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
          required
        />

        <Input
          id="register-password"
          name="password"
          type="password"
          label="Şifre"
          autoComplete="new-password"
          placeholder="••••••••"
          required
          minLength={6}
        />

        <Input
          id="register-password-confirm"
          name="password_confirm"
          type="password"
          label="Şifre Tekrar"
          autoComplete="new-password"
          placeholder="••••••••"
          required
          minLength={6}
        />

        <label className="flex cursor-pointer items-start gap-2.5">
          <input
            type="checkbox"
            name="terms"
            className="mt-0.5 size-4 shrink-0 accent-primary"
            required
          />
          <span className="text-body-small text-foreground">
            Kullanım koşullarını ve gizlilik politikasını kabul ediyorum.
          </span>
        </label>

        <Button type="submit" size="lg" className="w-full" disabled={pending}>
          {pending ? "Hesap oluşturuluyor…" : "Hesap Oluştur"}
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
        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="w-full"
          disabled
          aria-disabled="true"
          title="Yakında"
        >
          Google ile Devam Et (Yakında)
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="w-full"
          disabled
          aria-disabled="true"
          title="Yakında"
        >
          Apple ile Devam Et (Yakında)
        </Button>
      </div>

      <p className="mt-8 text-center text-body-small text-muted">
        Zaten hesabın var mı?{" "}
        <Link
          href="/giris"
          className="rounded-small font-semibold text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Giriş Yap
        </Link>
      </p>
    </>
  );
}
