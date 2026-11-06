# Guru's Indian Cuisine — Website Rebuild Plan

Current site: https://gurusindiancuisine.com.au/ (WordPress, "Linguini" theme)
Prepared: 6 Nov 2026

This plan covers structure, content and features only. Visual design comes next, from the design reference you supply.

---

## 1. What's wrong with the current site

### Structure and navigation
- **The menu is spread over about 23 separate pages.** There's one page per category (Chicken, Beef, Red Wines, Naan, and so on), so guests click back and forth to build a meal.
- **The navigation dropdown is incomplete.** It leaves out Rice Dishes, Biryani, Desserts, Kids Menu and Street Food. You can only reach those from the `/menus/` index.
- **"Tandoori and Vegan Breads" is a dead link.** It points to `#`.
- **Menu order doesn't follow how people eat.** Drinks come first and breads are split across three pages.
- **The homepage has no clear priority.** It shows, in order: Delicacy of the month, Diet Special, grocery store, a COVID form, Facebook, story, hours, then the grocery hours again. There's no prominent Book or Order button.
- **"Reservations" isn't a booking form.** It's a copy of the contact form (name, phone, email, message), with no date, time or party size.
- **The Diet Special menu returns a 404.** It's linked from the homepage.
- **The COVID / Clipcode registration page is out of date** and should go.
- **The gallery is stale.** It has 4 images from 9–12 years ago.
- **There's no online ordering.** Delivery fees are listed, but there's no link to order.

### Menu data and pricing errors
- **The same dish has different prices in two places:**

  | Dish | Entrée price | Street Food price |
  |---|---|---|
  | Samosa | $12.00 | $10.00 |
  | Aloo Tikki | $14.95 | $13.00 |
  | Samosa Chat | $14.95 | $13.00 |
  | Veg Manchurian | $20.95 | $21.00 |

- **All 16 Street Food items have no descriptions**, and the site doesn't say when that menu is served.
- **Lamb Madras is described as a "beef curry".**
- **"Desserts" is misspelled "Deserts".**
- **Some dish names contain Cyrillic look-alike letters** ("3 PСЕ", "PANCАКЕ"). They look normal but break search, filtering and SEO.
- **Dietary tags are typed into dish names** with mixed casing and duplicates ("NF GF GF,V", "nf,gf ", "gf/df/nf/v"). The meaning of "v*" isn't explained anywhere.
- **Wine prices run together** ("150ml - 10.00250ml - 15.00Bottle - 38.00").
- **Similar dishes are filed inconsistently.** Chilli Chicken (Indo-Chinese) sits under Tandoori, while Tandoori Lamb Rack sits under Lamb.
- **The Kids Menu includes drinks** (Pink Lemonade, Mango Lassi).

### Business info errors
- **Phone numbers are written wrongly.** "02661 30600" should be **(02) 6613 0600**, and "04212 31299" should be **0421 231 299**. Neither number can be tapped to call.
- **The grocery page contradicts itself.** It says "open 7 days till late" but lists hours ending at 5pm.
- **The TripAdvisor link goes to the TripAdvisor home page**, not Guru's listing.
- **The Twitter/X account** probably isn't active (needs checking).

### Technical and SEO
- **No structured data**, so Google doesn't see the restaurant, its hours or its menu.
- **The meta description is very thin:** "Gurus Indian Cuisine, Indian Restaurant, Coffs Harbour".
- **The viewport setting `maximum-scale=1` stops people zooming on phones**, which is an accessibility failure.
- **Every page title follows the pattern "X ‹ Gurus | Indian Restaurant | Coffs Harbour | NSW | Australia"**, which is long and repetitive.

---

## 2. New sitemap — 7 core pages

```
Home                 /
Menu                 /menu          (food + drinks, one page, tabbed)
Order Online         /order         (takeaway & delivery)
Book a Table         /book
Our Story            /our-story
Om Namah Grocery     /grocery
Contact              /contact
─────────────
404 page, Privacy policy (needed once forms collect personal data)
```

**Main navigation:** Home · Menu · Order · Book a Table · Our Story · Grocery · Contact
**Header buttons, always visible:** **Book a Table** and **Order Now**
**Mobile:** a bar fixed to the bottom of the screen with Call · Order · Book · Directions

**Removed or merged:**
- **Gallery** → split into a photo strip on Home and photos on Our Story. It can come back as a page if fresh photos are supplied.
- **Diet Special** → replaced by dietary filters on the Menu page.
- **COVID registration** → deleted.
- **23 menu-category pages** → become sections of the one Menu page.

---

## 3. Page-by-page content

