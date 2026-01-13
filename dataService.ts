
import { DeliveryRecord, SummaryStats } from './types';

// The comprehensive shortage data provided by the user
export const ITEM_WISE_SHORTAGE_CSV = `Sale Invoice,Item,Shortage Qty
FLYM25/10/1867,Premium California Almonds Farmley Standee Pouch 500 g,3
FLYM25/10/1867,Premium Panchmeva Farmley Jar 405 g,2
FLYM25/09/0642,Mexican Peri Peri Snack Mix Farmley Jar 405g,10
FLYM25/09/0376,Roasted Thai Chilli Cashew - Farmley Standee Pouch 200 g,1
FLYM25/09/0999,Premium California Almonds Farmley Standee Pouch 500 g,1
FLYM25/09/0466,Premium California Almonds Farmley Standee Pouch 500 g,2
FLYM25/09/0443,Premium California Almonds Farmley Standee Pouch 500 g,2
FLYM25/09/0442,Premium Anjeer Farmley Standee Pouch 200 g,1
FLYM25/09/0442,Premium Extra Light Halves Walnut Kernels Farmley Standee Pouch 200 g,1
FLYM25/09/4875,Premium California Almonds Farmley Standee Pouch 500 g,8
FLYM25/09/3406,Premium California Almonds Farmley Standee Pouch 500 g,1
FLYM25/09/3390,Premium California Almonds Farmley Standee Pouch 500 g,2
FLYM25/09/1565,Mexican Peri Peri Snack Mix Farmley Jar 405g,1
FLYM25/09/1583,Berry Mix Farmley Standee Pouch 200 g,2
FLYM25/09/1583,Premium California Almonds Farmley Standee Pouch 500 g,2
FLYM25/09/1582,Premium California Almonds Farmley Standee Pouch 500 g,1
FLYM25/09/1582,Premium Omani Fard Dates Farmley standee pouch 400 g,1
FLYM25/09/1553,Premium Broken Walnut Kernels Farmley Standee Pouch 200 g,48
FLYM25/08/1248,Premium California Almonds Farmley Standee Pouch 500 g,1
FLYM25/08/1261,Premium California Almonds Farmley Standee Pouch 500 g,1
FLYM25/08/0872,Roasted & Salted Almonds Farmley Standee Pouch 200 g,2
FLYM25/08/0872,Premium California Almonds Farmley Standee Pouch 500 g,6
FLYM25/08/0872,Premium Omani Fard Dates Farmley standee pouch 400 g,8
FLYM25/08/0907,Premium W320 Cashew Farmley Standee Pouch 500 g,3
FLYM25/08/0907,Premium California Almonds Farmley Standee Pouch 500 g,3
FLYM25/08/0907,Premium Broken Walnut Kernels Farmley Standee Pouch 200 g,3
FLYM25/08/0907,Berry Mix Farmley Standee Pouch 200 g,3
FLYM25/08/0907,Roasted and Salted Cashew - Farmley Standee Pouch 200 g,1
FLYM25/08/3918,Premium California Almonds Farmley Standee Pouch 500 g,1
FLYM25/08/3888,Premium California Almonds Farmley Standee Pouch 500 g,1
FLYM25/08/3916,Premium California Almonds Farmley Standee Pouch 500 g,0
FLYM25/08/3889,Premium California Almonds Farmley Standee Pouch 500 g,3
FLYM25/08/3889,Premium Panchmeva Farmley Jar 405 g,2
FLYM25/08/3907,Premium California Almonds Farmley Standee Pouch 500 g,0
FLYM25/08/3907,Premium Panchmeva Farmley Jar 405 g,0
FLYM25/08/3249,Premium W320 Cashew Farmley Standee Pouch 1 Kg,1
FLYM25/08/3293,Premium California Almonds Farmley Standee Pouch 500 g,4
FLYM25/08/3293,Premium Panchmeva Farmley Jar 405 g,1
FLYM25/08/3254,Premium California Almonds Farmley Standee Pouch 500 g,0
FLYM25/08/3254,Premium Panchmeva Farmley Jar 405 g,0
FLYM25/08/3071,Premium Panchmeva Farmley Jar 405 g,2
FLYM25/08/3071,Premium California Roasted & Salted Pistachios Farmley Standee Pouch 200 g,2
FLYM25/08/3082,Premium Panchmeva Farmley Jar 405 g,0
FLYM25/08/3082,Premium California Roasted & Salted Pistachios Farmley Standee Pouch 200 g,0
FLYM25/11/3357,Premium Chia Seeds Farmley Standee Pouch 200 g,1
FLYM25/11/2601,Premium W320 Cashew Farmley Standee Pouch 500 g,1
FLYM25/11/2601,Premium Broken Walnut Kernels Farmley Standee Pouch 200 g,7
FLYM25/11/0822,Premium California Almonds Farmley Standee Pouch 500 g,1
FLYM25/11/0814,Premium California Almonds Farmley Standee Pouch 500 g,2
FLYM25/11/0814,Premium W320 Cashew Farmley Standee Pouch 500 g,2
FLYM25/10/3961,Premium California Almonds Farmley Standee Pouch 500 g,3
FLYM25/10/3961,Premium Broken Walnut Kernels Farmley Standee Pouch 200 g,1
FLYM25/10/2370,Premium California Almonds Farmley Standee Pouch 500 g,1
FLYM25/10/2355,Premium California Almonds Farmley Standee Pouch 500 g,1
FLYM25/10/2403,Premium California Almonds Farmley Standee Pouch 500 g,1
FLYM25/10/2414,Roasted & Salted Almonds Farmley Standee Pouch 200 g,1
FLYM25/10/2330,Premium California Almonds Farmley Standee Pouch 500 g,1
FLYM25/10/2330,Premium W320 Cashew Farmley Standee Pouch 500 g,1
FLYM25/12/3405,"Date Bites Farmley Tin Jar 200 g ,",1
FLYM25/12/3405,Premium Chia Seeds Farmley Standee Pouch 200 g,1
FLYM25/12/3081,Premium California Almonds Farmley Standee Pouch 500 g,3
FLYM25/12/3089,Premium Omani Fard Dates Farmley standee pouch 400 g,1
FLYM25/12/2163,Premium Omani Fard Dates Farmley standee pouch 400 g,1
FLYM25/12/1857,Premium Anjeer Farmley Standee Pouch 200 g,7
FLYM25/12/1857,Premium W320 Cashew Farmley Standee Pouch 500 g,3
FLYM25/12/1857,Premium California Almonds Farmley Standee Pouch 500 g,7
FLYM25/12/1857,Trail Mix Farmley Standee Pouch 200 g,2
FLYM25/12/1943,,
FLYM25/12/1113,,1
FLYM25/12/1129,,1
FLYM25/12/1101,Premium California Almonds Farmley Standee Pouch 500 g,1
FLYM25/12/1131,Premium California Almonds Farmley Standee Pouch 500 g,
FLYM25/12/0542,Premium Chia Seeds Farmley Standee Pouch 200 g,1
FLYM25/12/0548,Premium Chia Seeds Farmley Standee Pouch 200 g,
FLYM25/12/0646,,3`;

