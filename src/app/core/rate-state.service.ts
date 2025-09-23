import { Injectable, signal } from '@angular/core';
import { RateOption, ShipmentInput } from './models';

@Injectable({ providedIn: 'root' })
export class RateStateService {
  readonly input   = signal<ShipmentInput | null>(null);
  readonly options = signal<RateOption[]>([]);

  set(input: ShipmentInput, options: RateOption[]) {
    this.input.set(input);
    this.options.set(options);
    localStorage.setItem('lastFindInput', JSON.stringify(input));
    localStorage.setItem('lastRateOptions', JSON.stringify(options));
  }

  restore() {
    try {
      const i = localStorage.getItem('lastFindInput');
      const o = localStorage.getItem('lastRateOptions');
      if (i && o) {
        this.input.set(JSON.parse(i));
        this.options.set(JSON.parse(o));
      }
    } catch {}
  }
}
