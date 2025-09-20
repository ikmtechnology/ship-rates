import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LangService {
  readonly supported = ['en', 'fr'] as const;
  constructor(private t: TranslateService) {
    const saved = (localStorage.getItem('lang') as 'en' | 'fr') || 'en';
    this.t.addLangs(this.supported as unknown as string[]);
    this.t.setDefaultLang('en');
    this.use(saved);
  }
  use(lang: 'en'|'fr') {
    localStorage.setItem('lang', lang);
    this.t.use(lang);
  }
  toggle() {
    const next = this.t.currentLang === 'en' ? 'fr' : 'en';
    this.use(next as 'en'|'fr');
  }
}
