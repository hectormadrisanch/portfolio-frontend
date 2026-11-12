import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslationService } from '../../core/services/translation.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-tfg-detail',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective],
  templateUrl: './tfg-detail.component.html',
  styleUrl: './tfg-detail.component.scss',
})
export class TfgDetailComponent {
  readonly ts = inject(TranslationService);
}
