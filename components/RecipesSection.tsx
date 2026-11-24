'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { RecipeItem } from '@/lib/db';
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
  Award,
  BookText
} from 'lucide-react';

interface RecipesSectionProps {
  initialRecipes?: RecipeItem[];
}

export default function RecipesSection({ initialRecipes = [] }: RecipesSectionProps) {
  const [recipes, setRecipes] = useState<RecipeItem[]>(initialRecipes);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeItem | null>(null);

  // Sync recipes with API on mount to catch any newly created or edited recipes
  useEffect(() => {
    fetch('/api/recipes')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.recipes && data.recipes.length > 0) {
          setRecipes(data.recipes);
        }
      })
      .catch((err) => console.error('Error fetching recipes:', err));
  }, []);

  const categories = ['All', 'Fine Dining', 'Meat Special', 'Continental', 'Heritage Fusion'];

  const filteredRecipes = recipes.filter((recipe) => {
    if (activeCategory === 'All') return true;
    return recipe.category === activeCategory;
  });

  return (
    <section id="recipes" className="py-20 sm:py-28 md:py-36 bg-gradient-to-b from-[#0b0b10] via-[#100f17] to-[#0b0b10] relative overflow-hidden border-y border-[#c9a96e]/15">
      {/* Decorative Warm Atelier Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#c9a96e]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Header: Distinct Recipe Atelier Style */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-18 md:mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 border border-[#c9a96e]/40 bg-[#161520]/80 rounded-full mb-4 shadow-inner">
            <BookOpen className="w-3.5 h-3.5 text-[#c9a96e]" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#e8dfcf] font-medium">
              Culinary Atelier &bull; Recipe Notebook
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#f4efe6]">
            Signature Master Recipes
          </h2>
          <div className="w-16 h-[1.5px] bg-[#c9a96e] mt-4 sm:mt-5 mb-4 sm:mb-5" />
          <p className="max-w-2xl text-xs sm:text-sm md:text-base text-[#ded8cd]/80 leading-relaxed font-light">
            Exact culinary formulas calibrated by Chef Bijaya across luxury resort kitchens and international brigades. Discover precise ingredient measures, critical control temperatures, and executive plating notes.
          </p>
        </div>

        {/* Distinct Atelier Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-5 py-2 text-[11px] sm:text-xs uppercase tracking-[0.18em] font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-[#c9a96e] text-[#09090b] font-semibold shadow-lg scale-105'
                  : 'bg-[#15141e] text-[#ded8cd]/70 hover:text-white border border-white/10 hover:border-[#c9a96e]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 2-Column Wide Recipe Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredRecipes.map((recipe) => {
            // Extract top 4 featured ingredients for teaser
            const featuredIngredients = recipe.ingredients
              ? recipe.ingredients.flatMap((sec) => sec.items).slice(0, 4)
              : [];

            return (
              <div
                key={recipe.id}
                className="group bg-[#13121b] border border-[#c9a96e]/20 hover:border-[#c9a96e]/50 transition-all duration-500 shadow-2xl flex flex-col justify-between overflow-hidden relative"
              >
                {/* Recipe Top Banner Image */}
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#181724]">
                  <Image
                    src={recipe.image || '/images/gallery/creation-04.jpg'}
                    alt={recipe.title}
                    fill
                    className="object-cover object-center filter brightness-[0.88] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13121b] via-[#13121b]/40 to-transparent" />

                  {/* Badges Overlay */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 bg-black/75 backdrop-blur-md border border-[#c9a96e]/40 text-[10px] uppercase font-mono tracking-widest text-[#c9a96e]">
                      {recipe.category}
                    </span>
                    <span className="px-3 py-1 bg-[#161520]/80 backdrop-blur-md border border-white/10 text-[10px] uppercase font-mono tracking-widest text-[#ded8cd]">
                      {recipe.difficulty} Level
                    </span>
                  </div>

                  {/* Course descriptor */}
                  <div className="absolute bottom-3 left-5">
                    <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#c9a96e]">
                      {recipe.course}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    {/* Cooking Parameters Strip */}
                    <div className="flex flex-wrap items-center gap-3 py-2 px-3 bg-[#181724] border border-white/5 text-[11px] text-[#ded8cd]/80 font-mono mb-4">
                      <div className="flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#c9a96e]" />
                        <span>Prep: {recipe.prepTime}</span>
                      </div>
                      <span>&bull;</span>
                      <div className="flex items-center space-x-1.5">
                        <Flame className="w-3.5 h-3.5 text-amber-400" />
                        <span>Cook: {recipe.cookTime}</span>
                      </div>
                      <span>&bull;</span>
                      <div className="flex items-center space-x-1.5">
                        <Utensils className="w-3.5 h-3.5 text-[#c9a96e]" />
                        <span>{recipe.servings}</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl text-[#f4efe6] font-normal leading-snug group-hover:text-[#c9a96e] transition-colors mb-3">
                      {recipe.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#ded8cd]/75 leading-relaxed font-light mb-4">
                      {recipe.description}
                    </p>

                    {/* Featured Ingredients Pill Strip */}
                    {featuredIngredients.length > 0 && (
                      <div className="pt-3 border-t border-white/5">
                        <span className="text-[10px] uppercase tracking-widest text-[#8c887e] font-mono block mb-2">
                          Key Formulation Elements:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {featuredIngredients.map((ing, iIdx) => (
                            <span
                              key={iIdx}
                              className="px-2.5 py-1 bg-[#1a1926] border border-white/5 text-[10.5px] text-[#ded8cd]/90 truncate max-w-[200px]"
                            >
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Plating Note Snippet */}
                    {recipe.platingNotes && (
                      <div className="mt-4 p-3 bg-[#171622]/60 border-l-2 border-[#c9a96e] text-xs text-[#ded8cd]/80 font-light italic">
                        &ldquo;{recipe.platingNotes.slice(0, 140)}...&rdquo;
                      </div>
                    )}
                  </div>

                  {/* Card Action Button */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-[#8c887e] font-mono">
                      {recipe.instructions?.length || 0} Calibrated Steps
                    </span>

                    <button
                      onClick={() => setSelectedRecipe(recipe)}
                      className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#c9a96e] hover:bg-[#dfc28d] text-[#09090b] text-xs uppercase tracking-[0.18em] font-semibold transition-all shadow-md group-hover:shadow-[#c9a96e]/20"
                    >
                      <BookText className="w-3.5 h-3.5" />
                      <span>View Master Recipe</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FULL INTERACTIVE RECIPE MODAL DRAWER */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-[#111019] border border-[#c9a96e]/40 max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative my-auto">
            {/* Modal Image Header */}
            <div className="relative w-full h-56 sm:h-72 bg-[#181724]">
              <Image
                src={selectedRecipe.image || '/images/gallery/creation-04.jpg'}
                alt={selectedRecipe.title}
                fill
                className="object-cover object-center filter brightness-[0.85]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111019] via-[#111019]/40 to-black/60" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedRecipe(null)}
                aria-label="Close recipe modal"
                className="absolute top-4 right-4 p-2 bg-black/70 hover:bg-[#c9a96e] text-white hover:text-black rounded-full transition-all border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title Header Overlay */}
              <div className="absolute bottom-5 left-5 right-5 sm:left-8 sm:right-8">
                <span className="text-[10px] sm:text-xs uppercase font-mono tracking-[0.25em] text-[#c9a96e] block mb-1">
                  {selectedRecipe.course} &bull; {selectedRecipe.category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#f4efe6] font-normal leading-tight">
                  {selectedRecipe.title}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Cooking Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#181724] border border-white/5 text-center">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#8c887e] block mb-1">Prep Time</span>
                  <span className="text-xs sm:text-sm text-[#f4efe6] font-medium">{selectedRecipe.prepTime}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#8c887e] block mb-1">Cook Time</span>
                  <span className="text-xs sm:text-sm text-[#f4efe6] font-medium">{selectedRecipe.cookTime}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#8c887e] block mb-1">Yield</span>
                  <span className="text-xs sm:text-sm text-[#f4efe6] font-medium">{selectedRecipe.servings}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#8c887e] block mb-1">Brigade Level</span>
                  <span className="text-xs sm:text-sm text-[#c9a96e] font-medium">{selectedRecipe.difficulty}</span>
                </div>
              </div>

              {/* Overview */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.25em] text-[#c9a96e] font-mono mb-2">
                  Gastronomic Architecture
                </h4>
                <p className="text-xs sm:text-sm text-[#ded8cd]/85 leading-relaxed font-light">
                  {selectedRecipe.description}
                </p>
              </div>

              {/* Categorized Ingredients */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.25em] text-[#c9a96e] font-mono mb-4 flex items-center space-x-2">
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Culinary Repertoire &amp; Ingredients</span>
                </h4>

                <div className="space-y-5">
                  {selectedRecipe.ingredients && selectedRecipe.ingredients.map((sec, sIdx) => (
                    <div key={sIdx} className="bg-[#181724] border border-white/5 p-4 sm:p-5">
                      <h5 className="font-serif text-sm text-[#f4efe6] font-normal mb-3 text-[#c9a96e]">
                        {sec.section}
                      </h5>
                      <ul className="space-y-2 text-xs text-[#ded8cd]/85 font-light">
                        {sec.items.map((item, iIdx) => (
                          <li key={iIdx} className="flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] mt-1.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.25em] text-[#c9a96e] font-mono mb-4 flex items-center space-x-2">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Precision Kitchen Execution Steps</span>
                </h4>

                <div className="space-y-4">
                  {selectedRecipe.instructions && selectedRecipe.instructions.map((step) => (
                    <div
                      key={step.step}
                      className="p-4 sm:p-5 bg-[#181724] border border-white/5 flex items-start space-x-4"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#c9a96e]/15 border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e] font-mono text-xs shrink-0">
                        0{step.step}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-serif text-sm sm:text-base text-[#f4efe6] mb-1">
                          {step.title}
                        </h5>
                        <p className="text-xs text-[#ded8cd]/80 leading-relaxed font-light">
                          {step.details}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Plating & Presentation Architecture */}
              {selectedRecipe.platingNotes && (
                <div className="p-5 bg-[#181724] border border-[#c9a96e]/30">
                  <h4 className="text-xs uppercase tracking-[0.25em] text-[#c9a96e] font-mono mb-2 flex items-center space-x-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Plating &amp; Architectural Balance</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[#ded8cd]/85 leading-relaxed font-light">
                    {selectedRecipe.platingNotes}
                  </p>
                </div>
              )}

              {/* Chef's Secret Technique */}
              {selectedRecipe.chefSecret && (
                <div className="p-5 bg-gradient-to-r from-amber-950/20 to-black/40 border border-amber-500/30">
                  <h4 className="text-xs uppercase tracking-[0.25em] text-amber-400 font-mono mb-2 flex items-center space-x-2">
                    <Award className="w-3.5 h-3.5" />
                    <span>Chef Bijaya&apos;s Pro Tip &amp; Secret</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[#ded8cd]/90 leading-relaxed font-light">
                    {selectedRecipe.chefSecret}
                  </p>
                </div>
              )}

              {/* Modal Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end">
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="px-6 py-2.5 bg-[#c9a96e] hover:bg-[#dfc28d] text-[#09090b] text-xs uppercase tracking-[0.2em] font-semibold transition-all"
                >
                  Close Recipe
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
