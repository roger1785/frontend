import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <Link to="/">Inicio</Link>

      {user && <Link to="/products/new">Nuevo producto</Link>}

      {!user ? (
        <>
          <Link to="/register">Crear cuenta</Link>
          <Link to="/login">Iniciar sección</Link>
        </>
      ) : (
        <>
          <Link to="/profile">Mi perfil</Link>
          <button type="button" onClick={handleLogout}>
            Cerrar session
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
