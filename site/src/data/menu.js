// Guru's menu: the ONE place prices and dishes live.
// Edit here, run `node build.js`, and the Menu page updates.
//
// Item fields:
//   n  name            p  price (number) or for wines {glass150, glass250, bottle} / {size, price}
//   d  description     t  dietary tags: v (vegan), vo (vegan option, ask), gf, nf, df
//   b  badge: 'sig' (Chef's Signature) or 'pick' (Chef's Pick)
//
// Cleaned from the old website (Nov 2026). Items marked TODO need the owner's confirmation.

const i = (n, p, t = [], d = '', b) => ({ n, p, t, d, b });

const food = [
  {
    id: 'veg-entrees', title: 'Vegetarian Entrées', img: 'special-samosa',
    items: [
      i('Samosa (2 pcs)', 12.00, ['v', 'nf'], 'Homemade pastry filled with spiced potato and green peas, served with tamarind chutney.'),
      i('Mixed Veg Pakoras (4 pcs)', 12.00, ['v', 'gf', 'nf'], 'Baby spinach, onion and potato in a spiced chickpea-flour batter, delicately fried. Served with homemade tamarind chutney.'),
      i('Samosa Chaat', 14.95, ['nf'], 'Tangy north Indian street food: crispy samosas topped with sweetened yoghurt, homemade chutneys and Spanish onion.'),
      i('Aloo Tikki', 14.95, ['nf'], 'Crispy spiced potato patties with sweetened yoghurt and homemade chutneys.', 'pick'),
      i('Veg Manchurian', 20.95, ['v', 'nf'], 'Indo-Chinese vegetable dumplings tossed in a hot, sweet, sour and salty sauce.'),
      i('Vegetarian Platter', 20.95, [], 'A taste of everything: two samosas, two pakoras and aloo tikki.'),
    ],
  },
  {
    id: 'tandoori', title: 'Tandoori Entrées', img: 'cat-tandoori',
    items: [
      i('Tandoori Chicken Tikka', 22.95, ['gf', 'nf'], 'The queen of tandoori cuisine. Chicken fillets in toasted tandoori spices, Kashmiri chilli, turmeric and mustard oil with yoghurt, ginger, garlic and coriander.', 'pick'),
      i('Chilli Chicken', 22.95, ['nf'], 'Indo-Chinese favourite: crispy fried chicken tossed in a hot, sweet, sour and salty sauce.'),
      i('Tandoori Fish Tikka', 25.95, ['gf', 'nf'], 'Salmon marinated in roasted cumin, mint, coriander, cardamom, black pepper, yoghurt and dill. Served with side salad and homemade chutney.'),
      i('Tandoori Prawns', 25.95, ['gf', 'nf'], 'King prawns lightly marinated in ginger, yoghurt, lemon and tandoori spices.'),
      i("Guru's Tandoori Platter", 35.95, ['gf', 'nf'], 'Lamb cutlets, chicken tikka and tandoori prawns, fresh from the clay oven.', 'pick'),
    ],
  },
  {
    id: 'chicken', title: 'Chicken Mains', img: 'dish-butter-chicken',
    items: [
      i('Butter Chicken', 24.95, ['gf'], 'Tandoori chicken thigh folded into a creamy tomato curry with fenugreek and our special butter chicken spices. Pleasantly mild and our most popular dish.', 'sig'),
      i('Chicken Tikka Masala', 24.95, ['gf'], 'Tandoori chicken tikka in a garlic, ginger and tomato curry with capsicum and red onion. Medium, or to your taste.'),
      i('Kadhai Chicken', 24.95, ['gf'], 'Chicken and bell pepper in an onion, tomato and yoghurt curry with mild spices.', 'sig'),
      i('Chicken Dahi Wala', 24.95, ['gf'], 'Mughal-style yoghurt curry enriched with cashew and flavoured with fennel, ginger and garlic.', 'pick'),
      i('Mango Chicken', 24.95, ['gf'], 'A sweet and creamy mango curry, highly sought after.'),
      i('Chicken Madras', 24.95, ['gf'], 'Southern coastal favourite with tomato, onion, coconut cream, mustard seeds and fresh curry leaves.'),
      i('Chicken Saag', 24.95, ['gf'], 'Chicken cooked with spinach, red onion, tomato, ginger, garlic, green chilli and dry mango powder.'),
    ],
  },
  {
    id: 'lamb-goat', title: 'Lamb & Goat Mains', img: 'dish-lamb-shank',
    items: [
      i('Lamb Shank Curry', 28.95, ['gf', 'df', 'nf'], "Meaty lamb shank simmered with baby potatoes in the chef's blend of freshly ground spices, tomato, onion, ginger, garlic and black pepper.", 'sig'),
      i('Railway Goat Curry', 28.95, ['gf', 'df', 'nf'], 'Eastern India style goat curry with whole spices, red onion, garlic, ginger, lemon, coriander and green chilli.', 'pick'),
      i('Tandoori Lamb Rack (3 pcs)', 28.95, ['gf', 'nf'], 'Rack of lamb marinated overnight in tandoori spices, yoghurt, fried shallots, ginger and garlic. Served with potato wedges.'),
      i('Rogan Josh', 24.95, ['gf', 'df', 'nf'], 'The ever-popular, full-flavoured lamb curry from an old family recipe, with Kashmiri chilli, fennel and dry ginger.'),
      i('Lamb Korma', 24.95, ['gf'], 'North-west Indian recipe: tender lamb braised in onion, tomato and roasted cashew with saffron, green cardamom and garlic. Rich and mild.'),
      i('Lamb Madras', 24.95, ['gf', 'df', 'nf'], 'Coastal-style lamb curry with tomato, onion, coconut, chilli, mustard seeds, curry leaf and homemade Malabar masala. Medium, or to your taste.'),
      i('Lamb Saag', 24.95, ['gf', 'df', 'nf'], 'Diced lamb cooked with spinach, red onion, tomato, ginger, garlic, green chilli and dry mango powder.'),
    ],
  },
  {
    id: 'beef', title: 'Beef Mains', img: null,
    items: [
      i('Beef Vindaloo', 24.95, ['gf', 'df'], 'Tender beef in onion, tomato, ginger, garlic and a vinegar-soaked vindaloo spice mix with hot red chillies. Guaranteed to warm you up!', 'sig'),
      i('Beef Korma', 24.95, ['gf'], 'Delicately spiced with green and black cardamom, mace, bay leaf, cinnamon and cloves, enriched with cashew and garam masala.'),
      i('Beef Madras', 24.95, ['gf', 'df'], 'Coastal-style beef curry with tomato, onion, coconut, chilli, mustard seeds, curry leaf and homemade Malabar masala.'),
      i('Beef Saag', 24.95, ['gf', 'df'], 'Diced beef cooked with spinach, red onion, tomato, ginger, garlic, green chilli and dry mango powder.'),
    ],
  },
  {
    id: 'seafood', title: 'Seafood Mains', img: null,
    items: [
      i('Bengal Style Seafood Curry', 28.95, ['gf', 'df', 'nf'], 'Choose snapper, salmon or mixed seafood in a medium-spiced curry of onion, tomato, ginger, garlic, Bengali five-spice, curry leaf and a hint of mustard.'),
      i('Kerala Prawn Curry', 28.95, ['gf', 'df', 'nf'], 'South Indian Malabar curry of prawns with tomato, onion, coconut, chilli, mustard seeds, curry leaf and homemade masala. Medium, or to your taste.'),
    ],
  },
  {
    id: 'veg-mains', title: 'Vegetarian Mains', img: 'cat-vegetarian',
    items: [
      i("Guru's Special Dal Makhani", 22.95, ['gf', 'nf'], 'A royal-kitchen lentil recipe, simmered overnight over the glowing embers of the tandoor.', 'sig'),
      i('Kadhai Paneer', 22.95, ['gf', 'nf', 'vo'], 'Paneer and bell pepper in an onion, tomato and yoghurt curry with mild spices. Vegan with tofu.', 'sig'),
      i('Shahi Paneer', 22.95, ['gf', 'vo'], "Paneer in a creamy tomato curry with fenugreek and the chef's spices. Pleasantly mild. Vegan with tofu."),
      i('Palak Paneer', 22.95, ['gf', 'nf', 'vo'], 'Paneer in a richly flavoured spinach and cream curry. Vegan with tofu.'),
      i('Malai Kofta', 22.95, [], 'Potato and paneer dumplings, lightly fried and simmered in a creamy korma-style curry.', 'pick'),
      i('Dal Tadka', 22.95, ['v', 'gf', 'df', 'nf'], 'Pigeon pea, yellow moong and red lentils, tempered with cumin, onion and tomato.'),
      i('Kashmiri Dum Aloo', 22.95, ['v', 'gf', 'df'], 'Baby potatoes in a rich Kashmiri curry of fried onion, cashew and spices. Perfect with naan.'),
      i('Aloo Palak', 22.95, ['v', 'gf', 'df', 'nf'], 'Baby potatoes cooked in a delicious spinach curry.'),
      i('Mushroom Mutter', 22.95, ['v', 'gf', 'df', 'nf'], 'Button mushrooms and baby peas in a Mughlai-style korma with green cardamom and fenugreek.'), // TODO(owner): old text mentions cashew but tag says nut free
      i('Achari Aloo Baingan', 22.95, ['v', 'gf', 'df', 'nf'], 'Eggplant and baby potato stir-fried with onion, tomato, toasted cumin, coriander and fresh lemon.'),
      i('Adrakhi Gobhi Aloo', 22.95, ['v', 'gf', 'df', 'nf'], 'Cauliflower and baby potato with turmeric, coriander, toasted cumin, onion, tomato and fresh ginger.', 'pick'),
      i('Malabari Mixed Vegetable', 22.95, ['v', 'gf', 'nf'], 'Seasonal vegetables, lightly spiced and pan-fried, finished in a creamy coconut curry.', 'pick'),
    ],
  },
  {
    id: 'biryani', title: 'Biryani', img: 'cat-biryani',
    items: [
      i('Chicken Biryani', 26.95, ['gf', 'nf'], 'Marinated chicken and basmati rice cooked together with aromatic biryani spices.'),
      i('Lamb Biryani', 26.95, ['gf', 'nf'], 'Stewed spring lamb and basmati rice cooked with aromatic biryani spices.'),
      i('Goat Biryani', 26.95, ['gf', 'nf'], 'Curried goat and basmati rice cooked with aromatic biryani spices.'),
      i('Prawn Biryani', 26.95, ['gf', 'nf'], 'Saffron basmati rice layered with marinated prawns and yoghurt.', 'pick'),
      i('Vegetarian Biryani', 26.95, ['gf', 'nf'], 'Saffron basmati rice layered with marinated vegetables and yoghurt.'),
    ],
  },
  {
    id: 'rice', title: 'Rice', img: null,
    items: [
      i('Steamed Basmati Rice', 5.00, ['v', 'gf', 'nf'], ''),
      i('Saffron Rice', 6.50, ['v', 'gf', 'nf'], 'Basmati cooked with saffron and cumin seeds.'),
      i('Kashmiri Pilaf', 7.50, ['v', 'gf', 'df'], 'Basmati cooked with whole spices, toasted peanuts, cashews and raisins.'),
      i('Brown Basmati Rice', 7.50, ['v', 'gf', 'df', 'nf'], 'Unpolished brown basmati.'),
    ],
  },
  {
    id: 'breads', title: 'Breads', img: 'cat-breads',
    groups: [
      {
        title: 'Tandoori Naan', items: [
          i('Plain Naan', 5.50, ['v', 'df', 'nf']),
          i('Butter Naan', 5.99, ['nf']),
          i('Garlic Naan', 6.99, ['nf', 'vo']),
          i('Cheese Naan', 6.99, ['nf']),
          i('Cheese & Garlic Naan', 7.99, ['nf']),
          i('Cheese & Spinach Naan', 7.99, ['nf']),
          i('Peshawari Naan', 7.99, ['vo'], 'Sweet naan filled with nuts and dried fruit.'),
        ],
      },
      {
        title: 'Roti & Paratha', items: [
          i('Tandoori Roti', 5.50, ['df', 'nf', 'vo'], 'Fresh wholemeal bread.'),
          i('Laccha Paratha', 6.99, ['df', 'nf', 'vo'], 'Flaky, layered wholemeal bread.'),
        ],
      },
      {
        title: 'Gluten Free', items: [
          i('Homemade Gluten-Free Pancake', 7.99, ['gf'], 'Made in-house, suitable for coeliacs.'),
        ],
      },
    ],
  },
  {
    id: 'sides', title: 'Sides & Accompaniments', img: null,
    items: [
      i('Indian Salad', 7.95, ['v', 'gf', 'df', 'nf'], 'Cucumber, red onion, tomato and seasonal lettuce.'),
      i('Raita', 5.00, ['gf', 'nf'], 'Yoghurt with roasted cumin and cucumber.'),
      i('Fried Papadoms', 4.00, ['v', 'gf', 'nf']),
      i('Chutney', 3.00, ['v', 'gf', 'nf'], 'Mint, sweet mango or tamarind.'),
      i('Pickle', 3.00, ['v', 'gf', 'nf'], 'Lime, mango or chilli.'),
    ],
  },
  {
    id: 'desserts', title: 'Desserts', img: 'cat-desserts',
    items: [
      i('Saffron Pistachio Kulfi', 12.95, [], 'Homemade, hand-churned Indian ice cream.', 'sig'),
      i('Gulab Jamun', 12.95, [], 'Soft milk dumplings in rose-scented sugar syrup.'),
    ],
  },
  {
    id: 'kids', title: 'Kids Menu', img: null,
    note: 'All kids meals come with steamed rice and a papadom. Kids drinks are on the Drinks menu.',
    items: [
      i('Kids Butter Chicken', 14.95, ['gf'], 'Our mild, creamy butter chicken.'),
      i('Kids Mango Chicken', 14.95, ['gf'], 'Sweet and creamy mango curry.'),
      i('Kids Chicken Nuggets', 14.95, []),
      i('Kids Veg Korma', 14.95, ['v', 'gf', 'df', 'nf'], 'Mixed vegetables in a creamy coconut curry.'),
      i('Kids Yellow Dal', 14.95, ['v', 'gf', 'df', 'nf'], 'Yellow lentils tempered with cumin, onion and tomato.'),
    ],
  },
  {
    id: 'street-food', title: 'Street Food Specials', img: 'cat-street-food',
    note: 'The flavours of an Indian street corner. Ask our team which street food dishes are available today.', // TODO(owner): when is this menu served?
    // TODO(owner): Samosa, Samosa Chaat, Aloo Tikki and Veg Manchurian are priced differently here than in Entrées. Confirm both prices.
    // TODO(owner): short descriptions below were written for the new site. Please check they match how you make them.
    items: [
      i('Pani Puri', 10.00, [], 'Crisp hollow puris filled with spiced potato and chickpeas, with tangy mint water.'),
      i('Samosa', 10.00, [], 'Crispy pastry filled with spiced potato and peas.'),
      i('Onion Bhaji', 10.00, [], 'Spiced onion fritters in chickpea batter.'),
      i('Papri Chaat', 13.00, [], 'Crisp wafers with potato, yoghurt, tamarind and mint chutneys and sev.'),
      i('Samosa Chaat', 13.00, [], 'Crushed samosa topped with yoghurt and chutneys.'),
      i('Aloo Tikki', 13.00, [], 'Spiced potato patties with yoghurt and chutneys.'),
      i('Paratha', 15.00, [], 'Pan-fried flatbread.'),
      i('Half Curry Half Rice Combo', 15.00, [], 'Choose from a range of curries, served with rice.'),
      i('Chana Bhatura', 18.00, [], 'Spiced chickpea curry with fluffy fried bread.'),
      i('Pav Bhaji', 18.00, [], 'Mumbai-style spiced vegetable mash with buttered bread rolls.'),
      i('Chicken Kebab', 18.00, []),
      i('Lamb Kebab', 18.00, []),
      i('Chilli Chicken Burger', 18.00, []),
      i('Aloo Tikki Burger', 18.00, []),
      i('Chilli Paneer', 21.00, [], 'Indo-Chinese paneer with capsicum and onion.'),
      i('Veg Manchurian', 21.00, [], 'Indo-Chinese vegetable dumplings in a tangy sauce.'),
    ],
  },
];

