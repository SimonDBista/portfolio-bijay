import { NextRequest, NextResponse } from 'next/server';
import { getAwards, addAward, AwardItem } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const awards = getAwards();
    return NextResponse.json({ success: true, count: awards.length, awards });
  } catch (error: any) {
    console.error('Failed to get awards:', error);
    return NextResponse.json({ error: 'Failed to load awards' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const token =
    request.cookies.get('chef_admin_token')?.value ||
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized: Admin login required' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, category, organization, year, level, icon, description, highlights } = body;

    if (!title || !organization || !year) {
      return NextResponse.json(
        { error: 'Title, Organization, and Year are required fields' },
        { status: 400 }
      );
    }

    const newAward = {
      title: title.trim(),
      category: category ? category.trim() : 'Honors & Certification',
      organization: organization.trim(),
      year: year.trim(),
      level: level ? level.trim() : 'Executive Level',
      icon: (icon as AwardItem['icon']) || 'award',
      description: description ? description.trim() : '',
      highlights: Array.isArray(highlights)
        ? highlights.filter(Boolean)
        : typeof highlights === 'string'
        ? highlights.split('\n').map((s: string) => s.trim()).filter(Boolean)
        : [],
    };

    const updated = addAward(newAward);
    return NextResponse.json({
      success: true,
      message: 'Award added successfully',
      awards: updated,
    });
  } catch (error: any) {
    console.error('Add award error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to add award' },
      { status: 500 }
    );
  }
}
