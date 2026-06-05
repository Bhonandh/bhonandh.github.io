import { Projects } from 'components/Projects/Projects';

import { getPageContent } from 'utils/serverUtils';

import { ResumeData } from '@/types';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected work — passion projects and enterprise platforms, Technical Certifications in Networking, Security and cloud infrastructure.',
  alternates: { canonical: '/projects' },
};

export default async function ProjectsPage() {
  const pageData: ResumeData = await getPageContent();
  const { projects } = pageData;

  return <Projects projects={projects} />;
}
