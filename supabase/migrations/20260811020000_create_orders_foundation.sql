-- Kitapix orders foundation
-- Tables: orders, order_items
-- RPC: create_order_from_cart

-- ---------------------------------------------------------------------------
-- orders
-- ---------------------------------------------------------------------------

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null,
  user_id uuid not null references auth.users (id) on delete restrict,
  status text not null default 'pending',
  payment_status text not null default 'unpaid',
  subtotal numeric(10, 2) not null,
  shipping_total numeric(10, 2) not null default 0,
  discount_total numeric(10, 2) not null default 0,
  grand_total numeric(10, 2) not null,
  shipping_title text,
  shipping_first_name text not null,
  shipping_last_name text not null,
  shipping_phone text,
  shipping_address_line text not null,
  shipping_district text,
  shipping_city text not null,
  shipping_postal_code text,
  shipping_country_code text not null default 'TR',
  shipping_method text not null,
  shipping_method_label text not null,
  payment_method text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint orders_order_number_key unique (order_number),
  constraint orders_subtotal_non_negative check (subtotal >= 0),
  constraint orders_shipping_total_non_negative check (shipping_total >= 0),
  constraint orders_discount_total_non_negative check (discount_total >= 0),
  constraint orders_grand_total_non_negative check (grand_total >= 0)
);

create index orders_user_id_idx on public.orders (user_id);
create index orders_created_at_idx on public.orders (created_at desc);

create trigger orders_set_updated_at
before update on public.orders
for each row
execute function public.update_updated_at_column();

revoke all on table public.orders from anon;
revoke all on table public.orders from authenticated;

grant select on table public.orders to authenticated;
grant select, insert, update, delete on table public.orders to service_role;

alter table public.orders enable row level security;

create policy "Users can select own orders"
on public.orders
for select
to authenticated
using ((select auth.uid()) = user_id);

-- ---------------------------------------------------------------------------
-- order_items
-- ---------------------------------------------------------------------------

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  book_id uuid references public.books (id) on delete set null,
  book_title text not null,
  book_slug text,
  cover_url text,
  publisher_id uuid,
  publisher_name text,
  quantity integer not null,
  unit_price numeric(10, 2) not null,
  line_total numeric(10, 2) not null,
  created_at timestamptz not null default now(),
  constraint order_items_quantity_positive check (quantity > 0),
  constraint order_items_unit_price_non_negative check (unit_price >= 0),
  constraint order_items_line_total_non_negative check (line_total >= 0)
);

create index order_items_order_id_idx on public.order_items (order_id);
create index order_items_book_id_idx on public.order_items (book_id);

revoke all on table public.order_items from anon;
revoke all on table public.order_items from authenticated;

grant select on table public.order_items to authenticated;
grant select, insert, update, delete on table public.order_items to service_role;

alter table public.order_items enable row level security;

create policy "Users can select own order items"
on public.order_items
for select
to authenticated
using (
  exists (
    select 1
    from public.orders o
    where o.id = order_items.order_id
      and o.user_id = (select auth.uid())
  )
);

-- ---------------------------------------------------------------------------
-- create_order_from_cart
-- ---------------------------------------------------------------------------

