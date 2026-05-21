import React, { useState, useEffect, useRef } from 'react';
import { FlipButton } from '../ui/flip-button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'AI Recruitment Platform',
    description: 'An intelligent recruitment platform that utilizes AI models to parse resumes, evaluate candidate profiles, and automate shortlisting. Features an interactive applicant tracking system and automated interview scheduling.',
    date: '2025',
    category: 'AI & Full Stack',
    image: '/AI recruitment.png?v=5',
    link: 'https://example.com',
    style: 'light' // Card type 1: Minimalist light mode 
  },
  {
    id: 2,
    title: 'Cabzee',
    description: 'A modern ride-hailing and cab booking application featuring real-time GPS tracking, interactive map integration, fare estimation, and secure payment gateway integration for seamless driver-passenger matching.',
    date: '2024',
    category: 'Mobile & Map API',
    image: '/cabzee.png?v=3',
    style: 'film-vertical' // Card type 2: Vertical film strip
  },
  {
    id: 3,
    title: 'Twitter Clone',
    description: 'A real-time Twitter clone built with Flutter and Firebase. Features user authentication, media uploads, interactive user profiles, following/unfollowing systems, and a dynamic feed sourced directly from Cloud Firestore.',
    date: '2025',
    category: 'Flutter & Firebase',
    image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=800&q=80',
    style: 'moody-details', // Card type 3: Moody technical with monospace lists
    features: ['FLUTTER CORE ENGINE', 'FIREBASE DATASTORE', 'REALTIME SYNC', 'MEDIA ENHANCEMENTS', 'FOLLOWING PROTOCOL']
  },
  {
    id: 4,
    title: 'Blog Platform',
    description: 'A dynamic blogging application utilizing the MEAN stack (MongoDB, Express, Angular, Node.js). Implements role-based access control, allowing admins to moderate content while users create, edit, and delete posts in real-time.',
    date: '2025',
    category: 'MEAN Stack',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    style: 'light'
  },
  {
    id: 5,
    title: 'Brain Stroke Analysis',
    description: 'An AI/ML application developed in Python to predict the likelihood of brain stroke occurrences using patient health records, leveraging advanced machine learning and deep learning algorithms to aid early detection.',
    date: '2025',
    category: 'AI / Machine Learning',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    style: 'moody-scanner', // Moody tech with glowing scanning lines
    metrics: ['PREDICTION INDEX: 94.2%', 'NEURAL NET CLASSIFIER', 'PATIENT METRICS INPUT', 'STABLE PREDICT V2']
  },
  {
    id: 6,
    title: 'Voice Assistant',
    description: 'A lightweight Android application written in Kotlin that listens to voice commands. Integrates speech-to-text recognition to answer queries, tell the time, fetch weather reports, and perform automated tasks.',
    date: '2024',
    category: 'Android & Kotlin',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    style: 'film-horizontal' // Horizontal film strip layout
  },
  {
    id: 7,
    title: 'Movie Ticket Booking System',
    description: 'A full-stack web application built on the MERN stack (MongoDB, Express, React, Node.js) featuring user authentication, cinema listings, showtime scheduling, interactive seat selection, and a robust admin management panel.',
    date: '2024',
    category: 'MERN Stack',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    style: 'ticket-stub' // Ticket stub layout with barcode
  }
];

