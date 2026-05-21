import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { PROJECTS } from '../utils/constants'
import './Portfolio.css'

export default function Portfolio() {
  return (
    <section className="portfolio section" id="projects">
      <div className="container">
        <div className="portfolio__header">
          <span className="section-label">Selected Works</span>
          <h2 className="text-display">Featured <br/> Projects.</h2>
        </div>

        <div className="portfolio__list">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  // Stronger parallax range for the "sliding window" effect
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

  return (
    <motion.div 
      className="project-card" 
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="project-card__visual">
        <motion.img 
          src={project.image} 
          alt={project.title} 
          className="project-card__img"
          style={{ y: smoothY }}
        />
        <div className="project-card__overlay">
           <span className="project-card__cat">{project.category}</span>
        </div>
      </div>
      
      <div className="project-card__content">
        <h3 className="text-heading project-card__title">{project.title}</h3>
        <p className="text-body project-card__desc">{project.description}</p>
        <a href="#" className="project-card__link">View Case Study →</a>
      </div>
    </motion.div>
  )
}
