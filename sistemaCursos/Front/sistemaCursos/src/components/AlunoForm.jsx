import React, { useState } from 'react';
import styled from 'styled-components';
import { criarAluno } from '../services/alunoService';

const FormWrapper = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  max-width: 500px;
  margin: 0 auto;
`;

const Title = styled.h3`
  font-size: 1.6rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 6px;
`;

const Input = styled.input`
  padding: 12px 14px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #2980b9, #1f6391);
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.98);
  }
`;

function AlunoForm({ onAlunoCriado }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await criarAluno({ nome, email });
      onAlunoCriado(resp.data);
      setNome('');
      setEmail('');
    } catch (err) {
      console.error('Erro ao criar aluno:', err);
      alert('Erro ao criar aluno');
    }
  };

  return (
    <FormWrapper>
      <Title>Cadastrar Aluno</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nome:</Label>
          <Input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <Button type="submit">Cadastrar Aluno</Button>
      </Form>
    </FormWrapper>
  );
}

export default AlunoForm;
