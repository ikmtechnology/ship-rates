import { Component, signal,inject  } from '@angular/core';
import { Router, RouterOutlet, RouterLink  } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LangService } from './core/lang.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private lang = inject(LangService);
  toggle() { this.lang.toggle(); }
  protected readonly title = signal('ship-rates');
}
