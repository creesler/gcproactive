"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050a18] px-5">
        <div className="w-full max-w-md text-center">
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
            <div className="text-5xl mb-4">✉️</div>
            <h2 className="text-2xl font-bold mb-3">Check your email</h2>
            <p className="text-[#a0aec0] mb-6">We&apos;ve sent a confirmation link to <strong className="text-white">{email}</strong></p>
            <Link href="/auth/login" className="text-[#007bff] hover:underline">Back to Login</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050a18] px-5">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2.5 no-underline mb-6">
            <img src="/images/logo.png" alt="Logo" className="h-10" />
            <span className="text-2xl font-extrabold text-white">
              GC <span className="bg-gradient-to-r from-[#007bff] to-[#00c6ff] bg-clip-text text-transparent">PROACTIVE</span>
            </span>
          </Link>
          <h1 className="text-3xl font-bold mt-4">Create an account</h1>
          <p className="text-[#a0aec0] mt-2">Get started with your dashboard</p>
        </div>

        <form onSubmit={handleSignup} className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 space-y-5 backdrop-blur-xl">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">{error}</div>
          )}
          <div>
            <label className="block mb-2 text-sm text-[#a0aec0]">Full Name</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#007bff] transition" />
          </div>
          <div>
            <label className="block mb-2 text-sm text-[#a0aec0]">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#007bff] transition" />
          </div>
          <div>
            <label className="block mb-2 text-sm text-[#a0aec0]">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" required minLength={6} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#007bff] transition" />
          </div>
          <button type="submit" disabled={loading} className="w-full px-7 py-3.5 rounded-full bg-gradient-to-r from-[#007bff] to-[#00c6ff] text-white font-semibold shadow-[0_4px_15px_rgba(0,123,255,0.4)] hover:shadow-[0_8px_25px_rgba(0,123,255,0.4)] hover:-translate-y-0.5 transition-all cursor-pointer disabled:opacity-50">
            {loading ? "Creating account..." : "Sign Up"}
          </button>
          <p className="text-center text-sm text-[#a0aec0]">
            Already have an account? <Link href="/auth/login" className="text-[#007bff] hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
