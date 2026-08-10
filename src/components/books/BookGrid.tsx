import type { Book } from "@/types/book";
import { BookCard } from "./BookCard";

type BookGridProps = {
  books: Book[];
  className?: string;
};

export function BookGrid({ books, className = "" }: BookGridProps) {
  return (
    <ul
      className={[
        "grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-6 xl:gap-y-10",
        className,
      ].join(" ")}
    >
      {books.map((book) => (
        <li key={book.id}>
          <BookCard book={book} />
        </li>
      ))}
    </ul>
  );
}
