import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'crypto';

export interface ProcessedImageResult {
  filename: string;
  thumbnailFilename: string;
  url: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  aspectRatio: number;
  format: string;
  sizeBytes: number;
}

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]);

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB max input size

export async function processAndSaveImage(
  buffer: Buffer,
  originalName: string,
  mimeType: string
): Promise<ProcessedImageResult> {
  if (!ALLOWED_MIME_TYPES.has(mimeType.toLowerCase())) {
    throw new Error(`Unsupported image format: ${mimeType}. Please upload JPG, PNG, or WebP.`);
  }

  if (buffer.length > MAX_FILE_SIZE) {
    throw new Error(`Image size exceeds 25MB limit.`);
  }

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const id = Math.random().toString(36).substring(2, 9) + '-' + Date.now().toString(36);
  const baseFilename = `chef-creation-${id}`;
  const mainFilename = `${baseFilename}.webp`;
  const thumbFilename = `${baseFilename}-thumb.webp`;

  const mainFilePath = path.join(uploadsDir, mainFilename);
  const thumbFilePath = path.join(uploadsDir, thumbFilename);

  // Read metadata
  const metadata = await sharp(buffer).metadata();
  const origWidth = metadata.width || 1200;
  const origHeight = metadata.height || 900;

  // 1. Process Main Image: Resize if oversized (max 1920px), convert to WebP, quality 86
  const mainBuffer = await sharp(buffer)
    .rotate() // auto-orient based on EXIF
    .resize({
      width: 1920,
      height: 1920,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: 86, effort: 4 })
    .toBuffer();

  fs.writeFileSync(mainFilePath, mainBuffer);

  // 2. Process Thumbnail Image: Resize for responsive masonry cards (max 700px), quality 80
  const thumbBuffer = await sharp(buffer)
    .rotate()
    .resize({
      width: 700,
      height: 700,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: 80, effort: 3 })
    .toBuffer();

  fs.writeFileSync(thumbFilePath, thumbBuffer);

  // Read processed dimensions
  const processedMeta = await sharp(mainBuffer).metadata();
  const width = processedMeta.width || origWidth;
  const height = processedMeta.height || origHeight;
  const aspectRatio = Number((width / height).toFixed(2));

  return {
    filename: mainFilename,
    thumbnailFilename: thumbFilename,
    url: `/uploads/${mainFilename}`,
    thumbnailUrl: `/uploads/${thumbFilename}`,
    width,
    height,
    aspectRatio,
    format: 'webp',
    sizeBytes: mainBuffer.length,
  };
}
