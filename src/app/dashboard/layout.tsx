"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/dashboard/credits", label: "Credits", icon: "💰" },
  { href: "/dashboard/transactions", label: "Transactions", icon: "📋" },
  { href: "/dashboard/usage", label: "Usage History", icon: "📈" },
  { href: "/dashboard/subscription", label: "Subscription", icon: "📦" },
  { href: "/dashboard/support", label: "Support Hours", icon: "🛟" },
  { href: "/dashboard/warranty", label: "Warranty", icon: "🛡️" },
  { href: "/dashboard/api-keys", label: "API Keys", icon: "🔑" },
  { href: "/dashboard/account", label: "Account", icon: "👤" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#050a18] flex">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#020611] border-r border-white/10 flex flex-col transform transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <img src="/images/logo.png" alt="Logo" className="h-8" />
            <span className="text-lg font-extrabold text-white">
              GC <span className="bg-gradient-to-r from-[#007bff] to-[#00c6ff] bg-clip-text text-transparent">PRO</span>
            </span>
          </Link>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all no-underline ${
                pathname === item.href
                  ? "bg-gradient-to-r from-[#007bff]/20 to-[#00c6ff]/10 text-white border border-[#007bff]/30"
                  : "text-[#a0aec0] hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
          >
            <span>🚪</span> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#050a18]/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white text-xl cursor-pointer bg-transparent border-none">☰</button>
          <h1 className="text-lg font-semibold capitalize">
            {pathname === "/dashboard" ? "Dashboard" : pathname.split("/").pop()?.replace(/-/g, " ")}
          </h1>
          <div className="text-sm text-[#a0aec0]">GC Proactive Panel</div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
