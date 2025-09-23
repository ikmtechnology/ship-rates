import { Component, inject } from '@angular/core';
import { NgFor, CurrencyPipe, NgIf } from '@angular/common';
import { RateStateService } from '../../core/rate-state.service';

@Component({
  selector: 'app-rates',
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe],
  templateUrl: './rates.html',
  styleUrl: './rates.scss'
})
export class Rates {
  private state = inject(RateStateService);
  input = this.state.input;       // signal<ShipmentInput|null>
  options = this.state.options;   // signal<RateOption[]>

  constructor() {
    if (!this.input()) this.state.restore();
  }
}
