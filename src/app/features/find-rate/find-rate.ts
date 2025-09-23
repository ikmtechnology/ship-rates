import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RateApiService } from '../../core/rate-api.service';
import { RateStateService } from '../../core/rate-state.service';
import { ShipmentInput } from '../../core/models';

@Component({
  selector: 'app-find-rate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  // <-- important
  templateUrl: './find-rate.html',
  styleUrl: './find-rate.scss'
})
export class FindRate {
  private fb = inject(FormBuilder);
  private api = inject(RateApiService);
  private state = inject(RateStateService);
  private router = inject(Router);

  form = this.fb.group({
    from: ['', Validators.required],
    toCountry: ['Canada' as const, Validators.required],
    to: ['', Validators.required],
    kind: ['Package' as const, Validators.required],
    l: [1, [Validators.required, Validators.min(0.1)]],
    w: [1, [Validators.required, Validators.min(0.1)]],
    h: [1, [Validators.required, Validators.min(0.1)]],
    lenUnit: ['cm' as const, Validators.required],
    weight: [1, [Validators.required, Validators.min(0.01)]],
    wtUnit: ['kg' as const, Validators.required]
  });

  submit() {
    console.log('✅ submit() called. Form value:', this.form.value); // <-- visible in DevTools

    if (this.form.invalid) {
      console.warn('Form invalid:', this.form.errors, this.form);
      return;
    }

    const input = this.form.value as ShipmentInput;
    this.api.getRates(input).subscribe(options => {
      this.state.set(input, options);
      this.router.navigateByUrl('/rates');
    });
  }
}