### 3.1 Home
Sections, in order:
1. **Hero:** a strong food photo with the headline "Masters of Indian Cuisine · Coffs Harbour" and three buttons: **View Menu**, **Order Now**, **Book a Table**. A line underneath shows open or closed today and the hours.
2. **Quick info bar:** address · today's hours · phone (tap to call) · Halal badge.
3. **Signature dishes:** 4–6 cards for the Chef's Signature and Recommended dishes (Butter Chicken, Lamb Shank Curry, Dal Makhani, Tandoori Platter, Railway Goat Curry, Saffron Pistachio Kulfi), each linking to the right spot on the menu.
4. **Chef's Special of the Month:** replaces "Delicacy of the month". It can be changed without a developer.
5. **For every diet:** Vegan · Gluten Free · Nut Free · Dairy Free · Halal. Each icon links to the menu with that filter already on.
6. **Our story teaser:** a short paragraph about Sonal and Som and the chef's background at the Oberoi, with a link to Our Story.
7. **Delivery and takeaway:** delivery zones and fees, plus an Order button.
8. **Om Namah Grocery teaser:** a short line with a link to the Grocery page.
9. **Reviews:** 3 quotes from Google or TripAdvisor (supplied by the owner or embedded).
10. **Footer:** see 3.8.

### 3.2 Menu (food + drinks)
- **Top tabs:** Food | Drinks.
- **Category bar that stays on screen while scrolling**, highlighting the current section. Food categories are ordered the way a meal goes:
  1. Entrées — Vegetarian
  2. Entrées — Tandoori
  3. Mains — Chicken
  4. Mains — Lamb & Goat
  5. Mains — Beef
  6. Mains — Seafood
  7. Mains — Vegetarian
  8. Biryani
  9. Rice
  10. Breads — Naan, Roti & Paratha, Gluten Free (one section, three groups)
  11. Sides & Accompaniments
  12. Desserts
  13. Kids Menu (food only; its drinks move to the Drinks tab)
  14. Street Food Specials (with a note on when they're served)
- **Dietary filter chips:** Vegan · GF · NF · DF · Halal. Tapping one hides dishes that don't match.
- **Legend:** a single key explaining every tag, including "can be made vegan with tofu".
- **Each dish shows:** a clean name, the price, a short description, tag icons, and a "Chef's Signature" or "Chef's Pick" badge where it applies.
- **Spice level:** optional chilli icons, if the owner wants them.
- **Drinks tab sections:** Lassi & Chai · Soft Drinks & Juices · Hot Tea · Beer & Cider · Spirits · Sparkling · White · Rosé · Red · Port. Wine prices go in a three-column table: Glass 150ml | Glass 250ml | Bottle.
- **Downloadable PDF menu**, for printing and takeaway orders by phone.
- **Search box:** optional, but useful at around 120 items.

### 3.3 Order Online
- **Pickup and delivery explained**, including the delivery zones table:

  | Area | Fee |
  |---|---|
  | Coffs Harbour | $8 |
  | Korora, Toormina, Sawtell, Boambee East | $15 |
  | Sapphire | $15 |

- **Order buttons** to whatever service the owner uses (their own system, Uber Eats, DoorDash or Menulog). This needs confirming with the owner.
- **Phone ordering:** a tap-to-call link and a link to the PDF menu.
- **Minimum order, delivery hours and lead time**, if they apply.

### 3.4 Book a Table
- **A real booking form:**
  - Name
  - Phone
  - Email
  - Date (Tuesdays blocked, since the restaurant is closed)
  - Time (within opening hours)
  - Number of guests
  - Occasion (optional)
  - Dietary needs / notes
- **Confirmation:** a message on screen, plus an email to the restaurant and to the guest.
- **Large groups:** a note such as "groups of 10+ please call", plus a call button.
- **Alternative:** an embedded booking widget (OpenTable, ResDiary, NowBookIt) if the owner prefers one.

### 3.5 Our Story
- The founders, Sonal Arora (restaurateur) and Somnath "Som" Bhaskar (chef). Includes Som's 14 years in 5-star hotels such as the Oberoi.
- How they came to Coffs Harbour, from Sydney in 2008 to Coffs in 2012.
- The Om Namah grocery store opening on 3 December 2012, and why they started it.
- Their mission: sharing family recipes and teaching Indian cooking.
- Photos of the chef, the restaurant interior and the team.
- A closing call to action: Book a Table.

### 3.6 Om Namah Grocery
- Introduction: 100% Australian owned, since December 2012.
- What they stock: Indian, Sri Lankan, Pakistani, Persian and African groceries · spices · ready-to-eat foods · cookware · Ayurvedic and herbal products · jewellery · cosmetics.
- Services: recipe help and one-on-one cooking demonstrations for parties.
- Trading hours: Mon–Sat 9:30am–5pm, Sun 10am–5pm (to be confirmed, because the old copy says "till late").
- Location: Pacific Highway, opposite Jax Tyres near Woolworths, with parking at the rear. The exact address and a map are needed.
- Contact phone (needs confirming whether it's separate from the restaurant's).

### 3.7 Contact
- Address: 10 Park Avenue, Coffs Harbour NSW 2450, with an embedded map and a Get Directions button.
- Phone numbers (tap to call) and email.
- An opening hours table.
- A contact form for general enquiries, catering and feedback.
- Social links: Facebook, Instagram, and the correct TripAdvisor and Google review links.

### 3.8 Footer (on every page)
- Logo and a one-line tagline.
- Address, phone and email.
- Restaurant hours in compact form ("Open 11am–8:30pm · Closed Tuesdays").
- Quick links to all pages.
- Social icons.
- A Halal food available badge.
- Copyright and privacy link.

---

## 4. Features list

| Feature | Where | Priority |
|---|---|---|
| Book / Order buttons that stay on screen | Header, every page | Must |
| Mobile bar: Call · Order · Book · Directions | Every page (mobile) | Must |
| Live "Open now / Closed" status | Home, footer | Must |
| One-page menu with category bar that stays on screen | Menu | Must |
| Dietary filter chips + legend | Menu | Must |
| Wine price table (150 / 250 / bottle) | Menu → Drinks | Must |
| Table booking form (blocks Tuesdays, limits times to opening hours) | Book | Must |
| Contact form + map | Contact | Must |
| Tap-to-call phone links | Everywhere | Must |
| Delivery zones and fees | Order, Home | Must |
| Structured data for Google: restaurant, opening hours, menu | Site-wide | Must |
| Redirects from all old URLs | Server | Must |
| Chef's Special of the Month, editable by the owner | Home | Should |
| Signature dish badges | Menu, Home | Should |
| Downloadable PDF menu | Menu, Order | Should |
| Reviews section | Home | Should |
| Menu search | Menu | Nice |
| Spice-level indicator | Menu | Nice |
| Instagram feed | Home | Nice |
| Catering / functions page | New page | Only if the owner wants it |

---

## 5. Technical approach

- **All menu data in one file.** Every dish is stored once (name, category, price or price options, dietary tags, description, badges). The Menu page, the PDF and the Google structured data all read from it. This fixes the "random pricing" problem at the root, because a price can only be in one place.
- **Clean up the data while moving it:**
  - Fix the Cyrillic letters.
  - Move tags out of dish names.
  - Agree on one price for each duplicate dish.
  - Fix the Lamb Madras description.
  - Spell "Desserts" correctly.
- **Redirects (301) from the old URLs**, so existing Google rankings and bookmarks keep working:

  | Old URL | New URL |
  |---|---|
  | `/menus/`, `/menu/*/` | `/menu` (with the matching section anchor, e.g. `/menu#chicken`) |
  | `/about-gurus/` | `/our-story` |
  | `/book-your-table/` | `/book` |
  | `/store/`, `/wp/store/` | `/grocery` |
  | `/gallery/` | `/our-story` |
  | `/covidsafe-registration` | `/` |

- **SEO:**
  - A unique title and description for every page.
  - Restaurant structured data (address, phone, hours, cuisine, price range, menu link).
  - A sitemap.xml file.
  - Open Graph images, so links shared on Facebook show a picture.
- **Accessibility:** zooming allowed on phones, good colour contrast, image alt text, forms that work with the keyboard.
- **Performance:** compressed modern images that load as you scroll, and no heavy page-builder plugins.
- **Platform: needs a decision.**
  - **(a) Static site:** fastest and cheapest to host. Menu changes are made by editing one data file, or by the developer.
  - **(b) WordPress rebuilt cleanly:** the owner edits prices and specials through an admin panel.

  Who updates prices decides this.

---

## 6. Questions for the owner

1. **Duplicate prices:** which price is correct for Samosa, Aloo Tikki, Samosa Chat and Veg Manchurian? Or are Street Food items deliberately smaller, cheaper portions?
2. **Street Food menu:** when is it served (lunch only, takeaway, weekends)? Can we have short descriptions for those 16 items?
3. **Hours:** are Mon & Wed–Sun 11am–8:30pm, closed Tuesday, still correct? Is there a lunch/dinner split?
4. **Ordering:** which platform do you use for online orders (your own, Uber Eats, DoorDash, Menulog)? Please send the links.
5. **Bookings:** do you want a simple form that emails you, or a booking system such as OpenTable, ResDiary or NowBookIt?
6. **Diet Special menu** (no onion, garlic or ginger): do you still offer it? If so, which dishes?
7. **"v\*" tag:** what does it mean? Our guess is "vegan on request".
8. **Catering and functions:** do you offer them? If so, we'll add a page.
9. **Photos:** can you supply recent photos of dishes, the interior and the team? The current gallery is 9–12 years old.
10. **Grocery store:** what's its exact street address and phone number? Are its hours 9:30–5 or "till late"?
11. **Social links:** is Twitter/X still active? Please send the correct TripAdvisor and Google Business links.
12. **Menu updates:** who will change prices and specials, and how often? This decides static site vs WordPress.

---

## 7. Next step

Send the design reference (a site, Figma file, screenshots or mood board). Once the design is chosen and the questions above are answered, we build in this order: menu data file → shared layout (header, footer, mobile bar) → Home → Menu → Book / Order / Contact → Our Story / Grocery → SEO and redirects → testing.
