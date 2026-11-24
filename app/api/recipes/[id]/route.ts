import { NextRequest, NextResponse } from 'next/server';
import { updateRecipe, deleteRecipe, getRecipes } from '@/lib/db';
import { processAndSaveImage } from '@/lib/imageProcessor';
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
    return NextResponse.json({ error: 'Recipe ID is required' }, { status: 400 });
  }

  try {
    const contentType = request.headers.get('content-type') || '';
    let updates: Record<string, any> = {};

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const title = formData.get('title') as string;
      const description = formData.get('description') as string;
      const existingImage = formData.get('image') as string;
      const file = formData.get('file') as File | null;

      if (title !== null) updates.title = title.trim();
      if (description !== null) updates.description = description.trim();
      if (file && typeof file !== 'string' && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const processed = await processAndSaveImage(buffer, file.name, file.type);
        updates.image = processed.url;
      } else if (existingImage) {
        updates.image = existingImage;
      }
    } else {
      updates = await request.json();
    }

    const updated = updateRecipe(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Recipe updated successfully',
      recipe: updated,
      recipes: getRecipes(),
    });
  } catch (error: any) {
    console.error('Update recipe error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update recipe' },
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
    return NextResponse.json({ error: 'Recipe ID is required' }, { status: 400 });
  }

  try {
    const updated = deleteRecipe(id);
    return NextResponse.json({
      success: true,
      message: 'Recipe deleted successfully',
      recipes: updated,
    });
  } catch (error: any) {
    console.error('Delete recipe error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete recipe' },
      { status: 500 }
    );
  }
}
