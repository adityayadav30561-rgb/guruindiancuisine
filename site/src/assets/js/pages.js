/* Guru's Indian Cuisine: page features (menu filters, booking + contact forms). No dependencies. */

const SITE = {
  email: 'gurusindiancuisine@gmail.com',
  phone: '(02) 6613 0600',
  // When a form service is set up (e.g. Formspree, Web3Forms, or a PHP mail script on the host),
  // put its URL here. Until then, forms open the guest's email app with the details filled in.
  formEndpoint: '',
};

/* ---------------- Menu page ---------------- */
function initMenu() {
  const tabs = document.querySelectorAll('[data-tab]');
  if (!tabs.length) return;

  const panels = document.querySelectorAll('[data-panel]');
  const navs = document.querySelectorAll('[data-menu-nav]');
  const chips = document.querySelectorAll('[data-diet]');
  const search = document.querySelector('[data-menu-search]');
  const empty = document.querySelector('[data-menu-empty]');
  const params = new URLSearchParams(location.search);
  const active = new Set((params.get('diet') || '').split(',').filter(Boolean));
  let current = 'food';

  const panel = () => document.querySelector(`[data-panel="${current}"]`);

  function setTab(name, updateUrl = true) {
    current = name;
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === name)));
    panels.forEach((p) => (p.hidden = p.dataset.panel !== name));
    navs.forEach((n) => (n.hidden = n.dataset.menuNav !== name));
    if (updateUrl) {
      const u = new URL(location.href);
      if (name === 'drinks') u.searchParams.set('tab', 'drinks'); else u.searchParams.delete('tab');
      u.hash = '';
      history.replaceState(null, '', u);
    }
    apply();
  }

  function apply() {
    const q = (search?.value || '').trim().toLowerCase();
    const useDiet = current === 'food' && active.size > 0;
    let shown = 0;
    panel().querySelectorAll('[data-menu-section]').forEach((sec) => {
      let secShown = 0;
      sec.querySelectorAll('.menu-item').forEach((item) => {
        const tags = item.dataset.tags.split(' ');
        const dietOk = !useDiet || [...active].every((d) => tags.includes(d) || (d === 'v' && tags.includes('vo')));
        const textOk = !q || item.dataset.name.includes(q);
        item.hidden = !(dietOk && textOk);
        if (!item.hidden) secShown++;
      });
      // hide empty sub-groups (breads, wine types)
      sec.querySelectorAll('.menu-group-title').forEach((h) => {
        const block = h.nextElementSibling;
        const any = block && block.querySelector('.menu-item:not([hidden])');
        h.hidden = !any;
        if (block) block.hidden = !any;
      });
      sec.hidden = secShown === 0;
      const link = document.querySelector(`[data-menu-link][href="#${sec.id}"]`);
      if (link) link.hidden = sec.hidden;
      shown += secShown;
    });
    if (empty) empty.hidden = shown > 0;
    chips.forEach((c) => c.setAttribute('aria-pressed', String(active.has(c.dataset.diet))));
    const u = new URL(location.href);
    if (active.size) u.searchParams.set('diet', [...active].join(',')); else u.searchParams.delete('diet');
    if (u.href !== location.href) history.replaceState(null, '', u);
  }

  tabs.forEach((t) => t.addEventListener('click', () => setTab(t.dataset.tab)));
  chips.forEach((c) => c.addEventListener('click', () => {
    const d = c.dataset.diet;
    active.has(d) ? active.delete(d) : active.add(d);
    if (current !== 'food') setTab('food'); else apply();
  }));
  search?.addEventListener('input', apply);
  document.querySelector('[data-clear-filters]')?.addEventListener('click', () => {
    active.clear(); if (search) search.value = ''; apply();
  });
  document.querySelector('[data-print]')?.addEventListener('click', () => window.print());

  // keyboard: arrow keys move between tabs
  document.querySelector('.menu-tabs')?.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const next = current === 'food' ? 'drinks' : 'food';
    setTab(next);
    document.querySelector(`[data-tab="${next}"]`).focus();
  });

  // initial state from URL (?tab=drinks, ?diet=v,gf, #section)
  const hashSec = location.hash && document.querySelector(location.hash);
  const startTab = params.get('tab') === 'drinks' || (hashSec && hashSec.closest('[data-panel="drinks"]')) ? 'drinks' : 'food';
  setTab(startTab, false);
  if (hashSec) requestAnimationFrame(() => hashSec.scrollIntoView());

  // Highlight the category in view and keep it visible in the scrolling bar
  const links = document.querySelectorAll('[data-menu-link]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((l) => {
        const on = l.getAttribute('href') === '#' + en.target.id;
        l.classList.toggle('is-active', on);
        if (on) {
          const nav = l.parentElement;
          nav.scrollTo({ left: l.offsetLeft - nav.clientWidth / 2 + l.clientWidth / 2, behavior: 'smooth' });
        }
      });
    });
  }, { rootMargin: '-35% 0px -60% 0px' });
  document.querySelectorAll('[data-menu-section]').forEach((s) => io.observe(s));
}

