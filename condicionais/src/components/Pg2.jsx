// src/pages/Pg2.jsx
import styled from 'styled-components';

const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.gradient};
  padding: 6rem 2rem 2rem;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.8rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.color};
  text-shadow: 0 0 15px ${({ theme }) => theme.color};
`;

const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
`;

const ReviewCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 10px;
  overflow: hidden;
  backdrop-filter: blur(6px);
  transition: transform 0.3s ease;
  box-shadow: 0 0 20px ${({ theme }) => theme.hoverShadow};
  &:hover {
    transform: scale(1.03);
    box-shadow: 0 0 40px ${({ theme }) => theme.hoverShadow};
  }
`;

const ReviewImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  object-position: center;
`;

const ReviewBody = styled.div`
  padding: 1rem;
`;

const GameName = styled.h2`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.cardText};
  margin-bottom: 0.5rem;
`;

const Score = styled.span`
  display: block;
  font-size: 1.1rem;
  color: #f94f6d;
  margin-bottom: 0.5rem;
`;

const Text = styled.p`
  font-size: 0.95rem;
  opacity: 0.8;
`;

export default function Pg2() {
  return (
    <Page>
      <Title>📊 Avaliações de Impacto</Title>
      <ReviewGrid>
        <ReviewCard>
          <ReviewImage src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_616x353.jpg?t=1748630546" alt="Elden Ring" />
          <ReviewBody>
            <GameName>Elden Ring</GameName>
            <Score>Nota: 9.5</Score>
            <Text>Um mundo aberto instigante com narrativa profunda e mecânicas desafiadoras.</Text>
          </ReviewBody>
        </ReviewCard>
        <ReviewCard>
          <ReviewImage src="https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/1c7b75d8ed9271516546560d219ad0b22ee0a263b4537bd8.png" alt="Spider‑Man 2" />
          <ReviewBody>
            <GameName>Spider-Man 2</GameName>
            <Score>Nota: 9.0</Score>
            <Text>Gameplay fluido, personagens carismáticos e visuais impressionantes.</Text>
          </ReviewBody>
        </ReviewCard>
      </ReviewGrid>
    </Page>
  );
}
