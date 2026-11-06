// Tiny zero-dependency static site builder for Guru's.
//   node build.js          -> builds src/ into dist/
//   node build.js --serve  -> builds, then serves dist/ on http://localhost:4321
//                             (rebuilds on every page request, so edits show on refresh)
//
// Pages live in src/pages/*.html. Each page starts with a meta comment:
//   <!--
//   title: Page title
//   description: Meta description
//   page: home            (matches data-nav="home" in the header to mark the active link)
//   -->
// The page body is inserted into src/layout.html at {{content}}; {{header}} and
// {{footer}} come from src/partials. Any {{key}} is replaced by that meta value.
//
// Output uses folder URLs: pages/menu.html -> dist/menu/index.html (served as /menu/).

const fs = require('fs');
const path = require('path');
const http = require('http');

const SRC = path.join(__dirname, 'src');
const DIST = path.join(__dirname, 'dist');
const PORT = Number(process.env.PORT) || 4321;

const read = (p) => fs.readFileSync(path.join(SRC, p), 'utf8');

function copyDir(from, to) {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, entry.name);
    const b = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(a, b);
    else fs.copyFileSync(a, b);
  }
}

function parseMeta(raw) {
  const m = raw.match(/^\s*<!--([\s\S]*?)-->\s*/);
  const meta = {};
  if (!m) return { meta, body: raw };
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body: raw.slice(m[0].length) };
}

function build() {
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });
  copyDir(path.join(SRC, 'assets'), path.join(DIST, 'assets'));
  copyDir(path.join(SRC, 'static'), DIST); // robots.txt, .htaccess, sitemap.xml, etc.

  // Fresh renderers/data every build (the dev server rebuilds on each request)
  for (const k of Object.keys(require.cache)) if (k.startsWith(SRC)) delete require.cache[k];
  const renderers = {};
  const renderDir = path.join(SRC, 'render');
  if (fs.existsSync(renderDir)) {
    for (const f of fs.readdirSync(renderDir)) Object.assign(renderers, require(path.join(renderDir, f)));
  }
  const render = (html) => html.replace(/<!--\s*render:([\w-]+)\s*-->/g, (m, name) => {
    if (!renderers[name]) throw new Error(`Unknown renderer "${name}"`);
    return renderers[name]();
  });

  const layout = read('layout.html');
  const partials = {
    header: read('partials/header.html'),
    footer: read('partials/footer.html'),
  };

  for (const file of fs.readdirSync(path.join(SRC, 'pages'))) {
    if (!file.endsWith('.html')) continue;
    const { meta, body } = parseMeta(read('pages/' + file));
    const name = file.replace(/\.html$/, '');
    meta.canonical = name === 'index' ? '/' : name === '404' ? '/404/' : `/${name}/`;
    meta.bodyClass = meta.bodyClass || `page-${meta.page || name}`;

    // Function replacers: page content contains "$" (prices) which string replacers would mangle.
    let html = layout
      .replace('{{header}}', () => partials.header)
      .replace('{{footer}}', () => partials.footer)
      .replace('{{content}}', () => render(body))
      .replace(/\{\{(\w+)\}\}/g, (_, k) => meta[k] ?? '');

    if (meta.page) {
      html = html.replace(
        new RegExp(`data-nav="${meta.page}"`, 'g'),
        `data-nav="${meta.page}" aria-current="page"`
      );
    }

    const out =
      name === 'index' ? path.join(DIST, 'index.html')
      : name === '404' ? path.join(DIST, '404.html')
      : path.join(DIST, name, 'index.html');
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
  }
}

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.pdf': 'application/pdf', '.txt': 'text/plain',
  '.xml': 'application/xml',
};

function serve() {
  http.createServer((req, res) => {
    let url = decodeURIComponent(req.url.split('?')[0]);
    const isPage = !path.extname(url) || url.endsWith('.html');
    if (isPage) {
      try { build(); } catch (e) { res.writeHead(500); return res.end(String(e.stack)); }
    }
    let file = path.join(DIST, url);
    if (!file.startsWith(DIST)) { res.writeHead(403); return res.end(); }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) {
      res.writeHead(404, { 'Content-Type': TYPES['.html'] });
      const nf = path.join(DIST, '404.html');
      return res.end(fs.existsSync(nf) ? fs.readFileSync(nf) : 'Not found');
    }
    res.writeHead(200, {
      'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    fs.createReadStream(file).pipe(res);
  }).listen(PORT, () => console.log(`Guru's dev server: http://localhost:${PORT}`));
}

build();
console.log('Built to', DIST);
if (process.argv.includes('--serve')) serve();
