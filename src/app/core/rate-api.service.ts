import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { RateOption, ShipmentInput } from './models';

@Injectable({ providedIn: 'root' })
export class RateApiService {
  getRates(_input: ShipmentInput): Observable<RateOption[]> {
    const commonAddons = [
      { id: 'sig',  label: 'Signature option (+$2)',           price: 2.00 },
      { id: 'tube', label: 'Mailing Tube (+$2)',               price: 2.00 },
      { id: 'cod',  label: 'Collect on delivery (+$7.25)',     price: 7.25 },
      { id: 'unp',  label: 'Unpackaged (+$21)',                price: 21.00 },
      { id: 'cov',  label: 'Liability coverage (per $100 $2.75)', price: 2.75 }
    ];

    const list: RateOption[] = [
      {
        id:'regular', serviceName:'Regular Parcel™',
        total:17.56, etaBusinessDays:'2 business days', co2kg:0.014,
        bullets:['Tracking and delivery confirmation'],
        addons: commonAddons,
        breakdown:{ base:12.95, fuel:2.59, tax:2.02 }
      },
      {
        id:'xpress', serviceName:'Xpresspost™',
        total:18.46, etaBusinessDays:'1 business day (Guaranteed)', co2kg:0.014,
        bullets:['Tracking and delivery confirmation', 'Liability coverage up to $100'],
        addons: commonAddons,
        breakdown:{ base:13.62, fuel:2.72, tax:2.12 }
      },
      {
        id:'priority', serviceName:'Priority™',
        total:37.03, etaBusinessDays:'1 business day (Guaranteed)', co2kg:0.014,
        bullets:['Tracking and delivery confirmation','Signature option'],
        addons: commonAddons,
        breakdown:{ base:28.5, fuel:5.1, tax:3.43 }
      }
    ];
    return of(list).pipe(delay(200));
  }
  /** Pretend this is a server call that adds/subtracts selected add-ons */
  recalcRate(rate: RateOption, selectedAddonIds: string[]): Observable<RateOption> {
    // compute new total from the *server*
    const addonsTotal = (rate.addons ?? [])
      .filter(a => selectedAddonIds.includes(a.id))
      .reduce((s, a) => s + a.price, 0);

    const newRate: RateOption = {
      ...rate,
      total: +( (rate.breakdown?.base ?? 0)
              + (rate.breakdown?.fuel ?? 0)
              + (rate.breakdown?.tax ?? 0)
              + addonsTotal ).toFixed(2)
    };

    // simulate network latency
    return of(newRate).pipe(delay(250));
  }
}
