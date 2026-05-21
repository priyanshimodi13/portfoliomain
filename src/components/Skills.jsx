import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { SERVICES } from '../utils/constants'
import './Skills.css'

export default function Skills() {
  const [open, setOpen] = useState(0)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // 3D Parallax Rotation - More dramatic for 'Perfect' feel
  const rY = useTransform(scrollYProgress, [0, 1], [-45, 15])
  const rX = useTransform(scrollYProgress, [0, 1], [30, -15])
  const y = useTransform(scrollYProgress, [0, 1], [-80, 80])

  const smoothRY = useSpring(rY, { stiffness: 100, damping: 30 })
  const smoothRX = useSpring(rX, { stiffness: 100, damping: 30 })
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

  const toggle = (i) => setOpen(open === i ? null : i)

  return (
    <section className="skills section" id="services" ref={containerRef}>
      <div className="container">
        <div className="skills__header">
          <span className="section-label">Expertise</span>
          <h2 className="text-display">What I can do <br/> for you.</h2>
        </div>

        <div className="skills__layout">
          <div className="skills__list">
            {SERVICES.map((s, i) => (
              <div 
                key={s.id} 
                className={`skills__item ${open === i ? 'is-open' : ''}`}
              >
                <button className="skills__trigger" onClick={() => toggle(i)}>
                  <span className="skills__number">{s.id}</span>
                  <span className="skills__title">{s.title}</span>
                  <div className="skills__plus">
                     <div className="plus-h" />
                     <motion.div 
                        className="plus-v" 
                        animate={{ rotate: open === i ? 90 : 0 }}
                     />
                  </div>
                </button>
                
                <motion.div 
                  className="skills__body"
                  initial={false}
                  animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                >
                  <div className="skills__inner">
                    <p className="text-body">{s.description}</p>
                    <div className="skills__tags">
                       {s.skills.map(tag => <span key={tag} className="skill-tag">{tag}</span>)}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          <div className="skills__visual-wrap">
            <motion.div 
              className="skills__3d-card"
              style={{
                rotateY: smoothRY,
                rotateX: smoothRX,
                y: smoothY,
                transformPerspective: 1000
              }}
            >
              <img 
                src="https://framerusercontent.com/images/xmKml0E7v2iBI4zbbj0yVccaQwg.jpeg" 
                alt="Services Visual" 
                className="skills__3d-img"
              />
              <div className="skills__3d-overlay">
                 <span>Expertise Focus</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
