-- Public bestseller aggregate (no order PII exposure)
-- Returns book_id + units sold from valid paid/fulfilled orders only.

create index if not exists orders_status_payment_status_idx
  on public.orders (status, payment_status);

create or replace function public.get_bestselling_books(p_limit integer default 24)
returns table (
  book_id uuid,
  units_sold bigint
)
language sql
stable
security definer
set search_path = public
as $$
  select
    oi.book_id,
    sum(oi.quantity)::bigint as units_sold
  from public.order_items oi
  inner join public.orders o on o.id = oi.order_id
  inner join public.books b on b.id = oi.book_id
  where oi.book_id is not null
    and b.is_active = true
    and o.status <> 'cancelled'
    and o.payment_status = 'paid'
    and o.payment_status <> 'refunded'
  group by oi.book_id
  order by sum(oi.quantity) desc, oi.book_id asc
  limit greatest(coalesce(p_limit, 24), 1);
$$;

revoke all on function public.get_bestselling_books(integer) from public;
grant execute on function public.get_bestselling_books(integer) to anon, authenticated;

comment on function public.get_bestselling_books(integer) is
  'Aggregates sold units for active books from non-cancelled paid orders. Exposes only book_id and units_sold.';
