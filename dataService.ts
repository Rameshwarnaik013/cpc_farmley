
import { DeliveryRecord, SummaryStats } from './types';

export const MASTER_LEDGER_CSV = `Sale Invoice,Customer,Invoice Month,Invoice Year,Status,QTY,Transporter,Shipping Address Details,State,Pincode
FLYM25/12/3405,CPC - KPKB Master Canteen Dhanbad,Dec,2025,shortage,2,Safexpress Private Limited,CPC - KPKB Master Canteen Dhanbad-Dhanbad-Jharkhand-826005,Jharkhand,826005
FLYM25/12/3081,Master Bhandar (Kpkb) Gc CRPF Rangareddy,Dec,2025,shortage,4,Safexpress Private Limited,Master Bhandar (Kpkb) Gc CRPF Rangareddy-Hyderabad-Telangana-500064,Telangana,500064
FLYM25/12/3089,Master Bhandar (Kpkb) Gc CRPF Rangareddy,Dec,2025,shortage,4,Safexpress Private Limited,Master Bhandar (Kpkb) Gc CRPF Rangareddy-Hyderabad-Telangana-500064,Telangana,500064
FLYM25/12/2163,CPC - Master Bhandar Kendriya Police Kalyan Bhandar,Dec,2025,shortage,20,DELHIVERY PRIVATE LIMITED-DEL,CPC - Master Bhandar Kendriya Police Kalyan Bhandar-Asansol-West Bengal-713302,West Bengal,713302
FLYM25/12/1857,CPC-Chairman Master Canteen - 1,Dec,2025,shortage,13,DELHIVERY PRIVATE LIMITED-DEL,CPC-Chairman Master Canteen - 1-Ahmedabad-Gujarat-380015,Gujarat,380015
FLYM25/12/1943,CPC-Chairman Master Canteen - 1,Dec,2025,shortage,13,DELHIVERY PRIVATE LIMITED-DEL,CPC-Chairman Master Canteen - 1-Ahmedabad-Gujarat-380015,Gujarat,380015
FLYM25/12/1101,"CPC - Master Canteen GC, CRPF, Bantalab",Dec,2025,damage,1,DELHIVERY PRIVATE LIMITED-DEL,"CPC - Master Canteen GC, CRPF, Bantalab-Kathua-Jammu and Kashmir-184142",Jammu and Kashmir,184142
FLYM25/12/1113,CPC-Chairman Master Canteen,Dec,2025,shortage,2,DELHIVERY PRIVATE LIMITED-DEL,CPC-Chairman Master Canteen-UTTARKASHI-Uttarakhand-249193,Uttarakhand,249193
FLYM25/12/1129,CPC-Chairman Master Canteen,Dec,2025,shortage,2,DELHIVERY PRIVATE LIMITED-DEL,CPC-Chairman Master Canteen-UTTARKASHI-Uttarakhand-249193,Uttarakhand,249193
FLYM25/12/1131,"CPC - Master Canteen GC, CRPF, Bantalab",Dec,2025,damage,1,DELHIVERY PRIVATE LIMITED-DEL,"CPC - Master Canteen GC, CRPF, Bantalab-Kathua-Jammu and Kashmir-184142",Jammu and Kashmir,184142
FLYM25/12/0542,CPC - Master Canteen (CPC),Dec,2025,damage,1,DELHIVERY PRIVATE LIMITED-DEL,CPC - Master Canteen (CPC)-Bardhaman-West Bengal-713214,West Bengal,713214
FLYM25/12/0548,CPC - Master Canteen (CPC),Dec,2025,damage,1,DELHIVERY PRIVATE LIMITED-DEL,CPC - Master Canteen (CPC)-Bardhaman-West Bengal-713214,West Bengal,713214
FLYM25/11/3357,CPC - Master Canteen Kendriya Police Kalyan Bhandar- Jharkhand -834004,Nov,2025,damage,1,,CPC - Master Canteen Kendriya Police Kalyan Bhandar- Jharkhand -834004-Ranchi-Jharkhand-834004,Jharkhand,834004
FLYM25/11/2601,CPC - Master Bhandar Kendriya Police Kalyan Bhandar,Nov,2025,shortage,8,DELHIVERY PRIVATE LIMITED-DEL,CPC - Master Bhandar Kendriya Police Kalyan Bhandar-JHARGRAM -West Bengal-721507,West Bengal,721507
FLYM25/11/0814,CPC - Master Bhander Gc-1 CRPF Ajmer,Nov,2025,shortage,4,Safexpress Private Limited,CPC - Master Bhander Gc-1 CRPF Ajmer-Ajmer-Rajasthan-305001,Rajasthan,305001
FLYM25/10/3961,CPC - Principal RTC CRPF Peringome,Oct,2025,shortage,3,DELHIVERY PRIVATE LIMITED-DEL,CPC - Principal RTC CRPF Peringome-Kannur-Kerala-670643,Kerala,670643
FLYM25/10/2330,CPC-Chairman Master Canteen - 1,Oct,2025,shortage,2,DELHIVERY PRIVATE LIMITED-DEL,CPC-Chairman Master Canteen - 1-Ahmedabad-Gujarat-380015,Gujarat,380015
FLYM25/10/2355,CPC-Master Bhandar SSB FTR HQRS Ghy,Oct,2025,shortage,1,Safexpress Private Limited,CPC-Master Bhandar SSB FTR HQRS Ghy-Karimganj-Assam-788710,Assam,788710
FLYM25/10/2370,CPC-Master Bhandar SSB FTR HQRS Ghy,Oct,2025,shortage,1,Safexpress Private Limited,CPC-Master Bhandar SSB FTR HQRS Ghy-Karimganj-Assam-788710,Assam,788710
FLYM25/10/2403,CPC - Central Police Canteen,Oct,2025,shortage,2,Safexpress Private Limited,CPC - Central Police Canteen-Supaul-Bihar-854340,Bihar,854340
FLYM25/10/2414,CPC - Central Police Canteen,Oct,2025,shortage,2,Safexpress Private Limited,CPC - Central Police Canteen-Supaul-Bihar-854340,Bihar,854340
FLYM25/10/1867,CPC - MASTER CANTEEN DIGP GC CRPF,Oct,2025,shortage,5,DELHIVERY PRIVATE LIMITED-DEL,CPC - MASTER CANTEEN DIGP GC CRPF-Lucknow-Uttar Pradesh-226011,Uttar Pradesh,226011
FLYM25/09/4875,CPC - Master Canteen Central Police Canteen,Sep,2025,shortage,8,DELHIVERY PRIVATE LIMITED-DEL,CPC - Master Canteen Central Police Canteen-Imphal West-Manipur-795113,Manipur,795113
FLYM25/09/3390,CPC -Chairman Master Bhandar -Pithoragarh-Uttarakhand-262501,Sep,2025,shortage,2,DELHIVERY PRIVATE LIMITED-DEL,CPC -Chairman Master Bhandar -Pithoragarh-Uttarakhand-262501-Mirthi Didihat-Uttarakhand-262550,Uttarakhand,262550
FLYM25/09/3406,CPC -Master Bhandar,Sep,2025,shortage,1,DELHIVERY PRIVATE LIMITED-DEL,CPC -Master Bhandar-Sirohi-Rajasthan-307001,Rajasthan,307001
FLYM25/09/1553,CPC - Master Bhandar Kendriya Police Kalyan Bhandar,Sep,2025,shortage,10,DELHIVERY PRIVATE LIMITED-DEL,CPC - Master Bhandar Kendriya Police Kalyan Bhandar-Bardhaman-West Bengal-713203,West Bengal,713203
FLYM25/09/1565,Master Bhandar (Kpkb) Gc CRPF Rangareddy,Sep,2025,shortage,1,DELHIVERY PRIVATE LIMITED-DEL,"Master Bhandar (Kpkb) Gc CRPF Rangareddy-Hyderabad,-Telangana-500091",Telangana,500091
FLYM25/09/1582,CPC - Master Bhandar Kendriya Police Kalyan Bhandar,Sep,2025,shortage,2,DELHIVERY PRIVATE LIMITED-DEL,CPC - Master Bhandar Kendriya Police Kalyan Bhandar-JHARGRAM -West Bengal-721507,West Bengal,721507
FLYM25/09/1583,Master Bhandar (Kpkb) Gc CRPF Rangareddy,Sep,2025,shortage,2,DELHIVERY PRIVATE LIMITED-DEL,"Master Bhandar (Kpkb) Gc CRPF Rangareddy-Rangareddy,-Telangana-500005",Telangana,500005
FLYM25/09/0999,"CPC - Kendriya Police Kalyan Bhandar, GC CRPF, BBSR",Sep,2025,damage,1,DELHIVERY PRIVATE LIMITED-DEL,"CPC - Kendriya Police Kalyan Bhandar, GC CRPF, BBSR-Bhubaneswar,-Odisha-751022",Odisha,751022
FLYM25/09/0642,CPC-Master Bhandar SSB FTR HQRS Ghy,Sep,2025,shortage,10,DELHIVERY PRIVATE LIMITED-DEL,CPC-Master Bhandar SSB FTR HQRS Ghy-Digboi-Assam-786171,Assam,786171
FLYM25/09/0376,CPC - Chairman Central Police Canteen Central Reserve Police Force,Sep,2025,damage,1,DELHIVERY PRIVATE LIMITED-DEL,CPC - Chairman Central Police Canteen Central Reserve Police Force-Coimbatore-Tamil Nadu-641017,Tamil Nadu,641017
FLYM25/09/0442,CPC - DIGP CPC MASTER CANTEEN GC CRPF AVADI CHENNAI,Sep,2025,shortage,2,DELHIVERY PRIVATE LIMITED-DEL,CPC - DIGP CPC MASTER CANTEEN GC CRPF AVADI CHENNAI-Chennai-Tamil Nadu-600065,Tamil Nadu,600065
FLYM25/09/0443,CPC-Central Police Canteen,Sep,2025,shortage,2,DELHIVERY PRIVATE LIMITED-DEL,CPC-Central Police Canteen- Jhajjar-Haryana-124103,Haryana,124103
FLYM25/09/0466,CPC-Central Police Canteen,Sep,2025,shortage,2,DELHIVERY PRIVATE LIMITED-DEL,CPC-Central Police Canteen- Jhajjar-Haryana-124103,Haryana,124103
FLYM25/08/3888,CPC - MASTER CANTEEN DIGP GC CRPF,Aug,2025,shortage,1,DELHIVERY PRIVATE LIMITED-DEL,CPC - MASTER CANTEEN DIGP GC CRPF-Lucknow-Uttar Pradesh-226021,Uttar Pradesh,226021
FLYM25/08/3889,CPC - MASTER CANTEEN DIGP GC CRPF,Aug,2025,shortage,5,DELHIVERY PRIVATE LIMITED-DEL,CPC - MASTER CANTEEN DIGP GC CRPF-Lucknow-Uttar Pradesh-226011,Uttar Pradesh,226011
FLYM25/08/3907,CPC - MASTER CANTEEN DIGP GC CRPF,Aug,2025,shortage,5,DELHIVERY PRIVATE LIMITED-DEL,CPC - MASTER CANTEEN DIGP GC CRPF-Lucknow-Uttar Pradesh-226011,Uttar Pradesh,226011
FLYM25/08/3916,CPC - MASTER CANTEEN DIGP GC CRPF,Aug,2025,shortage,1,DELHIVERY PRIVATE LIMITED-DEL,CPC - MASTER CANTEEN DIGP GC CRPF-Lucknow-Uttar Pradesh-226021,Uttar Pradesh,226021
FLYM25/08/3918,CPC-Chairman Master Canteen,Aug,2025,shortage,1,DELHIVERY PRIVATE LIMITED-DEL,CPC-Chairman Master Canteen-Dehradun-Uttarakhand-248146,Uttarakhand,248146
FLYM25/08/3249,CPC - Canteen Officer Master Canteen Frontier HQR SSB Lucknow,Aug,2025,shortage,1,DELHIVERY PRIVATE LIMITED-DEL,CPC - Canteen Officer Master Canteen Frontier HQR SSB Lucknow-District- Shrawasti-Uttar Pradesh-271831,Uttar Pradesh,271831
FLYM25/08/3254,CPC - Master Canteen Group Centre CRPF Mokama Ghat,Aug,2025,shortage,5,DELHIVERY PRIVATE LIMITED-DEL,CPC - Master Canteen Group Centre CRPF Mokama Ghat-Begusarai -Bihar-851126,Bihar,851126
FLYM25/08/3293,CPC - Master Canteen Group Centre CRPF Mokama Ghat,Aug,2025,shortage,5,DELHIVERY PRIVATE LIMITED-DEL,CPC - Master Canteen Group Centre CRPF Mokama Ghat-Begusarai -Bihar-851126,Bihar,851126
FLYM25/08/3071,"CPC - Kendriya Police Kalyan Bhandar, GC CRPF, BBSR",Aug,2025,shortage,4,DELHIVERY PRIVATE LIMITED-DEL,"CPC - Kendriya Police Kalyan Bhandar, GC CRPF, BBSR- Nayagarh -Odisha-752069",Odisha,752069
FLYM25/08/3082,"CPC - Kendriya Police Kalyan Bhandar, GC CRPF, BBSR",Aug,2025,shortage,4,DELHIVERY PRIVATE LIMITED-DEL,"CPC - Kendriya Police Kalyan Bhandar, GC CRPF, BBSR- Nayagarh -Odisha-752069",Odisha,752069
FLYM25/08/1248,"CPC - Kendriya Police Kalyan Bhandar, GC CRPF, BBSR",Aug,2025,shortage,1,Safexpress Private Limited,"CPC - Kendriya Police Kalyan Bhandar, GC CRPF, BBSR-Khordha-Odisha-752050",Odisha,752050
FLYM25/08/1261,"CPC - Kendriya Police Kalyan Bhandar, GC CRPF, BBSR",Aug,2025,shortage,1,Safexpress Private Limited,"CPC - Kendriya Police Kalyan Bhandar, GC CRPF, BBSR-Khordha-Odisha-752050",Odisha,752050
FLYM25/08/0872,CPC - Canteen Store -Hazaribagh- 825317,Aug,2025,shortage,16,Safexpress Private Limited,CPC - Canteen Store -Hazaribagh- 825317-Hazaribag-Jharkhand-825317,Jharkhand,825317
FLYM25/08/0907,Master Bhandar (Kpkb) Gc CRPF Rangareddy,Aug,2025,shortage,13,Safexpress Private Limited,Master Bhandar (Kpkb) Gc CRPF Rangareddy-Hyderabad-Telangana-500064,Telangana,500064`;

