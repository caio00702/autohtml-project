import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'
import { MoviesProvider } from './contexts/MoviesContext'
import { ThemeProvider } from 'styled-components'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter basename="/">
      <ThemeProvider theme={{}}>
        <MoviesProvider>
          <App />
        </MoviesProvider>
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>,
) 