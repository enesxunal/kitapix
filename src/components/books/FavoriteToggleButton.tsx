"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import {
  addFavorite,
  removeFavorite,
  type FavoriteActionState,
} from "@/lib/favorites/actions";

type FavoriteToggleButtonProps = {
  bookId: string;
  isFavorited: boolean;
  isAuthenticated: boolean;
};

const initialState: FavoriteActionState = {};

export function FavoriteToggleButton({
  bookId,
  isFavorited,
  isAuthenticated,
}: FavoriteToggleButtonProps) {
  const action = isFavorited ? removeFavorite : addFavorite;
  const [state, formAction, pending] = useActionState(action, initialState);

  if (!isAuthenticated) {
    return (
      <Link
        href="/giris"
        className="inline-flex h-11 w-full items-center justify-center rounded-medium bg-transparent px-4 text-body-small font-semibold text-foreground transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Favoriye Ekle
      </Link>
    );
  }

  return (
    <form action={formAction} className="w-full">
      <input type="hidden" name="book_id" value={bookId} />
      <Button
        type="submit"
        variant="ghost"
        size="md"
        className="w-full"
        disabled={pending}
      >
        {pending
          ? "Kaydediliyor..."
          : isFavorited
            ? "Favorilerden Kaldır"
            : "Favoriye Ekle"}
      </Button>
      {state.error ? (
        <p role="alert" className="mt-2 text-center text-caption text-danger">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
