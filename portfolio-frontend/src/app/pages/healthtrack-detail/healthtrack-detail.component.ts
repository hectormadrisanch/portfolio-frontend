import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslationService } from '../../core/services/translation.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-healthtrack-detail',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective],
  templateUrl: './healthtrack-detail.component.html',
  styleUrl: './healthtrack-detail.component.scss',
})
export class HealthtrackDetailComponent {
  readonly ts = inject(TranslationService);
}
