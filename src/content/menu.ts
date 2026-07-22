import { MenuItem, Category, Deal } from '@/types';

export const categories: Category[] = [
  { id: 'cat-1', name: 'Special Pizzas', slug: 'special-pizzas', description: 'Premium hand-crafted signature pizzas', order: 1 },
  { id: 'cat-2', name: 'Regular Pizzas', slug: 'regular-pizzas', description: 'Classic favorites, baked to perfection', order: 2 },
  { id: 'cat-3', name: 'Stuffer Pizzas', slug: 'stuffer-pizzas', description: 'Loaded crust, extra filling', order: 3 },
  { id: 'cat-4', name: 'Appetizers', slug: 'appetizers', description: 'Perfect starters to share', order: 4 },
  { id: 'cat-5', name: 'Burgers & Sandwiches', slug: 'burgers-sandwiches', description: 'Hearty hand-crafted burgers', order: 5 },
  { id: 'cat-6', name: 'Pizza Burgers', slug: 'pizza-burgers', description: 'The best of both worlds', order: 6 },
  { id: 'cat-7', name: 'Rolls, Wraps & Shawarma', slug: 'rolls-wraps-shawarma', description: 'Wrapped and rolled to perfection', order: 7 },
  { id: 'cat-8', name: 'Pasta & Fries', slug: 'pasta-fries', description: 'Comfort food classics', order: 8 },
  { id: 'cat-9', name: 'Rice & Sajji', slug: 'rice-sajji', description: 'Traditional rice dishes and sajji', order: 9 },
  { id: 'cat-10', name: 'Platters', slug: 'platters', description: 'Complete meals for sharing', order: 10 },
  { id: 'cat-11', name: 'Beverages & Drinks', slug: 'beverages-drinks', description: 'Refreshing drinks and shakes', order: 11 },
];

const pizzaSizeOption = [
  { id: 'opt-size', name: 'Size', type: 'size' as const, required: true, choices: [
    { id: 'size-small', name: 'Small', priceDelta: 0, default: true },
    { id: 'size-medium', name: 'Medium', priceDelta: 0 },
    { id: 'size-large', name: 'Large', priceDelta: 0 },
  ]},
];

const mediumLargeOption = [
  { id: 'opt-size', name: 'Size', type: 'size' as const, required: true, choices: [
    { id: 'size-medium', name: 'Medium', priceDelta: 0, default: true },
    { id: 'size-large', name: 'Large', priceDelta: 0 },
  ]},
];

const halfFullOption = [
  { id: 'opt-portion', name: 'Portion', type: 'size' as const, required: true, choices: [
    { id: 'portion-half', name: 'Half', priceDelta: 0, default: true },
    { id: 'portion-full', name: 'Full', priceDelta: 0 },
  ]},
];

const quarterHalfFullOption = [
  { id: 'opt-portion', name: 'Portion', type: 'size' as const, required: true, choices: [
    { id: 'portion-quarter', name: 'Quarter', priceDelta: 0, default: true },
    { id: 'portion-half', name: 'Half', priceDelta: 0 },
    { id: 'portion-full', name: 'Full', priceDelta: 0 },
  ]},
];

