import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 40px;
  text-align: center;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #e63946;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d62828;
  }
`;

const StyledLink = styled(Link)`
  color: #3478f6;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

export default function Dashboard() {
  const nome = localStorage.getItem("nomeUsuario");

  const handleLogout = () => {
    localStorage.removeItem("nomeUsuario");
    window.location.href = "/verificacao";
  };

  return (
    <Container>
      <h2>Bem-vindo, {nome}!</h2>
      <p>Este é o seu dashboard.</p>
      <StyledLink to="/posts">Ver posts</StyledLink>
      <br />
      <Button onClick={handleLogout}>Sair</Button>
    </Container>
  );
}
