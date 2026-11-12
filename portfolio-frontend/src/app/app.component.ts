import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.scrollToFragment());
  }

  /**
   * The router's built-in anchor scrolling ignores the sticky header, so we
   * scroll manually and subtract its height plus a small breathing gap.
   */
  private scrollToFragment(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const fragment = this.router.parseUrl(this.router.url).fragment;
    if (!fragment) {
      return;
    }

    // Wait for the routed view and the router's own scroll restoration to
    // settle, then scroll with the sticky header offset applied.
    setTimeout(() => {
      const target = document.getElementById(fragment);
      if (!target) {
        return;
      }

      const header = document.querySelector<HTMLElement>('.header');
      const offset = (header?.offsetHeight ?? 72) + 24;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
    }, 120);
  }
}
