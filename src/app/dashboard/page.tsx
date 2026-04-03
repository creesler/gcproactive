import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-[#007bff]/20 to-[#00c6ff]/10 border border-[#007bff]/30 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-2">Welcome back! 👋</h2>
        <p className="text-[#a0aec0]">Here&apos;s an overview of your account activity.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Credit Balance", value: "0", icon: "💰", color: "from-[#007bff] to-[#00c6ff]" },
          { label: "Subscription", value: "—", icon: "📦", color: "from-[#7cfc00] to-[#00ff7f]" },
          { label: "Support Hours", value: "0 / 0", icon: "🛟", color: "from-[#ff6b6b] to-[#ee5a24]" },
          { label: "Warranty", value: "—", icon: "🛡️", color: "from-[#a29bfe] to-[#6c5ce7]" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-[#a0aec0]">{stat.label}</span>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}>
              <span className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Usage Events</h3>
          <div className="text-center py-12 text-[#a0aec0]">
            <span className="text-4xl block mb-3">📊</span>
            No usage events yet. Your n8n workflows will appear here once connected.
          </div>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="text-center py-12 text-[#a0aec0]">
            <span className="text-4xl block mb-3">📋</span>
            No transactions yet. Credit top-ups and deductions will appear here.
          </div>
        </div>
      </div>
    </div>
  );
}
