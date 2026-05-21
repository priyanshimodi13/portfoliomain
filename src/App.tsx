import React, { useEffect, useRef, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Header } from "./components/ui/header-2";
import ContactSection from "./components/Sections/ContactSection";
import Lenis from 'lenis';
import HeroSection from "./components/Sections/HeroSection";
import AboutSection from "./components/Sections/AboutSection";
import ProjectsSection from "./components/Sections/ProjectsSection";
import SkillsSection from "./components/Sections/SkillsSection";
import FeaturedProjects from "./components/Sections/FeaturedProjects";
import { ScrollToTop } from "./components/ui/ScrollToTop";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <div className="h-screen flex items-center justify-center bg-black text-white p-20 text-center"><h2>Something went wrong.</h2><p>Please refresh the page.</p></div>;
    return this.props.children;
  }
}

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const heroRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    // Section exit transitions: blurs and fades out the section as it exits the viewport
    const setupSectionExitBlurAnimations = () => {
      // 1. Hero to About transition
      const heroWrapper = heroRef.current;
      const aboutWrapper = document.querySelector('[data-snap-section="about"]');
      if (heroWrapper && aboutWrapper) {
        const heroContent = heroWrapper.firstElementChild;
        if (heroContent) {
          gsap.fromTo(heroContent, 
            { filter: "blur(0px)", opacity: 1, yPercent: 0 },
            {
              filter: "blur(20px)",
              opacity: 0,
              yPercent: 30,
              ease: "none",
              scrollTrigger: {
                trigger: aboutWrapper,
                start: "top 100%",
                end: "top 0%",
                scrub: true
              }
            }
          );
        }
      }

      // 2. About to Projects transition
      setupNormalTransition('about', 'projects');
      // const skillsWrapper = document.querySelector('[data-snap-section="skills"]');
      // if (projectsWrapper && skillsWrapper) {
      //   const projectsSticky = projectsWrapper.querySelector('.projects-sticky-container');
      //   if (projectsSticky) {
      //     gsap.fromTo(projectsSticky,
      //       { filter: "blur(0px)", opacity: 1 },
      //       {
      //         filter: "blur(20px)",
      //         opacity: 0,
      //         ease: "none",
      //         scrollTrigger: {
      //           trigger: skillsWrapper,
      //           start: "top 100%",
      //           end: "top 0%",
      //           scrub: true
      //         }
      //       }
      //     );
      //   }
      // }

      // Helper to setup transitions for normal flow sections
      const setupNormalTransition = (currentId: string, nextId: string) => {
        const currentWrapper = document.querySelector(`[data-snap-section="${currentId}"]`);
        const nextWrapper = document.querySelector(`[data-snap-section="${nextId}"]`);
        if (currentWrapper && nextWrapper) {
          let content = currentWrapper.firstElementChild as HTMLElement || currentWrapper;
          // If the first child is a sticky container, target its child instead to avoid breaking sticky positioning
          if (content && (content.classList.contains('featured-projects-sticky-container') || content.classList.contains('projects-sticky-container'))) {
            content = (content.firstElementChild as HTMLElement) || content;
          }
          gsap.fromTo(content,
            { filter: "blur(0px)", opacity: 1 },
            {
              filter: "blur(20px)",
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: nextWrapper,
                start: "top 100%",
                end: "top 0%",
                scrub: true
              }
            }
          );
        }
      };

      // 3. Skills to Featured Projects
      setupNormalTransition('skills', 'featured-projects');

      // 4. Featured Projects to Contact
      setupNormalTransition('featured-projects', 'contact');
    };

    // Section reveal animations
    const setupSectionAnimations = () => {
      const sections = document.querySelectorAll('.section');
      sections.forEach((section, index) => {
        if (index === 0) return;
        const items = section.querySelectorAll('.section-item');
        if (items.length === 0) return;
        gsap.set(items, { opacity: 0, y: 50 });
        gsap.to(items, {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%', end: 'top 20%',
            scrub: false, markers: false,
          },
          ease: 'power3.out',
        });
      });
    };

    // Cursor tracking
    const setupCursorTracking = () => {
      document.addEventListener('mousemove', (e) => {
        if (cursorRef.current) {
          gsap.to(cursorRef.current, {
            x: e.clientX - 10, y: e.clientY - 10,
            duration: 0.1, overwrite: 'auto',
          });
        }
      });
    };

    // Smooth Scroll (Lenis)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    (window as any).lenis = lenis;

    // Sync Lenis scroll updates with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Sync GSAP ticker with Lenis
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    setupSectionExitBlurAnimations();
    setupSectionAnimations();
    setupCursorTracking();

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000); 

    return () => {
      lenis.destroy();
      (window as any).lenis = null;
      gsap.ticker.remove(updateLenis);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="portfolio-container">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --primary: #0f172a;
          --secondary: #1e293b;
          --accent: #06b6d4;
          --accent-dark: #0891b2;
          --text: #f1f5f9;
          --text-muted: #cbd5e1;
          --border: #334155;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro", "SF Pro Text", "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background: var(--primary);
          color: var(--text);
          overflow-x: hidden;
          overflow-y: auto;
        }

        .section {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          position: relative;
          overflow: hidden;
          background: #000;
        }

        .section-snap-wrapper {
          position: sticky;
          top: 0;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: #000;
        }

        .sections-wrapper {
          position: relative;
          width: 100%;
        }

        .float-element {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          filter: blur(50px);
          opacity: 0.1;
        }

        .float-1 { top: 10%; left: 5%; background: var(--accent); }
        .float-2 { bottom: 20%; right: 10%; background: #0ea5e9; }
        .float-3 { top: 50%; right: 5%; background: var(--accent); }
      `}</style>

      {/* Cursor */}
      <div ref={cursorRef} style={{
        position: 'fixed',
        width: 20,
        height: 20,
        border: '2px solid var(--accent)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0.6,
      }}></div>

      <Header />

      <div className="sections-wrapper">
        <ErrorBoundary>
          {/* Hero Section */}
          <div ref={heroRef} data-snap-section="hero" className="section-snap-wrapper" style={{ zIndex: 10 }}>
            <Suspense fallback={
              <div style={{ height: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 40, height: 40, border: '3px solid #06b6d4', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            }>
              <HeroSection />
            </Suspense>
          </div>

          {/* About Section */}
          <div data-snap-section="about" className="section" style={{ position: 'relative', zIndex: 15, minHeight: '100vh', background: '#050505', padding: 0 }}>
            <AboutSection />
          </div>

          {/* Projects Section — Interactive Tunnel */}
          <div data-snap-section="projects" className="section-scroll-wrapper" style={{ 
            zIndex: 20, 
            height: '250vh', 
            position: 'relative', 
            backgroundColor: '#121212',
            backgroundImage: 'radial-gradient(circle 560px at 50% 200px, #525252, transparent)',
            backgroundAttachment: 'fixed'
          }}>
            <Suspense fallback={
              <div style={{ height: '100vh', background: '#121212', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 40, height: 40, border: '3px solid #06b6d4', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              </div>
            }>
              <div className="projects-sticky-container" style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
                <ProjectsSection />
              </div>
            </Suspense>
          </div>
          {/* Skills Section */}
          <div data-snap-section="skills" className="section" style={{ 
            position: 'relative', 
            zIndex: 30, 
            minHeight: '100vh', 
            height: '100vh', 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#121212',
            backgroundImage: 'radial-gradient(circle 560px at 50% 200px, #525252, transparent)',
            backgroundAttachment: 'fixed',
            padding: 0 
          }}>
            <Suspense fallback={
              <div style={{ height: '50vh', background: '#121212', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 40, height: 40, border: '3px solid #06b6d4', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              </div>
            }>
              <SkillsSection />
            </Suspense>
          </div>
          
          {/* Featured Projects Section */}
          <div data-snap-section="featured-projects" className="section-scroll-wrapper" style={{ 
            position: 'relative', 
            zIndex: 30, 
            height: '300vh', // scrollable height for pinning duration
            backgroundColor: '#121212',
            backgroundImage: 'radial-gradient(circle 560px at 50% 200px, #525252, transparent)',
            backgroundAttachment: 'fixed',
            width: '100%'
          }}>
            <Suspense fallback={
              <div style={{ height: '100vh', background: '#121212', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 40, height: 40, border: '3px solid #06b6d4', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              </div>
            }>
              <div className="featured-projects-sticky-container" style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
                <FeaturedProjects />
              </div>
            </Suspense>
          </div>


          {/* Contact Section */}
          <div data-snap-section="contact" className="section" style={{ position: 'relative', zIndex: 30, minHeight: '100vh', background: '#050505', padding: 0 }}>
            <ContactSection />
          </div>

          <ScrollToTop />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default App;
