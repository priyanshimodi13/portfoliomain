import { PERSON } from '../utils/constants'
import './Contact.css'

export default function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="contact__inner">
          <div className="contact__header">
             <span className="section-label">Contact</span>
             <h2 className="text-hero contact__title">Let's build <br/> something <br/> impactful <br/> together.</h2>
          </div>
          
          <div className="contact__footer">
             <div className="contact__links">
                <div className="contact__link-item">
                   <span className="contact__link-label">Email me</span>
                   <a href={`mailto:${PERSON.email}`} className="contact__link-value">{PERSON.email}</a>
                </div>
                <div className="contact__link-item">
                   <span className="contact__link-label">Call me</span>
                   <a href={`tel:${PERSON.phone}`} className="contact__link-value">{PERSON.phone}</a>
                </div>
             </div>
             
             <div className="contact__socials">
                <span className="contact__link-label">Follow me</span>
                <div className="social-links">
                   {Object.entries(PERSON.social).map(([name, url]) => (
                     <a key={name} href={url} target="_blank" rel="noreferrer" className="social-link">
                        {name}
                     </a>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
