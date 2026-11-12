# Despliegue en LucusHost (cPanel)

El despliegue sigue siendo el de siempre (build estático + `build.zip`), con un
archivo nuevo: `contact.php`, que da vida al formulario.

## 1. Generar el build

Desde `portfolio-frontend`:

```powershell
npx ng build --configuration production
```

El resultado queda en:

```
dist/portfolio-frontend/browser/
```

## 2. Crear el zip

El zip debe contener **el contenido** de `browser/`, no la carpeta en sí.
Incluye ya `contact.php` porque está en `public/` y Angular lo copia al build.

```powershell
Compress-Archive -Path "dist\portfolio-frontend\browser\*" `
                 -DestinationPath "build.zip" -Force
```

## 3. Subir por cPanel

1. cPanel → **Administrador de archivos** → `public_html`.
2. Sube `build.zip`.
3. Clic derecho → **Extraer**. Sobrescribe los archivos antiguos.
4. Borra `build.zip`.

## 4. Qué NO se toca

- **`.htaccess`**: ya está en `public_html` y sigue siendo el que resuelve las
  rutas de Angular. El zip no lo incluye, así que no se sobrescribe.
- El script `contact.php` es un archivo físico: la regla `!-f` del `.htaccess`
  deja que Apache lo ejecute en lugar de mandarlo a `index.html`.

## 5. Comprobar después de subir

```text
https://hectormadrigal.es/contact.php
```

Debe devolver un JSON como:

```json
{"success":false,"message":"Method not allowed."}
```

Si en su lugar ves el código PHP en texto plano, el hosting no está ejecutando
PHP en esa carpeta: avísame y lo revisamos.

Después abre la web, rellena el formulario y comprueba que el correo llega a
Gmail (mira spam la primera vez).

## 6. Caché

El `index.html` nuevo apunta a los JS con hash nuevo, pero algunos `.htaccess`
cachean HTML de forma agresiva. Si tras subir ves la versión antigua, fuerza
recarga con `Ctrl + F5` o prueba en una ventana de incógnito.

## Volver atrás

Guarda el `build.zip` anterior antes de sobrescribir. Para revertir, extrae ese
zip en `public_html` y listo.
