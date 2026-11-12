import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { TranslationService } from '../../core/services/translation.service';
import {
  ContactPayload,
  ContactResult,
  ContactService,
} from '../../core/services/contact.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

type FormState = 'idle' | 'sending' | 'sent' | 'mailto' | 'error';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, ScrollRevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly ts = inject(TranslationService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly contactService = inject(ContactService);

  readonly maxMessage = 1200;
  readonly state = signal<FormState>('idle');
  readonly mailtoHref = signal('');

  readonly form = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(80)],
    ],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(120)],
    ],
    message: [
      '',
      [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(this.maxMessage),
      ],
    ],
    // Honeypot: hidden from humans, irresistible to bots.
    website: [''],
  });

  get messageLength(): number {
    return this.form.controls.message.value.length;
  }

  isInvalid(control: AbstractControl): boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  errorFor(control: AbstractControl): string {
    const errors = this.ts.t().contact.errors;

    if (control.hasError('required')) {
      return errors.required;
    }
    if (control.hasError('email')) {
      return errors.email;
    }
    if (control.hasError('minlength')) {
      return errors.minLength;
    }
    if (control.hasError('maxlength')) {
      return errors.maxLength;
    }
    return '';
  }

  submit(): void {
    if (this.state() === 'sending') {
      return;
    }

    if (this.form.controls.website.value.trim()) {
      this.state.set('sent');
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: ContactPayload = {
      name: this.form.controls.name.value.trim(),
      email: this.form.controls.email.value.trim(),
      message: this.form.controls.message.value.trim(),
      honey: this.form.controls.website.value.trim(),
    };

    this.state.set('sending');

    this.contactService.send(payload).subscribe((result: ContactResult) => {
      if (result === 'sent') {
        this.form.reset();
        this.state.set('sent');
        return;
      }

      const href = this.buildMailto(payload);
      this.mailtoHref.set(href);

      if (result === 'fallback') {
        this.openMailto(href);
        this.state.set('mailto');
        return;
      }

      this.state.set('error');
    });
  }

  reset(): void {
    this.form.reset();
    this.state.set('idle');
  }

  private buildMailto(payload: ContactPayload): string {
    const subject = encodeURIComponent(`${payload.name} — Portfolio`);
    const body = encodeURIComponent(
      `${payload.message}\n\n— ${payload.name}\n${payload.email}`,
    );

    return `mailto:hectormadrisanch@gmail.com?subject=${subject}&body=${body}`;
  }

  private openMailto(href: string): void {
    if (typeof window !== 'undefined') {
      window.location.href = href;
    }
  }
}
