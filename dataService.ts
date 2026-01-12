
import { DeliveryRecord } from './types';

// New summary data provided by user
export const SUMMARY_CSV = `Invoice Month,status,Sales Invoice Count,% of Total Sales Invoices
Aug 25,No shortage and damage,228,94.21
Aug 25,shortage,14,5.79
Dec 25,No shortage and damage,305,95.91
Dec 25,damage,4,1.26
Dec 25,shortage,9,2.83
Nov 25,No shortage and damage,242,98.78
Nov 25,damage,1,0.41
Nov 25,shortage,2,0.82
Oct 25,No shortage and damage,259,97.37
Oct 25,shortage,7,2.63
Sep 25,No shortage and damage,156,92.31
Sep 25,damage,2,1.18
Sep 25,shortage,11,6.51`;

export const CSV_DATA = `Sale Invoice,Delivery Note,Month,Delivered Date,State,City,Pincode,Qty,Status,Remark,Item,Transporter Name Logistics,Customer
FLYM25/12/3405,D-25-12-5883,Dec 25,30-12-2025,Jharkhand,Dhanbad,826005,2,shortage,2  pc  short,"Date Bites Farmley Tin Jar 200 g ,, Premium Chia Seeds Farmley Standee Pouch 200 g",Safexpress Private Limited,CPC - KPKB Master Canteen Dhanbad-Dhanbad-Jharkhand-826005
FLYM25/12/3081,D-25-12-5301,Dec 25,26-12-2025,Telangana,Hyderabad,500064,4,shortage,4 pcs short,Premium California Almonds Farmley Standee Pouch 500 g,Safexpress Private Limited,Master Bhandar (Kpkb) Gc CRPF Rangareddy-Hyderabad-Telangana-500064
FLYM25/12/3089,D-25-12-5308,Dec 25,26-12-2025,Telangana,Hyderabad,500064,4,shortage,4 pcs short,Premium Omani Fard Dates Farmley standee pouch 400 g,Safexpress Private Limited,Master Bhandar (Kpkb) Gc CRPF Rangareddy-Hyderabad-Telangana-500064
FLYM25/12/2163,D-25-12-3628,Dec 25,23-12-2025,West Bengal,Asansol,713302,20,shortage,20 pc short,Premium Omani Fard Dates Farmley standee pouch 400 g,DELHIVERY PRIVATE LIMITED-DEL,CPC - Master Bhandar Kendriya Police Kalyan Bhandar-Asansol-West Bengal-713302
FLYM25/12/1857,D-25-12-3120,Dec 25,16-12-2025,Gujarat,Ahmedabad,380015,13,shortage,13 pkts missing,"Premium Anjeer Farmley Standee Pouch 200 g, Premium W320 Cashew Farmley Standee Pouch 500 g, Premium California Almonds Farmley Standee Pouch 500 g, Trail Mix Farmley Standee Pouch 200 g",DELHIVERY PRIVATE LIMITED-DEL,CPC-Chairman Master Canteen - 1-Ahmedabad-Gujarat-380015
FLYM25/12/1943,D-25-12-3249,Dec 25,16-12-2025,Gujarat,Ahmedabad,380015,13,shortage,13 pkts missing,,DELHIVERY PRIVATE LIMITED-DEL,CPC-Chairman Master Canteen - 1-Ahmedabad-Gujarat-380015
FLYM25/12/1113,D-25-12-1873,Dec 25,12-12-2025,Uttarakhand,UTTARKASHI,249193,2,shortage,2 box short,,DELHIVERY PRIVATE LIMITED-DEL,CPC-Chairman Master Canteen-UTTARKASHI-Uttarakhand-249193
FLYM25/12/1129,D-25-12-1912,Dec 25,12-12-2025,Uttarakhand,UTTARKASHI,249193,2,shortage,2 box short,,DELHIVERY PRIVATE LIMITED-DEL,CPC-Chairman Master Canteen-UTTARKASHI-Uttarakhand-249193
FLYM25/12/1101,D-25-12-1863,Dec 25,17-12-2025,Jammu and Kashmir,Kathua,184142,1,damage,500 gram almonds damage,Premium California Almonds Farmley Standee Pouch 500 g,DELHIVERY PRIVATE LIMITED-DEL,"CPC - Master Canteen GC, CRPF, Bantalab-Kathua-Jammu and Kashmir-184142"
FLYM25/12/1131,D-25-12-1909,Dec 25,17-12-2025,Jammu and Kashmir,Kathua,184142,1,damage,500 gram almonds damage,Premium California Almonds Farmley Standee Pouch 500 g,DELHIVERY PRIVATE LIMITED-DEL,"CPC - Master Canteen GC, CRPF, Bantalab-Kathua-Jammu and Kashmir-184142"
FLYM25/12/0542,D-25-12-0975,Dec 25,12-12-2025,West Bengal,Bardhaman,713214,1,damage,1 chia seeds pkt damage,Premium Chia Seeds Farmley Standee Pouch 200 g,DELHIVERY PRIVATE LIMITED-DEL,CPC - Master Canteen (CPC)-Bardhaman-West Bengal-713214
FLYM25/12/0548,D-25-12-1001,Dec 25,12-12-2025,West Bengal,Bardhaman,713214,1,damage,1 chia seeds pkt damage,Premium Chia Seeds Farmley Standee Pouch 200 g,DELHIVERY PRIVATE LIMITED-DEL,CPC - Master Canteen (CPC)-Bardhaman-West Bengal-713214
FLYM25/11/3357,D-25-11-5744,Nov 25,29-11-2025,Jharkhand,Ranchi,834004,1,damage,1 box damage,Premium Chia Seeds Farmley Standee Pouch 200 g,Safexpress Private Limited,CPC - Master Canteen Kendriya Police Kalyan Bhandar- Jharkhand -834004-Ranchi-Jharkhand-834004
FLYM25/11/2601,D-25-11-4456,Nov 25,25-11-2025,West Bengal,JHARGRAM,721507,8,shortage,8 pc short,"Premium W320 Cashew Farmley Standee Pouch 500 g , Premium Broken Walnut Kernels Farmley Standee Pouch 200 g",Safexpress Private Limited,CPC - Master Bhandar Kendriya Police Kalyan Bhandar-JHARGRAM -West Bengal-721507
FLYM25/11/0822,D-25-11-1381,Nov 25,13-11-2025,Uttar Pradesh,Lucknow,226006,1,shortage,1 pc short,Premium California Almonds Farmley Standee Pouch 500 g,DELHIVERY PRIVATE LIMITED-DEL,PAC - Kendriya Police Canteen 35 Bn Pac -UTTAR PRADESH -226006-Lucknow-Uttar Pradesh-226006
FLYM25/11/0814,D-25-11-1360,Nov 25,11-11-2025,Rajasthan,Ajmer,305001,4,shortage,4 pcs short,"Premium California Almonds Farmley Standee Pouch 500 g, Premium W320 Cashew Farmley Standee Pouch 500 g",Safexpress Private Limited,CPC - Master Bhander Gc-1 CRPF Ajmer-Ajmer-Rajasthan-305001
FLYM25/10/3961,D-25-10-6257,Nov 25,08-11-2025,Kerala,Kannur,670643,3,shortage,3 pcs short 1 pcs damage,"Premium California Almonds Farmley Standee Pouch 500 g, Premium Broken Walnut Kernels Farmley Standee Pouch 200 g",DELHIVERY PRIVATE LIMITED-DEL,CPC - Principal RTC CRPF Peringome-Kannur-Kerala-670643
FLYM25/10/3961,D-25-10-6258,Nov 25,08-11-2025,Kerala,Kannur,670643,1,damage,3 pcs short 1 pcs damage,"Premium California Almonds Farmley Standee Pouch 500 g, Premium Broken Walnut Kernels Farmley Standee Pouch 200 g",DELHIVERY PRIVATE LIMITED-DEL,CPC - Principal RTC CRPF Peringome-Kannur-Kerala-670643
FLYM25/10/2370,D-25-10-3728,Oct 25,31-10-2025,Assam,Karimganj,788710,1,shortage,1 pc short,Premium California Almonds Farmley Standee Pouch 500 g,Safexpress Private Limited,CPC-Master Bhandar SSB FTR HQRS Ghy-Karimganj-Assam-788710
FLYM25/10/2355,D-25-10-3717,Oct 25,31-10-2025,Assam,Karimganj,788710,1,shortage,1 pc short,Premium California Almonds Farmley Standee Pouch 500 g,Safexpress Private Limited,CPC-Master Bhandar SSB FTR HQRS Ghy-Karimganj-Assam-788710
FLYM25/10/2403,D-25-10-3777,Oct 25,25-10-2025,Bihar,Supaul,854340,2,shortage,2 pc short,Premium California Almonds Farmley Standee Pouch 500 g,Safexpress Private Limited,CPC - Central Police Canteen-Supaul-Bihar-854340
FLYM25/10/2414,D-25-10-3781,Oct 25,25-10-2025,Bihar,Supaul,854340,2,shortage,2 pc short,Roasted & Salted Almonds Farmley Standee Pouch 200 g,Safexpress Private Limited,CPC - Central Police Canteen-Supaul-Bihar-854340
FLYM25/10/2330,D-25-10-3593,Oct 25,28-10-2025,Gujarat,Ahmedabad,380015,2,shortage,2 pkt missing 63 short,"Premium California Almonds Farmley Standee Pouch 500 g, Premium W320 Cashew Farmley Standee Pouch 500 g",DELHIVERY PRIVATE LIMITED-DEL,CPC-Chairman Master Canteen - 1-Ahmedabad-Gujarat-380015
FLYM25/10/1867,D-25-10-2964,Sep 25,03-09-2025,Uttar Pradesh,Lucknow,226011,5,shortage,5 poc short,"Premium California Almonds Farmley Standee Pouch 500 g, Premium Panchmeva Farmley Jar 405 g",DELHIVERY PRIVATE LIMITED-DEL,CPC - MASTER CANTEEN DIGP GC CRPF-Lucknow-Uttar Pradesh-226011
FLYM25/09/0642,D-25-09-0871,Sep 25,19-09-2025,Assam,Digboi,786171,10,shortage,10 box missing,Mexican Peri Peri Snack Mix Farmley Jar 405g,DELHIVERY PRIVATE LIMITED-DEL,CPC-Master Bhandar SSB FTR HQRS Ghy-Digboi-Assam-786171
FLYM25/09/0376,D-25-09-0524,Sep 25,09-09-2025,Tamil Nadu,Coimbatore,641017,1,damage,1 pcs damage,Roasted Thai Chilli Cashew - Farmley Standee Pouch 200 g,DELHIVERY PRIVATE LIMITED-DEL,CPC - Chairman Central Police Canteen Central Reserve Police Force-Coimbatore-Tamil Nadu-641017
FLYM25/09/0999,D-25-09-1557,Sep 25,13-09-2025,Odisha,Bhubaneswar,751022,1,damage,1 box damage,Premium California Almonds Farmley Standee Pouch 500 g,DELHIVERY PRIVATE LIMITED-DEL,"CPC - Kendriya Police Kalyan Bhandar, GC CRPF, BBSR-Bhubaneswar,-Odisha-751022"
FLYM25/09/0466,D-25-09-0616,Sep 25,09-09-2025,Haryana,Jhajjar,124103,2,shortage,2 pcs short,Premium California Almonds Farmley Standee Pouch 500 g,DELHIVERY PRIVATE LIMITED-DEL,CPC-Central Police Canteen- Jhajjar-Haryana-124103
FLYM25/09/0443,D-25-09-0590,Sep 25,09-09-2025,Haryana,Jhajjar,124103,2,shortage,2 pcs short,Premium California Almonds Farmley Standee Pouch 500 g,DELHIVERY PRIVATE LIMITED-DEL,CPC-Central Police Canteen- Jhajjar-Haryana-124103
FLYM25/09/0442,D-25-09-0591,Sep 25,09-09-2025,Tamil Nadu,Chennai,600065,2,shortage,2 pcs short,"Premium Anjeer Farmley Standee Pouch 200 g, Premium Extra Light Halves Walnut Kernels Farmley Standee Pouch 200 g",DELHIVERY PRIVATE LIMITED-DEL,CPC - DIGP CPC MASTER CANTEEN GC CRPF AVADI CHENNAI-Chennai-Tamil Nadu-600065
FLYM25/09/4875,D-25-09-7787,Sep 25,26-09-2025,Manipur,Imphal West,795113,8,shortage,8 pcs short,Premium California Almonds Farmley Standee Pouch 500 g,DELHIVERY PRIVATE LIMITED-DEL,CPC - Master Canteen Central Police Canteen-Imphal West-Manipur-795113
FLYM25/09/3406,D-25-09-5373,Sep 25,29-09-2025,Rajasthan,Sirohi,307001,1,shortage,1 pcs short,Premium California Almonds Farmley Standee Pouch 500 g,DELHIVERY PRIVATE LIMITED-DEL,CPC -Master Bhandar-Sirohi-Rajasthan-307001
FLYM25/09/3390,D-25-09-5347,Sep 25,30-09-2025,Uttarakhand,Mirthi Didihat,262550,2,shortage,2 pcs short,Premium California Almonds Farmley Standee Pouch 500 g,DELHIVERY PRIVATE LIMITED-DEL,CPC -Chairman Master Bhandar -Pithoragarh-Uttarakhand-262501-Mirthi Didihat-Uttarakhand-262550
FLYM25/09/1565,D-25-09-2551,Sep 25,15-09-2025,Telangana,Hyderabad,500091,1,shortage,1 jar short,Mexican Peri Peri Snack Mix Farmley Jar 405g,DELHIVERY PRIVATE LIMITED-DEL,"Master Bhandar (Kpkb) Gc CRPF Rangareddy-Hyderabad,-Telangana-500091"
FLYM25/09/1583,D-25-09-2540,Sep 25,17-09-2025,Telangana,Rangareddy,500005,1,shortage,shortage  items  1. berry mix -  02 2. california  -02,"Berry Mix Farmley Standee Pouch 200 g, Premium California Almonds Farmley Standee Pouch 500 g",DELHIVERY PRIVATE LIMITED-DEL,"Master Bhandar (Kpkb) Gc CRPF Rangareddy-Rangareddy,-Telangana-500005"
FLYM25/09/1582,D-25-09-2542,Sep 25,22-09-2025,West Bengal,JHARGRAM,721507,2,shortage,2 pc short,"Premium California Almonds Farmley Standee Pouch 500 g, Premium Omani Fard Dates Farmley standee pouch 400 g",DELHIVERY PRIVATE LIMITED-DEL,CPC - Master Bhandar Kendriya Police Kalyan Bhandar-JHARGRAM -West Bengal-721507
FLYM25/09/1553,D-25-09-2531,Sep 25,15-09-2025,West Bengal,Bardhaman,713203,10,shortage,10 pc short,Premium Broken Walnut Kernels Farmley Standee Pouch 200 g,DELHIVERY PRIVATE LIMITED-DEL,CPC - Master Bhandar Kendriya Police Kalyan Bhandar-Bardhaman-West Bengal-713203
FLYM25/08/1248,D-25-08-2370,Aug 25,16-08-2025,Odisha,Khordha,752050,1,shortage,1 pcs short,Premium California Almonds Farmley Standee Pouch 500 g,Safexpress Private Limited,"CPC - Kendriya Police Kalyan Bhandar, GC CRPF, BBSR-Khordha-Odisha-752050"
FLYM25/08/1261,D-25-08-2559,Aug 25,16-08-2025,Odisha,Khordha,752050,1,shortage,1 pcs short,Premium California Almonds Farmley Standee Pouch 500 g,Safexpress Private Limited,"CPC - Kendriya Police Kalyan Bhandar, GC CRPF, BBSR-Khordha-Odisha-752050"
FLYM25/08/0872,D-25-08-1800,Aug 25,14-08-2025,Jharkhand,Hazaribag,825317,16,shortage,16 pcs short,"Roasted & Salted Almonds Farmley Standee Pouch 200 g, Premium California Almonds Farmley Standee Pouch 500 g, Premium Omani Fard Dates Farmley standee pouch 400 g",Safexpress Private Limited,CPC - Canteen Store -Hazaribagh- 825317-Hazaribag-Jharkhand-825317
FLYM25/08/0907,D-25-08-1887,Aug 25,13-08-2025,Telangana,Hyderabad,500064,13,shortage,13 pcs short,"Premium W320 Cashew Farmley Standee Pouch 500 g, Premium California Almonds Farmley Standee Pouch 500 g, Premium Broken Walnut Kernels Farmley Standee Pouch 200 g, Berry Mix Farmley Standee Pouch 200 g, Roasted and Salted Cashew - Farmley Standee Pouch 200 g",Safexpress Private Limited,Master Bhandar (Kpkb) Gc CRPF Rangareddy-Hyderabad-Telangana-500064
FLYM25/08/3918,D-25-08-7123,Sep 25,11-09-2025,Uttarakhand,Dehradun,248146,1,shortage,1 pcs short,Premium California Almonds Farmley Standee Pouch 500 g,DELHIVERY PRIVATE LIMITED-DEL,CPC-Chairman Master Canteen-Dehradun-Uttarakhand-248146
FLYM25/08/3888,D-25-08-7080,Sep 25,03-09-2025,Uttar Pradesh,Lucknow,226021,1,shortage,1 pc short,Premium California Almonds Farmley Standee Pouch 500 g,DELHIVERY PRIVATE LIMITED-DEL,CPC - MASTER CANTEEN DIGP GC CRPF-Lucknow-Uttar Pradesh-226021
FLYM25/08/3916,D-25-08-7110,Sep 25,03-09-2025,Uttar Pradesh,Lucknow,226021,1,shortage,1 pc short,Premium California Almonds Farmley Standee Pouch 500 g,DELHIVERY PRIVATE LIMITED-DEL,CPC - MASTER CANTEEN DIGP GC CRPF-Lucknow-Uttar Pradesh-226021
FLYM25/08/3889,D-25-08-7079,Sep 25,03-09-2025,Uttar Pradesh,Lucknow,226011,5,shortage,5 pc short,"Premium California Almonds Farmley Standee Pouch 500 g, Premium Panchmeva Farmley Jar 405 g",DELHIVERY PRIVATE LIMITED-DEL,CPC - MASTER CANTEEN DIGP GC CRPF-Lucknow-Uttar Pradesh-226011
FLYM25/08/3907,D-25-08-7105,Sep 25,03-09-2025,Uttar Pradesh,Lucknow,226011,5,shortage,5  pc short,"Premium California Almonds Farmley Standee Pouch 500 g, Premium Panchmeva Farmley Jar 405 g",DELHIVERY PRIVATE LIMITED-DEL,CPC - MASTER CANTEEN DIGP GC CRPF-Lucknow-Uttar Pradesh-226011
FLYM25/08/3249,D-25-08-6149,Aug 25,30-08-2025,Uttar Pradesh,Shrawasti,271831,1,shortage,1 kg cashew short,Premium W320 Cashew Farmley Standee Pouch 1 Kg,DELHIVERY PRIVATE LIMITED-DEL,CPC - Canteen Officer Master Canteen Frontier HQR SSB Lucknow-District- Shrawasti-Uttar Pradesh-271831
FLYM25/08/3293,D-25-08-6129,Aug 25,30-08-2025,Bihar,Begusarai,851126,5,shortage,5 iteam short,"Premium California Almonds Farmley Standee Pouch 500 g, Premium Panchmeva Farmley Jar 405 g",DELHIVERY PRIVATE LIMITED-DEL,CPC - Master Canteen Group Centre CRPF Mokama Ghat-Begusarai -Bihar-851126
FLYM25/08/3254,D-25-08-6157,Aug 25,30-08-2025,Bihar,Begusarai,851126,5,shortage,5 items short,"Premium California Almonds Farmley Standee Pouch 500 g, Premium Panchmeva Farmley Jar 405 g",DELHIVERY PRIVATE LIMITED-DEL,CPC - Master Canteen Group Centre CRPF Mokama Ghat-Begusarai -Bihar-851126
FLYM25/08/3071,D-25-08-5943,Sep 25,03-09-2025,Odisha,Nayagarh,752069,4,shortage,4 pc short,"Premium Panchmeva Farmley Jar 405 g, Premium California Roasted & Salted Pistachios Farmley Standee Pouch 200 g",DELHIVERY PRIVATE LIMITED-DEL,"CPC - Kendriya Police Kalyan Bhandar, GC CRPF, BBSR- Nayagarh -Odisha-752069"
FLYM25/08/3082,D-25-08-5964,Sep 25,03-09-2025,Odisha,Nayagarh,752069,4,shortage,4pc short,"Premium Panchmeva Farmley Jar 405 g, Premium California Roasted & Salted Pistachios Farmley Standee Pouch 200 g",DELHIVERY PRIVATE LIMITED-DEL,"CPC - Kendriya Police Kalyan Bhandar, GC CRPF, BBSR- Nayagarh -Odisha-752069"`;

