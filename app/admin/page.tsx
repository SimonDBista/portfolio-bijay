import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { getGalleryItems, getChefProfile } from '@/lib/db';
import GalleryManager from '@/components/admin/GalleryManager';

export const dynamic = 'force-dynamic';

export default function AdminDashboardPage() {
  const session = getAdminSession();

  if (!session) {
    redirect('/admin/login');
  }

  const initialItems = getGalleryItems();
  const initialProfile = getChefProfile();

  return (
    <div className="min-h-screen bg-[#070709] text-[#f4efe6]">
      <GalleryManager
        user={session}
        initialItems={initialItems}
        initialProfile={initialProfile}
      />
    </div>
  );
}
