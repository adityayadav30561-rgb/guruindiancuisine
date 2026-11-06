# Guru's Indian Cuisine — website

New website for [Guru's Indian Cuisine](https://gurusindiancuisine.com.au/), 10 Park Avenue, Coffs Harbour NSW.

It's a static site: plain HTML, CSS and JavaScript, plus a tiny Node build script with no dependencies.

## Pages

Home · Menu (food + drinks, filters, search, print) · Takeaway & Delivery · Book a Table · Our Story · Om Namah Grocery · Contact · Privacy · 404

## Run locally

Requires Node.js 18 or later.

```bash
node site/build.js --serve
```

Open http://localhost:4321. The server rebuilds on every page load, so edits show when you refresh.

## Build for upload

```bash
node site/build.js
```

Upload the contents of `site/dist/` to the web host. `dist/.htaccess` redirects all the old WordPress page addresses to the new pages (Apache/cPanel hosting).

## Editing

| What | Where |
|---|---|
| Menu dishes and prices | `site/src/data/menu.js` |
| Page content | `site/src/pages/*.html` |
| Header / footer | `site/src/partials/` |
| Styles | `site/src/assets/css/main.css` |
| Opening hours (open/closed badge) | `site/src/assets/js/main.js` |
| Form sending service | `formEndpoint` in `site/src/assets/js/pages.js` |
| Images | `site/src/assets/img/` (credits in `site/IMAGE-CREDITS.md`) |

## Project docs

- `SITE-PLAN.md`: audit of the old site and the plan for the new one
- `IMAGE-PROMPTS.md`: prompts used for the food photography
- `OWNER-CHECKLIST.md`: details the owner still needs to confirm before launch
