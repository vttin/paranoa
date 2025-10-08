import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function About() {

  return (
    <>
        <Helmet>
          <title>Sobre</title>
          <meta name="description" content="Esta é a página sobre do nosso site." />
        </Helmet>
        <h1>About</h1>
    </>
  )
}

