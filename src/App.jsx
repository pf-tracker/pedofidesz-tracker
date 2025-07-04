import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, User, MapPin, Calendar, AlertTriangle, MessageCircle, FileText } from 'lucide-react'
import { getRedditDmUrl } from './config.js'

function App() {
  const [cases, setCases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadCases()
  }, [])

  const loadCases = async () => {
    try {
      setLoading(true)
      const response = await fetch('/data/cases.json')
      if (!response.ok) {
        throw new Error('Nem sikerült betölteni az adatokat')
      }
      const data = await response.json()
      setCases(data.cases || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('hu-HU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getUniquePerpetrators = () => {
    const perpetrators = cases.map(c => c.perpetrator).filter(p => p !== 'Ismeretlen')
    return [...new Set(perpetrators)].length
  }

  const getUniqueLocations = () => {
    const locations = cases.map(c => c.location).filter(l => l !== 'Ismeretlen')
    return [...new Set(locations)].length
  }

  if (loading) {
    return (
      <div className="loading">
        <div>Betöltés...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div className="empty-state">
          <AlertTriangle size={48} />
          <h3>Hiba történt</h3>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <header className="header">
        <div className="container">
          <h1>Pedofidesz Tracker</h1>
          <p>Fidesz pedofil botrányok kronológikus nyilvántartása</p>
          <div className="header-actions">
            <Link 
              to="/manifesto"
              className="manifesto-link"
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
          </div>
        </div>
      </header>

      <main className="container">
        <div className="stats">
          <div className="stat-card">
            <div className="stat-number">{cases.length}</div>
            <div className="stat-label">Összes botrány</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{getUniquePerpetrators()}</div>
            <div className="stat-label">Eltérő elkövető</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{getUniqueLocations()}</div>
            <div className="stat-label">Eltérő helyszín</div>
          </div>
        </div>

        {cases.length === 0 ? (
          <div className="empty-state">
            <h3>Még nincs botrány nyilvántartva</h3>
            <p>Használd a CLI tool-t új események hozzáadásához</p>
          </div>
        ) : (
          <div className="cases-grid">
            {cases.map((case_) => (
              <article key={case_.id} className="case-card">
                <div className="case-header">
                  {case_.hasDetails ? (
                    <Link to={`/eset/${case_.detailsSlug}`} className="case-title-link">
                      <h2 className="case-title">{case_.title}</h2>
                    </Link>
                  ) : (
                    <h2 className="case-title">{case_.title}</h2>
                  )}
                  <div className="case-date">{formatDate(case_.date)}</div>
                </div>
                
                <div className="case-meta">
                  <div className="meta-item">
                    <User size={16} />
                    <span>{case_.perpetrator}</span>
                  </div>
                  <div className="meta-item">
                    <MapPin size={16} />
                    <span>{case_.location}</span>
                  </div>
                  <div className="meta-item">
                    <Calendar size={16} />
                    <span>Hozzáadva: {formatDate(case_.addedAt)}</span>
                  </div>
                </div>
                
                <p className="case-summary">{case_.summary}</p>
                
                <div className="case-actions">
                  {case_.hasDetails && (
                    <Link 
                      to={`/eset/${case_.detailsSlug}`}
                      className="case-link"
                    >
                      <FileText size={16} />
                      Részletek
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            Utolsó frissítés: {cases.length > 0 ? formatDate(cases[0]?.addedAt || new Date()) : 'Nincs adat'}
          </p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
            Ez az oldal a Fidesz pedofil botrányait gyűjti össze kronológiai sorrendben.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App 