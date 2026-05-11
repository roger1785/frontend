import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

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
