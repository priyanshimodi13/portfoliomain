import React from 'react';
import { ScrollVelocity } from '../ui/ScrollVelocity';

const SkillsSection = () => {
  return (
    <section id="skills" style={{ 
      padding: '60px 0 60px 0', 
      backgroundColor: 'transparent',
      backgroundImage: 'none', 
      color: '#fff', 
      overflow: 'hidden', 
      width: '100%', 
      minHeight: 'auto', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      position: 'relative' 
    }}>
      <div className="skills-heading-container">
        <h2 className="skills-heading">SKILLS & TECHNOLOGIES</h2>
      </div>
      
      <div style={{ width: '100%' }}>
        <ScrollVelocity
          texts={['React • TypeScript • Next.js • GSAP • TailwindCSS', 'Node.js • Python • Django • SQL • PostgeSQL']}
          velocity={80}
          className="custom-scroll-text"
        />
      </div>
      
      <style>{`
        .skills-heading-container {
          width: 100%;
          text-align: center;
          margin-bottom: 50px;
        }

        .skills-heading {
          font-size: 3rem;
          font-weight: 800;
          color: #00f3ff;
          letter-spacing: 0.05em;
          text-shadow: 0 0 20px rgba(0, 243, 255, 0.3);
          margin: 0;
          text-transform: uppercase;
        }

        .custom-scroll-text {
          color: #fff;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 768px) {
          .skills-heading-container {
            margin-bottom: 30px;
          }
          .skills-heading {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;
