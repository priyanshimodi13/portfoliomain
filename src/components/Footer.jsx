import { PERSON } from '../utils/constants'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer section">
      <div className="container">
        <div className="footer__top">
          <h2 className="footer__cta text-display">Let's build something <br/> extraordinary.</h2>
          <a href={`mailto:${PERSON.email}`} className="footer__email">{PERSON.email}</a>
        </div>
        
        <div className="footer__bottom">
          <div className="footer__brand">
            <span className="footer__logo">{PERSON.name} © 2026</span>
          </div>
          <div className="footer__socials">
             {Object.entries(PERSON.social).map(([key, url]) => (
               <a key={key} href={url} target="_blank" rel="noreferrer">{key}</a>
             ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