export const MONTHLY_SUMMARY_CSV = `Invoice Month,Invoice Year,status,Sales Invoice Count,% of Total Sales Invoices
Aug,2025,No shortage and damage,228,94.21
Aug,2025,shortage,14,5.79
Dec,2025,No shortage and damage,305,95.91
Dec,2025,damage,4,1.26
Dec,2025,shortage,9,2.83
Nov,2025,No shortage and damage,242,98.78
Nov,2025,damage,1,0.41
Nov,2025,shortage,2,0.82
Oct,2025,No shortage and damage,259,97.37
Oct,2025,shortage,7,2.63
Sep,2025,No shortage and damage,156,92.31
Sep,2025,damage,2,1.18
Sep,2025,shortage,11,6.51`;

export const ITEM_WISE_SHORTAGE_CSV = `Sale Invoice,Item,Qty
FLYM25/10/1867,Premium California Almonds Standee Pouch 500g,3
FLYM25/10/1867,Premium Panchmeva Farmley Jar 405g,2
FLYM25/09/0642,Mexican Peri Peri Snack Mix Jar 405g,10
FLYM25/09/0376,Roasted Thai Chilli Cashew Pouch 200g,1
FLYM25/09/0999,Premium California Almonds Standee Pouch 500g,1
FLYM25/09/4875,Premium California Almonds Standee Pouch 500g,8
FLYM25/09/1553,Premium Broken Walnut Kernels Pouch 200g,48
FLYM25/08/0872,Premium California Almonds Standee Pouch 500g,6
FLYM25/08/0907,Premium W320 Cashew Standee Pouch 500g,3
FLYM25/08/3889,Premium California Almonds Standee Pouch 500g,3
FLYM25/11/2601,Premium Broken Walnut Kernels Pouch 200g,7
FLYM25/12/3081,Premium California Almonds Standee Pouch 500g,3
FLYM25/12/1857,Premium California Almonds Standee Pouch 500g,7
FLYM25/12/0542,Makhana Roasted Himalayan Pink Salt 250g,1
FLYM25/12/0548,Makhana Roasted Himalayan Pink Salt 250g,1`;

function parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') inQuotes = !inQuotes;
        else if (char === ',' && !inQuotes) {
            result.push(cur.trim());
            cur = '';
        } else cur += char;
    }
    result.push(cur.trim());
    return result;
}

export function getFullDataset(): DeliveryRecord[] {
    const allRecords: DeliveryRecord[] = [];
    const ledgerLines = MASTER_LEDGER_CSV.split('\n').slice(1);
    
    const skuMap = new Map<string, {item: string, qty: number}[]>();
    ITEM_WISE_SHORTAGE_CSV.split('\n').slice(1).forEach(line => {
        const cols = parseCSVLine(line);
        if (cols.length >= 3) {
            const inv = cols[0];
            const item = cols[1];
            const qty = parseInt(cols[2]) || 0;
            if (!skuMap.has(inv)) skuMap.set(inv, []);
            skuMap.get(inv)!.push({ item, qty });
        }
    });

    ledgerLines.forEach(line => {
        const cols = parseCSVLine(line);
        if (cols.length < 10) return;

        const saleInvoice = cols[0];
        const customer = cols[1];
        const month = cols[2];
        const status = (cols[4] || '').toLowerCase() as 'shortage' | 'damage';
        const qty = parseInt(cols[5]) || 0;
        const transporter = cols[6];
        const addressDetails = cols[7] || '';
        const state = cols[8] || 'Unspecified';
        const pincode = cols[9] || '—';

        const cityParts = addressDetails.split('-');
        let city = 'Unspecified';
        if (cityParts.length > 3) {
            city = cityParts[cityParts.length - 3].trim();
        } else if (addressDetails.includes('Hyderabad')) city = 'Hyderabad';
        else if (addressDetails.includes('Ahmedabad')) city = 'Ahmedabad';
        else if (addressDetails.includes('Lucknow')) city = 'Lucknow';
        else if (addressDetails.includes('Bhubaneswar')) city = 'Bhubaneswar';

        const skus = skuMap.get(saleInvoice);
        if (skus && skus.length > 0) {
            skus.forEach(sku => {
                allRecords.push({
                    saleInvoice,
                    deliveryNote: 'DN-' + saleInvoice.split('/').pop(),
                    month,
                    deliveredDate: 'SYNCED',
                    state,
                    city,
                    pincode,
                    status: status as any,
                    qty: sku.qty,
                    item: sku.item,
                    remark: 'Audit Incident Logged',
                    transporter,
                    customer
                });
            });
        } else {
            allRecords.push({
                saleInvoice,
                deliveryNote: 'DN-' + saleInvoice.split('/').pop(),
                month,
                deliveredDate: 'SYNCED',
                state,
                city,
                pincode,
                status: status as any,
                qty,
                item: 'General Inventory',
                remark: 'Audit Incident Logged',
                transporter,
                customer
            });
        }
    });

    return allRecords;
}

