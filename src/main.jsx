import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { MoviesProvider } from './contexts/MoviesContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/autohtml-project">
      <MoviesProvider>
        <App />
      </MoviesProvider>
    </BrowserRouter>
  </React.StrictMode>,
) 