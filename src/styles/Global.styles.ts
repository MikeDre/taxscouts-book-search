import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    background-color: #eee;
    min-height: 100vh;
    font-family: Arial, sans-serif;
  }

  body {
    margin: 0;
  }
`;

export { GlobalStyles };