export function getStats(data: DeliveryRecord[]): SummaryStats {
    const summaryLines = MONTHLY_SUMMARY_CSV.split('\n').slice(1);
    let totalNetworkInvs = 0;
    let okInvs = 0;
    
    summaryLines.forEach(line => {
      const cols = parseCSVLine(line);
      if (cols.length >= 5) {
        const cnt = parseInt(cols[3]) || 0;
        totalNetworkInvs += cnt;
        if (cols[2].toLowerCase().includes('no shortage')) okInvs += cnt;
      }
    });

    const shortage = data.reduce((acc, curr) => acc + (curr.status === 'shortage' ? curr.qty : 0), 0);
    const damage = data.reduce((acc, curr) => acc + (curr.status === 'damage' ? curr.qty : 0), 0);
    const uniqueIncidents = new Set(data.map(d => d.saleInvoice)).size;
    const impactedCust = new Set(data.map(d => d.customer)).size;

    return {
        totalVolume: totalNetworkInvs,
        successRate: totalNetworkInvs > 0 ? parseFloat(((okInvs / totalNetworkInvs) * 100).toFixed(2)) : 0,
        totalIncidents: uniqueIncidents,
        shortageQty: shortage,
        damageQty: damage,
        impactedCustomers: impactedCust
    };
}

