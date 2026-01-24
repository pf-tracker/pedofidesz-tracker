import { Link } from 'react-router-dom'
import { Calendar, ExternalLink, Tag } from 'lucide-react'

function ArticleCard({ article, relatedCase }) {
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

  return (
    <article className="article-card">
      <div className="article-header">
        <Link to={`/cikk/${article.slug}`} className="article-title-link">
          <h2 className="article-title">{article.title}</h2>
        </Link>
        <div className="article-date">
          <Calendar size={14} />
          <span>{formatDate(article.date)}</span>
        </div>
      </div>

      {article.partyAffiliation && (
        <div className="article-party">
          <Tag size={14} style={{ color: getPartyColor(article.partyAffiliation) }} />
          <span style={{ color: getPartyColor(article.partyAffiliation) }}>
            {article.partyAffiliation.toUpperCase()}
          </span>
        </div>
      )}

      {relatedCase && (
        <div className="article-related-case">
          <Link to={`/botrany/${relatedCase.detailsSlug || relatedCase.id}`} className="related-case-link">
            Kapcsolódó botrány: {relatedCase.title}
          </Link>
        </div>
      )}

      <p className="article-summary">{article.summary}</p>

      <div className="article-actions">
        <Link to={`/cikk/${article.slug}`} className="article-link">
          Teljes cikk olvasása →
        </Link>
        {article.sourceUrl && (
          <a 
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="article-source-link"
          >
            <ExternalLink size={16} />
            Forrás
          </a>
        )}
      </div>
    </article>
  )
}

export default ArticleCard

