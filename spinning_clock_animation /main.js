// selectors
const ringS = document.getElementById('ring-s');
const ringM = document.getElementById('ring-m');
const ringH = document.getElementById('ring-h');
const timeDisplay = document.getElementById('time-display');
const dateDisplay = document.getElementById('date-display');
const toggleBtn = document.getElementById('toggle');

// circumferences
const circumS = 440;
const circumM = 597;
const circumH = 754;

// helpers
function pad(n) { return String(n).padStart(2, '0'); }

function setRing(el, circ, value, max) {
  const progress = value / max;
  el.style.strokeDashoffset = circ - (circ * progress);
}

function tick() {
  const now = new Date();
  const s = now.getSeconds();
  const m = now.getMinutes();
  const h = now.getHours() % 12;

  // update rings
  setRing(ringS, circumS, s, 60);
  setRing(ringM, circumM, m, 60);
  setRing(ringH, circumH, h, 12);

  // update time display
  timeDisplay.textContent = `${pad(now.getHours())}:${pad(m)}:${pad(s)}`;

  // update date
  dateDisplay.textContent = now.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric'
  }).toUpperCase();
}

// dark mode
const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
  document.body.classList.add(storedTheme);
  toggleBtn.textContent = 'LIGHT MODE';
}

function handleToggle() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark-mode' : '');
  toggleBtn.textContent = isDark ? 'LIGHT MODE' : 'DARK MODE';
}

toggleBtn.addEventListener('click', handleToggle);

// start
tick();
setInterval(tick, 1000);