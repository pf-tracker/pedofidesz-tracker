import { Link, useLocation } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { getRedditDmUrl } from './config.js'

function Navigation() {
  const location = useLocation()
  
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="header-title">
            <h1>Pedofidesz Tracker</h1>
            <p>Fidesz pedofil botrányok kronológikus nyilvántartása</p>
          </Link>
          
          <nav className="header-nav">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}
            >
              Főoldal
            </Link>
            <Link 
              to="/botranyok" 
              className={`nav-link ${isActive('/botranyok') ? 'active' : ''}`}
            >
              Botrányok
            </Link>
            <Link 
              to="/manifesto" 
              className={`nav-link ${isActive('/manifesto') ? 'active' : ''}`}
            >
              Manifesztó
            </Link>
            <a 
              href={getRedditDmUrl()}
              target="_blank" 
              rel="noopener noreferrer"
              className="submit-case-link"
            >
              <MessageCircle size={16} />
              Új eset beküldése
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navigation

