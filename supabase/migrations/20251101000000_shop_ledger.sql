create table if not exists public.shop_profiles (
  owner_id uuid primary key references auth.users (id) on delete cascade,
  shop_name text not null default 'My Shop' check (char_length(btrim(shop_name)) between 1 and 80),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  name text not null check (char_length(btrim(name)) between 1 and 100),
  phone text check (phone is null or char_length(phone) <= 24),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint customers_id_owner_unique unique (id, owner_id)
);

create unique index if not exists customers_owner_name_unique
  on public.customers (owner_id, lower(name));

create table if not exists public.ledger_entries (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  customer_id uuid not null,
  kind text not null check (kind in ('credit', 'payment', 'sale')),
  amount numeric(12, 2) not null check (amount > 0),
  occurred_at timestamptz not null default now(),
  note text check (note is null or char_length(note) <= 240),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint ledger_entries_customer_owner_fkey
    foreign key (customer_id, owner_id)
    references public.customers (id, owner_id)
    on delete restrict
);

create index if not exists customers_owner_name_idx on public.customers (owner_id, name);
create index if not exists ledger_entries_owner_occurred_idx on public.ledger_entries (owner_id, occurred_at desc);
create index if not exists ledger_entries_customer_occurred_idx on public.ledger_entries (customer_id, occurred_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = pg_catalog.now();
  return new;
end;
$$;

create or replace function public.create_shop_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.shop_profiles (owner_id, shop_name)
  values (
    new.id,
    coalesce(nullif(pg_catalog.btrim(new.raw_user_meta_data ->> 'shop_name'), ''), 'My Shop')
  )
  on conflict (owner_id) do nothing;
  return new;
end;
$$;

drop trigger if exists set_shop_profiles_updated_at on public.shop_profiles;
create trigger set_shop_profiles_updated_at
before update on public.shop_profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_customers_updated_at on public.customers;
create trigger set_customers_updated_at
before update on public.customers
for each row execute function public.set_updated_at();

drop trigger if exists set_ledger_entries_updated_at on public.ledger_entries;
create trigger set_ledger_entries_updated_at
before update on public.ledger_entries
for each row execute function public.set_updated_at();

drop trigger if exists create_shop_profile_after_signup on auth.users;
create trigger create_shop_profile_after_signup
after insert on auth.users
for each row execute function public.create_shop_profile_for_new_user();

alter table public.shop_profiles enable row level security;
alter table public.customers enable row level security;
alter table public.ledger_entries enable row level security;

drop policy if exists "Shop owners manage their profile" on public.shop_profiles;
create policy "Shop owners manage their profile"
  on public.shop_profiles for all to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

drop policy if exists "Shop owners manage their customers" on public.customers;
create policy "Shop owners manage their customers"
  on public.customers for all to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

drop policy if exists "Shop owners manage their ledger entries" on public.ledger_entries;
create policy "Shop owners manage their ledger entries"
  on public.ledger_entries for all to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

revoke all on public.shop_profiles, public.customers, public.ledger_entries from anon, public;
grant select, insert, update, delete on public.shop_profiles, public.customers, public.ledger_entries to authenticated;

do $$
begin
  if exists (select 1 from pg_catalog.pg_publication where pubname = 'supabase_realtime') then
    if not exists (
      select 1 from pg_catalog.pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'customers'
    ) then
      execute 'alter publication supabase_realtime add table public.customers';
    end if;
    if not exists (
      select 1 from pg_catalog.pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'ledger_entries'
    ) then
      execute 'alter publication supabase_realtime add table public.ledger_entries';
    end if;
  end if;
end;
$$;
