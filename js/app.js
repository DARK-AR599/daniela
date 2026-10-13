/* ============ utilidades ============ */
const $ = s => document.querySelector(s);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const N = CONFIG.PAGINAS.length;

function showStage(id){
  document.querySelectorAll('.stage').forEach(s => s.classList.toggle('on', s.id === id));
}

/* ============ música ============
   1) Si existe el archivo de CONFIG.AUDIO_LOCAL (mp3) se usa ese: funciona abriendo el proyecto directo, sin internet.
   2) Si no existe, se usa el video de YouTube (solo funciona con Live Server o publicado, no con file://). */
let player = null, playerReady = false, wantPlay = false, muted = false;
let audioEl = null, audioOk = false, audioFailed = !CONFIG.AUDIO_LOCAL;

if (CONFIG.AUDIO_LOCAL) {
  audioEl = new Audio();
  audioEl.loop = true; audioEl.preload = 'auto';
  audioEl.addEventListener('ended', () => { audioEl.currentTime = 0; audioEl.play().catch(() => {}); }); // vuelve a empezar siempre
  audioEl.addEventListener('canplay', () => { audioOk = true; if (playerReady) player.pauseVideo(); });
  audioEl.addEventListener('error', () => { audioFailed = true; audioOk = false; if (wantPlay && playerReady) player.playVideo(); });
  audioEl.src = CONFIG.AUDIO_LOCAL;
}
const useYT = () => audioFailed;

window.onYouTubeIframeAPIReady = () => {
  if (!CONFIG.VIDEO_MUSICA_ID) return;
  player = new YT.Player('yt', {
    width: 200, height: 120, videoId: CONFIG.VIDEO_MUSICA_ID,
    playerVars: { playsinline: 1, controls: 0, rel: 0, modestbranding: 1 },
    events: {
      onReady: () => { playerReady = true; if (wantPlay && useYT()) player.playVideo(); },
      onStateChange: e => { if (e.data === YT.PlayerState.ENDED) { player.seekTo(0); player.playVideo(); } }
    }
  });
};
function playMusic(){
  wantPlay = true;
  if (audioEl && !audioFailed) audioEl.play().catch(() => {});
  else if (playerReady) player.playVideo();
}
function musicTime(){
  if (audioEl && !audioFailed) return audioEl.currentTime || 0;
  return playerReady ? player.getCurrentTime() : null;
}
function musicDuration(){
  if (audioEl && !audioFailed && isFinite(audioEl.duration)) return audioEl.duration;
  return (player && player.getDuration && player.getDuration()) || 240;
}
$('#mute').onclick = () => {
  muted = !muted;
  if (audioEl) audioEl.muted = muted;
  if (playerReady) muted ? player.mute() : player.unMute();
  if (!muted) playMusic();
  $('#mute').textContent = muted ? '🔇' : '🔊';
};

/* ============ letra sincronizada (una línea a la vez, como en el video) ============ */
const lyricNow = $('#ly-now');
let lyricLines = [], lyricIdx = -2, lyricTimer = 0;
function buildLyrics(){
  $('#lyrics-title').textContent = '♪ ' + CONFIG.TITULO_LETRA;
  lyricLines = CONFIG.LETRA.map(l => typeof l === 'string' ? { texto: l, t: null } : l);
}
function lineTimes(){
  const dur = musicDuration(), n = lyricLines.length;
  return lyricLines.map((l, i) => l.t != null ? l.t : (i / n) * dur);
}
function showLyric(text){
  clearTimeout(lyricTimer);
  lyricNow.classList.remove('in');
  lyricTimer = setTimeout(() => {
    lyricNow.textContent = text || '';
    if (text) lyricNow.classList.add('in');
  }, text && lyricNow.textContent ? 220 : 0);
}
function syncLyrics(){
  const t = musicTime();
  if (t == null || !lyricLines.length) return;
  const times = lineTimes();
  let idx = -1;
  for (let i = 0; i < times.length; i++) if (t >= times[i]) idx = i;
  if (idx === lyricIdx) return;
  lyricIdx = idx;
  showLyric(idx >= 0 ? lyricLines[idx].texto : '');
}
setInterval(syncLyrics, 150);

/* ============ fondo de estrellas ============ */
const sc = $('#stars'), sx = sc.getContext('2d'); let stars = [];
function sizeStars(){
  sc.width = innerWidth; sc.height = innerHeight;
  stars = Array.from({ length: 140 }, () => ({ x: Math.random()*sc.width, y: Math.random()*sc.height, r: Math.random()*1.4+.3, p: Math.random()*6 }));
}
addEventListener('resize', sizeStars); sizeStars();
(function drawStars(t = 0){
  sx.clearRect(0, 0, sc.width, sc.height);
  stars.forEach(s => { sx.globalAlpha = .4 + .6*Math.abs(Math.sin(t/900 + s.p)); sx.fillStyle = '#fff'; sx.beginPath(); sx.arc(s.x, s.y, s.r, 0, 7); sx.fill(); });
  requestAnimationFrame(drawStars);
})();

