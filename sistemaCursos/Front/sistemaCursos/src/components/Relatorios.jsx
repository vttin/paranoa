import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 700px;
  margin: 30px auto;
  background: #fff;
  padding: 30px 25px;
  border-radius: 14px;
  box-shadow: 0 8px 22px rgba(0,0,0,0.07);
`;

const Title = styled.h3`
  text-align: center;
  color: #2c3e50;
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 30px;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const Subtitle = styled.h4`
  color: #9b59b6;
  font-weight: 700;
  font-size: 1.4rem;
  margin-bottom: 15px;
  border-bottom: 2px solid #8e44ad;
  padding-bottom: 6px;
`;

const List = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const ListItem = styled.li`
  background: #f9f9f9;
  margin-bottom: 12px;
  padding: 14px 20px;
  border-radius: 12px;
  color: #444;
  font-size: 1rem;
  box-shadow: 0 1px 5px rgba(155, 89, 182, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0e6fa;
  }
`;

function Relatorios() {
  const [alunosCursos, setAlunosCursos] = useState([]);
  const [quantidadePorCurso, setQuantidadePorCurso] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/relatorios/alunos-cursos')
      .then(resp => setAlunosCursos(resp.data))
      .catch(err => console.error(err));

    axios.get('http://localhost:3001/relatorios/quantidade-alunos-por-curso')
      .then(resp => setQuantidadePorCurso(resp.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container>
      <Title>Relatórios</Title>
      
      <Section>
        <Subtitle>Alunos e seus Cursos</Subtitle>
        <List>
          {alunosCursos.map((item, idx) => (
            <ListItem key={idx}>
              {item.nome} está matriculado no curso "<strong>{item.titulo}</strong>" em {item.data_matricula}
            </ListItem>
          ))}
        </List>
      </Section>

      <Section>
        <Subtitle>Quantidade de Alunos por Curso</Subtitle>
        <List>
          {quantidadePorCurso.map((item, idx) => (
            <ListItem key={idx}>
              Curso "<strong>{item.titulo}</strong>": {item.quantidade_alunos} aluno(s)
            </ListItem>
          ))}
        </List>
      </Section>
    </Container>
  );
}

export default Relatorios;


