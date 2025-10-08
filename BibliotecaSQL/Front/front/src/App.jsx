import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [livros, setLivros] = useState([]);
  const [emprestimos, setEmprestimos] = useState([]);

  const [novoUsuario, setNovoUsuario] = useState({ nome: "", email: "" });
  const [novoLivro, setNovoLivro] = useState({ titulo: "", autor: "" });
  const [novoEmprestimo, setNovoEmprestimo] = useState({ usuario_id: "", livro_id: "" });

  // Estados para edição
  const [editUsuarioId, setEditUsuarioId] = useState(null);
  const [editUsuarioDados, setEditUsuarioDados] = useState({ nome: "", email: "" });

  const [editLivroId, setEditLivroId] = useState(null);
  const [editLivroDados, setEditLivroDados] = useState({ titulo: "", autor: "" });

  // Estados para editar empréstimos
  const [editEmprestimoId, setEditEmprestimoId] = useState(null);
  const [editEmprestimoDados, setEditEmprestimoDados] = useState({
    usuario_id: "",
    livro_id: "",
    data_devolucao: ""
  });

  useEffect(() => {
    buscarDados();
  }, []);

  const buscarDados = () => {
    axios.get("http://localhost:4000/usuarios").then((res) => setUsuarios(res.data));
    axios.get("http://localhost:4000/livros").then((res) => setLivros(res.data));
    axios.get("http://localhost:4000/emprestimos").then((res) => setEmprestimos(res.data));
  };

  // Funções para adicionar
  const adicionarUsuario = () => {
    axios.post("http://localhost:4000/usuarios", novoUsuario).then(() => {
      setNovoUsuario({ nome: "", email: "" });
      buscarDados();
    });
  };

  const adicionarLivro = () => {
    axios.post("http://localhost:4000/livros", novoLivro).then(() => {
      setNovoLivro({ titulo: "", autor: "" });
      buscarDados();
    });
  };

  const adicionarEmprestimo = () => {
    axios.post("http://localhost:4000/emprestimos", novoEmprestimo).then(() => {
      setNovoEmprestimo({ usuario_id: "", livro_id: "" });
      buscarDados();
    });
  };

  // Atualizar usuário
  const salvarEdicaoUsuario = (id) => {
    axios.put(`http://localhost:4000/usuarios/${id}`, editUsuarioDados)
      .then(() => {
        setEditUsuarioId(null);
        setEditUsuarioDados({ nome: "", email: "" });
        buscarDados();
      });
  };

  // Excluir usuário
  const excluirUsuario = (id) => {
    if (window.confirm("Tem certeza que quer excluir esse usuário?")) {
      axios.delete(`http://localhost:4000/usuarios/${id}`).then(() => buscarDados());
    }
  };

  // Atualizar livro
  const salvarEdicaoLivro = (id) => {
    axios.put(`http://localhost:4000/livros/${id}`, editLivroDados)
      .then(() => {
        setEditLivroId(null);
        setEditLivroDados({ titulo: "", autor: "" });
        buscarDados();
      });
  };

  // Excluir livro
  const excluirLivro = (id) => {
    if (window.confirm("Tem certeza que quer excluir esse livro?")) {
      axios.delete(`http://localhost:4000/livros/${id}`).then(() => buscarDados());
    }
  };

  // Atualizar empréstimo
  const salvarEdicaoEmprestimo = (id) => {
    axios.put(`http://localhost:4000/emprestimos/${id}`, editEmprestimoDados)
      .then(() => {
        setEditEmprestimoId(null);
        setEditEmprestimoDados({ usuario_id: "", livro_id: "", data_devolucao: "" });
        buscarDados();
      });
  };

  // Excluir empréstimo
  const excluirEmprestimo = (id) => {
    if (window.confirm("Tem certeza que quer excluir esse empréstimo?")) {
      axios.delete(`http://localhost:4000/emprestimos/${id}`).then(() => buscarDados());
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Adicionar Usuário</h2>
      <input
        placeholder="Nome"
        value={novoUsuario.nome}
        onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
      />
      <input
        placeholder="Email"
        value={novoUsuario.email}
        onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
      />
      <button onClick={adicionarUsuario}>Adicionar Usuário</button>

      <h2>Adicionar Livro</h2>
      <input
        placeholder="Título"
        value={novoLivro.titulo}
        onChange={(e) => setNovoLivro({ ...novoLivro, titulo: e.target.value })}
      />
      <input
        placeholder="Autor"
        value={novoLivro.autor}
        onChange={(e) => setNovoLivro({ ...novoLivro, autor: e.target.value })}
      />
      <button onClick={adicionarLivro}>Adicionar Livro</button>

      <h2>Adicionar Empréstimo</h2>
      <select
        value={novoEmprestimo.usuario_id}
        onChange={(e) => setNovoEmprestimo({ ...novoEmprestimo, usuario_id: e.target.value })}
      >
        <option value="">Selecione um usuário</option>
        {usuarios.map((u) => (
          <option key={u.id} value={u.id}>
            {u.nome}
          </option>
        ))}
      </select>
      <select
        value={novoEmprestimo.livro_id}
        onChange={(e) => setNovoEmprestimo({ ...novoEmprestimo, livro_id: e.target.value })}
      >
        <option value="">Selecione um livro</option>
        {livros.map((l) => (
          <option key={l.id} value={l.id}>
            {l.titulo}
          </option>
        ))}
      </select>
      <button onClick={adicionarEmprestimo}>Emprestar</button>

      <h2>Usuários</h2>
      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>
            {editUsuarioId === u.id ? (
              <>
                <input
                  value={editUsuarioDados.nome}
                  onChange={(e) => setEditUsuarioDados({ ...editUsuarioDados, nome: e.target.value })}
                  placeholder="Nome"
                />
                <input
                  value={editUsuarioDados.email}
                  onChange={(e) => setEditUsuarioDados({ ...editUsuarioDados, email: e.target.value })}
                  placeholder="Email"
                />
                <button onClick={() => salvarEdicaoUsuario(u.id)}>Salvar</button>
                <button onClick={() => setEditUsuarioId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                Nome: {u.nome} | Email: {u.email}{" "}
                <button
                  onClick={() => {
                    setEditUsuarioId(u.id);
                    setEditUsuarioDados({ nome: u.nome, email: u.email });
                  }}
                >
                  Editar
                </button>
                <button onClick={() => excluirUsuario(u.id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <h2>Livros</h2>
      <ul>
        {livros.map((l) => (
          <li key={l.id}>
            {editLivroId === l.id ? (
              <>
                <input
                  value={editLivroDados.titulo}
                  onChange={(e) => setEditLivroDados({ ...editLivroDados, titulo: e.target.value })}
                  placeholder="Título"
                />
                <input
                  value={editLivroDados.autor}
                  onChange={(e) => setEditLivroDados({ ...editLivroDados, autor: e.target.value })}
                  placeholder="Autor"
                />
                <button onClick={() => salvarEdicaoLivro(l.id)}>Salvar</button>
                <button onClick={() => setEditLivroId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                Título: {l.titulo} | Autor: {l.autor}{" "}
                <button
                  onClick={() => {
                    setEditLivroId(l.id);
                    setEditLivroDados({ titulo: l.titulo, autor: l.autor });
                  }}
                >
                  Editar
                </button>
                <button onClick={() => excluirLivro(l.id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <h2>Empréstimos</h2>
      <ul>
        {emprestimos.map((e) => (
          <li key={e.id}>
            {editEmprestimoId === e.id ? (
              <>
                <select
                  value={editEmprestimoDados.usuario_id}
                  onChange={(ev) =>
                    setEditEmprestimoDados({ ...editEmprestimoDados, usuario_id: ev.target.value })
                  }
                >
                  <option value="">Selecione um usuário</option>
                  {usuarios.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.nome}
                    </option>
                  ))}
                </select>

                <select
                  value={editEmprestimoDados.livro_id}
                  onChange={(ev) =>
                    setEditEmprestimoDados({ ...editEmprestimoDados, livro_id: ev.target.value })
                  }
                >
                  <option value="">Selecione um livro</option>
                  {livros.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.titulo}
                    </option>
                  ))}
                </select>

                <input
                  type="date"
                  value={editEmprestimoDados.data_devolucao || ""}
                  onChange={(ev) =>
                    setEditEmprestimoDados({ ...editEmprestimoDados, data_devolucao: ev.target.value })
                  }
                  placeholder="Data de devolução"
                />

                <button onClick={() => salvarEdicaoEmprestimo(e.id)}>Salvar</button>
                <button onClick={() => setEditEmprestimoId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                Usuário: {e.nome} | Livro: {e.titulo} | Data Empréstimo: {e.data_emprestimo} | Devolução:{" "}
                {e.data_devolucao || "N/A"}{" "}
                <button
                  onClick={() => {
                    setEditEmprestimoId(e.id);
                    setEditEmprestimoDados({
                      usuario_id: e.usuario_id,
                      livro_id: e.livro_id,
                      data_devolucao: e.data_devolucao || "",
                    });
                  }}
                >
                  Editar
                </button>
                <button onClick={() => excluirEmprestimo(e.id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
