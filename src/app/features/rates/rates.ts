import { Component, inject, signal } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { RateStateService } from '../../core/rate-state.service';
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
  input = this.state.input;
  options = this.state.options;

  // map: rateId -> Set of addon ids
  private selected = signal<Record<string, Set<string>>>({});

  isChecked(rateId: string, addonId: string) {
    return this.selected()[rateId]?.has(addonId) ?? false;
  }

  toggleAddon(rate: RateOption, addon: AddonOption) {
    const map = { ...this.selected() };
    map[rate.id] ??= new Set<string>();
    if (map[rate.id].has(addon.id)) map[rate.id].delete(addon.id);
    else map[rate.id].add(addon.id);
    this.selected.set(map);
  }

  totalWithAddons(r: RateOption) {
    const chosen = this.selected()[r.id];
    if (!chosen || chosen.size === 0 || !r.addons?.length) return r.total;
    const extra = r.addons
      .filter(a => chosen.has(a.id))
      .reduce((s, a) => s + a.price, 0);
    return r.total + extra;
  }

  constructor(){ if (!this.input()) this.state.restore(); }
}
