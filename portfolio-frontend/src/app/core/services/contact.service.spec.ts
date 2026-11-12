import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { environment } from '../../../environments/environment';
import { ContactResult, ContactService } from './contact.service';

describe('ContactService', () => {
  let service: ContactService;
  let http: HttpTestingController;
  const originalEndpoint = environment.contactEndpoint;

  const payload = {
    name: 'Ana',
    email: 'ana@example.com',
    message: 'Hola, me gustaría hablar contigo.',
  };

  beforeEach(() => {
    environment.contactEndpoint = originalEndpoint;
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ContactService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    environment.contactEndpoint = originalEndpoint;
  });

  it('posts the message to the configured endpoint', () => {
    service.send({ ...payload, honey: 'bot' }).subscribe();

    const request = http.expectOne('contact.php');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      name: 'Ana',
      email: 'ana@example.com',
      message: 'Hola, me gustaría hablar contigo.',
      _honey: 'bot',
    });

    request.flush({ success: true });
  });

  it('sends an empty honeypot by default', () => {
    service.send(payload).subscribe();

    const request = http.expectOne('contact.php');
    expect(request.request.body._honey).toBe('');

    request.flush({ success: true });
  });

  it('reports sent for a boolean success response', (done) => {
    service.send(payload).subscribe((result) => {
      expect(result).toBe('sent');
      done();
    });

    http.expectOne('contact.php').flush({ success: true });
  });

  it('reports sent for the string "true"', (done) => {
    service.send(payload).subscribe((result) => {
      expect(result).toBe('sent');
      done();
    });

    http.expectOne('contact.php').flush({ success: 'true' });
  });

  it('reports error when the server rejects the message', (done) => {
    service.send(payload).subscribe((result) => {
      expect(result).toBe('error');
      done();
    });

    http.expectOne('contact.php').flush({ success: false });
  });

  it('reports error when the request fails', (done) => {
    service.send(payload).subscribe((result) => {
      expect(result).toBe('error');
      done();
    });

    http.expectOne('contact.php').flush('boom', {
      status: 500,
      statusText: 'Server Error',
    });
  });

  it('reports error when the request times out', fakeAsync(() => {
    let result: ContactResult | undefined;

    service.send(payload).subscribe((value) => (result = value));
    const request = http.expectOne('contact.php');

    tick(20_001);

    expect(result).toBe('error');
    expect(request.cancelled).toBeTrue();
  }));

  it('falls back when no endpoint is configured', () => {
    environment.contactEndpoint = '';

    const offline = TestBed.runInInjectionContext(() => new ContactService());
    let result: ContactResult | undefined;

    offline.send(payload).subscribe((value) => (result = value));

    expect(result).toBe('fallback');
  });
});
