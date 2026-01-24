import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, User, MapPin, Calendar, ExternalLink, AlertTriangle, FileText } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import Navigation from './Navigation.jsx'
import ArticleCard from './ArticleCard.jsx'

function CaseDetails() {
  const { slug } = useParams()
  const [caseData, setCaseData] = useState(null)
  const [markdownContent, setMarkdownContent] = useState('')
  const [relatedArticles, setRelatedArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Forráslista automatikus formázása
  const formatSources = (content) => {
    // Ha van "Sources" szekció, átalakítjuk
    if (content.includes('Sources')) {
      // Megkeressük a Sources szekciót és az összes forrást
      const sourcesMatch = content.match(/Sources\n(.*?)(?:\n\*|$)/s)
      if (sourcesMatch) {
        const sourcesText = sourcesMatch[1]
        
        // Kivonjuk az összes forrást a szövegből
        const sourceRegex = /\[(\d+)\]\s*(.*?)\s*(https?:\/\/[^\s]+)/g
        const sources = []
        let match
        
        while ((match = sourceRegex.exec(sourcesText)) !== null) {
          const [, number, title, url] = match
          // Kivonjuk a domain nevet a címből, ha benne van
          const cleanTitle = title.replace(/\s*-\s*[^\s]+\s*$/, '').trim()
          const domain = new URL(url).hostname
          sources.push(`${sources.length + 1}. [${cleanTitle}](${url}) - ${domain}`)
        }
        
        if (sources.length > 0) {
          const formattedSources = sources.join('\n\n')
          
          // Lecseréljük a régi Sources szekciót az újra
          const newContent = content.replace(
            /Sources\n.*?(?:\n\*|$)/s,
            `---\n\n## Források\n\n${formattedSources}\n\n`
          )
          
          return newContent
        }
      }
    }
    
    return content
  }

  useEffect(() => {
    loadCaseDetails()
  }, [slug])

  const loadCaseDetails = async () => {
    try {
      setLoading(true)
      
      // Esemény adatok betöltése
      const response = await fetch('/data/cases.json')
      if (!response.ok) {
        throw new Error('Nem sikerült betölteni az adatokat')
      }
      const data = await response.json()
      
      // Megfelelő eset keresése slug alapján
      const foundCase = data.cases.find(c => c.detailsSlug === slug)
      if (!foundCase) {
        throw new Error('Eset nem található')
      }
      
      setCaseData(foundCase)
      
      // Markdown tartalom betöltése
      const markdownResponse = await fetch(`/data/details/${slug}.md`)
      if (!markdownResponse.ok) {
        throw new Error('Részletes leírás nem található')
      }
      const markdownText = await markdownResponse.text()
      
      // Forráslista automatikus formázása
      const formattedContent = formatSources(markdownText)
      setMarkdownContent(formattedContent)

      // Kapcsolódó cikkek betöltése
      const articlesResponse = await fetch('/data/articles.json')
      if (articlesResponse.ok) {
        const articlesData = await articlesResponse.json()
        const related = articlesData.articles.filter(a => a.relatedCase === foundCase.id)
        setRelatedArticles(related)
      }
      
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
            <Link to="/botranyok" className="back-link">
              <ArrowLeft size={20} />
              Vissza a botrányokhoz
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
        <div className="case-details-header">
          <Link to="/botranyok" className="back-link">
            <ArrowLeft size={20} />
            Vissza a botrányokhoz
          </Link>
          
          <h1>{caseData.title}</h1>
          
          <div className="case-meta-header">
            <div className="meta-item">
              <User size={16} />
              <span>{caseData.perpetrator}</span>
            </div>
            <div className="meta-item">
              <MapPin size={16} />
              <span>{caseData.location}</span>
            </div>
            <div className="meta-item">
              <Calendar size={16} />
              <span>{formatDate(caseData.date)}</span>
            </div>
          </div>
        </div>

        <div className="case-details-content">
          <div className="markdown-content">
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
          </div>
        </div>

        {relatedArticles.length > 0 && (
          <div className="related-articles-section">
            <h2>
              <FileText size={20} />
              Kapcsolódó cikkek
            </h2>
            <div className="related-articles-list">
              {relatedArticles.map((article) => (
                <ArticleCard 
                  key={article.id} 
                  article={article}
                  relatedCase={caseData}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            Utolsó frissítés: {formatDate(caseData.addedAt)}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default CaseDetails 