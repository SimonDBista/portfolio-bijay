import fs from 'fs';
import path from 'path';
import { ChefProfile, WorkExperience, EducationCert, chefData as fallbackChefData } from '@/data/chefData';

export interface GalleryItem {
  id: string;
  filename: string;
  url: string;
  thumbnailUrl?: string;
  title: string;
  category: string;
  featured: boolean;
  width: number;
  height: number;
  aspectRatio: number;
  createdAt: string;
  order: number;
}

const DATA_FILE = path.join(process.cwd(), 'data', 'gallery.json');
const PROFILE_FILE = path.join(process.cwd(), 'data', 'chefProfile.json');
const AWARDS_FILE = path.join(process.cwd(), 'data', 'awards.json');
const RECIPES_FILE = path.join(process.cwd(), 'data', 'recipes.json');
const FOLDERS_FILE = path.join(process.cwd(), 'data', 'galleryFolders.json');

export interface AwardItem {
  id: string;
  title: string;
  category: string;
  organization: string;
  year: string;
  level: string;
  icon: 'trophy' | 'shield' | 'award' | 'grad' | 'star';
  description: string;
  highlights: string[];
  order?: number;
}

export interface RecipeItem {
  id: string;
  title: string;
  image: string;
  description: string;
  category?: string;
  order?: number;
}

export interface EventFolder {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  date?: string;
  location?: string;
  images: GalleryItem[];
  order?: number;
}

function ensureDataFile(): void {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
  }
}

function ensureAwardsFile(): void {
  const dir = path.dirname(AWARDS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(AWARDS_FILE)) {
    fs.writeFileSync(AWARDS_FILE, '[]', 'utf-8');
  }
}

function ensureRecipesFile(): void {
  const dir = path.dirname(RECIPES_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(RECIPES_FILE)) {
    fs.writeFileSync(RECIPES_FILE, '[]', 'utf-8');
  }
}

function ensureFoldersFile(): void {
  const dir = path.dirname(FOLDERS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(FOLDERS_FILE)) {
    fs.writeFileSync(FOLDERS_FILE, '[]', 'utf-8');
  }
}

function ensureProfileFile(): void {
  const dir = path.dirname(PROFILE_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(PROFILE_FILE)) {
    fs.writeFileSync(PROFILE_FILE, JSON.stringify(fallbackChefData, null, 2), 'utf-8');
  }
}

// ---------------- GALLERY OPERATIONS ---------------- //

export function getGalleryItems(): GalleryItem[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const items: GalleryItem[] = JSON.parse(raw);
    return items.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error reading gallery items:', error);
    return [];
  }
}

