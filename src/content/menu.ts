import { MenuItem, Category, Deal } from '@/types';

const CAT_IMG = {
  'special-pizzas': '/assets/Catergories/Special-Pizza.webp',
  'regular-pizzas': '/assets/Catergories/Regular_Pizza.webp',
  'stuffer-pizzas': '/assets/Catergories/Stuffer_Pizza.webp',
  'appetizers': '/assets/Catergories/Appetizers.webp',
  'burgers-sandwiches': '/assets/Catergories/Burgers_Sandwiches.webp',
  'pizza-burgers': '/assets/Catergories/Pizza_Burgers.webp',
  'rolls-wraps-shawarma': '/assets/Catergories/rolls_wraps_shawarma.webp',
  'pasta-fries': '/assets/Catergories/Pasta_Fries.webp',
  'rice-sajji': '/assets/Catergories/Rice_Sajji.webp',
  'platters': '/assets/Catergories/Platters.webp',
  'beverages-drinks': '/assets/Catergories/Beverages_Drinks.webp',
};

export const categories: Category[] = [
  { id: 'cat-1', name: 'Special Pizzas', slug: 'special-pizzas', description: 'Premium hand-crafted signature pizzas', order: 1, image: '/assets/Catergories/Special-Pizza.webp' },
  { id: 'cat-2', name: 'Regular Pizzas', slug: 'regular-pizzas', description: 'Classic favorites, baked to perfection', order: 2, image: '/assets/Catergories/Regular_Pizza.webp' },
  { id: 'cat-3', name: 'Stuffer Pizzas', slug: 'stuffer-pizzas', description: 'Loaded crust, extra filling', order: 3, image: '/assets/Catergories/Stuffer_Pizza.webp' },
  { id: 'cat-4', name: 'Appetizers', slug: 'appetizers', description: 'Perfect starters to share', order: 4, image: '/assets/Catergories/Appetizers.webp' },
  { id: 'cat-5', name: 'Burgers & Sandwiches', slug: 'burgers-sandwiches', description: 'Hearty hand-crafted burgers', order: 5, image: '/assets/Catergories/Burgers_Sandwiches.webp' },
  { id: 'cat-6', name: 'Pizza Burgers', slug: 'pizza-burgers', description: 'The best of both worlds', order: 6, image: '/assets/Catergories/Pizza_Burgers.webp' },
  { id: 'cat-7', name: 'Rolls, Wraps & Shawarma', slug: 'rolls-wraps-shawarma', description: 'Wrapped and rolled to perfection', order: 7, image: '/assets/Catergories/rolls_wraps_shawarma.webp' },
  { id: 'cat-8', name: 'Pasta & Fries', slug: 'pasta-fries', description: 'Comfort food classics', order: 8, image: '/assets/Catergories/Pasta_Fries.webp' },
  { id: 'cat-9', name: 'Rice & Sajji', slug: 'rice-sajji', description: 'Traditional rice dishes and sajji', order: 9, image: '/assets/Catergories/Rice_Sajji.webp' },
  { id: 'cat-10', name: 'Platters', slug: 'platters', description: 'Complete meals for sharing', order: 10, image: '/assets/Catergories/Platters.webp' },
  { id: 'cat-11', name: 'Beverages & Drinks', slug: 'beverages-drinks', description: 'Refreshing drinks and shakes', order: 11, image: '/assets/Catergories/Beverages_Drinks.webp' },
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
  { id: 'sp-1', name: 'MR. SP PIZZA', briefDescription: 'Signature pizza loaded with premium toppings', description: 'Our signature special pizza loaded with a generous combination of premium toppings — tender chicken, savoury beef, melted mozzarella, fresh onions, crisp bell peppers, earthy mushrooms, and our secret signature sauce. Every bite delivers a perfect balance of smoky, savory, and rich flavors on a hand-stretched, fire-kissed crust that is baked to golden perfection.', price: 700, image: CAT_IMG['special-pizzas'], category: 'special-pizzas', tags: ['signature', 'premium'], popular: true, featured: true, ingredients: ['Chicken', 'Beef', 'Cheese', 'Onions', 'Bell Peppers', 'Mushrooms', 'Signature Sauce'], relatedItems: ['sp-2', 'sp-3', 'sp-5', 'sp-8', 'sp-10'],
    options: [{ ...pizzaSizeOption[0], choices: [
      { id: 'size-small', name: 'Small', priceDelta: 0, default: true },
      { id: 'size-medium', name: 'Medium', priceDelta: 650 },
      { id: 'size-large', name: 'Large', priceDelta: 1300 },
    ]}]},
  { id: 'sp-2', name: 'ROYAL SUPREME', briefDescription: 'A royal feast on perfect crust', description: 'A magnificent medley fit for royalty — succulent chicken, savoury beef, briny black olives, crunchy capsicum, sweet onions, a generous layer of mozzarella cheese, and a fragrant sprinkle of oregano. Each slice is a celebration of bold, layered flavors baked onto our signature hand-stretched crust, delivering a truly supreme pizza experience.', price: 700, image: CAT_IMG['special-pizzas'], category: 'special-pizzas', tags: ['premium', 'signature'], popular: true, featured: true, ingredients: ['Chicken', 'Beef', 'Cheese', 'Olives', 'Capsicum', 'Onions', 'Oregano'], relatedItems: ['sp-1', 'sp-5', 'sp-8', 'sp-10', 'sp-3'],
    options: [{ ...pizzaSizeOption[0], choices: [
      { id: 'size-small', name: 'Small', priceDelta: 0, default: true },
      { id: 'size-medium', name: 'Medium', priceDelta: 650 },
      { id: 'size-large', name: 'Large', priceDelta: 1300 },
    ]}]},
  { id: 'sp-3', name: 'CLICK ON', briefDescription: 'Crowd-pleasing classic with bold flavors', description: 'A crowd-favorite that never disappoints. Featuring tender chicken, gooey mozzarella, sweet caramelized onions, crunchy capsicum, earthy mushrooms, and a generous drizzle of smoky BBQ sauce. Every ingredient is carefully layered to create a harmonious balance of sweet, tangy, and savory notes that keep you coming back for more.', price: 700, image: CAT_IMG['special-pizzas'], category: 'special-pizzas', tags: ['classic'], ingredients: ['Chicken', 'Cheese', 'Onions', 'Capsicum', 'Mushrooms', 'BBQ Sauce'], relatedItems: ['sp-1', 'sp-2', 'sp-4', 'sp-6', 'sp-7'],
    options: [{ ...pizzaSizeOption[0], choices: [
      { id: 'size-small', name: 'Small', priceDelta: 0, default: true },
      { id: 'size-medium', name: 'Medium', priceDelta: 650 },
      { id: 'size-large', name: 'Large', priceDelta: 1300 },
    ]}]},
  { id: 'sp-4', name: 'BORNE FIRE', briefDescription: 'Fiery and bold for heat lovers', description: 'Ignite your taste buds with our fieriest creation. Juicy chicken meets sliced jalapenos, melted mozzarella, crisp onions, a dusting of red chili flakes, and our signature peri peri sauce. This is not just pizza — it is an experience. Each bite sends a wave of heat balanced by the creamy richness of cheese, designed for those who truly love the fire.', price: 600, image: CAT_IMG['special-pizzas'], category: 'special-pizzas', tags: ['spicy', 'signature'], ingredients: ['Chicken', 'Jalapenos', 'Cheese', 'Onions', 'Red Chili Flakes', 'Peri Peri Sauce'], relatedItems: ['sp-3', 'sp-1', 'sp-6', 'sp-9', 'sp-7'],
    options: [{ ...pizzaSizeOption[0], choices: [
      { id: 'size-small', name: 'Small', priceDelta: 0, default: true },
      { id: 'size-medium', name: 'Medium', priceDelta: 600 },
      { id: 'size-large', name: 'Large', priceDelta: 1200 },
    ]}]},
  { id: 'sp-5', name: 'ROYAL CRUST', briefDescription: 'Premium crust with royal toppings', description: 'A masterpiece of premium ingredients atop an extra-thick, buttery golden crust. We load it with tender chicken, a double layer of mozzarella, crunchy capsicum, sliced onions, briny black olives, and a generous brush of garlic butter that soaks into every bite of the crown crust. This is pizza elevated to an art form.', price: 1450, image: CAT_IMG['special-pizzas'], category: 'special-pizzas', tags: ['premium'], ingredients: ['Chicken', 'Cheese', 'Capsicum', 'Onions', 'Black Olives', 'Garlic Butter'], relatedItems: ['sp-2', 'sp-8', 'sp-10', 'sp-1', 'sp-7'],
    options: [{ ...mediumLargeOption[0], choices: [
      { id: 'size-medium', name: 'Medium', priceDelta: 0, default: true },
      { id: 'size-large', name: 'Large', priceDelta: 700 },
    ]}]},
  { id: 'sp-6', name: 'BEHARI KABAB', briefDescription: 'Behari kabab flavors on pizza', description: 'Experience the bold, aromatic flavors of traditional Behari kabab reimagined on a pizza. Marinated kabab pieces are layered over melted cheese with sliced onions, crunchy capsicum, and a drizzle of creamy yogurt sauce. The smoky, spiced kabab pairs beautifully with the rich cheese and tangy yogurt, creating a fusion that pays homage to a classic Pakistani favorite.', price: 1450, image: CAT_IMG['special-pizzas'], category: 'special-pizzas', tags: ['premium', 'behari-kabab'], ingredients: ['Behari Kabab', 'Cheese', 'Onions', 'Capsicum', 'Yogurt Sauce'], relatedItems: ['sp-4', 'sp-9', 'sp-3', 'sp-7', 'sp-1'],
    options: [{ ...mediumLargeOption[0], choices: [
      { id: 'size-medium', name: 'Medium', priceDelta: 0, default: true },
      { id: 'size-large', name: 'Large', priceDelta: 700 },
    ]}]},
  { id: 'sp-7', name: 'MAKHNI PIZZA', briefDescription: 'Rich buttery makhni flavored pizza', description: 'Inspired by the rich, velvety makhni gravy of North Indian cuisine, this pizza is a decadent treat. Tender pieces of chicken are smothered in a luscious buttery tomato-cream sauce, layered with mozzarella, crunchy capsicum, and sweet onions. The result is a luxuriously smooth, mildly spiced pizza that melts in your mouth with every bite.', price: 1450, image: CAT_IMG['special-pizzas'], category: 'special-pizzas', tags: ['premium', 'makhni'], ingredients: ['Chicken', 'Cheese', 'Butter Sauce', 'Cream', 'Capsicum', 'Onions'], relatedItems: ['sp-5', 'sp-2', 'sp-8', 'sp-6', 'sp-10'],
    options: [{ ...mediumLargeOption[0], choices: [
      { id: 'size-medium', name: 'Medium', priceDelta: 0, default: true },
      { id: 'size-large', name: 'Large', priceDelta: 700 },
    ]}]},
  { id: 'sp-8', name: 'MR SP SENSATION', briefDescription: 'Sensational signature creation', description: 'Our most sensational creation yet — a loaded masterpiece featuring both succulent chicken and savoury beef, earthy mushrooms, briny black olives, crunchy capsicum, and our top-secret signature sauce. Every ingredient is precisely portioned to ensure each slice delivers the same incredible burst of flavor. The sensation that started it all.', price: 1650, image: CAT_IMG['special-pizzas'], category: 'special-pizzas', tags: ['signature', 'premium'], ingredients: ['Chicken', 'Beef', 'Cheese', 'Mushrooms', 'Olives', 'Capsicum', 'Signature Sauce'], relatedItems: ['sp-1', 'sp-10', 'sp-2', 'sp-5', 'sp-9'],
    options: [{ ...mediumLargeOption[0], choices: [
      { id: 'size-medium', name: 'Medium', priceDelta: 0, default: true },
      { id: 'size-large', name: 'Large', priceDelta: 1000 },
    ]}]},
  { id: 'sp-9', name: 'DONNER PIZZA', briefDescription: 'Loaded with donner meat and sauces', description: 'A hearty celebration of Middle Eastern flavors. We pile our hand-stretched crust high with succulent, spiced donner meat, gooey melted cheese, crisp onions, crunchy capsicum, a drizzle of garlic mayo, and fresh shredded lettuce. The combination of warm, savory donner with cool, creamy garlic sauce creates an unforgettable contrast of textures and tastes.', price: 1650, image: CAT_IMG['special-pizzas'], category: 'special-pizzas', tags: ['premium', 'donner'], ingredients: ['Donner Meat', 'Cheese', 'Onions', 'Capsicum', 'Garlic Mayo', 'Lettuce'], relatedItems: ['sp-6', 'sp-4', 'sp-8', 'sp-1', 'sp-3'],
    options: [{ ...mediumLargeOption[0], choices: [
      { id: 'size-medium', name: 'Medium', priceDelta: 0, default: true },
      { id: 'size-large', name: 'Large', priceDelta: 1000 },
    ]}]},
  { id: 'sp-10', name: 'Mr Special Crown', briefDescription: 'Crowned jewel ultimate special pizza', description: 'Our crowned jewel — the ultimate special pizza that defines everything we stand for. Featuring both chicken and beef, a crown crust brushed with garlic butter, mozzarella cheese, fresh capsicum, onions, and mushrooms. This is our showstopper, designed for those who want nothing but the very best. A true centerpiece for any occasion.', price: 1500, image: CAT_IMG['special-pizzas'], category: 'special-pizzas', tags: ['signature', 'premium'], featured: true, ingredients: ['Chicken', 'Beef', 'Cheese', 'Capsicum', 'Onions', 'Mushrooms', 'Crown Crust'], relatedItems: ['sp-1', 'sp-2', 'sp-5', 'sp-8', 'sp-7'],
    options: [{ ...mediumLargeOption[0], choices: [
      { id: 'size-medium', name: 'Medium', priceDelta: 0, default: true },
      { id: 'size-large', name: 'Large', priceDelta: 1000 },
    ]}]},

  // === REGULAR PIZZAS ===
  { id: 'reg-1', name: 'CHICKEN TIKKA', briefDescription: 'Classic chicken tikka with traditional spices', description: 'A timeless classic that never goes out of style. Marinated chicken tikka pieces bursting with traditional spices — cumin, coriander, garam masala, and yogurt — layered over a bed of melted mozzarella, sliced onions, crunchy capsicum, and our signature tikka sauce. Each bite is a nostalgic journey back to the soul of authentic Pakistani cuisine, reimagined on a perfect pizza crust.', price: 650, image: CAT_IMG['regular-pizzas'], category: 'regular-pizzas', tags: ['chicken-tikka', 'classic'], popular: true, featured: true, ingredients: ['Chicken Tikka', 'Cheese', 'Onions', 'Capsicum', 'Tikka Sauce'], relatedItems: ['reg-2', 'reg-5', 'reg-7', 'reg-3', 'reg-4'],
    options: [{ ...pizzaSizeOption[0], choices: [
      { id: 'size-small', name: 'Small', priceDelta: 0, default: true },
      { id: 'size-medium', name: 'Medium', priceDelta: 600 },
      { id: 'size-large', name: 'Large', priceDelta: 1250 },
    ]}]},
  { id: 'reg-2', name: 'CHICKEN FAJITA', briefDescription: 'Spicy fajita chicken pizza', description: 'Bringing the sizzle of classic fajitas to your pizza. Spiced chicken fajita strips are paired with sautéed bell peppers, caramelized onions, gooey mozzarella, and a bold fajita sauce that ties everything together. The smoky, slightly charred flavor of the vegetables complements the juicy chicken for a vibrant, fiesta-inspired pizza experience.', price: 650, image: CAT_IMG['regular-pizzas'], category: 'regular-pizzas', tags: ['fajita', 'spicy'], ingredients: ['Chicken Fajita', 'Cheese', 'Bell Peppers', 'Onions', 'Fajita Sauce'], relatedItems: ['reg-1', 'reg-5', 'reg-6', 'reg-7', 'reg-8'],
    options: [{ ...pizzaSizeOption[0], choices: [
      { id: 'size-small', name: 'Small', priceDelta: 0, default: true },
      { id: 'size-medium', name: 'Medium', priceDelta: 600 },
      { id: 'size-large', name: 'Large', priceDelta: 1250 },
    ]}]},
  { id: 'reg-3', name: 'CHEESE LOVER', briefDescription: 'Extra cheese overload for enthusiasts', description: 'A decadent, indulgent pizza designed for true cheese connoisseurs. We layer not one, not two, but four distinct cheeses — stretchy mozzarella, sharp cheddar, nutty parmesan, and velvety cream cheese — all melted together into a glorious, golden blanket over our signature tomato sauce. Finished with a sprinkle of oregano, this is cheese in its most magnificent form.', price: 650, image: CAT_IMG['regular-pizzas'], category: 'regular-pizzas', tags: ['cheese', 'vegetarian'], ingredients: ['Mozzarella', 'Cheddar', 'Parmesan', 'Cream Cheese', 'Oregano'], relatedItems: ['reg-4', 'reg-1', 'reg-7', 'reg-8', 'reg-2'],
    options: [{ ...pizzaSizeOption[0], choices: [
      { id: 'size-small', name: 'Small', priceDelta: 0, default: true },
      { id: 'size-medium', name: 'Medium', priceDelta: 600 },
      { id: 'size-large', name: 'Large', priceDelta: 1250 },
    ]}]},
  { id: 'reg-4', name: 'VEGGI LOVER', briefDescription: 'Fresh garden vegetables on cheese', description: 'A vibrant celebration of fresh garden produce at its peak. We pile our pizzas high with crunchy capsicum, sweet onions, briny olives, earthy mushrooms, sweet corn kernels, and juicy tomatoes — all atop a generous bed of melted mozzarella. Each vegetable is carefully selected for peak freshness, creating a colorful, nutrient-packed pizza that even meat lovers will crave.', price: 650, image: CAT_IMG['regular-pizzas'], category: 'regular-pizzas', tags: ['vegetarian', 'veggie'], ingredients: ['Capsicum', 'Onions', 'Olives', 'Mushrooms', 'Corn', 'Tomatoes', 'Cheese'], relatedItems: ['reg-3', 'reg-1', 'reg-5', 'reg-8', 'reg-7'],
    options: [{ ...pizzaSizeOption[0], choices: [
      { id: 'size-small', name: 'Small', priceDelta: 0, default: true },
      { id: 'size-medium', name: 'Medium', priceDelta: 600 },
      { id: 'size-large', name: 'Large', priceDelta: 1250 },
    ]}]},
  { id: 'reg-5', name: 'Fajita Sicillion', briefDescription: 'Sicilian-style fajita pizza', description: 'A beautiful marriage of Italian and Mexican flavors. We take our classic fajita chicken and capsicum and present them on a thicker, Sicilian-style crust with a rich, herbed tomato base. The fajita spices mingle with the Sicilian herbs to create a truly unique fusion pizza that is hearty, satisfying, and packed with personality.', price: 550, image: CAT_IMG['regular-pizzas'], category: 'regular-pizzas', tags: ['fajita', 'sicilian'], ingredients: ['Chicken Fajita', 'Cheese', 'Capsicum', 'Onions', 'Sicilian Sauce'], relatedItems: ['reg-2', 'reg-1', 'reg-6', 'reg-7', 'reg-4'],
    options: [{ ...pizzaSizeOption[0], choices: [
      { id: 'size-small', name: 'Small', priceDelta: 0, default: true },
      { id: 'size-medium', name: 'Medium', priceDelta: 550 },
      { id: 'size-large', name: 'Large', priceDelta: 1150 },
    ]}]},
  { id: 'reg-6', name: 'Spice On', briefDescription: 'Spiciest blend to turn up heat', description: 'Turn up the heat with our spiciest blend. This pizza is not for the faint of heart — tender spicy chicken, sliced jalapenos, red pepper flakes, and our proprietary spicy sauce create a layered, building heat that starts warm and grows with every bite. The mozzarella and onions provide just enough cooling balance to keep you coming back for more punishment.', price: 550, image: CAT_IMG['regular-pizzas'], category: 'regular-pizzas', tags: ['spicy'], ingredients: ['Chicken', 'Cheese', 'Jalapenos', 'Onions', 'Red Pepper', 'Spicy Sauce'], relatedItems: ['reg-2', 'reg-5', 'reg-1', 'reg-7', 'reg-8'],
    options: [{ ...pizzaSizeOption[0], choices: [
      { id: 'size-small', name: 'Small', priceDelta: 0, default: true },
      { id: 'size-medium', name: 'Medium', priceDelta: 550 },
      { id: 'size-large', name: 'Large', priceDelta: 1150 },
    ]}]},
  { id: 'reg-7', name: 'Chicken Supreme', briefDescription: 'Ultimate chicken pizza experience', description: 'The ultimate destination for chicken lovers. We start with our signature crust, layer on a double portion of tender oven-roasted chicken, add earthy mushrooms, crunchy capsicum, sweet onions, and a generous blanket of mozzarella, then finish with our rich supreme sauce. Every ingredient is chosen to highlight the star of the show — perfectly seasoned, juicy chicken.', price: 550, image: CAT_IMG['regular-pizzas'], category: 'regular-pizzas', tags: ['chicken', 'supreme'], ingredients: ['Chicken', 'Cheese', 'Mushrooms', 'Capsicum', 'Onions', 'Supreme Sauce'], relatedItems: ['reg-1', 'reg-2', 'reg-5', 'reg-6', 'reg-8'],
    options: [{ ...pizzaSizeOption[0], choices: [
      { id: 'size-small', name: 'Small', priceDelta: 0, default: true },
      { id: 'size-medium', name: 'Medium', priceDelta: 550 },
      { id: 'size-large', name: 'Large', priceDelta: 1150 },
    ]}]},
  { id: 'reg-8', name: 'Euro', briefDescription: 'European-style classic pizza', description: 'A refined, European-style pizza that pays homage to the old-world traditions of Italy. Featuring tender chicken, a blend of briny olives and earthy mushrooms, sweet capsicum, and a sprinkle of fragrant Mediterranean herbs — rosemary, thyme, and oregano. The flavors are subtle yet sophisticated, allowing each high-quality ingredient to shine on its own merit.', price: 550, image: CAT_IMG['regular-pizzas'], category: 'regular-pizzas', tags: ['classic', 'european'], ingredients: ['Chicken', 'Cheese', 'Olives', 'Mushrooms', 'Capsicum', 'Herbs'], relatedItems: ['reg-3', 'reg-4', 'reg-7', 'reg-5', 'reg-1'],
    options: [{ ...pizzaSizeOption[0], choices: [
      { id: 'size-small', name: 'Small', priceDelta: 0, default: true },
      { id: 'size-medium', name: 'Medium', priceDelta: 550 },
      { id: 'size-large', name: 'Large', priceDelta: 1150 },
    ]}]},

  // === STUFFER PIZZAS ===
  { id: 'stf-1', name: 'CHICKEN STUFFER', briefDescription: 'Stuffed pizza with seasoned chicken', description: 'Our signature stuffed pizza featuring a generous filling of seasoned, tender chicken mixed with melted mozzarella, sautéed capsicum, fried onions, and a hint of garlic sauce — all encased in a golden, buttery crust. Each slice reveals a glorious pocket of molten, flavorful filling that makes every bite a discovery of taste and texture.', price: 2350, image: CAT_IMG['stuffer-pizzas'], category: 'stuffer-pizzas', tags: ['stuffer', 'chicken'], ingredients: ['Chicken', 'Cheese', 'Capsicum', 'Onions', 'Garlic Sauce'], relatedItems: ['stf-2', 'stf-3', 'stf-4', 'stf-5']},
  { id: 'stf-2', name: 'CHEESE STUFFER', briefDescription: 'Stuffed pizza bursting with cheese', description: 'A cheese lover\'s dream come true. Our stuffed crust is filled to the brim with a luscious blend of mozzarella and cheddar, with pockets of creamy cream cheese running through every slice. The outer crust is brushed with garlic butter, then baked until golden and crisp, while the inside remains molten and irresistible. Pure cheesy indulgence.', price: 2350, image: CAT_IMG['stuffer-pizzas'], category: 'stuffer-pizzas', tags: ['stuffer', 'cheese'], ingredients: ['Mozzarella', 'Cheddar', 'Cream Cheese', 'Garlic Butter'], relatedItems: ['stf-1', 'stf-3', 'stf-4', 'stf-5']},
  { id: 'stf-3', name: 'CHICKEN N CHEESE STUFFER', briefDescription: 'Stuffed pizza with chicken and cheese', description: 'The perfect marriage of tender chicken and premium cheeses in our signature stuffed crust. Juicy seasoned chicken pieces are mixed with a double dose of mozzarella and cheddar, crispy capsicum, and sweet onions, all sealed inside a golden, garlic-buttered crust. This is comfort food engineering at its finest.', price: 2450, image: CAT_IMG['stuffer-pizzas'], category: 'stuffer-pizzas', tags: ['stuffer', 'chicken', 'cheese'], ingredients: ['Chicken', 'Mozzarella', 'Cheddar', 'Capsicum', 'Onions'], relatedItems: ['stf-1', 'stf-2', 'stf-4', 'stf-5']},
  { id: 'stf-4', name: 'KABAB STUFFER', briefDescription: 'Stuffed pizza with kabab filling', description: 'Our hearty kabab stuffed pizza is loaded with spiced, minced kabab meat blended with melted cheese, diced capsicum, fresh tomatoes, and onions, all wrapped in a golden, crisp crust with a garlic butter finish. The kabab spices infuse every bite with warm, aromatic notes of cumin, coriander, and chili, making this a truly satisfying meal.', price: 2450, image: CAT_IMG['stuffer-pizzas'], category: 'stuffer-pizzas', tags: ['stuffer', 'kabab'], ingredients: ['Kabab', 'Cheese', 'Capsicum', 'Onions', 'Tomatoes', 'Garlic Sauce'], relatedItems: ['stf-1', 'stf-2', 'stf-3', 'stf-5']},
  { id: 'stf-5', name: 'Crunchy Stuffer', briefDescription: 'Stuffed pizza with crunchy twist', description: 'Our crunchy stuffed pizza adds an extra layer of texture with a special crispy coating on the outside of the stuffed crust. Inside, you will find seasoned chicken, melted mozzarella, capsicum, and onions in a garlic sauce filling. The contrast between the crunchy exterior and the soft, molten interior creates an absolutely addictive eating experience.', price: 2000, image: CAT_IMG['stuffer-pizzas'], category: 'stuffer-pizzas', tags: ['stuffer', 'crunchy'], ingredients: ['Chicken', 'Cheese', 'Capsicum', 'Onions', 'Crunchy Coating', 'Garlic Sauce'], relatedItems: ['stf-1', 'stf-2', 'stf-3', 'stf-4']},

  // === APPETIZERS ===
  { id: 'app-1', name: 'HOT WINGS (10 Pc)', briefDescription: 'Spicy hot chicken wings 10pc', description: 'Ten pieces of perfectly cooked, juicy chicken wings tossed in our signature hot sauce — a carefully balanced blend of aged cayenne peppers, melted butter, and secret spices. Each wing is crispy on the outside, tender and moist on the inside. Served hot and fresh, these wings are the perfect start to any meal. Pair them with our creamy ranch or blue cheese dip for the ultimate experience.', price: 750, image: CAT_IMG['appetizers'], category: 'appetizers', tags: ['wings', 'spicy'], ingredients: ['Chicken Wings', 'Hot Sauce', 'Butter', 'Spices'], relatedItems: ['app-3', 'app-4', 'app-5', 'app-6', 'app-2']},
  { id: 'app-2', name: 'NUGGETS (10 Pc)', briefDescription: 'Crispy chicken nuggets 10pc', description: 'Ten golden, crispy chicken nuggets made from 100% breast meat, seasoned and breaded in-house for the perfect crunch. Each nugget is tender, juicy, and golden-brown, served with your choice of dipping sauces. A timeless favorite that appeals to kids and adults alike — perfect as a starter, a snack, or a side to your main meal.', price: 500, image: CAT_IMG['appetizers'], category: 'appetizers', tags: ['nuggets', 'chicken'], ingredients: ['Chicken', 'Breading', 'Baking Powder', 'Spices'], relatedItems: ['app-1', 'app-3', 'app-4', 'app-5', 'app-6']},
  { id: 'app-3', name: 'OVEN BAKED WINGS (12 Pc)', briefDescription: 'Oven-baked chicken wings 12pc', description: 'A healthier twist on our classic wings. Twelve pieces of chicken wings are marinated in a fragrant blend of fresh herbs, minced garlic, lemon juice, and spices, then slowly oven-baked to perfection. The result is wings that are crispy on the outside, incredibly juicy on the inside, and packed with herb-infused flavor without the deep frying.', price: 500, image: CAT_IMG['appetizers'], category: 'appetizers', tags: ['wings', 'baked'], ingredients: ['Chicken Wings', 'Herbs', 'Garlic', 'Lemon', 'Spices'], relatedItems: ['app-1', 'app-4', 'app-5', 'app-6', 'app-2']},
  { id: 'app-4', name: 'CREAMY WINGS (12 Pc)', briefDescription: 'Creamy-style chicken wings 12pc', description: 'Twelve luscious chicken wings coated in a rich, velvety cream sauce infused with roasted garlic and Mediterranean herbs. The sauce clings to every wing, delivering a smooth, savory, and utterly addictive flavor with every bite. These wings strike the perfect balance between indulgent creaminess and savory chicken goodness.', price: 600, image: CAT_IMG['appetizers'], category: 'appetizers', tags: ['wings', 'creamy'], ingredients: ['Chicken Wings', 'Cream Sauce', 'Garlic', 'Herbs'], relatedItems: ['app-1', 'app-3', 'app-5', 'app-6', 'app-2']},
  { id: 'app-5', name: 'HONEY MUSTARD WINGS (6 Pc)', briefDescription: 'Sweet honey mustard wings 6pc', description: 'Six perfectly cooked chicken wings glazed in our house-made honey mustard sauce — a delightful balance of sweet golden honey and tangy, sharp mustard. Each wing is coated generously, then finished with a sprinkle of herbs for color and aroma. The sweet and tangy combination makes these wings an irresistible crowd-pleaser for any gathering.', price: 300, image: CAT_IMG['appetizers'], category: 'appetizers', tags: ['wings', 'honey-mustard'], ingredients: ['Chicken Wings', 'Honey', 'Mustard', 'Herbs'], relatedItems: ['app-1', 'app-3', 'app-4', 'app-6', 'app-2']},
  { id: 'app-6', name: 'PERY PERY WINGS (6 Pc)', briefDescription: 'Peri peri spiced wings 6pc', description: 'Six fiery chicken wings marinated and basted in our authentic peri peri sauce — a vibrant African-Portuguese blend of bird\'s eye chilies, garlic, lemon, and aromatic herbs. The wings are grilled to perfection, with a charred, smoky exterior and juicy, spiced interior. These wings pack a serious flavor punch that spice enthusiasts will absolutely love.', price: 300, image: CAT_IMG['appetizers'], category: 'appetizers', tags: ['wings', 'peri-peri'], ingredients: ['Chicken Wings', 'Peri Peri Sauce', 'Garlic', 'Lemon'], relatedItems: ['app-1', 'app-3', 'app-4', 'app-5', 'app-2']},

  // === BURGERS & SANDWICHES ===
  { id: 'brg-1', name: 'ZINGER BURGER', briefDescription: 'Crispy zinger chicken burger', description: 'Our signature zinger burger features a generously sized, hand-breaded chicken breast — marinated in a blend of spices, coated in crispy seasoned flour, and fried to a perfect golden crunch. Topped with fresh, crisp lettuce, creamy mayo, and our secret signature sauce, all sandwiched in a soft, toasted brioche bun. This is the gold standard of chicken burgers.', price: 400, image: CAT_IMG['burgers-sandwiches'], category: 'burgers-sandwiches', tags: ['zinger', 'chicken'], popular: true, ingredients: ['Chicken', 'Lettuce', 'Mayo', 'Bun', 'Signature Sauce'], relatedItems: ['brg-2', 'brg-3', 'brg-4', 'brg-5', 'brg-6']},
  { id: 'brg-2', name: 'MR. SP ZINGER BURGER', briefDescription: 'Special zinger with extra toppings', description: 'Our signature zinger taken to the next level. The same perfectly crispy, hand-breaded chicken breast, but now layered with a slice of melted cheddar, extra fresh lettuce, and our exclusive Mr. SP special sauce. The addition of cheese elevates the flavor profile, adding a creamy, savory depth that perfectly complements the crunchy chicken and soft bun.', price: 450, image: CAT_IMG['burgers-sandwiches'], category: 'burgers-sandwiches', tags: ['zinger', 'special'], ingredients: ['Chicken', 'Lettuce', 'Cheese', 'Bun', 'Special Sauce'], relatedItems: ['brg-1', 'brg-5', 'brg-6', 'brg-7', 'brg-3']},
  { id: 'brg-3', name: 'PETTY BURGER', briefDescription: 'Classic patty burger fresh ingredients', description: 'A classic that never goes out of style. Our perfectly seasoned chicken patty is grilled to juicy perfection and served on a soft bun with crisp lettuce, ripe tomato slices, and a smear of tangy ketchup. Simple, honest, and incredibly satisfying — this burger proves that you don\'t need fancy ingredients to create something truly delicious.', price: 350, image: CAT_IMG['burgers-sandwiches'], category: 'burgers-sandwiches', tags: ['patty', 'classic'], ingredients: ['Chicken Patty', 'Lettuce', 'Tomato', 'Bun', 'Ketchup'], relatedItems: ['brg-1', 'brg-4', 'brg-5', 'brg-6', 'brg-2']},
  { id: 'brg-4', name: 'BBQ BURGER', briefDescription: 'Smoky BBQ chicken burger', description: 'A smoky, tangy, and utterly delicious chicken burger. Our grilled chicken patty is liberally brushed with our house-made BBQ sauce — a rich, smoky blend of tomatoes, molasses, and spices — then topped with crisp lettuce, fresh onion rings, and served in a toasted bun. The BBQ sauce caramelizes on the patty, creating a sweet and smoky crust that is simply irresistible.', price: 350, image: CAT_IMG['burgers-sandwiches'], category: 'burgers-sandwiches', tags: ['bbq', 'chicken'], ingredients: ['Chicken', 'BBQ Sauce', 'Lettuce', 'Bun', 'Onions'], relatedItems: ['brg-1', 'brg-3', 'brg-6', 'brg-7', 'brg-2']},
  { id: 'brg-5', name: 'Sp Cheese Burger', briefDescription: 'Special cheese burger extra toppings', description: 'Our special cheese burger is loaded with extras. A juicy grilled chicken patty topped with a slice of melted cheddar, fresh lettuce, tomato, onions, pickles, and our special sauce — all in a toasted brioche bun. Every ingredient is carefully layered to create the perfect balance of flavors and textures, from the crisp veggies to the melted cheese to the tangy sauce.', price: 470, image: CAT_IMG['burgers-sandwiches'], category: 'burgers-sandwiches', tags: ['cheese', 'special'], ingredients: ['Chicken', 'Cheese', 'Lettuce', 'Bun', 'Special Sauce'], relatedItems: ['brg-1', 'brg-2', 'brg-6', 'brg-7', 'brg-8']},
  { id: 'brg-6', name: 'BBQ Special Burger', briefDescription: 'Special BBQ premium burger', description: 'Our premium BBQ burger takes the classic BBQ to new heights. A grilled chicken patty is layered with melted cheddar, smoky BBQ sauce, crisp lettuce, fried onion rings, and our special sauce, all in a toasted brioche bun. The combination of melted cheese, smoky BBQ, and crunchy onion rings creates a symphony of flavors and textures that burger aficionados will treasure.', price: 500, image: CAT_IMG['burgers-sandwiches'], category: 'burgers-sandwiches', tags: ['bbq', 'special'], ingredients: ['Chicken', 'BBQ Sauce', 'Cheese', 'Lettuce', 'Bun', 'Onions'], relatedItems: ['brg-4', 'brg-5', 'brg-7', 'brg-2', 'brg-1']},
  { id: 'brg-7', name: 'Honey Mustard Burger', briefDescription: 'Burger with honey mustard dressing', description: 'A delicious twist on our classic chicken burger, featuring our house-made honey mustard dressing. The sweet honey and tangy mustard create a perfectly balanced sauce that coats the tender chicken patty, complemented by fresh lettuce, melted cheese, and a toasted bun. The result is a burger that is simultaneously sweet, savory, tangy, and utterly satisfying.', price: 500, image: CAT_IMG['burgers-sandwiches'], category: 'burgers-sandwiches', tags: ['honey-mustard'], ingredients: ['Chicken', 'Honey Mustard Sauce', 'Lettuce', 'Bun', 'Cheese'], relatedItems: ['brg-5', 'brg-6', 'brg-8', 'brg-2', 'brg-1']},
  { id: 'brg-8', name: 'Mashroom Burger', briefDescription: 'Mushroom burger creamy sauce', description: 'A mushroom lover\'s paradise. A juicy chicken patty is topped with sautéed, garlicky mushrooms in a rich, creamy herb sauce, fresh lettuce, and melted cheese, all served on a toasted bun. The earthy, umami-rich mushrooms pair beautifully with the creamy sauce and tender chicken, creating a sophisticated burger experience that rivals any gourmet restaurant.', price: 450, image: CAT_IMG['burgers-sandwiches'], category: 'burgers-sandwiches', tags: ['mushroom'], ingredients: ['Chicken', 'Mushrooms', 'Cream Sauce', 'Lettuce', 'Bun'], relatedItems: ['brg-5', 'brg-7', 'brg-6', 'brg-2', 'brg-1']},
  { id: 'brg-9', name: 'KAMEERA SANDWICH', briefDescription: 'Camera-style loaded sandwich', description: 'A generously loaded sandwich packed with layers of tender chicken, crisp lettuce, ripe tomato slices, cool cucumber, and creamy mayonnaise — all between slices of fresh, toasted bread. Every bite offers a satisfying crunch followed by the juicy, savory filling. This is the perfect sandwich for those who want a lighter but still hearty meal option.', price: 700, image: CAT_IMG['burgers-sandwiches'], category: 'burgers-sandwiches', tags: ['sandwich', 'loaded'], ingredients: ['Chicken', 'Lettuce', 'Tomato', 'Cucumber', 'Bread', 'Mayo'], relatedItems: ['brg-10', 'brg-11', 'brg-1', 'brg-2', 'brg-3']},
  { id: 'brg-10', name: 'CLUB SANDWICH', briefDescription: 'Classic club sandwich layered fillings', description: 'Our classic club sandwich is a triple-layered masterpiece. Toasted bread is stacked with tender sliced chicken, crispy bacon-style chicken strips, fresh lettuce, juicy tomatoes, a perfectly boiled egg, and creamy mayo. Each layer is carefully assembled to ensure every bite contains the perfect ratio of protein, vegetables, and bread. A timeless classic.', price: 600, image: CAT_IMG['burgers-sandwiches'], category: 'burgers-sandwiches', tags: ['sandwich', 'classic'], ingredients: ['Chicken', 'Lettuce', 'Tomato', 'Egg', 'Bread', 'Mayo'], relatedItems: ['brg-9', 'brg-11', 'brg-1', 'brg-2', 'brg-3']},
  { id: 'brg-11', name: 'Crunchy Sandwich', briefDescription: 'Crunchy sandwich fresh ingredients', description: 'A delightful crunchy sandwich featuring a special crispy-coated chicken fillet, fresh lettuce, sliced cucumber, and creamy mayo, all between slices of soft bread. The contrast between the crunchy coating and the soft bread, combined with the fresh, cool vegetables, creates a textural experience that is both satisfying and refreshing.', price: 600, image: CAT_IMG['burgers-sandwiches'], category: 'burgers-sandwiches', tags: ['sandwich', 'crunchy'], ingredients: ['Chicken', 'Lettuce', 'Cucumber', 'Bread', 'Crunchy Coating', 'Mayo'], relatedItems: ['brg-9', 'brg-10', 'brg-1', 'brg-2', 'brg-5']},

  // === PIZZA BURGERS ===
  { id: 'pbrg-1', name: 'PIZZA ZINGER BURGER', briefDescription: 'Zinger meets pizza ultimate fusion', description: 'The ultimate fusion of two beloved classics — the crispy, crunchy zinger chicken burger meets the saucy, cheesy goodness of pizza. A perfectly fried zinger chicken fillet is topped with melted mozzarella, rich pizza sauce, and served in a soft bun with fresh lettuce. It is everything you love about pizza and burgers, all in one glorious bite.', price: 600, image: CAT_IMG['pizza-burgers'], category: 'pizza-burgers', tags: ['pizza', 'zinger'], ingredients: ['Chicken', 'Cheese', 'Pizza Sauce', 'Bun', 'Lettuce'], relatedItems: ['pbrg-2', 'pbrg-3', 'pbrg-4']},
  { id: 'pbrg-2', name: 'PIZZA PETTY BURGER', briefDescription: 'Patty burger pizza-inspired toppings', description: 'A perfectly grilled chicken patty burger gets the pizza treatment — topped with melted mozzarella, zesty pizza sauce, sautéed onions, and a sprinkle of oregano. The result is a juicy, satisfying burger with all the familiar flavors of your favorite pizza. A delicious hybrid that brings together the best of both worlds.', price: 600, image: CAT_IMG['pizza-burgers'], category: 'pizza-burgers', tags: ['pizza', 'patty'], ingredients: ['Chicken Patty', 'Cheese', 'Pizza Sauce', 'Bun', 'Onions'], relatedItems: ['pbrg-1', 'pbrg-3', 'pbrg-4']},
  { id: 'pbrg-3', name: 'PIZZA DOUBLE MAC', briefDescription: 'Double layered pizza burger', description: 'A towering double-layered burger that combines two juicy chicken patties, two layers of melted mozzarella, pizza sauce, fresh lettuce, and our special sauce — all between a toasted double-decker bun. This is the ultimate indulgence for those with a big appetite and a love for the pizza-burger fusion. Double the meat, double the cheese, double the satisfaction.', price: 700, image: CAT_IMG['pizza-burgers'], category: 'pizza-burgers', tags: ['pizza', 'double'], ingredients: ['Chicken', 'Cheese', 'Double Bun', 'Lettuce', 'Special Sauce'], relatedItems: ['pbrg-1', 'pbrg-2', 'pbrg-4']},
  { id: 'pbrg-4', name: 'Pizza Paratha', briefDescription: 'Pizza wrapped in flaky paratha', description: 'A unique Pakistani-Italian fusion where all the flavors of a classic pizza are wrapped inside a warm, flaky, hand-stretched paratha. Tender chicken, melted mozzarella, pizza sauce, and capsicum are folded inside the paratha and griddled until golden and crisp. The buttery, layered paratha adds a whole new dimension to the familiar pizza experience.', price: 600, image: CAT_IMG['pizza-burgers'], category: 'pizza-burgers', tags: ['pizza', 'paratha'], ingredients: ['Chicken', 'Cheese', 'Paratha', 'Capsicum', 'Ketchup'], relatedItems: ['pbrg-1', 'pbrg-2', 'pbrg-3']},

  // === ROLLS, WRAPS & SHAWARMA ===
  { id: 'rl-1', name: 'SPIN ROLL', briefDescription: 'Spicy rolled paratha chicken filling', description: 'A spicy, satisfying roll packed with tender seasoned chicken, crisp capsicum, sautéed onions, and a bold spicy sauce — all wrapped in a warm, flaky paratha that is toasted to golden perfection. The spicy sauce provides a kick that builds with each bite, while the paratha adds a satisfying buttery crispness. A handheld flavor explosion.', price: 700, image: CAT_IMG['rolls-wraps-shawarma'], category: 'rolls-wraps-shawarma', tags: ['roll', 'spicy'], ingredients: ['Chicken', 'Paratha', 'Spicy Sauce', 'Capsicum', 'Onions'], relatedItems: ['rl-2', 'rl-3', 'rl-4', 'rl-13', 'rl-8']},
  { id: 'rl-2', name: 'NAWABI ROLL', briefDescription: 'Royal nawabi style chicken roll', description: 'A royal roll fit for a nawab. Succulent chicken is marinated in a rich, aromatic nawabi spice blend — cardamom, cloves, cinnamon, and cream — then wrapped in a flaky paratha with capsicum, onions, and a drizzle of nawabi sauce. The regal spices infuse every bite with warmth and depth, making this a truly majestic handheld meal.', price: 700, image: CAT_IMG['rolls-wraps-shawarma'], category: 'rolls-wraps-shawarma', tags: ['roll', 'nawabi'], ingredients: ['Chicken', 'Paratha', 'Nawabi Sauce', 'Capsicum', 'Onions'], relatedItems: ['rl-1', 'rl-3', 'rl-4', 'rl-13', 'rl-8']},
  { id: 'rl-3', name: 'Mr Special Roll', briefDescription: 'Special signature roll', description: 'Our signature roll — a carefully crafted combination of seasoned chicken, fresh lettuce, crunchy capsicum, and our exclusive Mr. Special sauce, all wrapped in a warm, flaky paratha. The special sauce is the star here, adding a unique blend of tangy, creamy, and slightly spicy notes that elevate every single ingredient in the roll.', price: 600, image: CAT_IMG['rolls-wraps-shawarma'], category: 'rolls-wraps-shawarma', tags: ['roll', 'special'], ingredients: ['Chicken', 'Paratha', 'Special Sauce', 'Capsicum', 'Lettuce'], relatedItems: ['rl-1', 'rl-2', 'rl-4', 'rl-13', 'rl-12']},
  { id: 'rl-4', name: 'Crunchy Roll', briefDescription: 'Crunchy textured chicken roll', description: 'A textural delight featuring chicken fillet with a special crispy coating, wrapped in a soft paratha with crunchy capsicum and creamy mayo. Each bite delivers a satisfying crunch followed by the tender chicken and the soft, buttery paratha. The combination of crispy, creamy, and chewy textures makes this roll an absolute joy to eat.', price: 600, image: CAT_IMG['rolls-wraps-shawarma'], category: 'rolls-wraps-shawarma', tags: ['roll', 'crunchy'], ingredients: ['Chicken', 'Paratha', 'Crunchy Coating', 'Capsicum', 'Mayo'], relatedItems: ['rl-1', 'rl-2', 'rl-3', 'rl-13', 'rl-5']},
  { id: 'rl-5', name: 'Zinger Cheese Paratha', briefDescription: 'Zinger with cheese paratha wrap', description: 'Our popular zinger chicken gets the paratha treatment. A crispy zinger chicken fillet is wrapped in a warm, flaky paratha with a slice of melted cheese, fresh lettuce, and creamy mayo. The combination of the crunchy zinger, the gooey melted cheese, and the buttery paratha is absolutely irresistible. A modern Pakistani street food classic.', price: 450, image: CAT_IMG['rolls-wraps-shawarma'], category: 'rolls-wraps-shawarma', tags: ['paratha', 'zinger', 'cheese'], ingredients: ['Chicken', 'Cheese', 'Paratha', 'Lettuce', 'Mayo'], relatedItems: ['rl-6', 'rl-7', 'rl-10', 'rl-4', 'rl-3']},
  { id: 'rl-6', name: 'Zinger Paratha', briefDescription: 'Classic zinger paratha roll', description: 'The classic that started it all. A crispy, perfectly fried zinger chicken fillet is wrapped in a warm, flaky paratha with fresh lettuce, creamy mayo, and a drizzle of tangy ketchup. Simple, satisfying, and incredibly delicious — this paratha roll has become a beloved staple of Pakistani fast food culture, and ours is made with the highest quality ingredients.', price: 350, image: CAT_IMG['rolls-wraps-shawarma'], category: 'rolls-wraps-shawarma', tags: ['paratha', 'zinger'], ingredients: ['Chicken', 'Paratha', 'Lettuce', 'Mayo', 'Ketchup'], relatedItems: ['rl-5', 'rl-7', 'rl-10', 'rl-4', 'rl-3']},
  { id: 'rl-7', name: 'Kabab Paratha', briefDescription: 'Flavorful kabab paratha', description: 'A flavorful, hearty paratha roll filled with spiced kabab meat, sliced onions, crunchy capsicum, and a tangy green chutney. The kabab is seasoned with a traditional blend of spices — cumin, coriander, chili, and garam masala — giving it a bold, aromatic flavor that pairs perfectly with the cool, herby chutney and the warm, flaky paratha.', price: 300, image: CAT_IMG['rolls-wraps-shawarma'], category: 'rolls-wraps-shawarma', tags: ['paratha', 'kabab'], ingredients: ['Kabab', 'Paratha', 'Onions', 'Capsicum', 'Chutney'], relatedItems: ['rl-5', 'rl-6', 'rl-8', 'rl-9', 'rl-10']},
  { id: 'rl-8', name: 'CHICKEN SHAWARMA', briefDescription: 'Classic chicken shawarma wrap', description: 'Our authentic chicken shawarma features thinly sliced, marinated chicken cooked on a vertical rotisserie, then wrapped in warm shawarma bread with fresh lettuce, tangy pickles, and a generous drizzle of garlic mayo. The chicken is tender, juicy, and infused with aromatic Middle Eastern spices. Every bite is a perfect balance of savory, tangy, and creamy flavors.', price: 300, image: CAT_IMG['rolls-wraps-shawarma'], category: 'rolls-wraps-shawarma', tags: ['shawarma', 'chicken'], ingredients: ['Chicken', 'Shawarma Bread', 'Lettuce', 'Garlic Mayo', 'Pickles'], relatedItems: ['rl-9', 'rl-10', 'rl-11', 'rl-12', 'rl-7']},
  { id: 'rl-9', name: 'CHEESY SHAWARMA', briefDescription: 'Cheesy chicken shawarma wrap', description: 'Our classic chicken shawarma gets a cheesy upgrade. Tender, spiced shawarma chicken is wrapped in warm bread with a generous layer of melted mozzarella, fresh lettuce, and creamy garlic mayo. The addition of melted cheese takes the shawarma to a whole new level of indulgence, adding a rich, savory creaminess that perfectly complements the spiced chicken.', price: 300, image: CAT_IMG['rolls-wraps-shawarma'], category: 'rolls-wraps-shawarma', tags: ['shawarma', 'cheese'], ingredients: ['Chicken', 'Cheese', 'Shawarma Bread', 'Lettuce', 'Garlic Mayo'], relatedItems: ['rl-8', 'rl-10', 'rl-11', 'rl-5', 'rl-12']},
  { id: 'rl-10', name: 'ZINGER SHAWARMA', briefDescription: 'Zinger style shawarma wrap', description: 'A brilliant fusion of two beloved street foods — crispy zinger chicken meets the classic shawarma wrap. A perfectly fried zinger fillet is wrapped in warm shawarma bread with fresh lettuce, creamy mayo, and our special sauce. The contrast between the crunchy zinger coating and the soft bread, combined with the cool, creamy sauce, is absolutely delicious.', price: 350, image: CAT_IMG['rolls-wraps-shawarma'], category: 'rolls-wraps-shawarma', tags: ['shawarma', 'zinger'], ingredients: ['Chicken', 'Shawarma Bread', 'Lettuce', 'Mayo', 'Special Sauce'], relatedItems: ['rl-8', 'rl-9', 'rl-11', 'rl-5', 'rl-6']},
  { id: 'rl-11', name: 'Platter Shawarma', briefDescription: 'Shawarma platter all fixings', description: 'A complete shawarma experience on a platter. Tender, spiced shawarma chicken is served with crispy fries, fresh lettuce, warm shawarma bread, and a generous side of garlic mayo. This platter format allows you to enjoy all the components of a great shawarma at your own pace, mixing and matching to create the perfect bite every time.', price: 400, image: CAT_IMG['rolls-wraps-shawarma'], category: 'rolls-wraps-shawarma', tags: ['shawarma', 'platter'], ingredients: ['Chicken', 'Shawarma Bread', 'Fries', 'Lettuce', 'Garlic Mayo'], relatedItems: ['rl-8', 'rl-9', 'rl-10', 'rl-12', 'rl-13']},
  { id: 'rl-12', name: 'Tottila Wrap', briefDescription: 'Tortilla wrap seasoned chicken', description: 'A lighter, modern take on the classic wrap. Seasoned, grilled chicken is wrapped in a soft flour tortilla with crisp lettuce, crunchy capsicum, and creamy mayo. The tortilla is lightly toasted on the griddle, giving it a warm, pliable texture with hints of golden char. A fresh, satisfying option for those who prefer a lighter handheld meal.', price: 400, image: CAT_IMG['rolls-wraps-shawarma'], category: 'rolls-wraps-shawarma', tags: ['wrap', 'tortilla'], ingredients: ['Chicken', 'Tortilla', 'Lettuce', 'Mayo', 'Capsicum'], relatedItems: ['rl-8', 'rl-11', 'rl-13', 'rl-4', 'rl-3']},
  { id: 'rl-13', name: 'Chicken Grill', briefDescription: 'Grilled chicken with spices', description: 'Perfectly grilled chicken pieces marinated in a robust blend of spices — paprika, garlic, cumin, and herbs — then char-grilled to achieve a smoky, caramelized exterior while remaining juicy and tender inside. Served with fresh lettuce and onions, this simple yet flavorful dish highlights the natural goodness of high-quality chicken enhanced by expert grilling.', price: 400, image: CAT_IMG['rolls-wraps-shawarma'], category: 'rolls-wraps-shawarma', tags: ['grill', 'chicken'], ingredients: ['Chicken', 'Spices', 'Grill Sauce', 'Lettuce', 'Onions'], relatedItems: ['rl-1', 'rl-2', 'rl-3', 'rl-4', 'rl-12']},

  // === PASTA & FRIES ===
  { id: 'pst-1', name: 'MR SP PASTA', briefDescription: 'Special signature pasta', description: 'Our signature pasta dish — al dente penne tossed in a rich, creamy sauce with tender pieces of chicken, sautéed capsicum, melted cheese, and a sprinkle of aromatic herbs. Every forkful delivers a perfect balance of creamy sauce, tender pasta, and savory chicken. This is comfort food elevated to an art form, made with the same care and quality as our pizzas.', price: 400, image: CAT_IMG['pasta-fries'], category: 'pasta-fries', tags: ['pasta', 'special'], ingredients: ['Pasta', 'Chicken', 'Cream Sauce', 'Capsicum', 'Cheese', 'Herbs'], relatedItems: ['pst-2', 'pst-3', 'pst-4', 'pst-5', 'pst-6'],
    options: [{ ...halfFullOption[0], choices: [
      { id: 'portion-half', name: 'Half', priceDelta: 0, default: true },
      { id: 'portion-full', name: 'Full', priceDelta: 350 },
    ]}]},
  { id: 'pst-2', name: 'CREAMY PASTA', briefDescription: 'Rich creamy white sauce pasta', description: 'A luxuriously creamy white sauce pasta featuring al dente penne tossed in a velvety béchamel-style sauce made with fresh cream, butter, garlic, and parmesan. Studded with tender chicken pieces and earthy sautéed mushrooms, finished with a sprinkle of fresh herbs. Each bite is smooth, rich, and deeply satisfying — the ultimate comfort food.', price: 400, image: CAT_IMG['pasta-fries'], category: 'pasta-fries', tags: ['pasta', 'creamy'], ingredients: ['Pasta', 'Chicken', 'Cream Sauce', 'Mushrooms', 'Cheese', 'Garlic'], relatedItems: ['pst-1', 'pst-3', 'pst-4', 'pst-5', 'pst-6'],
    options: [{ ...halfFullOption[0], choices: [
      { id: 'portion-half', name: 'Half', priceDelta: 0, default: true },
      { id: 'portion-full', name: 'Full', priceDelta: 350 },
    ]}]},
  { id: 'pst-3', name: 'PLAINE FRIES', briefDescription: 'Classic crispy french fries', description: 'Perfectly golden, crispy French fries made from premium potatoes, double-fried to achieve the ideal texture — a crispy, golden exterior with a fluffy, tender interior. Lightly seasoned with just the right amount of salt, these fries are the perfect accompaniment to any meal or a satisfying snack on their own. Simple, classic, and absolutely perfect.', price: 250, image: CAT_IMG['pasta-fries'], category: 'pasta-fries', tags: ['fries', 'classic'], ingredients: ['Potatoes', 'Salt', 'Oil'], relatedItems: ['pst-4', 'pst-5', 'pst-6', 'pst-1', 'pst-2']},
  { id: 'pst-4', name: 'GARLIC FRIES', briefDescription: 'Crispy fries garlic butter', description: 'Our classic crispy fries get a fragrant upgrade. Golden, double-fried potato fries are tossed in a generous amount of melted garlic butter, infused with fresh minced garlic, parsley, and a hint of parmesan. The garlic butter coats every fry, adding a rich, savory depth that elevates these fries from a simple side dish to a star attraction in their own right.', price: 300, image: CAT_IMG['pasta-fries'], category: 'pasta-fries', tags: ['fries', 'garlic'], ingredients: ['Potatoes', 'Garlic', 'Butter', 'Herbs', 'Salt'], relatedItems: ['pst-3', 'pst-5', 'pst-6', 'pst-1', 'pst-2']},
  { id: 'pst-5', name: 'MASALA FRIES', briefDescription: 'Fries seasoned spicy masala', description: 'Crispy, golden fries tossed in a bold, aromatic masala spice blend — a carefully balanced mix of chili powder, cumin, amchur (dried mango powder), chaat masala, and black salt. The result is a uniquely Pakistani take on fries that is tangy, spicy, and utterly addictive. Each fry is coated in the vibrant, complex flavors of the masala blend.', price: 300, image: CAT_IMG['pasta-fries'], category: 'pasta-fries', tags: ['fries', 'masala'], ingredients: ['Potatoes', 'Masala Spices', 'Salt', 'Oil'], relatedItems: ['pst-3', 'pst-4', 'pst-6', 'pst-1', 'pst-2']},
  { id: 'pst-6', name: 'LOADED FRIES', briefDescription: 'Fries loaded cheese sauce toppings', description: 'An indulgent mountain of crispy fries loaded with a generous drizzle of warm, velvety cheese sauce, tender pieces of seasoned chicken, sliced jalapenos, and a drizzle of tangy sauce. Every forkful is a combination of crunchy fries, gooey melted cheese, savory chicken, and spicy jalapenos. This is the ultimate shareable indulgence, perfect for game day or a decadent treat.', price: 700, image: CAT_IMG['pasta-fries'], category: 'pasta-fries', tags: ['fries', 'loaded'], ingredients: ['Potatoes', 'Cheese', 'Sauce', 'Chicken', 'Jalapenos'], relatedItems: ['pst-3', 'pst-4', 'pst-5', 'pst-1', 'pst-2']},

  // === RICE & SAJJI ===
  { id: 'rice-1', name: 'Chicken Biryani Sp', briefDescription: 'Special chicken biryani aromatic spices', description: 'Our special chicken biryani is a labor of love — tender chicken marinated in yogurt and aromatic spices is layered with premium basmati rice, fried onions, fresh herbs, and a pinch of saffron, then slow-cooked in a sealed pot to allow the flavors to meld and infuse every grain. The result is a fragrant, flavorful biryani with perfectly separate grains of rice, succulent chicken, and a beautiful layer of caramelized onions on top. Served with cooling raita on the side.', price: 350, image: CAT_IMG['rice-sajji'], category: 'rice-sajji', tags: ['biryani', 'rice'], ingredients: ['Chicken', 'Rice', 'Biryani Spices', 'Yogurt', 'Onions'], relatedItems: ['rice-2'],
    options: [{ ...halfFullOption[0], choices: [
      { id: 'portion-half', name: 'Half', priceDelta: 0, default: true },
      { id: 'portion-full', name: 'Full', priceDelta: 250 },
    ]}]},
  { id: 'rice-2', name: 'Mr. Special Sajji', briefDescription: 'Special sajji raita khubani sauce', description: 'Our special sajji is a tribute to the classic Balochi dish — a whole chicken is marinated in a distinctive blend of spices, then slow-roasted on a charcoal grill until the skin is perfectly crispy and the meat is fall-off-the-bone tender. Served with fragrant basmati rice, cooling raita, and our signature sweet-and-tangy khubani (apricot) sauce. The combination of smoky, spiced chicken with the sweet khubani sauce is simply unforgettable.', price: 700, image: CAT_IMG['rice-sajji'], category: 'rice-sajji', tags: ['sajji', 'special'], ingredients: ['Chicken', 'Rice', 'Sajji Spices', 'Raita', 'Khubani Sauce'], relatedItems: ['rice-1'],
    options: [{ ...quarterHalfFullOption[0], choices: [
      { id: 'portion-quarter', name: 'Quarter', priceDelta: 0, default: true },
      { id: 'portion-half', name: 'Half', priceDelta: 700 },
      { id: 'portion-full', name: 'Full', priceDelta: 1900 },
    ]}]},

  // === PLATTERS ===
  { id: 'plt-1', name: 'Mr s Sp', briefDescription: 'Oven baked wings spring rolls dip', description: 'A well-rounded platter featuring 6 oven-baked wings, perfectly seasoned and roasted until golden and crispy, served alongside 2 crispy spring rolls filled with spiced vegetables and chicken. Accompanied by creamy mayo dip for the perfect finishing touch. This platter is ideal for sharing as a starter or enjoying as a light meal with variety in every bite.', price: 850, image: CAT_IMG['platters'], category: 'platters', tags: ['platter', 'wings', 'rolls'], ingredients: ['Chicken Wings', 'Spring Rolls', 'Mayo Dip', 'Spices'], relatedItems: ['plt-2']},
  { id: 'plt-2', name: 'Creamy', briefDescription: 'Creamy wings nawabi rolls dip', description: 'An indulgent platter featuring 6 pieces of our signature creamy wings — chicken wings coated in a rich, garlicky cream sauce — paired with 2 nawabi rolls filled with spiced, aromatic chicken. Served with creamy mayo dip for extra indulgence. This platter is the perfect choice for those who love creamy, flavorful chicken dishes and want a satisfying, varied meal.', price: 950, image: CAT_IMG['platters'], category: 'platters', tags: ['platter', 'creamy', 'rolls'], ingredients: ['Chicken Wings', 'Nawabi Rolls', 'Mayo Dip', 'Cream Sauce'], relatedItems: ['plt-1']},

  // === BEVERAGES & DRINKS ===
  { id: 'bev-1', name: '1.5 LTR DRINK', briefDescription: '1.5 liter bottled soft drink', description: 'A large 1.5 liter bottle of your favorite chilled soft drink, perfect for sharing with the whole family. Choose from our selection of popular carbonated beverages to accompany your meal. Ice-cold and refreshing, the perfect companion to any pizza, burger, or feast.', price: 230, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['soft-drink', 'bottled'], ingredients: ['Carbonated Water', 'Sugar', 'Flavoring', 'Phosphoric Acid'], relatedItems: ['bev-2', 'bev-3', 'bev-4', 'bev-5', 'bev-6']},
  { id: 'bev-2', name: '1 LTR DRINK', briefDescription: '1 liter bottled soft drink', description: 'A convenient 1 liter bottle of your preferred soft drink, perfectly sized for individual enjoyment or sharing between two. Served ice-cold to quench your thirst and complement the bold flavors of your meal. Crisp, refreshing, and always satisfying.', price: 170, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['soft-drink', 'bottled'], ingredients: ['Carbonated Water', 'Sugar', 'Flavoring', 'Phosphoric Acid'], relatedItems: ['bev-1', 'bev-3', 'bev-4', 'bev-5', 'bev-6']},
  { id: 'bev-3', name: '500 ML DRINK', briefDescription: '500 ml bottled soft drink', description: 'A perfectly portioned 500 ml bottle of your favorite fizzy drink. Ideal for individual enjoyment, this size is great for pairing with a single meal. Chilled to perfection and ready to refresh.', price: 120, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['soft-drink', 'bottled'], ingredients: ['Carbonated Water', 'Sugar', 'Flavoring', 'Phosphoric Acid'], relatedItems: ['bev-1', 'bev-2', 'bev-4', 'bev-5', 'bev-6']},
  { id: 'bev-4', name: 'TEN PACK', briefDescription: '10-pack canned drinks', description: 'A value-packed bundle of 10 chilled canned drinks, perfect for parties, gatherings, or stocking up. Each can is perfectly portioned for individual enjoyment. Choose from a variety of popular flavors to suit every taste. The ultimate refreshment for any occasion.', price: 120, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['canned', 'pack'], ingredients: ['Carbonated Water', 'Sugar', 'Flavoring', 'Caffeine'], relatedItems: ['bev-1', 'bev-2', 'bev-3', 'bev-5', 'bev-6']},
  { id: 'bev-5', name: 'SMALL WATER', briefDescription: 'Small bottled water', description: 'Pure, clean bottled drinking water in a convenient small size. Perfectly refreshing and hydrating, ideal for accompanying any meal or for a quick drink on the go. Sourced and bottled to the highest quality standards.', price: 70, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['water'], ingredients: ['Purified Water'], relatedItems: ['bev-6', 'bev-1', 'bev-2', 'bev-3', 'bev-4']},
  { id: 'bev-6', name: 'LARGE WATER', briefDescription: 'Large bottled water', description: 'A large bottle of pure, refreshing drinking water, perfect for sharing at the table or staying hydrated throughout your meal. Clean, crisp, and essential — the simplest refreshment we offer, and one of the most important.', price: 120, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['water'], ingredients: ['Purified Water'], relatedItems: ['bev-5', 'bev-1', 'bev-2', 'bev-3', 'bev-4']},
  { id: 'bev-7', name: 'MR. SP PUNK', briefDescription: 'Signature special drink', description: 'Our signature Mr. SP Punk is a bold, electrifying beverage that captures the rebellious spirit of our brand. A unique blend of carbonated water, our special syrup, and a hint of citrus creates a flavor that is entirely our own. Vibrant, refreshing, and unmistakably Mr. SP. Try it once and you will never forget it.', price: 550, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['special', 'drink'], ingredients: ['Carbonated Water', 'Sugar', 'Special Syrup', 'Citric Acid', 'Flavoring'], relatedItems: ['bev-8', 'bev-9', 'bev-10', 'bev-11', 'bev-12']},
  { id: 'bev-8', name: 'PINK LADY', briefDescription: 'Refreshing pink lady drink', description: 'An elegant, blush-pink refresher that is as beautiful as it is delicious. A delicate blend of creamy milk, sweet strawberry syrup, and crushed ice, finished with a hint of vanilla. Light, fruity, and wonderfully creamy — the Pink Lady is a delightful, non-alcoholic treat that appeals to all ages.', price: 500, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['special', 'drink'], ingredients: ['Cream', 'Strawberry Syrup', 'Milk', 'Ice', 'Sugar'], relatedItems: ['bev-7', 'bev-9', 'bev-10', 'bev-11', 'bev-12']},
  { id: 'bev-9', name: 'PINACOLADA', briefDescription: 'Classic pina colada mocktail', description: 'Our non-alcoholic take on the tropical classic. Creamy coconut milk is blended with sweet pineapple juice and crushed ice to create a smooth, luscious mocktail that transports you straight to a tropical paradise. Garnished with a pineapple wedge, this drink is creamy, fruity, and incredibly refreshing.', price: 500, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['mocktail', 'creamy'], ingredients: ['Pineapple Juice', 'Coconut Cream', 'Milk', 'Ice', 'Sugar'], relatedItems: ['bev-8', 'bev-7', 'bev-28', 'bev-29', 'bev-12']},
  { id: 'bev-10', name: 'BLUE BUZZ', briefDescription: 'Blue refreshing buzz drink', description: 'A vibrant, electric blue carbonated beverage that is as visually striking as it is delicious. Crisp, citrusy, and lightly sweetened, the Blue Buzz delivers a refreshing burst of flavor with every sip. The bold blue color makes it a fun, Instagram-worthy addition to any meal.', price: 500, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['special', 'drink'], ingredients: ['Carbonated Water', 'Blue Syrup', 'Sugar', 'Citric Acid', 'Ice'], relatedItems: ['bev-11', 'bev-12', 'bev-13', 'bev-14', 'bev-7']},
  { id: 'bev-11', name: 'PINK BUZZ', briefDescription: 'Pink refreshing buzz drink', description: 'The playful sister to our Blue Buzz, the Pink Buzz delivers the same crisp, refreshing carbonated experience in a beautiful pink hue. Lightly sweet with a pleasant citrus tang, this vibrant drink is as delightful to look at as it is to drink. A fun, fizzy refreshment for any occasion.', price: 500, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['special', 'drink'], ingredients: ['Carbonated Water', 'Pink Syrup', 'Sugar', 'Citric Acid', 'Ice'], relatedItems: ['bev-10', 'bev-12', 'bev-13', 'bev-14', 'bev-7']},
  { id: 'bev-12', name: 'RAINBOW SODA', briefDescription: 'Colorful rainbow flavored soda', description: 'A fun, colorful carbonated beverage that is a feast for both the eyes and the taste buds. Our rainbow soda features a delightful blend of mixed fruit flavors — think berry, citrus, and tropical — all coming together in a beautifully layered, colorful drink that tastes as good as it looks.', price: 400, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['soda', 'refreshing'], ingredients: ['Carbonated Water', 'Mixed Syrup', 'Sugar', 'Citric Acid', 'Ice'], relatedItems: ['bev-10', 'bev-11', 'bev-13', 'bev-14', 'bev-7']},
  { id: 'bev-13', name: 'ITALIAN SODA', briefDescription: 'Classic Italian soda', description: 'An authentic Italian soda made the traditional way — sparkling mineral water is combined with your choice of fruit syrup and finished with a splash of cream for a silky, luxurious texture. Lightly sweet, refreshingly fizzy, and delicately creamy. A sophisticated European-style beverage that pairs beautifully with any meal.', price: 400, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['soda', 'italian'], ingredients: ['Carbonated Water', 'Italian Syrup', 'Ice', 'Cream'], relatedItems: ['bev-12', 'bev-14', 'bev-10', 'bev-11', 'bev-7']},
  { id: 'bev-14', name: 'NORTHPOL SODA', briefDescription: 'Northpole flavored soda', description: 'A crisp, cool, and refreshing carbonated beverage with a unique Northpole-inspired flavor profile. Light, bubbly, and subtly sweet with a hint of minty freshness that evokes the crisp, clean air of the arctic. A uniquely refreshing experience that stands out from ordinary sodas.', price: 400, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['soda', 'refreshing'], ingredients: ['Carbonated Water', 'Northpole Syrup', 'Sugar', 'Ice'], relatedItems: ['bev-12', 'bev-13', 'bev-10', 'bev-11', 'bev-7']},
  { id: 'bev-15', name: 'PINEAPPLE JUICE', briefDescription: 'Fresh pineapple juice', description: 'Bright, tropical, and naturally sweet — our fresh pineapple juice is made from hand-selected ripe pineapples, pressed and served chilled. No added sugars, no concentrates. Just pure, sun-ripened pineapple in its most delicious form. A refreshing, vitamin-packed beverage that pairs wonderfully with our spicy dishes.', price: 450, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['juice', 'pineapple'], ingredients: ['Pineapple', 'Sugar', 'Water', 'Ice'], relatedItems: ['bev-16', 'bev-17', 'bev-18', 'bev-19', 'bev-20']},
  { id: 'bev-16', name: 'APPLE JUICE', briefDescription: 'Fresh apple juice', description: 'Crisp, clean, and naturally refreshing — our apple juice is made from freshly pressed apples, capturing the pure, sweet-tart essence of ripe orchard apples. Served chilled, it is the perfect non-carbonated refreshment that appeals to all ages. Pure, simple, and delicious.', price: 450, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['juice', 'apple'], ingredients: ['Apple', 'Sugar', 'Water', 'Ice'], relatedItems: ['bev-15', 'bev-17', 'bev-18', 'bev-19', 'bev-20']},
  { id: 'bev-17', name: 'PEACH JUICE', briefDescription: 'Fresh peach juice', description: 'Sweet, summery, and utterly delightful — our peach juice captures the delicate, fragrant flavor of sun-ripened peaches in every sip. Made from real peaches, lightly sweetened, and served ice-cold. A gently sweet, aromatic juice that is perfect for those who prefer a milder, more subtle fruit flavor.', price: 350, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['juice', 'peach'], ingredients: ['Peach', 'Sugar', 'Water', 'Ice'], relatedItems: ['bev-15', 'bev-16', 'bev-18', 'bev-19', 'bev-20']},
  { id: 'bev-18', name: 'STRAWBERRY JUICE', briefDescription: 'Fresh strawberry juice', description: 'A vibrant, ruby-red juice bursting with the sweet, sun-kissed flavor of ripe strawberries. Made from real strawberries, lightly sweetened, and served over ice. Every sip delivers the unmistakable taste of fresh-picked berries — naturally sweet, slightly tart, and absolutely delicious.', price: 350, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['juice', 'strawberry'], ingredients: ['Strawberry', 'Sugar', 'Water', 'Ice'], relatedItems: ['bev-15', 'bev-16', 'bev-17', 'bev-19', 'bev-20']},
  { id: 'bev-19', name: 'MANGO JUICE', briefDescription: 'Fresh mango juice', description: 'Golden, tropical, and luxuriously smooth — our mango juice is made from the finest ripe mangoes, blended into a thick, luscious juice that captures the essence of summer. Naturally sweet with a hint of tanginess, this is the closest thing to biting into a perfectly ripe mango. A true tropical indulgence.', price: 350, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['juice', 'mango'], ingredients: ['Mango', 'Sugar', 'Water', 'Ice'], relatedItems: ['bev-15', 'bev-16', 'bev-17', 'bev-18', 'bev-20']},
  { id: 'bev-20', name: 'ORANGE JUICE', briefDescription: 'Fresh orange juice', description: 'Bright, tangy, and full of Vitamin C — our fresh orange juice is made from hand-squeezed oranges, served chilled to preserve its natural goodness. No concentrates, no added sugars. Just the pure, zesty taste of fresh oranges in every glass. The classic breakfast beverage, perfect any time of day.', price: 350, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['juice', 'orange'], ingredients: ['Orange', 'Sugar', 'Water', 'Ice'], relatedItems: ['bev-15', 'bev-16', 'bev-17', 'bev-18', 'bev-19']},
  { id: 'bev-21', name: 'MR. SP SHAKE', briefDescription: 'Signature special milkshake', description: 'Our signature milkshake is a thick, creamy, and utterly indulgent creation. Premium vanilla ice cream is blended with cold milk and our secret special syrup, creating a shake that is perfectly sweet, luxuriously thick, and absolutely unforgettable. Topped with whipped cream and a cherry, this is milkshake perfection.', price: 450, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['shake', 'special'], ingredients: ['Milk', 'Ice Cream', 'Special Syrup', 'Sugar'], relatedItems: ['bev-22', 'bev-23', 'bev-24', 'bev-25', 'bev-30']},
  { id: 'bev-22', name: 'OREO STRAWBERRY', briefDescription: 'Oreo strawberry blended shake', description: 'A delightful twist on the classic Oreo shake. Creamy vanilla ice cream is blended with crunchy Oreo cookies and sweet strawberry syrup, creating a beautiful pink shake with chunks of chocolate cookie in every sip. The combination of chocolate, strawberry, and cream is a match made in dessert heaven.', price: 450, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['shake', 'oreo', 'strawberry'], ingredients: ['Milk', 'Ice Cream', 'Oreo', 'Strawberry Syrup', 'Sugar'], relatedItems: ['bev-21', 'bev-23', 'bev-24', 'bev-25', 'bev-35']},
  { id: 'bev-23', name: 'OREO SHAKE', briefDescription: 'Classic Oreo milkshake', description: 'The classic that everyone loves. Creamy vanilla ice cream is blended with real Oreo cookies to create a thick, indulgent milkshake filled with chocolate cookie pieces in every sip. Topped with whipped cream and crushed Oreo crumbs, this is the ultimate Oreo experience in a glass. Rich, creamy, and absolutely irresistible.', price: 400, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['shake', 'oreo'], ingredients: ['Milk', 'Ice Cream', 'Oreo', 'Sugar'], relatedItems: ['bev-21', 'bev-22', 'bev-24', 'bev-25', 'bev-30']},
  { id: 'bev-24', name: 'KITKAT SHAKE', briefDescription: 'Kitkat chocolate milkshake', description: 'A chocolate lover\'s dream. Premium chocolate ice cream is blended with cold milk and crunchy KitKat pieces, creating a rich, velvety shake with delightful chocolate crunch in every sip. Topped with whipped cream and a mini KitKat, this shake is a decadent treat that satisfies the most intense chocolate cravings.', price: 400, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['shake', 'kitkat'], ingredients: ['Milk', 'Ice Cream', 'Kitkat', 'Chocolate Syrup', 'Sugar'], relatedItems: ['bev-21', 'bev-23', 'bev-25', 'bev-22', 'bev-30']},
  { id: 'bev-25', name: 'LOTUS SHAKE', briefDescription: 'Lotus biscoff flavored milkshake', description: 'Experience the irresistible flavor of Lotus Biscoff in milkshake form. Creamy vanilla ice cream is blended with crushed Lotus Biscoff cookies and a swirl of Biscoff spread, creating a uniquely caramelized, spiced flavor that is absolutely addictive. Topped with whipped cream and more crushed Biscoff, every sip is a moment of pure bliss.', price: 450, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['shake', 'lotus'], ingredients: ['Milk', 'Ice Cream', 'Lotus Biscoff', 'Sugar'], relatedItems: ['bev-21', 'bev-23', 'bev-24', 'bev-22', 'bev-30']},
  { id: 'bev-26', name: 'COLD COFFEE', briefDescription: 'Chilled coffee drink', description: 'A perfectly chilled coffee beverage made from freshly brewed, premium coffee beans, blended with cold milk and a touch of sugar, then served over ice. Smooth, refreshing, and gently caffeinated. Not too sweet, not too bitter — just perfectly balanced. The ideal pick-me-up on a warm day or any time you need a refreshing coffee fix.', price: 450, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['coffee', 'cold'], ingredients: ['Coffee', 'Milk', 'Ice', 'Sugar'], relatedItems: ['bev-21', 'bev-23', 'bev-25', 'bev-30', 'bev-31']},
  { id: 'bev-27', name: 'ELECT LEMONADE', briefDescription: 'Electrifying lemonade drink', description: 'An electrifying twist on classic lemonade. Freshly squeezed lemons are combined with carbonated water, a touch of sugar, and a unique blend of electrolytes for a refreshing, revitalizing beverage that is perfect for recharging. Tangy, fizzy, and lightly sweetened — the ultimate thirst quencher.', price: 350, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['lemonade', 'refreshing'], ingredients: ['Lemon', 'Sugar', 'Carbonated Water', 'Ice', 'Electrolytes'], relatedItems: ['bev-28', 'bev-29', 'bev-12', 'bev-14', 'bev-7']},
  { id: 'bev-28', name: 'STRAW MARGARITA', briefDescription: 'Strawberry margarita mocktail', description: 'Our non-alcoholic strawberry margarita is a vibrant, refreshing mocktail that captures the essence of the classic cocktail. Fresh strawberries are muddled with lime juice and mint, then shaken with ice and a hint of sweetness. Served in a salt-rimmed glass, this drink is sweet, tangy, and incredibly refreshing — without the alcohol.', price: 350, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['mocktail', 'strawberry'], ingredients: ['Strawberry', 'Lime', 'Sugar', 'Ice', 'Mint'], relatedItems: ['bev-29', 'bev-27', 'bev-9', 'bev-8', 'bev-12']},
  { id: 'bev-29', name: 'MINT MARGARITA', briefDescription: 'Mint margarita mocktail', description: 'A cool, refreshing mocktail that invigorates the senses. Fresh mint leaves are muddled with lime juice and a touch of sugar, then topped with sparkling water and ice. The result is a crisp, clean, and incredibly refreshing beverage that cleanses the palate and revitalizes the spirit. The perfect accompaniment to any meal, especially our spicier dishes.', price: 250, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['mocktail', 'mint'], ingredients: ['Mint', 'Lime', 'Sugar', 'Ice', 'Carbonated Water'], relatedItems: ['bev-28', 'bev-27', 'bev-9', 'bev-8', 'bev-12']},
  { id: 'bev-30', name: 'STRAWBERRY SHAKE', briefDescription: 'Fresh strawberry milkshake', description: 'A classic, creamy strawberry milkshake made with real, ripe strawberries. Fresh strawberries are blended with premium vanilla ice cream and cold milk until thick, smooth, and perfectly pink. Every sip is bursting with authentic strawberry flavor. Topped with whipped cream and a fresh strawberry, this is the quintessential summer treat.', price: 350, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['shake', 'strawberry'], ingredients: ['Strawberry', 'Milk', 'Ice Cream', 'Sugar'], relatedItems: ['bev-31', 'bev-32', 'bev-33', 'bev-34', 'bev-35']},
  { id: 'bev-31', name: 'MANGO SHAKE', briefDescription: 'Fresh mango milkshake', description: 'A thick, creamy, golden mango milkshake made from the finest ripe mangoes blended with premium vanilla ice cream and cold milk. The natural sweetness and tropical aroma of the mango shine through, creating a luxuriously smooth shake that tastes like liquid sunshine. A seasonal favorite that mango lovers simply cannot resist.', price: 350, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['shake', 'mango'], ingredients: ['Mango', 'Milk', 'Ice Cream', 'Sugar'], relatedItems: ['bev-30', 'bev-32', 'bev-33', 'bev-34', 'bev-35']},
  { id: 'bev-32', name: 'BANANA SHAKE', briefDescription: 'Fresh banana milkshake', description: 'A naturally sweet and creamy banana milkshake made with ripe, fresh bananas blended into premium vanilla ice cream and cold milk. The natural creaminess of the banana creates an incredibly smooth, satisfying shake that is both wholesome and indulgent. A timeless classic that never goes out of style.', price: 300, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['shake', 'banana'], ingredients: ['Banana', 'Milk', 'Ice Cream', 'Sugar'], relatedItems: ['bev-30', 'bev-31', 'bev-34', 'bev-35', 'bev-33']},
  { id: 'bev-33', name: 'APPLE SHAKE', briefDescription: 'Fresh apple milkshake', description: 'A uniquely refreshing apple milkshake made with fresh, crisp apples blended into creamy vanilla ice cream and milk. The sweet-tart flavor of fresh apples cuts through the richness of the ice cream, creating a surprisingly light and refreshing shake that is both creamy and fruity. A deliciously different shake experience.', price: 350, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['shake', 'apple'], ingredients: ['Apple', 'Milk', 'Ice Cream', 'Sugar'], relatedItems: ['bev-30', 'bev-31', 'bev-32', 'bev-34', 'bev-35']},
  { id: 'bev-34', name: 'APPLE BANANA SHK', briefDescription: 'Apple banana blended shake', description: 'A perfectly balanced blend of fresh apples and ripe bananas in a creamy milkshake. The sweet, tropical creaminess of banana pairs beautifully with the crisp, tangy freshness of apple, creating a harmonious flavor combination that is both familiar and exciting. A wholesome, delicious treat.', price: 350, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['shake', 'apple', 'banana'], ingredients: ['Apple', 'Banana', 'Milk', 'Ice Cream', 'Sugar'], relatedItems: ['bev-30', 'bev-31', 'bev-32', 'bev-33', 'bev-35']},
  { id: 'bev-35', name: 'STRAWBERRY BANANA', briefDescription: 'Strawberry banana blended shake', description: 'The classic fruit combination, done right. Sweet, ripe bananas and juicy strawberries are blended with premium vanilla ice cream and cold milk to create a perfectly pink, perfectly delicious milkshake. The banana adds creamy body while the strawberry provides bright, fruity flavor. A beloved combination that never disappoints.', price: 400, image: CAT_IMG['beverages-drinks'], category: 'beverages-drinks', tags: ['shake', 'strawberry', 'banana'], ingredients: ['Strawberry', 'Banana', 'Milk', 'Ice Cream', 'Sugar'], relatedItems: ['bev-30', 'bev-31', 'bev-32', 'bev-34', 'bev-22']},
];

