import { inject, Injectable } from '@angular/core';
import { DEFAULT_LANGUAGE, Language } from '@core/types';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private readonly _translateService = inject(TranslateService);

  get currentLanguage(): string {
    return this._translateService.currentLang === Language.ES
      ? Language.ES
      : Language.EN;
  }

  init(): void {
    this._translateService.use(DEFAULT_LANGUAGE);
  }

  onLanguage(): void {
    this.currentLanguage === 'en'
      ? this._translateService.use('es')
      : this._translateService.use('en');
  }
}