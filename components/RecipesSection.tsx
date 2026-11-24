'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Utensils,
  Clock,
  Flame,
  ChefHat,
  X,
  Sparkles,
  Check,
  ChevronRight,
  BookOpen,
  Award
} from 'lucide-react';

export interface RecipeItem {
  id: string;
  title: string;
  category: 'Fine Dining' | 'Meat Special' | 'Continental' | 'Heritage Fusion';
  course: string;
  image: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  difficulty: 'Executive' | 'Master' | 'Intermediate' | 'Artisan';
  description: string;
  ingredients: {
    section: string;
    items: string[];
  }[];
  instructions: {
    step: number;
    title: string;
    details: string;
  }[];
  platingNotes: string;
  chefSecret: string;
}

const recipesData: RecipeItem[] = [
  {
    id: 'recipe-salmon',
    title: 'Pan-Seared Atlantic Salmon with Saffron Velouté & Buttered Asparagus',
    category: 'Fine Dining',
    course: 'Signature Fish Entrée',
    image: '/images/gallery/creation-04.jpg',
    prepTime: '15 mins',
    cookTime: '20 mins',
    servings: '2 Servings',
    difficulty: 'Executive',
    description: 'Crisp skin-on salmon fillet seated atop a luscious saffron-infused white wine velouté, flanked by tender buttered asparagus spears, micro-greens, and chive emulsion.',
    ingredients: [
      {
        section: 'For the Salmon',
        items: [
          '2 fresh Atlantic salmon fillets (180g each, skin-on, scaled & pin-boned)',
          '1 tbsp Extra virgin olive oil or clarified butter',
          'Fleur de sel & freshly cracked white pepper',
          '1 sprig fresh thyme & 1 garlic clove (lightly crushed)'
        ]
      },
      {
        section: 'For the Saffron Velouté',
        items: [
          'A pinch of premium saffron threads (steeped in 2 tbsp warm fish stock)',
          '1 finely minced French shallot',
          '60ml dry white wine (Sauvignon Blanc or Chardonnay)',
          '120ml concentrated fish or vegetable velouté base',
          '50ml heavy culinary cream',
          '30g ice-cold unsalted butter cubes'
        ]
      },
      {
        section: 'Garnish & Accompaniments',
        items: [
          '8 young asparagus spears (trimmed & blanched in sea-salted water)',
          'Micro basil & edible borage blossoms',
          'Cold-pressed herb oil for plating teardrops'
        ]
      }
    ],
    instructions: [
      {
        step: 1,
        title: 'Preparation & Skin Scoring',
        details: 'Pat the salmon fillets completely dry with linen paper. Using a razor-sharp slicing knife, make 3 shallow diagonal score marks on the skin without puncturing the flesh. Season liberally with fine sea salt.'
      },
      {
        step: 2,
        title: 'Precision Pan-Searing',
        details: 'Heat a heavy stainless steel skillet over medium-high until lightly smoking. Add clarified butter. Place salmon skin-side down and gently press with a fish spatula for 30 seconds to prevent curling. Sauté undisturbed for 4 to 5 minutes until the skin is golden and shatteringly crisp.'
      },
      {
        step: 3,
        title: 'Basting & Gentle Finish',
        details: 'Flip the fillet, toss in crushed garlic and thyme, and baste the golden crust with bubbling pan juices for 90 seconds. Remove immediately to a warm wire rack to rest.'
      },
      {
        step: 4,
        title: 'Velouté Emulsification',
        details: 'In a small saucier, sweat shallots in olive oil without browning. Deglaze with white wine and reduce by two-thirds. Pour in steeped saffron liquor and velouté base. Simmer gently, add cream, and whisk in cold butter cubes off heat until velvety and glossy.'
      }
    ],
    platingNotes: 'Spoon a generous circle of radiant golden saffron velouté in the center of a wide-rimmed dark charcoal bowl. Arrange three buttered asparagus spears offset. Gently rest the salmon skin-side up across the spears. Finish with three droplets of herb oil and fresh micro basil.',
    chefSecret: 'Always allow the skin to dry uncovered in the refrigerator for 30 minutes before cooking. Removing surface moisture guarantees that Michelin-standard glass-crisp skin every single time.'
  },
  {
    id: 'recipe-lamb',
    title: 'Himalayan Herb-Crusted Lamb Rack with Truffled Potato Mousseline',
    category: 'Meat Special',
    course: 'Executive Meat Course',
    image: '/images/gallery/creation-01.jpg',
    prepTime: '25 mins',
    cookTime: '30 mins',
    servings: '2 Servings',
    difficulty: 'Master',
    description: 'French-trimmed prime rack of lamb coated in an aromatic Himalayan timur and rosemary herb crust, served with a velvet truffled potato mousseline and red wine reduction.',
    ingredients: [
      {
        section: 'For the Lamb Rack',
        items: [
          '1 prime rack of lamb (6 to 8 ribs, fully French-trimmed)',
          '2 tbsp Dijon mustard for brushing',
          '35g Japanese panko breadcrumbs',
          '1 tbsp finely chopped fresh rosemary & thyme',
          '1 tsp crushed Himalayan timut pepper (wild mountain pepper)',
          '2 cloves garlic, microplaned',
          '2 tbsp grated Parmigiano-Reggiano'
        ]
      },
      {
        section: 'For the Truffled Mousseline',
        items: [
          '400g Yukon gold potatoes (steamed & passed through a fine ricer)',
          '75g warm cultured butter',
          '60ml hot heavy cream',
          '1 tsp white truffle oil & sea salt to taste'
        ]
      },
      {
        section: 'Cabernet Jus Reduction',
        items: [
          '150ml rich veal or lamb demi-glace',
          '80ml Cabernet Sauvignon reduction',
          '1 sprig fresh rosemary & 1 tsp cold butter'
        ]
      }
    ],
    instructions: [
      {
        step: 1,
        title: 'Herb Crust Preparation',
        details: 'Pulse panko breadcrumbs, fresh rosemary, timut pepper, garlic, and parmesan with a drizzle of olive oil until vibrant green and fragrant.'
      },
      {
        step: 2,
        title: 'Hard Sear & Crusting',
        details: 'Season the lamb rack with kosher salt. Sear in a hot skillet for 2 minutes on each side to render the fat cap and develop a deep mahogany caramelized crust. Remove from pan and brush the fat side with a thin layer of Dijon mustard, then press the green herb crust firmly on top.'
      },
      {
        step: 3,
        title: 'Precision Roasting',
        details: 'Roast in a preheated oven at 200°C (395°F) for 12 to 14 minutes until the core registers 54°C (130°F) for ideal medium-rare. Rest on a warm board for 8 minutes before carving.'
      },
      {
        step: 4,
        title: 'Mousseline Whipping',
        details: 'Vigorously whip the riced potatoes with warm butter, hot cream, and truffle oil until silk-like and aerated.'
      }
    ],
    platingNotes: 'Spoon a smooth quenelle of truffled mousseline onto the plate. Carve the lamb rack into double-cut chops and interlock them diagonally over the purée. Drizzle glossy Cabernet reduction around the perimeter and garnish with glazed baby carrots.',
    chefSecret: 'Resting the lamb is non-negotiable. Allowing the meat to rest for 8 full minutes ensures the juices redistribute evenly throughout the muscle fibers, yielding a succulent pink texture from edge to edge.'
  },
  {
    id: 'recipe-risotto',
    title: 'Wild Forest Chanterelle & Porcini Risotto with Aged Parmigiano',
    category: 'Continental',
    course: 'Artisanal Primi / Main',
    image: '/images/gallery/creation-03.jpg',
    prepTime: '15 mins',
    cookTime: '25 mins',
    servings: '4 Servings',
    difficulty: 'Intermediate',
    description: 'Slow-simmered Carnaroli rice enriched with wild dried porcini broth, fresh sautéed chanterelle mushrooms, crisp thyme leaves, and 24-month Parmigiano-Reggiano mantecatura.',
    ingredients: [
      {
        section: 'Risotto Base',
        items: [
          '300g Carnaroli or Arborio rice (unwashed)',
          '1.2L rich vegetable or poultry broth infused with steeped dried porcini',
          '80ml dry Italian white wine (Pinot Grigio)',
          '1 medium banana shallot, finely brunoised',
          '2 tbsp extra virgin olive oil'
        ]
      },
      {
        section: 'Mushroom Sauté',
        items: [
          '250g fresh chanterelle or cremini mushrooms, brushed & sliced',
          '20g rehydrated porcini mushrooms (drained & chopped)',
          '1 tbsp butter, fresh thyme leaves, and sea salt'
        ]
      },
      {
        section: 'Mantecatura Finish',
        items: [
          '50g ice-cold unsalted butter, cubed',
          '60g freshly grated Parmigiano-Reggiano (24 months)',
          'Freshly ground black peppercorn & white truffle essence'
        ]
      }
    ],
    instructions: [
      {
        step: 1,
        title: 'The Porcini Broth Foundation',
        details: 'Soak dried porcini mushrooms in warm broth for 20 minutes. Strain through a cheesecloth back into the main broth and keep at a steady gentle simmer throughout cooking.'
      },
      {
        step: 2,
        title: 'Tostatura (Rice Toasting)',
        details: 'In a heavy copper or cast-iron pan, sweat shallots in olive oil. Add the rice and toast dry for 2 to 3 minutes until the grains become translucent with a chalky center and smell faintly nutty. Deglaze with white wine and stir until fully absorbed.'
      },
      {
        step: 3,
        title: 'Gradual Simmering',
        details: 'Begin ladling hot broth one scoop at a time, stirring steadily. Allow each ladle to be absorbed before adding the next. Continue for approximately 16 to 18 minutes until rice is al dente.'
      },
      {
        step: 4,
        title: 'The Sacred Mantecatura',
        details: 'Remove the pan from the heat entirely. Add cold cubed butter and grated Parmigiano. Vigorously beat with a wooden spoon in circular motions to emulsify the starches into a wave-like (all’onda) creamy texture.'
      }
    ],
    platingNotes: 'Spoon risotto into a shallow preheated porcelain bowl. Tap the bottom of the plate against the palm of your hand to allow the risotto to naturally spread into a flat, glossy wave. Top with sautéed wild chanterelles, shaved parmesan crisps, and fresh thyme.',
    chefSecret: 'Never add cold broth to risotto—it shocks the grain and prevents starch release. The cold butter in the mantecatura, conversely, creates temperature-shock emulsification that yields that legendary restaurant silkiness.'
  },
  {
    id: 'recipe-momo',
    title: 'Artisanal Himalayan Momo with Charred Tomato & Timur Relish',
    category: 'Heritage Fusion',
    course: 'Modern Himalayan Heritage',
    image: '/images/gallery/creation-02.jpg',
    prepTime: '35 mins',
    cookTime: '15 mins',
    servings: '4 Servings',
    difficulty: 'Artisan',
    description: 'Hand-pleated delicate dumplings with a seasoned savory filling, mountain scallions, and ginger, served with a smoky fire-roasted tomato and wild timur pepper chutney.',
    ingredients: [
      {
        section: 'For the Dough & Wrappers',
        items: [
          '250g unbleached organic all-purpose flour',
          '130ml lukewarm water',
          'A pinch of fine sea salt'
        ]
      },
      {
        section: 'Aromatic Savory Filling',
        items: [
          '400g finely minced meat or minced portobello & cabbage',
          '1 medium red onion, finely minced',
          '3 scallions / spring onions, finely sliced',
          '1.5 tbsp fresh ginger-garlic paste',
          '1 tsp crushed Himalayan timur (Sichuan pepper)',
          '1 tsp roasted cumin powder & fresh ground coriander',
          '2 tbsp melted clarified butter (ghee) for juiciness'
        ]
      },
      {
        section: 'Smoked Charred Chutney',
        items: [
          '3 ripe vine tomatoes (charred over open flame)',
          '2 tbsp roasted white sesame seeds',
          '2 cloves garlic & 1 fresh green chili',
          '1 tsp roasted timur pepper & fresh lime juice'
        ]
      }
    ],
    instructions: [
      {
        step: 1,
        title: 'Dough Kneading & Resting',
        details: 'Knead flour and water for 8 minutes until smooth, pliable, and elastic. Cover with a damp muslin cloth and rest for at least 30 minutes.'
      },
      {
        step: 2,
        title: 'Filling Emulsification',
        details: 'Mix the minced filling with onion, spring onions, ginger, garlic, ground timur, and spices. Fold in warm melted ghee to ensure the dumplings remain burstingly juicy when steamed.'
      },
      {
        step: 3,
        title: 'Classical Pleating Technique',
        details: 'Roll rested dough into a thin cylinder, divide into 20g balls, and roll out each ball into a circular disc with thin edges and a slightly thicker center. Place 1 tablespoon of filling in the center and execute 12 to 14 circular overlapping pleats to seal.'
      },
      {
        step: 4,
        title: 'Steaming & Chutney Fire-Roasting',
        details: 'Steam in an oiled bamboo steamer over rolling boiling water for 10 to 12 minutes until wrappers turn glossy and translucent. Meanwhile, blend charred tomatoes with toasted sesame, garlic, and crushed timur into a smoky velvety sauce.'
      }
    ],
    platingNotes: 'Present five freshly steamed momos in a circular arrangement on an artisanal slate or dark stone platter. Spoon a pool of vibrant red charred timur relish in the center. Garnish with micro cilantro and a dusting of toasted sesame seeds.',
    chefSecret: 'Charring whole tomatoes over an open flame until the skins are completely blistered black before blending gives the chutney an unforgettable rustic woodsmoke depth that complements the citrus tingling notes of the timur pepper.'
  }
];

