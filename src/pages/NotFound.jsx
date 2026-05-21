import { PERSON } from '../utils/constants'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound__content">
        <span className="notfound__code">404</span>
        <h1 className="notfound__title">Page not found</h1>
        <a href="/" className="btn btn-primary">Back to Portfolio</a>
      </div>
    </div>
  )
}