const drinks = [
  {
    id: 'lassi-chai', title: 'Lassi, Chai & Tea', img: 'cat-drinks',
    items: [
      i('Indian Lassi', 6.50, [], 'Mango or salted.'),
      i('Indian Masala Chai', 6.50, [], 'Brewed with milk and spices.'),
      i('Hot Tea (200ml pot)', 5.50, [], 'English Breakfast, Earl Grey, Lemongrass & Ginger or Green.'),
      i('Pink Lemonade', 6.50, [], 'A kids favourite.'),
    ],
  },
  {
    id: 'soft-drinks', title: 'Soft Drinks & Juices', img: null,
    items: [
      i('Soft Drinks', 5.50, [], 'Coke, Coke Zero, Diet Coke, Fanta, Sprite, Lift.'),
      i('Juices & Other Drinks', 6.50, [], 'Orange, apple, pineapple, mango, sparkling water, ginger beer, iced tea, lemon lime & bitters.'),
    ],
  },
  {
    id: 'beer-spirits', title: 'Beer, Cider & Spirits', img: null,
    note: 'Please ask our team about today’s choices.',
    items: [
      i('Beer (light)', 8.50),
      i('Beer (premium)', 9.50),
      i('Cider', 7.50),
      i('Premium Spirits', 12.50, [], 'Rum, gin, whisky, scotch, bourbon, brandy, vodka, tequila.'),
    ],
  },
];

