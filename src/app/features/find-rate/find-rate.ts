import { Component, inject  } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-find-rate',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule],
  templateUrl: './find-rate.html',
  styleUrl: './find-rate.scss'
})
export class FindRate {
  private router = inject(Router);
  // canonical values; labels come from translations
  kindOptions = [
    { value: 'Package', label: 'find.kindOptions.package' },
    { value: 'Letter',  label: 'find.kindOptions.letter'  }
  ];
  lenUnits = ['cm','in'] as const;
  wtUnits  = ['kg','lb'] as const;
  goToRates() {
    this.router.navigateByUrl('/rates');
  }
}
