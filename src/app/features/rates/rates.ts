import { Component, inject, signal } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { RateStateService } from '../../core/rate-state.service';
import { RateApiService } from '../../core/rate-api.service';
import { RateOption, AddonOption } from '../../core/models';

@Component({
  selector: 'app-rates',
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe],
  templateUrl: './rates.html',
  styleUrl: './rates.scss'
})
export class Rates {
  private state = inject(RateStateService);
  private api   = inject(RateApiService);

  input   = this.state.input;
  options = this.state.options;

  // rateId -> Set<addonId>
  private selected = signal<Record<string, Set<string>>>({});
  // loading flags per card
  loading = signal<Record<string, boolean>>({});

  constructor(){ if (!this.input()) this.state.restore(); }

  isChecked(rateId: string, addonId: string) {
    return this.selected()[rateId]?.has(addonId) ?? false;
  }

  toggleAddon(rate: RateOption, addon: AddonOption) {
    // update local selection state
    const sel = { ...this.selected() };
    sel[rate.id] ??= new Set<string>();
    sel[rate.id].has(addon.id) ? sel[rate.id].delete(addon.id) : sel[rate.id].add(addon.id);
    this.selected.set(sel);

    // call "server" with current selection for this rate
    const picked = Array.from(this.selected()[rate.id] ?? []);
    this.setLoading(rate.id, true);

    this.api.recalcRate(rate, picked).subscribe(updated => {
      // replace just this card in options
      const next = this.options().map(r => r.id === rate.id ? updated : r);
      this.options.set(next);
      this.setLoading(rate.id, false);
    });
  }

  private setLoading(rateId: string, v: boolean) {
    const m = { ...this.loading() };
    m[rateId] = v;
    this.loading.set(m);
  }

  // track which details sections are open
isOpen: Record<string, boolean> = {};

toggleOpen(rateId: string, event: Event) {
  event.preventDefault(); // stop <details> default toggle
  this.isOpen[rateId] = !this.isOpen[rateId];
}
}
