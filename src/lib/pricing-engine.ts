// Pricing engine for computing credits from usage events
// credits_used = ceil((raw_cost * markup_multiplier + fixed_surcharge) / credit_value)

export interface PricingRule {
  provider: string;
  service: string | null;
  model: string | null;
  unit_type: string;
  input_unit_price: number;
  output_unit_price: number;
  flat_unit_price: number;
  markup_multiplier: number;
  fixed_surcharge: number;
  credit_value: number;
  min_credits: number;
}

export interface UsagePayload {
  client_id: string;
  event_id: string;
  provider: string;
  service: string;
  model: string | null;
  usage: Record<string, number>;
  raw_cost: number | null;
  meta?: Record<string, string>;
}

export function computeRawCost(payload: UsagePayload, rule: PricingRule): number {
  // If raw_cost is provided directly, use it
  if (payload.raw_cost !== null && payload.raw_cost !== undefined) {
    return payload.raw_cost;
  }

  // Compute from usage based on unit_type
  switch (rule.unit_type) {
    case "token": {
      const inputTokens = payload.usage.input_tokens || 0;
      const outputTokens = payload.usage.output_tokens || 0;
      return (inputTokens / 1_000_000) * rule.input_unit_price +
             (outputTokens / 1_000_000) * rule.output_unit_price;
    }
    case "minute": {
      const minutes = payload.usage.minutes || 0;
      return minutes * rule.flat_unit_price;
    }
    case "unit":
    case "session":
    case "credit":
    case "message": {
      const qty = payload.usage.quantity || payload.usage.credits || payload.usage.messages || payload.usage.sessions || 1;
      return qty * rule.flat_unit_price;
    }
    case "cost":
    default:
      return 0;
  }
}

export function computeCredits(rawCost: number, rule: PricingRule): number {
  const billableValue = rawCost * rule.markup_multiplier + rule.fixed_surcharge;
  const credits = Math.ceil(billableValue / rule.credit_value);
  return Math.max(credits, rule.min_credits);
}
