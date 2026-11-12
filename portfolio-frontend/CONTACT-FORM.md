# Formulario de contacto

## Cómo funciona

El formulario hace un `POST` en JSON al script **`contact.php`**, que vive en la
misma carpeta que `index.html`. Ese script valida los datos y envía el mensaje
con el servidor de correo de LucusHost a `hectormadrisanch@gmail.com`.

No hay servicios de terceros ni cuentas externas: el correo sale desde tu
propio dominio.

Campos que ve el visitante:

| Campo | Obligatorio | Validación |
|---|---|---|
| Nombre | Sí | 2–80 caracteres |
| ¿Por qué quieres contactarme? | Sí | 20–1200 caracteres |
| Email | Sí | formato de email |

Además viaja un campo honeypot oculto (`_honey`) que el script descarta si un
bot lo rellena.

## Qué contiene `contact.php`

- Solo acepta `POST` (y `OPTIONS` para el navegador).
- Acepta JSON o un POST de formulario clásico.
- Valida nombre, email y longitud del mensaje en el servidor.
- Bloquea inyección de cabeceras (`\r` y `\n`).
- Envía con `mail()` usando `web@hectormadrigal.es` como remitente y el email
  del visitante como `Reply-To`.
- Devuelve `{ "success": true }` o un error con mensaje.

### Cambiar el destino o el remitente

Todo está en las tres primeras constantes del archivo:

```php
const RECIPIENT   = 'hectormadrisanch@gmail.com';
const SENDER      = 'web@hectormadrigal.es';
const SENDER_NAME = 'Portfolio hectormadrigal.es';
```

`SENDER` debe ser una dirección del dominio (`@hectormadrigal.es`) para que el
registro SPF del hosting valide el envío y no acabe en spam.

## Si el correo no llega

1. Revisa la carpeta de **spam** de Gmail y marca el primer mensaje como «No es
   spam».
2. Comprueba que el archivo `contact.php` está en `public_html` y que se ejecuta
   (abre `https://hectormadrigal.es/contact.php` en el navegador: debe responder
   un JSON de error de método, no mostrar el código fuente).
3. Si el hosting tuviera `mail()` deshabilitado, se puede cambiar a SMTP con
   PHPMailer usando una cuenta de correo del propio cPanel. Avísame y lo cambio.

## Fallback en la interfaz

Si el envío falla (servidor caído, sin red…), el formulario nunca pierde el
texto: muestra un aviso y ofrece un enlace `mailto:` con asunto y cuerpo ya
rellenados.

## Dónde tocar el diseño

- Tokens globales: `src/styles.scss`.
- Textos ES/EN: `src/app/core/i18n/es.ts` y `en.ts`.
- Estados del formulario: `src/app/components/contact/contact.component.ts`.