export function parseCSV(csv: string): DeliveryRecord[] {
  const lines = csv.split('\n');
  const result: DeliveryRecord[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const matches = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    
    if (matches && matches.length >= 13) {
      const clean = (s: string | undefined) => {
        if (s === undefined) return '';
        return s.replace(/^"(.*)"$/, '$1').trim();
      };
      
      const statusRaw = clean(matches[8]).toLowerCase();
      const status: 'shortage' | 'damage' = 
        statusRaw.includes('damage') ? 'damage' : 'shortage';

      result.push({
        saleInvoice: clean(matches[0]),
        deliveryNote: clean(matches[1]),
        month: clean(matches[2]),
        deliveredDate: clean(matches[3]),
        state: clean(matches[4]),
        city: clean(matches[5]),
        pincode: clean(matches[6]),
        qty: parseInt(clean(matches[7])) || 0,
        status,
        remark: clean(matches[9]),
        item: clean(matches[10]),
        transporter: clean(matches[11]) || 'Unknown',
        customer: clean(matches[12]) || 'Unknown Customer',
      });
    }
  }
  return result;
}

export function parseSummaryCSV(csv: string) {
  const lines = csv.split('\n');
  const monthMap: Record<string, { 
    month: string, 
    success: number, successPct: string,
    shortage: number, shortagePct: string,
    damage: number, damagePct: string,
    total: number 
  }> = {};
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const [month, status, count, percent] = line.split(',');
    
    if (!monthMap[month]) {
      monthMap[month] = { month, success: 0, successPct: '0', shortage: 0, shortagePct: '0', damage: 0, damagePct: '0', total: 0 };
    }
    
    const countNum = parseInt(count) || 0;
    const pctStr = percent || '0';
    if (status.includes('No shortage')) {
        monthMap[month].success = countNum;
        monthMap[month].successPct = pctStr;
    } else if (status.includes('shortage')) {
        monthMap[month].shortage = countNum;
        monthMap[month].shortagePct = pctStr;
    } else if (status.includes('damage')) {
        monthMap[month].damage = countNum;
        monthMap[month].damagePct = pctStr;
    }
    monthMap[month].total += countNum;
  }
  
  const monthsOrder = ['Aug 25', 'Sep 25', 'Oct 25', 'Nov 25', 'Dec 25'];
  return monthsOrder.map(m => monthMap[m] || { month: m, success: 0, successPct: '0', shortage: 0, shortagePct: '0', damage: 0, damagePct: '0', total: 0 });
}

