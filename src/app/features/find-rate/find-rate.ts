import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-find-rate',
  imports: [],
  templateUrl: './find-rate.html',
  styleUrl: './find-rate.scss'
})
export class FindRate {
  constructor(private router: Router) {}
  goToRates() {
    this.router.navigateByUrl('/rates');
  }
}