export function getMonthlyTrend(data: DeliveryRecord[]) {
    const summaryLines = MONTHLY_SUMMARY_CSV.split('\n').slice(1);
    const baselineMap = new Map<string, { total: number, ok: number }>();
    
    summaryLines.forEach(line => {
      const cols = parseCSVLine(line);
      const m = cols[0];
      const count = parseInt(cols[3]) || 0;
      const status = cols[2].toLowerCase();
      if (!baselineMap.has(m)) baselineMap.set(m, { total: 0, ok: 0 });
      const entry = baselineMap.get(m)!;
      entry.total += count;
      if (status.includes('no shortage')) entry.ok += count;
    });

    const monthsOrder = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthsOrder.map(m => {
        const monthData = data.filter(d => d.month === m);
        const shortage = monthData.filter(d => d.status === 'shortage').reduce((a, b) => a + b.qty, 0);
        const damage = monthData.filter(d => d.status === 'damage').reduce((a, b) => a + b.qty, 0);
        const incidents = new Set(monthData.map(d => d.saleInvoice)).size;
        const baseline = baselineMap.get(m) || { total: 0, ok: 0 };
        const successRate = baseline.total > 0 ? parseFloat(((baseline.ok / baseline.total) * 100).toFixed(1)) : 0;
        
        return {
            month: m,
            shortage,
            damage,
            incidents,
            total: shortage + damage,
            successRate
        };
    });
}

