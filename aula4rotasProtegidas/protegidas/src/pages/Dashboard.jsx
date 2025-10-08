// src/pages/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Container principal do dashboard
const DashboardContainer = styled.div`
  background-color: #141414;
  height: 100vh;
  padding: 40px 20px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Título
const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 40px;
`;

// Grid dos perfis
const ProfilesGrid = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 50px;
`;

// Card do perfil
const ProfileCard = styled.div`
  background-color: #333;
  border-radius: 8px;
  width: 160px;
  height: 200px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px #e50914;
  }
`;

// Imagem do perfil
const ProfileImage = styled.img`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin-bottom: 15px;
  border: 3px solid transparent;

  ${ProfileCard}:hover & {
    border-color: #e50914;
  }
`;

// Nome do usuário
const ProfileName = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
`;

// Botão de logout estilizado
const LogoutButton = styled.button`
  background-color: #e50914;
  border: none;
  padding: 12px 24px;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #b0060e;
  }
`;

const profiles = [
  { id: 1, name: "Victor", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVcSDgO5YBlGfwvQfKKOtzUVNEgNTJjW655A&s" },
  { id: 2, name: "Neymar", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlIsAX2RZg9KV5qdDCNH6_IToZBp626aMsvTIGSXYhHMX17OKuG1xU-OS5vLhFEMosBHg&usqp=CAU" },
  { id: 3, name: "Davi Brito", img: "https://conteudo.imguol.com.br/c/entretenimento/fe/2025/04/12/davi-brito-chora-ao-anunciar-termino-de-namoro-com-dentista-que-esta-gravida-1744456443590_v2_3x4.png" },
  { id: 4, name: "Yuri22", img: "https://i.pinimg.com/236x/11/c2/0f/11c20f1d23ee26e55fb9f458fe1447a4.jpg" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <DashboardContainer>
      <Title>Quem está assistindo?</Title>
      <ProfilesGrid>
        {profiles.map(profile => (
          <ProfileCard key={profile.id}>
            <ProfileImage src={profile.img} alt={profile.name} />
            <ProfileName>{profile.name}</ProfileName>
          </ProfileCard>
        ))}
      </ProfilesGrid>

      <LogoutButton onClick={logout}>Deslogar</LogoutButton>
    </DashboardContainer>
  );
}
