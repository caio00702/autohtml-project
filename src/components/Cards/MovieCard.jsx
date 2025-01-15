import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { VideoModal } from '../VideoModal/VideoModal';

const Card = styled(motion.div)`
  width: 432px;
  position: relative;
  margin-bottom: 32px;
  border-radius: 4px;
  border: 4px solid ${props => props.categoryColor};
  background: var(--color-black-dark);
  box-shadow: inset 0px 0px 17px 8px rgba(0, 0, 0, 0.4);
  overflow: hidden;
`;

const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  background-color: ${props => props.categoryColor}22;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const VideoOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const VideoContainer = styled.div`
  width: 90%;
  max-width: 1024px;
  aspect-ratio: 16/9;
  position: relative;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 4px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: var(--color-gray-light);
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  
  &:hover {
    color: var(--color-frontend);
  }
`;

const ButtonsContainer = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.8);
  border-top: 4px solid ${props => props.categoryColor};
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

const getFallbackImage = (category) => {
  const images = {
    frontend: '/images/frontend/frontend1.png',
    backend: '/images/backend/backend1.png',
    mobile: '/images/mobile/mobile1.png',
    outros: '/images/frontend/frontend1.png'
  };
  return images[category?.toLowerCase()] || images.outros;
};

const getYouTubeVideoId = (url) => {
  if (!url) return null;
  
  // Tenta encontrar o ID em URLs de embed
  if (url.includes('embed/')) {
    const match = url.match(/embed\/([^/?]+)/);
    if (match) return match[1];
  }
  
  // Tenta encontrar o ID em URLs normais do YouTube
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const getThumbnailUrl = (url) => {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;
  
  // Tenta primeiro a versão hq
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

export const MovieCard = ({ movie, categoryColor, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentThumbnail, setCurrentThumbnail] = useState(movie.thumbnail);

  const handleImageError = () => {
    const youtubeThumb = getThumbnailUrl(movie.url);
    if (youtubeThumb && currentThumbnail !== youtubeThumb) {
      setCurrentThumbnail(youtubeThumb);
    } else {
      setImageError(true);
    }
  };

  const getImageSource = () => {
    if (imageError) {
      return getFallbackImage(movie.category);
    }
    return currentThumbnail || movie.thumbnail;
  };

  const getVideoUrl = () => {
    const videoId = getYouTubeVideoId(movie.url);
    if (!videoId) return movie.url;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  const handleImageClick = () => {
    setIsVideoOpen(true);
  };

  const handleCloseVideo = () => {
    setIsVideoOpen(false);
  };

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
        <ImageContainer onClick={handleImageClick} categoryColor={categoryColor}>
          <img 
            src={getImageSource()} 
            alt={movie.title}
            onError={handleImageError}
          />
        </ImageContainer>
        <ButtonsContainer categoryColor={categoryColor}>
          <Button 
            categoryColor={categoryColor}
            onClick={handleDelete}
          >
            <img src="/icons/delete.svg" alt="Deletar" />
            Deletar
          </Button>
          <Button 
            categoryColor={categoryColor}
            onClick={handleEdit}
          >
            <img src="/icons/edit.svg" alt="Editar" />
            Editar
          </Button>
        </ButtonsContainer>
      </Card>

      {isVideoOpen && (
        <VideoOverlay onClick={handleCloseVideo}>
          <VideoContainer onClick={e => e.stopPropagation()}>
            <CloseButton onClick={handleCloseVideo}>✕</CloseButton>
            <iframe
              src={getVideoUrl()}
              title={movie.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </VideoContainer>
        </VideoOverlay>
      )}

      <VideoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={movie}
      />
    </>
  );
}; 