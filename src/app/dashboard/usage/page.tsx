export default function UsagePage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Usage History</h2>
      <div className="flex flex-wrap gap-3 mb-4">
        <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white outline-none">
          <option value="">All Providers</option>
          <option>OpenAI</option>
          <option>Gemini</option>
          <option>Retell</option>
          <option>Airtop</option>
        </select>
        <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white outline-none">
          <option value="">All Services</option>
          <option>chat_reply</option>
          <option>voice_call</option>
          <option>scraping</option>
        </select>
        <input type="date" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white outline-none" />
      </div>
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[#a0aec0]">
                <th className="text-left py-3 px-4 font-medium">Date</th>
                <th className="text-left py-3 px-4 font-medium">Provider</th>
                <th className="text-left py-3 px-4 font-medium">Service</th>
                <th className="text-left py-3 px-4 font-medium">Model</th>
                <th className="text-left py-3 px-4 font-medium">Raw Cost</th>
                <th className="text-left py-3 px-4 font-medium">Credits</th>
                <th className="text-left py-3 px-4 font-medium">Workflow</th>
                <th className="text-left py-3 px-4 font-medium">Event ID</th>
              </tr>
            </thead>
            <tbody>
              <tr><td colSpan={8} className="text-center py-12 text-[#a0aec0]">No usage events yet.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
