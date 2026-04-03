-- ============================================
-- GC PROACTIVE - Prepaid Credit System Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- 1. CLIENTS
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  company TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. CLIENT BALANCES
CREATE TABLE IF NOT EXISTS client_balances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE UNIQUE,
  balance NUMERIC(12, 2) NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. PRICING RULES
CREATE TABLE IF NOT EXISTS pricing_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider TEXT NOT NULL,
  service TEXT,
  model TEXT,
  unit_type TEXT NOT NULL CHECK (unit_type IN ('token', 'cost', 'unit', 'minute', 'session', 'credit', 'message')),
  input_unit_price NUMERIC(20, 10) DEFAULT 0,
  output_unit_price NUMERIC(20, 10) DEFAULT 0,
  flat_unit_price NUMERIC(20, 10) DEFAULT 0,
  markup_multiplier NUMERIC(6, 2) NOT NULL DEFAULT 4.0,
  fixed_surcharge NUMERIC(12, 4) NOT NULL DEFAULT 0,
  credit_value NUMERIC(10, 4) NOT NULL DEFAULT 0.01,
  min_credits INTEGER NOT NULL DEFAULT 1,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. USAGE EVENTS
CREATE TABLE IF NOT EXISTS usage_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  event_id TEXT NOT NULL UNIQUE,
  provider TEXT NOT NULL,
  service TEXT,
  model TEXT,
  raw_cost NUMERIC(12, 6),
  credits_used NUMERIC(12, 2) NOT NULL DEFAULT 0,
  input_tokens INTEGER,
  output_tokens INTEGER,
  quantity NUMERIC(12, 4),
  payload_json JSONB,
  status TEXT NOT NULL DEFAULT 'processed' CHECK (status IN ('processed', 'failed', 'duplicate', 'insufficient_balance')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. CREDIT TRANSACTIONS
CREATE TABLE IF NOT EXISTS credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('topup', 'deduction', 'adjustment', 'refund')),
  amount NUMERIC(12, 2) NOT NULL,
  description TEXT,
  related_usage_event_id UUID REFERENCES usage_events(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. PROVIDER PRICE SNAPSHOTS
CREATE TABLE IF NOT EXISTS provider_price_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider TEXT NOT NULL,
  service TEXT,
  model TEXT,
  unit_type TEXT NOT NULL,
  input_price NUMERIC(20, 10),
  output_price NUMERIC(20, 10),
  flat_unit_price NUMERIC(20, 10),
  currency TEXT NOT NULL DEFAULT 'USD',
  source_url TEXT,
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  manual_override BOOLEAN NOT NULL DEFAULT false,
  override_input_price NUMERIC(20, 10),
  override_output_price NUMERIC(20, 10),
  override_flat_price NUMERIC(20, 10),
  auto_fetch_enabled BOOLEAN NOT NULL DEFAULT true
);

-- 7. MONTHLY SUBSCRIPTIONS
CREATE TABLE IF NOT EXISTS monthly_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  plan_name TEXT NOT NULL,
  hosting_status TEXT NOT NULL DEFAULT 'active' CHECK (hosting_status IN ('active', 'inactive', 'pending')),
  monthly_price NUMERIC(10, 2) NOT NULL DEFAULT 0,
  renewal_date DATE,
  status TEXT NOT NULL DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. SUPPORT HOUR LEDGERS
CREATE TABLE IF NOT EXISTS support_hour_ledgers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  included_minutes INTEGER NOT NULL DEFAULT 60,
  used_minutes INTEGER NOT NULL DEFAULT 0,
  remaining_minutes INTEGER GENERATED ALWAYS AS (included_minutes - used_minutes) STORED,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. SUPPORT LOGS
CREATE TABLE IF NOT EXISTS support_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  ledger_id UUID REFERENCES support_hour_ledgers(id) ON DELETE SET NULL,
  minutes_used INTEGER NOT NULL,
  reason TEXT,
  support_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 10. WARRANTY PERIODS
CREATE TABLE IF NOT EXISTS warranty_periods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  launch_date DATE NOT NULL,
  warranty_start DATE NOT NULL,
  warranty_end DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'extended')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 11. API CREDENTIALS
CREATE TABLE IF NOT EXISTS api_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  api_key TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  label TEXT NOT NULL DEFAULT 'default',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  rotated_at TIMESTAMPTZ
);

-- 12. AUDIT LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_hour_ledgers ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE warranty_periods ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_price_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Clients can view their own data
CREATE POLICY "Clients can view own profile" ON clients
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Clients can view own balance" ON client_balances
  FOR SELECT USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));

CREATE POLICY "Clients can view own usage" ON usage_events
  FOR SELECT USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));

CREATE POLICY "Clients can view own transactions" ON credit_transactions
  FOR SELECT USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));

CREATE POLICY "Clients can view own subscription" ON monthly_subscriptions
  FOR SELECT USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));

CREATE POLICY "Clients can view own support hours" ON support_hour_ledgers
  FOR SELECT USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));

CREATE POLICY "Clients can view own support logs" ON support_logs
  FOR SELECT USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));

CREATE POLICY "Clients can view own warranty" ON warranty_periods
  FOR SELECT USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));

CREATE POLICY "Clients can view own api keys" ON api_credentials
  FOR SELECT USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));

-- Pricing rules are read-only for all authenticated users
CREATE POLICY "Authenticated users can view pricing rules" ON pricing_rules
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view price snapshots" ON provider_price_snapshots
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow service role full access (for API routes)
-- Service role bypasses RLS by default
