create table if not exists public.ai_daily_usage (
  user_id uuid not null references auth.users(id) on delete cascade,
  usage_date date not null,
  used_count integer not null default 0 check (used_count >= 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, usage_date)
);

alter table public.ai_daily_usage enable row level security;

create or replace function public.consume_daily_ai_quota(
  p_user_id uuid,
  p_daily_limit integer default 5
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  current_used integer;
  vietnam_date date := timezone('Asia/Ho_Chi_Minh', now())::date;
begin
  insert into public.ai_daily_usage (user_id, usage_date, used_count, updated_at)
  values (p_user_id, vietnam_date, 1, now())
  on conflict (user_id, usage_date)
  do update
    set used_count = public.ai_daily_usage.used_count + 1,
        updated_at = now()
    where public.ai_daily_usage.used_count < p_daily_limit
  returning used_count into current_used;

  if current_used is null then
    return -1;
  end if;

  return greatest(p_daily_limit - current_used, 0);
end;
$$;

create or replace function public.get_daily_ai_remaining(
  p_user_id uuid,
  p_daily_limit integer default 5
)
returns integer
language sql
security definer
set search_path = public
as $$
  select greatest(
    p_daily_limit - coalesce(
      (
        select used_count
        from public.ai_daily_usage
        where user_id = p_user_id
          and usage_date = timezone('Asia/Ho_Chi_Minh', now())::date
      ),
      0
    ),
    0
  );
$$;

revoke all on function public.consume_daily_ai_quota(uuid, integer) from public, anon, authenticated;
revoke all on function public.get_daily_ai_remaining(uuid, integer) from public, anon, authenticated;
grant execute on function public.consume_daily_ai_quota(uuid, integer) to service_role;
grant execute on function public.get_daily_ai_remaining(uuid, integer) to service_role;
