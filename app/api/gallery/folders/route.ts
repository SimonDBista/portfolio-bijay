import { NextRequest, NextResponse } from 'next/server';
import { getEventFolders, addEventFolder } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const folders = getEventFolders();
    return NextResponse.json({ success: true, count: folders.length, folders });
  } catch (error: any) {
    console.error('Failed to get event folders:', error);
    return NextResponse.json({ error: 'Failed to load event folders' }, { status: 500 });
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
    const { name, description, coverImage, date, location } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Event folder name is required' }, { status: 400 });
    }

    const newFolder = {
      name: name.trim(),
      description: (description || '').trim(),
      coverImage: coverImage || '/images/gallery/creation-01.jpg',
      date: date ? date.trim() : new Date().getFullYear().toString(),
      location: location ? location.trim() : '',
      images: [],
    };

    const updated = addEventFolder(newFolder);
    return NextResponse.json({
      success: true,
      message: 'Event folder created successfully',
      folders: updated,
    });
  } catch (error: any) {
    console.error('Create event folder error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create event folder' },
      { status: 500 }
    );
  }
}
