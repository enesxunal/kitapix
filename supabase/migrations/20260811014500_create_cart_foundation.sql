-- Kitapix cart foundation
-- Tables: carts, cart_items

-- ---------------------------------------------------------------------------
-- carts
-- ---------------------------------------------------------------------------

create table public.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint carts_user_id_key unique (user_id)
);

create trigger carts_set_updated_at
before update on public.carts
for each row
execute function public.update_updated_at_column();

revoke all on table public.carts from anon;
revoke all on table public.carts from authenticated;

grant select, insert, update, delete on table public.carts to authenticated;
grant select, insert, update, delete on table public.carts to service_role;

alter table public.carts enable row level security;

create policy "Users can select own carts"
on public.carts
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can insert own carts"
on public.carts
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update own carts"
on public.carts
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete own carts"
on public.carts
for delete
to authenticated
using ((select auth.uid()) = user_id);

-- ---------------------------------------------------------------------------
-- cart_items
-- ---------------------------------------------------------------------------

create table public.cart_items (
  cart_id uuid not null references public.carts (id) on delete cascade,
  book_id uuid not null references public.books (id) on delete cascade,
  quantity integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (cart_id, book_id),
  constraint cart_items_quantity_positive check (quantity > 0)
);

create index cart_items_book_id_idx on public.cart_items (book_id);

create trigger cart_items_set_updated_at
before update on public.cart_items
for each row
execute function public.update_updated_at_column();

revoke all on table public.cart_items from anon;
revoke all on table public.cart_items from authenticated;

grant select, insert, update, delete on table public.cart_items to authenticated;
grant select, insert, update, delete on table public.cart_items to service_role;

alter table public.cart_items enable row level security;

create policy "Users can select own cart items"
on public.cart_items
for select
to authenticated
using (
  exists (
    select 1
    from public.carts c
    where c.id = cart_items.cart_id
      and c.user_id = (select auth.uid())
  )
);

create policy "Users can insert own cart items"
on public.cart_items
for insert
to authenticated
with check (
  exists (
    select 1
    from public.carts c
    where c.id = cart_items.cart_id
      and c.user_id = (select auth.uid())
  )
);

create policy "Users can update own cart items"
on public.cart_items
for update
to authenticated
using (
  exists (
    select 1
    from public.carts c
    where c.id = cart_items.cart_id
      and c.user_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1
    from public.carts c
    where c.id = cart_items.cart_id
      and c.user_id = (select auth.uid())
  )
);

create policy "Users can delete own cart items"
on public.cart_items
for delete
to authenticated
using (
  exists (
    select 1
    from public.carts c
    where c.id = cart_items.cart_id
      and c.user_id = (select auth.uid())
  )
);
