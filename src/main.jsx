import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Manifesto from './Manifesto.jsx'
import CaseDetails from './CaseDetails.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/manifesto" element={<Manifesto />} />
        <Route path="/eset/:slug" element={<CaseDetails />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
) 