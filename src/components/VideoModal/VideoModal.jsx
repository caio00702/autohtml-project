import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: var(--color-black-dark);
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  position: relative;
`;

const Title = styled.h2`
  color: var(--color-gray-light);
  margin-bottom: 20px;
  font-size: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  background: var(--dark-grey);
  border: none;
  border-radius: 4px;
  padding: 12px;
  color: var(--color-gray-light);
  font-size: 14px;

  &::placeholder {
    color: #666;
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
  background: var(--dark-grey);
  border: none;
  border-radius: 4px;
  padding: 12px;
  color: var(--color-gray-light);
  font-size: 14px;
  min-height: 100px;
  resize: vertical;

  &::placeholder {
    color: #666;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.$primary ? `
    background: var(--color-frontend);
    color: var(--color-black-dark);
    border: none;
    
    &:hover {
      filter: brightness(1.1);
    }
  ` : `
    background: transparent;
    color: var(--color-gray-light);
    border: 2px solid var(--color-gray-light);
    
    &:hover {
      background: var(--color-gray-light);
      color: var(--color-black-dark);
    }
  `}
`;

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

const getEmbedUrl = (videoId) => {
  if (!videoId) return '';
  return `https://www.youtube.com/embed/${videoId}`;
};

const getThumbnailUrl = (videoId) => {
  if (!videoId) return '';
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

export const VideoModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    thumbnail: '',
    category: 'frontend',
    description: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = async (e) => {
    const { name, value } = e.target;
    
    if (name === 'url') {
      const videoId = getYouTubeVideoId(value);
      if (videoId) {
        const embedUrl = getEmbedUrl(videoId);
        const thumbnailUrl = getThumbnailUrl(videoId);
        setFormData(prev => ({
          ...prev,
          url: embedUrl,
          thumbnail: thumbnailUrl
        }));
        return;
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const videoId = getYouTubeVideoId(formData.url);
    if (!videoId) {
      alert('URL do YouTube inválida');
      return;
    }

    const videoData = {
      ...formData,
      url: getEmbedUrl(videoId),
      thumbnail: getThumbnailUrl(videoId)
    };

    await onSave(videoData);
    onClose();
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={e => e.stopPropagation()}>
        <Title>Editar Vídeo</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Título</Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Digite o título do vídeo"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>URL</Label>
            <Input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="Digite a URL do vídeo"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Thumbnail</Label>
            <Input
              type="url"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="Digite a URL da thumbnail"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Categoria</Label>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="mobile">Mobile</option>
              <option value="outros">Outros</option>
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

VideoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  initialData: PropTypes.object
}; 