import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'
import { MoviesProvider } from './contexts/MoviesContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <MoviesProvider>
        <App />
      </MoviesProvider>
    </HashRouter>
  </React.StrictMode>,
) 