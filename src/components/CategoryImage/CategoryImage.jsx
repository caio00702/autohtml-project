import styled from 'styled-components';
import PropTypes from 'prop-types';

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

const getRandomImage = (category) => {
  const images = {
    frontend: [
      '/public/images/frontend/frontend1.png',
      '/public/images/frontend/frontend2.png',
      '/public/images/frontend/frontend3.png'
    ],
    backend: [
      '/public/images/backend/backend1.png',
      '/public/images/backend/backend2.png',
      '/public/images/backend/backend3.png'
    ],
    mobile: [
      '/public/images/mobile/mobile1.png',
      '/public/images/mobile/mobile2.png',
      '/public/images/mobile/mobile3.png'
    ]
  };

  const categoryImages = images[category] || images.frontend;
  const randomIndex = Math.floor(Math.random() * categoryImages.length);
  return categoryImages[randomIndex];
};

export const CategoryImage = ({ category, alt }) => {
  return (
    <Image src={getRandomImage(category)} alt={alt} />
  );
};

CategoryImage.propTypes = {
  category: PropTypes.oneOf(['frontend', 'backend', 'mobile']).isRequired,
  alt: PropTypes.string.isRequired
}; 