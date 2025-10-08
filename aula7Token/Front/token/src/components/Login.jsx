import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #101010;
  position: relative;
  padding: 0 20px;
  color: #fff;
`;

const Title = styled.h2`
  font-size: 4rem;
  font-family: 'Bebas Neue', sans-serif;
  color: #f5f5f5;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 10px;
  margin-bottom: 50px;
  text-shadow: 0 0 15px rgba(255, 0, 0, 0.9), 0 0 35px rgba(0, 0, 0, 0.8);
  animation: glowing 1.5s ease-in-out infinite alternate;

  @keyframes glowing {
    0% {
      text-shadow: 0 0 15px rgba(255, 0, 0, 1), 0 0 25px rgba(0, 0, 0, 0.8);
    }
    100% {
      text-shadow: 0 0 30px rgba(255, 0, 0, 1), 0 0 45px rgba(0, 0, 0, 0.9);
    }
  }
`;

const Input = styled.input`
  width: 100%;
  max-width: 380px;
  padding: 18px;
  margin: 20px 0;
  border: none;
  border-radius: 10px;
  font-size: 1.3rem;
  background: rgba(255, 255, 255, 0.1);
  color: #f5f5f5;
  outline: none;
  backdrop-filter: blur(8px);
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.7);
  transition: 0.3s ease;
  font-family: 'Roboto', sans-serif;

  &:focus {
    box-shadow: 0 0 20px rgba(255, 0, 0, 1);
    border: 2px solid #ff0000;
  }
`;

const Button = styled.button`
  width: 100%;
  max-width: 380px;
  padding: 20px;
  background: linear-gradient(45deg, #333, #ff0000);
  color: #fff;
  font-size: 1.4rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 3px;
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.6);

  &:hover {
    background: linear-gradient(45deg, #ff0000, #333);
    box-shadow: 0 0 30px rgba(255, 0, 0, 0.8);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
    box-shadow: 0 0 15px rgba(255, 0, 0, 0.5);
  }
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 1.2rem;
  margin-top: 20px;
  text-align: center;
  font-weight: bold;
  animation: fadeIn 1.5s ease-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

function Login({ setToken }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErro("");
    try {
      const res = await axios.post("http://localhost:4000/login", { usuario, senha });
      const tokenRecebido = res.data.token;
      setToken(tokenRecebido);
      localStorage.setItem("token", tokenRecebido);
      navigate("/perfil");
    } catch (err) {
      setErro(err.response?.data?.mensagem || "Erro no login");
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <Input
        placeholder="Usuário"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <Button onClick={handleLogin}>Entrar</Button>
      {erro && <ErrorMessage>{erro}</ErrorMessage>}
    </Container>
  );
}

export default Login;