const ProjectCard = ({ project }: { project: any }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const isMockup = project.image.startsWith('/') || project.image.includes('recruitment') || project.image.includes('cabzee');

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        flexShrink: 0,
        width: 'min(85vw, 440px)',
        height: isHovered ? '500px' : '320px',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%), rgba(22, 22, 26, 0.55)', // 6/10 glassy: medium dark tint with subtle reflection
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '24px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: isHovered
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          : '0 15px 35px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        transition: 'height 0.5s cubic-bezier(0.25, 1, 0.3, 1), transform 0.5s cubic-bezier(0.25, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.25, 1, 0.3, 1)',
        transform: isHovered ? 'scale(1.02) translateY(-5px)' : 'scale(1) translateY(0)',
        cursor: 'pointer'
      }}
    >
      {/* Ambient background from the image itself to give the glass something to blur */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        backgroundImage: `url("${project.image}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(30px) brightness(0.6)',
        transform: 'scale(1.2)', // prevent blur bleeding edges
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }} />

      {/* Photo / Image Section */}
      <div style={{
        flexShrink: 0,
        width: '100%',
        height: isHovered ? '250px' : '320px',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
        transition: 'height 0.5s cubic-bezier(0.25, 1, 0.3, 1)',
      }}>
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: project.image.includes('cabzee') ? 'left center' : 'center',
            transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.3, 1)',
            transform: isHovered ? 'scale(1.06)' : 'scale(1)'
          }}
        />
        {/* Soft dark overlay in normal state */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.3) 100%)',
          opacity: isHovered ? 0 : 1,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none'
        }} />
      </div>

      {/* Content / Details Section */}
      <div style={{
        flexShrink: 0,
        width: '100%',
        height: '250px',
        zIndex: 2,
        background: 'rgba(20, 20, 25, 0.4)', // Semi-transparent so the ambient light shines through
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '24px 32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        boxSizing: 'border-box',
        transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.3, 1), opacity 0.4s ease',
        transform: isHovered ? 'translateY(0)' : 'translateY(50px)',
        opacity: isHovered ? 1 : 0,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
          {/* Top row: Project Title & Category */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', marginBottom: '12px' }}>
            <h3 style={{
              fontSize: '1.4rem',
              fontWeight: 700,
              color: 'var(--color-text)',
              margin: 0,
              textAlign: 'left',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              {project.title}
            </h3>
            <div style={{
              display: 'inline-block',
              fontSize: '0.75rem',
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 700,
              fontFamily: 'monospace',
              padding: '4px 0',
              backgroundColor: 'transparent',
              whiteSpace: 'nowrap',
              marginLeft: '12px'
            }}>
              {project.category}
            </div>
          </div>

          {/* Project Description */}
          <p style={{
            fontSize: '0.85rem',
            color: 'var(--color-text-muted)',
            lineHeight: '1.45',
            margin: '0 0 16px 0',
            textAlign: 'left',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            {project.description}
          </p>

          {/* Spacer to push button to bottom */}
          <div style={{ flexGrow: 1 }} />

          {/* Visit Button */}
          <div
            onClick={() => {
              // Wait for the flip animation to finish before opening the site
              setTimeout(() => {
                window.open(project.link || '#', '_blank');
              }, 600);
            }}
            style={{ width: '100%', textDecoration: 'none' }}
          >
            <FlipButton text1="Launch Site" text2="Launch Site" />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedProjects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollRef.current;
    if (!section || !scrollContainer) return;

    // Use the parent .section-scroll-wrapper for ScrollTrigger if available
    const triggerElement = section.closest('.section-scroll-wrapper') || section;

    // Pinning is handled by CSS sticky, so we set pin: false and end: 'bottom bottom'
    const scrollTween = gsap.to(scrollContainer, {
      x: () => -(scrollContainer.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: triggerElement,
        pin: false,
        scrub: 0.6,
        start: 'top top',
        end: 'bottom bottom',
        invalidateOnRefresh: true,
      }
    });

    // Translate horizontal swipe gestures to vertical scroll so Lenis advances the carousel
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        const lenis = (window as any).lenis;
        if (lenis) {
          lenis.scrollBy(e.deltaX);
        } else {
          window.scrollBy(0, e.deltaX);
        }
      }
    };

    section.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      scrollTween.scrollTrigger?.kill();
      scrollTween.kill();
      section.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      id="projects-grid"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center'
      }}
    >

      {/* 2. Horizontally Scrolling Track */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          height: '100%',
          paddingLeft: 'min(10vw, 150px)', // Large padding to center first card
          paddingRight: 'min(10vw, 150px)',
          gap: 'min(6vw, 50px)',
          willChange: 'transform'
        }}
      >
        {/* Section Heading at the left of the scroll track */}
        <div style={{
          flexShrink: 0,
          width: 'min(70vw, 300px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          color: '#fff',
          fontFamily: 'monospace'
        }}>
          <h2 style={{ fontSize: '2.8rem', fontWeight: 900, lineHeight: '1.05', letterSpacing: '-0.02em', margin: 0 }}>
            FEATURED<br />PROJECTS
          </h2>
        </div>

        {/* Map project items */}
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProjects;
