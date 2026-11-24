import { NextRequest, NextResponse } from 'next/server';
import { getRecipes, addRecipe, RecipeItem } from '@/lib/db';
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
    const body = await request.json();
    const {
      title,
      category,
      course,
      image,
      prepTime,
      cookTime,
      servings,
      difficulty,
      description,
      ingredients,
      instructions,
      platingNotes,
      chefSecret,
    } = body;

    if (!title) {
      return NextResponse.json({ error: 'Recipe title is required' }, { status: 400 });
    }

    const newRecipe = {
      title: title.trim(),
      category: category || 'Fine Dining',
      course: course || 'Signature Entrée',
      image: image || '/images/gallery/creation-04.jpg',
      prepTime: prepTime || '20 mins',
      cookTime: cookTime || '25 mins',
      servings: servings || '2 Servings',
      difficulty: difficulty || 'Master',
      description: description || '',
      ingredients: Array.isArray(ingredients) ? ingredients : [],
      instructions: Array.isArray(instructions) ? instructions : [],
      platingNotes: platingNotes || '',
      chefSecret: chefSecret || '',
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
