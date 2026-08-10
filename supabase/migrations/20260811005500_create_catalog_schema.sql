-- Kitapix core book catalog schema
-- Tables: publishers, authors, categories, books, book_authors, book_categories

-- ---------------------------------------------------------------------------
-- updated_at helper
-- ---------------------------------------------------------------------------

create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- publishers
-- ---------------------------------------------------------------------------

create table public.publishers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  logo_url text,
  website_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger publishers_set_updated_at
before update on public.publishers
for each row
execute function public.update_updated_at_column();

-- ---------------------------------------------------------------------------
-- authors
-- ---------------------------------------------------------------------------

create table public.authors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  bio text,
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger authors_set_updated_at
before update on public.authors
for each row
execute function public.update_updated_at_column();

-- ---------------------------------------------------------------------------
-- categories
-- ---------------------------------------------------------------------------

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  parent_id uuid references public.categories (id) on delete set null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index categories_parent_id_idx on public.categories (parent_id);

create trigger categories_set_updated_at
before update on public.categories
for each row
execute function public.update_updated_at_column();

-- ---------------------------------------------------------------------------
-- books
-- ---------------------------------------------------------------------------

create table public.books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  short_description text,
  publisher_id uuid references public.publishers (id) on delete set null,
  cover_url text,
  isbn text,
  language text not null default 'tr',
  format text not null default 'printed',
  page_count integer,
  publication_date date,
  price numeric(10, 2) not null,
  original_price numeric(10, 2),
  rating numeric(3, 2),
  review_count integer not null default 0,
  badge text,
  is_active boolean not null default true,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint books_price_non_negative check (price >= 0),
  constraint books_original_price_non_negative check (original_price is null or original_price >= 0),
  constraint books_rating_range check (rating is null or (rating >= 0 and rating <= 5)),
  constraint books_review_count_non_negative check (review_count >= 0),
  constraint books_page_count_positive check (page_count is null or page_count > 0)
);

create index books_publisher_id_idx on public.books (publisher_id);
create index books_is_active_idx on public.books (is_active);
create index books_is_featured_idx on public.books (is_featured);
create index books_publication_date_idx on public.books (publication_date);

create trigger books_set_updated_at
before update on public.books
for each row
execute function public.update_updated_at_column();

-- ---------------------------------------------------------------------------
-- book_authors (many-to-many)
-- ---------------------------------------------------------------------------

create table public.book_authors (
  book_id uuid not null references public.books (id) on delete cascade,
  author_id uuid not null references public.authors (id) on delete cascade,
  author_order integer not null default 0,
  primary key (book_id, author_id)
);

create index book_authors_author_id_idx on public.book_authors (author_id);

-- ---------------------------------------------------------------------------
-- book_categories (many-to-many)
-- ---------------------------------------------------------------------------

create table public.book_categories (
  book_id uuid not null references public.books (id) on delete cascade,
  category_id uuid not null references public.categories (id) on delete cascade,
  primary key (book_id, category_id)
);

create index book_categories_category_id_idx on public.book_categories (category_id);

-- ---------------------------------------------------------------------------
-- Grants (Data API exposure) + RLS
-- ---------------------------------------------------------------------------

grant select on table public.publishers to anon, authenticated;
grant select on table public.authors to anon, authenticated;
grant select on table public.categories to anon, authenticated;
grant select on table public.books to anon, authenticated;
grant select on table public.book_authors to anon, authenticated;
grant select on table public.book_categories to anon, authenticated;

alter table public.publishers enable row level security;
alter table public.authors enable row level security;
alter table public.categories enable row level security;
alter table public.books enable row level security;
alter table public.book_authors enable row level security;
alter table public.book_categories enable row level security;

create policy "Public can read active publishers"
on public.publishers
for select
to anon, authenticated
using (is_active = true);

create policy "Public can read active authors"
on public.authors
for select
to anon, authenticated
using (is_active = true);

create policy "Public can read active categories"
on public.categories
for select
to anon, authenticated
using (is_active = true);

create policy "Public can read active books"
on public.books
for select
to anon, authenticated
using (is_active = true);

create policy "Public can read book authors"
on public.book_authors
for select
to anon, authenticated
using (true);

create policy "Public can read book categories"
on public.book_categories
for select
to anon, authenticated
using (true);
