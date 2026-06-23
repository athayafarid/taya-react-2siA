-- Customer & Membership Management System
-- Run this file in Supabase SQL Editor before connecting the React app.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique not null references auth.users(id) on delete cascade,
  full_name varchar(255),
  email varchar(255),
  role varchar(20) not null default 'member',
  tier varchar(20) not null default 'bronze',
  points integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_role_check check (role in ('admin', 'member', 'guest')),
  constraint profiles_tier_check check (tier in ('bronze', 'silver', 'gold', 'platinum')),
  constraint profiles_points_check check (points >= 0)
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null,
  description text,
  price numeric(12, 2) not null default 0,
  stock integer not null default 0,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint products_price_check check (price >= 0),
  constraint products_stock_check check (stock >= 0)
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  order_number varchar(50) unique,
  total_amount numeric(12, 2) not null default 0,
  earned_points integer not null default 0,
  status varchar(20) not null default 'pending',
  points_applied boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint orders_status_check check (status in ('pending', 'completed', 'cancelled')),
  constraint orders_total_amount_check check (total_amount >= 0),
  constraint orders_earned_points_check check (earned_points >= 0)
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  quantity integer not null,
  unit_price numeric(12, 2) not null,
  subtotal numeric(12, 2) not null,
  constraint order_items_quantity_check check (quantity > 0),
  constraint order_items_unit_price_check check (unit_price >= 0),
  constraint order_items_subtotal_check check (subtotal >= 0)
);

create table if not exists public.point_histories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  order_id uuid references public.orders(id) on delete set null,
  points integer not null,
  description text,
  created_at timestamptz not null default now(),
  constraint point_histories_points_check check (points <> 0)
);

create index if not exists profiles_auth_user_id_idx on public.profiles(auth_user_id);
create index if not exists profiles_role_idx on public.profiles(role);
create index if not exists products_name_idx on public.products(name);
create index if not exists orders_user_id_idx on public.orders(user_id);
create index if not exists orders_status_idx on public.orders(status);
create index if not exists order_items_order_id_idx on public.order_items(order_id);
create index if not exists order_items_product_id_idx on public.order_items(product_id);
create index if not exists point_histories_user_id_idx on public.point_histories(user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

create or replace function public.current_profile_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role
  from public.profiles
  where auth_user_id = auth.uid()
  limit 1
$$;

create or replace function public.current_profile_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id
  from public.profiles
  where auth_user_id = auth.uid()
  limit 1
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_profile_role() = 'admin', false)
$$;

create or replace function public.prevent_member_role_change()
returns trigger
language plpgsql
as $$
begin
  if not public.is_admin() and new.role <> old.role then
    raise exception 'Only admins can change profile roles';
  end if;

  return new;
end;
$$;

drop trigger if exists profiles_prevent_member_role_change on public.profiles;
create trigger profiles_prevent_member_role_change
before update on public.profiles
for each row execute function public.prevent_member_role_change();

create or replace function public.calculate_tier(total_points integer)
returns text
language plpgsql
immutable
as $$
begin
  if total_points >= 3000 then
    return 'platinum';
  elsif total_points >= 1500 then
    return 'gold';
  elsif total_points >= 500 then
    return 'silver';
  end if;

  return 'bronze';
