import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { en } from '../i18n/en';
import { es } from '../i18n/es';
import { TranslationService } from './translation.service';

describe('TranslationService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = 'en';
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.lang = 'en';
  });

  function create(platformId: 'browser' | 'server' = 'browser'): TranslationService {
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: platformId }],
    });

    return TestBed.inject(TranslationService);
  }

  it('detects Spanish from the browser locale', () => {
    spyOnProperty(navigator, 'language', 'get').and.returnValue('es-ES');

    expect(create().lang()).toBe('es');
  });

  it('defaults to English for other locales', () => {
    spyOnProperty(navigator, 'language', 'get').and.returnValue('en-US');

    expect(create().lang()).toBe('en');
  });

  it('prefers the language stored in a previous visit', () => {
    localStorage.setItem('portfolio.lang', 'es');
    spyOnProperty(navigator, 'language', 'get').and.returnValue('en-US');

    expect(create().lang()).toBe('es');
  });

  it('accepts an English language stored in a previous visit', () => {
    localStorage.setItem('portfolio.lang', 'en');
    spyOnProperty(navigator, 'language', 'get').and.returnValue('es-ES');

    expect(create().lang()).toBe('en');
  });

  it('ignores an invalid stored language', () => {
    localStorage.setItem('portfolio.lang', 'fr');
    spyOnProperty(navigator, 'language', 'get').and.returnValue('es-ES');

    expect(create().lang()).toBe('es');
  });

  it('falls back to the browser when storage access throws', () => {
    spyOn(Storage.prototype, 'getItem').and.throwError('blocked');
    spyOnProperty(navigator, 'language', 'get').and.returnValue('es-ES');

    expect(create().lang()).toBe('es');
  });

  it('updates the html lang attribute on creation', () => {
    spyOnProperty(navigator, 'language', 'get').and.returnValue('es-ES');

    create();

    expect(document.documentElement.lang).toBe('es');
  });

  it('toggles between English and Spanish and persists the choice', () => {
    spyOnProperty(navigator, 'language', 'get').and.returnValue('en-US');
    const service = create();

    service.toggle();
    expect(service.lang()).toBe('es');
    expect(document.documentElement.lang).toBe('es');
    expect(localStorage.getItem('portfolio.lang')).toBe('es');

    service.toggle();
    expect(service.lang()).toBe('en');
    expect(localStorage.getItem('portfolio.lang')).toBe('en');
  });

  it('does nothing when setting the current language', () => {
    spyOnProperty(navigator, 'language', 'get').and.returnValue('en-US');
    const service = create();
    const setItem = spyOn(Storage.prototype, 'setItem');

    service.setLanguage('en');

    expect(setItem).not.toHaveBeenCalled();
  });

  it('keeps the language when storage is unavailable', () => {
    spyOnProperty(navigator, 'language', 'get').and.returnValue('en-US');
    const service = create();
    spyOn(Storage.prototype, 'setItem').and.throwError('quota');

    expect(() => service.setLanguage('es')).not.toThrow();
    expect(service.lang()).toBe('es');
    expect(document.documentElement.lang).toBe('es');
  });

  it('exposes the dictionary that matches the current language', () => {
    spyOnProperty(navigator, 'language', 'get').and.returnValue('en-US');
    const service = create();

    expect(service.t()).toBe(en);

    service.setLanguage('es');
    expect(service.t()).toBe(es);
  });

  it('returns Spanish copy when Spanish is selected', () => {
    spyOnProperty(navigator, 'language', 'get').and.returnValue('es-ES');

    expect(create().t().contact.title).toBe(es.contact.title);
  });

  it('stays in English during server-side rendering', () => {
    localStorage.setItem('portfolio.lang', 'es');
    document.documentElement.lang = 'fr';

    const service = create('server');

    expect(service.lang()).toBe('en');
    expect(service.t()).toBe(en);
    expect(document.documentElement.lang).toBe('fr');
  });

  it('does not touch storage or the document on the server', () => {
    document.documentElement.lang = 'fr';
    const service = create('server');
    const setItem = spyOn(Storage.prototype, 'setItem');

    service.setLanguage('es');

    expect(service.lang()).toBe('es');
    expect(document.documentElement.lang).toBe('fr');
    expect(setItem).not.toHaveBeenCalled();
  });
});
