import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow-y: auto;
  z-index: 1000;

  /* Estilização da barra de rolagem do modal */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-frontend);
    border-radius: 5px;
  }
`;

const Modal = styled.div`
  background: var(--color-black-dark);
  padding: 30px;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;

  @media (max-width: 768px) {
    padding: 20px;
    max-height: 100vh;
    border-radius: 0;
  }
`;

const Title = styled.h2`
  color: var(--color-gray-light);
  margin-bottom: 20px;
  font-size: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: var(--color-gray-light);
  font-size: 14px;
`;

const Input = styled.input`
  background: var(--color-black-dark);
  border: 1px solid var(--color-gray-light);
  border-radius: 4px;
  padding: 12px;
  color: var(--color-gray-light);
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px;
  }
`;

const Select = styled.select`
  background: var(--dark-grey);
  border: none;
  border-radius: 4px;
  padding: 12px;
  color: var(--color-gray-light);
  font-size: 14px;
`;

const TextArea = styled.textarea`
  background: var(--color-black-dark);
  border: 1px solid var(--color-gray-light);
  border-radius: 4px;
  padding: 12px;
  color: var(--color-gray-light);
  font-size: 16px;
  min-height: 120px;
  resize: vertical;

  @media (max-width: 768px) {
    font-size: 14px;
    min-height: 100px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Button = styled.button`
  padding: 12px 32px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  ${props => props.$primary ? `
    background: var(--color-frontend);
    color: var(--color-black-dark);
    border: none;
  ` : `
    background: transparent;
    color: var(--color-gray-light);
    border: 1px solid var(--color-gray-light);
  `}

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 20px;
    font-size: 14px;
  }
`;

const getYouTubeVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const getEmbedUrl = (videoId) => `https://www.youtube.com/embed/${videoId}`;

export const NewVideoModal = ({ isOpen, onClose, onVideoAdded }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    video: '',
    thumbnail: '',
    category: '',
    description: ''
  });
  const [previewUrl, setPreviewUrl] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Atualizar preview quando a URL do vídeo mudar
    if (name === 'video') {
      const videoId = getYouTubeVideoId(value);
      if (videoId) {
        setPreviewUrl(getEmbedUrl(videoId));
        // Atualizar automaticamente a thumbnail
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        setFormData(prev => ({
          ...prev,
          thumbnail: thumbnailUrl
        }));
      } else {
        setPreviewUrl('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const videoId = getYouTubeVideoId(formData.video);
    
    if (!videoId) {
      alert('URL do YouTube inválida');
      return;
    }

    const videoData = {
      title: formData.titulo,
      url: formData.video,
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      category: formData.category.toLowerCase(),
      description: formData.description
    };

    onVideoAdded(videoData);
    setFormData({
      titulo: '',
      video: '',
      thumbnail: '',
      category: '',
      description: ''
    });
    onClose();
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={e => e.stopPropagation()}>
        <Title>Novo Vídeo</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Título</Label>
            <Input
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Digite o título do vídeo"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>URL do Vídeo</Label>
            <Input
              name="video"
              value={formData.video}
              onChange={handleChange}
              placeholder="Cole aqui a URL do vídeo do YouTube"
              required
            />
          </FormGroup>

          {previewUrl && (
            <PreviewContainer>
              <Label>Preview:</Label>
              <VideoPreview>
                <iframe
                  width="100%"
                  height="100%"
                  src={previewUrl}
                  title="Preview do vídeo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </VideoPreview>
            </PreviewContainer>
          )}

          <FormGroup>
            <Label>Categoria</Label>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Selecione uma categoria</option>
              <option value="frontend">Front End</option>
              <option value="backend">Back End</option>
              <option value="mobile">Mobile</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Descrição</Label>
            <TextArea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Digite a descrição do vídeo"
              required
            />
          </FormGroup>

          <ButtonsContainer>
            <Button type="button" onClick={onClose}>Cancelar</Button>
            <Button type="submit" $primary>Salvar</Button>
          </ButtonsContainer>
        </Form>
      </Modal>
    </Overlay>
  );
};

NewVideoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onVideoAdded: PropTypes.func.isRequired
};

const PreviewContainer = styled.div`
  margin-bottom: 20px;
`;

const VideoPreview = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 8px;
  border: 1px solid var(--color-gray-light);

  @media (max-width: 768px) {
    margin-top: 5px;
  }
`;