import { AWARDS } from '../utils/constants'
import './Awards.css'

export default function Awards() {
  return (
    <section className="awards section">
      <div className="container">
        <div className="awards__header">
          <p className="section-label">Recognition</p>
          <h2 className="text-heading">Awards & Mentions</h2>
        </div>
        <div className="awards__grid">
          {AWARDS.map((a, i) => (
            <div key={i} className="awards__item">
              <span className="awards__date">{a.date}</span>
              <span className="awards__title">{a.title}</span>
              <span className="awards__platform">{a.platform}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
