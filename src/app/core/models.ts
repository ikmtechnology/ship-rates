export interface AddonOption { id: string; label: string; price: number; }

export interface RateBreakdown {
  base: number;      // "Regular price"
  fuel: number;      // "Fuel surcharge"
  tax: number;       // "Tax"
}

export interface RateOption {
  id: string;
  serviceName: string;
  total: number;             // base + fuel + tax (+ selected add-ons if you choose)
  etaBusinessDays: string;
  co2kg: number;
  bullets: string[];
  addons?: AddonOption[];    // NEW
  breakdown?: RateBreakdown; // NEW
}
export type UnitLen = 'cm'|'in';
export type UnitWt  = 'kg'|'lb';
export type Kind    = 'Package'|'Letter';

export interface ShipmentInput {
  from: string;
  toCountry: 'Canada'|'USA'|'International';
  to: string;
  kind: Kind;
  l: number; w: number; h: number; lenUnit: UnitLen;
  weight: number; wtUnit: UnitWt;
}
