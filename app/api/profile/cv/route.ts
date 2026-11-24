import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getChefProfile, updateContactSection } from '@/lib/db';
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
      return NextResponse.json({ error: 'No CV document provided.' }, { status: 400 });
    }

    const docsDir = path.join(process.cwd(), 'public', 'docs');
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = 'Bijaya_Ghimire_Executive_Chef_CV.pdf';
    const filePath = path.join(docsDir, fileName);

    fs.writeFileSync(filePath, buffer);

    const cvUrl = `/docs/${fileName}?v=${Date.now()}`;
    const updated = updateContactSection({ cvUrl });

    return NextResponse.json({
      success: true,
      message: 'Curriculum Vitae (CV) uploaded and updated successfully.',
      cvUrl,
      profile: updated,
    });
  } catch (error: any) {
    console.error('CV upload error:', error);
    return NextResponse.json({ error: error.message || 'Failed to upload CV document.' }, { status: 500 });
  }
}
