-- Kitapix user library foundation
-- Tables: favorites, reading_lists, reading_list_items, addresses

-- ---------------------------------------------------------------------------
-- favorites
-- ---------------------------------------------------------------------------

create table public.favorites (
  user_id uuid not null references auth.users (id) on delete cascade,
  book_id uuid not null references public.books (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, book_id)
);

create index favorites_book_id_idx on public.favorites (book_id);

revoke all on table public.favorites from anon;
revoke all on table public.favorites from authenticated;

grant select, insert, delete on table public.favorites to authenticated;
grant select, insert, update, delete on table public.favorites to service_role;

alter table public.favorites enable row level security;

create policy "Users can select own favorites"
on public.favorites
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can insert own favorites"
on public.favorites
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can delete own favorites"
on public.favorites
for delete
to authenticated
using ((select auth.uid()) = user_id);

-- ---------------------------------------------------------------------------
-- reading_lists
-- ---------------------------------------------------------------------------

create table public.reading_lists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint reading_lists_name_not_blank check (length(trim(name)) > 0)
);

create index reading_lists_user_id_idx on public.reading_lists (user_id);

create trigger reading_lists_set_updated_at
before update on public.reading_lists
for each row
execute function public.update_updated_at_column();

revoke all on table public.reading_lists from anon;
revoke all on table public.reading_lists from authenticated;

grant select, insert, update, delete on table public.reading_lists to authenticated;
grant select, insert, update, delete on table public.reading_lists to service_role;

alter table public.reading_lists enable row level security;

create policy "Users can select own reading lists"
on public.reading_lists
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can insert own reading lists"
on public.reading_lists
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update own reading lists"
on public.reading_lists
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete own reading lists"
on public.reading_lists
for delete
to authenticated
using ((select auth.uid()) = user_id);

-- ---------------------------------------------------------------------------
-- reading_list_items
-- ---------------------------------------------------------------------------

create table public.reading_list_items (
  list_id uuid not null references public.reading_lists (id) on delete cascade,
  book_id uuid not null references public.books (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (list_id, book_id)
);

create index reading_list_items_book_id_idx on public.reading_list_items (book_id);

revoke all on table public.reading_list_items from anon;
revoke all on table public.reading_list_items from authenticated;

grant select, insert, delete on table public.reading_list_items to authenticated;
grant select, insert, update, delete on table public.reading_list_items to service_role;

alter table public.reading_list_items enable row level security;

create policy "Users can select own reading list items"
on public.reading_list_items
for select
to authenticated
using (
  exists (
    select 1
    from public.reading_lists rl
    where rl.id = reading_list_items.list_id
      and rl.user_id = (select auth.uid())
  )
);

create policy "Users can insert own reading list items"
on public.reading_list_items
for insert
to authenticated
with check (
  exists (
    select 1
    from public.reading_lists rl
    where rl.id = reading_list_items.list_id
      and rl.user_id = (select auth.uid())
  )
);

create policy "Users can delete own reading list items"
on public.reading_list_items
for delete
to authenticated
using (
  exists (
    select 1
    from public.reading_lists rl
    where rl.id = reading_list_items.list_id
      and rl.user_id = (select auth.uid())
  )
);

-- ---------------------------------------------------------------------------
-- addresses
-- ---------------------------------------------------------------------------

create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  first_name text not null,
  last_name text not null,
  phone text,
  address_line text not null,
  district text,
  city text not null,
  postal_code text,
  country_code text not null default 'TR',
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint addresses_title_not_blank check (length(trim(title)) > 0),
  constraint addresses_first_name_not_blank check (length(trim(first_name)) > 0),
  constraint addresses_last_name_not_blank check (length(trim(last_name)) > 0),
  constraint addresses_address_line_not_blank check (length(trim(address_line)) > 0),
  constraint addresses_city_not_blank check (length(trim(city)) > 0)
);

create index addresses_user_id_idx on public.addresses (user_id);

create trigger addresses_set_updated_at
before update on public.addresses
for each row
execute function public.update_updated_at_column();

revoke all on table public.addresses from anon;
revoke all on table public.addresses from authenticated;

grant select, insert, update, delete on table public.addresses to authenticated;
grant select, insert, update, delete on table public.addresses to service_role;

alter table public.addresses enable row level security;

create policy "Users can select own addresses"
on public.addresses
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can insert own addresses"
on public.addresses
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update own addresses"
on public.addresses
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete own addresses"
on public.addresses
for delete
to authenticated
using ((select auth.uid()) = user_id);
