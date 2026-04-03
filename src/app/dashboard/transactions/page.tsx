export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Transactions</h2>
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[#a0aec0]">
                <th className="text-left py-3 px-4 font-medium">Date</th>
                <th className="text-left py-3 px-4 font-medium">Type</th>
                <th className="text-left py-3 px-4 font-medium">Amount</th>
                <th className="text-left py-3 px-4 font-medium">Description</th>
                <th className="text-left py-3 px-4 font-medium">Provider</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr><td colSpan={6} className="text-center py-12 text-[#a0aec0]">No transactions yet.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