end;
$$;

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (auth_user_id, full_name, email, role, tier, points)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    'member',
    'bronze',
    0
  )
  on conflict (auth_user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

create or replace function public.generate_order_number()
returns trigger
language plpgsql
as $$
declare
  daily_count integer;
begin
  if new.order_number is not null then
    return new;
  end if;

  select count(*) + 1
  into daily_count
  from public.orders
  where created_at::date = coalesce(new.created_at, now())::date;

  new.order_number = 'ORD-' || to_char(coalesce(new.created_at, now()), 'YYYYMMDD') || '-' || lpad(daily_count::text, 4, '0');
  return new;
end;
$$;

drop trigger if exists orders_generate_order_number on public.orders;
create trigger orders_generate_order_number
before insert on public.orders
for each row execute function public.generate_order_number();

create or replace function public.apply_completed_order_points()
returns trigger
language plpgsql
as $$
declare
  calculated_points integer;
  new_total_points integer;
begin
  if new.status = 'completed' and coalesce(old.status, '') <> 'completed' and new.points_applied = false then
    calculated_points := floor(new.total_amount / 10000);

    new.earned_points := calculated_points;
    new.points_applied := true;

    if calculated_points > 0 then
      insert into public.point_histories (user_id, order_id, points, description)
      values (new.user_id, new.id, calculated_points, 'Points earned from order ' || coalesce(new.order_number, new.id::text));

      update public.profiles
      set points = points + calculated_points
      where id = new.user_id
      returning points into new_total_points;

      update public.profiles
      set tier = public.calculate_tier(new_total_points)
      where id = new.user_id;
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists orders_apply_completed_order_points on public.orders;
create trigger orders_apply_completed_order_points
before update on public.orders
for each row execute function public.apply_completed_order_points();

create or replace function public.recalculate_order_total()
returns trigger
language plpgsql
as $$
declare
  target_order_id uuid;
begin
  target_order_id := coalesce(new.order_id, old.order_id);

  update public.orders
  set total_amount = coalesce((
    select sum(subtotal)
    from public.order_items
    where order_id = target_order_id
  ), 0)
  where id = target_order_id;

  return coalesce(new, old);
end;
$$;

drop trigger if exists order_items_recalculate_order_total on public.order_items;
create trigger order_items_recalculate_order_total
after insert or update or delete on public.order_items
for each row execute function public.recalculate_order_total();

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.point_histories enable row level security;

drop policy if exists "Admins can manage all profiles" on public.profiles;
drop policy if exists "Users can read own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Admins can manage products" on public.products;
drop policy if exists "Members can read products" on public.products;
drop policy if exists "Admins can manage all orders" on public.orders;
drop policy if exists "Members can read own orders" on public.orders;
drop policy if exists "Members can create own orders" on public.orders;
drop policy if exists "Members can update own pending orders" on public.orders;
drop policy if exists "Admins can manage all order items" on public.order_items;
drop policy if exists "Members can read own order items" on public.order_items;
drop policy if exists "Members can create own order items" on public.order_items;
drop policy if exists "Admins can read all point histories" on public.point_histories;
drop policy if exists "Admins can create point histories" on public.point_histories;
drop policy if exists "Members can read own point histories" on public.point_histories;

create policy "Admins can manage all profiles"
on public.profiles
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Users can read own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = auth_user_id);

create policy "Users can update own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = auth_user_id)
with check (auth.uid() = auth_user_id);

create policy "Admins can manage products"
on public.products
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Members can read products"
on public.products
for select
to authenticated
using (public.current_profile_role() in ('admin', 'member'));

create policy "Admins can manage all orders"
on public.orders
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Members can read own orders"
on public.orders
for select
to authenticated
using (user_id = public.current_profile_id());

create policy "Members can create own orders"
on public.orders
for insert
to authenticated
with check (user_id = public.current_profile_id());

create policy "Members can update own pending orders"
on public.orders
for update
to authenticated
using (user_id = public.current_profile_id() and status = 'pending')
with check (user_id = public.current_profile_id() and status = 'pending');

create policy "Admins can manage all order items"
on public.order_items
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Members can read own order items"
on public.order_items
for select
to authenticated
using (
  exists (
    select 1
    from public.orders
    where orders.id = order_items.order_id
      and orders.user_id = public.current_profile_id()
  )
);

create policy "Members can create own order items"
on public.order_items
for insert
to authenticated
with check (
  exists (
    select 1
    from public.orders
    where orders.id = order_items.order_id
      and orders.user_id = public.current_profile_id()
      and orders.status = 'pending'
  )
);

create policy "Admins can read all point histories"
on public.point_histories
for select
to authenticated
using (public.is_admin());

create policy "Admins can create point histories"
on public.point_histories
for insert
to authenticated
with check (public.is_admin());

create policy "Members can read own point histories"
on public.point_histories
for select
to authenticated
using (user_id = public.current_profile_id());
