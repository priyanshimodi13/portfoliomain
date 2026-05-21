import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export type SnapMode = 'direction' | 'nearest';

export interface SnapScrollConfig {
  duration?: number;
  ease?: string;
  debounceDelay?: number;
  mode?: SnapMode;
}

const DEFAULTS: Required<SnapScrollConfig> = {
  duration: 0.8,
  ease: 'power3.inOut',
  debounceDelay: 150,
  mode: 'direction',
};

export function useSnapScrollAdvanced(config: SnapScrollConfig = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const configRef = useRef<Required<SnapScrollConfig>>({ ...DEFAULTS, ...config });

  useEffect(() => {
    configRef.current = { ...DEFAULTS, ...config };
  }, [config.duration, config.ease, config.debounceDelay, config.mode]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getSections = () =>
      Array.from(container.querySelectorAll<HTMLElement>('[data-snap-section]'));

    let isAnimating = false;

    const onWheelDirection = (e: WheelEvent) => {
      // 1. If we are animating, block to prevent jitter
      if (isAnimating) { e.preventDefault(); return; }

      // 2. Threshold check: only snap if the scroll is intentional
      // This prevents "scrolling by itself" from slight nudges
      if (Math.abs(e.deltaY) < 20) return;

      const { duration, ease } = configRef.current;
      const sections = getSections();
      const scrollTop = container.scrollTop;
      const scrollingDown = e.deltaY > 0;
      const scrollUp = e.deltaY < 0;

      let currentIndex = 0;
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop <= scrollTop + 50) currentIndex = i;
      }

      let targetIndex = currentIndex;
      if (scrollingDown) {
        targetIndex = Math.min(currentIndex + 1, sections.length - 1);
      } else if (scrollUp) {
        const currentSectionTop = sections[currentIndex].offsetTop;
        if (scrollTop > currentSectionTop + 10) {
          targetIndex = currentIndex;
        } else {
          targetIndex = Math.max(currentIndex - 1, 0);
        }
      }

      if (targetIndex === currentIndex && Math.abs(scrollTop - sections[currentIndex].offsetTop) < 5) return;

      e.preventDefault();
      isAnimating = true;

      gsap.to(container, {
        scrollTo: { y: sections[targetIndex].offsetTop, autoKill: false },
        duration,
        ease,
        onComplete: () => {
          // Keep isAnimating true for a short "cooldown" to let trackpad momentum die down
          setTimeout(() => {
            isAnimating = false;
          }, 400); // 400ms cooldown is standard for high-inertia devices
          ScrollTrigger.update();
        },
      });
    };

    container.addEventListener('wheel', onWheelDirection, { passive: false });

    return () => {
      container.removeEventListener('wheel', onWheelDirection);
    };
  }, []);

  return containerRef;
}
