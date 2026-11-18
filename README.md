# Chef Bijaya Ghimire — Executive Chef Portfolio

A luxury, editorial-grade personal portfolio website built for **Chef Bijaya Ghimire**, Executive Chef with over 6 years of international culinary leadership across fine dining, continental gastronomy, and high-volume banquet operations.

Built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**, featuring a full-featured administrative control suite for culinary galleries, career timelines, and editorial biographies.

---

## 🍽️ Key Features

- **Cinematic Hero Slideshow**:
  - Full-screen crossfade transition between hero images every 3 seconds.
  - Subtle Ken Burns pan and zoom effect.
  - Responsive dark contrast scrims ensuring editorial typography readability.
  - Instant preloading to eliminate frame delay or layout flicker.

- **Editorial Biography ("About Chef Bijaya Ghimire")**:
  - Narrative on culinary philosophy, kitchen leadership, and Michelin-standard discipline.
  - High-resolution authentic chef portraits with editorial frames.
  - Dynamic headline and biography editable directly from the Admin Panel.

- **Interactive Culinary Timeline**:
  - Verified career history across luxury hotel kitchens and culinary institutions (e.g., Mount Glory Forest Resort & Spa, Royal Empire Boutique Hotel, Thamel Momo Hut, Club de Novo).
  - Dedicated tabs for Professional Kitchen Experience, Education & Certifications, and Industry References.

- **Signature Repertoire & Specialties**:
  - Showcasing mastery in International Gastronomy, Banqueting & High-Volume Operations, Menu Engineering & Cost Control, Kitchen Brigade Leadership, Culinary Innovation, and Food Safety & HACCP Compliance.

- **Curated Creations Gallery**:
  - Asymmetric luxury masonry grid showcasing plated artistry and fine dining dishes.
  - Interactive fullscreen Lightbox modal with keyboard navigation (`Esc`, `←`, `→`).

- **Executive Admin Dashboard (`/admin/login`)**:
  - **Gallery Management**: Upload high-res dish photos with automatic Sharp optimization (WebP conversion, max 1920px resize, thumbnail generation), reorder dishes, feature hero items, replace existing photo files, and edit culinary titles/categories.
  - **Biography Editor**: In-place editing of the hero narrative and section headlines (`"A Journey of Discipline, Precision, & Plating Artistry"`).
  - **Career Experience Manager**: Add, edit, or archive professional kitchen appointments.
  - **Certifications & Education Manager**: Maintain diplomas, vocational certifications, and academic achievements.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & Route Handlers)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Vanilla CSS Animations
- **Image Processing**: [Sharp](https://sharp.pixelplumbing.com/) (WebP transcoding, progressive compression)
- **Authentication**: JWT tokens + cryptographic scrypt password verification
- **Icons**: Lucide React
- **Process Manager**: PM2

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/SimonDBista/portfolio-bijay.git
cd portfolio-bijay
npm install
```

### 2. Configure Environment
Create a `.env` file based on `.env.example`:
```env
ADMIN_USERNAME=admin
ADMIN_SALT=chefbijay2026_salt_987
ADMIN_PASSWORD_HASH=6051cfcc7ddc11e259fb394e9c4e6396dc1ca47cd4bd964c6744962db5e0276095cb1ce0eed712b4466bce83ee6efa547b6ed0a56213a7497057a2125200a0c0
JWT_SECRET=super-secret-luxury-chef-portfolio-key-2026-bijaya-ghimire-auth-token-998877
PORT=3002
NEXT_PUBLIC_SITE_URL=http://localhost:3002
```

### 3. Run Locally
```bash
# Development mode
npm run dev

# Production build & run
npm run build
npm start
```

### 4. Admin Access
Navigate to `/admin/login` in your browser to access the control suite.

---

## 📄 License & Attribution
Designed & developed with precision for **Chef Bijaya Ghimire**. All rights reserved.
