'use client';

import { Icon } from '@iconify/react';
import { useScrollProgress } from '@/hooks/useScrollProgress';

import './ScrollProgress.scss';

export const ScrollProgress = () => {
  const { progress, showBackToTop } = useScrollProgress();

  const scrollToTop = () => {
    // If Lenis is up and running, use its smooth engine instead of the browser's native one
    if (typeof window !== 'undefined' && (window as any).lenis) {
      (window as any).lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Laser Scan Progress Bar Indicator */}
      <div
        className="scroll-progress"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      >
        <div className="scroll-progress__bar" style={{ width: `${progress}%` }} />
        <div className="scroll-progress__laser" style={{ left: `${progress}%` }} />
      </div>

      {/* Futuristic Cyber-HUD Back to Top Widget */}
      <button
        type="button"
        className={`back-to-top${showBackToTop ? ' back-to-top--visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <div className="back-to-top__hud-ring" />
        <div className="back-to-top__scanline" />
        
        <div className="back-to-top__content">
          <Icon icon="mdi:chevron-up" width={22} height={22} aria-hidden="true" />
          <span className="back-to-top__telemetry">{Math.round(progress)}%</span>
        </div>
      </button>
    </>
  );
};

export default ScrollProgress;