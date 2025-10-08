// src/components/Footer.js
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #111;
  color: #eee;
  text-align: center;
  padding: 1rem 0;
  position: relative;
  bottom: 0;
  width: 100%;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <p>&copy; 2025 GameWorld. Todos os direitos reservados.</p>
    </FooterContainer>
  );
}
