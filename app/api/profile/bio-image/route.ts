import { NextRequest, NextResponse } from 'next/server';
import { getChefProfile, updateBioImage } from '@/lib/db';
import { processAndSaveImage } from '@/lib/imageProcessor';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const token =
    request.cookies.get('chef_admin_token')?.value ||
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file || typeof file === 'string' || file.size === 0) {
      return NextResponse.json({ error: 'No portrait photo provided.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const processed = await processAndSaveImage(buffer, file.name, file.type);
    const updated = updateBioImage(processed.url);

    return NextResponse.json({
      success: true,
      message: 'Portrait photo uploaded and optimized to WebP successfully.',
      bioImage: processed.url,
      profile: updated,
    });
  } catch (error: any) {
    console.error('Portrait upload error:', error);
    return NextResponse.json({ error: error.message || 'Failed to upload portrait photo.' }, { status: 500 });
  }
}
