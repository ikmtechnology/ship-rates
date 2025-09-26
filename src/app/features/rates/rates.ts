import { Component, inject, signal } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { RateStateService } from '../../core/rate-state.service';
import { RateApiService } from '../../core/rate-api.service';
import { RateOption, AddonOption } from '../../core/models';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-rates',
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe, FormsModule], // <— add FormsModule here
  templateUrl: './rates.html',
  styleUrl: './rates.scss'
})
export class Rates {
  private state = inject(RateStateService);
  private api   = inject(RateApiService);

  input   = this.state.input;
  options = this.state.options;

  // keep previous checkbox selections
  private selected = signal<Record<string, Set<string>>>({});

  // NEW: coverage amounts per card (dollars)
  coverage = signal<Record<string, number>>({});

  // per-card loading flag
  loading = signal<Record<string, boolean>>({});

  constructor(){ if (!this.input()) this.state.restore(); }

  // --- existing helpers ---
  isChecked(rateId: string, addonId: string) {
    return this.selected()[rateId]?.has(addonId) ?? false;
  }

  toggleAddon(rate: RateOption, addon: AddonOption) {
    if (addon.id === 'cov') return; // coverage handled separately
    const sel = { ...this.selected() };
    sel[rate.id] ??= new Set<string>();
    sel[rate.id].has(addon.id) ? sel[rate.id].delete(addon.id) : sel[rate.id].add(addon.id);
    this.selected.set(sel);
    this.callRecalc(rate);
  }

  // --- NEW: coverage helpers ---
  setCoverage(rateId: string, val: any) {
    const m = { ...this.coverage() };
    m[rateId] = Math.max(0, Number(val) || 0);
    this.coverage.set(m);
  }

  applyCoverage(rate: RateOption) {
    // enter key triggers server recompute using current coverage value
    this.callRecalc(rate);
  }

  private callRecalc(rate: RateOption) {
    const picked = Array.from(this.selected()[rate.id] ?? []);
    const cov = this.coverage()[rate.id] || 0;

    this.setLoading(rate.id, true);
    this.api.recalcRate(rate, { selected: picked, coverageAmount: cov }).subscribe(updated => {
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

  // If you implemented the "keep details open" earlier:
  isOpen: Record<string, boolean> = {};
  toggleOpen(rateId: string, ev: Event) { ev.preventDefault(); this.isOpen[rateId] = !this.isOpen[rateId]; }
}