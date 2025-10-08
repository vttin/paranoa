import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #141414 0%, #1f1f1f 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 1rem;
  letter-spacing: 3px;
  color: #e50914;
  text-shadow: 0 0 20px #e50914;
`;

const Subtitle = styled.p`
  font-size: 1.6rem;
  margin-bottom: 3rem;
  color: #bbb;
  max-width: 600px;
  line-height: 1.4;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 2rem;
`;

const Button = styled(Link)`
  background: #e50914;
  color: #fff;
  font-weight: 700;
  font-size: 1.2rem;       /* menor fonte */
  padding: 0.8rem 2rem;    /* menos padding */
  border-radius: 8px;
  text-transform: uppercase;
  box-shadow: 0 0 12px #e50914;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background: #f40612;
    box-shadow: 0 0 18px #f40612;
    transform: scale(1.05);
  }
`;


export default function Home() {
  return (
    <Container>
      <Title>Bem-vindo</Title>
      <Subtitle>Entre com sua conta ou cadastre-se para começar sua jornada.</Subtitle>
      <ButtonGroup>
        <Button to="/login">Login</Button>
        <Button to="/register">Cadastro</Button>
      </ButtonGroup>
    </Container>
  );
}
