import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Perfil from "./components/Perfil";

function App() {
  // Inicializa o token direto do localStorage para evitar "flash" de tela
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route
          path="/perfil"
          element={
            token ? (
              <Perfil token={token} setToken={setToken} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
