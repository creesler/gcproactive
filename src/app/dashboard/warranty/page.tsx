export default function WarrantyPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Warranty</h2>
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div><p className="text-sm text-[#a0aec0] mb-1">Launch Date</p><p className="text-xl font-semibold">—</p></div>
          <div><p className="text-sm text-[#a0aec0] mb-1">Warranty Start</p><p className="text-xl font-semibold">—</p></div>
          <div><p className="text-sm text-[#a0aec0] mb-1">Warranty End</p><p className="text-xl font-semibold">—</p></div>
          <div><p className="text-sm text-[#a0aec0] mb-1">Status</p><span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#a0aec0]/20 text-[#a0aec0]">N/A</span></div>
        </div>
      </div>
    </div>
  );
}