export default function RecipesSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeItem | null>(null);

  const categories = ['All', 'Fine Dining', 'Meat Special', 'Continental', 'Heritage Fusion'];

  const filteredRecipes = recipesData.filter((recipe) => {
    if (activeCategory === 'All') return true;
    return recipe.category === activeCategory;
  });

  return (
    <section id="recipes" className="py-16 sm:py-24 md:py-36 bg-[#09090b] relative overflow-hidden border-t border-white/5">
      {/* Decorative luxury lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#c9a96e]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 border border-[#c9a96e]/30 bg-[#121217] rounded-full mb-4">
            <ChefHat className="w-3.5 h-3.5 text-[#c9a96e]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#e8dfcf] font-medium">
              Curated Culinary Archives
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#f4efe6]">
            Signature Master Recipes
          </h2>
          <div className="w-16 h-[1.5px] bg-[#c9a96e] mt-4 sm:mt-6 mb-4 sm:mb-6" />
          <p className="max-w-2xl text-xs sm:text-sm md:text-base text-[#ded8cd]/80 leading-relaxed font-light">
            Step-by-step master dishes calibrated by Chef Bijaya across luxury resort tenures and international culinary brigades in Kuwait and Nepal. Click any recipe to discover precise methods, ingredient breakdowns, and plating secrets.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-5 py-2 text-[11px] sm:text-xs uppercase tracking-[0.18em] font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-[#c9a96e] text-[#09090b] font-semibold shadow-lg'
                  : 'bg-[#121217] text-[#ded8cd]/70 hover:text-white border border-white/5 hover:border-[#c9a96e]/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="group bg-[#111116] border border-white/5 overflow-hidden hover:border-[#c9a96e]/40 transition-all duration-500 shadow-xl flex flex-col justify-between"
            >
              {/* Recipe Image & Tags Header */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#16161c]">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover object-center filter brightness-[0.88] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 bg-black/70 backdrop-blur-md border border-[#c9a96e]/40 text-[10px] sm:text-[11px] uppercase tracking-widest text-[#c9a96e] font-mono">
                    {recipe.category}
                  </span>
                  <span className="px-3 py-1 bg-[#121217]/80 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-widest text-[#ded8cd] font-mono">
                    {recipe.difficulty} Difficulty
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] uppercase tracking-widest text-[#c9a96e] font-mono">
                    {recipe.course}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#f4efe6] font-normal mt-1 leading-snug group-hover:text-[#c9a96e] transition-colors">
                    {recipe.title}
                  </h3>
                </div>
              </div>

              {/* Recipe Details Body */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                <p className="text-xs sm:text-sm text-[#ded8cd]/80 font-light leading-relaxed mb-6">
                  {recipe.description}
                </p>

                {/* Timing & Servings Strip */}
                <div className="grid grid-cols-3 gap-2 py-3 px-4 bg-[#16161d] border border-white/5 text-center text-xs mb-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8c887e] block">Prep</span>
                    <span className="text-[#f4efe6] font-mono font-medium">{recipe.prepTime}</span>
                  </div>
                  <div className="border-x border-white/5">
                    <span className="text-[10px] uppercase tracking-wider text-[#8c887e] block">Cook</span>
                    <span className="text-[#f4efe6] font-mono font-medium">{recipe.cookTime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8c887e] block">Yield</span>
                    <span className="text-[#f4efe6] font-mono font-medium">{recipe.servings}</span>
                  </div>
                </div>

                {/* Trigger Button */}
                <button
                  onClick={() => setSelectedRecipe(recipe)}
                  className="w-full py-3 px-4 bg-[#181822] hover:bg-[#c9a96e] text-[#e8dfcf] hover:text-[#09090b] border border-[#c9a96e]/30 hover:border-[#c9a96e] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-md group/btn"
                >
                  <BookOpen className="w-4 h-4 text-[#c9a96e] group-hover/btn:text-[#09090b] transition-colors" />
                  <span>View Full Recipe &amp; Plating Method</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULL RECIPE INTERACTIVE MODAL */}
      {selectedRecipe && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in"
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            className="relative bg-[#101014] border border-[#c9a96e]/40 max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl my-8 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedRecipe(null)}
              aria-label="Close recipe"
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-[#c9a96e] text-white hover:text-[#09090b] border border-white/10 hover:border-[#c9a96e] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="border-b border-white/10 pb-6 mb-8 pr-12">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-[#c9a96e]/15 border border-[#c9a96e]/30 text-xs font-mono uppercase tracking-widest text-[#c9a96e]">
                  {selectedRecipe.category}
                </span>
                <span className="text-xs uppercase tracking-wider text-[#8c887e]">
                  {selectedRecipe.course} &bull; {selectedRecipe.difficulty} Level
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#f4efe6] font-normal leading-tight">
                {selectedRecipe.title}
              </h3>

              <div className="flex flex-wrap gap-6 mt-4 text-xs font-mono text-[#ded8cd]/80">
                <span><strong className="text-[#c9a96e]">Prep Time:</strong> {selectedRecipe.prepTime}</span>
                <span><strong className="text-[#c9a96e]">Cook Time:</strong> {selectedRecipe.cookTime}</span>
                <span><strong className="text-[#c9a96e]">Yield:</strong> {selectedRecipe.servings}</span>
              </div>
            </div>

            {/* 2-Column Content: Ingredients & Instructions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8">
              {/* Left Column: Ingredients */}
              <div className="lg:col-span-5 bg-[#14141a] border border-white/5 p-6 space-y-6">
                <h4 className="font-serif text-xl text-[#c9a96e] flex items-center space-x-2 border-b border-white/10 pb-3">
                  <Utensils className="w-4 h-4 text-[#c9a96e]" />
                  <span>Mise en Place &amp; Ingredients</span>
                </h4>

                {selectedRecipe.ingredients.map((sec, sIdx) => (
                  <div key={sIdx} className="space-y-3">
                    <h5 className="text-xs uppercase tracking-widest text-[#e8dfcf] font-mono font-semibold">
                      {sec.section}
                    </h5>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#ded8cd]/85 font-light">
                      {sec.items.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start space-x-2">
                          <Check className="w-3.5 h-3.5 text-[#c9a96e] shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Right Column: Culinary Method */}
              <div className="lg:col-span-7 space-y-6">
                <h4 className="font-serif text-xl text-[#f4efe6] flex items-center space-x-2 border-b border-white/10 pb-3">
                  <Flame className="w-4 h-4 text-[#c9a96e]" />
                  <span>Culinary Execution &amp; Method</span>
                </h4>

                <div className="space-y-5">
                  {selectedRecipe.instructions.map((step) => (
                    <div key={step.step} className="flex items-start space-x-4">
                      <div className="w-7 h-7 rounded-full bg-[#c9a96e]/15 border border-[#c9a96e]/40 flex items-center justify-center text-xs font-mono text-[#c9a96e] font-semibold shrink-0 mt-0.5">
                        0{step.step}
                      </div>
                      <div>
                        <h5 className="font-serif text-base text-[#f4efe6] font-medium">
                          {step.title}
                        </h5>
                        <p className="text-xs sm:text-sm text-[#ded8cd]/80 font-light leading-relaxed mt-1">
                          {step.details}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Plating Artistry & Chef's Golden Secret */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
              {/* Plating Technique */}
              <div className="p-5 bg-[#14141c] border border-white/5 space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#c9a96e] font-mono flex items-center space-x-1.5 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Executive Plating Artistry</span>
                </span>
                <p className="text-xs sm:text-sm text-[#ded8cd]/85 font-light leading-relaxed">
                  {selectedRecipe.platingNotes}
                </p>
              </div>

              {/* Chef's Secret Tip */}
              <div className="p-5 bg-[#181613] border border-[#c9a96e]/30 space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#c9a96e] font-mono flex items-center space-x-1.5 font-semibold">
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>Chef Bijaya&apos;s Pro Tip</span>
                </span>
                <p className="text-xs sm:text-sm text-[#f4efe6]/90 font-light leading-relaxed italic">
                  &ldquo;{selectedRecipe.chefSecret}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