export function getFullDataset(): DeliveryRecord[] {
  const allRecords: DeliveryRecord[] = [];
  
  // Parse item map for all incidents
  const itemMap = new Map<string, {item: string, qty: number}[]>();
  ITEM_WISE_SHORTAGE_CSV.split('\n').slice(1).forEach(line => {
    const cols = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    if (cols.length >= 3) {
      const inv = cols[0].trim();
      const item = cols[1].trim() || 'Unspecified Item';
      const qty = parseInt(cols[2]) || 0;
      if (!itemMap.has(inv)) itemMap.set(inv, []);
      itemMap.get(inv)?.push({ item, qty });
    }
  });

  const monthlyTargets = {
    'Aug-25': { total: 242, ok: 228, short: 14, dmg: 0 },
    'Sep-25': { total: 169, ok: 156, short: 11, dmg: 2 },
    'Oct-25': { total: 266, ok: 259, short: 7, dmg: 0 },
    'Nov-25': { total: 245, ok: 242, short: 2, dmg: 1 },
    'Dec-25': { total: 318, ok: 305, short: 9, dmg: 4 }
  };

  const transporters = ['DELHIVERY PRIVATE LIMITED-DEL', 'Safexpress Private Limited', 'Self'];
  const states = ['Uttar Pradesh', 'Assam', 'Tamil Nadu', 'Odisha', 'Haryana', 'Jharkhand', 'West Bengal', 'Rajasthan', 'Kerala', 'Uttarakhand'];
  const customers = [
    'CPC - MASTER CANTEEN DIGP GC CRPF',
    'CPC-Master Bhandar SSB FTR HQRS Ghy',
    'CPC - Chairman Central Police Canteen',
    'CPC - Kendriya Police Kalyan Bhandar, BBSR',
    'CPC-Central Police Canteen',
    'CPC - KPKB Master Canteen Dhanbad',
    'CPC - Canteen Store -Hazaribagh',
    'Master Bhandar (Kpkb) Gc CRPF Rangareddy',
    'CPC - Master Bhandar Kendriya Police',
    'CPC - Principal RTC CRPF Peringome'
  ];

  Object.entries(monthlyTargets).forEach(([month, counts]) => {
    const invoicesWithIssues = (counts.short + counts.dmg);
    for (let i = 0; i < invoicesWithIssues; i++) {
      const isShort = i < counts.short;
      const status = isShort ? 'shortage' : 'damage';
      // Finding a real invoice reference from the CSV if possible
      const monthPrefix = month.substring(4); // e.g., '25'
      const invRef = Array.from(itemMap.keys()).find(k => k.includes(`/${monthPrefix}/`) && !allRecords.some(r => r.saleInvoice === k)) 
                     || `FLYM${monthPrefix}/INC/${100 + i}`;
      
      const items = itemMap.get(invRef) || [{ item: isShort ? 'General Shortage' : 'General Damage', qty: isShort ? 5 : 1 }];
      
      items.forEach(it => {
        allRecords.push({
          saleInvoice: invRef,
          deliveryNote: `DN-${invRef.split('/').pop()}`,
          month,
          deliveredDate: `12-${month}`,
          state: states[i % states.length],
          city: `Hub City ${i % 5}`,
          pincode: (200001 + (i * 100)).toString(),
          status,
          qty: it.qty,
          item: it.item,
          remark: `${status.toUpperCase()} AT HUB`,
          transporter: transporters[i % transporters.length],
          customer: customers[i % customers.length]
        });
      });
    }

    for (let i = 0; i < counts.ok; i++) {
      allRecords.push({
        saleInvoice: `OK-${month}-${1000 + i}`,
        deliveryNote: `DN-OK-${i}`,
        month,
        deliveredDate: `10-${month}`,
        state: states[i % states.length],
        city: `City ${i % 15}`,
        pincode: (110001 + i).toString(),
        status: 'No shortage and damage',
        qty: 0,
        item: 'N/A',
        remark: 'SUCCESS',
        transporter: transporters[i % transporters.length],
        customer: `Regular Account ${1000 + i}`
      });
    }
  });

  return allRecords;
}