export const menuItems: MenuItem[] = [
  // === SPECIAL PIZZAS ===
  { id: 'sp-1', name: 'MR. SP PIZZA', description: 'Our signature special pizza loaded with premium toppings', price: 700, image: '/images/placeholder.png', category: 'special-pizzas', tags: ['signature', 'premium'], popular: true, featured: true,
    options: [{ ...pizzaSizeOption[0], choices: [
      { id: 'size-small', name: 'Small', priceDelta: 0, default: true },
      { id: 'size-medium', name: 'Medium', priceDelta: 650 },
      { id: 'size-large', name: 'Large', priceDelta: 1300 },
    ]}]},
  { id: 'sp-2', name: 'ROYAL SUPREME', description: 'A royal feast of toppings on a perfect crust', price: 700, image: '/images/placeholder.png', category: 'special-pizzas', tags: ['premium', 'signature'], popular: true, featured: true,
    options: [{ ...pizzaSizeOption[0], choices: [
      { id: 'size-small', name: 'Small', priceDelta: 0, default: true },
      { id: 'size-medium', name: 'Medium', priceDelta: 650 },
      { id: 'size-large', name: 'Large', priceDelta: 1300 },
    ]}]},
  { id: 'sp-3', name: 'CLICK ON', description: 'A crowd-pleasing classic with bold flavors', price: 700, image: '/images/placeholder.png', category: 'special-pizzas', tags: ['classic'],
    options: [{ ...pizzaSizeOption[0], choices: [
      { id: 'size-small', name: 'Small', priceDelta: 0, default: true },
      { id: 'size-medium', name: 'Medium', priceDelta: 650 },
      { id: 'size-large', name: 'Large', priceDelta: 1300 },
    ]}]},
  { id: 'sp-4', name: 'BORNE FIRE', description: 'Fiery and bold for those who love the heat', price: 600, image: '/images/placeholder.png', category: 'special-pizzas', tags: ['spicy', 'signature'],
    options: [{ ...pizzaSizeOption[0], choices: [
      { id: 'size-small', name: 'Small', priceDelta: 0, default: true },
      { id: 'size-medium', name: 'Medium', priceDelta: 600 },
      { id: 'size-large', name: 'Large', priceDelta: 1200 },
    ]}]},
  { id: 'sp-5', name: 'ROYAL CRUST', description: 'Premium crust loaded with royal toppings', price: 1450, image: '/images/placeholder.png', category: 'special-pizzas', tags: ['premium'],
    options: [{ ...mediumLargeOption[0], choices: [
      { id: 'size-medium', name: 'Medium', priceDelta: 0, default: true },
      { id: 'size-large', name: 'Large', priceDelta: 700 },
    ]}]},
  { id: 'sp-6', name: 'BEHARI KABAB', description: 'Traditional Behari kabab flavors on a pizza', price: 1450, image: '/images/placeholder.png', category: 'special-pizzas', tags: ['premium', 'behari-kabab'],
    options: [{ ...mediumLargeOption[0], choices: [
      { id: 'size-medium', name: 'Medium', priceDelta: 0, default: true },
      { id: 'size-large', name: 'Large', priceDelta: 700 },
    ]}]},
  { id: 'sp-7', name: 'MAKHNI PIZZA', description: 'Rich buttery makhni flavored pizza', price: 1450, image: '/images/placeholder.png', category: 'special-pizzas', tags: ['premium', 'makhni'],
    options: [{ ...mediumLargeOption[0], choices: [
      { id: 'size-medium', name: 'Medium', priceDelta: 0, default: true },
      { id: 'size-large', name: 'Large', priceDelta: 700 },
    ]}]},
  { id: 'sp-8', name: 'MR SP SENSATION', description: 'Our sensational signature creation', price: 1650, image: '/images/placeholder.png', category: 'special-pizzas', tags: ['signature', 'premium'],
    options: [{ ...mediumLargeOption[0], choices: [
      { id: 'size-medium', name: 'Medium', priceDelta: 0, default: true },
      { id: 'size-large', name: 'Large', priceDelta: 1000 },
    ]}]},
  { id: 'sp-9', name: 'DONNER PIZZA', description: 'Loaded with donner meat and signature sauces', price: 1650, image: '/images/placeholder.png', category: 'special-pizzas', tags: ['premium', 'donner'],
    options: [{ ...mediumLargeOption[0], choices: [
      { id: 'size-medium', name: 'Medium', priceDelta: 0, default: true },
      { id: 'size-large', name: 'Large', priceDelta: 1000 },
    ]}]},
  { id: 'sp-10', name: 'Mr Special Crown', description: 'Our crowned jewel — the ultimate special pizza', price: 1500, image: '/images/placeholder.png', category: 'special-pizzas', tags: ['signature', 'premium'], featured: true,
    options: [{ ...mediumLargeOption[0], choices: [
      { id: 'size-medium', name: 'Medium', priceDelta: 0, default: true },
      { id: 'size-large', name: 'Large', priceDelta: 1000 },
    ]}]},

  // === REGULAR PIZZAS ===
  { id: 'reg-1', name: 'CHICKEN TIKKA', description: 'Classic chicken tikka with traditional spices', price: 650, image: '/images/placeholder.png', category: 'regular-pizzas', tags: ['chicken-tikka', 'classic'], popular: true, featured: true,
    options: [{ ...pizzaSizeOption[0], choices: [
      { id: 'size-small', name: 'Small', priceDelta: 0, default: true },
      { id: 'size-medium', name: 'Medium', priceDelta: 600 },
      { id: 'size-large', name: 'Large', priceDelta: 1250 },
    ]}]},
  { id: 'reg-2', name: 'CHICKEN FAJITA', description: 'Spicy fajita chicken with bell peppers and onions', price: 650, image: '/images/placeholder.png', category: 'regular-pizzas', tags: ['fajita', 'spicy'],
    options: [{ ...pizzaSizeOption[0], choices: [
      { id: 'size-small', name: 'Small', priceDelta: 0, default: true },
      { id: 'size-medium', name: 'Medium', priceDelta: 600 },
      { id: 'size-large', name: 'Large', priceDelta: 1250 },
    ]}]},
  { id: 'reg-3', name: 'CHEESE LOVER', description: 'Extra cheese overload for cheese enthusiasts', price: 650, image: '/images/placeholder.png', category: 'regular-pizzas', tags: ['cheese', 'vegetarian'],
    options: [{ ...pizzaSizeOption[0], choices: [
      { id: 'size-small', name: 'Small', priceDelta: 0, default: true },
      { id: 'size-medium', name: 'Medium', priceDelta: 600 },
      { id: 'size-large', name: 'Large', priceDelta: 1250 },
    ]}]},
  { id: 'reg-4', name: 'VEGGI LOVER', description: 'Fresh garden vegetables on a bed of cheese', price: 650, image: '/images/placeholder.png', category: 'regular-pizzas', tags: ['vegetarian', 'veggie'],
    options: [{ ...pizzaSizeOption[0], choices: [
      { id: 'size-small', name: 'Small', priceDelta: 0, default: true },
      { id: 'size-medium', name: 'Medium', priceDelta: 600 },
      { id: 'size-large', name: 'Large', priceDelta: 1250 },
    ]}]},
  { id: 'reg-5', name: 'Fajita Sicillion', description: 'Sicilian-style fajita pizza with rich toppings', price: 550, image: '/images/placeholder.png', category: 'regular-pizzas', tags: ['fajita', 'sicilian'],
    options: [{ ...pizzaSizeOption[0], choices: [
      { id: 'size-small', name: 'Small', priceDelta: 0, default: true },
      { id: 'size-medium', name: 'Medium', priceDelta: 550 },
      { id: 'size-large', name: 'Large', priceDelta: 1150 },
    ]}]},
  { id: 'reg-6', name: 'Spice On', description: 'Turn up the heat with our spiciest blend', price: 550, image: '/images/placeholder.png', category: 'regular-pizzas', tags: ['spicy'],
    options: [{ ...pizzaSizeOption[0], choices: [
      { id: 'size-small', name: 'Small', priceDelta: 0, default: true },
      { id: 'size-medium', name: 'Medium', priceDelta: 550 },
      { id: 'size-large', name: 'Large', priceDelta: 1150 },
    ]}]},
  { id: 'reg-7', name: 'Chicken Supreme', description: 'The ultimate chicken pizza experience', price: 550, image: '/images/placeholder.png', category: 'regular-pizzas', tags: ['chicken', 'supreme'],
    options: [{ ...pizzaSizeOption[0], choices: [
      { id: 'size-small', name: 'Small', priceDelta: 0, default: true },
      { id: 'size-medium', name: 'Medium', priceDelta: 550 },
      { id: 'size-large', name: 'Large', priceDelta: 1150 },
    ]}]},
  { id: 'reg-8', name: 'Euro', description: 'European-style pizza with classic toppings', price: 550, image: '/images/placeholder.png', category: 'regular-pizzas', tags: ['classic', 'european'],
    options: [{ ...pizzaSizeOption[0], choices: [
      { id: 'size-small', name: 'Small', priceDelta: 0, default: true },
      { id: 'size-medium', name: 'Medium', priceDelta: 550 },
      { id: 'size-large', name: 'Large', priceDelta: 1150 },
    ]}]},

  // === STUFFER PIZZAS ===
  { id: 'stf-1', name: 'CHICKEN STUFFER', description: 'Large stuffed pizza filled with seasoned chicken', price: 2350, image: '/images/placeholder.png', category: 'stuffer-pizzas', tags: ['stuffer', 'chicken']},
  { id: 'stf-2', name: 'CHEESE STUFFER', description: 'Large stuffed pizza bursting with cheese', price: 2350, image: '/images/placeholder.png', category: 'stuffer-pizzas', tags: ['stuffer', 'cheese']},
  { id: 'stf-3', name: 'CHICKEN N CHEESE STUFFER', description: 'Large stuffed pizza with chicken and cheese', price: 2450, image: '/images/placeholder.png', category: 'stuffer-pizzas', tags: ['stuffer', 'chicken', 'cheese']},
  { id: 'stf-4', name: 'KABAB STUFFER', description: 'Large stuffed pizza with flavorful kabab filling', price: 2450, image: '/images/placeholder.png', category: 'stuffer-pizzas', tags: ['stuffer', 'kabab']},
  { id: 'stf-5', name: 'Crunchy Stuffer', description: 'Large stuffed pizza with a crunchy twist', price: 2000, image: '/images/placeholder.png', category: 'stuffer-pizzas', tags: ['stuffer', 'crunchy']},

  // === APPETIZERS ===
  { id: 'app-1', name: 'HOT WINGS (10 Pc)', description: 'Spicy hot chicken wings — 10 pieces', price: 750, image: '/images/placeholder.png', category: 'appetizers', tags: ['wings', 'spicy']},
  { id: 'app-2', name: 'NUGGETS (10 Pc)', description: 'Crispy chicken nuggets — 10 pieces', price: 500, image: '/images/placeholder.png', category: 'appetizers', tags: ['nuggets', 'chicken']},
  { id: 'app-3', name: 'OVEN BAKED WINGS (12 Pc)', description: 'Oven-baked chicken wings — 12 pieces', price: 500, image: '/images/placeholder.png', category: 'appetizers', tags: ['wings', 'baked']},
  { id: 'app-4', name: 'CREAMY WINGS (12 Pc)', description: 'Creamy-style chicken wings — 12 pieces', price: 600, image: '/images/placeholder.png', category: 'appetizers', tags: ['wings', 'creamy']},
  { id: 'app-5', name: 'HONEY MUSTARD WINGS (6 Pc)', description: 'Sweet honey mustard wings — 6 pieces', price: 300, image: '/images/placeholder.png', category: 'appetizers', tags: ['wings', 'honey-mustard']},
  { id: 'app-6', name: 'PERY PERY WINGS (6 Pc)', description: 'Peri peri spiced wings — 6 pieces', price: 300, image: '/images/placeholder.png', category: 'appetizers', tags: ['wings', 'peri-peri']},

  // === BURGERS & SANDWICHES ===
  { id: 'brg-1', name: 'ZINGER BURGER', description: 'Crispy zinger chicken burger with signature sauce', price: 400, image: '/images/placeholder.png', category: 'burgers-sandwiches', tags: ['zinger', 'chicken'], popular: true},
  { id: 'brg-2', name: 'MR. SP ZINGER BURGER', description: 'Our special zinger burger with extra toppings', price: 450, image: '/images/placeholder.png', category: 'burgers-sandwiches', tags: ['zinger', 'special']},
  { id: 'brg-3', name: 'PETTY BURGER', description: 'Classic patty burger with fresh ingredients', price: 350, image: '/images/placeholder.png', category: 'burgers-sandwiches', tags: ['patty', 'classic']},
  { id: 'brg-4', name: 'BBQ BURGER', description: 'Smoky BBQ flavored chicken burger', price: 350, image: '/images/placeholder.png', category: 'burgers-sandwiches', tags: ['bbq', 'chicken']},
  { id: 'brg-5', name: 'Sp Cheese Burger', description: 'Special cheese burger with extra toppings', price: 470, image: '/images/placeholder.png', category: 'burgers-sandwiches', tags: ['cheese', 'special']},
  { id: 'brg-6', name: 'BBQ Special Burger', description: 'Special BBQ burger with premium ingredients', price: 500, image: '/images/placeholder.png', category: 'burgers-sandwiches', tags: ['bbq', 'special']},
  { id: 'brg-7', name: 'Honey Mustard Burger', description: 'Burger with sweet honey mustard dressing', price: 500, image: '/images/placeholder.png', category: 'burgers-sandwiches', tags: ['honey-mustard']},
  { id: 'brg-8', name: 'Mashroom Burger', description: 'Mushroom lovers burger with creamy sauce', price: 450, image: '/images/placeholder.png', category: 'burgers-sandwiches', tags: ['mushroom']},
  { id: 'brg-9', name: 'KAMEERA SANDWICH', description: 'Camera-style loaded sandwich', price: 700, image: '/images/placeholder.png', category: 'burgers-sandwiches', tags: ['sandwich', 'loaded']},
  { id: 'brg-10', name: 'CLUB SANDWICH', description: 'Classic club sandwich with layered fillings', price: 600, image: '/images/placeholder.png', category: 'burgers-sandwiches', tags: ['sandwich', 'classic']},
  { id: 'brg-11', name: 'Crunchy Sandwich', description: 'Crunchy textured sandwich with fresh ingredients', price: 600, image: '/images/placeholder.png', category: 'burgers-sandwiches', tags: ['sandwich', 'crunchy']},

  // === PIZZA BURGERS ===
  { id: 'pbrg-1', name: 'PIZZA ZINGER BURGER', description: 'Zinger burger meets pizza — the ultimate fusion', price: 600, image: '/images/placeholder.png', category: 'pizza-burgers', tags: ['pizza', 'zinger']},
  { id: 'pbrg-2', name: 'PIZZA PETTY BURGER', description: 'Patty burger with pizza-inspired toppings', price: 600, image: '/images/placeholder.png', category: 'pizza-burgers', tags: ['pizza', 'patty']},
  { id: 'pbrg-3', name: 'PIZZA DOUBLE MAC', description: 'Double layered pizza burger', price: 700, image: '/images/placeholder.png', category: 'pizza-burgers', tags: ['pizza', 'double']},
  { id: 'pbrg-4', name: 'Pizza Paratha', description: 'Pizza wrapped in a flaky paratha', price: 600, image: '/images/placeholder.png', category: 'pizza-burgers', tags: ['pizza', 'paratha']},

  // === ROLLS, WRAPS & SHAWARMA ===
  { id: 'rl-1', name: 'SPIN ROLL', description: 'Spicy rolled paratha with chicken filling', price: 700, image: '/images/placeholder.png', category: 'rolls-wraps-shawarma', tags: ['roll', 'spicy']},
  { id: 'rl-2', name: 'NAWABI ROLL', description: 'Royal nawabi style chicken roll', price: 700, image: '/images/placeholder.png', category: 'rolls-wraps-shawarma', tags: ['roll', 'nawabi']},
  { id: 'rl-3', name: 'Mr Special Roll', description: 'Our special signature roll', price: 600, image: '/images/placeholder.png', category: 'rolls-wraps-shawarma', tags: ['roll', 'special']},
  { id: 'rl-4', name: 'Crunchy Roll', description: 'Crunchy textured chicken roll', price: 600, image: '/images/placeholder.png', category: 'rolls-wraps-shawarma', tags: ['roll', 'crunchy']},
  { id: 'rl-5', name: 'Zinger Cheese Paratha', description: 'Zinger with cheese in a paratha wrap', price: 450, image: '/images/placeholder.png', category: 'rolls-wraps-shawarma', tags: ['paratha', 'zinger', 'cheese']},
  { id: 'rl-6', name: 'Zinger Paratha', description: 'Classic zinger paratha roll', price: 350, image: '/images/placeholder.png', category: 'rolls-wraps-shawarma', tags: ['paratha', 'zinger']},
  { id: 'rl-7', name: 'Kabab Paratha', description: 'Flavorful kabab paratha', price: 300, image: '/images/placeholder.png', category: 'rolls-wraps-shawarma', tags: ['paratha', 'kabab']},
  { id: 'rl-8', name: 'CHICKEN SHAWARMA', description: 'Classic chicken shawarma wrap', price: 300, image: '/images/placeholder.png', category: 'rolls-wraps-shawarma', tags: ['shawarma', 'chicken']},
  { id: 'rl-9', name: 'CHEESY SHAWARMA', description: 'Cheesy chicken shawarma wrap', price: 300, image: '/images/placeholder.png', category: 'rolls-wraps-shawarma', tags: ['shawarma', 'cheese']},
  { id: 'rl-10', name: 'ZINGER SHAWARMA', description: 'Zinger style shawarma wrap', price: 350, image: '/images/placeholder.png', category: 'rolls-wraps-shawarma', tags: ['shawarma', 'zinger']},
  { id: 'rl-11', name: 'Platter Shawarma', description: 'Shawarma platter with all the fixings', price: 400, image: '/images/placeholder.png', category: 'rolls-wraps-shawarma', tags: ['shawarma', 'platter']},
  { id: 'rl-12', name: 'Tottila Wrap', description: 'Tortilla wrap with seasoned chicken', price: 400, image: '/images/placeholder.png', category: 'rolls-wraps-shawarma', tags: ['wrap', 'tortilla']},
  { id: 'rl-13', name: 'Chicken Grill', description: 'Grilled chicken with spices', price: 400, image: '/images/placeholder.png', category: 'rolls-wraps-shawarma', tags: ['grill', 'chicken']},

  // === PASTA & FRIES ===
  { id: 'pst-1', name: 'MR SP PASTA', description: 'Our special signature pasta', price: 400, image: '/images/placeholder.png', category: 'pasta-fries', tags: ['pasta', 'special'],
    options: [{ ...halfFullOption[0], choices: [
      { id: 'portion-half', name: 'Half', priceDelta: 0, default: true },
      { id: 'portion-full', name: 'Full', priceDelta: 350 },
    ]}]},
  { id: 'pst-2', name: 'CREAMY PASTA', description: 'Rich and creamy white sauce pasta', price: 400, image: '/images/placeholder.png', category: 'pasta-fries', tags: ['pasta', 'creamy'],
    options: [{ ...halfFullOption[0], choices: [
      { id: 'portion-half', name: 'Half', priceDelta: 0, default: true },
      { id: 'portion-full', name: 'Full', priceDelta: 350 },
    ]}]},
  { id: 'pst-3', name: 'PLAINE FRIES', description: 'Classic crispy french fries', price: 250, image: '/images/placeholder.png', category: 'pasta-fries', tags: ['fries', 'classic']},
  { id: 'pst-4', name: 'GARLIC FRIES', description: 'Crispy fries tossed in garlic butter', price: 300, image: '/images/placeholder.png', category: 'pasta-fries', tags: ['fries', 'garlic']},
  { id: 'pst-5', name: 'MASALA FRIES', description: 'Fries seasoned with spicy masala', price: 300, image: '/images/placeholder.png', category: 'pasta-fries', tags: ['fries', 'masala']},
  { id: 'pst-6', name: 'LOADED FRIES', description: 'Fries loaded with cheese, sauce and toppings', price: 700, image: '/images/placeholder.png', category: 'pasta-fries', tags: ['fries', 'loaded']},

  // === RICE & SAJJI ===
  { id: 'rice-1', name: 'Chicken Biryani Sp', description: 'Special chicken biryani with aromatic spices', price: 350, image: '/images/placeholder.png', category: 'rice-sajji', tags: ['biryani', 'rice'],
    options: [{ ...halfFullOption[0], choices: [
      { id: 'portion-half', name: 'Half', priceDelta: 0, default: true },
      { id: 'portion-full', name: 'Full', priceDelta: 250 },
    ]}]},
  { id: 'rice-2', name: 'Mr. Special Sajji', description: 'Our special sajji with raita and khubani sauce', price: 700, image: '/images/placeholder.png', category: 'rice-sajji', tags: ['sajji', 'special'],
    options: [{ ...quarterHalfFullOption[0], choices: [
      { id: 'portion-quarter', name: 'Quarter', priceDelta: 0, default: true },
      { id: 'portion-half', name: 'Half', priceDelta: 700 },
      { id: 'portion-full', name: 'Full', priceDelta: 1900 },
    ]}]},

  // === PLATTERS ===
  { id: 'plt-1', name: 'Mr s Sp', description: 'Oven Baked Wings (6pc), Spring Rolls (2pc), Mayo Dip', price: 850, image: '/images/placeholder.png', category: 'platters', tags: ['platter', 'wings', 'rolls']},
  { id: 'plt-2', name: 'Creamy', description: 'Creamy Wings (6pc), Nawabi Rolls (2pc), Mayo Dip', price: 950, image: '/images/placeholder.png', category: 'platters', tags: ['platter', 'creamy', 'rolls']},

  // === BEVERAGES & DRINKS ===
  { id: 'bev-1', name: '1.5 LTR DRINK', description: '1.5 liter bottled soft drink', price: 230, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['soft-drink', 'bottled']},
  { id: 'bev-2', name: '1 LTR DRINK', description: '1 liter bottled soft drink', price: 170, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['soft-drink', 'bottled']},
  { id: 'bev-3', name: '500 ML DRINK', description: '500 ml bottled soft drink', price: 120, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['soft-drink', 'bottled']},
  { id: 'bev-4', name: 'TEN PACK', description: '10-pack canned drinks', price: 120, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['canned', 'pack']},
  { id: 'bev-5', name: 'SMALL WATER', description: 'Small bottled water', price: 70, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['water']},
  { id: 'bev-6', name: 'LARGE WATER', description: 'Large bottled water', price: 120, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['water']},
  { id: 'bev-7', name: 'MR. SP PUNK', description: 'Our signature special drink', price: 550, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['special', 'drink']},
  { id: 'bev-8', name: 'PINK LADY', description: 'Refreshing pink lady drink', price: 500, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['special', 'drink']},
  { id: 'bev-9', name: 'PINACOLADA', description: 'Classic pina colada mocktail', price: 500, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['mocktail', 'creamy']},
  { id: 'bev-10', name: 'BLUE BUZZ', description: 'Blue colored refreshing buzz drink', price: 500, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['special', 'drink']},
  { id: 'bev-11', name: 'PINK BUZZ', description: 'Pink colored refreshing buzz drink', price: 500, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['special', 'drink']},
  { id: 'bev-12', name: 'RAINBOW SODA', description: 'Colorful rainbow flavored soda', price: 400, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['soda', 'refreshing']},
  { id: 'bev-13', name: 'ITALIAN SODA', description: 'Classic Italian soda', price: 400, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['soda', 'italian']},
  { id: 'bev-14', name: 'NORTHPOL SODA', description: 'Northpole flavored soda', price: 400, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['soda', 'refreshing']},
  { id: 'bev-15', name: 'PINEAPPLE JUICE', description: 'Fresh pineapple juice', price: 450, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['juice', 'pineapple']},
  { id: 'bev-16', name: 'APPLE JUICE', description: 'Fresh apple juice', price: 450, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['juice', 'apple']},
  { id: 'bev-17', name: 'PEACH JUICE', description: 'Fresh peach juice', price: 350, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['juice', 'peach']},
  { id: 'bev-18', name: 'STRAWBERRY JUICE', description: 'Fresh strawberry juice', price: 350, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['juice', 'strawberry']},
  { id: 'bev-19', name: 'MANGO JUICE', description: 'Fresh mango juice', price: 350, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['juice', 'mango']},
  { id: 'bev-20', name: 'ORANGE JUICE', description: 'Fresh orange juice', price: 350, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['juice', 'orange']},
  { id: 'bev-21', name: 'MR. SP SHAKE', description: 'Our signature special milkshake', price: 450, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['shake', 'special']},
  { id: 'bev-22', name: 'OREO STRAWBERRY', description: 'Oreo and strawberry blended shake', price: 450, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['shake', 'oreo', 'strawberry']},
  { id: 'bev-23', name: 'OREO SHAKE', description: 'Classic Oreo milkshake', price: 400, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['shake', 'oreo']},
  { id: 'bev-24', name: 'KITKAT SHAKE', description: 'Kitkat chocolate milkshake', price: 400, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['shake', 'kitkat']},
  { id: 'bev-25', name: 'LOTUS SHAKE', description: 'Lotus biscoff flavored milkshake', price: 450, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['shake', 'lotus']},
  { id: 'bev-26', name: 'COLD COFFEE', description: 'Chilled coffee drink', price: 450, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['coffee', 'cold']},
  { id: 'bev-27', name: 'ELECT LEMONADE', description: 'Electrifying lemonade drink', price: 350, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['lemonade', 'refreshing']},
  { id: 'bev-28', name: 'STRAW MARGARITA', description: 'Strawberry margarita mocktail', price: 350, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['mocktail', 'strawberry']},
  { id: 'bev-29', name: 'MINT MARGARITA', description: 'Mint margarita mocktail', price: 250, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['mocktail', 'mint']},
  { id: 'bev-30', name: 'STRAWBERRY SHAKE', description: 'Fresh strawberry milkshake', price: 350, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['shake', 'strawberry']},
  { id: 'bev-31', name: 'MANGO SHAKE', description: 'Fresh mango milkshake', price: 350, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['shake', 'mango']},
  { id: 'bev-32', name: 'BANANA SHAKE', description: 'Fresh banana milkshake', price: 300, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['shake', 'banana']},
  { id: 'bev-33', name: 'APPLE SHAKE', description: 'Fresh apple milkshake', price: 350, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['shake', 'apple']},
  { id: 'bev-34', name: 'APPLE BANANA SHK', description: 'Apple and banana blended shake', price: 350, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['shake', 'apple', 'banana']},
  { id: 'bev-35', name: 'STRAWBERRY BANANA', description: 'Strawberry and banana blended shake', price: 400, image: '/images/placeholder.png', category: 'beverages-drinks', tags: ['shake', 'strawberry', 'banana']},
];

