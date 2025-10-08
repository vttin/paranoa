import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h3`
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  background-color: #f7f9fc;
  border-left: 4px solid #3498db;
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  font-size: 1rem;
  color: #34495e;

  strong {
    color: #2c3e50;
  }

  span {
    display: block;
    margin-top: 4px;
    font-size: 0.9rem;
    color: #555;
  }
`;

function AlunosList() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/relatorios/alunos-cursos')
      .then(resp => setDados(resp.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container>
      <Title>Alunos e Cursos que estão fazendo</Title>
      <List>
        {dados.map((item, idx) => (
          <ListItem key={idx}>
            <strong>{item.nome}</strong>
            <span>Curso: {item.titulo}</span>
            <span>Data de matrícula: {item.data_matricula}</span>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default AlunosList;
