
import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  AreaChart, Area, Cell, PieChart, Pie, ComposedChart, Line
} from 'recharts';
import { 
  LayoutDashboard, Filter, TrendingUp, AlertTriangle, Package, Truck, 
  MapPin, Calendar, Search, Sparkles, RefreshCw, ChevronDown, Download, Layers, ShieldAlert, BarChart3, UserCheck, X, FileDown, Building2, CheckCircle2, Percent
} from 'lucide-react';
import { 
  parseCSV, CSV_DATA, SUMMARY_CSV, parseSummaryCSV, getStats, getMonthlyTrend, 
  getTransporterAnalysis, getGeoTrend, getItemClassification, getCustomerAnalysis 
} from './dataService';
import { DeliveryRecord, FilterState } from './types';
import { getLogisticsSummary } from './geminiService';

const COLORS = ['#10b981', '#f59e0b', '#f43f5e', '#6366f1', '#8b5cf6', '#06b6d4', '#ec4899'];

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
  const [summaryData] = useState(() => parseSummaryCSV(SUMMARY_CSV));
  
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

  const stats = useMemo(() => getStats(filteredData, summaryData), [filteredData, summaryData]);
  const monthlyTrend = useMemo(() => getMonthlyTrend(filteredData), [filteredData]);
  const geoData = useMemo(() => getGeoTrend(filteredData, geoLevel), [filteredData, geoLevel]);
  const qtyGeoData = useMemo(() => getGeoTrend(filteredData, qtyGeoLevel), [filteredData, qtyGeoLevel]);
  const itemData = useMemo(() => getItemClassification(filteredData), [filteredData]);
  const customerData = useMemo(() => getCustomerAnalysis(filteredData), [filteredData]);
  
  const pieData = [
    { name: 'Success', value: summaryData.reduce((acc, curr) => acc + curr.success, 0) },
    { name: 'Shortage', value: summaryData.reduce((acc, curr) => acc + curr.shortage, 0) },
    { name: 'Damage', value: summaryData.reduce((acc, curr) => acc + curr.damage, 0) }
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

  const CustomSummaryTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-xl shadow-xl border border-slate-100 min-w-[200px]">
          <p className="font-bold text-slate-800 mb-2 border-b pb-1">{label}</p>
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-teal-600 font-semibold">No Issues:</span>
              <span className="font-bold text-slate-900">{data.success} ({data.successPct}%)</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-amber-600 font-semibold">Shortage:</span>
              <span className="font-bold text-slate-900">{data.shortage} ({data.shortagePct}%)</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-rose-600 font-semibold">Damage:</span>
              <span className="font-bold text-slate-900">{data.damage} ({data.damagePct}%)</span>
            </div>
            <div className="flex justify-between items-center text-xs pt-1 border-t mt-1">
              <span className="text-slate-500 font-bold">Total Invoices:</span>
              <span className="font-black text-indigo-600">{data.total}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
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
              Logistics Insights (Aug - Dec 25)
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleDownloadInputData}
              className="flex items-center space-x-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-200 transition-colors border border-slate-200 shadow-sm"
            >
              <FileDown className="w-4 h-4" />
              <span>Export Raw Data</span>
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
              <span>GenAI Dashboard Audit</span>
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
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <StatCard title="Total Shipments" value={stats.totalSalesInvoices} icon={Package} colorClass="bg-slate-700" subtitle="Total Sales Invoices" />
          <StatCard title="Success Rate" value={`${stats.successRate}%`} icon={CheckCircle2} colorClass="bg-teal-600" subtitle="Fulfillment Accuracy" />
          <StatCard title="Total Incidents" value={stats.totalIssues} icon={AlertTriangle} colorClass="bg-indigo-600" subtitle="Claims raised" />
          <StatCard title="Shortage Qty" value={stats.shortageQty} icon={Layers} colorClass="bg-amber-500" subtitle="Total units missing" />
          <StatCard title="Damage Qty" value={stats.damageQty} icon={ShieldAlert} colorClass="bg-rose-500" subtitle="Total units damaged" />
          <StatCard title="Impacted Cust." value={stats.totalCustomers} icon={UserCheck} colorClass="bg-slate-500" subtitle="Unique customers" />
        </section>

        {/* --- TOTAL SALES ANALYSIS (SUCCESS VS ISSUES) --- */}
        <section className="mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                            <BarChart3 className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-lg">Total Sales vs Delivery Issues</h3>
                            <p className="text-xs text-slate-500">Monthly breakdown with fulfillment percentages</p>
                        </div>
                    </div>
                    {/* Percentage Grid Summary */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 flex-1 max-w-4xl">
                        {summaryData.map((d, i) => (
                          <div key={i} className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                            <p className="text-[10px] font-black text-indigo-600 mb-1">{d.month}</p>
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-slate-400">Ok:</span>
                              <span className="text-teal-600 font-bold">{d.successPct}%</span>
                            </div>
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-slate-400">Short:</span>
                              <span className="text-amber-600 font-bold">{d.shortagePct}%</span>
                            </div>
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-slate-400">Dmg:</span>
                              <span className="text-rose-600 font-bold">{d.damagePct}%</span>
                            </div>
                          </div>
                        ))}
                    </div>
                </div>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={summaryData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis 
                                dataKey="month" 
                                tick={{fill: '#64748b', fontSize: 12}} 
                                axisLine={false} 
                                tickLine={false}
                            />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                            <Tooltip content={<CustomSummaryTooltip />} cursor={{fill: '#f8fafc', fillOpacity: 0.5}} />
                            <Legend verticalAlign="top" align="right" iconType="circle" />
                            <Bar dataKey="success" name="No Shortage/Damage" stackId="a" fill="#10b981" />
                            <Bar dataKey="shortage" name="Shortage" stackId="a" fill="#f59e0b" />
                            <Bar dataKey="damage" name="Damage" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                            <Line type="monotone" dataKey="total" name="Total Invoices" stroke="#6366f1" strokeWidth={3} dot={{r: 4, fill: '#6366f1'}} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>

        {/* --- STOCK QUANTITY WISE ANALYSIS DASHBOARD (GEO) --- */}
        <section className="mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                            <Layers className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-lg">Inventory Impact (Qty)</h3>
                            <p className="text-xs text-slate-500">Geographic breakdown of total units affected</p>
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

        {/* --- CUSTOMER WISE IMPACT TREND --- */}
        <section className="mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-teal-50 rounded-lg">
                        <Building2 className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 text-lg">Customer Impact Distribution</h3>
                        <p className="text-xs text-slate-500">Most affected customers based on quantity impacted</p>
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
                <h3 className="font-bold text-slate-900">Claim Incident Freq.</h3>
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
                  <Bar dataKey="shortageCount" name="Shortage (Claims)" fill="#f59e0b" radius={[0, 4, 4, 0]} stackId="a" />
                  <Bar dataKey="damageCount" name="Damage (Claims)" fill="#f43f5e" radius={[0, 4, 4, 0]} stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center space-x-2 mb-6">
              <Package className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900">Item Incident Sensitivity</h3>
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
                  <Bar dataKey="qty" name="Qty Impacted" fill="#f59e0b" radius={[4, 4, 0, 0]} />
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
                <h3 className="font-bold text-slate-900">Monthly Fulfillment Issues</h3>
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
                  <Area type="monotone" dataKey="shortage" name="Shortages" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorShort)" />
                  <Area type="monotone" dataKey="damage" name="Damages" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorDmg)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center">
            <h3 className="font-bold text-slate-900 mb-6 w-full text-left">Fulfillment Distribution</h3>
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
            <div className="grid grid-cols-1 gap-2 mt-4 w-full">
              {pieData.map((d, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i]}} />
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">{d.name}</span>
                  </div>
                  <span className="text-sm font-black text-slate-900">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Interactive Search Ledger --- */}
        <section id="ledger-section" className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden mb-12">
          <div className="p-6 bg-slate-50 border-b border-slate-200">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="relative w-full max-w-2xl">
                <div className="relative flex items-center bg-white border border-slate-300 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all overflow-hidden">
                  <div className="pl-4 pr-2 text-slate-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <input 
                    type="text"
                    placeholder="Search by Invoice, Customer, City, or Remark..."
                    className="w-full py-3 text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none"
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  />
                  {filters.search && (
                    <button onClick={() => setFilters(prev => ({ ...prev, search: '' }))} className="p-2 mr-2 bg-slate-100 rounded-full text-slate-500">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{filteredData.length} records found</span>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto max-h-[600px]">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="sticky top-0 bg-white z-10 border-b border-slate-200">
                <tr className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-4 px-6">Invoice</th>
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-6">Affected Item</th>
                  <th className="py-4 px-6">Transporter</th>
                  <th className="py-4 px-6 text-center">Qty</th>
                  <th className="py-4 px-6 text-right pr-10">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900">{row.saleInvoice}</div>
                      <div className="text-[10px] text-slate-400">{row.deliveredDate}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-slate-800 font-semibold truncate max-w-[200px]">{row.customer}</div>
                      <div className="text-[10px] text-slate-500">{row.city}, {row.state}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-slate-600 truncate max-w-[250px]">{row.item}</div>
                      <div className="text-[11px] text-indigo-500 italic mt-0.5">"{row.remark}"</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-[11px] font-medium bg-slate-100 px-2 py-1 rounded-md">{row.transporter}</span>
                    </td>
                    <td className="py-4 px-6 text-center font-black text-slate-900">{row.qty}</td>
                    <td className="py-4 px-6 text-right pr-10">
                      <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
                        row.status === 'damage' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
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

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-[1600px] mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 opacity-50">
             <ShieldAlert className="w-4 h-4" />
             <p className="text-xs font-bold text-slate-500 tracking-tighter">CPC ANALYTICS PORTAL · 2025</p>
          </div>
          <div className="flex space-x-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span>Fulfillment Status: Optimal</span>
            <span>Data Sync: 100%</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
