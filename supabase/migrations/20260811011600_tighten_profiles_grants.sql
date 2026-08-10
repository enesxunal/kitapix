-- Tighten profiles table privileges.
-- Project default privileges still grant broad table access to anon/authenticated;
-- revoke those and keep only the intended surface.

revoke all on table public.profiles from anon;
revoke all on table public.profiles from authenticated;

grant select, update on table public.profiles to authenticated;
grant select, insert, update, delete on table public.profiles to service_role;
