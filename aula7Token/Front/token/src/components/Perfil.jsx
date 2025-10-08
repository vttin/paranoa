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
  background: #1f1f1f;
  padding: 20px;
  color: #fff;
`;

const Title = styled.h2`
  font-size: 3.5rem;
  font-family: 'Bebas Neue', sans-serif;
  color: #f5f5f5;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 5px;
  margin-bottom: 50px;
  text-shadow: 0 0 20px rgba(255, 20, 20, 0.8), 0 0 30px rgba(0, 0, 0, 0.6);
`;

const Button = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: linear-gradient(45deg, #333, #ff1414);
  color: #fff;
  font-size: 1.4rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 3px;
  box-shadow: 0 0 15px rgba(255, 20, 20, 0.6);
  margin-top: 10px;

  &:hover {
    background: linear-gradient(45deg, #ff1414, #333);
    box-shadow: 0 0 30px rgba(255, 20, 20, 0.8);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
    box-shadow: 0 0 15px rgba(255, 20, 39, 0.5);
  }
`;

const ProfileData = styled.pre`
  background-color: rgba(0, 0, 0, 0.8);
  padding: 25px;
  border-radius: 15px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 0 30px hsla(0, 100%, 53.92156862745098%, 0.7);
  color: #f5f5f5;
  font-size: 1.1rem;
  margin-top: 30px;
  text-align: left;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: auto;
`;

const ErrorMessage = styled.p`
  color: #f51c1c;
  font-size: 1.2rem;
  margin-top: 20px;
  text-align: center;
  font-weight: bold;
`;

function Perfil({ token, setToken }) {
  const [perfil, setPerfil] = useState(null);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handlePerfil = async () => {
    try {
      const res = await axios.get("http://localhost:4000/perfil", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPerfil(res.data);
      setErro("");
    } catch (err) {
      setErro(err.response?.data?.mensagem || "Erro ao acessar perfil");
    }
  };

  return (
    <Container>
      <Title>PERFIL</Title>
      <Button onClick={handlePerfil}>Acessar Perfil</Button>

      {perfil && <ProfileData>{JSON.stringify(perfil, null, 2)}</ProfileData>}

      {erro && <ErrorMessage>{erro}</ErrorMessage>}

      <Button onClick={handleLogout}>Sair</Button>
    </Container>
  );
}

export default Perfil;
