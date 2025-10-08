import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background-color: #141414;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Form = styled.div`
  background-color: rgba(0, 0, 0, 0.75);
  padding: 40px 30px;
  border-radius: 8px;
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 20px rgba(229, 9, 20, 0.4);
`;

const Title = styled.h1`
  margin-bottom: 28px;
  color: #fff;
  font-size: 2.4rem;
  font-weight: 700;
  text-align: center;
`;

const Input = styled.input`
  background: #333;
  border: none;
  outline: none;
  color: #fff;
  padding: 14px 16px;
  margin-bottom: 24px;
  border-radius: 5px;
  font-size: 18px;
  transition: border 0.3s ease;

  &:focus {
    border: 2px solid #e50914;
  }

  &::placeholder {
    color: #b3b3b3;
  }
`;

const Button = styled.button`
  background: #e50914;
  color: #fff;
  font-size: 18px;
  padding: 16px 0;
  border: none;
  border-radius: 5px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 8px;

  &:hover {
    background: #f40612;
  }

  &:active {
    background: #b20710;
  }
`;

const Text = styled.p`
  margin-top: 16px;
  text-align: center;
  color: #b3b3b3;
  font-size: 14px;

  a {
    color: #e50914;
    font-weight: 600;
    text-decoration: underline;

    &:hover {
      color: #f40612;
    }
  }
`;

export default function Login({ setIsAuthenticated }) {
  const [user, setUser] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const logar = () => {
    const stored = JSON.parse(localStorage.getItem('user_data'));

    if (stored && stored.user === user && stored.senha === senha) {
      const token = `${user}-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      navigate('/dash');
    } else {
      alert('Usuário ou senha incorretos!');
    }
  };

  return (
    <Container>
      <Form>
        <Title>Login</Title>
        <Input 
          type="text" 
          placeholder="Usuário" 
          value={user} 
          onChange={(e) => setUser(e.target.value)} 
        />
        <Input 
          type="password" 
          placeholder="Senha" 
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
        />
        <Button onClick={logar}>Entrar</Button>
        <Text>
          Ainda não tem conta? <Link to="/register">Cadastre-se</Link>
        </Text>
      </Form>
    </Container>
  );
}
