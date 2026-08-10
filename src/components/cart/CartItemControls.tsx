"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import {
  removeFromCart,
  updateCartQuantity,
  type CartActionState,
} from "@/lib/cart/actions";

type CartItemControlsProps = {
  bookId: string;
  bookTitle: string;
  quantity: number;
};

const initialState: CartActionState = {};

export function CartItemControls({
  bookId,
  bookTitle,
  quantity,
}: CartItemControlsProps) {
  const [updateState, updateAction, updatePending] = useActionState(
    updateCartQuantity,
    initialState,
  );
  const [removeState, removeAction, removePending] = useActionState(
    removeFromCart,
    initialState,
  );

  const pending = updatePending || removePending;
  const error = updateState.error || removeState.error;

  return (
    <div className="space-y-3">
      <div
        className="inline-flex items-center gap-0 rounded-medium border border-border bg-surface"
        role="group"
        aria-label={`${bookTitle} adet`}
      >
        <form action={updateAction}>
          <input type="hidden" name="book_id" value={bookId} />
          <input type="hidden" name="quantity" value={quantity - 1} />
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            disabled={pending || quantity <= 1}
            className="h-9 w-9 rounded-none px-0"
            aria-label="Adeti azalt"
          >
            −
          </Button>
        </form>
        <span
          className="min-w-8 text-center text-body-small font-medium text-foreground"
          aria-live="polite"
        >
          {quantity}
        </span>
        <form action={updateAction}>
          <input type="hidden" name="book_id" value={bookId} />
          <input type="hidden" name="quantity" value={quantity + 1} />
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            disabled={pending || quantity >= 99}
            className="h-9 w-9 rounded-none px-0"
            aria-label="Adeti artır"
          >
            +
          </Button>
        </form>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <form action={removeAction}>
          <input type="hidden" name="book_id" value={bookId} />
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            disabled={pending}
            className="px-0 text-muted hover:bg-transparent hover:text-foreground"
          >
            Sil
          </Button>
        </form>
        <span className="text-caption text-border" aria-hidden="true">
          |
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled
          className="px-0 text-muted hover:bg-transparent hover:text-foreground"
        >
          Favorilere Taşı
        </Button>
      </div>

      {error ? (
        <p role="alert" className="text-caption text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
