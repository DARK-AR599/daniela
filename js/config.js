// =====================================================================
//  CONFIGURACIÓN — todo lo que quieras cambiar está en este archivo
// =====================================================================
const CONFIG = {

  // ---- Música (YouTube, se reproduce en todo el proyecto) ----
  VIDEO_MUSICA_ID: "",   // opcional: ID de YouTube de respaldo (vacío = solo se usa el mp3)
  // Audio local (RECOMENDADO): guarda tu mp3 en assets/musica/ayayay.mp3 y se escuchará aunque abras el archivo directo.
  // Si el archivo no existe, se usa el video de YouTube (requiere Live Server o publicar la carpeta).
  AUDIO_LOCAL: "assets/musica/ayayay.mp3",

  // ---- Dinosaurio del recuadro de arriba: al tocarlo abre esta canción ----
  LINK_DINO: "https://www.youtube.com/watch?v=WfRjnFESY3M",

  // ---- Pantalla inicial (lluvia rosa). Cada palabra aparece una tras otra ----
  CUENTA_REGRESIVA: ["3", "2", "1"],
  PALABRAS_INTRO: ["ESTE", "MOMENTO", "ES ", "SOLO PARA TI"],

  // ---- Mensaje del cielo estrellado y de la carta ----
  MENSAJE_CIELO: "Hice algo especial para ti ✨",
  TEXTO_CARTA: "Toca para abrir",

  // ---- Las 10 hojas del libro: foto + frase del recuadro de arriba ----
  // Puedes cambiar las frases (cortas o largas, el cuadro se adapta).
  // Para cambiar una foto, reemplaza el archivo en assets/fotos/ o cambia "foto".
  PAGINAS: [
    { foto: "assets/fotos/foto01.jpg", frase: "Un pedacito de mí para ti ♥" },
    { foto: "assets/fotos/foto02.jpg", frase: "Cada foto guarda un momento contigo" },
    { foto: "assets/fotos/foto03.jpg", frase: "Tu sonrisa es mi parte favorita del día" },
    { foto: "assets/fotos/foto04.jpg", frase: "Contigo hasta lo simple se vuelve especial" },
    { foto: "assets/fotos/foto05.jpg", frase: "Gracias por existir" },
    { foto: "assets/fotos/foto06.jpg", frase: "Si me preguntan qué es la felicidad, pienso en ti y en todos los días que todavía nos faltan por vivir" },
    { foto: "assets/fotos/foto07.jpg", frase: "Eres mi luna 🌙" },
    { foto: "assets/fotos/foto08.jpg", frase: "Que este año te llene de todo lo bonito" },
    { foto: "assets/fotos/foto09.jpg", frase: "No cambiaría ni un solo momento" },
    { foto: "assets/fotos/foto10.jpg", frase: "Te quiero muchísimo ♥" }
  ],
  FRASE_FINAL: "Los detalles no tienen fecha, solo intención ♥",   // se ve al cerrar el libro y en la pantalla final

  // ---- Portada del libro (se ve cerrado; al tocarla se abre y recién ahí aparecen las fotos) ----
  TITULO_PORTADA: "Para ti",
  SUBTITULO_PORTADA: "Toca para abrir",
  FRASE_PORTADA: "Abre el libro ♥",

  // ---- Hojas blancas (lado izquierdo de cada página) ----
  // Imágenes de FONDO de las hojas blancas. Guárdalas en assets/snopy/ y pon aquí las rutas.
  // Se reparten en orden por las hojas (puedes poner una sola o las que quieras).
  IMAGEN_HOJA: [
    "assets/snopy/snopy01.jpg", "assets/snopy/snopy02.jpg", "assets/snopy/snopy03.jpg", "assets/snopy/snopy04.jpg",
    "assets/snopy/snopy05.jpg", "assets/snopy/snopy06.jpg", "assets/snopy/snopy07.jpg", "assets/snopy/snopy08.jpg",
    "assets/snopy/snopy09.jpg", "assets/snopy/snopy10.jpg"
  ],   // 11 hojas blancas y 10 fondos: la última vuelve a usar el primero
  OPACIDAD_FONDO: 1,      // 0 a 1: qué tan fuerte se ve el fondo detrás del texto
  AJUSTE_FONDO: "cover",  // "cover" = llena toda la hoja; "contain" = se ve completa sin recortar
  // Textos iniciales opcionales de cada hoja blanca (11 hojas: la de la portada + una por foto).
  // Se pueden editar tocando la hoja; lo escrito se guarda en el navegador.
  NOTAS: ["Eres mi lugar favorito en este mundo 🌎❤️",
  "Mi corazón te eligió y no deja de elegirte 💖✨",
  "Contigo descubrí un amor que no sabía que existía 🌹🥰",
  "Cada día te amo un poco más que el anterior 🌅💞",
  "Tu sonrisa es mi momento favorito del día 😊🌻",
  "No necesito mucho, solo tu compañía y tu amor 🤍🌙",
  "Eres la razón de muchas de mis sonrisas 😍🌈",
  "Mi amor por ti no se explica, se siente 💓🔥",
  "Gracias por llegar a mi vida y hacerla más bonita 🌷💫",
  "Si volviera a elegir, te elegiría una y mil veces 💍❤️",
  "Eres mi presente, mi alegría y mi sueño más bonito 🌟🫶"],
  PLACEHOLDER_NOTA: "Escribe aquí ♥",

  // ---- Letra de la canción (panel izquierdo del libro) ----
  // Pega aquí la letra, una línea por elemento.
  //  • Solo texto  -> se reparte automáticamente a lo largo de la canción (poco preciso).
  //  • Para sincronizar fácil: abre sync.html, pega la letra y toca una tecla en cada línea; te da este bloque listo.
  //  • { t: 23.5, texto: "..." } -> aparece exactamente en el segundo 23.5 (sincronía exacta).
 
        LETRA: [
    { t: 16.3, texto: "No sé lo que estoy sintiendo" },
    { t: 20.0, texto: "Creo que me estoy enamorando de ti" },
    { t: 25.0, texto: "Me gustas pa' mí" },
    { t: 29.2, texto: "¿Será que tú también lo sientes?" },
    { t: 32.5, texto: "¿Tampoco salgo de tu mente?" },
    { t: 35.8, texto: "Dime si es así" },
    { t: 39.5, texto: "Y vámonos de aquí" },
    { t: 45.0, texto: "Ayayay yayay" },
    { t: 46.0, texto: "Neta yo no quiero a nadie más" },
    { t: 48.9, texto: "Aunque a veces el destino se equivoca" },
    { t: 51.9, texto: "Quiero hacer la prueba besando tu boca" },
    { t: 55.9, texto: "Ayayay yayay" },
    { t: 58.8, texto: "Ya me vi chismeando con tu ama" },
    { t: 62.0, texto: "No es ningún secreto que te traigo loca" },
    { t: 65.1, texto: "Ven y toma el riesgo, bésame en la boca" },
    { t: 82.5, texto: "No sé lo que estoy sintiendo" },
    { t: 85.8, texto: "Creo que me estoy enamorando de ti" },
    { t: 89.1, texto: "Me gustas pa' mí" },
    { t: 95.3, texto: "En el pasado ya te hicieron mucho daño" },
    { t: 98.7, texto: "Te traicionaron, decepcionaron" },
    { t: 102.0, texto: "Aquí no va a pasar, déjate cuidar" },
    { t: 105.8, texto: "Si tienes frío, yo te lo puedo quitar" },
    { t: 109.3, texto: "Ayayay yayay" },
    { t: 112.9, texto: "Neta yo no quiero a nadie más" },
    { t: 114.9, texto: "Aunque a veces el destino se equivoca" },
    { t: 118.2, texto: "Quiero hacer la prueba besando tu boca" },
    { t: 122.0, texto: "Ayayay yayay" },
    { t: 124.8, texto: "Ya te vi chismeando con mi ama" },
    { t: 128.3, texto: "No es ningún secreto que te traigo loca" },
    { t: 131.3, texto: "Ven y toma el riesgo, bésame en la boca" },
    { t: 138.1, texto: "Yo, que no me suelo enamorar" },
    { t: 141.5, texto: "Pero tienes unos ojitos tan bellos" },
    { t: 144.6, texto: "Porfa, dame chance de perderme en ellos" },
    { t: 148.2, texto: "Ayayay yayay" },
    { t: 151.1, texto: "(No quiero a nadie más si tú no estás)" },
    { t: 153.3, texto: "Ayayay yayay" },
    { t: 156.1, texto: "(No quiero a nadie más si tú no estás aquí, mi amor...)" },
  ],
  TITULO_LETRA: "Ayayay — Jorge Cuellar"
};
