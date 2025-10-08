import React, { useState } from "react";
import jwtEncode from "jwt-encode";
import { jwtDecode } from "jwt-decode"

export default function Login() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  const Logar = (e) => {
    e.preventDefault();
    const objeto = { login, senha };
    const chave = "segredo";

    const token = jwtEncode(objeto, chave);

    localStorage.setItem("token", token);
    alert("Token salvo no localStorage!");
  };

  const Desc = () => {
    const token = localStorage.getItem("token");
    if(!token){
      alert("Token não encontrado")
      return
    }

    const chave = "segredo";
    const decodificado = jwtDecode(token, chave);
    alert(decodificado.login + " " + decodificado.senha);
  }
  return (
    <>
      <h1>Login</h1>

      <form onSubmit={Logar}>
        <input
          type="text"
          placeholder="email"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <br />
        <button type="submit">Enviar</button>
      </form>

      <button onClick={Desc}>Descriptografar</button>

    </>
  );
}
