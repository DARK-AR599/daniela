# Proyecto de cumpleaños ♥

## Abrir en Visual Studio Code
1. Descomprime la carpeta y ábrela en VS Code (`Archivo > Abrir carpeta`).
2. Instala la extensión **Live Server** (te la sugiere sola).
3. Clic derecho en `index.html` > **Open with Live Server**.
   > Importante: la música de YouTube NO funciona abriendo el archivo directo (`file://`); usa Live Server o publícalo.

## Qué editar
Todo está en `js/config.js`:
- Nombre y palabras de la pantalla inicial (`PALABRAS_INTRO`).
- Las 10 fotos y las 10 frases (`PAGINAS`). El recuadro de arriba se adapta al largo de la frase.
- La letra de la canción (`LETRA`), línea por línea (con tiempo exacto opcional).
- Música: pon tu mp3 en `assets/musica/ayayay.mp3` (suena aunque abras el archivo directo). Si no está, usa YouTube (`VIDEO_MUSICA_ID`).
- Para sincronizar la letra: abre `sync.html`, pega la letra, pulsa Empezar y toca la barra espaciadora al inicio de cada línea; copia el resultado en `LETRA`.
- Enlace del dinosaurio / música (`VIDEO_MUSICA_ID`) y enlace del dinosaurio (`LINK_DINO`).
Los estilos están en `css/style.css`.

## Libro
- La portada (`TITULO_PORTADA`) se ve cerrada; al tocarla se abre y recién ahí aparecen las fotos. Las hojas se pasan una por una.
- Las hojas blancas (izquierda) tienen un espacio para escribir que se ajusta al largo del texto; lo escrito se guarda en el navegador.
- Para poner una imagen de fondo en todas las hojas blancas, guarda las imágenes en `assets/snopy/` y cambia `IMAGEN_HOJA` (acepta varias; también `OPACIDAD_FONDO` y `AJUSTE_FONDO`).

## QR para escanear
1. Publica la carpeta (gratis): arrástrala a https://app.netlify.com/drop o súbela a Vercel.
2. Abre `qr.html` (con Live Server), pega tu link público y pulsa **Generar**; luego **Descargar PNG**.

## Créditos
El dinosaurio animado es arte de @nagarnia_art (TikTok). Úsalo solo de forma personal o pide permiso a la artista.
