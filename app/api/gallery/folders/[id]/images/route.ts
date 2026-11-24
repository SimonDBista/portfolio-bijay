import { NextRequest, NextResponse } from 'next/server';
import { addImagesToEventFolder, deleteImageFromEventFolder, getEventFolders, GalleryItem } from '@/lib/db';
import { processAndSaveImage } from '@/lib/imageProcessor';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// Upload photos to a specific event folder with Sharp WebP auto-compression
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const token =
    request.cookies.get('chef_admin_token')?.value ||
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized: Admin login required' }, { status: 401 });
  }

  const { id: folderId } = params;
  if (!folderId) {
    return NextResponse.json({ error: 'Folder ID is required' }, { status: 400 });
  }

  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const titleInput = (formData.get('title') as string) || '';
    const categoryInput = (formData.get('category') as string) || 'Event Photograph';

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No image files provided for upload' }, { status: 400 });
    }

    const uploadedItems: GalleryItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file || typeof file === 'string' || file.size === 0) continue;

      const buffer = Buffer.from(await file.arrayBuffer());
      // Compress with Sharp: WebP, Lanczos3, Quality 82, Auto-orient
      const processed = await processAndSaveImage(buffer, file.name, file.type);

      const title = files.length === 1 && titleInput.trim()
        ? titleInput.trim()
        : `Photograph ${Date.now().toString(36).slice(-4)}`;

      const newItem: GalleryItem = {
        id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        filename: processed.filename,
        url: processed.url,
        thumbnailUrl: processed.thumbnailUrl,
        title: title,
        category: categoryInput,
        featured: i === 0,
        width: processed.width,
        height: processed.height,
        aspectRatio: processed.aspectRatio,
        createdAt: new Date().toISOString(),
        order: i + 1,
      };

      uploadedItems.push(newItem);
    }

    const updatedFolder = addImagesToEventFolder(folderId, uploadedItems);
    if (!updatedFolder) {
      return NextResponse.json({ error: 'Event folder not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully uploaded and compressed ${uploadedItems.length} photograph(s)`,
      folder: updatedFolder,
      folders: getEventFolders(),
    });
  } catch (error: any) {
    console.error('Upload to folder error:', error);
    return NextResponse.json(
      { error: error.message || 'Error processing uploaded images' },
      { status: 500 }
    );
  }
}

// Delete an image from a folder
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

  const { id: folderId } = params;
  const searchParams = new URL(request.url).searchParams;
  const imageId = searchParams.get('imageId');

  if (!folderId || !imageId) {
    return NextResponse.json({ error: 'Folder ID and Image ID are required' }, { status: 400 });
  }

  try {
    const updated = deleteImageFromEventFolder(folderId, imageId);
    if (!updated) {
      return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Photograph removed from event folder',
      folder: updated,
      folders: getEventFolders(),
    });
  } catch (error: any) {
    console.error('Delete image from folder error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to remove image' },
      { status: 500 }
    );
  }
}
