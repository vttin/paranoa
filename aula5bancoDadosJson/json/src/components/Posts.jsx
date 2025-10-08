import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 40px;
  text-align: center;
`;

export default function Posts() {
  return (
    <Container>
      <h2>Posts</h2>
      <p>Aqui estarão os seus posts.</p>
    </Container>
  );
}
