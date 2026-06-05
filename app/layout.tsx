import './globals.scss';
import './theme-variables.scss';
import './page.scss';

import { JetBrains_Mono, Inter } from 'next/font/google';
import { geolocation, ipAddress } from '@vercel/functions';
import { headers } from 'next/headers';

import { ClientProviders } from '@/components/ClientProviders/ClientProviders';
import { SmoothScroll } from '@/components/smoothscroll'; // New kinetic scroll engine
import { PageTransition } from '@/components/PageTransition/PageTransition';
import { GoogleAnalyticsDeferred } from '@/components/GoogleAnalyticsDeferred/GoogleAnalyticsDeferred';
import { ThemeScript } from '@/components/ThemeScript/ThemeScript';
import { Grain } from '@/components/Grain/Grain';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { Background } from '@/components/Background/Background';
import { ScrollProgress } from '@/components/ScrollProgress/ScrollProgress';

import type { Metadata, Viewport } from 'next';

import content from '../content/content.json';
import { ContactInfo, Social } from '@/types';

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://bhonandh.github.io/';

const personName = content.home?.name || 'Portfolio';
const description =
  'Bhonandh Sai Kandru.';
const keywords = [
  'Bhonandh Sai Kandru',
  'Bhonandh',
  'Kandru',
  'Bhonandh Sai',
  'Hire Network Engineer',
  'Hire Security Engineer',
  'Hire Cloud Engineer',
  'Hire Network Security Engineer',
  'Hire Network Analyst',
  'Network Engineer',
  'Security Engineer',
  'Cloud Engineer',
  'Network Security Engineer',
  'Network Analyst',
  'Senior Network Engineer',
  'Senior Security Engineer',
  'Senior Cloud Engineer',
  'Senior Network Security Engineer',
  'Senior Network Analyst',
  'Azure Network Engineer',
  'AWS Cloud Engineer',
  'Cloud Infrastructure Engineer',
  'Cyber Security Engineer',
  'Information Security Engineer',
  'Infrastructure Engineer',
  'Systems Engineer',
  'Network Architect',
  'Security Architect',
  'Cloud Architect',
  'Lead Network Engineer',
  'Lead Security Engineer',
  'Lead Cloud Engineer',
  'Senior Engineer',
  'Network Specialist',
  'Security Specialist',
];
const profileImage = content.about?.image?.url || '/static/images/portrait.png';
const sameAs = (content.footer?.social || []).map((s: Social) => s.url).filter(Boolean);

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${personName}`,
    template: `%s | ${personName}`,
  },
  description,
  keywords: keywords.join(', '),
  authors: [
    {
      name: personName,
      url: siteUrl,
    },
  ],
  creator: personName,
  publisher: personName,
  applicationName: `${personName} Portfolio`,
  category: 'Technology',
  classification: 'Portfolio',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: `${personName} - Network Security Engineer`,
    title: `Bhonandh Sai Kandru| ${personName}`,
    description,
    locale: 'en_GB',
    images: [
      {
        url: profileImage,
        width: content.about?.image?.size?.width || 1200,
        height: content.about?.image?.size?.height || 630,
        alt: `${personName} - Network Security Engineer Portfolio`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${personName} — Network Security Engineer`,
    description,
    images: [profileImage],
    creator: '@Bhonandh Sai Kandru',
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

function JsonLd() {
  const email = content.contact?.contactInfo?.items?.find(
    (c: ContactInfo) => c.name === 'Email'
  )?.value;
  const telephone = content.contact?.contactInfo?.items?.find(
    (c: ContactInfo) => c.name === 'Mobile'
  )?.value;

  // Person Schema
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: personName,
    url: siteUrl,
    image: {
      '@type': 'ImageObject',
      url: new URL(profileImage, siteUrl).toString(),
      width: content.about?.image?.size?.width || 1200,
      height: content.about?.image?.size?.height || 630,
    },
    email,
    telephone,
    description,
    jobTitle: content.home?.titles?.[0] || 'Network Security Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Seminole HardRock',
    },
    alumniOf: {
      '@type': 'Organization',
      name: 'Indiana State University & The Childrens Museum',
    },
    knowsAbout: [
      'Network Engineering',
      'Network Architecture',
      'Network Design',
      'Network Security',
      'Cloud Engineering',
      'Cloud Architecture',
      'Cloud Security',
      'Cyber Security',
      'Information Security',
      'Infrastructure Engineering',
      'Systems Engineering',
      'AWS',
      'Microsoft Azure',
      'Google Cloud Platform (GCP)',
      'Cisco Networking',
      'Routing and Switching',
      'TCP/IP',
      'Firewalls',
      'VPNs',
      'Intrusion Detection Systems (IDS)',
      'Intrusion Prevention Systems (IPS)',
      'Security Operations',
      'Security Monitoring',
      'Threat Detection',
      'Incident Response',
      'Risk Management',
      'Vulnerability Management',
      'Identity and Access Management (IAM)',
      'Zero Trust Security',
      'Cloud Infrastructure',
      'Hybrid Cloud',
      'Virtualization',
      'VMware',
      'Windows Server',
      'Linux Administration',
      'Network Analysis',
      'Performance Monitoring',
      'Disaster Recovery',
      'Business Continuity',
      'Infrastructure Automation',
      'Terraform',
      'Ansible',
      'DevOps',
      'Kubernetes',
      'Docker',
    ],
    sameAs,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tampa',
      addressRegion: 'Florida',
      addressCountry: 'USA',
    },
  };

  // WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: `${personName} - Network Security Engineer Portfolio`,
    description,
    publisher: {
      '@id': `${siteUrl}/#person`,
    },
    inLanguage: 'en-USA',
  };

  // ProfilePage Schema
  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@id': `${siteUrl}/#person`,
    },
    url: siteUrl,
    name: `${personName} - Professional Portfolio`,
    description,
    dateCreated: '2020-01-01T00:00:00.000Z',
    dateModified: new Date().toISOString(),
  };

  return (
    <>
      {[personSchema, websiteSchema, profilePageSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersData = await headers();
  const ip = ipAddress({ headers: headersData }) || 'Unknown';
  const geo = geolocation({ headers: headersData });
  const geoData = { ip, geo };

  return (
    <html
      lang="en-GB"
      suppressHydrationWarning
      className={`${inter.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        <ThemeScript />
        <link rel="dns-prefetch" href="https://api.iconify.design" />
        <link rel="preconnect" href="https://api.iconify.design" crossOrigin="anonymous" />
      </head>
      <body data-theme="dark" suppressHydrationWarning>
        <ClientProviders>
          {/* SmoothScroll captures all inner frame ticks for consistent kinetic damping */}
          <SmoothScroll>
            <ScrollProgress />
            <Header header={content.header} navItems={content.global.navItems} />
            <main id="main-content">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer footer={content.footer} navItems={content.global.navItems} />
            <Background />
            <Grain />
          </SmoothScroll>
        </ClientProviders>
        <JsonLd />
        <GoogleAnalyticsDeferred
          gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''}
          geoData={geoData}
        />
      </body>
    </html>
  );
}