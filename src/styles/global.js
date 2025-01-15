import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --color-frontend: #6BD1FF;
    --color-backend: #69953B;
    --color-mobile: #FFBA05;
    --color-black-dark: #000000;
    --color-gray-light: #F5F5F5;
    --dark-grey: #15171B;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: var(--color-black-dark);
    color: var(--color-gray-light);
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-black-dark);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--dark-grey);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #333;
  }
`;
