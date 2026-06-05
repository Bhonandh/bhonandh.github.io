import { Skills } from 'components/Skills/Skills';

import { getPageContent } from 'utils/serverUtils';

import { ResumeData } from '@/types';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Network Security Engineer Skill set — Building expertise in networking, security, and cloud platforms.',
  alternates: { canonical: '/skills' },
};

export default async function SkillsPage() {
  const pageData: ResumeData = await getPageContent();
  const { skills } = pageData;

  return <Skills skills={skills} />;
}