/* corazones flotantes */
setInterval(() => {
  const f = document.createElement('span');
  f.textContent = '♥'; f.style.left = Math.random()*100 + 'vw';
  f.style.fontSize = (10 + Math.random()*18) + 'px'; f.style.animationDuration = (6 + Math.random()*6) + 's';
  $('#floaties').appendChild(f); setTimeout(() => f.remove(), 12000);
}, 900);

/* ============ lluvia rosa ============ */
const rc = $('#rain'), rx = rc.getContext('2d'); let drops = [], rainOn = false;
const GLYPHS = '01♥アイウエオカキクケコサシスセソ';
function sizeRain(){ rc.width = innerWidth; rc.height = innerHeight; drops = Array(Math.ceil(rc.width/16)).fill(0).map(() => Math.random()*-50); }
addEventListener('resize', sizeRain); sizeRain();
function drawRain(){
  if (!rainOn) return;
  rx.fillStyle = 'rgba(7,8,18,.12)'; rx.fillRect(0, 0, rc.width, rc.height);
  rx.fillStyle = '#ff4fa3'; rx.font = '15px monospace';
  drops.forEach((y, i) => {
    rx.fillText(GLYPHS[Math.floor(Math.random()*GLYPHS.length)], i*16, y*16);
    drops[i] = (y*16 > rc.height && Math.random() > .975) ? 0 : y + 1;
  });
  setTimeout(() => requestAnimationFrame(drawRain), 40);
}
async function flash(txt, ms){
  const b = $('#bigtext'); b.textContent = txt; b.classList.add('show'); await sleep(ms); b.classList.remove('show'); await sleep(250);
}
async function intro(){
  showStage('s-matrix'); rainOn = true; drawRain(); await sleep(900);
  for (const c of CONFIG.CUENTA_REGRESIVA) await flash(c, 750);
  for (const w of CONFIG.PALABRAS_INTRO) await flash(w, 1000);
  $('#bigheart').classList.add('show'); await sleep(1500);
  $('#bigheart').classList.remove('show'); await sleep(500);
  rainOn = false;
  sky();
}

/* ============ cielo + carta ============ */
function sky(){
  $('#sky-msg').textContent = CONFIG.MENSAJE_CIELO;
  $('#card-text').textContent = CONFIG.TEXTO_CARTA;
  showStage('s-sky');
}
$('#card').onclick = () => openBook(0);

/* ============ libro ============ */
// Hojas: [portada, foto1 ... fotoN]. Cada hoja tiene frente (derecha) y reverso (hoja blanca, izquierda).
// page = cuántas hojas ya están pasadas: 0 = libro cerrado, 1 = portada abierta (se ve foto 1), L = libro cerrado por atrás.
const book = $('#book'); let page = 0, leaves = [], busy = false, target = 0;
const L = N + 1, FLIP_MS = 1100, STEP_MS = 480;
const noteKey = i => 'cumple_nota_' + i;
const noteGet = i => { try { const v = localStorage.getItem(noteKey(i)); if (v) return v; } catch(e){} return (CONFIG.NOTAS && CONFIG.NOTAS[i]) || ''; };
const noteSet = (i, v) => { try { localStorage.setItem(noteKey(i), v); } catch(e){} };

function fitNote(ed){
  const box = ed.parentElement; let size = 26; ed.style.fontSize = size + 'px';
  const max = () => box.clientHeight - 14;
  while (size > 11 && ed.scrollHeight > max()) { size -= 1; ed.style.fontSize = size + 'px'; }
}
function fitAllNotes(){ document.querySelectorAll('.note').forEach(fitNote); }

