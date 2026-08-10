-- Kitapix auth profiles foundation
-- Table: public.profiles (1:1 with auth.users)
-- Auto-create via trigger; client INSERT/DELETE not allowed

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  first_name text,
  last_name text,
  display_name text,
  avatar_url text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.update_updated_at_column();

-- ---------------------------------------------------------------------------
-- Auto-create profile on signup
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  meta_first_name text;
  meta_last_name text;
  computed_display_name text;
begin
  meta_first_name := nullif(trim(coalesce(new.raw_user_meta_data ->> 'first_name', '')), '');
  meta_last_name := nullif(trim(coalesce(new.raw_user_meta_data ->> 'last_name', '')), '');
  computed_display_name := nullif(
    trim(both from concat_ws(' ', meta_first_name, meta_last_name)),
    ''
  );

  insert into public.profiles (id, first_name, last_name, display_name)
  values (new.id, meta_first_name, meta_last_name, computed_display_name);

  return new;
end;
$$;

revoke all on function public.handle_new_user() from public;
grant execute on function public.handle_new_user() to supabase_auth_admin;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Grants (Data API) + RLS
-- No anon access. No client INSERT/DELETE — trigger owns inserts.
-- Default privileges may still grant broader access; revoke first.
-- ---------------------------------------------------------------------------

revoke all on table public.profiles from anon;
revoke all on table public.profiles from authenticated;

grant select, update on table public.profiles to authenticated;
grant select, insert, update, delete on table public.profiles to service_role;

alter table public.profiles enable row level security;

create policy "Users can select own profile"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

create policy "Users can update own profile"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);
