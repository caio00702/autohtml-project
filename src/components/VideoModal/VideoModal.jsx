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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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