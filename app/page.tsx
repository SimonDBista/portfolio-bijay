import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSlideshow from '@/components/HeroSlideshow';
import AboutSection from '@/components/AboutSection';
import AwardsSection from '@/components/AwardsSection';
import RecipesSection from '@/components/RecipesSection';
import CreationsGallery from '@/components/CreationsGallery';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import SpecialtiesSection from '@/components/SpecialtiesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { getGalleryItems, getChefProfile, getAwards, getRecipes, getEventFolders } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Always serve fresh dynamic content

export default function HomePage() {
  const initialGalleryItems = getGalleryItems();
  const chefProfile = getChefProfile();
  const initialAwards = getAwards();
  const initialRecipes = getRecipes();
  const initialFolders = getEventFolders();

  return (
    <main className="min-h-screen bg-[#09090b] text-[#f4efe6] selection:bg-[#c9a96e] selection:text-[#09090b]">
      {/* Sticky Luxury Navigation */}
      <Navbar />

      {/* Cinematic Fullscreen Hero with 11, 12, 13, 14 3-second Crossfade */}
      <HeroSlideshow />

      {/* Editorial Biography & Verified Qualifications (Fully Editable in Admin) */}
      <AboutSection profile={chefProfile} />

      {/* Honors, Accreditations & Distinction Awards (Top Section - Fully Editable in Admin) */}
      <AwardsSection initialAwards={initialAwards} />

      {/* Signature Master Recipes with Picture and Little Description (Top Section - Fully Editable in Admin) */}
      <RecipesSection initialRecipes={initialRecipes} />

      {/* Event Folders Gallery with Little Description Outside Each Folder (Top Section - Fully Editable in Admin) */}
      <CreationsGallery initialFolders={initialFolders} initialItems={initialGalleryItems} />

      {/* Career Timeline, Pedagogy & References (Fully Editable in Admin) */}
      <ExperienceTimeline profile={chefProfile} />

      {/* Culinary Repertoire & Disciplines */}
      <SpecialtiesSection />

      {/* Direct Contact & CV Download */}
      <ContactSection />

      {/* Signature Footer */}
      <Footer />
    </main>
  );
}
