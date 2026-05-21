import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { PERSON } from '../utils/constants'
import './Hero.css'

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Multi-layered parallax per Site DNA
  const yLine1 = useTransform(scrollYProgress, [0, 1], [0, 150]) // 0.1x approx
  const yLine2 = useTransform(scrollYProgress, [0, 1], [0, 300]) // 0.2x approx
  const yLine3 = useTransform(scrollYProgress, [0, 1], [0, 450]) // 0.3x approx
  
  const yBio = useTransform(scrollYProgress, [0, 1], [0, 150]) // Moves slower
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  const smoothY1 = useSpring(yLine1, { stiffness: 100, damping: 30 })
  const smoothY2 = useSpring(yLine2, { stiffness: 100, damping: 30 })
  const smoothY3 = useSpring(yLine3, { stiffness: 100, damping: 30 })
  const smoothYBio = useSpring(yBio, { stiffness: 100, damping: 30 })

  return (
    <section className="hero" ref={containerRef} id="home">
      <div className="container">
        <div className="hero__content">
          <motion.div 
            className="hero__badge-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
             <div className="available-badge">
                <span className="avail-dot" />
                Available for work
             </div>
          </motion.div>
          
          <h1 className="text-hero hero__title">
            <motion.span 
              className="hero__line" 
              style={{ y: smoothY1, opacity }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0 }}
            >
              Duncan Robert
            </motion.span>
            <motion.span 
              className="hero__line hero__line--alt" 
              style={{ y: smoothY2, opacity }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Digital
            </motion.span>
            <motion.span 
              className="hero__line" 
              style={{ y: smoothY3, opacity }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Designer
            </motion.span>
          </h1>
          
          <div className="hero__footer">
            <motion.div className="hero__bio" style={{ y: smoothYBio, opacity }}>
              <p className="text-body">{PERSON.tagline}</p>
            </motion.div>
            
            <motion.div className="hero__scroll-callout" style={{ opacity }}>
              <span className="scroll-text">Scroll to explore</span>
              <div className="scroll-line" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
