import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { listarCursos } from '../services/cursoService';

const Container = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  max-width: 700px;
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
  background-color: #f8fafd;
  padding: 16px 20px;
  border-left: 4px solid #8e44ad;
  border-radius: 8px;
  margin-bottom: 12px;
  font-size: 1rem;
  color: #34495e;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);

  strong {
    color: #2c3e50;
  }

  span {
    font-size: 0.9rem;
    color: #666;
  }
`;

function CursosList() {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    listarCursos()
      .then(resp => setCursos(resp.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container>
      <Title>Cursos Disponíveis</Title>
      <List>
        {cursos.map(c => (
          <ListItem key={c.id_curso}>
            <strong>{c.titulo}</strong><br />
            <span>Carga horária: {c.carga_horaria} horas</span>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default CursosList;
