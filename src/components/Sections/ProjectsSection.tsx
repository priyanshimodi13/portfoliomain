import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !worldRef.current || !viewportRef.current) return;

    const world = worldRef.current;
    const viewport = viewportRef.current;
    
    // Clear previous elements
    world.innerHTML = '';

    // --- CONFIGURATION ---
    const CONFIG = {
      itemCount: 40, // More items for a longer tunnel
      starCount: 200,
      zGap: 1200,
      loopSize: 0,
      camSpeed: 30000, // Increased to reach more items during scroll
      colors: ['#00F3FF', '#0070FF', '#00C2FF', '#FFFFFF']
    };
    CONFIG.loopSize = CONFIG.itemCount * CONFIG.zGap;

    const TEXTS = [
      "PYTHON DATA", "DJANGO WEB", "RDBMS INTRO", "DATA ANALYTICS", 
      "C/C++ PROG", "INFRA SECURITY", "BLOCKCHAIN", "CYBERSECURITY", 
      "CYBER ESSENTIALS"
    ];

    const CERT_DETAILS = [
      { title: "Python for Data Analysis", issuer: "Coursera", tags: "Pandas, NumPy" },
      { title: "Building Web Apps", issuer: "Coursera", tags: "Django" },
      { title: "Intro to RDBMS", issuer: "Coursera", tags: "Database" },
      { title: "Data Analytics", issuer: "Coursera", tags: "Data Science" },
      { title: "C & C++ Programming", issuer: "Coursera", tags: "Core" },
      { title: "Enterprise Security", issuer: "Coursera", tags: "Infrastructure" },
      { title: "Blockchain Basics", issuer: "Coursera", tags: "Decentralized" },
      { title: "Foundations of Cybersecurity", issuer: "Coursera", tags: "Security" },
      { title: "Cyber Security Essential", issuer: "Coursera", tags: "Network" }
    ];

    // --- STATE ---
    const state = {
      scroll: 0,
      velocity: 0,
      targetSpeed: 0,
      mouseX: 0,
      mouseY: 0
    };

    const items: any[] = [];

    // Create Items — All as Blue Certificate Cards
    for (let i = 0; i < CONFIG.itemCount; i++) {
      const el = document.createElement('div');
      el.className = 'warp-item';

      const card = document.createElement('div');
      card.className = 'warp-card';
      const cert = CERT_DETAILS[i % CERT_DETAILS.length];
      const randId = Math.floor(Math.random() * 9999);
      
      card.innerHTML = `
        <div class="warp-card-header">
          <span class="warp-card-id">CERT-${randId}</span>
          <div style="width: 10px; height: 10px; background: #00f3ff; box-shadow: 0 0 10px #00f3ff;"></div>
        </div>
        <h2 class="warp-card-title">${cert.title}</h2>
        <div class="warp-card-footer">
          <span>ISSUER: ${cert.issuer}</span>
          <span>TAGS: ${cert.tags}</span>
        </div>
        <div style="position:absolute; bottom:2rem; right:2rem; font-size:4rem; opacity:0.05; font-weight:900; color:#00f3ff;">0${i+1}</div>
      `;
      el.appendChild(card);

      const angle = (i / CONFIG.itemCount) * Math.PI * 6;
      const x = Math.cos(angle) * (window.innerWidth * 0.3);
      const y = Math.sin(angle) * (window.innerHeight * 0.3);
      const rot = (Math.random() - 0.5) * 30;

      items.push({
        el, type: 'card',
        x, y, rot,
        baseZ: -i * CONFIG.zGap
      });
      world.appendChild(el);
    }

    // Create Stars
    for (let i = 0; i < CONFIG.starCount; i++) {
      const el = document.createElement('div');
      el.className = 'warp-star';
      world.appendChild(el);
      items.push({
        el, type: 'star',
        x: (Math.random() - 0.5) * 3000,
        y: (Math.random() - 0.5) * 3000,
        baseZ: -Math.random() * CONFIG.loopSize
      });
    }

    // Events
    const handleMouseMove = (e: MouseEvent) => {
      state.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      state.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- SCROLL INTEGRATION ---
    ScrollTrigger.create({
      trigger: containerRef.current?.closest('.section-scroll-wrapper') || containerRef.current,
      start: "top top", // Change to top top since we want it to start progressing when the wrapper hits the top
      end: "bottom bottom", // Change to bottom bottom so it ends when the wrapper finishes scrolling
      onUpdate: (self) => {
        // Use progress (0 to 1) for the tunnel depth
        state.scroll = self.progress;
        state.targetSpeed = self.getVelocity() / 1000;
      }
    });

    // --- RAF LOOP ---
    let animationFrameId: number;

    const raf = (time: number) => {

      // Smooth Velocity & Decay
      state.velocity += (state.targetSpeed - state.velocity) * 0.1;
      state.targetSpeed *= 0.92; // Decay the target speed



      // 1. Camera Tilt
      const tiltX = state.mouseY * 5 - state.velocity * 0.5;
      const tiltY = state.mouseX * 5;

      world.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

      // 2. Dynamic Perspective
      const baseFov = 1000;
      const fov = baseFov - Math.min(Math.abs(state.velocity) * 10, 600);
      viewport.style.perspective = `${fov}px`;

      // 4. Item Loop
      // Use state.scroll (progress) scaled by speed
      const cameraZ = state.scroll * CONFIG.camSpeed;

      items.forEach(item => {
        let relZ = item.baseZ + cameraZ;
        const modC = CONFIG.loopSize;
        let vizZ = ((relZ % modC) + modC) % modC;
        if (vizZ > 500) vizZ -= modC;

        let alpha = 1;
        if (vizZ < -3000) alpha = 0;
        else if (vizZ < -2000) alpha = (vizZ + 3000) / 1000;
        
        if (vizZ > 100 && item.type !== 'star') alpha = 1 - ((vizZ - 100) / 400);
        if (alpha < 0) alpha = 0;

        item.el.style.opacity = alpha;

        if (alpha > 0) {
          let trans = `translate3d(${item.x}px, ${item.y}px, ${vizZ}px)`;

          if (item.type === 'star') {
            const stretch = Math.max(1, Math.min(1 + Math.abs(state.velocity) * 0.1, 10));
            trans += ` scale3d(1, 1, ${stretch})`;
          } else if (item.type === 'text') {
            trans += ` rotateZ(${item.rot}deg)`;
            if (Math.abs(state.velocity) > 1) {
              const offset = state.velocity * 2;
              item.el.style.textShadow = `${offset}px 0 red, ${-offset}px 0 cyan`;
            } else {
              item.el.style.textShadow = 'none';
            }
          } else {
            const t = time * 0.001;
            const float = Math.sin(t + item.x) * 10;
            trans += ` rotateZ(${item.rot}deg) rotateY(${float}deg)`;
          }

          item.el.style.transform = trans;
        }
      });

      animationFrameId = requestAnimationFrame(raf);
    };
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      ScrollTrigger.getAll().filter(st => st.trigger === containerRef.current?.parentElement).forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={containerRef} id="projects" className="warp-section">
      <div className="section-title-container">
        <h2 className="section-title">CERTIFICATES</h2>
      </div>
      <div id="viewport" ref={viewportRef} className="warp-viewport">
        <div id="world" ref={worldRef} className="warp-world"></div>
      </div>



      <style>{`
        .warp-section {
          height: 100vh;
          width: 100%;
          background: transparent;
          position: relative;
          overflow: hidden;
          color: #fff;
        }

        .section-title-container {
          position: absolute;
          top: 75px;
          left: 0;
          width: 100%;
          text-align: center;
          z-index: 10;
          pointer-events: none;
        }

        .section-title {
          font-size: 3rem;
          font-weight: 800;
          color: #00f3ff;
          letter-spacing: 0.05em;
          text-shadow: 0 0 20px rgba(0, 243, 255, 0.3);
          margin: 0;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem;
          }
          .section-title-container {
            top: 68px;
          }
        }

        .warp-viewport {
          width: 100%;
          height: 100%;
          perspective: 1000px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .warp-world {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
        }

        .warp-item {
          position: absolute;
          top: 50%;
          left: 50%;
          transform-style: preserve-3d;
        }

        .warp-star {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 2px;
          height: 2px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 10px #fff;
          pointer-events: none;
        }

        .warp-big-text {
          font-size: 15vw;
          font-weight: 900;
          letter-spacing: -0.05em;
          color: transparent;
          -webkit-text-stroke: 2px rgba(255,255,255,0.2);
          transform: translate(-50%, -50%);
          white-space: nowrap;
        }

        .warp-card {
          width: 420px;
          height: 260px;
          background: rgba(0, 112, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1.5px solid rgba(0, 243, 255, 0.3);
          padding: 30px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transform: translate(-50%, -50%);
          position: relative;
          box-shadow: 0 0 30px rgba(0, 243, 255, 0.1);
          border-radius: 4px;
        }

        .warp-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: linear-gradient(135deg, rgba(0, 243, 255, 0.1) 0%, transparent 100%);
          pointer-events: none;
        }

        .warp-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: monospace;
          color: #00f3ff;
          font-size: 0.9rem;
          letter-spacing: 0.1em;
        }

        .warp-card-title {
          font-size: 2.2rem;
          margin: 0;
          font-weight: 800;
          color: #fff;
          text-shadow: 0 0 10px rgba(255,255,255,0.3);
        }

        .warp-card-footer {
          display: flex;
          justify-content: space-between;
          font-family: monospace;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.5);
        }

      `}</style>
    </section>
  );
};

export default ProjectsSection;
