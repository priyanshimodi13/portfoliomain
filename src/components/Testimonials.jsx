import { TESTIMONIALS } from '../utils/constants'
import './Testimonials.css'

export default function Testimonials() {
  return (
    <section className="testimonials section">
      <div className="container">
        <div className="testi__header">
          <span className="section-label">Testimonials</span>
          <h2 className="text-display">What clients <br/> are saying.</h2>
        </div>
        
        <div className="testi__grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.id} className="testi-card">
              <div className="testi-card__quote-icon">“</div>
              <p className="testi-card__text">{t.quote}</p>
              <div className="testi-card__author-info">
                <p className="testi-card__name">{t.author}</p>
                <p className="testi-card__role">{t.service}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