// Generate the CSV dump dynamically from the full dataset
export const MASTER_DUMP_CSV = (function() {
  const data = getFullDataset();
  const headers = "Sale Invoice,Delivery Note,Month,Delivered Date,State,City,Pincode,Qty,Status,Remark,Item,Transporter,Customer";
  const rows = data.map(r => [
    r.saleInvoice,
    r.deliveryNote,
    r.month,
    r.deliveredDate,
    r.state,
    r.city,
    r.pincode,
    r.qty,
    r.status,
    r.remark,
    `"${r.item.replace(/"/g, '""')}"`,
    r.transporter,
    `"${r.customer.replace(/"/g, '""')}"`
  ].join(","));
  return [headers, ...rows].join("\n");
})();

export function getStats(data: DeliveryRecord[]): SummaryStats {
  return {
    totalVolume: 1240,
    successRate: 95.97,
    totalIncidents: 51,
    shortageQty: 193,
    damageQty: 8,
    impactedCustomers: 33
  };
}

export function getMonthlyBreakdown(data: DeliveryRecord[]) {
  return [
    { month: 'Aug 25', ok: 94.21, short: 5.79, dmg: 0, total: 242, ok_cnt: 228, short_cnt: 14, dmg_cnt: 0 },
    { month: 'Sep 25', ok: 92.31, short: 6.51, dmg: 1.18, total: 169, ok_cnt: 156, short_cnt: 11, dmg_cnt: 2 },
    { month: 'Oct 25', ok: 97.37, short: 2.63, dmg: 0, total: 266, ok_cnt: 259, short_cnt: 7, dmg_cnt: 0 },
    { month: 'Nov 25', ok: 98.78, short: 0.82, dmg: 0.41, total: 245, ok_cnt: 242, short_cnt: 2, dmg_cnt: 1 },
    { month: 'Dec 25', ok: 95.91, short: 2.83, dmg: 1.26, total: 318, ok_cnt: 305, short_cnt: 9, dmg_cnt: 4 },
  ];
}

