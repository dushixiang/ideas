const btn = document.getElementById('btn');
const clicksEl = document.getElementById('clicks');
const comboEl = document.getElementById('combo');
const toast = document.getElementById('toast');
const globalEl = document.getElementById('global');

let clicks = 0;
let combo = 0;
let bg = '';
let counterTimer = null;
let audioCtx = null;
let magnifier = null;
let runawayActive = false;
let comboTimer = null;

const colors = [
  '#ffedd5', '#fee2e2', '#e0e7ff', '#dcfce7', '#fef3c7', '#fce7f3', '#e5e7eb',
  '#d1fae5', '#fde68a', '#c7d2fe', '#fecaca', '#f3e8ff'
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function playWeirdSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!audioCtx) audioCtx = new AudioCtx();
    const ctx = audioCtx;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = pick(['sine', 'square', 'sawtooth', 'triangle']);
    o.frequency.value = 140 + Math.random() * 600;
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 3 + Math.random() * 12;
    lfoGain.gain.value = 60 + Math.random() * 240;
    lfo.connect(lfoGain).connect(o.frequency);
    g.gain.value = 0.0001;
    o.connect(g).connect(ctx.destination);
    o.start();
    lfo.start();
    const attack = 0.02;
    const decay = 0.5 + Math.random() * 0.6;
    const now = ctx.currentTime;
    g.gain.exponentialRampToValueAtTime(0.4, now + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, now + attack + decay);
    setTimeout(() => {
      try { o.stop(); lfo.stop(); } catch {}
      o.disconnect(); lfo.disconnect(); g.disconnect();
    }, (attack + decay) * 1000 + 80);
  } catch {}
}

function fetchGlobalCount() {
  const local = Number(localStorage.getItem('ub_count') || '0');
  const jitter = Math.floor(Math.random() * 7);
  const approximate = Math.max(local, 0) + 5482 + jitter;
  globalEl.textContent = String(approximate);
  localStorage.setItem('ub_count', String(local + 1));
  toast.classList.remove('hidden');
  toast.classList.add('animate-pop');
  if (counterTimer) clearTimeout(counterTimer);
  counterTimer = setTimeout(() => {
    toast.classList.add('hidden');
  }, 1800);
}

function spawnCats() {
  const container = document.getElementById('cat-layer');
  const count = 3 + Math.floor(Math.random() * 4);
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'pixel-cat';
    el.style.left = `${Math.random() * 100}%`;
    el.style.animationDelay = `${Math.random() * 0.4}s`;
    el.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
    container.appendChild(el);
    const remove = () => el.remove();
    el.addEventListener('animationend', remove);
    setTimeout(remove, 4000);
  }
}

function showNonsense() {
  const container = document.getElementById('toast-layer');
  const sayings = [
    '宇宙在打喷嚏', '像素在开会', '按钮说它累了', '喵星人批准了你', '泡泡：啪！',
    '这下厉害了', '你刚触发了彩虹协议', '一切尽在不言中', '啊对对对', '电波对齐成功'
  ];
  const el = document.createElement('div');
  el.textContent = sayings[Math.floor(Math.random() * sayings.length)];
  el.className = 'animate-pop';
  el.style.position = 'absolute';
  el.style.left = `${10 + Math.random() * 80}%`;
  el.style.top = `${10 + Math.random() * 60}%`;
  el.style.background = '#111827';
  el.style.color = 'white';
  el.style.padding = '6px 10px';
  el.style.borderRadius = '999px';
  el.style.fontSize = '12px';
  el.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
  container.appendChild(el);
  setTimeout(() => el.remove(), 1800);
}

function screenShake() {
  const root = document.documentElement;
  root.classList.add('shake-anim');
  setTimeout(() => root.classList.remove('shake-anim'), 520);
}

function jellyButton() {
  btn.classList.remove('jelly-anim');
  void btn.offsetHeight;
  btn.classList.add('jelly-anim');
  setTimeout(() => btn.classList.remove('jelly-anim'), 650);
}

function buttonSizeToggle() {
  btn.classList.remove('btn-small', 'btn-large', 'btn-xlarge');
  const sizes = ['btn-small', 'btn-large', 'btn-xlarge'];
  const pickSize = sizes[Math.floor(Math.random() * sizes.length)];
  btn.classList.add(pickSize);
  setTimeout(() => {
    btn.classList.remove('btn-small', 'btn-large', 'btn-xlarge');
  }, 1500);
}

