
export interface DeliveryRecord {
  saleInvoice: string;
  deliveryNote: string;
  month: string;
  deliveredDate: string;
  state: string;
  city: string;
  pincode: string;
  qty: number;
  status: 'shortage' | 'damage';
  remark: string;
  item: string;
  transporter: string;
  customer: string;
}

export interface SummaryStats {
  totalIssues: number;
  totalQtyAffected: number;
  shortageCount: number;
  damageCount: number;
  shortageQty: number;
  damageQty: number;
  topState: string;
  topTransporter: string;
}

export interface FilterState {
  month: string;
  state: string;
  city: string;
  transporter: string;
  status: string;
  search: string;
}
