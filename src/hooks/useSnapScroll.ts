import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

/**
 * Basic snap-on-scroll hook.
 * Attach the returned ref to your scroll container div.
 * Mark snappable sections with data-snap-section="name".
 */
export function useSnapScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getSections = () =>
      Array.from(container.querySelectorAll<HTMLElement>('[data-snap-section]'));

    let isAnimating = false;

    const onWheel = (e: WheelEvent) => {
      if (isAnimating) { e.preventDefault(); return; }

      const sections = getSections();
      const scrollTop = container.scrollTop;
      const scrollingDown = e.deltaY > 0;

      // Find currently visible section
      let currentIndex = 0;
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop <= scrollTop + 10) currentIndex = i;
      }

      const atSection = Math.abs(scrollTop - sections[currentIndex].offsetTop) < 10;
      if (!atSection) return;

      const targetIndex = scrollingDown
        ? Math.min(currentIndex + 1, sections.length - 1)
        : Math.max(currentIndex - 1, 0);

      if (targetIndex === currentIndex) return;

      e.preventDefault();
      isAnimating = true;

      gsap.to(container, {
        scrollTo: { y: sections[targetIndex].offsetTop, autoKill: false },
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          isAnimating = false;
          ScrollTrigger.update();
        },
      });
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, []);

  return containerRef;
}