function rtlFlip() {
  const html = document.documentElement;
  const oldDir = html.getAttribute('dir');
  html.setAttribute('dir', oldDir === 'rtl' ? 'ltr' : 'rtl');
  setTimeout(() => html.setAttribute('dir','ltr'), 1400);
}

function rainbowSweep() {
  const id = 'rainbow-bar';
  const exists = document.getElementById(id);
  if (exists) exists.remove();
  const bar = document.createElement('div');
  bar.id = id;
  bar.className = 'rainbow-bar';
  document.body.appendChild(bar);
  setTimeout(() => bar.remove(), 1600);
}

function crtOverlay() {
  const layerId = 'crt-layer';
  const prev = document.getElementById(layerId);
  if (prev) prev.remove();
  const el = document.createElement('div');
  el.id = layerId;
  el.className = 'crt-filter';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2000);
}

function invertFlash() {
  const html = document.documentElement;
  html.classList.add('invert-now');
  setTimeout(() => html.classList.remove('invert-now'), 180);
}

function confetti() {
  const root = document.body;
  const count = 16 + Math.floor(Math.random() * 16);
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    const x = (window.innerWidth / 2) + (Math.random() * 40 - 20);
    const y = (window.innerHeight / 2);
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    const dx = (Math.random() * 2 - 1) * 220;
    const dy = 60 + Math.random() * 160;
    const rot = (Math.random() * 2 - 1) * 360;
    const color = `hsl(${Math.floor(Math.random() * 360)} 90% 60%)`;
    el.style.setProperty('--dx', `${dx}px`);
    el.style.setProperty('--dy', `${dy}px`);
    el.style.setProperty('--rot', `${rot}deg`);
    el.style.background = color;
    root.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }
}

function runawayButton() {
  if (runawayActive) return;
  runawayActive = true;
  const onMove = (e) => {
    const rect = btn.getBoundingClientRect();
    const mx = e.clientX;
    const my = e.clientY;
    const padding = 80;
    const nearX = mx > rect.left - padding && mx < rect.right + padding;
    const nearY = my > rect.top - padding && my < rect.bottom + padding;
    if (nearX && nearY) {
      const dx = (Math.random() * 2 - 1) * 160;
      const dy = (Math.random() * 2 - 1) * 120;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    }
  };
  const stop = () => {
    runawayActive = false;
    btn.style.transform = '';
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('click', stop);
    window.removeEventListener('keydown', stop);
  };
  window.addEventListener('mousemove', onMove);
  window.addEventListener('click', stop);
  window.addEventListener('keydown', stop);
  setTimeout(stop, 2000);
}

function typingRain() {
  const root = document.getElementById('rain-layer') || document.body;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@*&%你好按钮喵哈?'.split('');
  const count = 20 + Math.floor(Math.random() * 20);
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'rain-char';
    el.textContent = chars[Math.floor(Math.random() * chars.length)];
    const x = Math.random() * window.innerWidth;
    el.style.left = `${x}px`;
    el.style.color = `hsl(${Math.floor(Math.random() * 360)} 90% 55%)`;
    el.style.setProperty('--dur', `${1800 + Math.random() * 1800}ms`);
    root.appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }
}

function textSwap() {
  const phrases = [
    '红鲤鱼与绿鲤鱼与驴',
    '黑化肥发灰会挥发',
    '楼上的楼下有个刘老六',
    '什么门永远关不上？球门',
    '什么鸡不会下蛋？飞机',
    '一只蚂蚁搬汉堡',
    '东边日出西边雨',
    '天上有个太阳饼',
    '啊？这就尴尬了',
    '今天按了没？'
  ];
  const original = '点我就知道';
  btn.textContent = phrases[Math.floor(Math.random() * phrases.length)];
  setTimeout(() => { btn.textContent = original; }, 1800);
}

function startMagnifier() {
  if (!magnifier) {
    magnifier = document.createElement('div');
    magnifier.className = 'magnifier';
    magnifier.innerHTML = '<div class="mag-content"></div>';
    document.body.appendChild(magnifier);
  }
  magnifier.classList.add('active');
  const onMove = (e) => {
    const x = e.clientX - 80;
    const y = e.clientY - 80;
    magnifier.style.left = `${x}px`;
    magnifier.style.top = `${y}px`;
    magnifier.style.setProperty('--mx', `${e.clientX}px`);
    magnifier.style.setProperty('--my', `${e.clientY}px`);
  };
  window.addEventListener('mousemove', onMove);
  const stop = () => {
    magnifier.classList.remove('active');
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('click', stop);
    window.removeEventListener('keydown', stop);
  };
  window.addEventListener('click', stop);
  window.addEventListener('keydown', stop);
  setTimeout(stop, 3000);
}

