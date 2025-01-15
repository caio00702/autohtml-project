import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  height: 94px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  background: var(--color-black-dark);
`;

const Logo = styled(Link)`
  font-size: 40px;
  font-weight: bold;
  color: var(--color-frontend);
  text-decoration: none;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Button = styled.button`
  padding: 12px 32px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 16px;
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
`;

export const Header = ({ onNewVideo }) => {
  return (
    <Nav>
      <Logo to="/">ALURAFLIX</Logo>
      <ButtonsContainer>
        <Button as={Link} to="/" $primary>HOME</Button>
        <Button onClick={onNewVideo}>NOVO VÍDEO</Button>
      </ButtonsContainer>
    </Nav>
  );
}; 