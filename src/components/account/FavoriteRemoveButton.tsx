import { Button } from "@/components/ui/Button";
import { removeFavoriteAction } from "@/lib/favorites/actions";

type FavoriteRemoveButtonProps = {
  bookId: string;
  bookTitle: string;
};

export function FavoriteRemoveButton({
  bookId,
  bookTitle,
}: FavoriteRemoveButtonProps) {
  return (
    <form action={removeFavoriteAction} className="mt-2">
      <input type="hidden" name="book_id" value={bookId} />
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        className="w-full"
        aria-label={`${bookTitle} favorilerden kaldır`}
      >
        Favoriden Kaldır
      </Button>
    </form>
  );
}
