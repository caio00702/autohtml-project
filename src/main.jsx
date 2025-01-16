import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { HashRouter } from 'react-router-dom'
import { MoviesProvider } from './contexts/MoviesContext'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import { GlobalStyle } from './styles/global'
import './vars.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <MoviesProvider>
          <App />
        </MoviesProvider>
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>,
) 