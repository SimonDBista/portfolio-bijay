'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GalleryItem, AwardItem, RecipeItem, EventFolder, InquiryItem } from '@/lib/db';
import { ChefProfile, WorkExperience, EducationCert } from '@/data/chefData';
import {
  UploadCloud,
  Trash2,
  Star,
  ArrowUp,
  ArrowDown,
  LogOut,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
  Loader2,
  X,
  Sparkles,
  Edit3,
  RefreshCw,
  Plus,
  BookOpen,
  Briefcase,
  GraduationCap,
  Save,
  Check,
  Eye,
  Trophy,
  ChefHat,
  ShieldCheck,
  Award,
  Folder,
  FolderOpen,
  ArrowLeft,
  Images,
  Inbox,
  Mail,
  Phone,
  Clock,
  MessageSquare
} from 'lucide-react';

interface GalleryManagerProps {
  user: { username: string; role: string };
  initialItems: GalleryItem[];
  initialProfile: ChefProfile;
  initialAwards?: AwardItem[];
  initialRecipes?: RecipeItem[];
  initialFolders?: EventFolder[];
  initialInquiries?: InquiryItem[];
}

export default function GalleryManager({
  user,
  initialItems,
  initialProfile,
  initialAwards = [],
  initialRecipes = [],
  initialFolders = [],
  initialInquiries = []
}: GalleryManagerProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);
  const folderFileInputRef = useRef<HTMLInputElement>(null);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'gallery' | 'awards' | 'recipes' | 'inquiries' | 'about' | 'experience' | 'education'>('gallery');

  // Status & Feedback
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // ---------------- TAB 1: GALLERY & EVENT FOLDERS STATE ---------------- //
  const [folders, setFolders] = useState<EventFolder[]>(initialFolders);
  const [activeAdminFolder, setActiveAdminFolder] = useState<EventFolder | null>(null);
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [editingFolder, setEditingFolder] = useState<EventFolder | null>(null);
  const [folderForm, setFolderForm] = useState({
    name: '',
    description: '',
    date: '',
    coverImage: ''
  });
  const [folderLoading, setFolderLoading] = useState(false);
  const [uploadTargetFolderId, setUploadTargetFolderId] = useState<string>(initialFolders[0]?.id || '');

  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Signature Creation');
  const [isFeatured, setIsFeatured] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Edit Picture Modal State
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editFeatured, setEditFeatured] = useState(false);
  const [replacingItemId, setReplacingItemId] = useState<string | null>(null);
  const [replacingLoading, setReplacingLoading] = useState(false);

  // ---------------- TAB 2: AWARDS & ACHIEVEMENTS STATE ---------------- //
  const [awards, setAwards] = useState<AwardItem[]>(initialAwards);
  const [editingAward, setEditingAward] = useState<AwardItem | null>(null);
  const [isAddingAward, setIsAddingAward] = useState(false);
  const [awardForm, setAwardForm] = useState({
    title: '',
    category: '',
    organization: '',
    year: '',
    level: '',
    icon: 'trophy' as AwardItem['icon'],
    description: '',
    highlights: ''
  });
  const [awardLoading, setAwardLoading] = useState(false);

  // ---------------- TAB 3: MASTER RECIPES STATE (SIMPLE PICTURE + DESCRIPTION) ---------------- //
  const [recipes, setRecipes] = useState<RecipeItem[]>(initialRecipes);
  const [editingRecipe, setEditingRecipe] = useState<RecipeItem | null>(null);
  const [isAddingRecipe, setIsAddingRecipe] = useState(false);
  const [recipeForm, setRecipeForm] = useState({
    title: '',
    image: '',
    description: ''
  });
  const [recipeImageFile, setRecipeImageFile] = useState<File | null>(null);
  const [recipeImagePreview, setRecipeImagePreview] = useState<string>('');
  const [recipeLoading, setRecipeLoading] = useState(false);

  // ---------------- TAB: INQUIRIES STATE ---------------- //
  const [inquiries, setInquiries] = useState<InquiryItem[]>(initialInquiries);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);

  // ---------------- TAB 2: ABOUT SECTION STATE ---------------- //
  const [profile, setProfile] = useState<ChefProfile>(initialProfile);
  const [aboutTitle, setAboutTitle] = useState(initialProfile.aboutTitle || 'A Journey of Discipline, Precision, & Plating Artistry');
  const [aboutSubtitle, setAboutSubtitle] = useState(initialProfile.aboutSubtitle || 'Curated Biography • Authentic Craft');
  const [editorialQuote, setEditorialQuote] = useState(initialProfile.editorialQuote || '');
  const [philosophyParagraphs, setPhilosophyParagraphs] = useState<string[]>(initialProfile.fullPhilosophy || []);
  const [stats, setStats] = useState(initialProfile.stats || []);
  const [savingAbout, setSavingAbout] = useState(false);

  // ---------------- TAB 3: EXPERIENCES STATE ---------------- //
  const [experiences, setExperiences] = useState<WorkExperience[]>(initialProfile.experiences || []);
  const [editingExp, setEditingExp] = useState<WorkExperience | null>(null);
  const [isAddingExp, setIsAddingExp] = useState(false);
  const [expForm, setExpForm] = useState({
    company: '',
    role: '',
    period: '',
    location: '',
    shift: '',
    highlights: ''
  });
  const [expLoading, setExpLoading] = useState(false);

  // ---------------- TAB 4: EDUCATION & CERTIFICATES STATE ---------------- //
  const [education, setEducation] = useState<EducationCert[]>(initialProfile.education || []);
  const [editingEdu, setEditingEdu] = useState<EducationCert | null>(null);
  const [isAddingEdu, setIsAddingEdu] = useState(false);
  const [eduForm, setEduForm] = useState({
    title: '',
    institution: '',
    year: '',
    grade: '',
    description: ''
  });
  const [eduLoading, setEduLoading] = useState(false);

  // ---------------- GALLERY HANDLERS ---------------- //
  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatusMessage(null);
    if (!e.target.files || e.target.files.length === 0) return;

    const filesArray = Array.from(e.target.files);
    const validFiles: File[] = [];
    const validPreviews: string[] = [];

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSizeBytes = 25 * 1024 * 1024;

    for (const file of filesArray) {
      if (!allowedTypes.includes(file.type.toLowerCase())) {
        setStatusMessage({
          type: 'error',
          text: `Skipped "${file.name}": Unsupported format. Only JPG, PNG, and WebP are accepted.`,
        });
        continue;
      }
      if (file.size > maxSizeBytes) {
        setStatusMessage({
          type: 'error',
          text: `Skipped "${file.name}": File size exceeds 25MB limit.`,
        });
        continue;
      }

      validFiles.push(file);
      validPreviews.push(URL.createObjectURL(file));
    }

    setSelectedFiles((prev) => [...prev, ...validFiles]);
    setPreviews((prev) => [...prev, ...validPreviews]);
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      setStatusMessage({ type: 'error', text: 'Please select at least one photograph to upload.' });
      return;
    }

    setUploading(true);
    setUploadProgress(20);
    setStatusMessage(null);

    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append('files', file));
      formData.append('title', title);
      formData.append('category', category);
      formData.append('featured', String(isFeatured));

      setUploadProgress(50);
      const res = await fetch('/api/gallery', { method: 'POST', body: formData });
      setUploadProgress(85);

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload photographs');

      setUploadProgress(100);
      setStatusMessage({
        type: 'success',
        text: `Successfully uploaded and optimized ${data.items.length} photograph(s)!`,
      });

      setItems(data.items.concat(items));
      setSelectedFiles([]);
      previews.forEach((p) => URL.revokeObjectURL(p));
      setPreviews([]);
      setTitle('');

      const refreshRes = await fetch('/api/gallery');
      const refreshed = await refreshRes.json();
      if (refreshed && refreshed.items) setItems(refreshed.items);
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'An error occurred during upload.',
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Open Edit Modal for a picture
  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditCategory(item.category);
    setEditFeatured(item.featured);
  };

  // Save Edit Picture Details
  const handleSavePictureDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      const res = await fetch(`/api/gallery/${editingItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editTitle,
          category: editCategory,
          featured: editFeatured,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update picture details');

      setItems((prev) =>
        prev.map((i) => (i.id === editingItem.id ? { ...i, ...data.item } : i))
      );
      setEditingItem(null);
      setStatusMessage({ type: 'success', text: `Updated "${editTitle}" successfully!` });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to update picture details.' });
    }
  };

  // Trigger Replace Image File
  const handleTriggerReplace = (itemId: string) => {
    setReplacingItemId(itemId);
    if (replaceFileInputRef.current) {
      replaceFileInputRef.current.value = '';
      replaceFileInputRef.current.click();
    }
  };

  // Upload replacement image file
  const handleReplaceFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!replacingItemId || !e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    setReplacingLoading(true);
    setStatusMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(`/api/gallery/${replacingItemId}/replace`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to replace picture file');

      setItems((prev) =>
        prev.map((i) => (i.id === replacingItemId ? { ...i, ...data.item } : i))
      );
      setStatusMessage({ type: 'success', text: `Photograph replaced and optimized to WebP successfully!` });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to replace photograph.' });
    } finally {
      setReplacingLoading(false);
      setReplacingItemId(null);
      if (replaceFileInputRef.current) replaceFileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id: string, itemTitle: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${itemTitle}"?`)) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed');

      setItems((prev) => prev.filter((i) => i.id !== id));
      setStatusMessage({ type: 'success', text: `Deleted "${itemTitle}" successfully.` });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Could not delete photograph.' });
    }
  };

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !currentFeatured }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update failed');

      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, featured: !currentFeatured } : i))
      );
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Could not update featured status.' });
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    const updated = newItems.map((item, idx) => ({ ...item, order: idx + 1 }));
    setItems(updated);

    try {
      await fetch('/api/gallery/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds: updated.map((i) => i.id) }),
      });
    } catch (err) {
      console.error('Failed to sync reorder:', err);
    }
  };

  // ---------------- TAB 2: ABOUT SECTION HANDLERS ---------------- //
  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingAbout(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          aboutTitle,
          aboutSubtitle,
          editorialQuote,
          fullPhilosophy: philosophyParagraphs,
          stats,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update about section');

      setProfile(data.profile);
      setStatusMessage({
        type: 'success',
        text: 'About section and biography headline updated and saved successfully!',
      });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to save about section.' });
    } finally {
      setSavingAbout(false);
    }
  };

  const handleAddParagraph = () => {
    setPhilosophyParagraphs([...philosophyParagraphs, '']);
  };

  const handleRemoveParagraph = (idx: number) => {
    setPhilosophyParagraphs(philosophyParagraphs.filter((_, i) => i !== idx));
  };

  const handleUpdateParagraph = (idx: number, text: string) => {
    const updated = [...philosophyParagraphs];
    updated[idx] = text;
    setPhilosophyParagraphs(updated);
  };

  // ---------------- TAB 3: EXPERIENCES HANDLERS ---------------- //
  const openAddExp = () => {
    setExpForm({ company: '', role: '', period: '', location: 'Nepal', shift: '', highlights: '' });
    setEditingExp(null);
    setIsAddingExp(true);
  };

  const openEditExp = (exp: WorkExperience) => {
    setEditingExp(exp);
    setExpForm({
      company: exp.company,
      role: exp.role,
      period: exp.period,
      location: exp.location,
      shift: exp.shift || '',
      highlights: exp.highlights.join('\n'),
    });
    setIsAddingExp(true);
  };

  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    setExpLoading(true);
    setStatusMessage(null);

    try {
      const highlightsArray = expForm.highlights
        .split('\n')
        .map((h) => h.trim())
        .filter(Boolean);

      const payload = {
        company: expForm.company,
        role: expForm.role,
        period: expForm.period,
        location: expForm.location,
        shift: expForm.shift,
        highlights: highlightsArray,
      };

      let res;
      if (editingExp) {
        res = await fetch('/api/profile/experience', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingExp.id, ...payload }),
        });
      } else {
        res = await fetch('/api/profile/experience', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save experience');

      setExperiences(data.experiences);
      setIsAddingExp(false);
      setEditingExp(null);
      setStatusMessage({
        type: 'success',
        text: editingExp ? 'Experience updated successfully!' : 'New experience added successfully!',
      });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Error saving experience.' });
    } finally {
      setExpLoading(false);
    }
  };

  const handleDeleteExp = async (id: string, company: string) => {
    if (!window.confirm(`Delete experience at "${company}"?`)) return;

    try {
      const res = await fetch(`/api/profile/experience?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete');

      setExperiences(data.experiences);
      setStatusMessage({ type: 'success', text: `Experience at "${company}" deleted.` });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to delete.' });
    }
  };

  // ---------------- TAB 4: EDUCATION & CERTIFICATES HANDLERS ---------------- //
  const openAddEdu = () => {
    setEduForm({ title: '', institution: '', year: '', grade: '', description: '' });
    setEditingEdu(null);
    setIsAddingEdu(true);
  };

  const openEditEdu = (edu: EducationCert) => {
    setEditingEdu(edu);
    setEduForm({
      title: edu.title,
      institution: edu.institution,
      year: edu.year,
      grade: edu.grade || '',
      description: edu.description || '',
    });
    setIsAddingEdu(true);
  };

  const handleSaveEdu = async (e: React.FormEvent) => {
    e.preventDefault();
    setEduLoading(true);
    setStatusMessage(null);

    try {
      const payload = { ...eduForm };
      let res;
      if (editingEdu) {
        res = await fetch('/api/profile/education', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingEdu.id, ...payload }),
        });
      } else {
        res = await fetch('/api/profile/education', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save certificate');

      setEducation(data.education);
      setIsAddingEdu(false);
      setEditingEdu(null);
      setStatusMessage({
        type: 'success',
        text: editingEdu ? 'Certificate updated successfully!' : 'New certificate added successfully!',
      });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Error saving certificate.' });
    } finally {
      setEduLoading(false);
    }
  };

  const handleDeleteEdu = async (id: string, title: string) => {
    if (!window.confirm(`Delete certificate "${title}"?`)) return;

    try {
      const res = await fetch(`/api/profile/education?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete');

      setEducation(data.education);
      setStatusMessage({ type: 'success', text: `Certificate "${title}" deleted.` });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to delete.' });
    }
  };

  // ---------------- TAB 5: AWARDS & ACHIEVEMENTS HANDLERS ---------------- //
  const openAddAward = () => {
    setEditingAward(null);
    setAwardForm({
      title: '',
      category: 'International Certification',
      organization: '',
      year: new Date().getFullYear().toString(),
      level: 'Advanced Merit Level',
      icon: 'trophy',
      description: '',
      highlights: '',
    });
    setIsAddingAward(true);
  };

  const openEditAward = (award: AwardItem) => {
    setEditingAward(award);
    setAwardForm({
      title: award.title,
      category: award.category,
      organization: award.organization,
      year: award.year,
      level: award.level,
      icon: award.icon,
      description: award.description,
      highlights: (award.highlights || []).join('\n'),
    });
    setIsAddingAward(true);
  };

  const handleSaveAward = async (e: React.FormEvent) => {
    e.preventDefault();
    setAwardLoading(true);
    setStatusMessage(null);

    const highlightsArray = awardForm.highlights
      .split('\n')
      .map((h) => h.trim())
      .filter(Boolean);

    try {
      const payload = {
        title: awardForm.title,
        category: awardForm.category,
        organization: awardForm.organization,
        year: awardForm.year,
        level: awardForm.level,
        icon: awardForm.icon,
        description: awardForm.description,
        highlights: highlightsArray,
      };

      if (editingAward) {
        const res = await fetch(`/api/awards/${editingAward.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to update award');

        setAwards((prev) =>
          prev.map((a) => (a.id === editingAward.id ? { ...a, ...data.award } : a))
        );
        setStatusMessage({ type: 'success', text: `Award "${awardForm.title}" updated successfully!` });
      } else {
        const res = await fetch('/api/awards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to add award');

        setAwards(data.awards);
        setStatusMessage({ type: 'success', text: `Award "${awardForm.title}" added successfully!` });
      }
      setIsAddingAward(false);
      setEditingAward(null);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Error saving award.' });
    } finally {
      setAwardLoading(false);
    }
  };

  const handleDeleteAward = async (id: string, title: string) => {
    if (!window.confirm(`Delete award "${title}"?`)) return;

    try {
      const res = await fetch(`/api/awards/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete');

      setAwards(data.awards);
      setStatusMessage({ type: 'success', text: `Award "${title}" deleted.` });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to delete.' });
    }
  };

  // ---------------- EVENT FOLDERS HANDLERS ---------------- //
  const openCreateFolder = () => {
    setEditingFolder(null);
    setFolderForm({
      name: '',
      description: '',
      date: new Date().getFullYear().toString(),
      coverImage: '/images/gallery/creation-01.jpg',
    });
    setIsAddingFolder(true);
  };

  const openEditFolder = (folder: EventFolder) => {
    setEditingFolder(folder);
    setFolderForm({
      name: folder.name,
      description: folder.description,
      date: folder.date || '',
      coverImage: folder.coverImage || '',
    });
    setIsAddingFolder(true);
  };

  const handleSaveFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFolderLoading(true);
    setStatusMessage(null);

    try {
      if (editingFolder) {
        const res = await fetch(`/api/gallery/folders/${editingFolder.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(folderForm),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to update folder');

        setFolders(data.folders);
        if (activeAdminFolder && activeAdminFolder.id === editingFolder.id) {
          setActiveAdminFolder(data.folder);
        }
        setStatusMessage({ type: 'success', text: `Event Folder "${folderForm.name}" updated successfully!` });
      } else {
        const res = await fetch('/api/gallery/folders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(folderForm),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to create folder');

        setFolders(data.folders);
        setStatusMessage({ type: 'success', text: `Event Folder "${folderForm.name}" created successfully!` });
      }
      setIsAddingFolder(false);
      setEditingFolder(null);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Error saving folder' });
    } finally {
      setFolderLoading(false);
    }
  };

  const handleDeleteFolder = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete event folder "${name}" and all its photos?`)) return;

    try {
      const res = await fetch(`/api/gallery/folders/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete folder');

      setFolders(data.folders);
      if (activeAdminFolder && activeAdminFolder.id === id) {
        setActiveAdminFolder(null);
      }
      setStatusMessage({ type: 'success', text: `Event folder "${name}" deleted.` });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to delete folder' });
    }
  };

  const handleUploadPhotosToFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetFolderId = activeAdminFolder ? activeAdminFolder.id : uploadTargetFolderId;
    if (!targetFolderId) {
      setStatusMessage({ type: 'error', text: 'Please select a destination Event Folder.' });
      return;
    }
    if (selectedFiles.length === 0) {
      setStatusMessage({ type: 'error', text: 'Please select at least one photograph to upload.' });
      return;
    }

    setUploading(true);
    setUploadProgress(20);
    setStatusMessage(null);

    try {
      const formData = new FormData();
      selectedFiles.forEach(file => formData.append('files', file));
      formData.append('title', title);
      formData.append('category', category);

      setUploadProgress(50);
      const res = await fetch(`/api/gallery/folders/${targetFolderId}/images`, {
        method: 'POST',
        body: formData,
      });
      setUploadProgress(85);

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload photographs to folder');

      setUploadProgress(100);
      setFolders(data.folders);
      if (activeAdminFolder && activeAdminFolder.id === targetFolderId) {
        setActiveAdminFolder(data.folder);
      }
      setSelectedFiles([]);
      previews.forEach(p => URL.revokeObjectURL(p));
      setPreviews([]);
      setTitle('');

      setStatusMessage({
        type: 'success',
        text: `Successfully uploaded ${data.folder?.images?.length ? 'photographs' : ''} to "${data.folder?.name}"!`,
      });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Error uploading photographs.' });
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (folderFileInputRef.current) folderFileInputRef.current.value = '';
    }
  };

  const handleDeletePhotoFromFolder = async (folderId: string, imageId: string) => {
    if (!window.confirm('Delete this photograph from the event folder?')) return;

    try {
      const res = await fetch(`/api/gallery/folders/${folderId}/images?imageId=${imageId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete image');

      setFolders(data.folders);
      if (activeAdminFolder && activeAdminFolder.id === folderId) {
        setActiveAdminFolder(data.folder);
      }
      setStatusMessage({ type: 'success', text: 'Photograph removed from event folder.' });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to remove photograph.' });
    }
  };

  // ---------------- TAB 6: MASTER RECIPES HANDLERS (PICTURE + LITTLE DESCRIPTION) ---------------- //
  const openAddRecipe = () => {
    setEditingRecipe(null);
    setRecipeForm({
      title: '',
      image: '/images/gallery/creation-04.jpg',
      description: '',
    });
    setRecipeImageFile(null);
    setRecipeImagePreview('');
    setIsAddingRecipe(true);
  };

  const openEditRecipe = (recipe: RecipeItem) => {
    setEditingRecipe(recipe);
    setRecipeForm({
      title: recipe.title,
      image: recipe.image,
      description: recipe.description,
    });
    setRecipeImageFile(null);
    setRecipeImagePreview(recipe.image);
    setIsAddingRecipe(true);
  };

  const handleSaveRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecipeLoading(true);
    setStatusMessage(null);

    try {
      let res;
      if (recipeImageFile) {
        const formData = new FormData();
        formData.append('title', recipeForm.title);
        formData.append('description', recipeForm.description);
        formData.append('file', recipeImageFile);
        if (recipeForm.image) formData.append('image', recipeForm.image);

        if (editingRecipe) {
          res = await fetch(`/api/recipes/${editingRecipe.id}`, {
            method: 'PUT',
            body: formData,
          });
        } else {
          res = await fetch('/api/recipes', {
            method: 'POST',
            body: formData,
          });
        }
      } else {
        const payload = {
          title: recipeForm.title,
          image: recipeForm.image || '/images/gallery/creation-04.jpg',
          description: recipeForm.description,
        };

        if (editingRecipe) {
          res = await fetch(`/api/recipes/${editingRecipe.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
        } else {
          res = await fetch('/api/recipes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
        }
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save recipe');

      if (data.recipes) {
        setRecipes(data.recipes);
      } else {
        const refreshed = await fetch('/api/recipes').then((r) => r.json());
        if (refreshed && refreshed.recipes) setRecipes(refreshed.recipes);
      }

      setStatusMessage({
        type: 'success',
        text: editingRecipe
          ? `Recipe "${recipeForm.title}" updated successfully!`
          : `Recipe "${recipeForm.title}" added successfully!`,
      });
      setIsAddingRecipe(false);
      setEditingRecipe(null);
      setRecipeImageFile(null);
      setRecipeImagePreview('');
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Error saving recipe.' });
    } finally {
      setRecipeLoading(false);
    }
  };

  const handleDeleteRecipe = async (id: string, title: string) => {
    if (!window.confirm(`Delete recipe "${title}"?`)) return;

    try {
      const res = await fetch(`/api/recipes/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete');

      setRecipes(data.recipes);
      setStatusMessage({ type: 'success', text: `Recipe "${title}" deleted.` });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to delete.' });
    }
  };

  // ---------------- INQUIRY HANDLERS ---------------- //
  const handleRefreshInquiries = async () => {
    setInquiriesLoading(true);
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (res.ok && data.inquiries) {
        setInquiries(data.inquiries);
        setStatusMessage({ type: 'success', text: 'Inquiries refreshed.' });
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: 'Failed to refresh inquiries.' });
    } finally {
      setInquiriesLoading(false);
    }
  };

  const handleDeleteInquiry = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete inquiry from "${name}"?`)) return;

    try {
      const res = await fetch(`/api/inquiries?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete inquiry');

      setInquiries(data.inquiries);
      setStatusMessage({ type: 'success', text: `Inquiry from "${name}" deleted.` });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Error deleting inquiry.' });
    }
  };

  const handleMarkInquiryRead = async (id: string) => {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read: true }),
      });
      const data = await res.json();
      if (res.ok && data.inquiries) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
      {/* Hidden File Input for Image Replacement */}
      <input
        ref={replaceFileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg"
        onChange={handleReplaceFileSelected}
        className="hidden"
      />

      {/* Top Admin Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between pb-8 border-b border-white/10 gap-4 mb-8">
        <div>
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#c9a96e] font-semibold">
              Authenticated Admin Console &bull; {user.username}
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#f4efe6] font-normal tracking-wide mt-1">
            Executive Chef Portfolio Administration
          </h1>
          <p className="text-xs text-[#8c887e] mt-1">
            Curate culinary photographs, edit biography &amp; philosophy, and manage professional experiences &amp; certificates.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-[#14141a] hover:bg-[#1a1a24] border border-white/10 text-xs uppercase tracking-widest text-[#ded8cd] hover:text-[#c9a96e] transition-colors"
          >
            <span>Live Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center space-x-2 px-4 py-2 border border-red-500/30 hover:border-red-500/60 bg-red-950/20 hover:bg-red-950/40 text-xs uppercase tracking-widest text-red-300 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
        <button
          onClick={() => { setActiveTab('gallery'); setStatusMessage(null); }}
          className={`flex items-center space-x-2 px-5 py-2.5 text-xs uppercase tracking-wider font-medium transition-all ${activeTab === 'gallery'
            ? 'bg-[#c9a96e] text-[#09090b] font-semibold shadow-md'
            : 'bg-[#121217] text-[#ded8cd]/70 hover:text-white border border-white/5'
            }`}
        >
          <Folder className="w-4 h-4" />
          <span>Event Folders ({folders.length})</span>
        </button>

        <button
          onClick={() => { setActiveTab('awards'); setStatusMessage(null); }}
          className={`flex items-center space-x-2 px-5 py-2.5 text-xs uppercase tracking-wider font-medium transition-all ${activeTab === 'awards'
            ? 'bg-[#c9a96e] text-[#09090b] font-semibold shadow-md'
            : 'bg-[#121217] text-[#ded8cd]/70 hover:text-white border border-white/5'
            }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Awards &amp; Honors ({awards.length})</span>
        </button>

        <button
          onClick={() => { setActiveTab('recipes'); setStatusMessage(null); }}
          className={`flex items-center space-x-2 px-5 py-2.5 text-xs uppercase tracking-wider font-medium transition-all ${activeTab === 'recipes'
            ? 'bg-[#c9a96e] text-[#09090b] font-semibold shadow-md'
            : 'bg-[#121217] text-[#ded8cd]/70 hover:text-white border border-white/5'
            }`}
        >
          <ChefHat className="w-4 h-4" />
          <span>Master Recipes ({recipes.length})</span>
        </button>

        <button
          onClick={() => { setActiveTab('inquiries'); setStatusMessage(null); }}
          className={`flex items-center space-x-2 px-5 py-2.5 text-xs uppercase tracking-wider font-medium transition-all ${activeTab === 'inquiries'
            ? 'bg-[#c9a96e] text-[#09090b] font-semibold shadow-md'
            : 'bg-[#121217] text-[#ded8cd]/70 hover:text-white border border-white/5'
            }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Inquiries ({inquiries.length})</span>
          {inquiries.some((i) => !i.read) && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" title="New unread inquiries" />
          )}
        </button>

        <button
          onClick={() => { setActiveTab('about'); setStatusMessage(null); }}
          className={`flex items-center space-x-2 px-5 py-2.5 text-xs uppercase tracking-wider font-medium transition-all ${activeTab === 'about'
            ? 'bg-[#c9a96e] text-[#09090b] font-semibold shadow-md'
            : 'bg-[#121217] text-[#ded8cd]/70 hover:text-white border border-white/5'
            }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>About Biography</span>
        </button>

        <button
          onClick={() => { setActiveTab('experience'); setStatusMessage(null); }}
          className={`flex items-center space-x-2 px-5 py-2.5 text-xs uppercase tracking-wider font-medium transition-all ${activeTab === 'experience'
            ? 'bg-[#c9a96e] text-[#09090b] font-semibold shadow-md'
            : 'bg-[#121217] text-[#ded8cd]/70 hover:text-white border border-white/5'
            }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Career ({experiences.length})</span>
        </button>

        <button
          onClick={() => { setActiveTab('education'); setStatusMessage(null); }}
          className={`flex items-center space-x-2 px-5 py-2.5 text-xs uppercase tracking-wider font-medium transition-all ${activeTab === 'education'
            ? 'bg-[#c9a96e] text-[#09090b] font-semibold shadow-md'
            : 'bg-[#121217] text-[#ded8cd]/70 hover:text-white border border-white/5'
            }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Education ({education.length})</span>
        </button>
      </div>

      {/* Global Status Message */}
      {statusMessage && (
        <div
          className={`mb-8 p-4 border text-xs flex items-start space-x-3 animate-fade-in ${statusMessage.type === 'success'
            ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
            : 'bg-red-950/40 border-red-800 text-red-200'
            }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 1: CURATED EVENT FOLDERS & PHOTO GALLERIES              */}
      {/* ============================================================ */}
      {activeTab === 'gallery' && (
        <div className="space-y-10">
          {/* FOLDER VIEW MODE: OUTSIDE VIEW (ALL EVENT FOLDERS) */}
          {!activeAdminFolder ? (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <h2 className="font-serif text-2xl text-[#f4efe6]">
                    Curated Event Folders &amp; Photo Galleries ({folders.length})
                  </h2>
                  <p className="text-xs text-[#8c887e] mt-1">
                    Organize culinary photographs into distinct event folders. Each folder displays a concise event description on the outside, and stores all authentic event images inside.
                  </p>
                </div>

                <button
                  onClick={openCreateFolder}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#c9a96e] hover:bg-[#dfc28d] text-[#09090b] text-xs uppercase tracking-wider font-semibold transition-all shadow-md self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Event Folder</span>
                </button>
              </div>

              {/* Folders Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {folders.map((folder) => {
                  const coverImg = folder.coverImage || folder.images?.[0]?.url || '/images/gallery/creation-01.jpg';
                  const count = folder.images?.length || 0;

                  return (
                    <div
                      key={folder.id}
                      className="bg-[#121217] border border-white/10 hover:border-[#c9a96e]/40 transition-all flex flex-col justify-between shadow-xl group overflow-hidden"
                    >
                      <div>
                        {/* Folder Header Bar */}
                        <div className="flex items-center justify-between px-4 py-2 bg-[#16161f] border-b border-white/5 text-[11px] font-mono text-[#c9a96e]">
                          <span className="flex items-center space-x-1.5 truncate max-w-[200px]">
                            <Folder className="w-3.5 h-3.5 shrink-0 text-[#c9a96e]" />
                            <span className="truncate">{folder.name}</span>
                          </span>
                          <span className="shrink-0">{count} Photos</span>
                        </div>

                        {/* Cover Image Container */}
                        <div
                          onClick={() => setActiveAdminFolder(folder)}
                          className="relative aspect-[16/10] bg-black overflow-hidden cursor-pointer"
                        >
                          <Image
                            src={coverImg}
                            alt={folder.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          {folder.date && (
                            <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 text-[10px] text-[#c9a96e] border border-white/10 font-mono">
                              {folder.date}
                            </span>
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="px-3 py-1.5 bg-[#c9a96e] text-[#09090b] text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 shadow-lg">
                              <FolderOpen className="w-3.5 h-3.5" />
                              <span>Open Folder</span>
                            </span>
                          </div>
                        </div>

                        {/* Description Outside the Folder */}
                        <div className="p-4 space-y-2.5">
                          <h3
                            onClick={() => setActiveAdminFolder(folder)}
                            className="font-serif text-lg text-[#f4efe6] font-normal leading-snug cursor-pointer hover:text-[#c9a96e] transition-colors"
                          >
                            {folder.name}
                          </h3>

                          <div className="bg-[#16161e]/70 p-3 border border-white/5 rounded-sm">
                            <span className="text-[10px] uppercase tracking-wider text-[#c9a96e] font-semibold block mb-1">
                              Description Outside Folder:
                            </span>
                            <p className="text-xs text-[#ded8cd]/80 font-light leading-relaxed line-clamp-3">
                              {folder.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Folder Card Controls */}
                      <div className="p-3 bg-[#0d0d12] border-t border-white/5 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveAdminFolder(folder)}
                          className="flex-1 py-1.5 px-3 bg-[#c9a96e] hover:bg-[#dfc28d] text-[#09090b] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center space-x-1.5"
                        >
                          <FolderOpen className="w-3.5 h-3.5" />
                          <span>Open ({count})</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => openEditFolder(folder)}
                          className="py-1.5 px-3 bg-[#1b1b24] hover:bg-[#252532] text-xs text-[#ded8cd] hover:text-[#c9a96e] border border-white/5 transition-colors flex items-center space-x-1"
                          title="Edit folder details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteFolder(folder.id, folder.name)}
                          className="py-1.5 px-3 text-red-400 hover:text-red-300 hover:bg-red-950/30 border border-red-500/20 text-xs transition-colors flex items-center space-x-1"
                          title="Delete folder"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* FOLDER VIEW MODE: INSIDE VIEW (PHOTOS INSIDE SELECTED FOLDER) */
            <div className="space-y-8 animate-fade-in">
              <button
                type="button"
                onClick={() => setActiveAdminFolder(null)}
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#c9a96e] hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>&larr; Back to All Event Folders</span>
              </button>

              {/* Folder Banner */}
              <div className="bg-[#14141c] border border-[#c9a96e]/30 p-6 md:p-8 space-y-3 shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#c9a96e]/10 border border-[#c9a96e]/30 rounded-sm flex items-center justify-center text-[#c9a96e]">
                      <FolderOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl text-[#f4efe6]">
                        {activeAdminFolder.name}
                      </h2>
                      <span className="text-[11px] font-mono text-[#c9a96e]">
                        {activeAdminFolder.date || 'Event Gallery'} &bull; {activeAdminFolder.images?.length || 0} Photographs Inside
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openEditFolder(activeAdminFolder)}
                    className="self-start sm:self-auto px-4 py-2 bg-[#1b1b24] hover:bg-[#252532] text-xs text-[#ded8cd] hover:text-[#c9a96e] border border-white/10 transition-colors flex items-center space-x-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Folder Info</span>
                  </button>
                </div>

                <div className="bg-[#101015] p-3 border border-white/5 rounded-sm">
                  <span className="text-[10px] uppercase tracking-wider text-[#c9a96e] font-semibold block mb-1">
                    Event Description (Displayed outside this folder on homepage):
                  </span>
                  <p className="text-xs text-[#ded8cd]/80 font-light leading-relaxed">
                    {activeAdminFolder.description}
                  </p>
                </div>
              </div>

              {/* Upload Photographs Directly to this Event Folder */}
              <section className="bg-[#101015] border border-white/10 p-6 md:p-8 shadow-2xl">
                <h3 className="font-serif text-xl sm:text-2xl text-[#f4efe6] font-normal mb-1">
                  Upload Photographs to &ldquo;{activeAdminFolder.name}&rdquo;
                </h3>
                <p className="text-xs text-[#8c887e] mb-6">
                  Selected images are automatically compressed using Sharp to high-efficiency WebP and stored directly inside this event folder.
                </p>

                <form onSubmit={handleUploadPhotosToFolder} className="space-y-6">
                  <div
                    onClick={() => folderFileInputRef.current?.click()}
                    className="border-2 border-dashed border-[#c9a96e]/30 hover:border-[#c9a96e] bg-[#14141a]/60 hover:bg-[#14141a] p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center group"
                  >
                    <input
                      ref={folderFileInputRef}
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/webp,image/jpg"
                      onChange={handleFilesSelected}
                      className="hidden"
                    />

                    <div className="w-16 h-16 rounded-full bg-[#1b1b24] border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e] group-hover:scale-110 group-hover:bg-[#c9a96e] group-hover:text-[#09090b] transition-all duration-300 mb-4 shadow-xl">
                      <UploadCloud className="w-7 h-7" />
                    </div>
                    <p className="font-serif text-lg text-[#f4efe6] group-hover:text-[#c9a96e] transition-colors">
                      Click to select event photos or drag them here
                    </p>
                    <p className="text-xs text-[#8c887e] mt-1">
                      Supports multiple images &bull; JPG, JPEG, PNG, WebP up to 25MB each
                    </p>
                  </div>

                  {/* Selected Files Preview Grid */}
                  {previews.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-widest text-[#c9a96e] font-semibold">
                          Preview Selected ({previews.length})
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            previews.forEach((p) => URL.revokeObjectURL(p));
                            setPreviews([]);
                            setSelectedFiles([]);
                          }}
                          className="text-xs text-red-400 hover:underline"
                        >
                          Clear all
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                        {previews.map((previewUrl, idx) => (
                          <div
                            key={idx}
                            className="relative aspect-square bg-black border border-white/10 overflow-hidden group"
                          >
                            <Image
                              src={previewUrl}
                              alt={`Preview ${idx + 1}`}
                              fill
                              className="object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeSelectedFile(idx)}
                              className="absolute top-1 right-1 p-1 bg-black/80 rounded-full text-white/80 hover:text-red-400 transition-colors"
                              title="Remove from batch"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                            <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/80 text-[9px] text-[#c9a96e] font-mono">
                              {(selectedFiles[idx]?.size / (1024 * 1024)).toFixed(1)}MB
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Meta Input */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1.5 font-medium">
                      Photo Caption / Title (Optional)
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder={`e.g. ${activeAdminFolder.name} - Signature Highlight`}
                      className="w-full bg-[#16161e] border border-white/10 px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#c9a96e]"
                    />
                  </div>

                  {/* Upload Progress Bar */}
                  {uploading && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-[#c9a96e]">
                        <span>Compressing &amp; Adding to &ldquo;{activeAdminFolder.name}&rdquo;...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#1b1b22] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#c9a96e] transition-all duration-300 rounded-full"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={uploading || selectedFiles.length === 0}
                    className="px-8 py-3.5 bg-[#c9a96e] hover:bg-[#dfc28d] disabled:opacity-40 disabled:cursor-not-allowed text-[#09090b] text-xs uppercase tracking-[0.25em] font-semibold transition-all shadow-lg flex items-center space-x-2"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Compressing &amp; Adding...</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-4 h-4" />
                        <span>Upload {selectedFiles.length > 0 ? `(${selectedFiles.length}) Photos` : ''} to Folder</span>
                      </>
                    )}
                  </button>
                </form>
              </section>

              {/* Photos Inside This Folder Grid */}
              <section className="bg-[#101015] border border-white/10 p-6 md:p-8 shadow-2xl">
                <div className="pb-6 border-b border-white/10 mb-6">
                  <h3 className="font-serif text-2xl text-[#f4efe6]">
                    Photographs Inside &ldquo;{activeAdminFolder.name}&rdquo; ({activeAdminFolder.images?.length || 0})
                  </h3>
                  <p className="text-xs text-[#8c887e] mt-1">
                    All images displayed when visitors click into this event folder on the homepage.
                  </p>
                </div>

                {activeAdminFolder.images && activeAdminFolder.images.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {activeAdminFolder.images.map((img, idx) => (
                      <div
                        key={img.id || idx}
                        className="bg-[#14141a] border border-white/10 flex flex-col justify-between overflow-hidden group hover:border-[#c9a96e]/40 transition-colors shadow-lg"
                      >
                        <div className="relative aspect-[4/3] bg-black">
                          <Image
                            src={img.thumbnailUrl || img.url}
                            alt={img.title || 'Event photo'}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 25vw"
                          />
                          <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/80 text-[9px] font-mono text-[#c9a96e] border border-white/10">
                            #{idx + 1}
                          </span>
                        </div>

                        <div className="p-3 flex items-center justify-between gap-2 bg-[#0e0e14]">
                          <span className="text-xs text-[#ded8cd] truncate font-light">
                            {img.title || 'Event Photograph'}
                          </span>

                          <button
                            type="button"
                            onClick={() => handleDeletePhotoFromFolder(activeAdminFolder.id, img.id)}
                            className="p-1 text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-500/20 transition-colors"
                            title="Remove photo from folder"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center border border-dashed border-white/10 text-xs text-[#8c887e]">
                    No photographs in this event folder yet. Use the upload box above to add pictures.
                  </div>
                )}
              </section>
            </div>
          )}

          {/* ADD / EDIT EVENT FOLDER MODAL */}
          {isAddingFolder && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#121217] border border-[#c9a96e]/40 p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <h3 className="font-serif text-xl text-[#f4efe6]">
                    {editingFolder ? 'Edit Event Folder' : 'Create New Event Folder'}
                  </h3>
                  <button
                    onClick={() => { setIsAddingFolder(false); setEditingFolder(null); }}
                    className="p-1 text-white/60 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveFolder} className="space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1 font-medium">
                      Event Folder Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={folderForm.name}
                      onChange={(e) => setFolderForm({ ...folderForm, name: e.target.value })}
                      placeholder="e.g. Kuwait Executive Banquets & High-Volume Galas"
                      className="w-full bg-[#181820] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1 font-medium">
                        Date / Period / Venue
                      </label>
                      <input
                        type="text"
                        value={folderForm.date}
                        onChange={(e) => setFolderForm({ ...folderForm, date: e.target.value })}
                        placeholder="e.g. 2023 – 2025 • Kuwait City"
                        className="w-full bg-[#181820] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1 font-medium">
                        Cover Image URL
                      </label>
                      <input
                        type="text"
                        value={folderForm.coverImage}
                        onChange={(e) => setFolderForm({ ...folderForm, coverImage: e.target.value })}
                        placeholder="/images/gallery/creation-01.jpg"
                        className="w-full bg-[#181820] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1 font-medium">
                      Little Description (Displayed outside the folder) *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={folderForm.description}
                      onChange={(e) => setFolderForm({ ...folderForm, description: e.target.value })}
                      placeholder="Concise overview explaining this culinary event, venue setting, and culinary highlights..."
                      className="w-full bg-[#181820] border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => { setIsAddingFolder(false); setEditingFolder(null); }}
                      className="px-4 py-2 text-xs uppercase tracking-wider text-[#ded8cd] hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={folderLoading}
                      className="px-6 py-2 bg-[#c9a96e] hover:bg-[#dfc28d] text-[#09090b] text-xs uppercase tracking-wider font-semibold flex items-center space-x-1"
                    >
                      {folderLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                      <span>{editingFolder ? 'Update Folder' : 'Create Folder'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: ABOUT SECTION & HEADLINE EDITOR                        */}
      {/* ============================================================ */}
      {activeTab === 'about' && (
        <section className="bg-[#101015] border border-white/10 p-6 md:p-8 shadow-2xl">
          <div className="pb-6 border-b border-white/10 mb-6">
            <h2 className="font-serif text-2xl text-[#f4efe6] font-normal">
              Edit About Section &amp; Biography Narrative
            </h2>
            <p className="text-xs text-[#8c887e] mt-1">
              Modify the headline (&ldquo;A Journey of Discipline, Precision, &amp; Plating Artistry&rdquo;), editorial quote, and biography paragraphs.
            </p>
          </div>

          <form onSubmit={handleSaveAbout} className="space-y-6">
            {/* Headline (Explicitly requested by user) */}
            <div className="bg-[#14141c] p-6 border border-[#c9a96e]/30 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#c9a96e] font-semibold flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Primary About Headline</span>
              </span>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1 font-medium">
                  Section Headline Title *
                </label>
                <input
                  type="text"
                  required
                  value={aboutTitle}
                  onChange={(e) => setAboutTitle(e.target.value)}
                  placeholder="e.g. A Journey of Discipline, Precision, & Plating Artistry"
                  className="w-full bg-[#181822] border border-white/10 px-4 py-3 text-base font-serif text-white focus:outline-none focus:border-[#c9a96e]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1 font-medium">
                  Section Badge Subtitle
                </label>
                <input
                  type="text"
                  value={aboutSubtitle}
                  onChange={(e) => setAboutSubtitle(e.target.value)}
                  placeholder="e.g. Curated Biography • Authentic Craft"
                  className="w-full bg-[#181822] border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                />
              </div>
            </div>

            {/* Editorial Quote */}
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-2 font-medium">
                Chef&apos;s Editorial Quote
              </label>
              <textarea
                rows={2}
                value={editorialQuote}
                onChange={(e) => setEditorialQuote(e.target.value)}
                className="w-full bg-[#16161e] border border-white/10 p-4 text-sm font-serif italic text-white focus:outline-none focus:border-[#c9a96e]"
              />
            </div>

            {/* Narrative Paragraphs / Philosophy */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] uppercase tracking-widest text-[#8c887e] font-medium">
                  Biography &amp; Culinary Philosophy Paragraphs ({philosophyParagraphs.length})
                </label>
                <button
                  type="button"
                  onClick={handleAddParagraph}
                  className="inline-flex items-center space-x-1 text-xs text-[#c9a96e] hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Paragraph</span>
                </button>
              </div>

              {philosophyParagraphs.map((para, idx) => (
                <div key={idx} className="relative bg-[#14141a] border border-white/5 p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#8c887e]">
                    <span>Paragraph {idx + 1}</span>
                    {philosophyParagraphs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveParagraph(idx)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={3}
                    value={para}
                    onChange={(e) => handleUpdateParagraph(idx, e.target.value)}
                    className="w-full bg-[#181822] border border-white/10 p-3 text-xs sm:text-sm text-[#ded8cd] focus:outline-none focus:border-[#c9a96e]"
                  />
                </div>
              ))}
            </div>

            {/* Core Stats / Metrics */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] font-medium">
                Key Metrics &amp; Achievements (4 Display Badges)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-[#14141a] p-3 border border-white/5 space-y-2">
                    <span className="text-[10px] text-[#c9a96e] font-mono">Badge #{idx + 1}</span>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => {
                        const updated = [...stats];
                        updated[idx].value = e.target.value;
                        setStats(updated);
                      }}
                      placeholder="Value (e.g. 8+)"
                      className="w-full bg-[#181822] border border-white/10 px-2 py-1 text-sm font-serif text-white"
                    />
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const updated = [...stats];
                        updated[idx].label = e.target.value;
                        setStats(updated);
                      }}
                      placeholder="Label"
                      className="w-full bg-[#181822] border border-white/10 px-2 py-1 text-xs text-white"
                    />
                    <input
                      type="text"
                      value={stat.subtext}
                      onChange={(e) => {
                        const updated = [...stats];
                        updated[idx].subtext = e.target.value;
                        setStats(updated);
                      }}
                      placeholder="Subtext"
                      className="w-full bg-[#181822] border border-white/10 px-2 py-1 text-[11px] text-[#8c887e]"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={savingAbout}
              className="px-8 py-3.5 bg-[#c9a96e] hover:bg-[#dfc28d] disabled:opacity-40 text-[#09090b] text-xs uppercase tracking-[0.25em] font-semibold transition-all shadow-lg flex items-center space-x-2"
            >
              {savingAbout ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving About Changes...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save About Section</span>
                </>
              )}
            </button>
          </form>
        </section>
      )}

      {/* ============================================================ */}
      {/* TAB 3: CAREER EXPERIENCES (ADD, EDIT, DELETE)               */}
      {/* ============================================================ */}
      {activeTab === 'experience' && (
        <section className="bg-[#101015] border border-white/10 p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-white/10 gap-3 mb-6">
            <div>
              <h2 className="font-serif text-2xl text-[#f4efe6] font-normal">
                Professional Career Experiences ({experiences.length})
              </h2>
              <p className="text-xs text-[#8c887e] mt-1">
                Add, edit, or remove restaurants, roles, timelines, and culinary achievements.
              </p>
            </div>

            <button
              onClick={openAddExp}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#c9a96e] hover:bg-[#dfc28d] text-[#09090b] text-xs uppercase tracking-wider font-semibold transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Experience</span>
            </button>
          </div>

          {/* List of Experiences */}
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="bg-[#14141a] border border-white/5 p-6 hover:border-[#c9a96e]/30 transition-colors flex flex-col md:flex-row md:items-start md:justify-between gap-4"
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-mono px-2 py-0.5 bg-[#c9a96e]/10 text-[#c9a96e] border border-[#c9a96e]/20">
                      {exp.period}
                    </span>
                    <span className="text-xs text-[#8c887e]">
                      {exp.location}
                    </span>
                    {exp.shift && (
                      <span className="text-[11px] text-white/60 bg-white/5 px-2 py-0.5">
                        {exp.shift}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-xl text-[#f4efe6]">
                    {exp.role} &bull; <span className="text-[#c9a96e] font-sans text-base">{exp.company}</span>
                  </h3>

                  <ul className="space-y-1 pt-1 text-xs text-[#ded8cd]/80 list-disc list-inside">
                    {exp.highlights.slice(0, 3).map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                    {exp.highlights.length > 3 && (
                      <li className="text-[#8c887e] italic">+{exp.highlights.length - 3} more highlights</li>
                    )}
                  </ul>
                </div>

                <div className="flex items-center space-x-3 shrink-0 pt-2 md:pt-0">
                  <button
                    onClick={() => openEditExp(exp)}
                    className="px-3 py-1.5 bg-[#1b1b24] hover:bg-[#252532] text-xs text-[#ded8cd] hover:text-[#c9a96e] border border-white/10 transition-colors flex items-center space-x-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDeleteExp(exp.id, exp.company)}
                    className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-500/20 transition-colors flex items-center space-x-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ADD / EDIT EXPERIENCE MODAL */}
          {isAddingExp && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#121217] border border-[#c9a96e]/40 p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <h3 className="font-serif text-xl text-[#f4efe6]">
                    {editingExp ? 'Edit Experience' : 'Add New Career Experience'}
                  </h3>
                  <button onClick={() => setIsAddingExp(false)} className="p-1 text-white/60 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveExp} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1">
                        Restaurant / Organization *
                      </label>
                      <input
                        type="text"
                        required
                        value={expForm.company}
                        onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                        placeholder="e.g. Swiss Forevermore"
                        className="w-full bg-[#181820] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1">
                        Role / Position *
                      </label>
                      <input
                        type="text"
                        required
                        value={expForm.role}
                        onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                        placeholder="e.g. Chef de Partie (CDP)"
                        className="w-full bg-[#181820] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1">
                        Period *
                      </label>
                      <input
                        type="text"
                        required
                        value={expForm.period}
                        onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                        placeholder="e.g. Dec 2023 – Nov 2025"
                        className="w-full bg-[#181820] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={expForm.location}
                        onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                        placeholder="e.g. Kuwait / Nepal"
                        className="w-full bg-[#181820] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1">
                        Shift (Optional)
                      </label>
                      <input
                        type="text"
                        value={expForm.shift}
                        onChange={(e) => setExpForm({ ...expForm, shift: e.target.value })}
                        placeholder="e.g. Evening Shift"
                        className="w-full bg-[#181820] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1">
                      Responsibilities &amp; Highlights (One per line)
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={expForm.highlights}
                      onChange={(e) => setExpForm({ ...expForm, highlights: e.target.value })}
                      placeholder="Manage daily kitchen operations&#10;Coordinate team members&#10;Maintain food quality and presentation"
                      className="w-full bg-[#181820] border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setIsAddingExp(false)}
                      className="px-4 py-2 text-xs uppercase tracking-wider text-[#ded8cd] hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={expLoading}
                      className="px-6 py-2 bg-[#c9a96e] hover:bg-[#dfc28d] text-[#09090b] text-xs uppercase tracking-wider font-semibold flex items-center space-x-1"
                    >
                      {expLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                      <span>{editingExp ? 'Update Experience' : 'Save Experience'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ============================================================ */}
      {/* TAB 4: EDUCATION & CERTIFICATIONS (ADD, EDIT, DELETE)         */}
      {/* ============================================================ */}
      {activeTab === 'education' && (
        <section className="bg-[#101015] border border-white/10 p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-white/10 gap-3 mb-6">
            <div>
              <h2 className="font-serif text-2xl text-[#f4efe6] font-normal">
                Education &amp; Professional Certifications ({education.length})
              </h2>
              <p className="text-xs text-[#8c887e] mt-1">
                Add, edit, or manage food hygiene credentials, culinary diplomas, and degrees.
              </p>
            </div>

            <button
              onClick={openAddEdu}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#c9a96e] hover:bg-[#dfc28d] text-[#09090b] text-xs uppercase tracking-wider font-semibold transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Certificate</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="bg-[#14141a] border border-white/5 p-6 hover:border-[#c9a96e]/30 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#c9a96e] px-2.5 py-0.5 bg-[#c9a96e]/10 border border-[#c9a96e]/20">
                      {edu.year}
                    </span>
                    {edu.grade && (
                      <span className="text-xs text-[#8c887e]">
                        Grade: {edu.grade}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-lg text-[#f4efe6] mb-1">
                    {edu.title}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-[#c9a96e] mb-3 font-medium">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-[#ded8cd]/80 leading-relaxed">
                    {edu.description}
                  </p>
                </div>

                <div className="flex items-center justify-end space-x-2 pt-4 border-t border-white/5 mt-4">
                  <button
                    onClick={() => openEditEdu(edu)}
                    className="px-3 py-1.5 bg-[#1b1b24] hover:bg-[#252532] text-xs text-[#ded8cd] hover:text-[#c9a96e] border border-white/10 transition-colors flex items-center space-x-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDeleteEdu(edu.id, edu.title)}
                    className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-500/20 transition-colors flex items-center space-x-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ADD / EDIT CERTIFICATE MODAL */}
          {isAddingEdu && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#121217] border border-[#c9a96e]/40 p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <h3 className="font-serif text-xl text-[#f4efe6]">
                    {editingEdu ? 'Edit Certificate / Credential' : 'Add New Certificate'}
                  </h3>
                  <button onClick={() => setIsAddingEdu(false)} className="p-1 text-white/60 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveEdu} className="space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1">
                      Certificate / Credential Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={eduForm.title}
                      onChange={(e) => setEduForm({ ...eduForm, title: e.target.value })}
                      placeholder="e.g. Food Hygiene and Safety Level 3"
                      className="w-full bg-[#181820] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1">
                        Issuing Institution *
                      </label>
                      <input
                        type="text"
                        required
                        value={eduForm.institution}
                        onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                        placeholder="e.g. Training Express"
                        className="w-full bg-[#181820] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1">
                        Year *
                      </label>
                      <input
                        type="text"
                        required
                        value={eduForm.year}
                        onChange={(e) => setEduForm({ ...eduForm, year: e.target.value })}
                        placeholder="e.g. 2022"
                        className="w-full bg-[#181820] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1">
                      Grade / Score (Optional)
                    </label>
                    <input
                      type="text"
                      value={eduForm.grade}
                      onChange={(e) => setEduForm({ ...eduForm, grade: e.target.value })}
                      placeholder="e.g. Distinction / 2.56 GPA"
                      className="w-full bg-[#181820] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1">
                      Description &amp; Key Scope
                    </label>
                    <textarea
                      rows={3}
                      value={eduForm.description}
                      onChange={(e) => setEduForm({ ...eduForm, description: e.target.value })}
                      placeholder="Key competencies, topics covered, accreditation details..."
                      className="w-full bg-[#181820] border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setIsAddingEdu(false)}
                      className="px-4 py-2 text-xs uppercase tracking-wider text-[#ded8cd] hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={eduLoading}
                      className="px-6 py-2 bg-[#c9a96e] hover:bg-[#dfc28d] text-[#09090b] text-xs uppercase tracking-wider font-semibold flex items-center space-x-1"
                    >
                      {eduLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                      <span>{editingEdu ? 'Update Certificate' : 'Save Certificate'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ======================================================== */}
      {/* ---------------- TAB 5: AWARDS & ACHIEVEMENTS ---------- */}
      {/* ======================================================== */}
      {activeTab === 'awards' && (
        <section className="space-y-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <h2 className="font-serif text-2xl text-[#f4efe6]">
                Awards, Accreditations &amp; Honors
              </h2>
              <p className="text-xs text-[#8c887e] mt-1">
                Manage verified qualifications, culinary certifications, and brigade leadership honors displayed on the homepage.
              </p>
            </div>
            <button
              onClick={openAddAward}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#c9a96e] hover:bg-[#dfc28d] text-[#09090b] text-xs uppercase tracking-wider font-semibold transition-all shadow-md self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Award</span>
            </button>
          </div>

          {/* Awards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award) => (
              <div
                key={award.id}
                className="bg-[#121217] border border-white/5 p-6 flex flex-col justify-between hover:border-[#c9a96e]/30 transition-all shadow-lg relative group"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-sm bg-[#181820] border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e]">
                      {award.icon === 'trophy' ? (
                        <Trophy className="w-5 h-5" />
                      ) : award.icon === 'shield' ? (
                        <ShieldCheck className="w-5 h-5" />
                      ) : award.icon === 'grad' ? (
                        <GraduationCap className="w-5 h-5" />
                      ) : award.icon === 'star' ? (
                        <Star className="w-5 h-5" />
                      ) : (
                        <Award className="w-5 h-5" />
                      )}
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#c9a96e] px-2 py-0.5 bg-[#c9a96e]/10 border border-[#c9a96e]/20">
                      {award.year}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase tracking-wider text-[#c9a96e]/80 font-medium block mb-1">
                    {award.category} &bull; {award.level}
                  </span>
                  <h3 className="font-serif text-lg text-[#f4efe6] font-normal leading-snug mb-1">
                    {award.title}
                  </h3>
                  <p className="text-xs text-[#8c887e] uppercase font-mono mb-3">
                    {award.organization}
                  </p>
                  <p className="text-xs text-[#ded8cd]/80 leading-relaxed font-light mb-4 line-clamp-3">
                    {award.description}
                  </p>

                  {award.highlights && award.highlights.length > 0 && (
                    <div className="space-y-1 mb-4 pt-3 border-t border-white/5">
                      {award.highlights.slice(0, 3).map((h, i) => (
                        <div key={i} className="text-[11px] text-[#ded8cd]/70 flex items-start space-x-1.5">
                          <Check className="w-3 h-3 text-[#c9a96e] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end space-x-2 pt-4 border-t border-white/5">
                  <button
                    onClick={() => openEditAward(award)}
                    className="p-1.5 text-[#ded8cd]/60 hover:text-[#c9a96e] transition-colors"
                    title="Edit Award"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteAward(award.id, award.title)}
                    className="p-1.5 text-[#ded8cd]/60 hover:text-red-400 transition-colors"
                    title="Delete Award"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ADD / EDIT AWARD MODAL */}
          {isAddingAward && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-[#121217] border border-[#c9a96e]/40 p-6 md:p-8 max-w-xl w-full shadow-2xl space-y-5 my-8">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <h3 className="font-serif text-xl text-[#f4efe6]">
                    {editingAward ? 'Edit Award / Accreditation' : 'Add New Award / Accreditation'}
                  </h3>
                  <button onClick={() => setIsAddingAward(false)} className="p-1 text-white/60 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveAward} className="space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1">
                      Award / Certification Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={awardForm.title}
                      onChange={(e) => setAwardForm({ ...awardForm, title: e.target.value })}
                      placeholder="e.g. Food Hygiene & Safety Level 3 Certification"
                      className="w-full bg-[#181820] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1">
                        Issuing Organization *
                      </label>
                      <input
                        type="text"
                        required
                        value={awardForm.organization}
                        onChange={(e) => setAwardForm({ ...awardForm, organization: e.target.value })}
                        placeholder="e.g. Training Express (UK Standards)"
                        className="w-full bg-[#181820] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1">
                        Year / Period *
                      </label>
                      <input
                        type="text"
                        required
                        value={awardForm.year}
                        onChange={(e) => setAwardForm({ ...awardForm, year: e.target.value })}
                        placeholder="e.g. 2022 or 2023 – 2025"
                        className="w-full bg-[#181820] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        value={awardForm.category}
                        onChange={(e) => setAwardForm({ ...awardForm, category: e.target.value })}
                        placeholder="e.g. International Certification"
                        className="w-full bg-[#181820] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1">
                        Distinction / Level
                      </label>
                      <input
                        type="text"
                        value={awardForm.level}
                        onChange={(e) => setAwardForm({ ...awardForm, level: e.target.value })}
                        placeholder="e.g. Advanced Merit Level"
                        className="w-full bg-[#181820] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1">
                        Badge Icon
                      </label>
                      <select
                        value={awardForm.icon}
                        onChange={(e) => setAwardForm({ ...awardForm, icon: e.target.value as AwardItem['icon'] })}
                        className="w-full bg-[#181820] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                      >
                        <option value="trophy">Trophy</option>
                        <option value="shield">Shield Check</option>
                        <option value="award">Award Medal</option>
                        <option value="grad">Graduation Cap</option>
                        <option value="star">Star</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1">
                      Narrative Description
                    </label>
                    <textarea
                      rows={3}
                      value={awardForm.description}
                      onChange={(e) => setAwardForm({ ...awardForm, description: e.target.value })}
                      placeholder="Comprehensive accreditation context, competencies demonstrated..."
                      className="w-full bg-[#181820] border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1">
                      Key Highlights (One per line)
                    </label>
                    <textarea
                      rows={3}
                      value={awardForm.highlights}
                      onChange={(e) => setAwardForm({ ...awardForm, highlights: e.target.value })}
                      placeholder="Comprehensive HACCP compliance&#10;Advanced temperature control point governance&#10;Sanitation protocols for high-capacity banquet kitchens"
                      className="w-full bg-[#181820] border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setIsAddingAward(false)}
                      className="px-4 py-2 text-xs uppercase tracking-wider text-[#ded8cd] hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={awardLoading}
                      className="px-6 py-2 bg-[#c9a96e] hover:bg-[#dfc28d] text-[#09090b] text-xs uppercase tracking-wider font-semibold flex items-center space-x-1"
                    >
                      {awardLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                      <span>{editingAward ? 'Update Award' : 'Save Award'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ======================================================== */}
      {/* ---------------- TAB 6: MASTER RECIPES ----------------- */}
      {/* ======================================================== */}
      {activeTab === 'recipes' && (
        <section className="space-y-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <h2 className="font-serif text-2xl text-[#f4efe6]">
                Master Recipes ({recipes.length})
              </h2>
              <p className="text-xs text-[#8c887e] mt-1">
                Simple culinary highlights: each recipe features an appetizing photograph, dish title, and concise culinary description.
              </p>
            </div>
            <button
              onClick={openAddRecipe}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#c9a96e] hover:bg-[#dfc28d] text-[#09090b] text-xs uppercase tracking-wider font-semibold transition-all shadow-md self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Recipe</span>
            </button>
          </div>

          {/* Recipes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-[#121217] border border-white/10 hover:border-[#c9a96e]/30 transition-all flex flex-col justify-between shadow-xl overflow-hidden"
              >
                <div>
                  {/* Recipe Photo */}
                  <div className="relative aspect-[4/3] bg-black overflow-hidden">
                    <Image
                      src={recipe.image || '/images/gallery/creation-04.jpg'}
                      alt={recipe.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  {/* Recipe Title & Description */}
                  <div className="p-5 space-y-2.5">
                    <h3 className="font-serif text-lg text-[#f4efe6] font-normal leading-snug">
                      {recipe.title}
                    </h3>

                    <div className="bg-[#16161e]/70 p-3 border border-white/5 rounded-sm">
                      <span className="text-[10px] uppercase tracking-wider text-[#c9a96e] font-semibold block mb-1">
                        Recipe Description:
                      </span>
                      <p className="text-xs text-[#ded8cd]/80 font-light leading-relaxed">
                        {recipe.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recipe Actions */}
                <div className="p-3 bg-[#0d0d12] border-t border-white/5 flex items-center justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => openEditRecipe(recipe)}
                    className="px-3 py-1.5 bg-[#1b1b24] hover:bg-[#252532] text-xs text-[#ded8cd] hover:text-[#c9a96e] border border-white/5 transition-colors flex items-center space-x-1"
                    title="Edit Recipe"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteRecipe(recipe.id, recipe.title)}
                    className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-500/20 transition-colors flex items-center space-x-1"
                    title="Delete Recipe"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ADD / EDIT RECIPE MODAL (SIMPLE: TITLE + PHOTO + DESCRIPTION) */}
          {isAddingRecipe && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-[#121217] border border-[#c9a96e]/40 p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-5 my-8">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <h3 className="font-serif text-xl text-[#f4efe6]">
                    {editingRecipe ? 'Edit Recipe' : 'Add New Recipe'}
                  </h3>
                  <button
                    onClick={() => { setIsAddingRecipe(false); setEditingRecipe(null); }}
                    className="p-1 text-white/60 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveRecipe} className="space-y-4">
                  {/* Field 1: Recipe Title */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1 font-medium">
                      Recipe Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={recipeForm.title}
                      onChange={(e) => setRecipeForm({ ...recipeForm, title: e.target.value })}
                      placeholder="e.g. Pan-Seared Atlantic Salmon with Saffron Velouté"
                      className="w-full bg-[#181820] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                    />
                  </div>

                  {/* Field 2: Recipe Photo */}
                  <div className="space-y-2">
                    <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] font-medium">
                      Recipe Photograph *
                    </label>

                    {/* Image Preview if available */}
                    {(recipeImagePreview || recipeForm.image) && (
                      <div className="relative aspect-[16/9] w-full bg-black border border-white/10 overflow-hidden mb-2">
                        <Image
                          src={recipeImagePreview || recipeForm.image}
                          alt="Recipe Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-2">
                      <label className="flex-1 cursor-pointer bg-[#181824] hover:bg-[#202030] border border-[#c9a96e]/40 px-3 py-2 text-center text-xs text-[#c9a96e] transition-colors flex items-center justify-center space-x-1.5">
                        <UploadCloud className="w-4 h-4" />
                        <span>{recipeImageFile ? recipeImageFile.name : 'Upload New Photo (Auto-compressed)'}</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/jpg"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const f = e.target.files[0];
                              setRecipeImageFile(f);
                              setRecipeImagePreview(URL.createObjectURL(f));
                            }
                          }}
                          className="hidden"
                        />
                      </label>

                      <input
                        type="text"
                        value={recipeForm.image}
                        onChange={(e) => {
                          setRecipeForm({ ...recipeForm, image: e.target.value });
                          if (!recipeImageFile) setRecipeImagePreview(e.target.value);
                        }}
                        placeholder="Or paste /images/... URL"
                        className="flex-1 bg-[#181820] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                      />
                    </div>
                  </div>

                  {/* Field 3: Little Description */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-1 font-medium">
                      Little Description *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={recipeForm.description}
                      onChange={(e) => setRecipeForm({ ...recipeForm, description: e.target.value })}
                      placeholder="Write a concise overview of this dish, key flavors, texture profiles, and presentation accents..."
                      className="w-full bg-[#181820] border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[#c9a96e] leading-relaxed"
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => { setIsAddingRecipe(false); setEditingRecipe(null); }}
                      className="px-4 py-2 text-xs uppercase tracking-wider text-[#ded8cd] hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={recipeLoading}
                      className="px-6 py-2 bg-[#c9a96e] hover:bg-[#dfc28d] text-[#09090b] text-xs uppercase tracking-wider font-semibold flex items-center space-x-1"
                    >
                      {recipeLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                      <span>{editingRecipe ? 'Update Recipe' : 'Save Recipe'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ======================================================== */}
      {/* ---------------- TAB: CLIENT INQUIRIES ------------------ */}
      {/* ======================================================== */}
      {activeTab === 'inquiries' && (
        <section className="space-y-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center space-x-3">
                <h2 className="font-serif text-2xl text-[#f4efe6]">
                  Client Inquiries &amp; Consultations ({inquiries.length})
                </h2>
                {inquiries.some((i) => !i.read) && (
                  <span className="px-2 py-0.5 bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-[10px] uppercase font-mono tracking-wider rounded-sm">
                    {inquiries.filter((i) => !i.read).length} New Unread
                  </span>
                )}
              </div>
              <p className="text-xs text-[#8c887e] mt-1">
                Direct messages and culinary service requests transmitted through the homepage contact form.
              </p>
            </div>

            <button
              type="button"
              onClick={handleRefreshInquiries}
              disabled={inquiriesLoading}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-[#1b1b24] hover:bg-[#252532] text-xs text-[#ded8cd] hover:text-[#c9a96e] border border-white/10 transition-colors self-start sm:self-auto"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${inquiriesLoading ? 'animate-spin' : ''}`} />
              <span>Refresh Inquiries</span>
            </button>
          </div>

          {inquiries.length > 0 ? (
            <div className="space-y-4">
              {inquiries.map((inq) => {
                const dateStr = inq.createdAt ? new Date(inq.createdAt).toLocaleString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) : 'Recent';

                return (
                  <div
                    key={inq.id}
                    className={`p-6 border transition-all ${
                      inq.read
                        ? 'bg-[#121217] border-white/5 hover:border-white/15'
                        : 'bg-[#14141d] border-[#c9a96e]/40 shadow-xl'
                    }`}
                  >
                    {/* Top Row: Client Name, Inquiry Focus, Date, Status */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
                      <div className="flex items-center space-x-3">
                        <span className="font-serif text-lg text-[#f4efe6]">
                          {inq.name}
                        </span>
                        {!inq.read && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400" title="Unread" />
                        )}
                        <span className="px-2.5 py-0.5 bg-[#c9a96e]/10 border border-[#c9a96e]/20 text-[10px] uppercase font-mono tracking-wider text-[#c9a96e]">
                          {inq.inquiryType}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 text-xs text-[#8c887e]">
                        <Clock className="w-3.5 h-3.5 text-[#8c887e]" />
                        <span className="font-mono text-[11px]">{dateStr}</span>
                      </div>
                    </div>

                    {/* Middle Row: Contact Info (Email, Phone) */}
                    <div className="flex flex-wrap items-center gap-4 py-3 text-xs">
                      <a
                        href={`mailto:${inq.email}?subject=Regarding your inquiry with Chef Bijaya Ghimire`}
                        className="flex items-center space-x-1.5 text-[#ded8cd] hover:text-[#c9a96e] transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#c9a96e]" />
                        <span>{inq.email}</span>
                      </a>

                      {inq.phone && (
                        <a
                          href={`tel:${inq.phone.replace(/[^0-9+]/g, '')}`}
                          className="flex items-center space-x-1.5 text-[#ded8cd] hover:text-[#c9a96e] transition-colors font-mono"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#c9a96e]" />
                          <span>{inq.phone}</span>
                        </a>
                      )}
                    </div>

                    {/* Message Body */}
                    <div className="bg-[#0e0e13] p-4 border border-white/5 rounded-sm my-2">
                      <p className="text-xs sm:text-sm text-[#ded8cd] font-light leading-relaxed whitespace-pre-wrap">
                        {inq.message}
                      </p>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                      <div className="flex items-center space-x-3">
                        {!inq.read ? (
                          <button
                            type="button"
                            onClick={() => handleMarkInquiryRead(inq.id)}
                            className="text-[#8c887e] hover:text-[#ded8cd] text-[11px] flex items-center space-x-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Mark as read</span>
                          </button>
                        ) : (
                          <span className="text-[#8c887e] text-[11px] flex items-center space-x-1">
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Read</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <a
                          href={`mailto:${inq.email}?subject=Regarding your inquiry (${inq.inquiryType}) - Chef Bijaya Ghimire&body=Dear ${encodeURIComponent(inq.name)},%0D%0A%0D%0AThank you for reaching out.%0D%0A%0D%0ABest regards,%0D%0AChef Bijaya Ghimire`}
                          onClick={() => handleMarkInquiryRead(inq.id)}
                          className="px-3.5 py-1.5 bg-[#c9a96e] hover:bg-[#dfc28d] text-[#09090b] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center space-x-1.5"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Reply via Email</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => handleDeleteInquiry(inq.id, inq.name)}
                          className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-500/20 transition-colors"
                          title="Delete inquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-[#101015] border border-white/10 p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#1e1e28] text-[#c9a96e] flex items-center justify-center mx-auto mb-2">
                <Inbox className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-[#f4efe6]">
                No Inquiries Yet
              </h3>
              <p className="text-xs text-[#8c887e] max-w-md mx-auto leading-relaxed">
                When visitors or event managers submit the consultation form on the homepage, their messages will appear here in real time with client details and quick reply options.
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
