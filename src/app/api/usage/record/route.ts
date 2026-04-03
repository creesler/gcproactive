import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { computeRawCost, computeCredits, type UsagePayload } from "@/lib/pricing-engine";

// Use service-role-like access (anon key with RLS bypass via API key validation)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    // 1. Validate API key
    const clientId = request.headers.get("x-client-id");
    const apiKey = request.headers.get("x-api-key");

    if (!clientId || !apiKey) {
      return NextResponse.json({ success: false, error: "Missing x-client-id or x-api-key headers" }, { status: 401 });
    }

    // Verify API key
    const { data: credential } = await supabase
      .from("api_credentials")
      .select("*")
      .eq("client_id", clientId)
      .eq("api_key", apiKey)
      .eq("active", true)
      .single();

    if (!credential) {
      return NextResponse.json({ success: false, error: "Invalid API credentials" }, { status: 401 });
    }

    // 2. Parse payload
    const payload: UsagePayload = await request.json();

    if (!payload.event_id || !payload.provider) {
      return NextResponse.json({ success: false, error: "Missing required fields: event_id, provider" }, { status: 400 });
    }

    // Force client_id from header (don't trust payload)
    payload.client_id = clientId;

    // 3. Idempotency check
    const { data: existingEvent } = await supabase
      .from("usage_events")
      .select("id, credits_used")
      .eq("event_id", payload.event_id)
      .single();

    if (existingEvent) {
      // Return existing result without re-charging
      const { data: balance } = await supabase
        .from("client_balances")
        .select("balance")
        .eq("client_id", clientId)
        .single();

      return NextResponse.json({
        success: true,
        duplicate: true,
        credits_used: existingEvent.credits_used,
        remaining_credits: balance?.balance || 0,
        low_balance: (balance?.balance || 0) < 100,
      });
    }

    // 4. Find matching pricing rule
    const { data: rules } = await supabase
      .from("pricing_rules")
      .select("*")
      .eq("provider", payload.provider)
      .eq("active", true);

    // Find best match: model > service > provider-level
    let rule = rules?.find((r) => r.model === payload.model && r.service === payload.service);
    if (!rule) rule = rules?.find((r) => r.model === payload.model && !r.service);
    if (!rule) rule = rules?.find((r) => r.service === payload.service && !r.model);
    if (!rule) rule = rules?.find((r) => !r.model && !r.service);

    if (!rule) {
      // Log failed event
      await supabase.from("usage_events").insert({
        client_id: clientId,
        event_id: payload.event_id,
        provider: payload.provider,
        service: payload.service,
        model: payload.model,
        payload_json: payload,
        status: "failed",
        credits_used: 0,
      });
      return NextResponse.json({ success: false, error: `No pricing rule found for provider: ${payload.provider}` }, { status: 422 });
    }

    // 5. Compute cost and credits
    const rawCost = computeRawCost(payload, rule);
    const creditsUsed = computeCredits(rawCost, rule);

    // 6. Check balance
    const { data: balanceRow } = await supabase
      .from("client_balances")
      .select("balance")
      .eq("client_id", clientId)
      .single();

    const currentBalance = balanceRow?.balance || 0;

    if (currentBalance < creditsUsed) {
      await supabase.from("usage_events").insert({
        client_id: clientId,
        event_id: payload.event_id,
        provider: payload.provider,
        service: payload.service,
        model: payload.model,
        raw_cost: rawCost,
        credits_used: creditsUsed,
        input_tokens: payload.usage?.input_tokens,
        output_tokens: payload.usage?.output_tokens,
        quantity: payload.usage?.quantity || payload.usage?.minutes,
        payload_json: payload,
        status: "insufficient_balance",
      });
      return NextResponse.json({
        success: false,
        error: "Insufficient credit balance",
        credits_needed: creditsUsed,
        remaining_credits: currentBalance,
        low_balance: true,
      }, { status: 402 });
    }

    // 7. Deduct balance
    const newBalance = currentBalance - creditsUsed;
    await supabase
      .from("client_balances")
      .update({ balance: newBalance, updated_at: new Date().toISOString() })
      .eq("client_id", clientId);

    // 8. Log usage event
    await supabase.from("usage_events").insert({
      client_id: clientId,
      event_id: payload.event_id,
      provider: payload.provider,
      service: payload.service,
      model: payload.model,
      raw_cost: rawCost,
      credits_used: creditsUsed,
      input_tokens: payload.usage?.input_tokens,
      output_tokens: payload.usage?.output_tokens,
      quantity: payload.usage?.quantity || payload.usage?.minutes,
      payload_json: payload,
      status: "processed",
    });

    // 9. Create transaction record
    await supabase.from("credit_transactions").insert({
      client_id: clientId,
      type: "deduction",
      amount: -creditsUsed,
      description: `${payload.provider}/${payload.service || "default"}${payload.model ? `/${payload.model}` : ""} — ${payload.event_id}`,
    });

    // 10. Return result
    return NextResponse.json({
      success: true,
      credits_used: creditsUsed,
      remaining_credits: newBalance,
      low_balance: newBalance < 100,
    });
  } catch (err) {
    console.error("Usage record error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
