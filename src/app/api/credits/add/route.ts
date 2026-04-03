import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  const { client_id, amount, reason } = body;
  if (!client_id || !amount) {
    return NextResponse.json({ error: "Missing client_id or amount" }, { status: 400 });
  }

  // Get current balance
  const { data: balanceRow } = await supabase
    .from("client_balances")
    .select("balance")
    .eq("client_id", client_id)
    .single();

  const currentBalance = balanceRow?.balance || 0;
  const newBalance = currentBalance + amount;

  // Upsert balance
  await supabase
    .from("client_balances")
    .upsert({ client_id, balance: newBalance, updated_at: new Date().toISOString() }, { onConflict: "client_id" });

  // Log transaction
  await supabase.from("credit_transactions").insert({
    client_id,
    type: "topup",
    amount,
    description: reason || "Manual credit top-up",
  });

  return NextResponse.json({ success: true, client_id, new_balance: newBalance });
}
