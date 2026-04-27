import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>La página que estás buscando no existe.</p>
      <Link to="/">Volver a la página principal</Link>
    </div>
  );
}

export default NotFound;
