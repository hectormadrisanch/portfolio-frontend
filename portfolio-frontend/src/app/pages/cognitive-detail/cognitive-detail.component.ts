import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslationService } from '../../core/services/translation.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-cognitive-detail',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective],
  templateUrl: './cognitive-detail.component.html',
  styleUrl: './cognitive-detail.component.scss',
})
export class CognitiveDetailComponent {
  readonly ts = inject(TranslationService);
}
