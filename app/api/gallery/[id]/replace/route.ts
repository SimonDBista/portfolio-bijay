import { NextRequest, NextResponse } from 'next/server';
import { replaceGalleryImage } from '@/lib/db';
import { processAndSaveImage } from '@/lib/imageProcessor';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const token =
    request.cookies.get('chef_admin_token')?.value ||
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized: Admin login required' }, { status: 401 });
  }

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file || typeof file === 'string' || file.size === 0) {
      return NextResponse.json({ error: 'A replacement image file is required' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const processed = await processAndSaveImage(buffer, file.name, file.type);

    const updated = replaceGalleryImage(id, processed);
    if (!updated) {
      return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Photograph replaced and optimized successfully',
      item: updated,
    });
  } catch (error: any) {
    console.error('Image replace error:', error);
    return NextResponse.json({ error: error.message || 'Error processing replacement image' }, { status: 500 });
  }
}
