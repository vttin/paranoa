import './App.css';
import Register from './components/Register';
import Verificar from './components/Verificar';
import Dashboard from './components/Dashboard';
import Posts from './components/Posts';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

// 🔐 Rota protegida
function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("nomeUsuario");
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/verificacao" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/verificacao" element={<Verificar />} />

        <Route
          path="/dash"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <Posts />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
