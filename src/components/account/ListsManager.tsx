"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { ReadingListSummary } from "@/lib/data/lists";
import {
  createReadingList,
  deleteReadingList,
  updateReadingList,
  type ListActionState,
} from "@/lib/lists/actions";
import type { Book } from "@/types/book";

type ListsManagerProps = {
  lists: ReadingListSummary[];
};

const initialState: ListActionState = {};
const previewZIndex = ["z-40", "z-30", "z-20", "z-10"] as const;

function ListCoverPreview({ books }: { books: Book[] }) {
  const previewBooks = books.slice(0, 4);

  if (previewBooks.length === 0) {
    return (
      <p className="text-caption text-muted">Henüz kitap eklenmedi.</p>
    );
  }

  return (
    <ul className="flex items-end" aria-label="Liste kitap kapakları">
      {previewBooks.map((book, index) => (
        <li
          key={`${book.id}-${index}`}
          className={[
            "relative",
            previewZIndex[index],
            index === 0 ? "" : "-ml-3",
          ].join(" ")}
        >
          <div className="relative aspect-[2/3] w-12 overflow-hidden rounded-medium border border-border bg-surface-muted sm:w-14">
            {book.cover ? (
              <Image
                src={book.cover}
                alt={`${book.title} kitap kapağı`}
                fill
                sizes="56px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-surface-muted">
                <span className="text-[10px] text-muted">Kapak yok</span>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

function CreateListForm({ onDone }: { onDone: () => void }) {
  const [state, formAction, pending] = useActionState(
    async (prev: ListActionState, formData: FormData) => {
      const result = await createReadingList(prev, formData);
      if (!result.error) {
        onDone();
      }
      return result;
    },
    initialState,
  );

  return (
    <form
      action={formAction}
      className="rounded-large border border-border bg-surface p-5 sm:p-6"
    >
      <h3 className="text-body font-semibold text-foreground">Yeni Liste</h3>
      {state.error ? (
        <p role="alert" className="mt-3 text-body-small text-danger">
          {state.error}
        </p>
      ) : null}
      <div className="mt-4 space-y-3">
        <Input
          id="new-list-name"
          name="name"
          label="Liste adı"
          required
          placeholder="Örn. Bu ay okuyacaklarım"
        />
        <Input
          id="new-list-description"
          name="description"
          label="Açıklama (isteğe bağlı)"
          placeholder="Kısa bir not"
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="submit" variant="primary" size="sm" disabled={pending}>
          {pending ? "Oluşturuluyor..." : "Oluştur"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onDone}
          disabled={pending}
        >
          Vazgeç
        </Button>
      </div>
    </form>
  );
}

function EditListForm({
  list,
  onDone,
}: {
  list: ReadingListSummary;
  onDone: () => void;
}) {
  const [state, formAction, pending] = useActionState(
    async (prev: ListActionState, formData: FormData) => {
      const result = await updateReadingList(prev, formData);
      if (!result.error) {
        onDone();
      }
      return result;
    },
    initialState,
  );

  return (
    <form action={formAction} className="mt-4 space-y-3">
      <input type="hidden" name="list_id" value={list.id} />
      {state.error ? (
        <p role="alert" className="text-body-small text-danger">
          {state.error}
        </p>
      ) : null}
      <Input
        id={`edit-list-name-${list.id}`}
        name="name"
        label="Liste adı"
        required
        defaultValue={list.name}
      />
      <Input
        id={`edit-list-description-${list.id}`}
        name="description"
        label="Açıklama"
        defaultValue={list.description ?? ""}
      />
      <div className="flex flex-wrap gap-2">
        <Button type="submit" variant="primary" size="sm" disabled={pending}>
          {pending ? "Kaydediliyor..." : "Kaydet"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onDone}
          disabled={pending}
        >
          Vazgeç
        </Button>
      </div>
    </form>
  );
}

function ListCard({ list }: { list: ReadingListSummary }) {
  const [editing, setEditing] = useState(false);

  return (
    <article className="flex h-full flex-col rounded-large border border-border bg-surface p-5 sm:p-6">
      <div className="flex flex-1 flex-col gap-4">
        <div>
          <h3 className="text-body font-semibold text-foreground">{list.name}</h3>
          {list.description ? (
            <p className="mt-2 text-body-small text-muted">{list.description}</p>
          ) : null}
          <p className="mt-3 text-caption font-medium text-muted">
            {list.bookCount} kitap
          </p>
        </div>

        <ListCoverPreview books={list.books} />
      </div>

      {editing ? (
        <EditListForm list={list} onDone={() => setEditing(false)} />
      ) : (
        <div className="mt-5 flex flex-wrap gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setEditing(true)}
          >
            Düzenle
          </Button>
          <form action={deleteReadingList}>
            <input type="hidden" name="list_id" value={list.id} />
            <Button type="submit" variant="ghost" size="sm">
              Sil
            </Button>
          </form>
        </div>
      )}
    </article>
  );
}

export function ListsManager({ lists }: ListsManagerProps) {
  const [showCreate, setShowCreate] = useState(false);
  const isEmpty = lists.length === 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {!showCreate ? (
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => setShowCreate(true)}
          >
            Yeni Liste Oluştur
          </Button>
        ) : null}
      </div>

      {showCreate ? (
        <CreateListForm onDone={() => setShowCreate(false)} />
      ) : null}

      {isEmpty && !showCreate ? (
        <section
          aria-labelledby="lists-empty-heading"
          className="rounded-large border border-border bg-surface px-6 py-12 text-center"
        >
          <h2 id="lists-empty-heading" className="text-h3 text-foreground">
            Henüz bir listen yok.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-body text-muted">
            Okumak istediğin kitapları düzenlemek için ilk listeni oluştur.
          </p>
          <div className="mt-6">
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() => setShowCreate(true)}
            >
              Yeni Liste Oluştur
            </Button>
          </div>
        </section>
      ) : null}

      {!isEmpty ? (
        <section aria-labelledby="lists-grid-heading">
          <h2 id="lists-grid-heading" className="sr-only">
            Okuma listeleri
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {lists.map((list) => (
              <li key={list.id}>
                <ListCard list={list} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
