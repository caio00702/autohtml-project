import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { VideoModal } from '../VideoModal/VideoModal';
import { CategoryImage } from '../CategoryImage/CategoryImage';

const Card = styled(motion.div)`
  width: 432px;
  position: relative;
  margin-bottom: 32px;
`;

const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 4px 4px 0 0;
  border: 4px solid ${props => props.categoryColor};
  border-bottom: none;
  overflow: hidden;
  box-shadow: inset 0px 0px 17px 8px rgba(107, 209, 255, 0.4);
`;

const ButtonsContainer = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.8);
`;

const Button = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.grayLight};
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  img {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${props => props.categoryColor};
  }
`;

export const MovieCard = ({ movie, categoryColor, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja deletar este vídeo?')) {
      onDelete(movie.id);
    }
  };

  const handleSave = (updatedData) => {
    onEdit(movie.id, updatedData);
    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        categoryColor={categoryColor}
      >
        <Link to={`/movie/${movie.id}`}>
          <ImageContainer>
            <CategoryImage 
              category={movie.category}
              alt={movie.title}
            />
          </ImageContainer>
        </Link>
        <ButtonsContainer>
          <Button 
            categoryColor={categoryColor}
            onClick={handleDelete}
          >
            <img src="/public/icons/delete.svg" alt="Deletar" />
            Deletar
          </Button>
          <Button 
            categoryColor={categoryColor}
            onClick={handleEdit}
          >
            <img src="/public/icons/edit.svg" alt="Editar" />
            Editar
          </Button>
        </ButtonsContainer>
      </Card>

      <VideoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={movie}
      />
    </>
  );
}; 