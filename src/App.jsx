import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { MoviesProvider } from './contexts/MoviesContext';
import { HomeDesktop } from './HomeDesktop/HomeDesktop';
import { MovieDetails } from './pages/MovieDetails/MovieDetails';
import { theme } from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <MoviesProvider>
          <Routes>
            <Route path="/" element={<HomeDesktop />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </MoviesProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
