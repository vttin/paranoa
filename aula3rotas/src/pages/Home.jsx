import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Home() {

  return (
    <>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Esta é a página inicial do nosso site." />
        </Helmet>
        <h1>Home</h1>
        <p>Bem-vindo à página inicial!</p>

    </>
  )
}
