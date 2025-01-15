import styled from 'styled-components';
import PropTypes from 'prop-types';

const BannerContainer = styled.div`
  background: url('/public/images/backgroundBanner.png') no-repeat center center;
  background-size: cover;
  position: relative;
  padding: 40px 0;
  margin-bottom: 48px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
  }
`;

const Content = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  position: relative;
  z-index: 1;
`;

const Info = styled.div`
  flex: 1;
`;

const Category = styled.span`
  display: inline-block;
  padding: 8px 16px;
  background: ${props => props.color};
  color: var(--color-black-dark);
  border-radius: 4px;
  font-weight: 600;
  margin-bottom: 24px;
  text-transform: uppercase;
`;

const Title = styled.h1`
  font-size: var(--title-big-font-size);
  color: var(--color-gray-light);
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: var(--color-gray-light);
  max-width: 665px;
`;

const VideoPreview = styled.div`
  flex: 0 0 500px;
  aspect-ratio: 16/9;
  border-radius: 4px;
  overflow: hidden;
  border: 4px solid ${props => props.color};
  box-shadow: ${props => `var(--${props.category}-box-shadow)`};
  transform: translateY(-20px);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Banner = ({ video, color }) => {
  return (
    <BannerContainer>
      <Content>
        <Info>
          <Category color={color}>{video.category}</Category>
          <Title>{video.title}</Title>
          <Description>{video.description}</Description>
        </Info>
        <VideoPreview color={color} category={video.category}>
          <img src="/images/banner.png" alt={video.title} />
        </VideoPreview>
      </Content>
    </BannerContainer>
  );
};

Banner.propTypes = {
  video: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
  }).isRequired,
  color: PropTypes.string.isRequired
}; 