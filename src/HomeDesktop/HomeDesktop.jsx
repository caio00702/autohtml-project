import { useState } from 'react';
import { Header } from '../components/Header/Header';
import { Category } from '../components/Category/Category';
import { Banner } from '../components/Banner/Banner';
import styled from 'styled-components';
import { useMovies } from '../contexts/MoviesContext';
import { NewVideoModal } from '../components/NewVideoModal/NewVideoModal';

console.log("HomeDesktop sendo renderizado");

const Container = styled.div`
  background: var(--color-black-dark);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px 60px;
  width: 100%;
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin-top: 48px;
`;

const EmptyMessage = styled.p`
  color: var(--color-gray-light);
  text-align: center;
  font-size: 18px;
  margin-top: 48px;
`;

export const HomeDesktop = () => {
  const [isNewVideoModalOpen, setIsNewVideoModalOpen] = useState(false);
  const { movies, addMovie, updateMovie, deleteMovie } = useMovies();

  const featuredVideo = movies.find(video => video.id === "1");
  const otherMovies = movies.filter(video => video.id !== "1");

  const moviesByCategory = otherMovies.reduce((acc, movie) => {
    const category = (movie.category || 'outros').toLowerCase();
    if (!acc[category]) {
      acc[category] = [];
    }
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
          <EmptyMessage>Nenhum vídeo encontrado. Adicione um novo vídeo!</EmptyMessage>
        ) : (
          <CategoriesContainer>
            {Object.entries(moviesByCategory).map(([category, categoryMovies]) => (
              <Category
                key={category}
                title={category.toUpperCase()}
                color={getCategoryColor(category)}
                videos={categoryMovies}
                onUpdateVideo={updateMovie}
                onDeleteVideo={deleteMovie}
              />
            ))}
          </CategoriesContainer>
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
