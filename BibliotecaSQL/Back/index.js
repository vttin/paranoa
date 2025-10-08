const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'biblioteca'
});

db.connect((error) =>  {
    if (error) {
        console.error('Erro mysql2', error);
        return;
    }
    console.log('Conectado ao MySQL');
});

// GET usuários
app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (error, resultado) => {
        if(error) return res.status(500).json(error);
        res.json(resultado);
    });
});

// GET livros
app.get('/livros', (req, res) => {
    db.query('SELECT * FROM livros', (error, resultado) => {
        if(error) return res.status(500).json(error);
        res.json(resultado);
    });
});

// GET empréstimos com join para mostrar dados completos
app.get('/emprestimos', (req, res) =>{
    const sql = `
        SELECT e.id, u.nome, l.titulo, l.autor, e.data_emprestimo, e.data_devolucao
        FROM emprestimos e
        JOIN usuarios u ON e.usuario_id = u.id
        JOIN livros l ON e.livro_id = l.id
    `;
    db.query(sql, (error, resultado) => {
        if(error) return res.status(500).json(error);
        res.json(resultado);
    });
});

// POST adicionar usuário
app.post('/usuarios', (req, res) => {
    const { nome, email } = req.body;
    if(!nome || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios' });
    }
    db.query('INSERT INTO usuarios (nome, email) VALUES (?, ?)', [nome, email], (error, resultado) => {
        if(error) return res.status(500).json(error);
        res.status(201).json({ id: resultado.insertId, nome, email });
    });
});

// POST adicionar livro
app.post('/livros', (req, res) => {
    const { titulo, autor } = req.body;
    if(!titulo || !autor) {
        return res.status(400).json({ error: 'Título e autor são obrigatórios' });
    }
    db.query('INSERT INTO livros (titulo, autor) VALUES (?, ?)', [titulo, autor], (error, resultado) => {
        if(error) return res.status(500).json(error);
        res.status(201).json({ id: resultado.insertId, titulo, autor });
    });
});

// POST adicionar empréstimo
app.post('/emprestimos', (req, res) => {
    const { usuario_id, livro_id } = req.body;
    if(!usuario_id || !livro_id) {
        return res.status(400).json({ error: 'usuario_id e livro_id são obrigatórios' });
    }
    db.query('INSERT INTO emprestimos (usuario_id, livro_id) VALUES (?, ?)', [usuario_id, livro_id], (error, resultado) => {
        if(error) return res.status(500).json(error);
        res.status(201).json({ id: resultado.insertId, usuario_id, livro_id });
    });
});

// Atualizar usuário
app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;
  if(!nome || !email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios' });
  }
  db.query(
    'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?',
    [nome, email, id],
    (error, resultado) => {
      if(error) return res.status(500).json(error);
      if(resultado.affectedRows === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.json({ message: 'Usuário atualizado com sucesso' });
    }
  );
});

// Excluir usuário
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;

  // Primeiro exclui os empréstimos do usuário para evitar FK
  db.query('DELETE FROM emprestimos WHERE usuario_id = ?', [id], (error, resultado) => {
    if(error) {
      console.error('Erro ao excluir empréstimos do usuário:', error);
      return res.status(500).json(error);
    }
    // Agora exclui o usuário
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (error, resultado) => {
      if(error) {
        console.error('Erro ao excluir usuário:', error);
        return res.status(500).json(error);
      }
      if(resultado.affectedRows === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.json({ message: 'Usuário e seus empréstimos excluídos com sucesso' });
    });
  });
});

// Atualizar livro
app.put('/livros/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, autor } = req.body;
  if(!titulo || !autor) {
    return res.status(400).json({ error: 'Título e autor são obrigatórios' });
  }
  db.query(
    'UPDATE livros SET titulo = ?, autor = ? WHERE id = ?',
    [titulo, autor, id],
    (error, resultado) => {
      if(error) return res.status(500).json(error);
      if(resultado.affectedRows === 0) {
        return res.status(404).json({ message: 'Livro não encontrado' });
      }
      res.json({ message: 'Livro atualizado com sucesso' });
    }
  );
});

// Excluir livro
app.delete('/livros/:id', (req, res) => {
  const { id } = req.params;

  // Excluir empréstimos que usam esse livro (FK)
  db.query('DELETE FROM emprestimos WHERE livro_id = ?', [id], (error, resultado) => {
    if(error) {
      console.error('Erro ao excluir empréstimos do livro:', error);
      return res.status(500).json(error);
    }
    // Agora exclui o livro
    db.query('DELETE FROM livros WHERE id = ?', [id], (error, resultado) => {
      if(error) {
        console.error('Erro ao excluir livro:', error);
        return res.status(500).json(error);
      }
      if(resultado.affectedRows === 0) {
        return res.status(404).json({ message: 'Livro não encontrado' });
      }
      res.json({ message: 'Livro e seus empréstimos excluídos com sucesso' });
    });
  });
});

// Atualizar empréstimo
app.put('/emprestimos/:id', (req, res) => {
  const { id } = req.params;
  const { usuario_id, livro_id, data_devolucao } = req.body;

  if (!usuario_id || !livro_id) {
    return res.status(400).json({ error: 'usuario_id e livro_id são obrigatórios' });
  }

  const sql = `
    UPDATE emprestimos
    SET usuario_id = ?, livro_id = ?, data_devolucao = ?
    WHERE id = ?
  `;

  db.query(sql, [usuario_id, livro_id, data_devolucao || null, id], (error, resultado) => {
    if (error) return res.status(500).json(error);
    if(resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Empréstimo não encontrado' });
    }
    res.json({ message: 'Empréstimo atualizado com sucesso' });
  });
});

// Excluir empréstimo
app.delete('/emprestimos/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM emprestimos WHERE id = ?', [id], (error, resultado) => {
    if (error) {
      console.error('Erro ao excluir empréstimo:', error);
      return res.status(500).json(error);
    }
    if(resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Empréstimo não encontrado' });
    }
    res.json({ message: 'Empréstimo excluído com sucesso' });
  });
});

app.listen(4000, () => {
    console.log('Servidor rodando na porta 4000');
});
