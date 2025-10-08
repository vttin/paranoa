import React, { useState } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Menu from "./components/Menu";
import Pg1 from "./components/Pg1";
import Pg2 from "./components/Pg2";
import Pg3 from "./components/Pg3";
import { lightTheme, darkTheme } from "./components/thema";

// 🌍 Global Style
const Global = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    font-family: 'Orbitron', sans-serif;
    transition: all 0.5s ease;
    min-height: 100vh;
  }

  a {
    color: ${({ theme }) => theme.linkColor};
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
    text-shadow: 0 0 6px ${({ theme }) => theme.linkColor};
  }

  a:hover {
    color: ${({ theme }) => theme.linkHover};
    text-shadow: 0 0 10px ${({ theme }) => theme.linkHover}, 0 0 20px ${({ theme }) => theme.linkHover};
  }

  button {
    background-color: ${({ theme }) => theme.buttonBg};
    color: ${({ theme }) => theme.buttonColor};
    border: none;
    padding: 0.7rem 1.4rem;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 700;
    box-shadow: ${({ theme }) => theme.boxShadow};
    transition: all 0.3s ease;
  }

  button:hover {
    filter: brightness(1.2);
    box-shadow: 0 0 15px ${({ theme }) => theme.buttonBg}, 0 0 30px ${({ theme }) => theme.buttonBg};
    transform: translateY(-2px);
  }
`;


const Container = styled.div`
  padding: 2rem;
`;

const ThemeButton = styled.button`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  background: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonColor};
  transition: all 0.3s ease-in-out;
  margin-bottom: 2rem;
  box-shadow: 0 0 15px ${({ theme }) => theme.buttonBg};

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 25px ${({ theme }) => theme.buttonBg};
  }
`;

export default function App() {
  const [pagina, setPagina] = useState("Pagina1");
  const [temaEscuro, setTemaEscuro] = useState(true);

  const renderizarPagina = () => {
    switch (pagina) {
      case "Pagina1":
        return <Pg1 />;
      case "Pagina2":
        return <Pg2 />;
      case "Pagina3":
        return <Pg3 />;
      default:
        return <Pg1 />;
    }
  };

  return (
    <ThemeProvider theme={temaEscuro ? darkTheme : lightTheme}>
      <Global />
      <Menu enviar={setPagina} />
      <Container>
        <ThemeButton onClick={() => setTemaEscuro(!temaEscuro)}>
          {temaEscuro ? "Modo Claro" : "Modo Escuro"}
        </ThemeButton>
        {renderizarPagina()}
      </Container>
    </ThemeProvider>
  );
}
