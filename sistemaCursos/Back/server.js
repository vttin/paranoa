const express = require('express');
const cors = require('cors');
const mysql = require('mysql2'); // ou 'mysql'
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// conexão com MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  // ajuste se tiver senha
  database: 'sistema_cursos'
});

// testar conexão
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
  } else {
    console.log('MySQL conectado!');
  }
});

// ROTAS ALUNOS

// criar aluno
app.post('/alunos', (req, res) => {
  const { nome, email } = req.body;
  db.query(
    'INSERT INTO alunos (nome, email) VALUES (?, ?)',
    [nome, email],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id_aluno: result.insertId, nome, email });
    }
  );
});

// listar todos alunos
app.get('/alunos', (req, res) => {
  db.query('SELECT * FROM alunos', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// ROTAS CURSOS

app.post('/cursos', (req, res) => {
  const { titulo, carga_horaria } = req.body;
  db.query(
    'INSERT INTO cursos (titulo, carga_horaria) VALUES (?, ?)',
    [titulo, carga_horaria],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id_curso: result.insertId, titulo, carga_horaria });
    }
  );
});

app.get('/cursos', (req, res) => {
  db.query('SELECT * FROM cursos', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// ROTAS MATRÍCULAS

app.post('/matriculas', (req, res) => {
  const { id_aluno, id_curso, data_matricula } = req.body;
  db.query(
    'INSERT INTO matriculas (id_aluno, id_curso, data_matricula) VALUES (?, ?, ?)',
    [id_aluno, id_curso, data_matricula],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id_matricula: result.insertId, id_aluno, id_curso, data_matricula });
    }
  );
});

// relatório: todos alunos com seus cursos
app.get('/relatorios/alunos-cursos', (req, res) => {
  const sql = `
    SELECT a.id_aluno, a.nome, a.email, c.id_curso, c.titulo, m.data_matricula
      FROM alunos a
      JOIN matriculas m ON a.id_aluno = m.id_aluno
      JOIN cursos c ON m.id_curso = c.id_curso
    `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// relatório: quantidade de alunos em cada curso
app.get('/relatorios/quantidade-alunos-por-curso', (req, res) => {
  const sql = `
    SELECT c.id_curso, c.titulo, COUNT(m.id_aluno) as quantidade_alunos
      FROM cursos c
      LEFT JOIN matriculas m ON c.id_curso = m.id_curso
      GROUP BY c.id_curso, c.titulo
    `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
