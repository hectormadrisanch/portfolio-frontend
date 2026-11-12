import { Component } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { AppComponent } from './app.component';

@Component({ standalone: true, template: '' })
class DummyComponent {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;

  beforeEach(async () => {
    spyOnProperty(window, 'scrollY', 'get').and.returnValue(0);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([{ path: '', component: DummyComponent }])],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    document
      .querySelectorAll('.test-target, .test-header')
      .forEach((element) => element.remove());
  });

  function addTarget(id: string, top: number): void {
    const target = document.createElement('div');
    target.id = id;
    target.className = 'test-target';
    target.getBoundingClientRect = () => ({ top } as DOMRect);
    document.body.appendChild(target);
  }

  function addHeader(height: number): HTMLElement {
    const header = document.createElement('div');
    header.className = 'test-header';
    Object.defineProperty(header, 'offsetHeight', {
      value: height,
      configurable: true,
    });
    document.body.appendChild(header);
    return header;
  }

  function mockHeader(height: number | null): void {
    const originalQuerySelector = document.querySelector.bind(document);
    const querySelector = spyOn(document, 'querySelector') as jasmine.Spy;

    if (height === null) {
      querySelector.and.callFake((selector: string) =>
        selector === '.header' ? null : originalQuerySelector(selector),
      );
      return;
    }

    const header = addHeader(height);
    querySelector.and.callFake((selector: string) =>
      selector === '.header' ? header : originalQuerySelector(selector),
    );
  }

  function mockRoute(url: string, fragment: string | null): void {
    spyOnProperty(router, 'url', 'get').and.returnValue(url);
    spyOn(router, 'parseUrl').and.returnValue({
      fragment,
    } as ReturnType<Router['parseUrl']>);
  }

  it('creates the app and renders the header', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-header')).toBeTruthy();
  });

  it('scrolls to the fragment applying the sticky header offset', fakeAsync(() => {
    mockRoute('/#contact', 'contact');
    addTarget('contact', 500);
    mockHeader(80);
    const scrollTo = spyOn(window, 'scrollTo') as jasmine.Spy;

    (component as unknown as { scrollToFragment: () => void }).scrollToFragment();
    tick(120);

    expect(scrollTo).toHaveBeenCalledWith({
      top: 500 + window.scrollY - 104,
      behavior: 'smooth',
    });
  }));

  it('uses the default offset when there is no header', fakeAsync(() => {
    mockRoute('/#contact', 'contact');
    addTarget('contact', 500);
    mockHeader(null);
    const scrollTo = spyOn(window, 'scrollTo') as jasmine.Spy;

    (component as unknown as { scrollToFragment: () => void }).scrollToFragment();
    tick(120);

    expect(scrollTo).toHaveBeenCalledWith({
      top: 500 + window.scrollY - 96,
      behavior: 'smooth',
    });
  }));

  it('never scrolls above the top of the page', fakeAsync(() => {
    mockRoute('/#contact', 'contact');
    addTarget('contact', 10);
    mockHeader(80);
    const scrollTo = spyOn(window, 'scrollTo') as jasmine.Spy;

    (component as unknown as { scrollToFragment: () => void }).scrollToFragment();
    tick(120);

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  }));

  it('does nothing when the URL has no fragment', fakeAsync(() => {
    mockRoute('/', null);
    const scrollTo = spyOn(window, 'scrollTo') as jasmine.Spy;

    (component as unknown as { scrollToFragment: () => void }).scrollToFragment();
    tick(120);

    expect(scrollTo).not.toHaveBeenCalled();
  }));

  it('does nothing when the target does not exist', fakeAsync(() => {
    mockRoute('/#missing', 'missing');
    const scrollTo = spyOn(window, 'scrollTo') as jasmine.Spy;

    (component as unknown as { scrollToFragment: () => void }).scrollToFragment();
    tick(120);

    expect(scrollTo).not.toHaveBeenCalled();
  }));

  it('scrolls after a navigation ends with a fragment', fakeAsync(() => {
    addTarget('contact', 400);
    mockHeader(80);
    const scrollTo = spyOn(window, 'scrollTo') as jasmine.Spy;

    router.navigateByUrl('/#contact');
    tick(0);
    tick(120);

    expect(scrollTo).toHaveBeenCalled();
  }));
});
