
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Barlow', sans-serif;
    margin: 0;
    color: rgb(40, 40, 40);
    background-color: #f0f2f5;
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
  }

  * {
    box-sizing: border-box;
  }

`;

export default GlobalStyles;