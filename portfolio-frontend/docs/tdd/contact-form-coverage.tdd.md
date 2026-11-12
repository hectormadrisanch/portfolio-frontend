# TDD evidence — contact form and portfolio foundations

- **Date:** 2026-11-12
- **Feature:** portfolio redesign, ES/EN i18n and contact form (implemented before this run)
- **Scope:** characterization tests and coverage pass. No production behaviour was changed.
- **Source plan:** none. The journeys below were derived from the shipped feature.

## User journeys

1. As a visitor, I want to send a message from the portfolio and get a clear confirmation, so that I know it reached Héctor.
2. As a visitor, I want to be told what is wrong before sending, so that I can fix the form without guessing.
3. As a visitor, I want a mail fallback when the server cannot deliver, so that my message is never lost.
4. As the site owner, I want bots to be silently ignored, so that my inbox is not flooded.
5. As a visitor, I want to switch between Spanish and English and keep my choice, so that the site feels native.
6. As a visitor using the sticky navigation, I want anchors to land below the header, so that titles are not hidden.
7. As a visitor with reduced-motion preferences, I want content visible without animation, so that the site stays accessible.

## Validation commands

```powershell
cd portfolio-frontend
$env:CHROME_BIN='C:\Program Files\Google\Chrome\Application\chrome.exe'
npx ng test --watch=false --browsers=ChromeHeadless
npx ng test --watch=false --browsers=ChromeHeadless --code-coverage
```

The same coverage command is available as:

```powershell
npm run test:coverage
```

## Task report

| Task | What was verified | Result |
|---|---|---|
| Contact form logic | Validation, error copy, honeypot, submit states, payload trimming, reset, in-flight guard | PASS |
| Contact form UI | Validation messages, ES labels, success/error panels, disabled button, character counter | PASS |
| Contact transport | Exact POST body to `contact.php`, success/error/timeout mapping, no-endpoint fallback | PASS |
| i18n | Browser detection, stored preference, invalid value, storage failure, toggle, SSR | PASS |
| Scroll reveal | Delay CSS variable, observer lifecycle, reduced motion, unsupported observer, SSR | PASS |
| Anchor scrolling | Sticky-header offset, default offset, top clamp, missing fragment/target, navigation event | PASS |

No production file was modified in this run. The first test execution exposed a test-isolation issue: the real `app-header` element was present in the document, so `document.querySelector('.header')` resolved it instead of the test fixture. The app spec now mocks that lookup explicitly; the production selector is unchanged.

## Coverage

```text
TOTAL: 71 SUCCESS

Statements   : 98.08% ( 154/157 )
Branches     : 93.61% ( 44/47 )
Functions    : 95.83% ( 23/24 )
Lines        : 97.94% ( 143/146 )
```

Per-file highlights:

| File | Statements | Branches | Functions | Lines |
|---|---:|---:|---:|---:|
| `core/services/contact.service.ts` | 100% | 100% | 100% | 100% |
| `shared/directives/scroll-reveal.directive.ts` | 100% | 100% | 100% | 100% |
| `core/services/translation.service.ts` | 100% | 92.3% | 100% | 100% |
| `components/contact/contact.component.ts` | 96% | 92.3% | 87.5% | 95.91% |
| `app.component.ts` | 95% | 80% | 100% | 95% |

## Known gaps

- `ContactComponent.openMailto` is spied in the fallback tests so the test runner is not
  navigated to a `mailto:` URL. The real navigation was exercised in the manual
  Playwright run against the PHP endpoint and in the live site.
- The server-side early return of `AppComponent.scrollToFragment` is not exercised by the
  browser suite. The SSR-safe path of `TranslationService` is covered.
- One boolean operand inside `TranslationService.detectLanguage` remains unexercised;
  every observable outcome (stored `en`/`es`, invalid value, browser locale, storage
  failure) is covered.
- `main.ts`, `server.ts` and `app.routes.ts` are outside the instrumented test bundle.

## Verification report

```text
VERIFICATION REPORT
==================

Build:     PASS  (ng build --configuration production, 4 routes prerendered)
Types:     PASS  (tsc app + spec, 0 errors)
Lint:      N/A   (no lint script configured)
Tests:     PASS  (71/71, statements 98.08%, branches 93.61%, functions 95.83%, lines 97.94%)
Security:  PASS  (no secrets, API keys or console.log in src/public)
Diff:      5 spec files + package.json + this report

Overall:   READY
```

## Test specification

| # | What is guaranteed | Test file | Type | Result |
|---|---|---|---|---|
| 1 | The form starts empty, invalid and idle | `contact.component.spec.ts` | unit | PASS |
| 2 | Required, email, min-length and max-length errors return the right copy | `contact.component.spec.ts` | unit | PASS |
| 3 | An invalid submit marks fields touched and never calls the service | `contact.component.spec.ts` | unit | PASS |
| 4 | A filled honeypot fakes success without sending | `contact.component.spec.ts` | unit | PASS |
| 5 | A whitespace-only honeypot is ignored | `contact.component.spec.ts` | unit | PASS |
| 6 | A valid submit trims the payload and resets the form on success | `contact.component.spec.ts` | unit | PASS |
| 7 | The fallback builds a complete `mailto:` and opens it | `contact.component.spec.ts` | unit | PASS |
| 8 | A failed send shows the error state without opening mail | `contact.component.spec.ts` | unit | PASS |
| 9 | A second submit while sending is ignored | `contact.component.spec.ts` | unit | PASS |
| 10 | Reset returns to the idle form | `contact.component.spec.ts` | unit | PASS |
| 11 | The DOM renders validation copy, ES labels, success/error panels, the disabled button and the counter | `contact.component.spec.ts` | integration | PASS |
| 12 | The service posts the exact payload to `contact.php` | `contact.service.spec.ts` | unit | PASS |
| 13 | Boolean and string success responses map to `sent` | `contact.service.spec.ts` | unit | PASS |
| 14 | Rejections, HTTP failures and timeouts map to `error` | `contact.service.spec.ts` | unit | PASS |
| 15 | An empty endpoint returns `fallback` without a request | `contact.service.spec.ts` | unit | PASS |
| 16 | Language detection honours browser locale and stored preference | `translation.service.spec.ts` | unit | PASS |
| 17 | Toggling persists the language and updates `<html lang>` | `translation.service.spec.ts` | unit | PASS |
| 18 | Storage failures do not break language switching | `translation.service.spec.ts` | unit | PASS |
| 19 | SSR stays in English and does not touch storage or the document | `translation.service.spec.ts` | unit | PASS |
| 20 | Reveal applies its delay, observes the host and disconnects after intersecting | `scroll-reveal.directive.spec.ts` | unit | PASS |
| 21 | Reduced motion and unsupported browsers show content immediately | `scroll-reveal.directive.spec.ts` | unit | PASS |
| 22 | The directive is inert during SSR | `scroll-reveal.directive.spec.ts` | unit | PASS |
| 23 | Anchors scroll below the sticky header, clamp at zero and ignore missing targets | `app.component.spec.ts` | integration | PASS |
| 24 | A navigation ending with a fragment triggers the scroll | `app.component.spec.ts` | integration | PASS |
