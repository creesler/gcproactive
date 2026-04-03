export default function SupportPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Support Hours</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <p className="text-sm text-[#a0aec0] mb-2">Included Hours</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-[#007bff] to-[#00c6ff] bg-clip-text text-transparent">0</p>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <p className="text-sm text-[#a0aec0] mb-2">Used Hours</p>
          <p className="text-3xl font-bold text-[#ff6b6b]">0</p>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <p className="text-sm text-[#a0aec0] mb-2">Remaining</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-[#7cfc00] to-[#00ff7f] bg-clip-text text-transparent">0</p>
        </div>
      </div>
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Support Logs</h3>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/10 text-[#a0aec0]"><th className="text-left py-3 px-4 font-medium">Date</th><th className="text-left py-3 px-4 font-medium">Minutes</th><th className="text-left py-3 px-4 font-medium">Reason</th></tr></thead>
          <tbody><tr><td colSpan={3} className="text-center py-12 text-[#a0aec0]">No support logs yet.</td></tr></tbody>
        </table>
      </div>
    </div>
  );
}
