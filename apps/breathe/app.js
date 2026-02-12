const breath = document.getElementById('breath');
const phaseMain = document.getElementById('phase-main');
const phaseSub = document.getElementById('phase-sub');
const orbit = document.getElementById('orbit');
const haloOuter = document.getElementById('halo-outer');
const haloMid = document.getElementById('halo-mid');
const core = document.getElementById('core');

const phases = [
  { key: 'inhale', main: '吸气', sub: '跟随圆圈缓慢扩大', duration: 4 },
  { key: 'hold', main: '屏息', sub: '稳定保持短暂停留', duration: 2 },
  { key: 'exhale', main: '吐气', sub: '随圆圈收缩开始放松', duration: 4 }
];

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setupOrbit() {
  orbit.innerHTML = '';
  const count = 6;
  for (let i = 0; i < count; i += 1) {
    const dot = document.createElement('div');
    dot.className = 'absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-emerald-200/60';
    dot.dataset.angle = String((i * Math.PI * 2) / count);
    orbit.appendChild(dot);
  }
}

function updateOrbit(radius, active, duration) {
  const dots = orbit.querySelectorAll('div');
  dots.forEach((dot) => {
    const angle = Number(dot.dataset.angle || '0');
    const x = active ? Math.cos(angle) * radius : 0;
    const y = active ? Math.sin(angle) * radius : 0;
    dot.style.transition = `transform ${duration}s ease-in-out, opacity ${duration}s ease-in-out`;
    dot.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    dot.style.opacity = active ? '0.75' : '0.4';
  });
}

function resize() {
  const circle = Math.min(340, Math.max(160, Math.round(window.innerWidth * 0.28)));
  const size = `${circle}px`;
  [haloOuter, haloMid, core].forEach((el) => {
    el.style.width = size;
    el.style.height = size;
  });
  orbit.style.width = size;
  orbit.style.height = size;
}

setupOrbit();
resize();
window.addEventListener('resize', resize);

let index = 0;
let timer = null;

function setPhase(next) {
  const phase = phases[next];
  const duration = prefersReducedMotion ? 0.6 : phase.duration;

  phaseMain.textContent = phase.main;
  phaseSub.textContent = phase.sub;

  haloOuter.style.transition = `transform ${duration}s ease-in-out, opacity ${duration}s ease-in-out`;
  haloMid.style.transition = `transform ${duration}s ease-in-out, opacity ${duration}s ease-in-out`;
  core.style.transition = `transform ${duration}s ease-in-out`;

  if (phase.key === 'exhale') {
    haloOuter.style.transform = 'scale(1)';
    haloMid.style.transform = 'scale(1)';
    core.style.transform = 'scale(1)';
  } else {
    haloOuter.style.transform = 'scale(2.15)';
    haloMid.style.transform = 'scale(2)';
    core.style.transform = 'scale(1.8)';
  }

  const circle = parseFloat(haloOuter.style.width || '260');
  const radius = Math.round(circle * 0.8);
  updateOrbit(radius, phase.key !== 'exhale', duration);

  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    index = (index + 1) % phases.length;
    setPhase(index);
  }, phase.duration * 1000);
}

setPhase(index);
