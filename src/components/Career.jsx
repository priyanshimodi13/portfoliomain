import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CAREER } from '../utils/constants'
import './Career.css'

export default function Career() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  return (
    <section className="career section" id="career" ref={containerRef}>
      <div className="container">
        <div className="career__header">
          <p className="section-label">Experience</p>
          <h2 className="text-heading">Career Journey</h2>
        </div>
        
        <div className="career__list">
          {CAREER.map((job, i) => (
            <motion.div 
              key={i} 
              className="career__item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="career__years">{job.years}</div>
              <div className="career__info">
                <h3 className="career__title">{job.title}</h3>
                <p className="career__company">{job.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
