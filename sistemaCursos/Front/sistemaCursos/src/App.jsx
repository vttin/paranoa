import React, { useState } from 'react';
import AlunoForm from './components/AlunoForm';
import CursoForm from './components/CursoForm';
import MatriculaForm from './components/MatriculaForm';
import CursosList from './components/CursosList';
import AlunosList from './components/AlunoList';
import Relatorios from './components/Relatorios';



function App() {
  const [alunos, setAlunos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [matriculas, setMatriculas] = useState([]);

  // Esses handlers podem ser usados para atualizar listas quando algo novo for criado
  const handleAlunoCriado = (aluno) => {
    setAlunos(prev => [...prev, aluno]);
  };

  const handleCursoCriado = (curso) => {
    setCursos(prev => [...prev, curso]);
  };

  const handleMatriculaCriada = (matricula) => {
    setMatriculas(prev => [...prev, matricula]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Sistema de Cursos Online</h1>

      <section>
        <AlunoForm onAlunoCriado={handleAlunoCriado} />
      </section>

      <section>
        <CursoForm onCursoCriado={handleCursoCriado} />
      </section>

      <section>
        <MatriculaForm onMatriculaCriada={handleMatriculaCriada} />
      </section>

      <section>
        <CursosList />
      </section>

      <section>
        <AlunosList />
      </section>

      <section>
        <Relatorios />
      </section>
    </div>
  );
}

export default App;
