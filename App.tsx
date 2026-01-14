
import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, ComposedChart, Line
} from 'recharts';
import { 
  Search, FileDown, MapPin, Building2, Truck, Boxes, LayoutDashboard, 
  ShieldAlert, Package, Layers, AlertTriangle, Hash, Map as MapIcon, TrendingUp, Filter, CheckCircle2, ShoppingBag, Activity
} from 'lucide-react';
import { 
  getFullDataset, getStats, getMonthlyTrend, getClassificationSummary, getRegionalAnalysis, getItemAnalysis, getItemClassificationTrend
} from './dataService';
import { DeliveryRecord, FilterState } from './types';

const FilterSelect = ({ label, icon: Icon, value, options, onChange, placeholder }: any) => (
  <div className="space-y-1.5 flex-1 min-w-[140px]">
    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
      <Icon className="w-3 h-3" /> {label}
    </label>
    <div className="relative group">
      <select 
        className="w-full bg-slate-50 px-4 py-2.5 text-xs border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/5 cursor-pointer appearance-none transition-all pr-10"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
        <Filter className="w-3 h-3" />
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [allRecords] = useState<DeliveryRecord[]>(() => getFullDataset());
  const [filters, setFilters] = useState<FilterState>({
    month: '', state: '', city: '', pincode: '', transporter: '', status: '', search: ''
  });

  const uniqueStates = useMemo(() => Array.from(new Set(allRecords.map(d => d.state))).sort(), [allRecords]);
  const uniqueCities = useMemo(() => {
    const filteredByState = filters.state ? allRecords.filter(d => d.state === filters.state) : allRecords;
    return Array.from(new Set(filteredByState.map(d => d.city))).filter(Boolean).sort();
  }, [allRecords, filters.state]);
  const uniquePincodes = useMemo(() => {
    let filtered = allRecords;
    if (filters.state) filtered = filtered.filter(d => d.state === filters.state);
    if (filters.city) filtered = filtered.filter(d => d.city === filters.city);
    return Array.from(new Set(filtered.map(d => d.pincode))).filter(Boolean).sort();
  }, [allRecords, filters.state, filters.city]);
  const uniqueTransporters = useMemo(() => Array.from(new Set(allRecords.map(d => d.transporter))).filter(Boolean).sort(), [allRecords]);

  const filteredData = useMemo(() => {
    return allRecords.filter(d => {
      const matchesSearch = !filters.search || 
        d.saleInvoice.toLowerCase().includes(filters.search.toLowerCase()) ||
        d.customer.toLowerCase().includes(filters.search.toLowerCase()) ||
        d.item.toLowerCase().includes(filters.search.toLowerCase());
      return (
        (!filters.month || d.month === filters.month) &&
        (!filters.state || d.state === filters.state) &&
        (!filters.city || d.city === filters.city) &&
        (!filters.pincode || d.pincode === filters.pincode) &&
        (!filters.transporter || d.transporter === filters.transporter) &&
        matchesSearch
      );
    });
  }, [allRecords, filters]);

  const stats = useMemo(() => getStats(filteredData), [filteredData]);
  const monthlyTrend = useMemo(() => getMonthlyTrend(filteredData), [filteredData]);
  const stateRisk = useMemo(() => getRegionalAnalysis(filteredData, 'state'), [filteredData]);
  const cityRisk = useMemo(() => getRegionalAnalysis(filteredData, 'city').slice(0, 10), [filteredData]);
  const itemRisk = useMemo(() => getItemAnalysis(filteredData), [filteredData]);
  const itemTrend = useMemo(() => getItemClassificationTrend(filteredData), [filteredData]);
  const classification = useMemo(() => getClassificationSummary(filteredData), [filteredData]);

  const topItems = useMemo(() => itemRisk.map(i => i.name), [itemRisk]);
  const COLORS = ['#6366f1', '#f59e0b', '#f43f5e', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316', '#3b82f6', '#22c55e'];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 font-['Inter']">
      <nav className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-100">
            <LayoutDashboard className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-black text-slate-900 tracking-tight uppercase leading-none">Loss Audit v8.5</h1>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Full-Spectrum Logistics Defense Hub</p>
          </div>
        </div>
        <button className="bg-slate-900 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all hover:bg-indigo-600">
          <FileDown className="w-4 h-4" /> Export Intelligence
        </button>
      </nav>

      <section className="bg-white border-b border-slate-200 py-6 px-8 sticky top-[61px] z-40 shadow-sm">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-6">
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <FilterSelect label="Region" icon={MapIcon} value={filters.state} options={uniqueStates} onChange={(v: string) => setFilters(p => ({...p, state: v, city: '', pincode: ''}))} placeholder="All States" />
            <FilterSelect label="Market" icon={Building2} value={filters.city} options={uniqueCities} onChange={(v: string) => setFilters(p => ({...p, city: v, pincode: ''}))} placeholder="All Cities" />
            <FilterSelect label="Sector (PIN)" icon={Hash} value={filters.pincode} options={uniquePincodes} onChange={(v: string) => setFilters(p => ({...p, pincode: v}))} placeholder="All PINs" />
            <FilterSelect label="Partner" icon={Truck} value={filters.transporter} options={uniqueTransporters} onChange={(v: string) => setFilters(p => ({...p, transporter: v}))} placeholder="All Vendors" />
            
            <div className="space-y-1.5 flex-1 min-w-[140px] lg:col-span-2">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Search className="w-3 h-3" /> Search Intelligence
              </label>
              <input 
                type="text" 
                placeholder="Invoice / Item / Customer..."
                className="w-full bg-slate-50 px-4 py-2.5 text-xs border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all"
                value={filters.search}
                onChange={e => setFilters(p => ({...p, search: e.target.value}))}
              />
            </div>
          </div>
          <div className="flex items-end">
            <button onClick={() => setFilters({ month: '', state: '', city: '', pincode: '', transporter: '', status: '', search: '' })} className="px-6 py-2.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all">
              Reset Workspace
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-[1600px] mx-auto w-full p-8 space-y-10">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-indigo-600">Network Success</p>
            <h3 className="text-3xl font-black text-slate-900">{stats.successRate}%</h3>
            <p className="text-[9px] font-bold text-teal-500 mt-1 uppercase">SLA Target 95%</p>
          </div>
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Network Load</p>
            <h3 className="text-3xl font-black text-slate-900">{stats.totalVolume.toLocaleString()}</h3>
            <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">Total Invoices</p>
          </div>
          <div className="bg-amber-500 p-6 rounded-[24px] shadow-lg shadow-amber-100 text-white relative overflow-hidden group">
            <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">Shortage Qty</p>
            <h3 className="text-3xl font-black">{stats.shortageQty}</h3>
            <Layers className="absolute -right-2 -bottom-2 w-16 h-16 opacity-10" />
          </div>
          <div className="bg-rose-500 p-6 rounded-[24px] shadow-lg shadow-rose-100 text-white relative overflow-hidden group">
            <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">Damage Qty</p>
            <h3 className="text-3xl font-black">{stats.damageQty}</h3>
            <ShieldAlert className="absolute -right-2 -bottom-2 w-16 h-16 opacity-10" />
          </div>
          <div className="bg-slate-900 p-6 rounded-[24px] shadow-lg shadow-slate-100 text-white group">
            <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1 group-hover:text-teal-400">Risk Perimeter</p>
            <h3 className="text-3xl font-black">{uniqueStates.length} Regions</h3>
            <p className="text-[9px] font-bold text-white/40 mt-1 uppercase">Active Impact Zones</p>
          </div>
        </div>

        {/* Item Wise Trend Analysis */}
        <section className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-50 rounded-2xl"><ShoppingBag className="w-6 h-6 text-indigo-600" /></div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none">SKU Loss Velocity Trend</h3>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-2">Monthly Loss Magnitude per Product Category</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="flex -space-x-2">
                 {topItems.slice(0, 5).map((_, i) => (
                   <div key={i} className="w-6 h-6 rounded-full border-2 border-white shadow-sm" style={{backgroundColor: COLORS[i]}}></div>
                 ))}
               </div>
               <span className="text-[10px] font-black text-slate-400 uppercase">Top 10 High-Risk SKUs</span>
            </div>
          </div>
          <div className="h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={itemTrend}>
                <defs>
                  {topItems.map((item, i) => (
                    <linearGradient key={`grad-${i}`} id={`color-${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0.1}/>
                      <stop offset="95%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0}/>
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{fill: '#64748b', fontSize: 11, fontWeight: 800}} axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', background: '#1e293b', color: '#fff' }}
                />
                <Legend iconType="circle" />
                {topItems.map((item, i) => (
                  <Area 
                    key={item} 
                    type="monotone" 
                    dataKey={item} 
                    stroke={COLORS[i % COLORS.length]} 
                    fill={`url(#color-${i})`} 
                    strokeWidth={2}
                    stackId="1"
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Dynamic Regional Trends */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2.5 bg-indigo-50 rounded-xl"><MapIcon className="w-5 h-5 text-indigo-600" /></div>
              <div>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter">State-wise Impact Depth</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ranked by Total Loss Qty (High to Low)</p>
              </div>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart layout="vertical" data={stateRisk} margin={{ left: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" tick={{fill: '#475569', fontSize: 10, fontWeight: 800}} axisLine={false} tickLine={false} width={100} />
                  <Tooltip />
                  <Bar name="Shortage" dataKey="shortage" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} barSize={18} />
                  <Bar name="Damage" dataKey="damage" stackId="a" fill="#f43f5e" radius={[0, 4, 4, 0]} barSize={18} />
                  <Line name="Claims" dataKey="incidentCount" stroke="#6366f1" strokeWidth={3} dot={{fill: '#6366f1', r: 4}} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2.5 bg-teal-50 rounded-xl"><Building2 className="w-5 h-5 text-teal-600" /></div>
              <div>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter">Top Cities by Market Loss</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Density Breakdown per Urban Center</p>
              </div>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={cityRisk} margin={{ left: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" tick={{fill: '#475569', fontSize: 10, fontWeight: 800}} axisLine={false} tickLine={false} width={100} />
                  <Tooltip cursor={{fill: '#f8fafc'}} />
                  <Bar name="Impact Units" dataKey="totalQty" fill="#1e293b" radius={[0, 8, 8, 0]} barSize={22} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Monthly Performance vs Success Rate */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-teal-50 rounded-2xl"><Activity className="w-6 h-6 text-teal-600" /></div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">Network Performance Correlation</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Loss Volume vs Overall Fulfillment Success Rate</p>
                </div>
              </div>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{fill: '#64748b', fontSize: 11, fontWeight: 800}} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#10b981', fontSize: 10}} domain={[90, 100]} />
                  <Tooltip />
                  <Legend iconType="circle" />
                  <Bar yAxisId="left" name="Shortage (Qty)" dataKey="shortage" stackId="a" fill="#f59e0b" barSize={28} />
                  <Bar yAxisId="left" name="Damage (Qty)" dataKey="damage" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={28} />
                  <Line yAxisId="right" type="stepAfter" name="Success Rate %" dataKey="successRate" stroke="#10b981" strokeWidth={4} dot={{ r: 4, fill: '#10b981' }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[40px] shadow-2xl flex flex-col text-white group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-12 text-slate-500 text-center relative z-10">Loss Distribution Mix</h3>
            <div className="h-[280px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={classification} innerRadius={85} outerRadius={115} paddingAngle={8} dataKey="value" stroke="none">
                    {classification.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-4xl font-black text-white tracking-tighter">{stats.shortageQty + stats.damageQty}</span>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Total Impact Units</span>
              </div>
            </div>
            <div className="mt-auto space-y-4 w-full p-4 relative z-10">
               {classification.map((d, i) => (
                  <div key={i} className="flex justify-between items-center group bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{backgroundColor: d.color}}></div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{d.name}</span>
                    </div>
                    <span className="text-xs font-black text-white">{d.value}</span>
                  </div>
               ))}
            </div>
          </div>
        </section>

        {/* Audit Transaction Table */}
        <section className="bg-white rounded-[40px] shadow-2xl border border-slate-200 overflow-hidden">
          <div className="p-10 bg-slate-50/50 border-b border-slate-200 flex flex-col lg:flex-row justify-between items-center gap-8">
            <div>
               <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-3">Incident Transaction Log</h3>
               <div className="flex items-center gap-3">
                  <span className="bg-teal-500/10 text-teal-600 text-[9px] font-black px-3 py-1 rounded-full flex items-center gap-2"><CheckCircle2 className="w-3 h-3" /> Audit Verified</span>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Showing {filteredData.length} active claims in view</p>
               </div>
            </div>
          </div>
          <div className="overflow-x-auto max-h-[800px] overflow-y-auto">
            <table className="w-full text-left text-xs table-fixed">
              <thead className="sticky top-0 z-10 bg-white border-b border-slate-100">
                <tr className="text-slate-400 font-black uppercase tracking-[0.2em] text-[9px]">
                  <th className="py-6 px-10 w-1/4">Invoice & Partner</th>
                  <th className="py-6 px-10 w-1/3">Route & SKU Context</th>
                  <th className="py-6 px-10 text-center w-24">Impact</th>
                  <th className="py-6 px-10 text-right pr-14">Claim Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-6 px-10">
                      <div className="font-black text-slate-900 uppercase text-sm tracking-tighter group-hover:text-indigo-600 transition-colors">{row.saleInvoice}</div>
                      <div className="text-[9px] font-black text-slate-400 uppercase mt-1">{row.month} • {row.transporter}</div>
                    </td>
                    <td className="py-6 px-10">
                      <div className="text-slate-700 font-bold truncate max-w-[320px]">{row.item}</div>
                      <div className="text-[9px] font-black text-slate-400 uppercase mt-1.5 flex items-center gap-1.5">
                         <MapPin className="w-3 h-3 text-slate-300" /> {row.city}, {row.state} • PIN {row.pincode}
                      </div>
                    </td>
                    <td className="py-6 px-10 text-center">
                       <span className="text-base font-black text-slate-900 tracking-tighter">{row.qty}</span>
                    </td>
                    <td className="py-6 px-10 text-right pr-14">
                      <span className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border-2 transition-all group-hover:shadow-md ${
                        row.status === 'damage' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 py-16 px-10 mt-20 border-t border-white/5 text-center relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
          <div className="flex items-center gap-4">
             <ShieldAlert className="w-12 h-12 text-indigo-500" />
             <div className="text-left">
                <p className="text-xl font-black uppercase tracking-tighter text-white">AuditCore™ Enterprise</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">Integrated Logistics Defense Network v8.5</p>
             </div>
          </div>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
             <span className="text-teal-400 flex items-center gap-2"><CheckCircle2 className="w-3 h-3" /> Ledger Synced</span>
             <span className="flex items-center gap-2"><TrendingUp className="w-3 h-3" /> Real-time Analytics</span>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-indigo-500/[0.03] pointer-events-none"></div>
      </footer>
    </div>
  );
};

export default App;
