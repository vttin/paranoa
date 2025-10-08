import React, { useState } from 'react';
import styled from 'styled-components';
import { criarCurso } from '../services/cursoService';

const FormWrapper = styled.div`
  background-color: #fff;
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
    border-color: #2ecc71;
    box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.2);
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px;
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #27ae60, #1e8449);
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.98);
  }
`;

function CursoForm({ onCursoCriado }) {
  const [titulo, setTitulo] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await criarCurso({
        titulo,
        carga_horaria: Number(cargaHoraria),
      });
      onCursoCriado(resp.data);
      setTitulo('');
      setCargaHoraria('');
    } catch (err) {
      console.error('Erro ao criar curso:', err);
      alert('Erro ao criar curso');
    }
  };

  return (
    <FormWrapper>
      <Title>Cadastrar Curso</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Título:</Label>
          <Input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            placeholder="Digite o título do curso"
          />
        </FormGroup>
        <FormGroup>
          <Label>Carga Horária:</Label>
          <Input
            type="number"
            value={cargaHoraria}
            onChange={(e) => setCargaHoraria(e.target.value)}
            required
            placeholder="Horas (ex: 40)"
          />
        </FormGroup>
        <Button type="submit">Cadastrar Curso</Button>
      </Form>
    </FormWrapper>
  );
}

export default CursoForm;
