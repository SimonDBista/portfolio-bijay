import { NextRequest, NextResponse } from 'next/server';
import { getGalleryItems, addGalleryItem, GalleryItem } from '@/lib/db';
import { processAndSaveImage } from '@/lib/imageProcessor';
import { verifyToken } from '@/lib/auth';

// GET all gallery items
export async function GET() {
  try {
    const items = getGalleryItems();
    return NextResponse.json({ success: true, count: items.length, items });
  } catch (error: any) {
    console.error('Failed to get gallery:', error);
    return NextResponse.json({ error: 'Failed to load gallery items' }, { status: 500 });
  }
}

// POST upload new food photographs (multi-file supported)
export async function POST(request: NextRequest) {
  // Check auth
  const token =
    request.cookies.get('chef_admin_token')?.value ||
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized: Admin login required' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const titleInput = (formData.get('title') as string) || '';
    const categoryInput = (formData.get('category') as string) || 'Signature Creation';
    const isFeatured = formData.get('featured') === 'true';

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided for upload' }, { status: 400 });
    }

    const uploadedItems: GalleryItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file || typeof file === 'string' || file.size === 0) continue;

      const buffer = Buffer.from(await file.arrayBuffer());
      const processed = await processAndSaveImage(buffer, file.name, file.type);

      const title = files.length === 1 && titleInput.trim()
        ? titleInput.trim()
        : `Culinary Creation ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

      const newItem: GalleryItem = {
        id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        filename: processed.filename,
        url: processed.url,
        thumbnailUrl: processed.thumbnailUrl,
        title: title,
        category: categoryInput,
        featured: isFeatured || (i === 0 && uploadedItems.length === 0),
        width: processed.width,
        height: processed.height,
        aspectRatio: processed.aspectRatio,
        createdAt: new Date().toISOString(),
        order: 1, // Will be prioritized to top
      };

      addGalleryItem(newItem);
      uploadedItems.push(newItem);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully uploaded ${uploadedItems.length} photograph(s)`,
      items: uploadedItems,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message || 'Error processing uploaded images' }, { status: 500 });
  }
}
