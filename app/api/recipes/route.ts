import { NextRequest, NextResponse } from 'next/server';
import { getRecipes, addRecipe, RecipeItem } from '@/lib/db';
import { processAndSaveImage } from '@/lib/imageProcessor';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const recipes = getRecipes();
    return NextResponse.json({ success: true, count: recipes.length, recipes });
  } catch (error: any) {
    console.error('Failed to get recipes:', error);
    return NextResponse.json({ error: 'Failed to load recipes' }, { status: 500 });
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
    const contentType = request.headers.get('content-type') || '';
    let title = '';
    let description = '';
    let imageUrl = '/images/gallery/creation-04.jpg';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      title = (formData.get('title') as string) || '';
      description = (formData.get('description') as string) || '';
      const existingImage = formData.get('image') as string;
      const file = formData.get('file') as File | null;

      if (file && typeof file !== 'string' && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const processed = await processAndSaveImage(buffer, file.name, file.type);
        imageUrl = processed.url;
      } else if (existingImage) {
        imageUrl = existingImage;
      }
    } else {
      const body = await request.json();
      title = body.title || '';
      description = body.description || '';
      if (body.image) imageUrl = body.image;
    }

    if (!title.trim()) {
      return NextResponse.json({ error: 'Recipe title is required' }, { status: 400 });
    }

    const newRecipe: Omit<RecipeItem, 'id'> = {
      title: title.trim(),
      image: imageUrl,
      description: description.trim(),
    };

    const updated = addRecipe(newRecipe);
    return NextResponse.json({
      success: true,
      message: 'Recipe added successfully',
      recipes: updated,
    });
  } catch (error: any) {
    console.error('Add recipe error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to add recipe' },
      { status: 500 }
    );
  }
}
