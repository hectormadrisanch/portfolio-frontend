import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';

import { en } from '../i18n/en';
import { es } from '../i18n/es';
import { Copy, Language } from '../../shared/interfaces/copy.interface';

const STORAGE_KEY = 'portfolio.lang';
const DICTIONARIES: Record<Language, Copy> = { en, es };

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  private readonly current = signal<Language>(this.detectLanguage());

  /** Current language, exposed for the language switcher. */
  readonly lang = this.current.asReadonly();

  /** Current copy. Read it in templates as `t()`. */
  readonly t = computed(() => DICTIONARIES[this.current()]);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.document.documentElement.lang = this.current();
    }
  }

  toggle(): void {
    this.setLanguage(this.current() === 'en' ? 'es' : 'en');
  }

  setLanguage(lang: Language): void {
    if (lang === this.current()) {
      return;
    }

    this.current.set(lang);

    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        // Private mode without storage: the choice just will not persist.
      }
      this.document.documentElement.lang = lang;
    }
  }

  private detectLanguage(): Language {
    if (!isPlatformBrowser(this.platformId)) {
      return 'en';
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'es') {
        return stored;
      }
    } catch {
      // Ignore storage access errors and fall back to the browser locale.
    }

    const preferred = navigator.language?.toLowerCase() ?? '';
    return preferred.startsWith('es') ? 'es' : 'en';
  }
}
