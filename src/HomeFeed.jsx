import { useState, useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import Navigation from './Navigation.jsx'
import ArticleCard from './ArticleCard.jsx'

function HomeFeed() {
  const [articles, setArticles] = useState([])
  const [cases, setCases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      
      // Cikkek betöltése
      const articlesResponse = await fetch('/data/articles.json')
      if (!articlesResponse.ok) {
        throw new Error('Nem sikerült betölteni a cikkeket')
      }
      const articlesData = await articlesResponse.json()
      setArticles(articlesData.articles || [])

      // Botrányok betöltése (kapcsolódásokhoz)
      const casesResponse = await fetch('/data/cases.json')
      if (casesResponse.ok) {
        const casesData = await casesResponse.json()
        setCases(casesData.cases || [])
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getRelatedCase = (caseId) => {
    if (!caseId) return null
    return cases.find(c => c.id === caseId) || null
  }

  if (loading) {
    return (
      <div>
        <Navigation />
        <div className="loading">
          <div>Betöltés...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Navigation />
        <div className="container">
          <div className="empty-state">
            <AlertTriangle size={48} />
            <h3>Hiba történt</h3>
            <p>{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navigation />

      <main className="container">
        <div className="page-header">
          <h1>Hirfolyam</h1>
          <p>Legfrissebb hírek és frissítések a Fidesz pedofil botrányairól</p>
        </div>

        {articles.length === 0 ? (
          <div className="empty-state">
            <h3>Még nincs cikk nyilvántartva</h3>
            <p>Az új cikkek hamarosan megjelennek itt.</p>
          </div>
        ) : (
          <div className="articles-feed">
            {articles.map((article) => {
              const relatedCase = getRelatedCase(article.relatedCase)
              return (
                <ArticleCard 
                  key={article.id} 
                  article={article}
                  relatedCase={relatedCase}
                />
              )
            })}
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            Utolsó frissítés: {articles.length > 0 ? new Date(articles[0]?.addedAt || new Date()).toLocaleDateString('hu-HU') : 'Nincs adat'}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default HomeFeed

