"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { addToCart, type CartActionState } from "@/lib/cart/actions";

type AddToCartButtonProps = {
  bookId: string;
  isAuthenticated: boolean;
};

const initialState: CartActionState = {};

export function AddToCartButton({
  bookId,
  isAuthenticated,
}: AddToCartButtonProps) {
  const [state, formAction, pending] = useActionState(addToCart, initialState);

  if (!isAuthenticated) {
    return (
      <Link
        href="/giris"
        className="inline-flex h-12 w-full items-center justify-center rounded-medium bg-primary px-5 text-body-small font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"
      >
        Sepete Ekle
      </Link>
    );
  }

  return (
    <form action={formAction} className="w-full">
      <input type="hidden" name="book_id" value={bookId} />
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending
          ? "Ekleniyor..."
          : state.success
            ? "Sepete Eklendi"
            : "Sepete Ekle"}
      </Button>
      {state.error ? (
        <p role="alert" className="mt-2 text-center text-caption text-danger">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
