
import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  AreaChart, Area, Cell, PieChart, Pie
} from 'recharts';
import { 
  LayoutDashboard, Filter, TrendingUp, AlertTriangle, Package, Truck, 
  MapPin, Calendar, Search, Sparkles, RefreshCw, ChevronDown, Download, Layers, ShieldAlert, BarChart3, UserCheck, X, FileDown, Building2
} from 'lucide-react';
import { 
  parseCSV, CSV_DATA, getStats, getMonthlyTrend, 
  getTransporterAnalysis, getGeoTrend, getItemClassification, getCustomerAnalysis 
} from './dataService';
import { DeliveryRecord, FilterState } from './types';
import { getLogisticsSummary } from './geminiService';

const COLORS = ['#6366f1', '#f43f5e', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899'];

const StatCard = ({ title, value, icon: Icon, colorClass, subtitle }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start space-x-4">
    <div className={`p-3 rounded-xl ${colorClass}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
      {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
    </div>
  </div>
);

const App: React.FC = () => {
  const [rawData] = useState<DeliveryRecord[]>(() => parseCSV(CSV_DATA));
  const [filters, setFilters] = useState<FilterState>({
    month: '',
    state: '',
    city: '',
    transporter: '',
    status: '',
    search: ''
  });
  const [geoLevel, setGeoLevel] = useState<'state' | 'city' | 'pincode'>('state');
  const [qtyGeoLevel, setQtyGeoLevel] = useState<'state' | 'city' | 'pincode'>('state');
  const [aiSummary, setAiSummary] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const filteredData = useMemo(() => {
    return rawData.filter(d => {
      const matchesSearch = !filters.search || 
        d.saleInvoice.toLowerCase().includes(filters.search.toLowerCase()) ||
        d.item.toLowerCase().includes(filters.search.toLowerCase()) ||
        d.remark.toLowerCase().includes(filters.search.toLowerCase()) ||
        d.city.toLowerCase().includes(filters.search.toLowerCase()) ||
        d.pincode.toLowerCase().includes(filters.search.toLowerCase()) ||
        d.customer.toLowerCase().includes(filters.search.toLowerCase());

      return (
        (!filters.month || d.month === filters.month) &&
        (!filters.state || d.state === filters.state) &&
        (!filters.city || d.city === filters.city) &&
        (!filters.transporter || d.transporter === filters.transporter) &&
        (!filters.status || d.status === filters.status) &&
        matchesSearch
      );
    });
  }, [rawData, filters]);

  const stats = useMemo(() => getStats(filteredData), [filteredData]);
  const monthlyTrend = useMemo(() => getMonthlyTrend(filteredData), [filteredData]);
  const geoData = useMemo(() => getGeoTrend(filteredData, geoLevel), [filteredData, geoLevel]);
  const qtyGeoData = useMemo(() => getGeoTrend(filteredData, qtyGeoLevel), [filteredData, qtyGeoLevel]);
  const itemData = useMemo(() => getItemClassification(filteredData), [filteredData]);
  const customerData = useMemo(() => getCustomerAnalysis(filteredData), [filteredData]);
  
  const pieData = [
    { name: 'Shortage', value: stats.shortageCount },
    { name: 'Damage', value: stats.damageCount }
  ];

  const uniqueStates = Array.from(new Set(rawData.map(d => d.state))).sort();
  const uniqueCities = Array.from(new Set(rawData.map(d => d.city))).sort();
  const uniqueTransporters = Array.from(new Set(rawData.map(d => d.transporter))).sort();
  const uniqueMonths = ['Aug 25', 'Sep 25', 'Oct 25', 'Nov 25', 'Dec 25'];

  const handleResetFilters = () => {
    setFilters({ month: '', state: '', city: '', transporter: '', status: '', search: '' });
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const summary = await getLogisticsSummary(filteredData);
    setAiSummary(summary);
    setIsAnalyzing(false);
  };

  const handleDownloadInputData = () => {
    const blob = new Blob([CSV_DATA], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'CPC_Logistics_Source_Data.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <ShieldAlert className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-rose-600 bg-clip-text text-transparent">
              CPC (AUG - DEC) SHORTAGE AND DAMAGE
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleDownloadInputData}
              className="flex items-center space-x-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-200 transition-colors border border-slate-200 shadow-sm"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Source CSV</span>
            </button>
            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg font-medium hover:bg-indigo-100 transition-colors border border-indigo-200"
            >
              {isAnalyzing ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              <span>AI Insights</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1600px] mx-auto w-full p-6">
        {/* Filter Section */}
        <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Month</label>
              <div className="relative">
                <select 
                  className="w-full pl-3 pr-10 py-2 text-sm border border-slate-200 rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                  value={filters.month}
                  onChange={(e) => setFilters(prev => ({ ...prev, month: e.target.value }))}
                >
                  <option value="">All Months</option>
                  {uniqueMonths.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">State</label>
              <div className="relative">
                <select 
                  className="w-full pl-3 pr-10 py-2 text-sm border border-slate-200 rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                  value={filters.state}
                  onChange={(e) => setFilters(prev => ({ ...prev, state: e.target.value }))}
                >
                  <option value="">All States</option>
                  {uniqueStates.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">City</label>
              <div className="relative">
                <select 
                  className="w-full pl-3 pr-10 py-2 text-sm border border-slate-200 rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                  value={filters.city}
                  onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                >
                  <option value="">All Cities</option>
                  {uniqueCities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Transporter</label>
              <div className="relative">
                <select 
                  className="w-full pl-3 pr-10 py-2 text-sm border border-slate-200 rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                  value={filters.transporter}
                  onChange={(e) => setFilters(prev => ({ ...prev, transporter: e.target.value }))}
                >
                  <option value="">All Transporters</option>
                  {uniqueTransporters.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Status</label>
              <div className="relative">
                <select 
                  className="w-full pl-3 pr-10 py-2 text-sm border border-slate-200 rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="">All</option>
                  <option value="shortage">SHORTAGE</option>
                  <option value="damage">DAMAGE</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <button 
              onClick={handleResetFilters}
              className="px-4 py-2 text-sm font-semibold bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </section>

        {aiSummary && (
          <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="bg-gradient-to-br from-indigo-600 to-rose-600 p-0.5 rounded-2xl shadow-lg">
              <div className="bg-white p-6 rounded-[14px]">
                <div className="flex items-center space-x-2 mb-3">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-slate-900">Expert Supply Chain Analysis</h3>
                </div>
                <div className="prose prose-sm max-w-none text-slate-600 leading-relaxed">
                  {aiSummary.split('\n').map((line, i) => <p key={i} className="mb-1">{line}</p>)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Summary Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard title="Total Incidents" value={stats.totalIssues} icon={AlertTriangle} colorClass="bg-indigo-600" subtitle="Total Invoice" />
          <StatCard title="Total Shortage Qty" value={stats.shortageQty} icon={Package} colorClass="bg-amber-500" subtitle="Missing units total" />
          <StatCard title="Total Damage Qty" value={stats.damageQty} icon={ShieldAlert} colorClass="bg-rose-500" subtitle="Damaged units total" />
          <StatCard title="Total Customers" value={stats.totalCustomers} icon={UserCheck} colorClass="bg-teal-600" subtitle="Unique entities impacted" />
          <StatCard title="Overall Impact Qty" value={stats.totalQtyAffected} icon={Layers} colorClass="bg-slate-700" subtitle="Combined units impacted" />
        </section>

        {/* --- STOCK QUANTITY WISE ANALYSIS DASHBOARD (GEO) --- */}
        <section className="mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                            <BarChart3 className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-lg">Stock Quantity Affected Analysis</h3>
                            <p className="text-xs text-slate-500">Geographic distribution of impacted inventory volume</p>
                        </div>
                    </div>
                    <div className="flex bg-slate-100 p-1 rounded-xl">
                        {(['state', 'city', 'pincode'] as const).map(level => (
                        <button
                            key={level}
                            onClick={() => setQtyGeoLevel(level)}
                            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                            qtyGeoLevel === level ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            {level.toUpperCase()}
                        </button>
                        ))}
                    </div>
                </div>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={qtyGeoData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis 
                                dataKey="label" 
                                tick={{fill: '#64748b', fontSize: 11}} 
                                axisLine={false} 
                                tickLine={false}
                                interval={0}
                                textAnchor="end"
                                angle={-45}
                                height={70}
                            />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                            <Tooltip 
                                cursor={{fill: '#f8fafc'}}
                                contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                            />
                            <Legend verticalAlign="top" align="right" />
                            <Bar dataKey="shortageQty" name="Shortage Quantity" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="damageQty" name="Damage Quantity" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>

        {/* --- CUSTOMER WISE IMPACT TREND --- */}
        <section className="mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-teal-50 rounded-lg">
                        <Building2 className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 text-lg">Top Customer Impact Breakdown</h3>
                        <p className="text-xs text-slate-500">Most affected customers by quantity and issue type</p>
                    </div>
                </div>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={customerData} margin={{ top: 10, right: 30, left: 20, bottom: 60 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis 
                                dataKey="name" 
                                tick={{fill: '#64748b', fontSize: 10}} 
                                axisLine={false} 
                                tickLine={false}
                                interval={0}
                                textAnchor="end"
                                angle={-35}
                            />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                            <Tooltip 
                                contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                            />
                            <Legend verticalAlign="top" align="right" />
                            <Bar dataKey="shortageQty" name="Shortage Qty" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="damageQty" name="Damage Qty" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900">Incident Frequency (Count)</h3>
              </div>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                {(['state', 'city', 'pincode'] as const).map(level => (
                  <button
                    key={level}
                    onClick={() => setGeoLevel(level)}
                    className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${
                      geoLevel === level ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {level.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={geoData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="label" type="category" width={120} tick={{fill: '#64748b', fontSize: 11}} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f8fafc'}} />
                  <Legend />
                  <Bar dataKey="shortageCount" name="Shortage (Count)" fill="#6366f1" radius={[0, 4, 4, 0]} stackId="a" />
                  <Bar dataKey="damageCount" name="Damage (Count)" fill="#f43f5e" radius={[0, 4, 4, 0]} stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center space-x-2 mb-6">
              <Package className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900">Item-wise Incident Distribution</h3>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={itemData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 10}} axisLine={false} tickLine={false} height={60} interval={0} textAnchor="end" angle={-45} />
                  <YAxis tick={{fill: '#64748b', fontSize: 11}} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                  <Legend verticalAlign="top" align="right" height={36}/>
                  <Bar dataKey="count" name="Case Count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="qty" name="Qty Affected" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
           <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900">Monthly Incident Trend</h3>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrend}>
                  <defs>
                    <linearGradient id="colorShort" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/><stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/></linearGradient>
                    <linearGradient id="colorDmg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/><stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                  <Legend />
                  <Area type="monotone" dataKey="shortage" name="Shortage" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorShort)" />
                  <Area type="monotone" dataKey="damage" name="Damage" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorDmg)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center">
            <h3 className="font-bold text-slate-900 mb-6 w-full text-left">Overall Case Share</h3>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {pieData.map((d, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i]}} />
                  <span className="text-xs font-bold text-slate-500 uppercase">{d.name} ({d.value})</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Interactive Enhanced Search Bar --- */}
        <section id="ledger-section" className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden mb-12">
          <div className="p-6 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="relative w-full max-w-2xl group">
                <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl blur opacity-10 group-focus-within:opacity-25 transition duration-300`}></div>
                <div className="relative flex items-center bg-white border-2 border-slate-200 rounded-2xl shadow-sm group-focus-within:border-indigo-400 group-focus-within:ring-4 group-focus-within:ring-indigo-50 transition-all duration-200 overflow-hidden">
                  <div className="pl-5 pr-3 text-slate-400">
                    <Search className={`w-5 h-5 transition-colors duration-200 ${filters.search ? 'text-indigo-500' : 'text-slate-400'}`} />
                  </div>
                  <input 
                    type="text"
                    placeholder="Search searchable ledger for audit and verification..."
                    className="w-full py-4 text-base font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  />
                  {filters.search && (
                    <button 
                      onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                      className="p-2 mr-3 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <div className="pr-5 flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${filteredData.length > 0 ? 'bg-indigo-100 text-indigo-600' : 'bg-rose-100 text-rose-600'}`}>
                      {filteredData.length} Matches
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 w-full lg:w-auto">
                <button 
                  onClick={() => {
                    const blob = new Blob([CSV_DATA], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.setAttribute('hidden', '');
                    a.setAttribute('href', url);
                    a.setAttribute('download', 'CPC_Logistics_Analysis_Export.csv');
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                  }}
                  className="flex-1 lg:flex-none flex items-center justify-center space-x-2 px-6 py-3.5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Report</span>
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto max-h-[600px]">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-slate-100 shadow-sm">
                <tr className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-5 px-6">Invoice Identifier</th>
                  <th className="py-5 px-6"><div className="flex items-center space-x-1"><UserCheck className="w-3 h-3"/><span>Customer & Fulfillment Center</span></div></th>
                  <th className="py-5 px-6">Impact Analysis</th>
                  <th className="py-5 px-6">Logistics Provider</th>
                  <th className="py-5 px-6 text-center">Qty</th>
                  <th className="py-5 px-6 text-right pr-10">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-indigo-50/40 transition-all duration-150">
                    <td className="py-5 px-6">
                      <div className="font-bold text-slate-900 mb-0.5">{row.saleInvoice}</div>
                      <div className="text-[10px] text-slate-400 font-medium tracking-tight">DELIVERED: {row.deliveredDate}</div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="text-slate-800 font-semibold max-w-[320px] truncate group-hover:text-indigo-600 transition-colors">{row.customer}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="w-3 h-3 text-slate-300" />
                        <span className="text-[10px] text-slate-500 font-medium">{row.city}, {row.state} · {row.pincode}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="text-slate-700 font-medium truncate max-w-[280px]">{row.item || 'N/A'}</div>
                      <div className="text-[11px] text-indigo-500/80 italic truncate max-w-[280px] mt-0.5 leading-relaxed bg-indigo-50/50 px-1.5 py-0.5 rounded inline-block">“{row.remark}”</div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="text-slate-600 font-medium inline-flex items-center space-x-2 bg-slate-100 px-2 py-1 rounded-lg">
                        <Truck className="w-3 h-3 text-slate-400"/>
                        <span className="text-[11px]">{row.transporter}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-center">
                      <div className="bg-slate-900 text-white w-8 h-8 rounded-lg flex items-center justify-center font-black mx-auto shadow-sm">
                        {row.qty}
                      </div>
                    </td>
                    <td className="py-5 px-6 text-right pr-10">
                      <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm ${
                        row.status === 'damage' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-white'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredData.length === 0 && (
              <div className="py-32 text-center bg-white border-t border-slate-50">
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-inner">
                   <Package className="w-10 h-10 text-slate-300" />
                </div>
                <h4 className="text-slate-900 font-bold text-lg">No Results Found</h4>
                <p className="text-slate-400 font-medium max-w-md mx-auto mt-2">We couldn't find any claims matching "{filters.search}". Try searching for invoice numbers or customer names instead.</p>
                <button 
                  onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                  className="mt-6 text-indigo-600 font-bold hover:underline"
                >
                  Clear search and see all records
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-[1600px] mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-3 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
             <ShieldAlert className="w-5 h-5 text-indigo-600" />
             <p className="text-slate-500 text-sm font-bold tracking-tight">CPC Analytics Portal 2026</p>
          </div>
          <div className="flex space-x-8 text-slate-400 text-xs font-bold uppercase tracking-widest">
            <span className="hover:text-slate-600 cursor-pointer">Security Audit</span>
            <span className="hover:text-slate-600 cursor-pointer" onClick={handleDownloadInputData}>Export Logs</span>
            <span className="hover:text-slate-600 cursor-pointer text-indigo-500">System Stable</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
