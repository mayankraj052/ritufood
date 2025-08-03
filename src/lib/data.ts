export const Seasons = ['Summer', 'Winter', 'Monsoon', 'Spring', 'All'] as const;
export const MealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'All'] as const;
export const Regions = ['North', 'South', 'East', 'West'] as const;

export type Recipe = {
  id: number;
  title: string;
  image: string;
  imageHint: string;
  season: (typeof Seasons)[number];
  mealType: (typeof MealTypes)[number];
  region: (typeof Regions)[number];
  ingredients: string[];
  instructions: string;
};

export const seasonalIngredients = {
  Summer: ['Mango', 'Watermelon', 'Cucumber', 'Bottle Gourd', 'Mint', 'Lemon'],
  Monsoon: ['Corn', 'Jamun', 'Okra', 'Bitter Gourd', 'Ginger', 'Turmeric'],
  Winter: ['Carrot', 'Beetroot', 'Spinach', 'Mustard Greens', 'Orange', 'Amla'],
  Spring: ['Strawberries', 'Green Peas', 'Cauliflower', 'Cabbage', 'Radish', 'Coriander'],
  All: [],
};

export const allRecipes: Recipe[] = [
  {
    id: 1,
    title: 'Aamras Puri',
    image: 'https://placehold.co/600x400',
    imageHint: 'mango puree',
    season: 'Summer',
    mealType: 'Dessert',
    region: 'West',
    ingredients: ['Ripe Mangoes', 'Sugar', 'Ghee', 'Cardamom Powder', 'Whole Wheat Flour'],
    instructions: 'Peel and chop mangoes. Blend into a smooth puree with sugar and cardamom. Serve chilled with hot, deep-fried puris made from whole wheat dough.',
  },
  {
    id: 2,
    title: 'Masala Bhutta',
    image: 'https://placehold.co/600x400',
    imageHint: 'grilled corn',
    season: 'Monsoon',
    mealType: 'Snack',
    region: 'North',
    ingredients: ['Corn on the cob', 'Lemon', 'Salt', 'Red Chili Powder', 'Chaat Masala'],
    instructions: 'Roast the corn on an open flame until charred. Rub with a lemon wedge dipped in a mix of salt, chili powder, and chaat masala.',
  },
  {
    id: 3,
    title: 'Sarson ka Saag & Makki ki Roti',
    image: 'https://placehold.co/600x400',
    imageHint: 'green curry',
    season: 'Winter',
    mealType: 'Dinner',
    region: 'North',
    ingredients: ['Mustard Greens', 'Spinach', 'Ginger', 'Garlic', 'Maize Flour', 'Ghee'],
    instructions: 'Cook mustard greens and spinach until tender. Blend into a coarse paste. Temper with ginger, garlic, and spices. Serve hot with a dollop of ghee, alongside flatbreads made from maize flour.',
  },
  {
    id: 4,
    title: 'Gajar ka Halwa',
    image: 'https://placehold.co/600x400',
    imageHint: 'carrot dessert',
    season: 'Winter',
    mealType: 'Dessert',
    region: 'North',
    ingredients: ['Carrots', 'Milk', 'Sugar', 'Ghee', 'Cardamom', 'Nuts'],
    instructions: 'Grate carrots and cook in milk until soft. Add sugar and ghee, and cook until the mixture thickens. Garnish with cardamom and nuts.',
  },
  {
    id: 5,
    title: 'Sambar',
    image: 'https://placehold.co/600x400',
    imageHint: 'lentil soup',
    season: 'Summer',
    mealType: 'Lunch',
    region: 'South',
    ingredients: ['Toor Dal', 'Tamarind', 'Sambar Powder', 'Assorted Vegetables', 'Mustard Seeds', 'Curry Leaves'],
    instructions: 'Cook lentils until soft. Add tamarind pulp, sambar powder, and boiled vegetables. Temper with mustard seeds and curry leaves. Simmer and serve hot.',
  },
  {
    id: 6,
    title: 'Paneer Tikka',
    image: 'https://placehold.co/600x400',
    imageHint: 'grilled cheese',
    season: 'Spring',
    mealType: 'Snack',
    region: 'North',
    ingredients: ['Paneer', 'Yogurt', 'Tandoori Masala', 'Bell Peppers', 'Onion'],
    instructions: 'Marinate paneer cubes and vegetables in a yogurt and spice mixture. Skewer and grill until charred. Serve with mint chutney.',
  },
  {
    id: 7,
    title: 'Moong Dal Cheela',
    image: 'https://placehold.co/600x400',
    imageHint: 'lentil pancake',
    season: 'Monsoon',
    mealType: 'Breakfast',
    region: 'West',
    ingredients: ['Moong Dal (split yellow lentils)', 'Ginger', 'Green Chilies', 'Asafoetida', 'Salt'],
    instructions: 'Soak moong dal for a few hours. Grind to a smooth batter with ginger and green chilies. Add spices. Pour thin crepes on a hot griddle and cook until golden.',
  },
  {
    id: 8,
    title: 'Lemon Rice',
    image: 'https://placehold.co/600x400',
    imageHint: 'yellow rice',
    season: 'Summer',
    mealType: 'Lunch',
    region: 'South',
    ingredients: ['Cooked Rice', 'Lemon Juice', 'Mustard Seeds', 'Peanuts', 'Curry Leaves', 'Turmeric'],
    instructions: 'Heat oil, and splutter mustard seeds. Add peanuts and curry leaves. Add turmeric and cooked rice. Mix well. Turn off heat and add lemon juice.',
  },
];
