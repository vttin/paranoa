import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.nav`
  display: flex;
  justify-content: center;
  padding: 1.5rem 0;
  background: transparent;
`;

const MenuList = styled.ul`
  list-style: none;
  display: flex;
  gap: 1.5rem;
`;

const MenuItem = styled.li`
  position: relative;
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 8px;
  color: ${({ active, theme }) => (active ? theme.buttonBg : theme.color)};
  font-weight: ${({ active }) => (active ? "700" : "500")};
  transition: all 0.3s ease;
  border: 1px solid transparent;

  &:hover {
    color: ${({ theme }) => theme.buttonBg};
    background: rgba(255, 255, 255, 0.05);
    border-color: ${({ theme }) => theme.buttonBg};
    transform: translateY(-2px);
  }
`;

export default function Menu(props) {
  const [page, setPage] = useState("Pagina1");

  const pageChange = (newPage) => {
    setPage(newPage);
    props.enviar(newPage);
  };

  return (
    <Container>
      <MenuList>
        <MenuItem
          active={page === "Pagina1"}
          onClick={() => pageChange("Pagina1")}
        >
          Página 1
        </MenuItem>
        <MenuItem
          active={page === "Pagina2"}
          onClick={() => pageChange("Pagina2")}
        >
          Página 2
        </MenuItem>
        <MenuItem
          active={page === "Pagina3"}
          onClick={() => pageChange("Pagina3")}
        >
          Página 3
        </MenuItem>
      </MenuList>
    </Container>
  );
}
