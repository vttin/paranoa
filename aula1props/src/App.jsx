import { useState } from "react"
import React from "react"
import EnviaTitulo from "./components/EnviaTitulo"
import RecebeTitulo from "./components/RecebeTitulo"

function App() {
  
  const [titulo, setTitulo] = useState("")
  const atualizaTitulo = (novoTitulo) => {
    setTitulo(novoTitulo)
  }

  return (
    <>
      <EnviaTitulo chamada={atualizaTitulo}/>
      <RecebeTitulo texto={titulo} />
    </>
  )
}

export default App
