import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-rates',
  imports: [TranslateModule, RouterLink],
  templateUrl: './rates.html',
  styleUrl: './rates.scss'
})
export class Rates {

}