export function getRegionalAnalysis(data: DeliveryRecord[], key: 'state' | 'city' | 'pincode') {
    const map: Record<string, { shortage: number, damage: number, incidents: Set<string>, total: number }> = {};
    
    data.forEach(d => {
        const val = d[key] || 'Unspecified';
        if (!map[val]) map[val] = { shortage: 0, damage: 0, incidents: new Set(), total: 0 };
        if (d.status === 'shortage') map[val].shortage += d.qty;
        if (d.status === 'damage') map[val].damage += d.qty;
        map[val].incidents.add(d.saleInvoice);
        map[val].total += d.qty;
    });

    return Object.entries(map)
        .map(([name, m]) => ({
            name,
            shortage: m.shortage,
            damage: m.damage,
            incidentCount: m.incidents.size,
            totalQty: m.total
        }))
        .sort((a, b) => b.totalQty - a.totalQty);
}

export function getItemAnalysis(data: DeliveryRecord[]) {
    const map: Record<string, { shortage: number, damage: number, total: number }> = {};
    data.forEach(d => {
        const item = d.item || 'General Inventory';
        if (!map[item]) map[item] = { shortage: 0, damage: 0, total: 0 };
        if (d.status === 'shortage') map[item].shortage += d.qty;
        if (d.status === 'damage') map[item].damage += d.qty;
        map[item].total += d.qty;
    });
    return Object.entries(map)
        .map(([name, m]) => ({ name, ...m }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 10);
}

export function getItemClassificationTrend(data: DeliveryRecord[]) {
    const monthsOrder = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const topItems = getItemAnalysis(data).map(i => i.name);
    
    return monthsOrder.map(m => {
        const monthData = data.filter(d => d.month === m);
        const result: any = { month: m };
        topItems.forEach(item => {
            result[item] = monthData.filter(d => d.item === item).reduce((a, b) => a + b.qty, 0);
        });
        return result;
    });
}

export function getClassificationSummary(data: DeliveryRecord[]) {
    const shortage = data.filter(d => d.status === 'shortage').reduce((a, b) => a + b.qty, 0);
    const damage = data.filter(d => d.status === 'damage').reduce((a, b) => a + b.qty, 0);
    return [
        { name: 'Shortage', value: shortage, color: '#f59e0b' },
        { name: 'Damage', value: damage, color: '#f43f5e' }
    ];
}
