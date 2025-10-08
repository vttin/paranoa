import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [livros, setLivros] = useState([]);
  const [emprestimos, setEmprestimos] = useState([]);
  const [novoUsuario, setNovoUsuario] = useState({ nome: "", email: "" });

  useEffect(() => {
    fetchDados();
  }, []);

  const fetchDados = () => {
    axios.get("http://localhost:4000/usuarios").then(res => setUsuarios(res.data));
    // axios.get("http://localhost:4000/livros").then(res => setLivros(res.data));
    // axios.get("http://localhost:4000/emprestimos").then(res => setEmprestimos(res.data));
  };

  const addUsuario = () => {
    axios.post("http://localhost:4000/usuarios", novoUsuario).then(() => {
      setNovoUsuario({ nome: "", email: "" });
      fetchDados();
    });
  };

  const deleteUsuario = (id) => {
    axios.delete(`http://localhost:4000/usuarios/${id}`).then(() => {
      fetchDados();
    });
  };

  const atualizaUser = (id) => {
    const nome = prompt("Novo nome:");
    const email = prompt("Novo email:");
    if (nome && email) {
      axios.put(`http://localhost:4000/usuarios/${id}`, { nome, email }).then(() => {
        fetchDados();
      });
    }
  };

  const verifica = (id) => {
    alert(id);
  };

  return (
    <>
      <h2>Adicionar usuários</h2>
      <input
        type="text"
        placeholder="Nome"
        value={novoUsuario.nome}
        onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={novoUsuario.email}
        onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
      />
      <button onClick={addUsuario}>Cadastrar</button>

      <h2>Usuários</h2>
      <ul>
        {usuarios.map((user) => (
          <li key={user._id}>
            Nome: {user.nome} | Email: {user.email}
            <button onClick={() => deleteUsuario(user._id)}>Excluir</button>
            <button onClick={() => atualizaUser(user._id)}>Editar</button>
          </li>
        ))}
      </ul>
    </>
  );
} 

export default App;