import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navigation.css'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = ['Home', 'About', 'Services', 'Projects', 'Contact']

  return (
    <nav className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav__container">
        <div className="nav__logo">
           <span>DR</span>
        </div>
        
        <div className="nav__links">
          {navItems.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="nav__link"
            >
              {item}
            </a>
          ))}
        </div>
        
        <button className="nav__cta">Let's Talk</button>
      </div>
    </nav>
  )
}
