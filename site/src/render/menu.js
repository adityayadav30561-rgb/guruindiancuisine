// Renders src/data/menu.js into HTML at build time (keeps the menu crawlable by Google).
const { food, drinks, wines, TAGS } = require('../data/menu.js');

const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const money = (n) => '$' + Number(n).toFixed(2);

const LABEL = { v: 'Vegan', vo: 'Vegan option', gf: 'Gluten free', nf: 'Nut free', df: 'Dairy free' };
const dtag = (k) => `<span class="dtag dtag-${k}" title="${esc(TAGS[k].name)}"><svg aria-hidden="true"><use href="#i-${k}"/></svg>${LABEL[k]}</span>`;

function tags(t) {
  if (!t.length) return '';
  return '<span class="mi-tags">' + t.map(dtag).join('') + '</span>';
}

function badge(b) {
  if (b === 'sig') return '<span class="mi-badge mi-badge-sig">Chef’s Signature</span>';
  if (b === 'pick') return '<span class="mi-badge mi-badge-pick">Chef’s Pick</span>';
  return '';
}

function item(it, priceText) {
  const price = priceText || money(it.p);
  const meta = badge(it.b) + tags(it.t || []);
  return `
        <article class="menu-item" data-tags="${(it.t || []).join(' ')}" data-name="${esc(it.n.toLowerCase())} ${esc((it.d || '').toLowerCase())}">
          <div class="mi-head"><h4 class="mi-name">${esc(it.n)}</h4><span class="mi-dots" aria-hidden="true"></span><span class="mi-price">${price}</span></div>
          ${it.d ? `<p class="mi-desc">${esc(it.d)}</p>` : ''}
          ${meta ? `<div class="mi-meta">${meta}</div>` : ''}
        </article>`;
}

function section(sec) {
  const img = sec.img
    ? `<figure class="plate menu-section-plate" data-ph="${esc(sec.title)}"><img src="/assets/img/${sec.img}.webp" alt="" width="1000" height="1000" loading="lazy"></figure>`
    : '';
  const body = sec.groups
    ? sec.groups.map((g) => `
        <h3 class="menu-group-title">${esc(g.title)}</h3>
        <div class="menu-items">${g.items.map((it) => item(it)).join('')}
        </div>`).join('')
    : `<div class="menu-items">${sec.items.map((it) => item(it)).join('')}
        </div>`;
  return `
    <section class="menu-section" id="${sec.id}" data-menu-section>
      <header class="menu-section-head${img ? '' : ' no-plate'}">
        ${img}
        <div>
          <h2 class="menu-section-title">${esc(sec.title)}</h2>
          ${sec.note ? `<p class="menu-note">${esc(sec.note)}</p>` : ''}
        </div>
      </header>${body}
    </section>`;
}

function nav(list) {
  return list.map((s) => `<a href="#${s.id}" data-menu-link>${esc(s.title)}</a>`).join('');
}

function wineSection(w) {
  if (w.small) {
    return `
        <h3 class="menu-group-title">${esc(w.title)}</h3>
        <div class="menu-items">${w.items.map((it) => item({ ...it, t: [] }, `${it.p.size} · ${money(it.p.price)}`)).join('')}
        </div>`;
  }
  const rows = w.items.map((it) => `
            <tr class="menu-item" data-tags="" data-name="${esc(it.n.toLowerCase())}">
              <th scope="row"><span class="mi-name">${esc(it.n)}</span><span class="mi-desc">${esc(it.d)}</span></th>
              <td>${money(it.p.glass150)}</td><td>${money(it.p.glass250)}</td><td>${money(it.p.bottle)}</td>
            </tr>`).join('');
  return `
        <h3 class="menu-group-title">${esc(w.title)}</h3>
        <div class="table-scroll">
        <table class="wine-table">
          <thead><tr><th scope="col">Wine</th><th scope="col">150ml</th><th scope="col">250ml</th><th scope="col">Bottle</th></tr></thead>
          <tbody>${rows}
          </tbody>
        </table>
        </div>`;
}

function winesBlock() {
  return `
    <section class="menu-section" id="wine" data-menu-section>
      <header class="menu-section-head no-plate">
        <div><h2 class="menu-section-title">Wine</h2><p class="menu-note">By the glass (150ml or 250ml) or by the bottle.</p></div>
      </header>${wines.map(wineSection).join('')}
    </section>`;
}

module.exports = {
  'menu-nav-food': () => nav(food),
  'menu-nav-drinks': () => nav([...drinks, { id: 'wine', title: 'Wine' }]),
  'menu-food': () => food.map(section).join(''),
  'menu-drinks': () => drinks.map(section).join('') + winesBlock(),
  'menu-count': () => String(food.reduce((n, s) => n + (s.groups ? s.groups.reduce((m, g) => m + g.items.length, 0) : s.items.length), 0)),
};