create or replace function public.create_order_from_cart(
  p_address_id uuid,
  p_shipping_method text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_cart_id uuid;
  v_address public.addresses%rowtype;
  v_shipping_method text;
  v_shipping_label text;
  v_shipping_total numeric(10, 2);
  v_subtotal numeric(10, 2) := 0;
  v_discount_total numeric(10, 2) := 0;
  v_grand_total numeric(10, 2);
  v_order_id uuid;
  v_order_number text;
  v_item_count integer;
begin
  v_user_id := auth.uid();
  if v_user_id is null then
    raise exception 'Not authenticated'
      using errcode = 'P0001';
  end if;

  if p_address_id is null then
    raise exception 'Address is required'
      using errcode = 'P0001';
  end if;

  v_shipping_method := lower(trim(coalesce(p_shipping_method, '')));

  if v_shipping_method = 'standard' then
    v_shipping_label := 'Standart Teslimat';
    v_shipping_total := 0;
  elsif v_shipping_method = 'express' then
    v_shipping_label := 'Hızlı Teslimat';
    v_shipping_total := 49.90;
  else
    raise exception 'Invalid shipping method'
      using errcode = 'P0001';
  end if;

  select *
  into v_address
  from public.addresses a
  where a.id = p_address_id
    and a.user_id = v_user_id;

  if not found then
    raise exception 'Address not found'
      using errcode = 'P0001';
  end if;

  select c.id
  into v_cart_id
  from public.carts c
  where c.user_id = v_user_id;

  if v_cart_id is null then
    raise exception 'Cart is empty'
      using errcode = 'P0001';
  end if;

  select count(*)::integer
  into v_item_count
  from public.cart_items ci
  where ci.cart_id = v_cart_id;

  if coalesce(v_item_count, 0) = 0 then
    raise exception 'Cart is empty'
      using errcode = 'P0001';
  end if;

  -- Reject cart rows that reference missing or inactive books
  if exists (
    select 1
    from public.cart_items ci
    left join public.books b on b.id = ci.book_id
    where ci.cart_id = v_cart_id
      and (b.id is null or b.is_active is not true)
  ) then
    raise exception 'Cart contains unavailable books'
      using errcode = 'P0001';
  end if;

  select coalesce(sum(ci.quantity * b.price), 0)
  into v_subtotal
  from public.cart_items ci
  join public.books b on b.id = ci.book_id
  where ci.cart_id = v_cart_id
    and b.is_active = true;

  v_grand_total := v_subtotal + v_shipping_total - v_discount_total;

  -- Human-readable unique order number: KPX-YYYY-XXXXXX
  v_order_number :=
    'KPX-'
    || to_char((now() at time zone 'Europe/Istanbul'), 'YYYY')
    || '-'
    || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6));

  insert into public.orders (
    order_number,
    user_id,
    status,
    payment_status,
    subtotal,
    shipping_total,
    discount_total,
    grand_total,
    shipping_title,
    shipping_first_name,
    shipping_last_name,
    shipping_phone,
    shipping_address_line,
    shipping_district,
    shipping_city,
    shipping_postal_code,
    shipping_country_code,
    shipping_method,
    shipping_method_label,
    payment_method
  )
  values (
    v_order_number,
    v_user_id,
    'pending',
    'unpaid',
    v_subtotal,
    v_shipping_total,
    v_discount_total,
    v_grand_total,
    v_address.title,
    v_address.first_name,
    v_address.last_name,
    v_address.phone,
    v_address.address_line,
    v_address.district,
    v_address.city,
    v_address.postal_code,
    v_address.country_code,
    v_shipping_method,
    v_shipping_label,
    'payment_pending'
  )
  returning id into v_order_id;

  insert into public.order_items (
    order_id,
    book_id,
    book_title,
    book_slug,
    cover_url,
    publisher_id,
    publisher_name,
    quantity,
    unit_price,
    line_total
  )
  select
    v_order_id,
    b.id,
    b.title,
    b.slug,
    b.cover_url,
    b.publisher_id,
    p.name,
    ci.quantity,
    b.price,
    round(ci.quantity * b.price, 2)
  from public.cart_items ci
  join public.books b on b.id = ci.book_id
  left join public.publishers p on p.id = b.publisher_id
  where ci.cart_id = v_cart_id
    and b.is_active = true;

  delete from public.cart_items
  where cart_id = v_cart_id;

  return jsonb_build_object(
    'order_id', v_order_id,
    'order_number', v_order_number
  );
end;
$$;

revoke all on function public.create_order_from_cart(uuid, text) from public;
revoke all on function public.create_order_from_cart(uuid, text) from anon;
grant execute on function public.create_order_from_cart(uuid, text) to authenticated;
grant execute on function public.create_order_from_cart(uuid, text) to service_role;
