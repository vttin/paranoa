import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body {
    background-color: #141414;
    color: #fff;
  }

  a {
    color: #e50914;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }
`;

export default GlobalStyle;
