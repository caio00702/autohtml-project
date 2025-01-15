import { createContext, useContext, useState, useEffect } from 'react';
import { videosApi } from '../services/api';

const MoviesContext = createContext({});

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const data = await videosApi.getVideos();
      setMovies(data);
    } catch (error) {
      console.error('Erro ao carregar vídeos:', error);
    } finally {
      setLoading(false);
    }
  };

  const addMovie = async (newMovie) => {
    try {
      const addedMovie = await videosApi.addVideo(newMovie);
      setMovies(prev => [...prev, addedMovie]);
      return addedMovie;
    } catch (error) {
      console.error('Erro ao adicionar vídeo:', error);
      throw error;
    }
  };

  const updateMovie = async (id, updatedMovie) => {
    try {
      const updated = await videosApi.updateVideo(id, updatedMovie);
      setMovies(prev => prev.map(movie => 
        movie.id === id ? updated : movie
      ));
      return updated;
    } catch (error) {
      console.error('Erro ao atualizar vídeo:', error);
      throw error;
    }
  };

  const deleteMovie = async (id) => {
    try {
      await videosApi.deleteVideo(id);
      setMovies(prev => prev.filter(movie => movie.id !== id));
    } catch (error) {
      console.error('Erro ao deletar vídeo:', error);
      throw error;
    }
  };

  return (
    <MoviesContext.Provider value={{
      movies,
      loading,
      addMovie,
      updateMovie,
      deleteMovie
    }}>
      {children}
    </MoviesContext.Provider>
  );
};

export function useMovies() {
  return useContext(MoviesContext);
} 