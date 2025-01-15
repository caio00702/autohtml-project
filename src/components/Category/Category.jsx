import styled from 'styled-components';
import { MovieCard } from '../Cards/MovieCard';
import PropTypes from 'prop-types';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h2`
  color: var(--color-gray-light);
  font-size: 35px;
  font-weight: 400;
  padding: 20px 40px;
  background-color: ${props => props.color};
  border-radius: 4px;
  display: inline-block;
  text-transform: uppercase;
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 32px;
  overflow-x: auto;
  padding: 8px 4px;
  
  /* Estilização da barra de rolagem horizontal */
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-frontend);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-blue);
  }
`;

export const Category = ({ title, color, videos, onUpdateVideo, onDeleteVideo }) => {
  return (
    <Container>
      <Title color={color}>{title}</Title>
      <CardsContainer>
        {videos && videos.map(video => (
          <MovieCard
            key={video.id}
            movie={video}
            categoryColor={color}
            onEdit={onUpdateVideo}
            onDelete={onDeleteVideo}
          />
        ))}
      </CardsContainer>
    </Container>
  );
};

Category.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  videos: PropTypes.array.isRequired,
  onUpdateVideo: PropTypes.func.isRequired,
  onDeleteVideo: PropTypes.func.isRequired
};