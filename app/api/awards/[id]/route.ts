import { NextRequest, NextResponse } from 'next/server';
import { updateAward, deleteAward } from '@/lib/db';
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
    return NextResponse.json({ error: 'Award ID is required' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const updated = updateAward(id, body);

    if (!updated) {
      return NextResponse.json({ error: 'Award not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Award updated successfully',
      award: updated,
    });
  } catch (error: any) {
    console.error('Update award error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update award' },
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
    return NextResponse.json({ error: 'Award ID is required' }, { status: 400 });
  }

  try {
    const updated = deleteAward(id);
    return NextResponse.json({
      success: true,
      message: 'Award deleted successfully',
      awards: updated,
    });
  } catch (error: any) {
    console.error('Delete award error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete award' },
      { status: 500 }
    );
  }
}
