import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Página no encontrada</h2>

      <p>
        La página que estás buscando no existe
        o la dirección es incorrecta.
      </p>

      <Link to="/">
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFound;