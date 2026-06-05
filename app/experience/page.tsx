import { Experience } from 'components/Experience/Experience';

import { getPageContent } from 'utils/serverUtils';

import { ResumeData } from '@/types';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Specializing in Network Security Engineering and Cloud Computing',
  alternates: { canonical: '/experience' },
};

export default async function ExperiencePage() {
  const pageData: ResumeData = await getPageContent();
  const { experience } = pageData;

  return <Experience experience={experience} />;
}
