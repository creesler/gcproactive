export default function CreditsPage() {
  return (
    <div className="space-y-8">
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Credit Balance</h2>
            <p className="text-[#a0aec0] text-sm mt-1">Credits are used for variable AI and provider usage only.</p>
          </div>
          <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#007bff] to-[#00c6ff] text-white font-semibold text-sm shadow-[0_4px_15px_rgba(0,123,255,0.4)] hover:shadow-[0_8px_25px_rgba(0,123,255,0.4)] hover:-translate-y-0.5 transition-all cursor-pointer">
            + Add Credits
          </button>
        </div>
        <div className="text-6xl font-extrabold bg-gradient-to-r from-[#007bff] to-[#00c6ff] bg-clip-text text-transparent">
          0
        </div>
        <p className="text-[#a0aec0] text-sm mt-2">credits remaining</p>
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Recharge History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[#a0aec0]">
                <th className="text-left py-3 px-4 font-medium">Date</th>
                <th className="text-left py-3 px-4 font-medium">Amount</th>
                <th className="text-left py-3 px-4 font-medium">Description</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="text-center py-12 text-[#a0aec0]">
                  No recharge history yet.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