const W = (n, d, a, b, c) => ({ n, d, p: { glass150: a, glass250: b, bottle: c } });
const wines = [
  {
    id: 'sparkling', title: 'Sparkling', small: true, items: [
      { n: 'King Valley Prosecco', d: 'Apple and pear with fresh lemon, gentle creaminess and very fine bubbles.', p: { size: '200ml', price: 12.00 } },
      { n: 'Yellowglen Yellow Brut Cuvée', d: 'South Eastern Australia. Lemon sherbet, melon, pineapple and citrus with a crisp, clean finish.', p: { size: '200ml', price: 12.00 } },
    ],
  },
  {
    id: 'white', title: 'White', items: [
      W('Vivo Moscato', 'Freshly crushed grapes, a little musk and a hint of lime.', 8.00, 13.50, 33.00),
      W('3 Tales Sauvignon Blanc', 'Lively tropical fruit with an underlying citrus zest.', 10.00, 15.00, 38.00),
      W('Lorimer Semillon Sauvignon Blanc', 'Passionfruit and tropical fruit with hints of freshly cut grass.', 10.00, 15.00, 38.00),
      W('Squealing Pig Sauvignon Blanc', 'Marlborough, NZ. Passionfruit aromas, crisp citrus and a long finish.', 12.00, 18.00, 40.00),
      W('Falls Dam Pinot Gris', 'Central Otago, NZ. Stonefruit and white blossom, pear and almond, crisp finish.', 15.00, 20.00, 50.00),
      W('Regional Reserve Chardonnay', 'Citrus florals, hazelnut and brioche with soft acidity and finesse.', 15.00, 20.00, 50.00),
    ],
  },
  {
    id: 'rose', title: 'Rosé', items: [
      W('Rhythm & Rhyme Rosé', 'Strawberry, raspberry and cherry with a little spice, crisp and fresh.', 10.00, 15.00, 38.00),
    ],
  },
  {
    id: 'red', title: 'Red', items: [
      W('Tempus Two Merlot', 'Plum and ripe berries, soft and round with gentle tannins.', 8.00, 13.50, 33.00),
      W('Willowglen Cabernet Merlot', 'Glazed cherries and red currants with hints of choc-mint oak.', 8.00, 13.50, 33.00),
      W('Basileus Barossa Valley Shiraz', 'Blackberry and plum with mocha, vanilla and pepper. Full-bodied and velvety.', 12.00, 18.00, 40.00),
      W('Woodfired Cabernet Sauvignon', 'Heathcote. Blackberry, blueberry, cedar and liquorice with balanced tannin.', 12.00, 18.00, 40.00),
      W('Mount Riley Pinot Noir', 'Marlborough, NZ. Dark stone fruit and gentle spicy oak with a savoury finish.', 12.00, 18.00, 40.00),
    ],
  },
  {
    id: 'port', title: 'Fortified', small: true, items: [
      { n: 'Penfolds Club Reserve Aged Tawny Port', d: 'Raisined fruit, caramel and nutty aged complexity.', p: { size: '60ml', price: 10.00 } },
    ],
  },
];

const TAGS = {
  v: { label: 'V', name: 'Vegan' },
  vo: { label: 'VO', name: 'Vegan option, please ask' },
  gf: { label: 'GF', name: 'Gluten free' },
  nf: { label: 'NF', name: 'Nut free' },
  df: { label: 'DF', name: 'Dairy free' },
};

module.exports = { food, drinks, wines, TAGS };
