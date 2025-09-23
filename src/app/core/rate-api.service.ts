import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { RateOption, ShipmentInput } from './models';

@Injectable({ providedIn: 'root' })
export class RateApiService {
  getRates(_input: ShipmentInput): Observable<RateOption[]> {
    // Hard-coded demo data; you can tweak numbers/labels freely
    const demo: RateOption[] = [
      {
        id: 'regular',
        serviceName: 'Regular Parcel™',
        total: 27.43,
        etaBusinessDays: '6 business days',
        co2kg: 0.189,
        bullets: ['Tracking and delivery confirmation', 'Liability coverage up to $100']
      },
      {
        id: 'xpress',
        serviceName: 'Xpresspost™',
        total: 29.45,
        etaBusinessDays: '2 business days (Guaranteed)',
        co2kg: 5.606,
        bullets: ['Tracking and delivery confirmation', 'Liability coverage up to $100']
      },
      {
        id: 'priority',
        serviceName: 'Priority™',
        total: 42.10,
        etaBusinessDays: '1 business day (Guaranteed)',
        co2kg: 5.606,
        bullets: ['Fastest delivery', 'Signature required (optional add-on)']
      }
    ];

    // Simulate network latency
    return of(demo).pipe(delay(300));
  }
}
