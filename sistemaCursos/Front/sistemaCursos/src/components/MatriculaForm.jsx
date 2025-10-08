import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { listarAlunos } from '../services/alunoService';
import { listarCursos } from '../services/cursoService';
import { criarMatricula } from '../services/matriculaService';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  padding: 30px 25px;
  border-radius: 14px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.07);
`;

const Title = styled.h3`
  text-align: center;
  color: #2c3e50;
  font-weight: 700;
  margin-bottom: 24px;
  font-size: 1.7rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #555;
  margin-bottom: 6px;
  font-weight: 600;
`;

const Select = styled.select`
  padding: 12px 14px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: border-color 0.25s ease;

  &:focus {
    outline: none;
    border-color: #9b59b6;
    box-shadow: 0 0 6px rgba(155, 89, 182, 0.3);
  }
`;

const Input = styled.input`
  padding: 12px 14px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: border-color 0.25s ease;

  &:focus {
    outline: none;
    border-color: #9b59b6;
    box-shadow: 0 0 6px rgba(155, 89, 182, 0.3);
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
  border: none;
  padding: 14px 0;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(155, 89, 182, 0.3);

  &:hover {
    background: linear-gradient(135deg, #8e44ad, #732d91);
    box-shadow: 0 8px 20px rgba(139, 55, 170, 0.5);
    transform: translateY(-3px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

function MatriculaForm({ onMatriculaCriada }) {
  const [alunos, setAlunos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [idAluno, setIdAluno] = useState('');
  const [idCurso, setIdCurso] = useState('');
  const [dataMatricula, setDataMatricula] = useState('');

  useEffect(() => {
    listarAlunos()
      .then(resp => setAlunos(resp.data))
      .catch(err => console.error(err));
    listarCursos()
      .then(resp => setCursos(resp.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const resp = await criarMatricula({
        id_aluno: Number(idAluno),
        id_curso: Number(idCurso),
        data_matricula: dataMatricula,
      });
      onMatriculaCriada(resp.data);
      setIdAluno('');
      setIdCurso('');
      setDataMatricula('');
    } catch (err) {
      console.error('Erro ao criar matrícula:', err);
      alert('Erro ao matricular');
    }
  };

  return (
    <Container>
      <Title>Matricular Aluno em Curso</Title>
      <Form onSubmit={handleSubmit}>
        <FieldGroup>
          <Label>Aluno:</Label>
          <Select
            value={idAluno}
            onChange={e => setIdAluno(e.target.value)}
            required
          >
            <option value="">Selecione um aluno</option>
            {alunos.map(a => (
              <option key={a.id_aluno} value={a.id_aluno}>
                {a.nome}
              </option>
            ))}
          </Select>
        </FieldGroup>

        <FieldGroup>
          <Label>Curso:</Label>
          <Select
            value={idCurso}
            onChange={e => setIdCurso(e.target.value)}
            required
          >
            <option value="">Selecione um curso</option>
            {cursos.map(c => (
              <option key={c.id_curso} value={c.id_curso}>
                {c.titulo}
              </option>
            ))}
          </Select>
        </FieldGroup>

        <FieldGroup>
          <Label>Data de Matrícula:</Label>
          <Input
            type="date"
            value={dataMatricula}
            onChange={e => setDataMatricula(e.target.value)}
            required
          />
        </FieldGroup>

        <Button type="submit">Matricular</Button>
      </Form>
    </Container>
  );
}

export default MatriculaForm;