export const deals: Deal[] = [
  {
    id: 'deal-1',
    name: 'Small Feast',
    description: '1 Small Pizza + 1 Mr Special Platter + 1 Cold Drink 500ml',
    image: '/assets/Hero/Deal.webp',
    discount: 16,
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
    name: 'Medium Duo',
    description: '1 Medium Pizza + 1 Pasta + 1 Cold Drink 500ml',
    image: '/assets/Hero/Deal.webp',
    discount: 15,
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
    name: 'Family Combo',
    description: '1 Large Pizza + 1 Fries + 1 Cold Drink 1Ltr',
    image: '/assets/Hero/Deal.webp',
    discount: 14,
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
    name: 'Large Feast',
    description: '2 Medium Pizza + 1 Fries + 1 Cold Drink 1.5Ltr',
    image: '/assets/Hero/Deal.webp',
    discount: 15,
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
    name: 'Mega Feast',
    description: '1 Large Pizza + 1 Medium Pizza + 1 Fries + 1 Cold Drink 1.5Ltr',
    image: '/assets/Hero/Deal.webp',
    discount: 15,
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
    name: 'Ultimate Feast',
    description: '2 Large Pizza + 1 Fries + 1 Cold Drink 1.5Ltr',
    image: '/assets/Hero/Deal.webp',
    discount: 16,
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
    name: 'Burger Deal',
    description: '1 Small Pizza + 2 Zinger Burger + 2 Cane Drink',
    image: '/assets/Hero/Deal.webp',
    discount: 13,
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
    name: 'Burger Feast',
    description: '4 Zinger Burger + 2 Regular Fries + 1 1.5Ltr Drink',
    image: '/assets/Hero/Deal.webp',
    discount: 17,
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
    name: 'Burger Party',
    description: '6 Zinger Burger + 2 Regular Fries + 1 1.5Ltr Drink',
    image: '/assets/Hero/Deal.webp',
    discount: 16,
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
    name: 'The Grand Feast',
    description: '2 Large Pizza + 2 Fries + 4 Patty Burger + 1.5Ltr + 1Ltr Drinks',
    image: '/assets/Hero/Deal.webp',
    discount: 17,
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
