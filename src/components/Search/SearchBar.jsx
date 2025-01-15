import { useState } from 'react';
import styled from 'styled-components';
import { useMovies } from '../../contexts/MoviesContext';

const SearchContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  border: 2px solid var(--color-blue);
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: var(--color-gray-light);
  font-size: 16px;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 5px var(--color-blue);
  }
`;

export const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { movies } = useMovies();

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    const filtered = movies.filter(movie => 
      movie.title.toLowerCase().includes(term.toLowerCase()) ||
      movie.category.toLowerCase().includes(term.toLowerCase())
    );
    
    onSearch(filtered);
  };

  return (
    <SearchContainer>
      <Input
        type="text"
        placeholder="Buscar por título ou categoria..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </SearchContainer>
  );
}; 