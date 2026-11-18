import { NextRequest, NextResponse } from 'next/server';
import { reorderGalleryItems } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function PUT(request: NextRequest) {
  const token =
    request.cookies.get('chef_admin_token')?.value ||
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized: Admin login required' }, { status: 401 });
  }

  try {
    const { orderedIds } = await request.json();
    if (!Array.isArray(orderedIds)) {
      return NextResponse.json({ error: 'orderedIds must be an array of IDs' }, { status: 400 });
    }

    const items = reorderGalleryItems(orderedIds);
    return NextResponse.json({
      success: true,
      message: 'Gallery order saved successfully',
      items,
    });
  } catch (error: any) {
    console.error('Reorder error:', error);
    return NextResponse.json({ error: 'Failed to reorder gallery' }, { status: 500 });
  }
}
