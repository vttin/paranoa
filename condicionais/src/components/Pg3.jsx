// src/pages/Pg3.jsx
import styled from 'styled-components';

const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.gradient};
  color: ${({ theme }) => theme.color};
  padding: 6rem 2rem 2rem;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.8rem;
  color: ${({ theme }) => theme.color};
  margin-bottom: 2rem;
  text-shadow: 0 0 12px ${({ theme }) => theme.color};
`;

const HeroImage = styled.img`
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
  display: block;
  border-radius: 12px;
  box-shadow: 0 0 30px ${({ theme }) => theme.hoverShadow};
`;

const Text = styled.p`
  font-size: 1.2rem;
  max-width: 900px;
  margin: 1rem auto;
  text-align: center;
  line-height: 1.8;
  opacity: 0.9;
`;

export default function Pg3() {
  return (
    <Page>
      <Title>🌐 Sobre o GameWorld</Title>
      <Text>
        O <strong>GameWorld</strong> é uma iniciativa voltada para revolucionar o modo como interagimos com o universo dos jogos. Com curadoria apurada, design inovador e conteúdo independente, entregamos uma plataforma que mistura tecnologia e paixão gamer.
      </Text>
      <Text>
        Nosso objetivo é criar experiências únicas, conectar jogadores, inspirar novas gerações e expandir o potencial da cultura gamer ao redor do mundo.
      </Text>
    </Page>
  );
}