function buildBook(){
  book.innerHTML = ''; leaves = []; page = 0; target = 0;
  for (let i = 0; i < L; i++) {
    const l = document.createElement('div'); l.className = 'leaf';
    const front = i === 0
      ? `<div class="face front cover"><div class="cover-in"><i>✦</i><h2>${CONFIG.TITULO_PORTADA}</h2><div class="cv-heart">♥</div><small>${CONFIG.SUBTITULO_PORTADA}</small></div></div>`
      : `<div class="face front"><img src="${CONFIG.PAGINAS[i-1].foto}" alt="Foto ${i}"></div>`;
    l.innerHTML = front + `<div class="face back"><div class="sheet-bg"></div><div class="note-box"><div class="note" contenteditable="true" spellcheck="false" data-ph="${CONFIG.PLACEHOLDER_NOTA}"></div></div><span class="pg">♥ ${i+1}</span></div>`;
    const fondos = [].concat(CONFIG.IMAGEN_HOJA || []).filter(Boolean);
    if (fondos.length) { const src = fondos[i % fondos.length], bg = l.querySelector('.sheet-bg'), t = new Image();
      t.onload = () => { bg.style.backgroundImage = `url("${src}")`; bg.style.backgroundSize = CONFIG.AJUSTE_FONDO || 'cover'; bg.style.opacity = CONFIG.OPACIDAD_FONDO ?? .45; }; t.src = src; }
    const ed = l.querySelector('.note'); ed.textContent = noteGet(i);
    ed.addEventListener('input', () => { if (!ed.textContent.trim()) ed.innerHTML = ''; noteSet(i, ed.innerText.replace(/\n$/, '')); fitNote(ed); });
    ed.addEventListener('paste', ev => { ev.preventDefault(); document.execCommand('insertText', false, (ev.clipboardData || window.clipboardData).getData('text')); });
    l.querySelector('.back').addEventListener('click', ev => { ev.stopPropagation(); if (ev.target.closest('.note-box')) return; goTo(i); });
    ed.addEventListener('click', ev => ev.stopPropagation());
    l.onclick = () => { l.classList.contains('flipped') ? goTo(i) : goTo(i + 1); };
    l.style.zIndex = L - i;
    book.appendChild(l); leaves.push(l);
  }
}
function fitPhrase(){
  const el = $('#phrase'), wrap = $('#phrase-wrap');
  let size = innerHeight < 520 ? 22 : 30; el.style.fontSize = size + 'px';
  while (size > 13 && el.scrollHeight > wrap.clientHeight + 1) { size -= 1; el.style.fontSize = size + 'px'; }
}
function setPhrase(text){
  const el = $('#phrase'); el.style.opacity = 0;
  setTimeout(() => { el.textContent = text; fitPhrase(); el.style.opacity = 1; }, 280);
}
// Aplica el estado actual: gira sólo las hojas que cambian, con la hoja en movimiento siempre por encima.
function render(dir){
  leaves.forEach((l, i) => {
    const f = i < page, was = l.classList.contains('flipped');
    const rest = f ? i + 1 : L - i;
    if (f !== was) {
      l.classList.toggle('flipped', f); l.classList.add('turning');
      l.style.zIndex = 200 + (dir > 0 ? L - i : i);
      clearTimeout(l._t); l._t = setTimeout(() => { l.style.zIndex = rest; l.classList.remove('turning'); }, FLIP_MS + 60);
    } else if (!l.classList.contains('turning')) l.style.zIndex = rest;
  });
  const shift = page === 0 ? -0.5 : page === L ? 0.5 : 0;
  book.style.transform = `translateX(calc(var(--pw) * ${shift}))`;
}
function showInfo(){
  setPhrase(page === 0 ? CONFIG.FRASE_PORTADA : page < L ? CONFIG.PAGINAS[page-1].frase : CONFIG.FRASE_FINAL);
  $('#counter').textContent = page === 0 ? '♥' : page < L ? `${page} / ${N}` : '♥';
  if (page === L) setTimeout(() => { if (page === L && !busy) heartFinale(); }, 3200);
}
// Siempre pasa hoja por hoja, aunque se pida saltar varias.
async function goTo(p){
  target = Math.max(0, Math.min(L, p));
  if (busy) return; busy = true;
  while (page !== target) {
    const dir = Math.sign(target - page); page += dir; render(dir);
    await sleep(page === target ? 0 : STEP_MS);
  }
  busy = false; showInfo();
}
function openBook(p){ buildBook(); showStage('s-book'); render(0); showInfo(); requestAnimationFrame(fitAllNotes); if (p) goTo(p); }
$('#prev').onclick = () => goTo(target - 1);
$('#next').onclick = () => target === L ? heartFinale() : goTo(target + 1);
addEventListener('keydown', e => {
  if (e.target.isContentEditable) return;
  if (e.key === 'ArrowRight') $('#next').click(); if (e.key === 'ArrowLeft') $('#prev').click();
});
addEventListener('resize', () => requestAnimationFrame(() => { fitAllNotes(); fitPhrase(); }));

/* ============ final: corazón de fotos ============ */
function heartFinale(){
  const cloud = $('#heart-cloud'); cloud.innerHTML = '';
  const M = 30, scale = Math.min(innerWidth * 0.94 / 36.6, innerHeight * 0.64 / 35), w = scale * 4.6, h = w * 1.35;
  const offY = innerHeight * 0.38 - 17.5 * scale + 12 * scale + h / 2; // el corazón queda arriba y deja sitio al mensaje
  for (let i = 0; i < M; i++) {
    const t = (i / M) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13*Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4*t));
    const d = document.createElement('div'); d.className = 'hc';
    d.style.cssText = `width:${w}px;height:${h}px;left:${innerWidth/2 + x*scale - w/2}px;top:${offY + y*scale - h/2}px;
      transform:rotate(${(Math.random()-.5)*30}deg);animation-delay:${-Math.random()*3}s;z-index:${Math.round(y)+30}`;
    d.innerHTML = `<img src="${CONFIG.PAGINAS[i % N].foto}" alt="">`;
    cloud.appendChild(d);
  }
  $('#end-msg').textContent = CONFIG.FRASE_FINAL;
  showStage('s-end');
}
$('#btn-back').onclick = () => { showStage('s-book'); goTo(N); };

/* ============ arranque ============ */
$('#dino-link').href = CONFIG.LINK_DINO;
buildLyrics();
$('#btn-start').onclick = () => { playMusic(); intro(); };
