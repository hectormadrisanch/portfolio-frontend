import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject, of } from 'rxjs';

import { ContactResult, ContactService } from '../../core/services/contact.service';
import { TranslationService } from '../../core/services/translation.service';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let contactService: ContactService;
  let translation: TranslationService;

  const validValue = {
    name: 'Ana Pérez',
    email: 'ana@example.com',
    message: 'Me gustaría hablar contigo sobre una oportunidad.',
    website: '',
  };

  const fill = (overrides: Partial<typeof validValue> = {}): void => {
    component.form.setValue({ ...validValue, ...overrides });
  };

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    contactService = TestBed.inject(ContactService);
    translation = TestBed.inject(TranslationService);
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => localStorage.clear());

  it('creates with an empty, invalid form in the idle state', () => {
    expect(component).toBeTruthy();
    expect(component.state()).toBe('idle');
    expect(component.form.invalid).toBeTrue();
    expect(component.form.controls.website.value).toBe('');
  });

  it('counts the characters typed in the message', () => {
    component.form.controls.message.setValue('12345');

    expect(component.messageLength).toBe(5);
  });

  it('marks a control as invalid only after it is touched or dirty', () => {
    const name = component.form.controls.name;

    expect(component.isInvalid(name)).toBeFalse();

    name.markAsTouched();
    expect(component.isInvalid(name)).toBeTrue();

    name.setValue('Ana');
    name.markAsDirty();
    expect(component.isInvalid(name)).toBeFalse();
  });

  it('returns the right validation message for each error', () => {
    const errors = translation.t().contact.errors;
    const name = component.form.controls.name;
    const email = component.form.controls.email;

    expect(component.errorFor(name)).toBe(errors.required);

    name.setValue('a');
    expect(component.errorFor(name)).toBe(errors.minLength);

    name.setValue('a'.repeat(81));
    expect(component.errorFor(name)).toBe(errors.maxLength);

    name.setValue('Ana');
    expect(component.errorFor(name)).toBe('');

    email.setValue('not-an-email');
    expect(component.errorFor(email)).toBe(errors.email);

    email.setValue('ana@example.com');
    expect(component.errorFor(email)).toBe('');
  });

  it('does not send an invalid form and marks every field as touched', () => {
    const send = spyOn(contactService, 'send');

    component.submit();

    expect(send).not.toHaveBeenCalled();
    expect(component.form.controls.name.touched).toBeTrue();
    expect(component.form.controls.email.touched).toBeTrue();
    expect(component.form.controls.message.touched).toBeTrue();
    expect(component.state()).toBe('idle');
  });

  it('silently accepts a bot that fills the honeypot', () => {
    const send = spyOn(contactService, 'send');
    fill({ website: 'https://spam.example' });

    component.submit();

    expect(send).not.toHaveBeenCalled();
    expect(component.state()).toBe('sent');
  });

  it('ignores a honeypot filled only with whitespace', () => {
    const send = spyOn(contactService, 'send').and.returnValue(of('sent'));
    fill({ website: '   ' });

    component.submit();

    expect(send).toHaveBeenCalledTimes(1);
  });

  it('sends the trimmed payload and resets the form on success', () => {
    const send = spyOn(contactService, 'send').and.returnValue(of('sent'));
    fill({ name: '  Ana  ', message: '  Hola, me gustaría hablar contigo.  ' });

    component.submit();

    expect(send).toHaveBeenCalledWith({
      name: 'Ana',
      email: 'ana@example.com',
      message: 'Hola, me gustaría hablar contigo.',
      honey: '',
    });
    expect(component.state()).toBe('sent');
    expect(component.form.controls.name.value).toBe('');
  });

  it('builds a mailto link and opens it when no backend is configured', () => {
    spyOn(contactService, 'send').and.returnValue(of('fallback'));
    const openMailto = spyOn<any>(component, 'openMailto');
    fill();

    component.submit();

    expect(component.state()).toBe('mailto');
    expect(openMailto).toHaveBeenCalledTimes(1);
    expect(component.mailtoHref()).toContain('mailto:hectormadrisanch@gmail.com');
    expect(component.mailtoHref()).toContain(encodeURIComponent(validValue.message));
    expect(component.mailtoHref()).toContain(encodeURIComponent(validValue.email));
  });

  it('shows the error state without opening mail when the send fails', () => {
    spyOn(contactService, 'send').and.returnValue(of('error'));
    const openMailto = spyOn<any>(component, 'openMailto');
    fill();

    component.submit();

    expect(component.state()).toBe('error');
    expect(openMailto).not.toHaveBeenCalled();
    expect(component.mailtoHref()).toContain('mailto:');
  });

  it('ignores a second submit while the first one is in flight', () => {
    const pending = new Subject<ContactResult>();
    const send = spyOn(contactService, 'send').and.returnValue(pending.asObservable());
    fill();

    component.submit();
    component.submit();

    expect(send).toHaveBeenCalledTimes(1);
    expect(component.state()).toBe('sending');

    pending.next('sent');
    expect(component.state()).toBe('sent');
  });

  it('returns to the form with reset', () => {
    spyOn(contactService, 'send').and.returnValue(of('sent'));
    fill();
    component.submit();

    component.reset();

    expect(component.state()).toBe('idle');
    expect(component.form.controls.name.value).toBe('');
    expect(component.form.invalid).toBeTrue();
  });

  it('shows the validation message in the DOM after submit', () => {
    component.submit();
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector(
      '#contact-name-error',
    ) as HTMLElement;

    expect(error.textContent?.trim()).toBe(
      translation.t().contact.errors.required,
    );
  });

  it('renders the form in Spanish', () => {
    translation.setLanguage('es');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector(
      'label[for="contact-name"]',
    ) as HTMLElement;

    expect(label.textContent?.trim()).toBe('Nombre');
  });

  it('renders the success panel', () => {
    spyOn(contactService, 'send').and.returnValue(of('sent'));
    fill();

    component.submit();
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.feedback--success'),
    ).toBeTruthy();
  });

  it('renders the error panel with a mailto fallback', () => {
    spyOn(contactService, 'send').and.returnValue(of('error'));
    fill();

    component.submit();
    fixture.detectChanges();

    const panel = fixture.nativeElement.querySelector(
      '.feedback--error',
    ) as HTMLElement;
    const link = panel.querySelector('a.btn') as HTMLAnchorElement;

    expect(panel).toBeTruthy();
    expect(link.getAttribute('href')).toContain('mailto:');
  });

  it('disables the submit button while sending', () => {
    const pending = new Subject<ContactResult>();
    spyOn(contactService, 'send').and.returnValue(pending.asObservable());
    fill();

    component.submit();
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector(
      '.contact__submit',
    ) as HTMLButtonElement;

    expect(button.disabled).toBeTrue();

    pending.next('sent');
  });

  it('shows the character counter', () => {
    component.form.controls.message.setValue('12345');
    fixture.detectChanges();

    const counter = fixture.nativeElement.querySelector(
      '.field__counter',
    ) as HTMLElement;

    expect(counter.textContent?.trim()).toBe('5/1200');
  });
});
