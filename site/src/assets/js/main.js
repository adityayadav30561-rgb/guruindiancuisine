/* Guru's Indian Cuisine — site behaviour (no dependencies) */

// Opening hours, restaurant local time (Australia/Sydney). Day: 0 = Sunday.
// [open, close] in minutes after midnight; null = closed.
const HOURS = {
  0: [660, 1230], 1: [660, 1230], 2: null, 3: [660, 1230],
  4: [660, 1230], 5: [660, 1230], 6: [660, 1230],
};
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function sydneyNow() {
  const parts = new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Sydney', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false,
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t)?.value;
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  const mins = (Number(get('hour')) % 24) * 60 + Number(get('minute'));
  return { day, mins };
}

function fmt(mins) {
  const h = Math.floor(mins / 60), m = mins % 60;
  const h12 = ((h + 11) % 12) + 1;
  return `${h12}${m ? ':' + String(m).padStart(2, '0') : ''}${h < 12 ? 'am' : 'pm'}`;
}

function openStatus() {
  const { day, mins } = sydneyNow();
  const today = HOURS[day];
  if (today && mins >= today[0] && mins < today[1]) {
    return { open: true, text: `Open now · until ${fmt(today[1])}` };
  }
  if (today && mins < today[0]) {
    return { open: false, text: `Opens today at ${fmt(today[0])}` };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    if (HOURS[d]) {
      const when = i === 1 ? 'tomorrow' : DAY_NAMES[d];
      return { open: false, text: `Closed now · opens ${when} at ${fmt(HOURS[d][0])}` };
    }
  }
  return { open: false, text: 'Closed' };
}

// Simple rangoli / mandala drawn in SVG (decorative)
function mandalaSVG() {
  let petals = '', dots = '', outer = '';
  for (let i = 0; i < 16; i++) {
    const a = i * 22.5;
    petals += `<ellipse rx="9" ry="26" cy="-52" transform="rotate(${a})"/>`;
    dots += `<circle r="3.5" cy="-86" transform="rotate(${a + 11.25})" fill="currentColor"/>`;
    outer += `<path d="M0 -94 Q10 -108 0 -122 Q-10 -108 0 -94Z" transform="rotate(${a})"/>`;
  }
  return `<svg viewBox="-130 -130 260 260" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
    <circle r="14"/><circle r="22"/><circle r="74"/><circle r="98" stroke-dasharray="3 5"/>
    ${petals}${dots}${outer}</svg>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;

  // Mobile nav
  const toggle = document.querySelector('[data-nav-toggle]');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('.sr-only').textContent = open ? 'Close menu' : 'Open menu';
    });
    document.querySelectorAll('.main-nav a').forEach((a) =>
      a.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) toggle.click();
    });
  }

  // Header shadow on scroll
  const header = document.querySelector('[data-header]');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Missing images -> styled placeholder (until real photos are added)
  document.querySelectorAll('img').forEach((img) => {
    const mark = () => {
      const holder = img.closest('.plate, .photo');
      if (holder) { holder.classList.add('is-missing'); img.remove(); }
      else img.classList.add('is-missing');
    };
    if (img.complete && img.naturalWidth === 0) mark();
    else img.addEventListener('error', mark, { once: true });
  });

  // Decorative mandalas
  document.querySelectorAll('[data-mandala]').forEach((el) => (el.innerHTML = mandalaSVG()));

  // Open / closed status
  const status = openStatus();
  document.querySelectorAll('[data-open-status]').forEach((el) => {
    el.textContent = status.text;
    el.classList.add(status.open ? 'is-open' : 'is-closed');
  });

  // Highlight today in hours tables
  const { day } = sydneyNow();
  document.querySelectorAll('[data-hours] tr[data-day="' + day + '"]').forEach((tr) => tr.classList.add('is-today'));

  // Footer year
  document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

  root.classList.add('js');
});
