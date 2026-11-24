import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

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

const MAX_FILE_SIZE = 35 * 1024 * 1024; // 35MB max raw input size

/**
 * Compresses, auto-orients, resizes, and converts any uploaded image buffer
 * to highly-optimized, progressive WebP format with an ultra-lightweight thumbnail.
 */
export async function processAndSaveImage(
  buffer: Buffer,
  originalName: string,
  mimeType: string
): Promise<ProcessedImageResult> {
  if (!ALLOWED_MIME_TYPES.has(mimeType.toLowerCase())) {
    throw new Error(`Unsupported image format: ${mimeType}. Please upload JPG, PNG, or WebP.`);
  }

  if (buffer.length > MAX_FILE_SIZE) {
    throw new Error(`Image size exceeds 35MB limit.`);
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

  // Read original metadata
  const metadata = await sharp(buffer).metadata();
  const origWidth = metadata.width || 1200;
  const origHeight = metadata.height || 900;

  // 1. Process Main Image:
  // - Auto-orient based on EXIF
  // - Resize inside 1920x1920 with high-quality lanczos3 resampling
  // - Convert to modern compressed WebP with quality 82, effort 5, smartSubsample for crisp culinary detail
  const mainBuffer = await sharp(buffer)
    .rotate()
    .resize({
      width: 1920,
      height: 1920,
      fit: 'inside',
      withoutEnlargement: true,
      kernel: 'lanczos3',
    })
    .webp({
      quality: 82,
      effort: 5,
      smartSubsample: true,
      reductionEffort: 5,
    })
    .toBuffer();

  fs.writeFileSync(mainFilePath, mainBuffer);

  // 2. Process Thumbnail Image:
  // - Resize to max 600px width/height for responsive gallery grid loading
  // - Compressed WebP quality 75, effort 4
  const thumbBuffer = await sharp(buffer)
    .rotate()
    .resize({
      width: 600,
      height: 600,
      fit: 'inside',
      withoutEnlargement: true,
      kernel: 'lanczos3',
    })
    .webp({
      quality: 75,
      effort: 4,
    })
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

/**
 * General helper to compress and optimize any image buffer into WebP with custom maximum dimension and quality.
 */
export async function compressImageBuffer(
  buffer: Buffer,
  maxDimension: number = 1600,
  quality: number = 82
): Promise<Buffer> {
  return await sharp(buffer)
    .rotate()
    .resize({
      width: maxDimension,
      height: maxDimension,
      fit: 'inside',
      withoutEnlargement: true,
      kernel: 'lanczos3',
    })
    .webp({
      quality,
      effort: 5,
      smartSubsample: true,
    })
    .toBuffer();
}
