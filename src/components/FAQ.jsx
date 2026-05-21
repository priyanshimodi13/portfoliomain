import { useState } from 'react'
import { FAQS } from '../utils/constants'
import './FAQ.css'

export default function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <section className="faq section" id="faq">
      <div className="container">
        <div className="faq__header">
          <p className="section-label">Help</p>
          <h2 className="text-heading">Common Questions</h2>
        </div>
        <div className="faq__list">
          {FAQS.map((f, i) => (
            <div key={f.id} className={`faq__item ${open === i ? 'open' : ''}`}>
              <button className="faq__question" onClick={() => setOpen(open === i ? null : i)}>
                {f.question}
              </button>
              {open === i && <p className="faq__answer text-body">{f.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
