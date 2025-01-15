import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--color-black-dark);
    font-family: 'Roboto', sans-serif;
    color: var(--color-gray-light);
  }

  /* Estilização da barra de rolagem conforme Figma */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-black-dark);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-frontend);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-blue);
  }
`;