export const deals: Deal[] = [
  {
    id: 'deal-1',
    name: 'Deal 1',
    description: '1 Small Pizza + 1 Mr Special Platter + 1 Cold Drink 500ml',
    image: '/images/placeholder.png',
    items: [
      { menuItemId: 'sp-1', quantity: 1, note: 'Small' },
      { menuItemId: 'plt-1', quantity: 1 },
      { menuItemId: 'bev-3', quantity: 1 },
    ],
    price: 1550,
    originalPrice: 1850,
    savings: 300,
    active: true,
    badge: 'Popular',
  },
  {
    id: 'deal-2',
    name: 'Deal 2',
    description: '1 Medium Pizza + 1 Pasta + 1 Cold Drink 500ml',
    image: '/images/placeholder.png',
    items: [
      { menuItemId: 'sp-1', quantity: 1, note: 'Medium' },
      { menuItemId: 'pst-1', quantity: 1 },
      { menuItemId: 'bev-3', quantity: 1 },
    ],
    price: 2050,
    originalPrice: 2420,
    savings: 370,
    active: true,
  },
  {
    id: 'deal-3',
    name: 'Deal 3',
    description: '1 Large Pizza + 1 Fries + 1 Cold Drink 1Ltr',
    image: '/images/placeholder.png',
    items: [
      { menuItemId: 'sp-1', quantity: 1, note: 'Large' },
      { menuItemId: 'pst-3', quantity: 1 },
      { menuItemId: 'bev-2', quantity: 1 },
    ],
    price: 2250,
    originalPrice: 2620,
    savings: 370,
    active: true,
  },
  {
    id: 'deal-4',
    name: 'Deal 4',
    description: '2 Medium Pizza + 1 Fries + 1 Cold Drink 1.5Ltr',
    image: '/images/placeholder.png',
    items: [
      { menuItemId: 'sp-1', quantity: 2, note: 'Medium' },
      { menuItemId: 'pst-3', quantity: 1 },
      { menuItemId: 'bev-1', quantity: 1 },
    ],
    price: 3000,
    originalPrice: 3550,
    savings: 550,
    active: true,
  },
  {
    id: 'deal-5',
    name: 'Deal 5',
    description: '1 Large Pizza + 1 Medium Pizza + 1 Fries + 1 Cold Drink 1.5Ltr',
    image: '/images/placeholder.png',
    items: [
      { menuItemId: 'sp-1', quantity: 1, note: 'Large' },
      { menuItemId: 'sp-1', quantity: 1, note: 'Medium' },
      { menuItemId: 'pst-3', quantity: 1 },
      { menuItemId: 'bev-1', quantity: 1 },
    ],
    price: 3600,
    originalPrice: 4250,
    savings: 650,
    active: true,
    badge: 'Best Value',
  },
  {
    id: 'deal-6',
    name: 'Deal 6',
    description: '2 Large Pizza + 1 Fries + 1 Cold Drink 1.5Ltr',
    image: '/images/placeholder.png',
    items: [
      { menuItemId: 'sp-1', quantity: 2, note: 'Large' },
      { menuItemId: 'pst-3', quantity: 1 },
      { menuItemId: 'bev-1', quantity: 1 },
    ],
    price: 4100,
    originalPrice: 4900,
    savings: 800,
    active: true,
    badge: 'Feeds 4-6',
  },
  {
    id: 'deal-7',
    name: 'Deal 7',
    description: '1 Small Pizza + 2 Zinger Burger + 2 Cane Drink',
    image: '/images/placeholder.png',
    items: [
      { menuItemId: 'sp-1', quantity: 1, note: 'Small' },
      { menuItemId: 'brg-1', quantity: 2 },
    ],
    price: 1650,
    originalPrice: 1900,
    savings: 250,
    active: true,
  },
  {
    id: 'deal-8',
    name: 'Deal 8',
    description: '4 Zinger Burger + 2 Regular Fries + 1 1.5Ltr Drink',
    image: '/images/placeholder.png',
    items: [
      { menuItemId: 'brg-1', quantity: 4 },
      { menuItemId: 'pst-3', quantity: 2 },
      { menuItemId: 'bev-1', quantity: 1 },
    ],
    price: 2100,
    originalPrice: 2530,
    savings: 430,
    active: true,
  },
  {
    id: 'deal-9',
    name: 'Deal 9',
    description: '6 Zinger Burger + 2 Regular Fries + 1 1.5Ltr Drink',
    image: '/images/placeholder.png',
    items: [
      { menuItemId: 'brg-1', quantity: 6 },
      { menuItemId: 'pst-3', quantity: 2 },
      { menuItemId: 'bev-1', quantity: 1 },
    ],
    price: 2800,
    originalPrice: 3330,
    savings: 530,
    active: true,
  },
  {
    id: 'deal-10',
    name: 'Deal 10',
    description: '2 Large Pizza + 2 Fries + 4 Patty Burger + 1.5Ltr + 1Ltr Drinks',
    image: '/images/placeholder.png',
    items: [
      { menuItemId: 'sp-1', quantity: 2, note: 'Large' },
      { menuItemId: 'pst-3', quantity: 2 },
      { menuItemId: 'brg-3', quantity: 4 },
      { menuItemId: 'bev-1', quantity: 1 },
      { menuItemId: 'bev-2', quantity: 1 },
    ],
    price: 5700,
    originalPrice: 6870,
    savings: 1170,
    active: true,
    badge: 'Mega Deal',
  },
];

export function getMenuItemById(id: string): MenuItem | undefined {
  return menuItems.find(item => item.id === id);
}

export function getMenuItemsByCategory(categorySlug: string): MenuItem[] {
  return menuItems.filter(item => item.category === categorySlug);
}

export function getDealById(id: string): Deal | undefined {
  return deals.find(deal => deal.id === id);
}

export function getActiveDeals(): Deal[] {
  return deals.filter(deal => deal.active);
}

export function getFeaturedItems(): MenuItem[] {
  return menuItems.filter(item => item.featured);
}

export function getPopularItems(): MenuItem[] {
  return menuItems.filter(item => item.popular);
}

export function calculateItemTotal(item: MenuItem, selectedOptions: Record<string, string> = {}): number {
  let total = item.price;
  if (item.options) {
    for (const option of item.options) {
      const choiceId = selectedOptions[option.id];
      if (choiceId) {
        const choice = option.choices.find(c => c.id === choiceId);
        if (choice) total += choice.priceDelta;
      } else if (option.required) {
        const defaultChoice = option.choices.find(c => c.default);
        if (defaultChoice) total += defaultChoice.priceDelta;
      }
    }
  }
  return total;
}