export function getStats(data: DeliveryRecord[], summaryData: any[]) {
  const stateCounts: Record<string, number> = {};
  const transporterCounts: Record<string, number> = {};
  const customerSet = new Set<string>();
  let totalQty = 0;
  let shortages = 0;
  let damages = 0;
  let shortageQty = 0;
  let damageQty = 0;

  data.forEach(r => {
    stateCounts[r.state] = (stateCounts[r.state] || 0) + 1;
    transporterCounts[r.transporter] = (transporterCounts[r.transporter] || 0) + 1;
    if (r.customer) customerSet.add(r.customer);
    totalQty += r.qty;
    if (r.status === 'shortage') {
      shortages++;
      shortageQty += r.qty;
    } else if (r.status === 'damage') {
      damages++;
      damageQty += r.qty;
    }
  });

  const totalSalesInvoices = summaryData.reduce((acc, curr) => acc + curr.total, 0);
  const successRate = totalSalesInvoices > 0 
    ? (summaryData.reduce((acc, curr) => acc + curr.success, 0) / totalSalesInvoices * 100).toFixed(2)
    : "0.00";

  const topState = Object.entries(stateCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
  const topTransporter = Object.entries(transporterCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  return {
    totalIssues: data.length,
    totalQtyAffected: totalQty,
    shortageCount: shortages,
    damageCount: damages,
    shortageQty,
    damageQty,
    topState,
    topTransporter,
    totalCustomers: customerSet.size,
    totalSalesInvoices,
    successRate
  };
}

export function getGeoTrend(data: DeliveryRecord[], level: 'state' | 'city' | 'pincode') {
  const geoMap: Record<string, { label: string, shortageCount: number, damageCount: number, shortageQty: number, damageQty: number, totalCount: number, totalQty: number }> = {};
  
  data.forEach(r => {
    const key = r[level] || 'Unknown';
    if (!geoMap[key]) {
      geoMap[key] = { label: key, shortageCount: 0, damageCount: 0, shortageQty: 0, damageQty: 0, totalCount: 0, totalQty: 0 };
    }
    geoMap[key].totalCount++;
    geoMap[key].totalQty += r.qty;
    if (r.status === 'shortage') {
        geoMap[key].shortageCount++;
        geoMap[key].shortageQty += r.qty;
    } else if (r.status === 'damage') {
        geoMap[key].damageCount++;
        geoMap[key].damageQty += r.qty;
    }
  });

  return Object.values(geoMap).sort((a, b) => b.totalCount - a.totalCount).slice(0, 15);
}

export function getItemClassification(data: DeliveryRecord[]) {
  const itemMap: Record<string, { name: string, count: number, qty: number }> = {};
  
  data.forEach(r => {
    const firstItem = r.item.split(',')[0].trim() || 'Unspecified Item';
    if (!itemMap[firstItem]) {
      itemMap[firstItem] = { name: firstItem, count: 0, qty: 0 };
    }
    itemMap[firstItem].count++;
    itemMap[firstItem].qty += r.qty;
  });

  return Object.values(itemMap).sort((a, b) => b.count - a.count).slice(0, 10);
}

export function getCustomerAnalysis(data: DeliveryRecord[]) {
  const customerMap: Record<string, { name: string, count: number, qty: number, shortageQty: number, damageQty: number }> = {};
  
  data.forEach(r => {
    const name = r.customer || 'Unknown Customer';
    if (!customerMap[name]) {
      customerMap[name] = { name, count: 0, qty: 0, shortageQty: 0, damageQty: 0 };
    }
    customerMap[name].count++;
    customerMap[name].qty += r.qty;
    if (r.status === 'shortage') customerMap[name].shortageQty += r.qty;
    else customerMap[name].damageQty += r.qty;
  });

  return Object.values(customerMap).sort((a, b) => b.qty - a.qty).slice(0, 10);
}

export function getMonthlyTrend(data: DeliveryRecord[]) {
  const monthsOrder = ['Aug 25', 'Sep 25', 'Oct 25', 'Nov 25', 'Dec 25'];
  const trend: Record<string, { month: string, shortage: number, damage: number, total: number }> = {};
  monthsOrder.forEach(m => trend[m] = { month: m, shortage: 0, damage: 0, total: 0 });
  
  data.forEach(r => {
    if (trend[r.month]) {
      trend[r.month].total++;
      if (r.status === 'shortage') trend[r.month].shortage++;
      else if (r.status === 'damage') trend[r.month].damage++;
    }
  });
  return monthsOrder.map(m => trend[m]);
}

export function getTransporterAnalysis(data: DeliveryRecord[]) {
  const analysis: Record<string, { name: string, shortages: number, damages: number, total: number }> = {};
  data.forEach(r => {
    if (!analysis[r.transporter]) {
      analysis[r.transporter] = { name: r.transporter, shortages: 0, damages: 0, total: 0 };
    }
    analysis[r.transporter].total++;
    if (r.status === 'shortage') analysis[r.transporter].shortages++;
    if (r.status === 'damage') analysis[r.transporter].damages++;
  });
  return Object.values(analysis).sort((a, b) => b.total - a.total);
}
