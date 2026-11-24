import { NextRequest, NextResponse } from 'next/server';
import { getHeroSlides, updateHeroSlide, deleteHeroSlide } from '@/lib/db';
import { processAndSaveImage } from '@/lib/imageProcessor';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const token =
    request.cookies.get('chef_admin_token')?.value ||
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized: Admin login required' }, { status: 401 });
  }

  try {
    const { id } = params;
    const contentType = request.headers.get('content-type') || '';
    const updates: Record<string, any> = {};

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const subcaption = formData.get('subcaption') as string;
      const alt = formData.get('alt') as string;
      const file = formData.get('file') as File | null;
      const existingSrc = formData.get('src') as string | null;

      if (subcaption !== null) updates.subcaption = subcaption;
      if (alt !== null) updates.alt = alt;

      if (file && typeof file !== 'string' && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const processed = await processAndSaveImage(buffer, file.name, file.type);
        updates.src = processed.url;
      } else if (existingSrc) {
        updates.src = existingSrc;
      }
    } else {
      const body = await request.json();
      if (body.subcaption !== undefined) updates.subcaption = body.subcaption;
      if (body.alt !== undefined) updates.alt = body.alt;
      if (body.src !== undefined) updates.src = body.src;
    }

    const updated = updateHeroSlide(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Hero slide not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Home picture updated and optimized successfully',
      slide: updated,
      slides: getHeroSlides(),
    });
  } catch (error: any) {
    console.error('Update hero slide error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update hero slide' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const token =
    request.cookies.get('chef_admin_token')?.value ||
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized: Admin login required' }, { status: 401 });
  }

  try {
    const { id } = params;
    const updatedSlides = deleteHeroSlide(id);

    return NextResponse.json({
      success: true,
      message: 'Home picture deleted successfully',
      slides: updatedSlides,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete hero slide' }, { status: 500 });
  }
}
