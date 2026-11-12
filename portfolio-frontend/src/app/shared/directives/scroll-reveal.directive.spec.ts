import { PLATFORM_ID } from '@angular/core';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollRevealDirective } from './scroll-reveal.directive';

@Component({
  standalone: true,
  imports: [ScrollRevealDirective],
  template: `<div id="target" [appScrollReveal]="delay">content</div>`,
})
class HostComponent {
  delay: number | string = 0;
}

class FakeIntersectionObserver {
  static instances: FakeIntersectionObserver[] = [];

  readonly observed: Element[] = [];
  readonly disconnect = jasmine.createSpy('disconnect');
  readonly observe = jasmine.createSpy('observe').and.callFake((element: Element) => {
    this.observed.push(element);
  });
  readonly unobserve = jasmine.createSpy('unobserve');
  readonly takeRecords = (): IntersectionObserverEntry[] => [];
  readonly root = null;
  readonly rootMargin = '0px 0px -8% 0px';
  readonly thresholds = [0.12];

  constructor(
    private readonly callback: IntersectionObserverCallback,
    readonly options?: IntersectionObserverInit,
  ) {
    FakeIntersectionObserver.instances.push(this);
  }

  trigger(isIntersecting: boolean): void {
    this.callback(
      [{ isIntersecting } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
}

describe('ScrollRevealDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let matchMediaSpy: jasmine.Spy;
  let originalObserver: typeof IntersectionObserver;

  beforeEach(() => {
    FakeIntersectionObserver.instances = [];
    originalObserver = window.IntersectionObserver;
    (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver =
      FakeIntersectionObserver;
    matchMediaSpy = spyOn(window, 'matchMedia').and.returnValue({
      matches: false,
    } as MediaQueryList);
  });

  afterEach(() => {
    (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver =
      originalObserver;
  });

  function create(
    delay: number | string = 0,
    platform: 'browser' | 'server' = 'browser',
  ): HTMLElement {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [{ provide: PLATFORM_ID, useValue: platform }],
    });

    fixture = TestBed.createComponent(HostComponent);
    fixture.componentInstance.delay = delay;
    fixture.detectChanges();

    return fixture.nativeElement.querySelector('#target') as HTMLElement;
  }

  it('applies the delay and starts observing the host', () => {
    const node = create(120);

    expect(node.style.getPropertyValue('--reveal-delay')).toBe('120ms');
    expect(node.classList.contains('reveal')).toBeTrue();
    expect(FakeIntersectionObserver.instances).toHaveSize(1);

    const observer = FakeIntersectionObserver.instances[0];
    expect(observer.observe).toHaveBeenCalledWith(node);
    expect(observer.options?.threshold).toBe(0.12);
    expect(observer.options?.rootMargin).toBe('0px 0px -8% 0px');
  });

  it('reveals the host when it enters the viewport', () => {
    const node = create();
    const observer = FakeIntersectionObserver.instances[0];

    observer.trigger(true);

    expect(node.classList.contains('is-visible')).toBeTrue();
    expect(observer.disconnect).toHaveBeenCalled();
  });

  it('ignores entries that are not intersecting', () => {
    const node = create();
    const observer = FakeIntersectionObserver.instances[0];

    observer.trigger(false);

    expect(node.classList.contains('is-visible')).toBeFalse();
    expect(observer.disconnect).not.toHaveBeenCalled();
  });

  it('shows the content immediately when reduced motion is preferred', () => {
    matchMediaSpy.and.returnValue({ matches: true } as MediaQueryList);

    const node = create(80);

    expect(node.classList.contains('reveal')).toBeTrue();
    expect(node.classList.contains('is-visible')).toBeTrue();
    expect(FakeIntersectionObserver.instances).toHaveSize(0);
  });

  it('shows the content when IntersectionObserver is unavailable', () => {
    (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver =
      undefined;

    const node = create();

    expect(node.classList.contains('reveal')).toBeTrue();
    expect(node.classList.contains('is-visible')).toBeTrue();
  });

  it('treats a non-numeric delay as zero', () => {
    const node = create('not-a-number');

    expect(node.style.getPropertyValue('--reveal-delay')).toBe('0ms');
  });

  it('accepts a numeric string as the delay', () => {
    const node = create('80');

    expect(node.style.getPropertyValue('--reveal-delay')).toBe('80ms');
  });

  it('disconnects the observer when destroyed', () => {
    create();
    const observer = FakeIntersectionObserver.instances[0];

    fixture.destroy();

    expect(observer.disconnect).toHaveBeenCalled();
  });

  it('does nothing during server-side rendering', () => {
    const node = create(120, 'server');

    expect(node.classList.contains('reveal')).toBeFalse();
    expect(node.style.getPropertyValue('--reveal-delay')).toBe('');
    expect(FakeIntersectionObserver.instances).toHaveSize(0);
  });
});
