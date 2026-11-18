import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Bijaya Ghimire | Executive Chef & Culinary Specialist',
  description: 'Official portfolio of Chef Bijaya Ghimire. Over 8 years of culinary excellence, modern gastronomy, and fine dining leadership from luxury Himalayan resorts to international culinary stages in Kuwait.',
  keywords: [
    'Bijaya Ghimire',
    'Chef Bijaya Ghimire',
    'Executive Chef',
    'Chef de Partie',
    'Fine Dining Chef',
    'Culinary Instructor',
    'Modern Gastronomy',
    'Food Presentation Artistry',
    'Luxury Chef Portfolio',
    'Banepa Nepal Chef',
    'Kuwait Chef'
  ],
  authors: [{ name: 'Bijaya Ghimire' }],
  creator: 'Bijaya Ghimire',
  publisher: 'Bijaya Ghimire',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Bijaya Ghimire | Executive Chef & Culinary Specialist',
    description: 'Harmonizing precision culinary techniques, rigorous food safety, and evocative visual plating. Over 8 years of international culinary mastery.',
    url: 'https://chefbijayaghimire.com',
    siteName: 'Bijaya Ghimire Portfolio',
    images: [
      {
        url: '/images/hero/hero-1.jpg',
        width: 1920,
        height: 1080,
        alt: 'Chef Bijaya Ghimire Culinary Creation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bijaya Ghimire | Executive Chef & Culinary Specialist',
    description: 'Explore signature creations, career milestones, and culinary philosophy of Chef Bijaya Ghimire.',
    images: ['/images/hero/hero-1.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Bijaya Ghimire',
    jobTitle: 'Chef de Partie & Culinary Instructor',
    description: 'Professional Chef with over 8 years of experience in fine dining, culinary operations, and culinary pedagogy.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Banepa-02',
      addressRegion: 'Kavre',
      addressCountry: 'Nepal',
    },
    email: 'ghimirebijay89@gmail.com',
    telephone: '+9779861387820',
    knowsLanguage: ['Nepali', 'English', 'Hindi'],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Food Hygiene and Safety Level 3',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Training Express'
        },
        validIn: '2022'
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Professional Cook Certification',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Kathmandu Institute of Hospitality Management'
        },
        validIn: '2018'
      }
    ]
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#09090b] text-[#f4efe6] antialiased selection:bg-[#c9a96e] selection:text-[#09090b]">
        {children}
      </body>
    </html>
  );
}
