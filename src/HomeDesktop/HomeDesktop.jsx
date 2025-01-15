import { useState } from 'react';
import { Header } from '../components/Header/Header';
import { Category } from '../components/Category/Category';
import { Banner } from '../components/Banner/Banner';
import styled from 'styled-components';
import { useMovies } from '../contexts/MoviesContext';
import { NewVideoModal } from '../components/NewVideoModal/NewVideoModal';

const Container = styled.div`
  background: var(--color-black-dark);
  min-height: 100vh;
`;

const Content = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px 60px;
`;

export const HomeDesktop = () => {
  const [isNewVideoModalOpen, setIsNewVideoModalOpen] = useState(false);
  const { movies, addMovie, updateMovie, deleteMovie } = useMovies();

  const featuredVideo = movies.find(video => video.id === "1");

  // Filtra o vídeo em destaque dos outros vídeos
  const otherMovies = movies.filter(video => video.id !== "1");

  const moviesByCategory = otherMovies.reduce((acc, movie) => {
    const category = (movie.category || 'outros').toLowerCase();
    if (!acc[category]) {
      acc[category] = [];
    }
    // Verifica se o vídeo já existe na categoria antes de adicionar
    if (!acc[category].some(m => m.id === movie.id)) {
      acc[category].push(movie);
    }
    return acc;
  }, {});

  const getCategoryColor = (category) => {
    const colors = {
      frontend: '#6BD1FF',
      backend: '#00C86F',
      mobile: '#FFBA05',
      outros: '#9CD33B'
    };
    return colors[category] || colors.outros;
  };

  return (
    <Container>
      <Header onNewVideo={() => setIsNewVideoModalOpen(true)} />
      {featuredVideo && (
        <Banner 
          video={featuredVideo}
          color={getCategoryColor(featuredVideo.category)}
        />
      )}
      <Content>
        {movies.length === 0 ? (
          <p style={{ color: '#fff' }}>Nenhum vídeo encontrado. Adicione um novo vídeo!</p>
        ) : (
          Object.entries(moviesByCategory).map(([category, categoryMovies]) => (
            <Category
              key={category}
              title={category.toUpperCase()}
              color={getCategoryColor(category)}
              videos={categoryMovies}
              onUpdateVideo={updateMovie}
              onDeleteVideo={deleteMovie}
            />
          ))
        )}
      </Content>

      <NewVideoModal
        isOpen={isNewVideoModalOpen}
        onClose={() => setIsNewVideoModalOpen(false)}
        onVideoAdded={addMovie}
      />
    </Container>
  );
};
