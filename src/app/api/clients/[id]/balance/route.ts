import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("client_balances")
    .select("*")
    .eq("client_id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Client balance not found" }, { status: 404 });
  }

  return NextResponse.json({ client_id: id, credit_balance: data.balance });
}