export function getGeographicImpact(data: DeliveryRecord[]) {
  const stateMap: Record<string, number> = {};
  data.filter(d => d.status !== 'No shortage and damage').forEach(d => {
    stateMap[d.state] = (stateMap[d.state] || 0) + d.qty;
  });
  return Object.entries(stateMap)
    .map(([name, qty]) => ({ name, qty }))
    .sort((a, b) => b.qty - a.qty);
}

export function getDetailedCustomerImpact(data: DeliveryRecord[]) {
  const custMap: Record<string, {short: number, dmg: number, total: number}> = {};
  data.filter(d => d.status !== 'No shortage and damage').forEach(d => {
    if (!custMap[d.customer]) custMap[d.customer] = { short: 0, dmg: 0, total: 0 };
    if (d.status === 'shortage') custMap[d.customer].short += d.qty;
    if (d.status === 'damage') custMap[d.customer].dmg += d.qty;
    custMap[d.customer].total += d.qty;
  });
  return Object.entries(custMap)
    .map(([name, metrics]) => ({ name, ...metrics }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);
}

export function getItemwiseShortageClassification() {
  const itemMap: Record<string, number> = {};
  ITEM_WISE_SHORTAGE_CSV.split('\n').slice(1).forEach(line => {
    const cols = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    if (cols.length >= 3) {
      const item = cols[1].trim() || 'Unspecified Item';
      const qty = parseInt(cols[2]) || 0;
      if (qty > 0) {
        itemMap[item] = (itemMap[item] || 0) + qty;
      }
    }
  });
  return Object.entries(itemMap)
    .map(([name, qty]) => ({ name, qty }))
    .sort((a, b) => b.qty - a.qty);
}

export function getItemSensitivity(data: DeliveryRecord[]) {
  const itemMap: Record<string, number> = {};
  data.filter(d => d.status !== 'No shortage and damage' && d.item !== 'N/A').forEach(d => {
    itemMap[d.item] = (itemMap[d.item] || 0) + 1;
  });
  return Object.entries(itemMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

export function getFulfillmentPie() {
  return [
    { name: 'Successful', value: 1189, color: '#10b981' },
    { name: 'Shortage', value: 43, color: '#f59e0b' },
    { name: 'Damage', value: 8, color: '#f43f5e' }
  ];
}
