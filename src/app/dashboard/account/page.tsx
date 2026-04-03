"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const [user, setUser] = useState<{ email?: string; user_metadata?: { full_name?: string } } | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Account</h2>
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 space-y-6">
        <div><p className="text-sm text-[#a0aec0] mb-1">Full Name</p><p className="text-xl font-semibold">{user?.user_metadata?.full_name || "—"}</p></div>
        <div><p className="text-sm text-[#a0aec0] mb-1">Email</p><p className="text-xl font-semibold">{user?.email || "—"}</p></div>
        <button className="px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-white text-sm font-semibold hover:bg-white/10 transition-all cursor-pointer">Change Password</button>
      </div>
    </div>
  );
}
