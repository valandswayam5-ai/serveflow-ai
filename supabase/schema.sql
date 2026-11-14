-- ==========================================
-- SERVEFLOW AI - DATABASE SCHEMA
-- ==========================================

create extension if not exists "uuid-ossp";

-- RESTAURANTS
create table if not exists restaurants (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  address text,
  phone text,
  created_at timestamptz default now()
);

-- STAFF / USERS
create table if not exists staff (
  id uuid primary key default uuid_generate_v4(),
  restaurant_id uuid references restaurants(id) on delete cascade,
  name text not null,
  role text not null check (
    role in ('owner', 'manager', 'waiter', 'kitchen')
  ),
  phone text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- TABLES
create table if not exists restaurant_tables (
  id uuid primary key default uuid_generate_v4(),
  restaurant_id uuid references restaurants(id) on delete cascade,
  table_number integer not null,
  capacity integer default 4,
  status text default 'available' check (
    status in (
      'available',
      'occupied',
      'preparing',
      'food_ready',
      'delayed',
      'bill_requested',
      'cleaning'
    )
  ),
  assigned_waiter_id uuid references staff(id) on delete set null,
  created_at timestamptz default now(),
  unique (restaurant_id, table_number)
);

-- MENU
create table if not exists menu_items (
  id uuid primary key default uuid_generate_v4(),
  restaurant_id uuid references restaurants(id) on delete cascade,
  name text not null,
  description text,
  category text,
  price numeric(10,2) not null,
  rating numeric(3,2) default 0,
  is_available boolean default true,
  is_recommended boolean default false,
  created_at timestamptz default now()
);

-- ORDERS
create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  restaurant_id uuid references restaurants(id) on delete cascade,
  table_id uuid references restaurant_tables(id) on delete set null,
  waiter_id uuid references staff(id) on delete set null,
  status text default 'pending' check (
    status in (
      'pending',
      'confirmed',
      'preparing',
      'ready',
      'served',
      'completed',
      'cancelled',
      'confusion'
    )
  ),
  notes text,
  total_amount numeric(10,2) default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ORDER ITEMS
create table if not exists order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade,
  menu_item_id uuid references menu_items(id) on delete set null,
  quantity integer not null default 1,
  price numeric(10,2) not null,
  notes text
);

-- CUSTOMER REQUESTS
create table if not exists customer_requests (
  id uuid primary key default uuid_generate_v4(),
  restaurant_id uuid references restaurants(id) on delete cascade,
  table_id uuid references restaurant_tables(id) on delete cascade,
  type text not null check (
    type in (
      'call_waiter',
      'water',
      'bill',
      'assistance'
    )
  ),
  status text default 'pending' check (
    status in ('pending', 'accepted', 'completed')
  ),
  created_at timestamptz default now(),
  completed_at timestamptz
);

-- AI RECOMMENDATION LOG
create table if not exists ai_recommendations (
  id uuid primary key default uuid_generate_v4(),
  restaurant_id uuid references restaurants(id) on delete cascade,
  query text not null,
  recommendation text not null,
  created_at timestamptz default now()
);

-- INDEXES FOR SPEED
create index if not exists idx_tables_restaurant
  on restaurant_tables(restaurant_id);

create index if not exists idx_orders_restaurant
  on orders(restaurant_id);

create index if not exists idx_orders_status
  on orders(status);

create index if not exists idx_requests_status
  on customer_requests(status);

-- AUTOMATIC updated_at FOR ORDERS
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists orders_updated_at on orders;

create trigger orders_updated_at
before update on orders
for each row
execute function update_updated_at();

-- Enable Row Level Security
alter table restaurants enable row level security;
alter table staff enable row level security;
alter table restaurant_tables enable row level security;
alter table menu_items enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table customer_requests enable row level security;
alter table ai_recommendations enable row level security;