export function saveGalleryItems(items: GalleryItem[]): boolean {
  ensureDataFile();
  try {
    const tempFile = `${DATA_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(items, null, 2), 'utf-8');
    fs.renameSync(tempFile, DATA_FILE);
    return true;
  } catch (error) {
    console.error('Error saving gallery items:', error);
    return false;
  }
}

export function addGalleryItem(item: GalleryItem): GalleryItem[] {
  const current = getGalleryItems();
  const nextOrder = current.length > 0 ? Math.max(...current.map(i => i.order)) + 1 : 1;
  const newItem = { ...item, order: nextOrder };
  const updated = [newItem, ...current].map((it, idx) => ({ ...it, order: idx + 1 }));
  saveGalleryItems(updated);
  return updated;
}

export function updateGalleryItem(id: string, updates: Partial<GalleryItem>): GalleryItem | null {
  const current = getGalleryItems();
  const index = current.findIndex(i => i.id === id);
  if (index === -1) return null;
  
  current[index] = { ...current[index], ...updates };
  saveGalleryItems(current);
  return current[index];
}

export function replaceGalleryImage(
  id: string,
  newImage: {
    filename: string;
    thumbnailFilename: string;
    url: string;
    thumbnailUrl: string;
    width: number;
    height: number;
    aspectRatio: number;
  }
): GalleryItem | null {
  const current = getGalleryItems();
  const index = current.findIndex(i => i.id === id);
  if (index === -1) return null;

  const oldItem = current[index];

  // Try to remove old image file if in uploads
  try {
    if (oldItem.filename && oldItem.url.startsWith('/uploads/')) {
      const oldFilePath = path.join(process.cwd(), 'public', 'uploads', oldItem.filename);
      if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
      if (oldItem.thumbnailUrl && oldItem.thumbnailUrl.startsWith('/uploads/')) {
        const oldThumb = path.join(process.cwd(), 'public', 'uploads', path.basename(oldItem.thumbnailUrl));
        if (fs.existsSync(oldThumb)) fs.unlinkSync(oldThumb);
      }
    }
  } catch (err) {
    console.warn('Could not cleanup replaced image:', err);
  }

  current[index] = {
    ...oldItem,
    filename: newImage.filename,
    url: newImage.url,
    thumbnailUrl: newImage.thumbnailUrl,
    width: newImage.width,
    height: newImage.height,
    aspectRatio: newImage.aspectRatio,
  };

  saveGalleryItems(current);
  return current[index];
}

export function deleteGalleryItem(id: string): { success: boolean; deletedFilename?: string } {
  const current = getGalleryItems();
  const item = current.find(i => i.id === id);
  if (!item) return { success: false };

  const updated = current.filter(i => i.id !== id).map((it, idx) => ({ ...it, order: idx + 1 }));
  saveGalleryItems(updated);

  try {
    if (item.filename && item.url.startsWith('/uploads/')) {
      const filePath = path.join(process.cwd(), 'public', 'uploads', item.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      if (item.thumbnailUrl && item.thumbnailUrl.startsWith('/uploads/')) {
        const thumbFile = path.basename(item.thumbnailUrl);
        const thumbPath = path.join(process.cwd(), 'public', 'uploads', thumbFile);
        if (fs.existsSync(thumbPath)) {
          fs.unlinkSync(thumbPath);
        }
      }
    }
  } catch (err) {
    console.warn('Could not remove file from disk:', err);
  }

  return { success: true, deletedFilename: item.filename };
}

export function reorderGalleryItems(orderedIds: string[]): GalleryItem[] {
  const current = getGalleryItems();
  const map = new Map(current.map(i => [i.id, i]));
  
  const reordered: GalleryItem[] = [];
  orderedIds.forEach((id, index) => {
    const item = map.get(id);
    if (item) {
      reordered.push({ ...item, order: index + 1 });
      map.delete(id);
    }
  });

  map.forEach((item) => {
    reordered.push({ ...item, order: reordered.length + 1 });
  });

  saveGalleryItems(reordered);
  return reordered;
}

// ---------------- PROFILE & ABOUT SECTION OPERATIONS ---------------- //

export function getChefProfile(): ChefProfile {
  ensureProfileFile();
  try {
    const raw = fs.readFileSync(PROFILE_FILE, 'utf-8');
    const profile: ChefProfile = JSON.parse(raw);
    return profile;
  } catch (error) {
    console.error('Error reading chef profile, falling back:', error);
    return fallbackChefData;
  }
}

export function saveChefProfile(profile: ChefProfile): boolean {
  ensureProfileFile();
  try {
    const tempFile = `${PROFILE_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(profile, null, 2), 'utf-8');
    fs.renameSync(tempFile, PROFILE_FILE);
    return true;
  } catch (error) {
    console.error('Error saving chef profile:', error);
    return false;
  }
}

export function updateAboutSection(updates: {
  aboutTitle?: string;
  aboutSubtitle?: string;
  editorialQuote?: string;
  bioSummary?: string;
  fullPhilosophy?: string[];
  stats?: { label: string; value: string; subtext: string }[];
}): ChefProfile {
  const profile = getChefProfile();

  if (updates.aboutTitle !== undefined) profile.aboutTitle = updates.aboutTitle;
  if (updates.aboutSubtitle !== undefined) profile.aboutSubtitle = updates.aboutSubtitle;
  if (updates.editorialQuote !== undefined) profile.editorialQuote = updates.editorialQuote;
  if (updates.bioSummary !== undefined) profile.bioSummary = updates.bioSummary;
  if (updates.fullPhilosophy !== undefined) profile.fullPhilosophy = updates.fullPhilosophy;
  if (updates.stats !== undefined) profile.stats = updates.stats;

  saveChefProfile(profile);
  return profile;
}

