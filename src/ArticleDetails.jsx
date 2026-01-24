import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, ExternalLink, AlertTriangle, Tag } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import Navigation from './Navigation.jsx'

function ArticleDetails() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [relatedCase, setRelatedCase] = useState(null)
  const [markdownContent, setMarkdownContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadArticleDetails()
  }, [slug])

  const loadArticleDetails = async () => {
    try {
      setLoading(true)
      
      // Cikk adatok betöltése
      const articlesResponse = await fetch('/data/articles.json')
      if (!articlesResponse.ok) {
        throw new Error('Nem sikerült betölteni a cikkeket')
      }
      const articlesData = await articlesResponse.json()
      const foundArticle = articlesData.articles.find(a => a.slug === slug)
      
      if (!foundArticle) {
        throw new Error('Cikk nem található')
      }
      
      setArticle(foundArticle)

      // Kapcsolódó botrány betöltése
      if (foundArticle.relatedCase) {
        const casesResponse = await fetch('/data/cases.json')
        if (casesResponse.ok) {
          const casesData = await casesResponse.json()
          const foundCase = casesData.cases.find(c => c.id === foundArticle.relatedCase)
          setRelatedCase(foundCase || null)
        }
      }

      // Markdown tartalom betöltése
      const markdownResponse = await fetch(`/data/articles/${slug}.md`)
      if (!markdownResponse.ok) {
        throw new Error('Cikk tartalma nem található')
      }
      const markdownText = await markdownResponse.text()
      setMarkdownContent(markdownText)
      
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

  const getPartyColor = (party) => {
    const colors = {
      'fidesz': '#ff6b6b',
      'dk': '#4ecdc4',
      'mszp': '#95e1d3',
      'momentum': '#f38181',
      'lmp': '#a8e6cf'
    }
    return colors[party?.toLowerCase()] || '#888'
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
            <Link to="/" className="back-link">
              <ArrowLeft size={20} />
              Vissza a főoldalra
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navigation />

      <main className="container">
        <div className="article-details-header">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            Vissza a hirfolyamhoz
          </Link>
          
          <h1>{article.title}</h1>
          
          <div className="article-meta-header">
            <div className="meta-item">
              <Calendar size={16} />
              <span>{formatDate(article.date)}</span>
            </div>
            {article.partyAffiliation && (
              <div className="meta-item">
                <Tag size={16} style={{ color: getPartyColor(article.partyAffiliation) }} />
                <span style={{ color: getPartyColor(article.partyAffiliation) }}>
                  {article.partyAffiliation.toUpperCase()}
                </span>
              </div>
            )}
            {relatedCase && (
              <div className="meta-item">
                <Link to={`/botrany/${relatedCase.detailsSlug || relatedCase.id}`} className="related-case-link">
                  Kapcsolódó botrány: {relatedCase.title}
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="article-details-content">
          <div className="markdown-content">
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
          </div>

          {article.sourceUrl && !article.sourceUrl.includes('pedofidesz-tracker') && (
            <div className="article-source">
              <a 
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="article-source-link"
              >
                <ExternalLink size={16} />
                Eredeti cikk megnyitása
              </a>
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            Közzététel: {formatDate(article.publishedAt)}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default ArticleDetails

