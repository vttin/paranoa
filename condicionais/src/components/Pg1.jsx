// src/pages/Pg1.jsx
import styled from 'styled-components';

const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.gradient};
  padding: 6rem 2rem 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.color};
  margin-bottom: 1rem;
  text-shadow: 0 0 10px ${({ theme }) => theme.color};
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 3rem;
  opacity: 0.8;
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
  padding: 1rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 25px ${({ theme }) => theme.hoverShadow};
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 40px ${({ theme }) => theme.hoverShadow};
  }
`;

const GameImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
`;

const GameTitle = styled.h3`
  margin-top: 1rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.cardText};
  text-align: center;
`;

export default function Pg1() {
  return (
    <Page>
      <Title>🔥 GameWorld </Title>
      <Subtitle>Descubra os jogos que estão moldando o futuro da diversão!</Subtitle>
      <GameGrid>
        <Card>
          <GameImage src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_616x353.jpg?t=1748630546" alt="Elden Ring" />
          <GameTitle>Elden Ring</GameTitle>
        </Card>
        <Card>
          <GameImage src="https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000008122/453d17f26995df6bd67d698c90ba2fd27157a61875e1a9730545da23474c6aaf" alt="Dark Souls" />
          <GameTitle>Dark Souls</GameTitle>
        </Card>
        <Card>
          <GameImage src="https://cdn1.epicgames.com/b30b6d1b4dfd4dcc93b5490be5e094e5/offer/RDR2476298253_Epic_Games_Wishlist_RDR2_2560x1440_V01-2560x1440-2a9ebe1f7ee202102555be202d5632ec.jpg" alt="Red Dead Redemption 2" />
          <GameTitle>Red Dead Redemption 2</GameTitle>
        </Card>
      </GameGrid>
    </Page>
  );
}