// ---------------- EXPERIENCE OPERATIONS ---------------- //

export function addExperience(exp: Omit<WorkExperience, 'id'> & { id?: string }): WorkExperience[] {
  const profile = getChefProfile();
  const id = exp.id || `exp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const newExp: WorkExperience = { ...exp, id };

  // Add to top of experiences list
  profile.experiences = [newExp, ...profile.experiences];
  saveChefProfile(profile);
  return profile.experiences;
}

export function updateExperience(id: string, updates: Partial<WorkExperience>): WorkExperience[] {
  const profile = getChefProfile();
  const index = profile.experiences.findIndex(e => e.id === id);
  if (index !== -1) {
    profile.experiences[index] = { ...profile.experiences[index], ...updates };
    saveChefProfile(profile);
  }
  return profile.experiences;
}

export function deleteExperience(id: string): WorkExperience[] {
  const profile = getChefProfile();
  profile.experiences = profile.experiences.filter(e => e.id !== id);
  saveChefProfile(profile);
  return profile.experiences;
}

// ---------------- EDUCATION & CERTIFICATION OPERATIONS ---------------- //

export function addEducation(edu: Omit<EducationCert, 'id'> & { id?: string }): EducationCert[] {
  const profile = getChefProfile();
  const id = edu.id || `edu-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const newEdu: EducationCert = { ...edu, id };

  profile.education = [newEdu, ...profile.education];
  saveChefProfile(profile);
  return profile.education;
}

export function updateEducation(id: string, updates: Partial<EducationCert>): EducationCert[] {
  const profile = getChefProfile();
  const index = profile.education.findIndex(e => e.id === id);
  if (index !== -1) {
    profile.education[index] = { ...profile.education[index], ...updates };
    saveChefProfile(profile);
  }
  return profile.education;
}

export function deleteEducation(id: string): EducationCert[] {
  const profile = getChefProfile();
  profile.education = profile.education.filter(e => e.id !== id);
  saveChefProfile(profile);
  return profile.education;
}

// ---------------- AWARDS & ACHIEVEMENTS OPERATIONS ---------------- //

