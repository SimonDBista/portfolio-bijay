import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { getGalleryItems, getChefProfile, getAwards, getRecipes, getEventFolders, getInquiries, getHeroSlides } from '@/lib/db';
import GalleryManager from '@/components/admin/GalleryManager';

export const dynamic = 'force-dynamic';

export default function AdminDashboardPage() {
  const session = getAdminSession();

  if (!session) {
    redirect('/admin/login');
  }

  const initialItems = getGalleryItems();
  const initialProfile = getChefProfile();
  const initialAwards = getAwards();
  const initialRecipes = getRecipes();
  const initialFolders = getEventFolders();
  const initialInquiries = getInquiries();
  const initialHeroSlides = getHeroSlides();

  return (
    <div className="min-h-screen bg-[#070709] text-[#f4efe6]">
      <GalleryManager
        user={session}
        initialItems={initialItems}
        initialProfile={initialProfile}
        initialAwards={initialAwards}
        initialRecipes={initialRecipes}
        initialFolders={initialFolders}
        initialInquiries={initialInquiries}
        initialHeroSlides={initialHeroSlides}
      />
    </div>
  );
}
