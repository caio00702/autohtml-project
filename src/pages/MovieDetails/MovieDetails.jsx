import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useMovies } from '../../contexts/MoviesContext';
import { CategoryImage } from '../../components/CategoryImage/CategoryImage';

const Container = styled.div`
  background: var(--color-black-dark);
  min-height: 100vh;
  padding: 20px;
`;

const Content = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px 0;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: var(--color-gray-light);
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
`;

const VideoInfo = styled.div`
  padding: 20px;
  color: var(--color-gray-light);
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Category = styled.span`
  display: inline-block;
  padding: 4px 12px;
  background: ${props => props.color};
  color: var(--color-black-dark);
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #ccc;
`;

export const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movies } = useMovies();

  const movie = movies.find(m => m.id === id);

  if (!movie) {
    return (
      <Container>
        <Content>
          <BackButton onClick={() => navigate('/')}>
            ← Voltar
          </BackButton>
          <p style={{ color: '#fff', textAlign: 'center' }}>Vídeo não encontrado</p>
        </Content>
      </Container>
    );
  }

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
      <Content>
        <BackButton onClick={() => navigate('/')}>
          ← Voltar
        </BackButton>
        <VideoContainer>
          <ImageContainer>
            <CategoryImage 
              category={movie.category}
              alt={movie.title}
            />
          </ImageContainer>
          <VideoInfo>
            <Title>{movie.title}</Title>
            <Category color={getCategoryColor(movie.category)}>
              {movie.category.toUpperCase()}
            </Category>
            <Description>{movie.description}</Description>
          </VideoInfo>
        </VideoContainer>
      </Content>
    </Container>
  );
}; 