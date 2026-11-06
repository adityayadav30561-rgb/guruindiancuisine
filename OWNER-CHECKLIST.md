# Before going live: things only the owner can confirm

The new site is built. These details came from the old website and need checking, or are missing.

## Menu (edit in `site/src/data/menu.js`)
- [ ] **Duplicate prices.** These four dishes are priced differently in Entrées and in Street Food. Is that intentional (smaller street portions), or which price is right?
  - Samosa: $12.00 vs $10.00
  - Samosa Chaat: $14.95 vs $13.00
  - Aloo Tikki: $14.95 vs $13.00
  - Veg Manchurian: $20.95 vs $21.00
- [ ] **Street Food Specials.** When is this menu served? I wrote short descriptions for the dishes; please check they match how you make them.
- [ ] **Mushroom Mutter** is tagged nut free, but the old description mentioned cashew. Which is right?
- [ ] **"VO" tag.** I used it for the old "v*" mark and for "vegan with tofu" dishes, labelled "Vegan option, please ask". Is that correct?
- [ ] **No onion / garlic / ginger.** The site says you can cook without these on request. Still true?
- [ ] **Wine list.** Are these wines and prices current?

## Business details
- [ ] **Restaurant hours:** Mon & Wed–Sun 11am–8:30pm, closed Tuesday. Still correct? (If they change, update `site/src/assets/js/main.js` and the hours tables.)
- [ ] **Online ordering:** do you use Uber Eats, DoorDash, Menulog or your own system? Send the links and I'll add buttons.
- [ ] **Om Namah Grocery:** exact street address and phone number. Hours: 9:30–5, or "till late" as the old page said?
- [ ] **Social links:** your TripAdvisor and Google review page links. Is Twitter/X still used?

## Photos and logo
- [ ] Real photo of **Sonal & Som** (the Home and Our Story pages show a placeholder until then).
- [ ] Newer photo of the **Om Namah storefront** (the current one is small).
- [ ] Optional: the chef cooking, the dining room, the restaurant front.
- [ ] **Logo** as a large or vector file (the current one is only 319px wide).

## Forms
- [ ] **Book a Table and Contact.** Right now they open the guest's email app with the booking filled in, addressed to gurusindiancuisine@gmail.com. For forms that send directly, choose one of these and add its URL as `formEndpoint` in `site/src/assets/js/pages.js`:
  - Formspree or Web3Forms (free plans available)
  - A small PHP mail script, if the hosting is cPanel
- [ ] Review the draft **Privacy** page.

## Launch
- [ ] Upload the contents of `site/dist/` to the web host.
- [ ] `.htaccess` (already in `dist/`) redirects every old page address to the new one, so Google rankings carry over. It needs Apache hosting.
