import styled from 'styled-components';
import { MovieCard } from '../Cards/MovieCard';
import PropTypes from 'prop-types';

const Container = styled.section`
  margin: 40px 0;
`;

const Title = styled.div`
  background-color: ${props => props.color};
  color: var(--color-gray-light);
  padding: 20px 40px;
  font-size: 35px;
  font-weight: bold;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 30px;
  text-transform: uppercase;
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  padding: 0 20px;
`;

export const Category = ({ title, color, videos, onUpdateVideo, onDeleteVideo }) => {
  return (
    <Container>
      <Title color={color}>{title}</Title>
      <CardsContainer>
        {videos.map(video => (
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
  onUpdateVideo: PropTypes.func,
  onDeleteVideo: PropTypes.func
};