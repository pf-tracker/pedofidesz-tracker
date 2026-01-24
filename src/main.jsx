import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeFeed from './HomeFeed.jsx'
import CasesList from './CasesList.jsx'
import Manifesto from './Manifesto.jsx'
import CaseDetails from './CaseDetails.jsx'
import ArticleDetails from './ArticleDetails.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeFeed />} />
        <Route path="/botranyok" element={<CasesList />} />
        <Route path="/botrany/:slug" element={<CaseDetails />} />
        <Route path="/cikk/:slug" element={<ArticleDetails />} />
        <Route path="/manifesto" element={<Manifesto />} />
        {/* Backward compatibility */}
        <Route path="/eset/:slug" element={<CaseDetails />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
) 