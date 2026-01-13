
import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { 
  BarChart3, RotateCcw, Search, X, Truck, FileDown, ListFilter, Package, ShieldAlert, CheckCircle2, UserCheck, Layers,
  ChevronDown, AlertTriangle, MapPin, Building2, Hash, ArrowUpRight, Boxes
} from 'lucide-react';
import { 
  getFullDataset, getStats, getMonthlyBreakdown, getGeographicImpact, getDetailedCustomerImpact, getFulfillmentPie, getItemSensitivity, getItemwiseShortageClassification, MASTER_DUMP_CSV
} from './dataService';
import { DeliveryRecord, FilterState } from './types';

const StatCard = ({ title, value, icon: Icon, colorClass, subtitle }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
    <div className={`p-3 rounded-2xl ${colorClass} mb-3 shadow-lg shadow-current/10`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
    <h3 className="text-3xl font-black text-slate-900 leading-tight tracking-tighter">{value}</h3>
    {subtitle && <p className="text-[10px] text-slate-500 font-bold mt-1 opacity-70 uppercase tracking-tighter">{subtitle}</p>}
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-4 rounded-xl shadow-2xl border border-white/10 backdrop-blur-md">
        <p className="text-[10px] font-black uppercase tracking-widest mb-2 border-b border-white/10 pb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex justify-between gap-6 py-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase">{p.name}:</span>
            <span className="text-[10px] font-black" style={{ color: p.color || p.fill }}>{p.value} Units</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const App: React.FC = () => {
  const [allRecords] = useState<DeliveryRecord[]>(() => getFullDataset());
  
  const [filters, setFilters] = useState<FilterState>({
    month: '',
    state: '',
    city: '',
    pincode: '',
    transporter: '',
    status: '',
    search: ''
  });

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
        (!filters.status || d.status === filters.status) &&
        matchesSearch
      );
    });
  }, [allRecords, filters]);

  const stats = useMemo(() => getStats(filteredData), [filteredData]);
  const monthlyBreakdown = useMemo(() => getMonthlyBreakdown(filteredData), [filteredData]);
  const geoImpact = useMemo(() => getGeographicImpact(filteredData), [filteredData]);
  const customerImpact = useMemo(() => getDetailedCustomerImpact(filteredData), [filteredData]);
  const itemSensitivity = useMemo(() => getItemSensitivity(filteredData), [filteredData]);
  const itemwiseShortage = useMemo(() => getItemwiseShortageClassification(), []);
  const pieData = useMemo(() => getFulfillmentPie(), []);

  const uniqueMonths = useMemo(() => Array.from(new Set(allRecords.map(d => d.month))).sort(), [allRecords]);
  const uniqueStates = useMemo(() => Array.from(new Set(allRecords.map(d => d.state))).filter(Boolean).sort(), [allRecords]);
  const uniqueCities = useMemo(() => Array.from(new Set(allRecords.map(d => d.city))).filter(Boolean).sort(), [allRecords]);
  const uniquePincodes = useMemo(() => Array.from(new Set(allRecords.map(d => d.pincode))).filter(Boolean).sort(), [allRecords]);

  const handleResetFilters = () => {
    setFilters({ month: '', state: '', city: '', pincode: '', transporter: '', status: '', search: '' });
  };

  const handleDownloadFullDump = () => {
    const blob = new Blob([MASTER_DUMP_CSV], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Logistics_Audit_Report.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-['Inter']">
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg">
              <ShieldAlert className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tighter uppercase leading-none">Logistics Analytics Hub</h1>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-1">Audit Control v4.2</p>
            </div>
          </div>
          <button 
            onClick={handleDownloadFullDump}
            className="bg-white/10 text-white px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] hover:bg-teal-500 transition-all active:scale-95 flex items-center gap-3 border border-white/5"
          >
            <FileDown className="w-4 h-4" />
            Download Original Data
          </button>
      </header>

      {/* KPI Section */}
      <section className="bg-white border-b border-slate-200 py-12 px-8">
        <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <StatCard title="Total Shipments" value={stats.totalVolume} icon={Package} colorClass="bg-slate-900" subtitle="Total Sales Invoices" />
          <StatCard title="Success Rate" value={`${stats.successRate}%`} icon={CheckCircle2} colorClass="bg-teal-600" subtitle="Fulfillment Accuracy" />
          <StatCard title="Total Incidents" value={stats.totalIncidents} icon={AlertTriangle} colorClass="bg-rose-600" subtitle="Claims raised" />
          <StatCard title="Shortage Qty" value={stats.shortageQty} icon={Layers} colorClass="bg-amber-500" subtitle="Total units missing" />
          <StatCard title="Damage Qty" value={stats.damageQty} icon={ShieldAlert} colorClass="bg-rose-500" subtitle="Total units damaged" />
          <StatCard title="Impacted Cust." value={stats.impactedCustomers} icon={UserCheck} colorClass="bg-indigo-500" subtitle="Unique customers" />
        </div>
      </section>

      {/* Filtering Suite */}
      <section className="bg-white border-b border-slate-200 py-6 px-8 sticky top-[72px] z-40 shadow-sm">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Building2 className="w-3 h-3" /> State</label>
            <select className="w-full pl-4 pr-8 py-3 text-xs border border-slate-200 rounded-2xl bg-slate-50 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/5 appearance-none" value={filters.state} onChange={e => setFilters(p => ({...p, state: e.target.value}))}>
              <option value="">All States</option>
              {uniqueStates.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><MapPin className="w-3 h-3" /> City</label>
            <select className="w-full pl-4 pr-8 py-3 text-xs border border-slate-200 rounded-2xl bg-slate-50 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/5 appearance-none" value={filters.city} onChange={e => setFilters(p => ({...p, city: e.target.value}))}>
              <option value="">All Cities</option>
              {uniqueCities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Hash className="w-3 h-3" /> Pincode</label>
            <select className="w-full pl-4 pr-8 py-3 text-xs border border-slate-200 rounded-2xl bg-slate-50 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/5 appearance-none" value={filters.pincode} onChange={e => setFilters(p => ({...p, pincode: e.target.value}))}>
              <option value="">All Pincodes</option>
              {uniquePincodes.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><ListFilter className="w-3 h-3" /> Period</label>
            <select className="w-full pl-4 pr-8 py-3 text-xs border border-slate-200 rounded-2xl bg-slate-50 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/5 appearance-none" value={filters.month} onChange={e => setFilters(p => ({...p, month: e.target.value}))}>
              <option value="">All Months</option>
              {uniqueMonths.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={handleResetFilters} className="w-full py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 border border-slate-900">
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-[1600px] mx-auto w-full p-8 space-y-10">
        
        {/* Monthly Fulfillment Cards with actual counts */}
        <section className="space-y-6">
           <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-3">
              <div className="p-2 bg-teal-50 rounded-lg"><CheckCircle2 className="w-4 h-4 text-teal-600" /></div>
              Monthly Fulfillment Breakdown
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {monthlyBreakdown.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm transition-all group">
                   <div className="text-[11px] font-black text-slate-400 uppercase mb-5 flex justify-between items-center border-b border-slate-50 pb-2">
                      <span>{item.month}</span>
                      <span className="text-[9px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-900 font-black">{item.total} Units</span>
                   </div>
                   <div className="space-y-5">
                      <div>
                         <div className="flex justify-between items-end mb-1.5">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div> Ok: {item.ok_cnt}
                            </span>
                            <span className="text-sm font-black text-teal-600">{item.ok}%</span>
                         </div>
                         <div className="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-teal-500 h-full" style={{width: `${item.ok}%`}}></div>
                         </div>
                      </div>
                      <div>
                         <div className="flex justify-between items-end mb-1.5">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div> Short: {item.short_cnt}
                            </span>
                            <span className="text-sm font-black text-amber-500">{item.short}%</span>
                         </div>
                         <div className="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-amber-500 h-full" style={{width: `${item.short}%`}}></div>
                         </div>
                      </div>
                      <div>
                         <div className="flex justify-between items-end mb-1.5">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div> Dmg: {item.dmg_cnt}
                            </span>
                            <span className="text-sm font-black text-rose-500">{item.dmg}%</span>
                         </div>
                         <div className="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-rose-500 h-full" style={{width: `${item.dmg}%`}}></div>
                         </div>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Total Sales vs Issues Chart */}
           <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-10">
                 <div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tighter uppercase">Total Sales vs Delivery Issues</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Comparing success volume vs total claims raised</p>
                 </div>
              </div>
              <div className="h-[400px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyBreakdown}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="month" tick={{fill: '#64748b', fontSize: 11, fontWeight: 800}} axisLine={false} tickLine={false} />
                       <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                       <Tooltip content={<CustomTooltip />} cursor={{fill: '#f8fafc'}} />
                       <Legend verticalAlign="top" align="right" iconType="circle" />
                       <Bar name="Successful" dataKey="ok_cnt" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40} />
                       <Bar name="Shortage" dataKey="short_cnt" fill="#f59e0b" radius={[6, 6, 0, 0]} barSize={12} />
                       <Bar name="Damage" dataKey="dmg_cnt" fill="#f43f5e" radius={[6, 6, 0, 0]} barSize={12} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Fulfillment Distribution Pie */}
           <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] mb-12 text-center w-full">Fulfillment Distribution</h3>
              <div className="h-[300px] w-full relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie data={pieData} innerRadius={80} outerRadius={110} paddingAngle={8} dataKey="value" stroke="none">
                          {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                       </Pie>
                       <Tooltip />
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-black text-slate-900 tracking-tighter">1,240</span>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Invoices</span>
                 </div>
              </div>
              <div className="mt-8 space-y-4 w-full px-6">
                 {pieData.map((d, i) => (
                    <div key={i} className="flex justify-between items-center group">
                       <div className="flex items-center gap-3">
                          <div className="w-2.5 h-2.5 rounded-full shadow-lg" style={{backgroundColor: d.color}}></div>
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{d.name}</span>
                       </div>
                       <div className="text-xs font-black text-slate-900 tracking-tighter">{d.value}</div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* NEW SECTION: Item-wise Shortage Classification */}
        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
           <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-amber-50 rounded-xl"><Boxes className="w-5 h-5 text-amber-600" /></div>
              <div>
                 <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Item-wise Shortage Classification</h3>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Detailed inventory shortage quantities by SKU</p>
              </div>
           </div>
           <div className="h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart layout="vertical" data={itemwiseShortage}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" tick={{fill: '#475569', fontSize: 9, fontWeight: 700}} axisLine={false} tickLine={false} width={280} />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: '#f8fafc'}} />
                    <Bar dataKey="qty" name="Shortage Qty" fill="#f59e0b" radius={[0, 8, 8, 0]} barSize={20}>
                        {itemwiseShortage.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index < 3 ? '#d97706' : '#f59e0b'} />
                        ))}
                    </Bar>
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </section>

        {/* Impact Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Geographic Impact */}
           <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                 <div className="p-2 bg-rose-50 rounded-xl"><MapPin className="w-5 h-5 text-rose-500" /></div>
                 <div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight uppercase">Inventory Impact by State</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Geographic breakdown of units affected</p>
                 </div>
              </div>
              <div className="h-[450px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={geoImpact}>
                       <XAxis type="number" hide />
                       <YAxis dataKey="name" type="category" tick={{fill: '#64748b', fontSize: 10, fontWeight: 900}} axisLine={false} tickLine={false} width={130} />
                       <Tooltip cursor={{fill: '#f8fafc'}} />
                       <Bar dataKey="qty" name="Units Impacted" fill="#f43f5e" radius={[0, 8, 8, 0]} barSize={24} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Customer Impact Distribution - Stacked with labels */}
           <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                 <div className="p-2 bg-indigo-50 rounded-xl"><UserCheck className="w-5 h-5 text-indigo-500" /></div>
                 <div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight uppercase">Customer Impact Distribution</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accounts with highest unit loss breakdown</p>
                 </div>
              </div>
              <div className="h-[450px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={customerImpact}>
                       <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                       <XAxis type="number" hide />
                       <YAxis dataKey="name" type="category" tick={{fill: '#334155', fontSize: 9, fontWeight: 900}} axisLine={false} tickLine={false} width={180} />
                       <Tooltip content={<CustomTooltip />} cursor={{fill: '#f8fafc'}} />
                       <Legend verticalAlign="top" align="right" />
                       <Bar dataKey="short" name="Shortage" stackId="cust" fill="#f59e0b" radius={[0, 0, 0, 0]} barSize={18} />
                       <Bar dataKey="dmg" name="Damage" stackId="cust" fill="#f43f5e" radius={[0, 8, 8, 0]} barSize={18} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>

        {/* Sensitivity and Global Audit Log Footer remains similar but optimized */}
        <section className="bg-slate-900 p-10 rounded-[40px] text-white relative overflow-hidden">
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                 <div>
                    <h3 className="text-2xl font-black tracking-tight flex items-center gap-3 uppercase"><ArrowUpRight className="text-teal-400" /> Item Incident Sensitivity</h3>
                    <p className="text-slate-400 text-sm mt-2 max-w-md">Product categories demonstrating repeat incident patterns across reporting nodes.</p>
                 </div>
                 <div className="space-y-3">
                    {itemSensitivity.map((item, i) => (
                       <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 truncate max-w-[280px]">{item.name}</span>
                          <span className="text-sm font-black text-teal-400 whitespace-nowrap">{item.count} Cases</span>
                       </div>
                    ))}
                 </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] flex flex-col justify-center text-center">
                  <div className="p-5 bg-teal-500/10 rounded-full inline-block mx-auto mb-6">
                    <ShieldAlert className="w-10 h-10 text-teal-400" />
                  </div>
                  <h4 className="text-xl font-black uppercase tracking-tighter mb-2">Audit Synchronization</h4>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">All 1,240 records accounted for in session</p>
                  <div className="grid grid-cols-3 gap-4">
                     <div className="p-4 bg-white/5 rounded-2xl">
                        <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Success</span>
                        <span className="text-lg font-black">1,189</span>
                     </div>
                     <div className="p-4 bg-white/5 rounded-2xl">
                        <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Issue</span>
                        <span className="text-lg font-black text-amber-400">43</span>
                     </div>
                     <div className="p-4 bg-white/5 rounded-2xl">
                        <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Damage</span>
                        <span className="text-lg font-black text-rose-400">8</span>
                     </div>
                  </div>
              </div>
           </div>
        </section>

        {/* Comprehensive Audit Table */}
        <section className="bg-white rounded-[40px] shadow-2xl border border-slate-200 overflow-hidden">
          <div className="p-10 bg-slate-50/50 border-b border-slate-200 flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="relative w-full max-w-2xl">
              <div className="relative flex items-center bg-white border border-slate-200 rounded-[24px] shadow-inner px-6 py-4 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all overflow-hidden group">
                <Search className="w-5 h-5 text-slate-400 mr-4" />
                <input 
                  type="text"
                  placeholder="Deep search through 1,240 master ledger entries..."
                  className="w-full text-sm font-bold text-slate-700 placeholder:text-slate-400 focus:outline-none bg-transparent"
                  value={filters.search}
                  onChange={e => setFilters(p => ({...p, search: e.target.value}))}
                />
              </div>
            </div>
            <div className="bg-white border border-slate-200 px-8 py-5 rounded-[24px] shadow-sm flex items-center gap-4">
               <Layers className="w-5 h-5 text-indigo-600" />
               <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Active Ledger</span>
                  <span className="text-xl font-black text-slate-900 tracking-tighter">{filteredData.length} Records Shown</span>
               </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 font-black uppercase tracking-[0.2em] text-[9px] bg-slate-50">
                  <th className="py-6 px-10 border-b border-slate-100">Invoice ID</th>
                  <th className="py-6 px-10 border-b border-slate-100">Customer Account</th>
                  <th className="py-6 px-10 border-b border-slate-100">Transporter</th>
                  <th className="py-6 px-10 text-center border-b border-slate-100">Impact</th>
                  <th className="py-6 px-10 text-right border-b border-slate-100 pr-14">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.slice(0, 50).map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-5 px-10">
                      <div className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase">{row.saleInvoice}</div>
                      <div className="text-[9px] font-black text-slate-400 uppercase mt-1">{row.month}</div>
                    </td>
                    <td className="py-5 px-10">
                      <div className="text-slate-700 font-bold max-w-[280px] truncate">{row.customer}</div>
                      <div className="text-[9px] font-black text-slate-400 uppercase mt-1">{row.city}, {row.state}</div>
                    </td>
                    <td className="py-5 px-10">
                      <div className="flex items-center text-slate-500 font-black uppercase text-[10px]">
                        <Truck className="w-3 h-3 mr-2 opacity-30" /> {row.transporter}
                      </div>
                    </td>
                    <td className={`py-5 px-10 text-center font-black text-base ${row.qty > 0 ? 'text-slate-900' : 'text-slate-200'}`}>
                      {row.qty || '—'}
                    </td>
                    <td className="py-5 px-10 text-right pr-14">
                      <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border-2 ${
                        row.status === 'damage' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                        row.status === 'shortage' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                        'bg-teal-50 text-teal-600 border-teal-100'
                      }`}>
                        {row.status === 'No shortage and damage' ? 'FULFILLED' : row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-8 bg-slate-50/50 border-t border-slate-100 text-center">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">End of audit summary • Full set available via export</p>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 py-16 px-10 mt-20 border-t border-white/10">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-4">
             <ShieldAlert className="w-8 h-8 text-indigo-500" />
             <div className="text-white">
                <p className="text-lg font-black uppercase tracking-tighter">CPC Logistics Core</p>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Enterprise Data Aggregation Engine</p>
             </div>
          </div>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
             <span>© 2025 LOGISTICS HUB</span>
             <span className="text-indigo-400">ISO 9001 SYNC</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