export function getAwards(): AwardItem[] {
  ensureAwardsFile();
  try {
    const raw = fs.readFileSync(AWARDS_FILE, 'utf-8');
    const items: AwardItem[] = JSON.parse(raw);
    return items.sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (error) {
    console.error('Error reading awards:', error);
    return [];
  }
}

export function saveAwards(items: AwardItem[]): boolean {
  ensureAwardsFile();
  try {
    const tempFile = `${AWARDS_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(items, null, 2), 'utf-8');
    fs.renameSync(tempFile, AWARDS_FILE);
    return true;
  } catch (error) {
    console.error('Error saving awards:', error);
    return false;
  }
}

export function addAward(award: Omit<AwardItem, 'id'> & { id?: string }): AwardItem[] {
  const current = getAwards();
  const id = award.id || `award-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const order = award.order !== undefined ? award.order : current.length + 1;
  const newAward: AwardItem = { ...award, id, order };
  const updated = [newAward, ...current].map((it, idx) => ({ ...it, order: idx + 1 }));
  saveAwards(updated);
  return updated;
}

export function updateAward(id: string, updates: Partial<AwardItem>): AwardItem | null {
  const current = getAwards();
  const index = current.findIndex(a => a.id === id);
  if (index === -1) return null;
  current[index] = { ...current[index], ...updates };
  saveAwards(current);
  return current[index];
}

export function deleteAward(id: string): AwardItem[] {
  const current = getAwards();
  const filtered = current.filter(a => a.id !== id);
  saveAwards(filtered);
  return filtered;
}

// ---------------- MASTER RECIPES OPERATIONS ---------------- //

export function getRecipes(): RecipeItem[] {
  ensureRecipesFile();
  try {
    const raw = fs.readFileSync(RECIPES_FILE, 'utf-8');
    const items: RecipeItem[] = JSON.parse(raw);
    return items.sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (error) {
    console.error('Error reading recipes:', error);
    return [];
  }
}

export function saveRecipes(items: RecipeItem[]): boolean {
  ensureRecipesFile();
  try {
    const tempFile = `${RECIPES_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(items, null, 2), 'utf-8');
    fs.renameSync(tempFile, RECIPES_FILE);
    return true;
  } catch (error) {
    console.error('Error saving recipes:', error);
    return false;
  }
}

export function addRecipe(recipe: Omit<RecipeItem, 'id'> & { id?: string }): RecipeItem[] {
  const current = getRecipes();
  const id = recipe.id || `recipe-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const order = recipe.order !== undefined ? recipe.order : current.length + 1;
  const newRecipe: RecipeItem = { ...recipe, id, order };
  const updated = [newRecipe, ...current].map((it, idx) => ({ ...it, order: idx + 1 }));
  saveRecipes(updated);
  return updated;
}

export function updateRecipe(id: string, updates: Partial<RecipeItem>): RecipeItem | null {
  const current = getRecipes();
  const index = current.findIndex(r => r.id === id);
  if (index === -1) return null;
  current[index] = { ...current[index], ...updates };
  saveRecipes(current);
  return current[index];
}

export function deleteRecipe(id: string): RecipeItem[] {
  const current = getRecipes();
  const filtered = current.filter(r => r.id !== id);
  saveRecipes(filtered);
  return filtered;
}

// ---------------- EVENT FOLDERS GALLERY OPERATIONS ---------------- //

export function getEventFolders(): EventFolder[] {
  ensureFoldersFile();
  try {
    const raw = fs.readFileSync(FOLDERS_FILE, 'utf-8');
    const folders: EventFolder[] = JSON.parse(raw);
    return folders.sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (error) {
    console.error('Error reading event folders:', error);
    return [];
  }
}

export function saveEventFolders(folders: EventFolder[]): boolean {
  ensureFoldersFile();
  try {
    const tempFile = `${FOLDERS_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(folders, null, 2), 'utf-8');
    fs.renameSync(tempFile, FOLDERS_FILE);
    return true;
  } catch (error) {
    console.error('Error saving event folders:', error);
    return false;
  }
}

export function addEventFolder(folder: Omit<EventFolder, 'id' | 'images'> & { id?: string; images?: GalleryItem[] }): EventFolder[] {
  const current = getEventFolders();
  const id = folder.id || `event-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const order = folder.order !== undefined ? folder.order : current.length + 1;
  const newFolder: EventFolder = {
    ...folder,
    id,
    order,
    images: folder.images || [],
  };
  const updated = [newFolder, ...current].map((f, idx) => ({ ...f, order: idx + 1 }));
  saveEventFolders(updated);
  return updated;
}

export function updateEventFolder(id: string, updates: Partial<EventFolder>): EventFolder | null {
  const current = getEventFolders();
  const index = current.findIndex(f => f.id === id);
  if (index === -1) return null;
  current[index] = { ...current[index], ...updates };
  saveEventFolders(current);
  return current[index];
}

export function deleteEventFolder(id: string): EventFolder[] {
  const current = getEventFolders();
  const filtered = current.filter(f => f.id !== id);
  saveEventFolders(filtered);
  return filtered;
}

export function addImagesToEventFolder(folderId: string, newImages: GalleryItem[]): EventFolder | null {
  const current = getEventFolders();
  const index = current.findIndex(f => f.id === folderId);
  if (index === -1) return null;

  const existingImages = current[index].images || [];
  current[index].images = [...newImages, ...existingImages];
  if (!current[index].coverImage && newImages.length > 0) {
    current[index].coverImage = newImages[0].url;
  }
  saveEventFolders(current);
  return current[index];
}

export function deleteImageFromEventFolder(folderId: string, imageId: string): EventFolder | null {
  const current = getEventFolders();
  const index = current.findIndex(f => f.id === folderId);
  if (index === -1) return null;

  current[index].images = (current[index].images || []).filter(img => img.id !== imageId);
  saveEventFolders(current);
  return current[index];
}
