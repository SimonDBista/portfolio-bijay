import { NextRequest, NextResponse } from 'next/server';
import { getChefProfile, updateContactSection } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function PUT(request: NextRequest) {
  const token =
    request.cookies.get('chef_admin_token')?.value ||
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { email, phones, location, cvUrl } = body;

    const updated = updateContactSection({
      email,
      phones,
      location,
      cvUrl,
    });

    return NextResponse.json({
      success: true,
      message: 'Direct Contact and CV details updated successfully',
      profile: updated,
    });
  } catch (error: any) {
    console.error('Update contact error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update contact info' }, { status: 500 });
  }
}
