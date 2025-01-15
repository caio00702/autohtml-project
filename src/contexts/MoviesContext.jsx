import { createContext, useContext, useState, useMemo } from 'react';
import { videos as initialVideos } from '../data/videos';

const MoviesContext = createContext({});

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState(initialVideos);

  const addMovie = (newMovie) => {
    setMovies(prevMovies => [
      ...prevMovies,
      {
        ...newMovie,
        id: String(Date.now()),
        category: newMovie.category.toLowerCase()
      }
    ]);
  };

  const updateMovie = (id, updatedMovie) => {
    setMovies(prevMovies => 
      prevMovies.map(movie => 
        movie.id === id ? { ...movie, ...updatedMovie } : movie
      )
    );
  };

  const deleteMovie = (id) => {
    setMovies(prevMovies => prevMovies.filter(movie => movie.id !== id));
  };

  const contextValue = useMemo(() => ({
    movies,
    addMovie,
    updateMovie,
    deleteMovie
  }), [movies]);

  return (
    <MoviesContext.Provider value={contextValue}>
      {children}
    </MoviesContext.Provider>
  );
};

export function useMovies() {
  return useContext(MoviesContext);
} 