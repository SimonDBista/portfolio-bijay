import { NextRequest, NextResponse } from 'next/server';
import { addEducation, updateEducation, deleteEducation } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

function checkAuth(request: NextRequest) {
  const token =
    request.cookies.get('chef_admin_token')?.value ||
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  return token && verifyToken(token);
}

// POST: Add new certificate / education
export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, institution, year, grade, description } = body;

    if (!title || !institution || !year) {
      return NextResponse.json({ error: 'Title, institution, and year are required' }, { status: 400 });
    }

    const updated = addEducation({
      title,
      institution,
      year,
      grade: grade || '',
      description: description || '',
    });

    return NextResponse.json({
      success: true,
      message: 'Certificate/Education added successfully',
      education: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to add certificate' }, { status: 500 });
  }
}

// PUT: Update existing certificate / education
export async function PUT(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Certificate ID is required' }, { status: 400 });
    }

    const updated = updateEducation(id, updates);
    return NextResponse.json({
      success: true,
      message: 'Certificate updated successfully',
      education: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update certificate' }, { status: 500 });
  }
}

// DELETE: Delete certificate / education
export async function DELETE(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Certificate ID is required' }, { status: 400 });
    }

    const updated = deleteEducation(id);
    return NextResponse.json({
      success: true,
      message: 'Certificate deleted successfully',
      education: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete certificate' }, { status: 500 });
  }
}
