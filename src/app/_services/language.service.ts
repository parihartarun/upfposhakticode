import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private language$ = new BehaviorSubject(null);

  constructor() {
    if (this.language$.getValue() == null) this.setLocalLang();
  }

  setLocalLang() {
    this.language$.next(localStorage.getItem('language'));
  }

  changeLang(lang: string) {
    if (this.language$.getValue() !== lang) this.language$.next(lang);
  }

  getLanguage() {
    if (this.language$.getValue() == null && localStorage.getItem('language')) {
      this.setLocalLang();
    }
    return this.language$.asObservable();
  }
}
