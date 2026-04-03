export default function ApiKeysPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">API Keys</h2>
      <p className="text-[#a0aec0]">Use these credentials in your n8n workflows to send billing events to our API.</p>
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Active Keys</h3>
          <button className="px-4 py-2 rounded-full bg-gradient-to-r from-[#007bff] to-[#00c6ff] text-white text-sm font-semibold hover:-translate-y-0.5 transition-all cursor-pointer">
            🔄 Rotate Key
          </button>
        </div>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/10 text-[#a0aec0]"><th className="text-left py-3 px-4 font-medium">Label</th><th className="text-left py-3 px-4 font-medium">API Key</th><th className="text-left py-3 px-4 font-medium">Created</th><th className="text-left py-3 px-4 font-medium">Status</th></tr></thead>
          <tbody><tr><td colSpan={4} className="text-center py-12 text-[#a0aec0]">No API keys yet. Contact admin to get started.</td></tr></tbody>
        </table>
      </div>
    </div>
  );
}
