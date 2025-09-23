export interface RateOption {
  id: string;
  serviceName: string;
  total: number;           // CAD
  etaBusinessDays: string; // e.g., "2 business days (Guaranteed)"
  co2kg: number;
  bullets: string[];
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
