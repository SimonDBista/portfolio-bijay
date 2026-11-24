import { NextRequest, NextResponse } from 'next/server';
import { updateEventFolder, deleteEventFolder, getEventFolders } from '@/lib/db';
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

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'Folder ID is required' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const updated = updateEventFolder(id, body);

    if (!updated) {
      return NextResponse.json({ error: 'Event folder not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Event folder updated successfully',
      folder: updated,
      folders: getEventFolders(),
    });
  } catch (error: any) {
    console.error('Update event folder error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update event folder' },
      { status: 500 }
    );
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

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'Folder ID is required' }, { status: 400 });
  }

  try {
    const updated = deleteEventFolder(id);
    return NextResponse.json({
      success: true,
      message: 'Event folder deleted successfully',
      folders: updated,
    });
  } catch (error: any) {
    console.error('Delete event folder error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete event folder' },
      { status: 500 }
    );
  }
}
