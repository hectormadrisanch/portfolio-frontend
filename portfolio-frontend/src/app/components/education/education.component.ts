import { Component, inject } from '@angular/core';

import { TranslationService } from '../../core/services/translation.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent {
  readonly ts = inject(TranslationService);
}
