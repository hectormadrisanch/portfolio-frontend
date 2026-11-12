/**
 * Runtime configuration for the portfolio frontend.
 *
 * `contactEndpoint` receives the contact form POST. It points to the PHP
 * script deployed next to the Angular build (`public/contact.php`), which
 * relays the message to the inbox below from the LucusHost mail server.
 *
 * To switch providers just replace the URL: any POST that answers 2xx with
 * `{ "success": true }` works.
 */
export const environment = {
  contactEndpoint: 'contact.php',
};
