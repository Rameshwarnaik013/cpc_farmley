
export interface DeliveryRecord {
  saleInvoice: string;
  deliveryNote: string;
  month: string;
  deliveredDate: string;
  state: string;
  city: string;
  pincode: string;
  qty: number;
  status: 'shortage' | 'damage' | 'No shortage and damage';
  remark: string;
  item: string;
  transporter: string;
  customer: string;
}

export interface SummaryStats {
  totalVolume: number;
  successRate: number;
  totalIncidents: number;
  shortageQty: number;
  damageQty: number;
  impactedCustomers: number;
}

export interface FilterState {
  month: string;
  state: string;
  city: string;
  pincode: string;
  transporter: string;
  status: string;
  search: string;
}
