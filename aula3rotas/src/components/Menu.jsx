import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


const Container = styled.div`
    ul{
        display: flex;
        justify-content: center;    
        list-style: none;
    }
    li{
        margin: 20px 20px;
    }
`



export default function Menu() {
  return (
    <>
        <Container>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/contacts">Contatos</Link></li>
                <li><Link to="/about">Sobre</Link></li>
            </ul>
        </Container>
    </>
  );
}