import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 80px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 12px;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #3478f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #255fd3;
  }
`;

const StyledLink = styled(Link)`
  color: #3478f6;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default function Verificar() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const verificarLogin = async (e) => {
    e.preventDefault();

    try {
      const resposta = await axios.get(`http://localhost:5000/users?email=${email}&confirmacao=${senha}`);
      const users = resposta.data;

      if (users.length > 0) {
        const user = users[0];
        localStorage.setItem("nomeUsuario", user.nome);
        navigate("/dash");
      } else {
        alert("Email ou senha incorretos.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao verificar login.");
    }
  };

  return (
    <Container>
      <Form onSubmit={verificarLogin}>
        <h2>Login</h2>
        <Input type="text" placeholder="Seu email@" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Confirme sua senha" required value={senha} onChange={(e) => setSenha(e.target.value)} />
        <Button type="submit">Verificar</Button>
        <p>Ainda não tem cadastro? <StyledLink to="/">Cadastrar-se</StyledLink></p>
      </Form>
    </Container>
  );
}
