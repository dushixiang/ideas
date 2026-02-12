const coin = document.getElementById('coin');
const shadow = document.getElementById('shadow');
const result = document.getElementById('result');
const headsEl = document.getElementById('heads');
const tailsEl = document.getElementById('tails');
const resetBtn = document.getElementById('reset');
const audioEl = document.getElementById('flip-audio');

let isFlipping = false;
let heads = parseInt(localStorage.getItem('coin_heads') || '0', 10) || 0;
let tails = parseInt(localStorage.getItem('coin_tails') || '0', 10) || 0;

headsEl.textContent = String(heads);
tailsEl.textContent = String(tails);

function playSound() {
  try {
    audioEl.pause();
    audioEl.currentTime = 0;
    void audioEl.play();
  } catch {}
}

function setResult(text) {
  result.textContent = text;
}

async function flip() {
  if (isFlipping) return;
  isFlipping = true;
  playSound();

  const isHeads = Math.random() < 0.5;
  const spins = 5 + Math.floor(Math.random() * 3);
  const finalOffset = isHeads ? 0 : 180;
  const totalRotateY = spins * 360 + finalOffset;
  const duration = 1600;
  const arcHeight = 230 + Math.random() * 40;
  const lateral = (Math.random() < 0.5 ? -1 : 1) * (20 + Math.random() * 40);

  coin.animate([
    { transform: 'rotateY(0deg) rotateX(0deg) rotateZ(0deg) translate(0, 0) scale(1)' },
    { transform: `rotateY(${totalRotateY}deg) rotateX(18deg) rotateZ(${6 * Math.sign(lateral)}deg) translate(${lateral}px, -${arcHeight}px) scale(1.25)` },
    { transform: `rotateY(${totalRotateY}deg) rotateX(0deg) rotateZ(0deg) translate(0, 0) scale(1)` }
  ], {
    duration,
    easing: 'ease-in-out',
    fill: 'forwards'
  });

  shadow.animate([
    { transform: 'translateX(0) scale(1)', opacity: 0.35 },
    { transform: `translateX(${lateral}px) scale(0.7)`, opacity: 0.12 },
    { transform: 'translateX(0) scale(1.15)', opacity: 0.45 },
  ], {
    duration,
    easing: 'ease-in-out',
    fill: 'forwards'
  });

  await new Promise((resolve) => setTimeout(resolve, duration));

  if (isHeads) {
    heads += 1;
    headsEl.textContent = String(heads);
    localStorage.setItem('coin_heads', String(heads));
    setResult('正面');
  } else {
    tails += 1;
    tailsEl.textContent = String(tails);
    localStorage.setItem('coin_tails', String(tails));
    setResult('反面');
  }

  coin.style.transform = `rotateY(${finalOffset}deg)`;
  shadow.style.transform = 'translateX(0) scale(1)';
  shadow.style.opacity = '0.35';
  isFlipping = false;
}

coin.addEventListener('click', flip);
coin.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    flip();
  }
});

resetBtn.addEventListener('click', () => {
  heads = 0;
  tails = 0;
  headsEl.textContent = '0';
  tailsEl.textContent = '0';
  localStorage.setItem('coin_heads', '0');
  localStorage.setItem('coin_tails', '0');
});
