import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --color-black-dark: #000000;
    --color-gray-light: #F5F5F5;
    --color-frontend: #6BD1FF;
    --color-backend: #00C86F;
    --color-mobile: #FFBA05;
    --color-blue: #2271D1;
    --dark-grey: #15171B;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
    background: var(--color-black-dark);
    color: var(--color-gray-light);
    min-height: 100vh;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--dark-grey);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-blue);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-frontend);
  }
`;
