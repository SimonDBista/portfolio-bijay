import { NextRequest, NextResponse } from 'next/server';
import { addExperience, updateExperience, deleteExperience } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

function checkAuth(request: NextRequest) {
  const token =
    request.cookies.get('chef_admin_token')?.value ||
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  return token && verifyToken(token);
}

// POST: Add new experience
export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { company, role, period, location, shift, highlights } = body;

    if (!company || !role || !period) {
      return NextResponse.json({ error: 'Company, role, and period are required' }, { status: 400 });
    }

    const updated = addExperience({
      company,
      role,
      period,
      location: location || 'Nepal',
      shift: shift || '',
      highlights: Array.isArray(highlights) ? highlights : [highlights].filter(Boolean),
    });

    return NextResponse.json({
      success: true,
      message: 'Experience added successfully',
      experiences: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to add experience' }, { status: 500 });
  }
}

// PUT: Update existing experience
export async function PUT(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Experience ID is required' }, { status: 400 });
    }

    const updated = updateExperience(id, updates);
    return NextResponse.json({
      success: true,
      message: 'Experience updated successfully',
      experiences: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 });
  }
}

// DELETE: Delete experience
export async function DELETE(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Experience ID is required' }, { status: 400 });
    }

    const updated = deleteExperience(id);
    return NextResponse.json({
      success: true,
      message: 'Experience deleted successfully',
      experiences: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 });
  }
}
