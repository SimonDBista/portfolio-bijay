import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ghimirebijaya.com.np';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Chef Bijaya Ghimire | Executive Chef & Culinary Specialist',
    template: '%s | Chef Bijaya Ghimire',
  },
  description:
    'Official portfolio of Chef Bijaya Ghimire (Bijay Ghimire) — Executive Chef, Chef de Partie, and Culinary Arts Instructor with over 8 years of international culinary mastery across Nepal and Kuwait. Discover culinary philosophy, signature plating creations, and verified career milestones.',
  applicationName: 'Chef Bijaya Ghimire Portfolio',
  keywords: [
    'Chef Bijaya Ghimire',
    'Bijaya Ghimire',
    'Chef Bijaya',
    'Bijay Ghimire',
    'Executive Chef Bijaya Ghimire',
    'Chef Bijaya Ghimire Nepal',
    'Bijaya Ghimire Chef',
    'Nepali Chef',
    'Executive Chef Nepal',
    'Chef de Partie Kuwait',
    'Culinary Arts Instructor Nepal',
    'Kumakh College Chef Instructor',
    'Hotel Mystic Mountain Chef',
    'Fine Dining Chef Banepa',
    'Banepa Chef Bijaya',
    'Modern Gastronomy Nepal',
    'HACCP Food Safety Level 3 Chef',
    'Kathmandu Institute of Hospitality Management Chef',
  ],
  authors: [{ name: 'Chef Bijaya Ghimire', url: siteUrl }],
  creator: 'Chef Bijaya Ghimire',
  publisher: 'Chef Bijaya Ghimire',
  alternates: {
    canonical: siteUrl,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Chef Bijaya Ghimire | Executive Chef & Culinary Specialist',
    description:
      'Harmonizing precision culinary technique, rigorous food safety, and evocative visual plating. Over 8 years of international culinary leadership across Nepal and Kuwait.',
    url: siteUrl,
    siteName: 'Chef Bijaya Ghimire Portfolio',
    images: [
      {
        url: '/images/chef/bijaya-ghimire.jpg',
        width: 1200,
        height: 1500,
        alt: 'Chef Bijaya Ghimire - Professional Executive Chef Portrait',
      },
      {
        url: '/images/hero/hero-1.jpg',
        width: 1920,
        height: 1080,
        alt: 'Chef Bijaya Ghimire Fine Dining Culinary Creation',
      },
    ],
    locale: 'en_US',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chef Bijaya Ghimire | Executive Chef & Culinary Specialist',
    description:
      'Official portfolio of Chef Bijaya Ghimire. Over 8 years of culinary excellence, fine dining gastronomy, and culinary pedagogy.',
    images: ['/images/chef/bijaya-ghimire.jpg'],
    creator: '@chefbijayaghimire',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'NP-BA',
    'geo.placename': 'Banepa, Kavre, Bagmati Province, Nepal',
    'geo.position': '27.6298;85.5214',
    'ICBM': '27.6298, 85.5214',
    'subject': 'Executive Chef Portfolio of Bijaya Ghimire',
    'coverage': 'Worldwide',
    'distribution': 'Global',
    'rating': 'General',
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
  // Comprehensive Structured Data Graph for SEO, GEO, and AEO (Answer Engine Optimization)
  const structuredDataGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. Person Entity (Primary identity for search and AI answers)
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: 'Bijaya Ghimire',
        alternateName: [
          'Chef Bijaya Ghimire',
          'Bijay Ghimire',
          'Chef Bijaya',
          'Executive Chef Bijaya Ghimire',
          'Chef Bijaya Ghimire Nepal',
        ],
        jobTitle: 'Executive Chef & Culinary Arts Instructor',
        description:
          'Bijaya Ghimire is a recognized Nepalese culinary professional, Executive Chef, and Culinary Arts Instructor with over 8 years of professional culinary experience spanning luxury hospitality in Nepal, international culinary brigades in Kuwait, and culinary pedagogy.',
        image: `${siteUrl}/images/chef/bijaya-ghimire.jpg`,
        url: siteUrl,
        sameAs: [
          'https://ghimirebijaya.com.np',
          'https://github.com/SimonDBista/portfolio-bijay',
        ],
        nationality: {
          '@type': 'Country',
          name: 'Nepal',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Banepa-02',
          addressLocality: 'Banepa',
          addressRegion: 'Bagmati Province',
          postalCode: '45210',
          addressCountry: 'NP',
        },
        homeLocation: {
          '@type': 'Place',
          name: 'Banepa, Kavre, Nepal',
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 27.6298,
            longitude: 85.5214,
          },
        },
        email: 'ghimirebijay89@gmail.com',
        telephone: '+9779861387820',
        knowsLanguage: [
          { '@type': 'Language', name: 'Nepali' },
          { '@type': 'Language', name: 'English' },
          { '@type': 'Language', name: 'Hindi' },
        ],
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: 'Kathmandu Institute of Hospitality Management',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Kathmandu',
            addressCountry: 'Nepal',
          },
        },
        knowsAbout: [
          'Culinary Arts',
          'Continental Cuisine',
          'International Gastronomy',
          'Fine Dining Plating',
          'Food Hygiene and Safety (HACCP Level 3)',
          'Kitchen Operations and Brigade Leadership',
          'Menu Engineering and Cost Control',
          'High-Volume Banquet Operations',
          'Culinary Education & Student Mentorship',
        ],
        hasCredential: [
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'Food Hygiene and Safety Level 3',
            recognizedBy: {
              '@type': 'Organization',
              name: 'Training Express',
            },
            validIn: '2022',
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'Professional Cook Certification',
            recognizedBy: {
              '@type': 'Organization',
              name: 'Kathmandu Institute of Hospitality Management',
            },
            validIn: '2018',
          },
        ],
      },

      // 2. ProfilePage Entity (Links document to Person)
      {
        '@type': 'ProfilePage',
        '@id': `${siteUrl}/#webpage`,
        url: siteUrl,
        name: 'Chef Bijaya Ghimire | Executive Chef Portfolio',
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${siteUrl}/#website`,
          name: 'Chef Bijaya Ghimire',
          url: siteUrl,
        },
        about: { '@id': `${siteUrl}/#person` },
        mainEntity: { '@id': `${siteUrl}/#person` },
        description:
          'Official portfolio of Chef Bijaya Ghimire showcasing culinary philosophy, signature creations, career history, and credentials.',
        inLanguage: 'en',
      },

      // 3. WebSite Entity
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Chef Bijaya Ghimire',
        publisher: { '@id': `${siteUrl}/#person` },
      },

      // 4. FAQPage Entity for Answer Engine Optimization (AEO - ChatGPT, Perplexity, Google SGE)
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Who is Chef Bijaya Ghimire?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Bijaya Ghimire is a recognized Nepalese Executive Chef and Culinary Arts Instructor with over 8 years of professional culinary experience in luxury hotels, fine dining restaurants, and hospitality education across Nepal and Kuwait.',
            },
          },
          {
            '@type': 'Question',
            name: 'Where is Chef Bijaya Ghimire located and where has he worked?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Chef Bijaya Ghimire is originally from Banepa, Kavre, Nepal. His culinary appointments include Chef de Partie at Swiss Forevermore in Kuwait, Chef Instructor at Kumakh College of Management & Technical Science, Chef at Kumakh Food Cafe, and culinary roles at Hotel Mystic Mountain in Nagarkot, Nepal.',
            },
          },
          {
            '@type': 'Question',
            name: 'What culinary certifications does Chef Bijaya Ghimire hold?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Chef Bijaya Ghimire holds Level 3 Food Hygiene and Safety Certification from Training Express (2022) and Professional Cook Certification from the Kathmandu Institute of Hospitality Management (2018).',
            },
          },
          {
            '@type': 'Question',
            name: 'What are Chef Bijaya Ghimire’s primary culinary specializations?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Chef Bijaya Ghimire specializes in continental cuisine, fine dining gastronomy, visual plating artistry, HACCP-standard food safety, kitchen brigade leadership, banquet operations, and menu engineering.',
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="geo.region" content="NP-BA" />
        <meta name="geo.placename" content="Banepa, Kavre, Bagmati Province, Nepal" />
        <meta name="geo.position" content="27.6298;85.5214" />
        <meta name="ICBM" content="27.6298, 85.5214" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
        />
      </head>
      <body className="min-h-screen bg-[#09090b] text-[#f4efe6] antialiased selection:bg-[#c9a96e] selection:text-[#09090b]">
        {children}
      </body>
    </html>
  );
}
