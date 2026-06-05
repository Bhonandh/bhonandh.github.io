import { LazyContact } from 'components/Contact/LazyContact';

import { getPageContent } from 'utils/serverUtils';

import { ResumeData } from '@/types';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch — available for Network Engineer or Network Security Engineer role.',
  alternates: { canonical: '/contact' },
};

export default async function ContactPage() {
  const pageData: ResumeData = await getPageContent();
  const { contact } = pageData;

  return <LazyContact contact={contact} />;
}
