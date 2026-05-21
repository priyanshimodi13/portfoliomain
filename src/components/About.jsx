import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { PERSON, STATS } from '../utils/constants'
import './About.css'

export default function About() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const grayscale = useTransform(scrollYProgress, [0.2, 0.5], [1, 0])
  const smoothGrayscale = useSpring(grayscale, { stiffness: 100, damping: 30 })

  return (
    <section className="about section" id="about" ref={containerRef}>
      <div className="container">
        <div className="about__grid">
          <div className="about__content">
            <span className="section-label">My Story</span>
            <h2 className="text-display about__title">Designing with <br/> purpose and <br/> passion.</h2>
            
            <div className="about__bio-wrap">
              <p className="text-body about__bio">{PERSON.bio}</p>
            </div>
            
            <div className="about__stats">
              {STATS.map((s, i) => (
                <div key={i} className="stat-item">
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          <motion.div className="about__visual" style={{ y }}>
             <div className="about__image-container">
                <motion.img 
                  src="https://framerusercontent.com/images/qrxY8NagVO40NBrdhFEGgFR3PYY.jpg" 
                  alt="Duncan Robert" 
                  className="about__img"
                  style={{ filter: useTransform(smoothGrayscale, v => `grayscale(${v})`) }}
                />
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
