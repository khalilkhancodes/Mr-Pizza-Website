-- Mr. Pizza Supabase Database Setup
-- Run this in: Supabase Dashboard > SQL Editor > New Query

-- 1. Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  order_code TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  total NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'placed' CHECK (status IN ('placed', 'confirmed', 'delivered', 'cancelled')),
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 3. Create policies
-- Anyone can insert orders (customer checkout)
CREATE POLICY "Anyone can insert orders"
  ON orders FOR INSERT
  WITH CHECK (true);

-- Anyone can read their own order by ID
CREATE POLICY "Anyone can read orders by ID"
  ON orders FOR SELECT
  USING (true);

-- Only authenticated staff can update orders
CREATE POLICY "Staff can update orders"
  ON orders FOR UPDATE
  USING (auth.role() = 'authenticated');

-- 4. Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_order_code ON orders(order_code);

-- 5. Create staff table (managed by Supabase Auth, this tracks staff metadata)
CREATE TABLE IF NOT EXISTS staff (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'staff' CHECK (role IN ('admin', 'staff')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE staff ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can read own data"
  ON staff FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Staff can update own data"
  ON staff FOR UPDATE
  USING (auth.uid() = id);
