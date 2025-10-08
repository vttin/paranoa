import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 60px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 10px;
  background-color: #f9f9f9;
  padding: 30px;
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

export default function Register() {
  const [nome, setNome] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [endereco, setEndereco] = useState("");

  const navigate = useNavigate();

  const RegisterUser = async (e) => {
    e.preventDefault();

    if (senha !== confirmacao) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const existing = await axios.get(`http://localhost:5000/users?email=${email}`);
      if (existing.data.length > 0) {
        alert("Email já cadastrado.");
        return;
      }

      const response = await axios.post("http://localhost:5000/users", {
        nome,
        image,
        email,
        confirmacao: senha,
        nascimento,
        endereco
      });

      if (response.status === 201) {
        alert("Cadastro realizado com sucesso!");
        navigate("/verificacao");
      }
    } catch (error) {
      console.log(error);
      alert("Erro ao cadastrar.");
    }
  };

  return (
    <Container>
      <Form onSubmit={RegisterUser}>
        <h2>Cadastro</h2>
        <Input type="text" placeholder="Nome" required value={nome} onChange={(e) => setNome(e.target.value)} />
        <Input type="text" placeholder="URL da imagem de perfil" value={image} onChange={(e) => setImage(e.target.value)} />
        <Input type="text" placeholder="Seu email@" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Sua senha" required value={senha} onChange={(e) => setSenha(e.target.value)} />
        <Input type="password" placeholder="Confirme sua senha" required value={confirmacao} onChange={(e) => setConfirmacao(e.target.value)} />
        <label>Nascimento:</label>
        <Input type="date" required value={nascimento} onChange={(e) => setNascimento(e.target.value)} />
        <Input type="text" placeholder="Endereço" required value={endereco} onChange={(e) => setEndereco(e.target.value)} />
        <Button type="submit">Cadastrar</Button>
        <p>Já tem login? <StyledLink to="/verificacao">Logar</StyledLink></p>
      </Form>
    </Container>
  );
}
