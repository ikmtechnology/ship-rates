import { Routes } from '@angular/router';
import { FindRate } from './features/find-rate/find-rate';
import { Rates } from './features/rates/rates';
export const routes: Routes = [
  { path: '', redirectTo: 'find', pathMatch: 'full' }, // <-- default landing
  { path: 'find', component: FindRate },
  { path: 'rates', component: Rates },
  { path: '**', redirectTo: 'find' }
];
