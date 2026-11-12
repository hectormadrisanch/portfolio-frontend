import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, timeout } from 'rxjs';

import { environment } from '../../../environments/environment';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  /** Honeypot value, forwarded so the server can drop bot submissions. */
  honey?: string;
}

export type ContactResult = 'sent' | 'fallback' | 'error';

interface ContactResponse {
  success?: boolean | string;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = environment.contactEndpoint.trim();

  /**
   * Sends the message to the configured endpoint.
   *
   * - `sent`     → the server accepted and delivered the message.
   * - `fallback` → no endpoint configured, the caller should offer mailto.
   * - `error`    → the request failed or was rejected, offer mailto too.
   */
  send(payload: ContactPayload): Observable<ContactResult> {
    if (!this.endpoint) {
      return of('fallback');
    }

    const body = {
      name: payload.name,
      email: payload.email,
      message: payload.message,
      _honey: payload.honey ?? '',
    };

    return this.http.post<ContactResponse>(this.endpoint, body).pipe(
      timeout(20_000),
      map((response) => {
        const delivered =
          response?.success === true || response?.success === 'true';

        return delivered ? ('sent' as const) : ('error' as const);
      }),
      catchError(() => of('error' as const)),
    );
  }
}