function emojiOrbit() {
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '50%';
  container.style.top = '50%';
  container.style.width = '0';
  container.style.height = '0';
  container.style.pointerEvents = 'none';
  btn.parentElement.appendChild(container);
  const emojis = ['✨','🎈','🧸','🍭','🐱','🪩','🌈','🧩'];
  const count = 6;
  for (let i = 0; i < count; i++) {
    const span = document.createElement('span');
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    span.style.position = 'absolute';
    const angle = (i / count) * Math.PI * 2;
    const radius = 70;
    span.style.transform = `translate(${Math.cos(angle)*radius}px, ${Math.sin(angle)*radius}px)`;
    span.style.transition = 'transform 1s ease';
    container.appendChild(span);
    setTimeout(() => {
      const a2 = angle + Math.PI * 2;
      span.style.transform = `translate(${Math.cos(a2)*radius}px, ${Math.sin(a2)*radius}px)`;
    }, 20);
  }
  setTimeout(() => container.remove(), 1100);
}

function bombEffect() {
  const original = btn.textContent;
  const seq = ['3','2','1','💥'];
  seq.forEach((t, i) => {
    setTimeout(() => {
      btn.textContent = t;
      if (t === '💥') {
        screenShake(); invertFlash(); confetti(); playWeirdSound();
      }
    }, i * 350);
  });
  setTimeout(() => { btn.textContent = original; }, (seq.length) * 350 + 300);
}

function showAward() {
  const titles = [
    '年度最会点按钮奖',
    '宇宙级无聊研究员',
    '鼠标狂点贡献勋章',
    '像素猫亲善大使',
    '彩带触发器大师'
  ];
  const layerId = 'award-layer';
  const old = document.getElementById(layerId);
  if (old) old.remove();
  const el = document.createElement('div');
  el.id = layerId;
  el.style.position = 'fixed';
  el.style.top = '16px';
  el.style.left = '50%';
  el.style.transform = 'translateX(-50%)';
  el.style.zIndex = '60';
  const inner = document.createElement('div');
  inner.className = 'animate-pop';
  inner.style.borderRadius = '999px';
  inner.style.background = 'rgba(255,255,255,0.9)';
  inner.style.backdropFilter = 'blur(6px)';
  inner.style.padding = '8px 16px';
  inner.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
  inner.style.display = 'flex';
  inner.style.alignItems = 'center';
  inner.style.gap = '6px';
  inner.innerHTML = `<span style="font-size:22px">🏅</span><span style="font-size:13px;font-weight:600">${titles[Math.floor(Math.random()*titles.length)]}</span>`;
  el.appendChild(inner);
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1800);
  confetti();
}

const effects = [
  () => { bg = pick(colors); document.body.style.backgroundColor = bg; },
  () => playWeirdSound(),
  () => fetchGlobalCount(),
  () => spawnCats(),
  () => screenShake(),
  () => jellyButton(),
  () => showNonsense(),
  () => confetti(),
  () => invertFlash(),
  () => runawayButton(),
  () => typingRain(),
  () => buttonSizeToggle(),
  () => rtlFlip(),
  () => rainbowSweep(),
  () => textSwap(),
  () => startMagnifier(),
  () => emojiOrbit(),
  () => bombEffect(),
  () => showAward()
];

function runRandomEffect() {
  if (Math.random() < 0.33) crtOverlay();
  const times = 1 + Math.floor(Math.random() * 3);
  for (let i = 0; i < times; i++) {
    const effect = pick(effects);
    effect();
  }
}

function onClick() {
  clicks += 1;
  combo += 1;
  clicksEl.textContent = String(clicks);
  comboEl.textContent = combo > 1 ? `· 连击 x${combo}` : '';
  if (navigator.vibrate) {
    try { navigator.vibrate([8, 10, 8]); } catch {}
  }
  runRandomEffect();
  if (comboTimer) clearTimeout(comboTimer);
  comboTimer = setTimeout(() => { combo = 0; comboEl.textContent = ''; }, 1200);
}

btn.addEventListener('click', onClick);
