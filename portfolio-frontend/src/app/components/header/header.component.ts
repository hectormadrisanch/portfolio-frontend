import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslationService } from '../../core/services/translation.service';
import { NavCopy } from '../../shared/interfaces/copy.interface';

interface NavLink {
  key: keyof NavCopy;
  number: string;
  fragment?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly ts = inject(TranslationService);

  readonly links: NavLink[] = [
    { key: 'home', number: '01' },
    { key: 'education', number: '02', fragment: 'education' },
    { key: 'projects', number: '03', fragment: 'projects' },
    { key: 'contact', number: '04', fragment: 'contact' },
  ];
}
