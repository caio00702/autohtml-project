import { Routes, Route } from 'react-router-dom'
import { HomeDesktop } from './pages/HomeDesktop/HomeDesktop'
import { MovieDetails } from './pages/MovieDetails/MovieDetails'
import { GlobalStyle } from './styles/global'

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomeDesktop />} />
        <Route path="/video/:id" element={<MovieDetails />} />
      </Routes>
    </>
  )
}

export default App