/* ---------------- Forms (booking + contact) ---------------- */
function sydneyToday() {
  const p = new Intl.DateTimeFormat('en-CA', { timeZone: 'Australia/Sydney', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  return p; // YYYY-MM-DD
}

function fieldError(input, msg) {
  const field = input.closest('.field');
  if (!field) return;
  field.classList.toggle('has-error', !!msg);
  let el = field.querySelector('.error');
  if (msg) {
    if (!el) { el = document.createElement('span'); el.className = 'error'; el.id = input.id + '-error'; field.appendChild(el); }
    el.textContent = msg;
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', el.id);
  } else {
    el?.remove();
    input.removeAttribute('aria-invalid');
  }
}

function validate(form) {
  let first = null;
  form.querySelectorAll('input, select, textarea').forEach((input) => {
    let msg = '';
    if (input.required && !input.value.trim()) msg = 'Please fill this in.';
    else if (input.type === 'email' && input.value && !/^\S+@\S+\.\S+$/.test(input.value)) msg = 'Please enter a valid email.';
    else if (input.type === 'tel' && input.value && input.value.replace(/\D/g, '').length < 8) msg = 'Please enter a valid phone number.';
    else if (input.type === 'date' && input.value) {
      if (input.value < sydneyToday()) msg = 'Please choose today or a future date.';
      else if (new Date(input.value + 'T12:00:00').getDay() === 2) msg = 'We’re closed on Tuesdays. Please choose another day.';
    }
    fieldError(input, msg);
    if (msg && !first) first = input;
  });
  if (first) first.focus();
  return !first;
}

function initForms() {
  const dateInput = document.querySelector('input[type="date"][data-booking-date]');
  if (dateInput) {
    dateInput.min = sydneyToday();
    dateInput.addEventListener('change', () => validate(dateInput.form));
  }

  document.querySelectorAll('form[data-form]').forEach((form) => {
    const status = form.querySelector('.form-status');
    form.setAttribute('novalidate', '');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validate(form)) return;

      const data = new FormData(form);
      const subject = form.dataset.subject || 'Website enquiry';
      const lines = [];
      form.querySelectorAll('[name]').forEach((el) => {
        if (el.type === 'hidden' || !el.value) return;
        const label = form.querySelector(`label[for="${el.id}"]`)?.textContent.replace('*', '').trim() || el.name;
        lines.push(`${label}: ${el.value}`);
      });

      if (SITE.formEndpoint) {
        try {
          data.append('_subject', subject);
          const res = await fetch(SITE.formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
          if (!res.ok) throw new Error(res.status);
          form.reset();
          status.className = 'form-status ok';
          status.textContent = form.dataset.success || 'Thanks! We’ve received your message.';
          status.hidden = false;
          return;
        } catch (err) { /* fall through to email */ }
      }

      const href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
      status.className = 'form-status warn';
      status.innerHTML = `Your email app should now open with your details filled in. Just press <strong>send</strong>. ` +
        `Nothing opened? Email <a href="${href}">${SITE.email}</a> or call <a href="tel:+61266130600">${SITE.phone}</a>.`;
      status.hidden = false;
      window.location.href = href;
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initForms();
});
