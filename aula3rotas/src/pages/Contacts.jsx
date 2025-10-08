import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Contacts() {

  return (
    <>
        <Helmet>
          <title>Contatos</title>
          <meta name="description" content="Esta é a página de contatos do nosso site." />
        </Helmet>
      <h1>Contacts</h1>
    </>
  )
}

