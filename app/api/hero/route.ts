import { NextRequest, NextResponse } from 'next/server';
import { getHeroSlides, addHeroSlide } from '@/lib/db';
import { processAndSaveImage } from '@/lib/imageProcessor';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const slides = getHeroSlides();
    return NextResponse.json({ success: true, count: slides.length, slides }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to get hero slides' }, { status: 500 });
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
    let src = '/images/hero/hero-1.jpg';
    let alt = 'Chef Bijaya Ghimire Showcase';
    let subcaption = 'Precision & Culinary Artistry';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      subcaption = (formData.get('subcaption') as string) || subcaption;
      alt = (formData.get('alt') as string) || alt;
      const file = formData.get('file') as File | null;
      const existingSrc = formData.get('src') as string | null;

      if (file && typeof file !== 'string' && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const processed = await processAndSaveImage(buffer, file.name, file.type);
        src = processed.url;
      } else if (existingSrc) {
        src = existingSrc;
      }
    } else {
      const body = await request.json();
      if (body.src) src = body.src;
      if (body.alt) alt = body.alt;
      if (body.subcaption) subcaption = body.subcaption;
    }

    const newSlide = addHeroSlide({
      src,
      alt,
      subcaption,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Home hero picture added and compressed successfully',
        slide: newSlide,
        slides: getHeroSlides(),
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error adding hero slide:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to add hero slide' },
      { status: 500 }
    );
  }
}
