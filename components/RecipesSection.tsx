'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { RecipeItem } from '@/lib/db';
import { ChefHat, Sparkles } from 'lucide-react';

interface RecipesSectionProps {
  initialRecipes?: RecipeItem[];
}

export default function RecipesSection({ initialRecipes = [] }: RecipesSectionProps) {
  const [recipes, setRecipes] = useState<RecipeItem[]>(initialRecipes);

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

  return (
    <section id="recipes" className="py-20 sm:py-28 md:py-36 bg-gradient-to-b from-[#0b0b10] via-[#100f17] to-[#0b0b10] relative overflow-hidden border-y border-[#c9a96e]/15">
      {/* Decorative Warm Atelier Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#c9a96e]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-18 md:mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 border border-[#c9a96e]/40 bg-[#161520]/80 rounded-full mb-4 shadow-inner">
            <ChefHat className="w-3.5 h-3.5 text-[#c9a96e]" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#e8dfcf] font-medium">
              Curated Recipes &bull; Culinary Notes
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#f4efe6]">
            Signature Master Recipes
          </h2>
          <div className="w-16 h-[1.5px] bg-[#c9a96e] mt-4 sm:mt-5 mb-4 sm:mb-5" />
          <p className="max-w-2xl text-xs sm:text-sm md:text-base text-[#ded8cd]/80 leading-relaxed font-light">
            Signature culinary dishes curated by Chef Bijaya, highlighting pure ingredients, delicate seasoning, and expressive plating technique.
          </p>
        </div>

        {/* Clean Recipe Cards Grid: Picture + Title + Little Description */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="group bg-[#13121b] border border-[#c9a96e]/20 hover:border-[#c9a96e]/60 transition-all duration-500 shadow-xl flex flex-col overflow-hidden hover:-translate-y-1"
            >
              {/* Recipe Picture */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#181724]">
                <Image
                  src={recipe.image || '/images/gallery/creation-04.jpg'}
                  alt={recipe.title}
                  fill
                  className="object-cover object-center filter brightness-[0.92] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#13121b] via-transparent to-transparent opacity-60" />
              </div>

              {/* Recipe Info: Title + Little Description */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-base sm:text-lg text-[#f4efe6] font-normal leading-snug group-hover:text-[#c9a96e] transition-colors mb-2.5">
                    {recipe.title}
                  </h3>
                  <p className="text-xs text-[#ded8cd]/75 leading-relaxed font-light">
                    {recipe.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10.5px] uppercase tracking-widest text-[#c9a96e] font-mono">
                  <span>Chef Bijaya Recipe</span>
                  <Sparkles className="w-3 h-3 text-[#c9a96e]/70" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
