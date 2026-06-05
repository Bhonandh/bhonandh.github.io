'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { ScrollReveal } from 'components/ScrollReveal/ScrollReveal';
import Magnet from 'components/Magnet/Magnet';

import { Projects as ProjectsProps } from '@/types';
import ProjectDetailsModal from './ProjectDetailsModal/ProjectDetailsModal';

import './Projects.scss';

// Extend the type locally for plug-and-play integration of the new section
interface CertificateItem {
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  icon: string;
  verificationUrl: string;
}

interface ExtendedProjectsProps extends ProjectsProps {
  certificates?: CertificateItem[];
}

export const Projects = ({ projects }: { projects: ExtendedProjectsProps }) => {
  const { title, label, items, certificates = [] } = projects;
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  return (
    <section id="projects" className="section projects" aria-labelledby="projects-heading">
      <span className="section__slug" aria-hidden="true">
        {'// projects'}
      </span>
      
      <ScrollReveal className="section__head section__head--centered">
        <span className="section__label section__label--centered">{label}</span>
        <h2 id="projects-heading" className="section__title">
          <span className="section__title-accent">Selected</span> {title}
        </h2>
        <p className="section__sub">
          A cross-section of platforms, tools, and architectures — from passion projects to
          enterprise-grade applications shipped in production.
        </p>
      </ScrollReveal>

      {/* Upgraded Out-Of-The-Box Projects Bento Grid */}
      <div 
        className="projects__bento"
        onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
          e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
        }}
      >
        {items.map((p, i) => {
          const preview = p.images?.[0];
          const featured = i === 0; // High-end bento asymmetry: First item is massive
          const techSummary = p.technologies.slice(0, 4);
          const descriptionSnippet =
            p.description.length > 120 ? `${p.description.slice(0, 120)}…` : p.description;

          return (
            <ScrollReveal
              as="button"
              key={p.title}
              type="button"
              className={`proj-card${featured ? ' proj-card--featured' : ''}`}
              onClick={() => setSelectedProject(p)}
              aria-label={`View details for ${p.title}`}
              style={{ '--reveal-delay': `${(i % 3) * 100}ms` } as React.CSSProperties}
            >
              <div className="proj-card__scanline" />
              <div className="proj-card__spotlight" />
              
              <div className={`proj-card__image${!preview ? ' proj-card__image--placeholder' : ''}`}>
                {preview ? (
                  <Image
                    src={preview.url}
                    alt=""
                    width={preview.size.width}
                    height={preview.size.height}
                    sizes={featured ? '(min-width: 900px) 720px, 100vw' : '(min-width: 900px) 380px, 100vw'}
                    loading={i < 2 ? 'eager' : 'lazy'}
                  />
                ) : (
                  <Icon icon={p.thumbnail || 'ph:code'} width={48} height={48} />
                )}
              </div>
              
              <div className="proj-card__body">
                <div className="proj-card__header">
                  <h3 className="proj-card__title">{p.title}</h3>
                  <span className="proj-card__year">{p.startDate}</span>
                </div>
                <p className="proj-card__desc">{descriptionSnippet}</p>
                <div className="proj-card__footer">
                  <div className="proj-card__tech">
                    {techSummary.map((t: any) => (
                      <span className="chip" key={t.name}>
                        <Icon icon={t.class} width={14} height={14} aria-hidden="true" />
                        {t.name}
                      </span>
                    ))}
                  </div>
                  <span className="proj-card__cta">
                    Explore <Icon icon="ph:arrow-up-right" width={14} height={14} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* =============================================================
         BRAND NEW SECTION: CERTIFICATES VERIFICATION VAULT
         ============================================================= */}
      {certificates.length > 0 && (
        <div className="certificates-vault">
          <ScrollReveal className="section__head section__head--centered context-break">
            <span className="section__label section__label--centered">// verification</span>
            <h2 className="section__title">
              Technical <span className="section__title-accent">Credentials</span>
            </h2>
            <p className="section__sub">
              Validated industry certifications proving operational baseline capabilities in architecture and defense.
            </p>
          </ScrollReveal>

          <div 
            className="cert-matrix"
            onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
              e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
            }}
          >
            {certificates.map((cert, index) => (
              <ScrollReveal
                key={cert.credentialId}
                variant="scale"
                style={{ '--reveal-delay': `${index * 80}ms` } as React.CSSProperties}
              >
                <a 
                  href={cert.verificationUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="cert-blade"
                >
                  <div className="cert-blade__scanline" />
                  <div className="cert-blade__spotlight" />

                  <div className="cert-blade__content">
                    <div className="cert-blade__system-node">
                      <span className="cert-blade__pulse" />
                      <span className="cert-blade__status-text">VALIDATED</span>
                    </div>

                    <div className="cert-blade__meta-group">
                      <div className="cert-blade__icon-box">
                        <Icon icon={cert.icon} width={26} height={26} />
                      </div>
                      <div className="cert-blade__txt">
                        <h3>{cert.title}</h3>
                        <p>{cert.issuer} &bull; {cert.date}</p>
                      </div>
                    </div>

                    <div className="cert-blade__verdict">
                      <span className="cert-blade__id-tag">&#91;&nbsp;ID: {cert.credentialId}&nbsp;&#93;</span>
                      <Icon icon="ph:shield-check" className="cert-blade__verify-icon" width={20} height={20} />
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}

      {/* Footer System Navigation */}
      <ScrollReveal className="section__page-nav">
        <Magnet>
          <Link href="/contact" className="btn btn--primary">
            <Icon icon="ph:envelope-simple" width={18} height={18} aria-hidden="true" />
            <span>Work Together</span>
          </Link>
        </Magnet>
        <Magnet>
          <Link href="/skills" className="btn btn--secondary">
            <Icon icon="ph:stack" width={18} height={18} aria-hidden="true" />
            <span>Explore Skills</span>
          </Link>
        </Magnet>
      </ScrollReveal>

      {selectedProject && (
        <ProjectDetailsModal
          show={!!selectedProject}
          data={selectedProject}
          onHide={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;